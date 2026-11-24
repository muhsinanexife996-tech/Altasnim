import { useEffect, useRef, useState } from "react";
import { navLinks, contactLink, footer } from "../../data/content";

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&";

const Cta = ({ onClick }) => (
  <a className="hd-cta" href={contactLink.href} onClick={onClick}>
    <span className="hd-lbl">{contactLink.label}</span>
  </a>
);

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 12h12M13 6l6 6-6 6" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const timers = useRef(new Map());

  /* floating glass bar after scrolling */
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  /* lock page scroll while mobile menu is open, close it on desktop resize */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  useEffect(() => {
    const f = () => window.innerWidth > 1000 && setOpen(false);
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  useEffect(() => () => timers.current.forEach(clearInterval), []);

  /* decoder scramble: letters settle one by one */
  const scramble = (e) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = e.currentTarget;
    const letters = [...el.querySelectorAll(".hd-l")];
    clearInterval(timers.current.get(el));
    letters.forEach((l) => {
      if (!l.dataset.o) {
        l.dataset.o = l.textContent;
        l.style.width = l.getBoundingClientRect().width + "px"; // no jitter
      }
    });
    const t0 = Date.now();
    const id = setInterval(() => {
      const t = Date.now() - t0;
      let done = true;
      letters.forEach((l, j) => {
        if (t < 120 + j * 38) {
          l.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
          done = false;
        } else l.textContent = l.dataset.o;
      });
      if (done) clearInterval(id);
    }, 45);
    timers.current.set(el, id);
  };

  const go = (i) => { setActive(i); setOpen(false); };
  const num = (i) => String(i + 1).padStart(2, "0");

  return (
    <header className={`hd${scrolled ? " sc" : ""}${open ? " open" : ""}`}>
      <div className="hd-bar">
        <a className="hd-logo" href="#home" aria-label="Al Tasnim Gulf Ltd">
          <img src="/images/logo.png" alt="Al Tasnim Gulf Ltd" />
        </a>

        {/* desktop: nav pill + contact button */}
        <div className="hd-rt">
          <nav className="hd-nav" aria-label="Main">
            {navLinks.map((l, i) => (
              <a key={l.label} href={l.href} style={{ "--n": i }}
                 className={`hd-lk${active === i ? " act" : ""}`}
                 onMouseEnter={scramble} onClick={() => go(i)}>
                {l.label.split(" ").map((w, wi) => (
                  <span key={wi}>
                    {wi > 0 && " "}
                    <span className="hd-wd">
                      {[...w].map((c, ci) => <span className="hd-l" key={ci}>{c}</span>)}
                    </span>
                  </span>
                ))}
              </a>
            ))}
          </nav>
          <Cta />
        </div>

        <button className="hd-burger" aria-label="Menu" aria-expanded={open}
                onClick={() => setOpen((o) => !o)}>
          <span /><span /><span />
        </button>
      </div>

      {/* mobile: glass-card menu */}
      <div className="hd-mnu">
        <ul className="hd-ml">
          {navLinks.map((l, i) => (
            <li key={l.label}>
              <a className={`hd-mi${active === i ? " act" : ""}`} href={l.href}
                 style={{ "--n": i }} onClick={() => go(i)}>
                <span className="hd-mn">{num(i)}</span>
                <span className="hd-mt">{l.label}{l.sub && <small>{l.sub}</small>}</span>
                <span className="hd-mr"><Arrow /></span>
              </a>
            </li>
          ))}
        </ul>
        <div className="hd-mf">
          <Cta onClick={() => setOpen(false)} />
          {footer?.social && (
            <div className="hd-soc">
              {footer.social.map((s) => (
                <a key={s.name} href={s.href} aria-label={s.name}
                   target="_blank" rel="noreferrer">{s.name.slice(0, 2)}</a>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}