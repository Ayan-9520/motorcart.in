import { cn } from "@/lib/utils";

interface BrandLogoProps {
  src: string;
  alt: string;
  className?: string;
  /** Marquee tiles use fixed height; cards use larger */
  size?: "sm" | "md" | "lg";
}

const sizeClass = {
  sm: "brand-logo brand-logo-sm",
  md: "brand-logo brand-logo-md",
  lg: "brand-logo brand-logo-lg",
};

export function BrandLogo({ src, alt, className, size = "md" }: BrandLogoProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={cn(sizeClass[size], className)}
    />
  );
}
