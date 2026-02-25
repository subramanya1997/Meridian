import { Bell } from "lucide-react";

import { Button, Avatar, AvatarFallback, SearchInput, Separator } from "@meridian/ui";

interface TopbarProps {
  children?: React.ReactNode;
}

export function Topbar({ children }: TopbarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white/80 backdrop-blur-xl px-8">
      <div className="flex items-center gap-4">
        {children ?? (
          <SearchInput placeholder="Search anything..." className="w-72" />
        )}
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white">
            3
          </span>
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <div className="flex items-center gap-2.5">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-semibold text-white">
              AU
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-slate-700">Admin</span>
        </div>
      </div>
    </header>
  );
}
