import { Star } from "lucide-react";

import { Card, CardContent, cn } from "@meridian/ui";

interface TestimonialCardProps {
  name: string;
  role: string;
  text: string;
  title?: string;
  stars: number;
  accentColor?: string;
}

export function TestimonialCard({
  name,
  role,
  text,
  title = "Great Experience!",
  stars,
  accentColor = "bg-primary",
}: TestimonialCardProps) {
  return (
    <Card className={cn("overflow-hidden border-0", accentColor)}>
      <CardContent className="p-6 text-white">
        {/* Stars */}
        <div className="flex gap-0.5 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < stars ? "fill-amber-400 text-amber-400" : "fill-white/30 text-white/30"
              )}
            />
          ))}
          <span className="text-xs text-white/70 ml-2">Verified</span>
        </div>

        {/* Title */}
        <h4 className="font-semibold mb-2">{title}</h4>

        {/* Text */}
        <p className="text-sm text-white/85 leading-relaxed line-clamp-3">{text}</p>

        {/* Author */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
            {name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium">{name}</p>
            <p className="text-xs text-white/60">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
