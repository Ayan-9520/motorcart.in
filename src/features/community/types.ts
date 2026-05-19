export type CommunityPostKind = "discussion" | "review" | "poll" | "embed";
export type EmbedProvider = "youtube" | "linkedin" | "reel";
export type ModerationStatus = "pending" | "approved" | "rejected" | "hidden";
export type CommunityGroupType = "city" | "vehicle_topic" | "dealer" | "influencer" | "open" | "trending";

export interface CommunityGroup {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  groupType: CommunityGroupType;
  ruleKey: string | null;
  ruleValue: string | null;
  dealerId: string | null;
  coverUrl: string | null;
  memberCount: number;
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName?: string;
  authorAvatar?: string | null;
  body: string;
  mediaUrls: string[];
  vehicleId: string | null;
  dealerId: string | null;
  groupId: string | null;
  groupSlug?: string | null;
  postKind: CommunityPostKind;
  embedProvider: EmbedProvider | null;
  embedUrl: string | null;
  pollOptions: string[] | null;
  pollEndsAt: string | null;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  spamScore: number;
  moderationStatus: ModerationStatus;
  needsReview: boolean;
  hashtags: string[];
  createdAt: string;
  likedByMe?: boolean;
}

export interface CommunityComment {
  id: string;
  postId: string;
  authorId: string;
  authorName?: string;
  body: string;
  spamScore: number;
  hidden: boolean;
  createdAt: string;
}

export interface HashtagTrend {
  hashtag: string;
  count: number;
}

export interface PollVoteState {
  postId: string;
  optionIndex: number | null;
  counts: number[];
}

export interface ModerationFlag {
  id: string;
  postId: string;
  reporterId: string;
  reason: string;
  aiSpamScore: number | null;
  status: "open" | "dismissed" | "action_taken";
  createdAt: string;
}

export interface CommunityNotification {
  id: string;
  title: string;
  message: string;
  type: string;
  link: string | null;
  isRead: boolean;
  createdAt: string;
}
