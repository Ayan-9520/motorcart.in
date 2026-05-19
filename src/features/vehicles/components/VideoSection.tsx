import { Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VideoSectionProps {
  videos: string[];
  title: string;
}

function toEmbedUrl(url: string): string {
  if (url.includes("youtube.com/watch")) {
    const id = new URL(url).searchParams.get("v");
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0];
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }
  return url;
}

export function VideoSection({ videos, title }: VideoSectionProps) {
  if (!videos?.length) return null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Play className="h-5 w-5 text-primary" />
          Video Walkthrough
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {videos.map((url, i) => (
          <div key={i} className="aspect-video overflow-hidden rounded-xl bg-black">
            <iframe
              src={toEmbedUrl(url)}
              title={`${title} video ${i + 1}`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
