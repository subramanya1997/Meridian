import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@meridian/ui";

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
          Ready to streamline your ordering?
        </h2>
        <p className="mt-4 text-lg text-blue-100 max-w-lg mx-auto">
          Create your account and start ordering with customer-specific pricing today.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="rounded-xl bg-white text-blue-700 hover:bg-white/90 px-8 py-3.5 text-[14px] font-semibold shadow-xl">
            <Link href="/register">
              Create Free Account
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-xl border-2 border-white/30 text-white hover:bg-white/10 px-8 py-3.5 text-[14px] font-semibold">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
