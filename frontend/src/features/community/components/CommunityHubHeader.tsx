import { Users } from "lucide-react";

export function CommunityHubHeader() {
  return (
    <header className="community-hub-header text-center">
      <p className="community-hub-eyebrow">
        <Users className="h-3.5 w-3.5" aria-hidden />
        Community
      </p>
      <h1 className="community-hub-title">What&apos;s Trending</h1>
      <p className="community-hub-subtitle">
        Join the conversation with fellow automotive enthusiasts. Share your experiences, reviews, and
        connect with the community.
      </p>
    </header>
  );
}
