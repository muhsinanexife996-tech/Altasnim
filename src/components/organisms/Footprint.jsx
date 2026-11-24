import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { footprint } from "../../data/content";

/* counts 0 -> end once `go` is true */
function Count({ end, go, delay }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!go) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setVal(end); return; }

    let raf;
    const DUR = 1800;
    const t0 = performance.now() + delay;
    const tick = (now) => {
      const p = Math.min(Math.max((now - t0) / DUR, 0), 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [go, end, delay]);

  return <>{val}</>;
}

export default function Footprint() {
  const secRef = useRef(null);
  const barRef = useRef(null);
  const inView = useInView(secRef, { once: true, amount: 0.35 });

  /* cursor glow: store the pointer position inside the bar */
  const handleMove = (e) => {
    const bar = barRef.current;
    if (!bar) return;
    const r = bar.getBoundingClientRect();
    bar.style.setProperty("--mx", `${e.clientX - r.left}px`);
    bar.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section ref={secRef} className={`fp-sec${inView ? " in" : ""}`}>
      <h2 className="fp-ttl">Our Exploration Footprint</h2>

      <div className="fp-bar" ref={barRef} onMouseMove={handleMove}>
        {/* border that draws itself */}
        <svg className="fp-frame" aria-hidden="true">
          <rect pathLength="1" rx="18" ry="18" />
        </svg>

        {footprint.map((s, i) => (
          <div className="fp-stat" style={{ "--i": i }} key={i}>
            <div className="fp-num">
              <Count end={s.end} go={inView} delay={900 + i * 120} />
              {s.suffix && <small>{s.suffix}</small>}
            </div>
            <p className="fp-lbl">
              {s.lines[0]}
              <br />
              {s.lines[1]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}