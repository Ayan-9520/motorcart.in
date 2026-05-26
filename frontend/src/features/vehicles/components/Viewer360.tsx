import { useState, useRef, useCallback } from "react";
import { Rotate3d } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Viewer360Props {
  images: string[];
  title: string;
}

export function Viewer360({ images, title }: Viewer360Props) {
  const [frame, setFrame] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startFrame = useRef(0);
  const frames = images.length >= 4 ? images : images.length ? [...images, ...images, ...images, ...images].slice(0, 8) : [];

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    startX.current = e.clientX;
    startFrame.current = frame;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current || !frames.length) return;
    const delta = e.clientX - startX.current;
    const step = Math.floor(delta / 40);
    const next = (startFrame.current + step) % frames.length;
    setFrame(((next % frames.length) + frames.length) % frames.length);
  }, [frames.length, frame]);

  const onPointerUp = () => {
    dragging.current = false;
  };

  if (!frames.length) return null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Rotate3d className="h-5 w-5 text-primary" />
          360° View
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="relative aspect-[16/10] cursor-grab overflow-hidden rounded-xl bg-muted active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <img src={frames[frame]} alt={`${title} 360 view`} className="h-full w-full object-cover select-none" draggable={false} />
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-xs text-white">
            Drag to rotate · Frame {frame + 1}/{frames.length}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
