import Link from "next/link";
import { Zap } from "lucide-react";

const FOOTER_COLUMNS = [
  { title: "Products", links: ["All Products", "Categories", "Brands", "New Arrivals", "Deals"] },
  { title: "Account", links: ["My Orders", "Quick Order", "Saved Carts", "Request Quote", "Support"] },
  { title: "Company", links: ["About Us", "Contact", "Blog", "API Docs", "Privacy Policy"] },
];

interface SiteFooterProps {
  variant?: "full" | "compact";
}

function FooterFull() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-[15px] font-bold text-slate-900">Meridian</span>
            </div>
            <p className="text-[13px] text-slate-500 leading-relaxed">
              Open-source, AI-first B2B eCommerce platform for wholesale distributors.
            </p>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[13px] font-semibold text-slate-900 mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-[13px] text-slate-500 hover:text-blue-600 transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-slate-200 flex items-center justify-between">
          <p className="text-[12px] text-slate-400">&copy; 2026 Meridian Commerce. All rights reserved.</p>
          <p className="text-[12px] text-slate-400">Powered by Meridian — Open Source B2B Commerce</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCompact() {
  return (
    <footer className="border-t bg-slate-50 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700">
              <Zap className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-[13px] font-bold text-slate-900">Meridian</span>
          </div>
          <p className="text-[12px] text-slate-400">&copy; 2026 Meridian Commerce. Open Source B2B Platform.</p>
        </div>
      </div>
    </footer>
  );
}

export function SiteFooter({ variant = "full" }: SiteFooterProps) {
  return variant === "full" ? <FooterFull /> : <FooterCompact />;
}
