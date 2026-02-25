import { ArrowUpRight, ChevronRight } from "lucide-react";

import { Button } from "@meridian/ui";

export function GettingStartedBanner() {
  return (
    <div className="mt-4 overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-5 shadow-lg">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
          <ArrowUpRight className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-[14px] font-semibold text-white">Getting Started</p>
          <p className="mt-1 text-[12px] text-blue-100 leading-relaxed">
            Import your product catalog, configure integrations, and launch your B2B storefront.
          </p>
          <Button
            size="sm"
            className="mt-3 bg-white text-blue-700 hover:bg-white/90 shadow-sm transition-transform hover:scale-105"
          >
            Start Setup
            <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
