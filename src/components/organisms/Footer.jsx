import { useRef } from "react";
import { useInView } from "framer-motion";
import { footer } from "../../data/content";

/* inline social icons (no extra package needed) */
const ICONS = {
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.2 3h2.9l-6.3 7.2L22 21h-5.8l-4.5-5.9L6.5 21H3.6l6.7-7.7L3 3h5.9l4.1 5.4zm-1 16.2h1.6L7.9 4.7H6.2z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" />
    </svg>
  ),
};

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <footer ref={ref} id="contact" className={`ft${inView ? " in" : ""}`}>
      <div className="ft-grid">
        {/* brand */}
        <div className="ft-brand">
          <img className="ft-logo" src="/images/footer-logo.png" alt="Al Tasnim Gulf Ltd" />
          <p>{footer.about}</p>
        </div>

        {/* link columns */}
        <div className="ft-cols">
          {footer.columns.map((c, ci) => (
            <div className="ft-col" style={{ "--ci": ci }} key={c.title}>
              <h4>
                <span className="ft-ln"><b>{c.title}</b></span>
              </h4>
              <ul>
                {c.links.map((l, ri) => (
                  <li key={l.label}>
                    {/* text roll: the text rolls up and an orange copy rolls in */}
                    <a className="ft-lk" href={l.href} style={{ "--ci": ci, "--ri": ri }}>
                      <span className="ft-t">
                        <span className="ft-a">{l.label}</span>
                        <span className="ft-b" aria-hidden="true">{l.label}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* follow us */}
      <div className="ft-bot">
        <span className="ft-rule" />
        <span className="ft-f">Follow us</span>
        <div className="ft-soc">
          {footer.social.map((s, i) => (
            <a href={s.href} aria-label={s.name} style={{ "--s": i }} key={s.name}>
              {ICONS[s.icon]}
            </a>
          ))}
        </div>
      </div>

      <p className="ft-copy">{footer.copy}</p>
    </footer>
  );
}