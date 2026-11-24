import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { groupStats, groupNote } from "../../data/content";

/* rounded-rectangle path, clockwise from the top-left corner */
const P =
  "M10,0 H167 A10,10 0 0 1 177,10 V133 A10,10 0 0 1 167,143 H10 A10,10 0 0 1 0,133 V10 A10,10 0 0 1 10,0 Z";

function StatBox({ end, lines, i, go }) {
  const [val, setVal] = useState(0);

  /* counter: starts after the lines have begun drawing */
  useEffect(() => {
    if (!go) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setVal(end); return; }

    let raf;
    const DUR = 2200;
    const t0 = performance.now() + 1300 + i * 200;
    const tick = (now) => {
      const p = Math.min(Math.max((now - t0) / DUR, 0), 1);
      setVal(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [go, end, i]);

  return (
    <div className="gs-bx" style={{ "--i": i }}>
      <svg className="gs-bsv" viewBox="0 0 177 143" aria-hidden="true">
        {/* two open lines: orange + blue (the gaps are part of the design) */}
        <path className="gs-ko" d={P} pathLength="1" />
        <path className="gs-kb" d={P} pathLength="1" />
        {/* dots at the front end of each line */}
        <path className="gs-do" d={P} pathLength="1" />
        <path className="gs-db" d={P} pathLength="1" />
      </svg>

      <div className="gs-inb">
        <div className="gs-n">
          {val.toLocaleString("en-US")}
          <sup>+</sup>
        </div>
        <div className="gs-lb">
          {lines.map((l, k) => (
            <span className="gs-ln" key={k}>
              <b style={{ "--i": i, "--k": k }}>{l}</b>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GroupStats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const words = groupNote.split(" ");

  return (
    <section ref={ref} className={`gs${inView ? " in" : ""}`}>
      {/* shaped photo: 2 masked pieces (top bar + left bar) sharing one photo */}
      <div className="gs-shape">
        <svg viewBox="0 0 352 352" role="img" aria-label="Mine photo">
          <defs>
            <mask id="gsMa" maskUnits="userSpaceOnUse" x="0" y="0" width="352" height="352">
              <polygon points="0,0 259,0 352,96 0,96" fill="#fff" />
            </mask>
            <mask id="gsMb" maskUnits="userSpaceOnUse" x="0" y="0" width="352" height="352">
              <polygon points="0,96 96,96 96,352 0,257" fill="#fff" />
            </mask>
            <linearGradient id="gsSh" x1="0" x2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset=".5" stopColor="#fff" stopOpacity=".6" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            {/* the photo: change this path to change the picture */}
            <image
              id="gsImg" href="/images/services-t.jpg"
              x="0" y="0" width="352" height="352"
              preserveAspectRatio="xMidYMid slice"
            />
          </defs>

          <g className="gs-pc gs-pa" mask="url(#gsMa)">
            <g className="gs-zm"><g className="gs-mv"><use href="#gsImg" /></g></g>
          </g>
          <g className="gs-pc gs-pb" mask="url(#gsMb)">
            <g className="gs-zm"><g className="gs-mv"><use href="#gsImg" /></g></g>
          </g>

          <g mask="url(#gsMa)">
            <rect className="gs-shine" x="-60" y="-10" width="120" height="120" fill="url(#gsSh)" transform="skewX(-14)" />
          </g>
          <g mask="url(#gsMb)">
            <rect className="gs-shine" x="-60" y="90" width="120" height="280" fill="url(#gsSh)" transform="skewX(-14)" />
          </g>
        </svg>
      </div>

      <div className="gs-stats">
        {groupStats.map((s, i) => (
          <StatBox key={i} i={i} end={s.end} lines={s.lines} go={inView} />
        ))}
      </div>

      <p className="gs-pr">
        {words.map((w, k) => (
          <span className="gs-w" style={{ "--k": k }} key={k}>
            {w + " "}
          </span>
        ))}
      </p>
    </section>
  );
}