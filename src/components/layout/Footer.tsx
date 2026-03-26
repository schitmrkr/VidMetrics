import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background border-t border-outline-variant/10 py-12">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="text-xl font-black text-primary tracking-tighter font-headline">
              VidMetrics
            </span>
            <span className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant/60">
              &copy; {new Date().getFullYear()} VidMetrics Kinetic Lens.
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {[
              "Privacy Policy",
              "Terms",
              "API Docs",
              "Support",
            ].map((label) => (
              <Link
                key={label}
                href="#"
                className="font-label text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors font-semibold"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
