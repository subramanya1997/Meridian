import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  text: string;
  stars: number;
}

export function TestimonialCard({ name, role, text, stars }: TestimonialCardProps) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: stars }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-[15px] text-slate-300 leading-relaxed italic">&ldquo;{text}&rdquo;</p>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{name}</p>
          <p className="text-[12px] text-slate-400">{role}</p>
        </div>
      </div>
    </div>
  );
}
