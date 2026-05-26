import { Link } from "react-router-dom";
import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type SocialAvatarProps = {
  userId?: string;
  name?: string;
  src?: string | null;
  verified?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const SIZE = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-20 w-20 text-xl",
} as const;

export function SocialAvatar({ userId, name, src, verified, size = "md", className }: SocialAvatarProps) {
  const inner = (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 font-bold text-primary ring-2 ring-background",
        SIZE[size],
        className
      )}
    >
      {src ? (
        <img src={src} alt="" className="h-full w-full object-cover" />
      ) : (
        (name ?? "?").charAt(0).toUpperCase()
      )}
      {verified && (
        <BadgeCheck className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-background text-primary" />
      )}
    </span>
  );

  if (userId) {
    return (
      <Link to={`/community/u/${userId}`} className="shrink-0">
        {inner}
      </Link>
    );
  }
  return inner;
}
