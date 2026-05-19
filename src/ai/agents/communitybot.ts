import { scoreSpamContent } from "@/features/community/lib/spam-detection";
import type { AgentRunContext, AgentRunResult } from "../types";

export async function communitybotModerate(ctx: AgentRunContext): Promise<AgentRunResult> {
  const body = String(ctx.payload?.body ?? "");
  const spam = scoreSpamContent(body);
  const needsReview = spam >= 0.45;

  return {
    ok: true,
    agentId: "communitybot",
    action: "moderate",
    data: {
      spamScore: spam,
      needsReview,
      action: needsReview ? "flag_for_review" : "approve",
    },
    usedOpenAI: false,
  };
}

export async function communitybotTrending(ctx: AgentRunContext): Promise<AgentRunResult> {
  const posts = (ctx.payload?.posts ?? []) as { id: string; likeCount: number; commentCount: number }[];
  const trending = [...posts]
    .map((p) => ({ ...p, score: p.likeCount * 2 + p.commentCount * 3 }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return {
    ok: true,
    agentId: "communitybot",
    action: "trending",
    data: { trending },
    usedOpenAI: false,
  };
}
