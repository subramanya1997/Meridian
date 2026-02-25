import Link from "next/link";
import { Leaf, Mail } from "lucide-react";

import { Button, Input, Separator } from "@meridian/ui";

const FOOTER_COLUMNS = [
  {
    title: "Products",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Categories", href: "/categories" },
      { label: "Brands", href: "/products" },
      { label: "New Arrivals", href: "/products" },
      { label: "Deals", href: "/deals" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Orders", href: "/account/orders" },
      { label: "Quick Order", href: "/quick-order" },
      { label: "Saved Carts", href: "/account/carts" },
      { label: "Request Quote", href: "/rfq" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blog" },
      { label: "API Docs", href: "/docs" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

interface SiteFooterProps {
  variant?: "full" | "compact";
}

export function SiteFooter({ variant = "full" }: SiteFooterProps) {
  if (variant === "compact") {
    return (
      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
                <Leaf className="h-3 w-3 text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold">Meridian</span>
            </div>
            <p className="text-xs text-muted-foreground">&copy; 2026 Meridian Commerce.</p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand + Newsletter */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Leaf className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">Meridian</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xs">
              Open-source, AI-first B2B commerce platform for wholesale distributors and manufacturers.
            </p>
            <div className="flex gap-2 max-w-xs">
              <Input placeholder="Your email" type="email" className="text-sm" />
              <Button size="sm">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">&copy; 2026 Meridian Commerce. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Powered by Meridian — Open Source B2B Commerce</p>
        </div>
      </div>
    </footer>
  );
}
