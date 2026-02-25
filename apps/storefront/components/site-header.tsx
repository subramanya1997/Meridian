"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  User,
  MapPin,
  ChevronDown,
  Menu,
  FileText,
  Leaf,
} from "lucide-react";

import {
  Button,
  SearchInput,
  Badge,
  cn,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Separator,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@meridian/ui";

const NAV_ITEMS = [
  { name: "Products", href: "/products" },
  { name: "Categories", href: "/categories" },
  { name: "Quick Order", href: "/quick-order" },
  { name: "Deals", href: "/deals" },
];

const CATEGORIES = [
  "Plumbing Supplies",
  "Hand Tools",
  "Pipe & Fittings",
  "Electrical",
  "Safety Equipment",
  "Adhesives & Sealants",
];

interface SiteHeaderProps {
  cartCount?: number;
}

export function SiteHeader({ cartCount = 0 }: SiteHeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-4">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  Meridian
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mr-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Leaf className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight hidden sm:block">Meridian</span>
          </Link>

          {/* Categories dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden lg:flex gap-1.5">
                All Categories
                <ChevronDown className="h-3.5 w-3.5 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {CATEGORIES.map((cat) => (
                <DropdownMenuItem key={cat} asChild>
                  <Link href="/products">{cat}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search */}
          <SearchInput
            placeholder="Search for products, brands..."
            className="hidden md:block flex-1 max-w-lg"
          />

          {/* Location */}
          <div className="hidden xl:flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Select location</span>
            <ChevronDown className="h-3 w-3" />
          </div>

          {/* Request Quote CTA */}
          <Button size="sm" className="hidden lg:inline-flex gap-1.5">
            <FileText className="h-4 w-4" />
            Request Quote
          </Button>

          {/* Cart */}
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">
                {cartCount}
              </Badge>
            )}
          </Button>

          {/* User */}
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>

        {/* Desktop nav row */}
        <nav className="hidden lg:flex items-center gap-1 -mb-px pb-0">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "inline-flex items-center border-b-2 px-3 pb-3 pt-1 text-sm font-medium transition-colors",
                  isActive
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
