import { useEffect, useState } from "react";

const DURATION = 2800; // how long the 0 to 100% count takes (ms)

export default function Loader() {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [pct, setPct] = useState(0);
  const [out, setOut] = useState(false);   // curtain opening
  const [gone, setGone] = useState(reduce); // loader removed

  useEffect(() => {
    if (reduce) return;

    const root = document.documentElement;
    root.classList.add("loading"); // locks scroll and pauses hero animations
    window.scrollTo(0, 0);

    let raf;
    let t0 = null;
    const timers = [];

    const step = (t) => {
      if (!t0) t0 = t;
      const p = Math.min((t - t0) / DURATION, 1);
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setPct(Math.round(eased * 100));

      if (p < 1) {
        raf = requestAnimationFrame(step);
      } else {
        timers.push(setTimeout(() => setOut(true), 250));   // open the curtain
        timers.push(
          setTimeout(() => {
            root.classList.remove("loading");                // unlock page
            setGone(true);                                   // remove loader
          }, 1400)
        );
      }
    };

    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      root.classList.remove("loading");
    };
  }, [reduce]);

  if (gone) return null;

  return (
    <div className={`loader ${out ? "out" : ""}`} aria-hidden="true">
      <div className="lp t" />
      <div className="lp b" />

      <div className="ld-c">
       <img className="ld-logo" src="/images/logo.png" alt="" />

        {/* <div className="ld-name">
          Al Tasnim<small>Gulf Ltd</small>
        </div> */}

        <div className="ld-count">
          <span>{pct}</span>
          <sup>%</sup>
        </div>

        <div className="ld-line">
          <i style={{ transform: `scaleX(${pct / 100})` }} />
        </div>

        <div className="ld-tag">Mineral exploration · Contract mining</div>
      </div>
    </div>
  );
}