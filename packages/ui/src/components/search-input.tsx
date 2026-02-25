import * as React from "react";
import { Search } from "lucide-react";

import { cn } from "../lib/utils";

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, placeholder = "Search...", ...props }, ref) => (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        ref={ref}
        type="search"
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        {...props}
      />
    </div>
  )
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
