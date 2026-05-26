import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  addPostComment,
  fetchComments,
  fetchCommunityPost,
  getPollVote,
  sharePost,
  votePoll,
} from "../services/community.service";
import type { CommunityComment, CommunityPost } from "../types";

export function useCommunityPostDetail(postId: string | undefined) {
  const { user } = useAuth();
  const [post, setPost] = useState<CommunityPost | null>(null);
  const [comments, setComments] = useState<CommunityComment[]>([]);
  const [pollChoice, setPollChoice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!postId) {
      setPost(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const p = await fetchCommunityPost(postId, user?.id ?? null);
      setPost(p);
      setComments(await fetchComments(postId));
      if (user?.id) setPollChoice(await getPollVote(postId, user.id));
    } finally {
      setLoading(false);
    }
  }, [postId, user?.id]);

  useEffect(() => {
    void load();
  }, [load]);

  const comment = useCallback(
    async (body: string) => {
      if (!postId || !user?.id) return;
      await addPostComment(postId, user.id, body, user.fullName);
      setComments(await fetchComments(postId));
    },
    [postId, user]
  );

  const vote = useCallback(
    async (idx: number) => {
      if (!postId || !user?.id) return;
      await votePoll(postId, user.id, idx);
      setPollChoice(idx);
    },
    [postId, user?.id]
  );

  const share = useCallback(async () => {
    if (!postId || !user?.id) return;
    await sharePost(postId, user.id);
    await load();
  }, [postId, user?.id, load]);

  return { post, comments, pollChoice, loading, reload: load, comment, vote, share };
}
