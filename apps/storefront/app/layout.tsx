import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meridian Commerce - B2B Wholesale Distribution",
  description: "Professional B2B eCommerce Storefront powered by Meridian",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white antialiased">{children}</body>
    </html>
  );
}
