import Link from "next/link";

export function TopBar() {
  return (
    <div className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-10 items-center justify-between text-[12px]">
          <div className="flex items-center gap-4">
            <span className="text-slate-300">Free shipping on orders $500+</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">Call us: (555) 123-4567</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/account" className="text-slate-300 hover:text-white transition-colors">
              My Account
            </Link>
            <span className="text-slate-500">|</span>
            <Link href="/quick-order" className="text-slate-300 hover:text-white transition-colors">
              Quick Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
