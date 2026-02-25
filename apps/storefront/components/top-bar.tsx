import Link from "next/link";
import { Phone } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span>Free shipping on orders $500+</span>
            <span className="opacity-50">|</span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <Phone className="h-3 w-3" />
              (555) 123-4567
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/account" className="hover:underline">
              My Account
            </Link>
            <span className="opacity-50">|</span>
            <Link href="/quick-order" className="hover:underline">
              Quick Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
