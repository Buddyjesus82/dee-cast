import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between md:gap-8">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              <span className="block text-white">keep it,</span>
              <span className="block text-pink">forever.</span>
            </h2>
          </div>

          <div className="flex gap-16 md:gap-24">
            <div>
              <h3 className="font-sans text-[11px] tracking-[0.2em] uppercase text-pink mb-4">
                Studio
              </h3>
              <p className="font-sans text-sm text-white/90 leading-relaxed">
                Hand-poured in Brooklyn, NY
              </p>
              <a
                href="mailto:hello@getdeecast.com"
                className="font-sans text-sm text-white/90 hover:text-pink transition-colors"
              >
                hello@getdeecast.com
              </a>
            </div>
            <div>
              <h3 className="font-sans text-[11px] tracking-[0.2em] uppercase text-pink mb-4">
                Help
              </h3>
              <ul className="space-y-2 font-sans text-sm text-white/90">
                <li>
                  <Link href="/#faq" className="hover:text-pink transition-colors">
                    Shipping &amp; Returns
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="hover:text-pink transition-colors">
                    Care Guide
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="hover:text-pink transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-5 md:px-10">
          <p className="font-sans text-xs text-white/50">
            © 2026 Dee Cast — signature form, fresh mold every order.
          </p>
        </div>
      </div>
    </footer>
  );
}
