import Link from "next/link";
import { ArrowRight, Star, Package, Leaf } from "lucide-react";

import { Button, Badge, Card, CardContent } from "@meridian/ui";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-background to-emerald-50/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <div>
            <Badge variant="secondary" className="mb-6 px-3 py-1 text-xs font-medium">
              <Leaf className="h-3 w-3 mr-1.5 text-primary" />
              AI-Powered B2B Commerce
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-foreground leading-[1.1]">
              Your Trusted{" "}
              <span className="text-primary">Wholesale Supply</span>{" "}
              Partner
            </h1>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-md">
              Order products, manage inventory, and get doorstep delivery within 24 hours. Volume pricing for every business.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href="/categories">Explore More</Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex items-center gap-6">
              <div className="flex items-center gap-1.5">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold">4.9/5</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Rated by 2,400+ businesses
              </span>
            </div>
          </div>

          {/* Right — Visual */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-emerald-100/50 p-12 aspect-square max-w-md ml-auto flex items-center justify-center">
              {/* Main product visual placeholder */}
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-lg">
                  <Package className="h-16 w-16 text-primary/60" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">Premium Supplies</p>
              </div>

              {/* Floating product card */}
              <Card className="absolute -bottom-4 -left-8 shadow-lg animate-bounce-slow">
                <CardContent className="flex items-center gap-3 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">Kitchen Faucet</p>
                    <p className="text-xs text-muted-foreground">$149.99</p>
                  </div>
                  <Badge className="ml-2 text-[10px]">New</Badge>
                </CardContent>
              </Card>

              {/* Stats bubble */}
              <Card className="absolute -top-2 -right-4 shadow-lg">
                <CardContent className="p-3 text-center">
                  <p className="text-2xl font-bold text-primary">10K+</p>
                  <p className="text-[10px] text-muted-foreground font-medium">Products</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
