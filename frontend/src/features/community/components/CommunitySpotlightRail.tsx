import { Link } from "react-router-dom";
import { BadgeCheck, ChevronRight } from "lucide-react";
import { COMMUNITY_SPOTLIGHT } from "../data/community-premium-data";

export function CommunitySpotlightRail() {
  return (
    <section className="community-premium-spotlight" aria-label="Featured creators">
      <div className="container">
        <div className="community-premium-spotlight-head">
          <div>
            <h2 className="community-premium-spotlight-title">Spotlight creators</h2>
            <p className="community-premium-spotlight-sub">Follow verified voices shaping the conversation</p>
          </div>
          <Link to="/community/groups" className="community-premium-spotlight-link">
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="community-premium-spotlight-track">
          {COMMUNITY_SPOTLIGHT.map((creator) => (
            <Link
              key={creator.id}
              to={`/community/u/${creator.id}`}
              className="community-premium-spotlight-card"
            >
              <div className="community-premium-spotlight-avatar-wrap">
                {creator.avatarUrl ? (
                  <img src={creator.avatarUrl} alt="" className="community-premium-spotlight-avatar" />
                ) : (
                  <span className="community-premium-spotlight-avatar-fallback">
                    {creator.name.charAt(0)}
                  </span>
                )}
                <BadgeCheck className="community-premium-spotlight-verified" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-foreground">{creator.name}</p>
                <p className="truncate text-xs text-muted-foreground">{creator.handle}</p>
                <p className="mt-1 text-[11px] font-medium text-primary">{creator.badge}</p>
              </div>
              <span className="community-premium-spotlight-followers">{creator.followers}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
