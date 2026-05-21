import { uploadFile, uploadMultiple } from "@/services/storage.service";

export async function uploadCommunityPostMedia(userId: string, files: File[]): Promise<string[]> {
  if (!files.length) return [];
  const prefix = `${userId}/posts/${Date.now()}`;
  const results = await uploadMultiple("community-media", files, prefix);
  return results.map((r) => r.publicUrl);
}

export async function uploadCommunityAvatar(userId: string, file: File): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${userId}/avatar.${ext}`;
  const { publicUrl } = await uploadFile("profile-images", path, file);
  return publicUrl;
}

export async function uploadCommunityCover(userId: string, file: File): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${userId}/cover.${ext}`;
  const { publicUrl } = await uploadFile("community-media", path, file);
  return publicUrl;
}
