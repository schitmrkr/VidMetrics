"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/trends", label: "Trends", icon: "trending_up" },
  { href: "/compare", label: "Compare", icon: "compare_arrows" },
  { href: "/history", label: "History", icon: "history" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-16 bg-background/80 backdrop-blur-md border-r border-outline-variant/10 flex flex-col z-30">
      <nav className="flex-1 py-4">
        <ul className="space-y-2">
          {NAV_LINKS.map(({ href, label, icon }) => (
            <li key={href}>
              <Link
                href={href}
                title={label}
                className={`flex items-center justify-center w-12 h-12 mx-auto rounded-xl transition-colors duration-200 ${
                  pathname === href
                    ? "bg-primary/10 text-primary"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-2xl">{icon}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-3 border-t border-outline-variant/10">
        <div className="h-10 w-10 mx-auto rounded-full bg-surface-container-highest overflow-hidden ring-2 ring-primary/20">
          <img
            alt="User profile avatar"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmGJ7sp5p2tyfAx4rG5t9W3yqOvGJ_15eh22STjuBZtYUb8gkiAsyNVShJGLTzFVzh_tL0yZCSp_-jFt-D29clvXZgvT35LZjmsNEDUiHHiQkPTBH1Ls6Eh280l9nKz5Ox38ngAxFrBA08kI3nktnWBJME9gl9991ftRHwvBHY0YgMSyk60VEyzq5FIQ_-DbHk7u9NaTkE64gGNZkZFtSok68Uh4IM-vqSJGTpEbiwqvgL-PlSw0TZtQJfkrRoFknO-qwCi18KJDM"
          />
        </div>
      </div>
    </aside>
  );
}
