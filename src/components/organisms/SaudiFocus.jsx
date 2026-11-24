import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { saudiFocus } from "../../data/content";

export default function SaudiFocus() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [val, setVal] = useState(0);
  const { titleLines, text, end, captionLines } = saudiFocus;

  /* counter 0 -> end, starts 0.9s after the section appears */
  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setVal(end); return; }

    let raf;
    const DUR = 2300;
    const t0 = performance.now() + 900;
    const tick = (now) => {
      const p = Math.min(Math.max((now - t0) / DUR, 0), 1);
      setVal(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end]);

  const tens = Math.floor(val / 10);
  const ones = val % 10;
  const words = text.split(" ");

  return (
    <section ref={ref} className={`sf${inView ? " in" : ""}`}>
      {/* left: beige card + text */}
      <div className="sf-lt">
        <div className="sf-card" />
        <h2 className="sf-ttl">
          {titleLines.map((l, k) => (
            <span className="sf-ln" key={k}>
              <b style={{ "--k": k }}>{l}</b>
            </span>
          ))}
        </h2>
        <p className="sf-par">
          {words.map((w, k) => (
            <span className="sf-w" style={{ "--k": k }} key={k}>
              {w + " "}
            </span>
          ))}
        </p>
      </div>

      {/* the 50+ : SVG mask over a photo (change /images/focus-50.jpg to change the photo) */}
      <div className="sf-nvw">
        <div className="sf-nve">
          <svg className="sf-nv" viewBox="500 90 610 340" role="img" aria-label={`${end} plus`}>
            <defs>
              <mask id="sfMask" maskUnits="userSpaceOnUse" x="500" y="90" width="610" height="340">
                <g className="sf-gl">
                  <text x="626" y="379" fontSize="346" style={{ opacity: tens === 0 ? 0 : 1 }}>{tens}</text>
                </g>
                <g className="sf-gl">
                  <text x="842" y="379" fontSize="346">{ones}</text>
                </g>
                <g className="sf-gl">
                  <text x="1005" y="252" fontSize="170">+</text>
                </g>
              </mask>
            </defs>

            <g mask="url(#sfMask)">
              <g className="sf-pp">
                <g className="sf-pa">
                  <image
                    href="/images/focus-50.jpg"
                    x="500" y="95" width="610" height="330"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </g>
              </g>
              {/* light orange wash, shown on hover */}
              <rect className="sf-wash" x="500" y="90" width="610" height="340" />
            </g>
          </svg>
        </div>
      </div>

      {/* caption */}
      <div className="sf-cp">
        {captionLines.map((l, k) => (
          <span className="sf-ln" key={k}>
            <b style={{ "--k": k }}>{l}</b>
          </span>
        ))}
      </div>
    </section>
  );
}