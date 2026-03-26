"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/trends", label: "Trends" },
  { href: "/compare", label: "Compare" },
  { href: "/history", label: "History" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/10">
      <div className="flex items-center justify-between px-4 sm:px-8 h-16 w-full max-w-full">
        <Link
          href="/"
          className="text-2xl font-black text-primary tracking-tighter font-headline"
        >
          VidMetrics
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`transition-colors font-headline font-bold tracking-tight ${
                pathname === href
                  ? "text-on-surface"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-on-surface-variant hover:bg-surface-container-high rounded-lg p-2"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4 bg-background border-b border-outline-variant/10">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`transition-colors font-headline font-bold tracking-tight ${
                pathname === href
                  ? "text-on-surface"
                  : "text-on-surface-variant"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
