import { useRef } from "react";
import { useInView } from "framer-motion";
import { news } from "../../data/content";

const TITLE = "Latest News";

export default function LatestNews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section ref={ref} className={`nw${inView ? " in" : ""}`}>
      {/* title: letters rise out of a mask */}
      <h2 className="nw-hd" aria-label={TITLE}>
        {TITLE.split("").map((c, k) =>
          c === " " ? (
            <span className="nw-sp" key={k} />
          ) : (
            <span className="nw-ch" aria-hidden="true" key={k}>
              <b style={{ "--c": k }}>{c}</b>
            </span>
          )
        )}
      </h2>

      <div className="nw-grid">
        {news.map((n, i) => (
          <article className="nw-cd" style={{ "--i": i }} key={i}>
            <div className="nw-im">
              <div className="nw-ph" style={{ backgroundImage: `url(${n.img})` }} />
            </div>

            <div className="nw-bd">
              {/* date pill: outline draws itself */}
              <div className="nw-pill">
                <svg viewBox="0 0 110 22" preserveAspectRatio="none" aria-hidden="true">
                  <rect x=".5" y=".5" width="109" height="21" rx="10.5" pathLength="1" />
                </svg>
                <span>{n.date}</span>
              </div>

              <h3 className="nw-ttl">
                {n.title.map((l, k) => (
                  <span className="nw-ln" key={k}><b style={{ "--k": k }}>{l}</b></span>
                ))}
              </h3>

              <p className="nw-ds">
                {n.desc.map((l, k) => (
                  <span className="nw-ln" key={k}><b style={{ "--k": k }}>{l}</b></span>
                ))}
              </p>

              <a className="nw-km" href={n.href}>
                Know more
                <i>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="#243f9d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </i>
              </a>
            </div>

            {/* orange bottom line (draws in, shimmer keeps travelling along it) */}
            <div className="nw-bl"><div className="nw-fx" /></div>
          </article>
        ))}
      </div>
    </section>
  );
}