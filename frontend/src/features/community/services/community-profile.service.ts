import { supabase } from "@/integrations/supabase/client";
import type { SocialProfile, SocialProfileUpdate } from "../types";

function slugifyHandle(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "")
    .slice(0, 24);
}

export function suggestCommunityHandle(fullName: string, userId: string): string {
  const base = slugifyHandle(fullName) || "member";
  return `${base}_${userId.slice(0, 6)}`;
}

async function countPosts(userId: string): Promise<number> {
  const { count } = await supabase
    .from("social_posts")
    .select("*", { count: "exact", head: true })
    .eq("author_id", userId)
    .in("moderation_status", ["approved", "pending"]);
  return count ?? 0;
}

async function countFollowers(userId: string): Promise<number> {
  const { count } = await supabase
    .from("user_follows")
    .select("*", { count: "exact", head: true })
    .eq("following_id", userId);
  return count ?? 0;
}

async function countFollowing(userId: string): Promise<number> {
  const { count } = await supabase
    .from("user_follows")
    .select("*", { count: "exact", head: true })
    .eq("follower_id", userId);
  return count ?? 0;
}

function mapProfileRow(
  r: Record<string, unknown>,
  stats: { postCount: number; followerCount: number; followingCount: number },
  extras?: Partial<SocialProfile>
): SocialProfile {
  return {
    id: r.id as string,
    fullName: (r.full_name as string) || "Member",
    email: (r.email as string) ?? null,
    avatarUrl: (r.avatar_url as string) ?? null,
    coverUrl: (r.community_cover_url as string) ?? null,
    bio: (r.community_bio as string) ?? null,
    handle: (r.community_handle as string) ?? null,
    role: String(r.role ?? "customer"),
    isVerified: Boolean(r.is_verified),
    postCount: stats.postCount,
    followerCount: stats.followerCount,
    followingCount: stats.followingCount,
    ...extras,
  };
}

async function fetchUserRow(profileUserId: string) {
  const extended = await supabase
    .from("users")
    .select("id, email, full_name, avatar_url, role, is_verified, community_bio, community_handle, community_cover_url, metadata")
    .eq("id", profileUserId)
    .maybeSingle();
  if (!extended.error && extended.data) return extended.data as Record<string, unknown>;

  const basic = await supabase
    .from("users")
    .select("id, email, full_name, avatar_url, role, is_verified, metadata")
    .eq("id", profileUserId)
    .maybeSingle();
  if (basic.error || !basic.data) return null;
  const r = basic.data as Record<string, unknown>;
  const meta = (r.metadata as Record<string, unknown>) ?? {};
  return {
    ...r,
    community_bio: meta.community_bio ?? null,
    community_handle: meta.community_handle ?? null,
    community_cover_url: meta.community_cover_url ?? null,
  };
}

export async function fetchSocialProfile(
  profileUserId: string,
  viewerId?: string | null
): Promise<SocialProfile | null> {
  const data = await fetchUserRow(profileUserId);
  if (!data) return null;

  const [postCount, followerCount, followingCount] = await Promise.all([
    countPosts(profileUserId),
    countFollowers(profileUserId),
    countFollowing(profileUserId),
  ]);

  let isFollowing = false;
  if (viewerId && viewerId !== profileUserId) {
    const { data: f } = await supabase
      .from("user_follows")
      .select("follower_id")
      .eq("follower_id", viewerId)
      .eq("following_id", profileUserId)
      .maybeSingle();
    isFollowing = !!f;
  }

  return mapProfileRow(data, { postCount, followerCount, followingCount }, {
    isFollowing,
    isSelf: viewerId === profileUserId,
  });
}

export async function updateSocialProfile(userId: string, patch: SocialProfileUpdate): Promise<SocialProfile | null> {
  const row: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (patch.fullName !== undefined) row.full_name = patch.fullName;
  if (patch.bio !== undefined) row.community_bio = patch.bio;
  if (patch.handle !== undefined) row.community_handle = patch.handle?.trim() || null;
  if (patch.avatarUrl !== undefined) row.avatar_url = patch.avatarUrl;
  if (patch.coverUrl !== undefined) row.community_cover_url = patch.coverUrl;

  let { error } = await supabase.from("users").update(row).eq("id", userId);
  if (error?.message?.includes("community_")) {
    const { data: existing } = await supabase.from("users").select("metadata").eq("id", userId).maybeSingle();
    const meta = { ...((existing as { metadata?: Record<string, unknown> } | null)?.metadata ?? {}) };
    if (patch.bio !== undefined) meta.community_bio = patch.bio;
    if (patch.handle !== undefined) meta.community_handle = patch.handle?.trim() || null;
    if (patch.coverUrl !== undefined) meta.community_cover_url = patch.coverUrl;
    const fallback: Record<string, unknown> = { updated_at: row.updated_at, metadata: meta };
    if (patch.fullName !== undefined) fallback.full_name = patch.fullName;
    if (patch.avatarUrl !== undefined) fallback.avatar_url = patch.avatarUrl;
    ({ error } = await supabase.from("users").update(fallback).eq("id", userId));
  }
  if (error) throw new Error(error.message);

  return fetchSocialProfile(userId, userId);
}

export async function fetchFollowingUserIds(userId: string): Promise<string[]> {
  const { data } = await supabase.from("user_follows").select("following_id").eq("follower_id", userId);
  return (data as { following_id: string }[] | null)?.map((r) => r.following_id) ?? [];
}

export async function fetchFollowersList(userId: string, limit = 30): Promise<SocialProfile[]> {
  const { data } = await supabase
    .from("user_follows")
    .select("follower_id")
    .eq("following_id", userId)
    .limit(limit);

  const ids = (data as { follower_id: string }[] | null)?.map((r) => r.follower_id) ?? [];
  const profiles: SocialProfile[] = [];
  for (const id of ids) {
    const p = await fetchSocialProfile(id);
    if (p) profiles.push(p);
  }
  return profiles;
}

export async function fetchFollowingList(userId: string, limit = 30): Promise<SocialProfile[]> {
  const { data } = await supabase
    .from("user_follows")
    .select("following_id")
    .eq("follower_id", userId)
    .limit(limit);

  const ids = (data as { following_id: string }[] | null)?.map((r) => r.following_id) ?? [];
  const profiles: SocialProfile[] = [];
  for (const id of ids) {
    const p = await fetchSocialProfile(id);
    if (p) profiles.push(p);
  }
  return profiles;
}

export async function enrichAuthors<T extends { authorId: string; authorName?: string; authorAvatar?: string | null }>(
  items: T[]
): Promise<T[]> {
  const ids = [...new Set(items.map((i) => i.authorId))];
  if (!ids.length) return items;

  const { data } = await supabase
    .from("users")
    .select("id, full_name, avatar_url, community_handle, is_verified")
    .in("id", ids);

  const map = new Map(
    (data as Record<string, unknown>[] | null)?.map((u) => [
      u.id as string,
      {
        name: (u.full_name as string) || "Member",
        avatar: (u.avatar_url as string) ?? null,
        handle: (u.community_handle as string) ?? null,
        verified: Boolean(u.is_verified),
      },
    ]) ?? []
  );

  return items.map((item) => {
    const a = map.get(item.authorId);
    if (!a) return item;
    const display = a.handle ? `@${a.handle}` : a.name;
    return {
      ...item,
      authorName: item.authorName && item.authorName !== "Community member" ? item.authorName : display,
      authorAvatar: a.avatar ?? item.authorAvatar,
    };
  });
}
