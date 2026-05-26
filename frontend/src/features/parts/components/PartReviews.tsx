import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PartReview } from "../types";

interface PartReviewsProps {
  reviews: PartReview[];
}

export function PartReviews({ reviews }: PartReviewsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Ratings & reviews</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {reviews.length === 0 && <p className="text-sm text-muted-foreground">No reviews yet.</p>}
        {reviews.map((r) => (
          <article key={r.id} className="border-b pb-4 last:border-0">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  className={`h-4 w-4 ${n <= r.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
                />
              ))}
            </div>
            {r.title && <p className="mt-2 font-semibold">{r.title}</p>}
            {r.content && <p className="mt-1 text-sm text-muted-foreground">{r.content}</p>}
          </article>
        ))}
      </CardContent>
    </Card>
  );
}
