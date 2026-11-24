import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides } from "../../data/content";

const SLIDE_MS = 5500; // time each slide stays (the ring fills in this time)
const SWEEP_MS = 1300; // must match the 1.3s in the CSS "sweep" animation

function HeroButton({ href, children }) {
  return (
    <a href={href} className="hbtn">
      <span className="hbtn__label">{children}</span>
      <span className="hbtn__circle">
        <img src="/images/arrow.png" alt="" />
      </span>
    </a>
  );
}

export default function HeroSlider() {
  const [cur, setCur] = useState(0);     // slide on screen
  const [prev, setPrev] = useState(null); // slide being covered during the sweep
  const busy = useRef(false);
  const timeout = useRef(null);

  const go = useCallback(
    (n) => {
      if (busy.current || n === cur) return;
      busy.current = true;
      setPrev(cur);
      setCur(n);
      timeout.current = setTimeout(() => {
        setPrev(null);
        busy.current = false;
      }, SWEEP_MS + 50);
    },
    [cur]
  );

  // autoplay
  useEffect(() => {
    const id = setInterval(() => go((cur + 1) % heroSlides.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [cur, go]);

  useEffect(() => () => clearTimeout(timeout.current), []);

  const slideClass = (i) => {
    if (i === cur) return prev !== null ? "enter" : "on";
    if (i === prev) return "leave";
    return "";
  };

  return (
    <section className="hero" id="home">
      <div className="slides">
        {heroSlides.map((s, i) => (
          <div key={i} className={`slide ${slideClass(i)}`}>
            <div className="par">
              <div className={`ph ${s.ph}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="heads">
        {heroSlides.map((s, i) => (
          <h1 key={i} className={i === cur ? "active" : ""}>
            {s.lines.map((line, k) => (
              <span key={line} className="ln" style={{ "--k": k }}>
                <b>{line}</b>
              </span>
            ))}
          </h1>
        ))}
      </div>

      <div className="hero-actions" key={cur}>
        <HeroButton href="#footprint">Explore our projects</HeroButton>
        <HeroButton href="#services">Mining capabilities</HeroButton>
      </div>

      <div className="frame" aria-hidden="true">
        <i className="tl" />
        <i className="tr" />
        <i className="bl" />
        <i className="br" />
      </div>

      {/* progress ring dots */}
      <div className="dots" style={{ "--dur": `${SLIDE_MS}ms` }}>
        {heroSlides.map((_, i) => (
          <button
            key={i}
            className={i === cur ? "active" : ""}
            onClick={() => go(i)}
            aria-label={`Slide ${i + 1}`}
            aria-current={i === cur}
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <circle className="trk" cx="10" cy="10" r="9" />
              {i === cur && (
                <circle
                  key={cur}
                  className="bar"
                  cx="10"
                  cy="10"
                  r="9"
                  transform="rotate(-90 10 10)"
                />
              )}
            </svg>
            <i />
          </button>
        ))}
      </div>
    </section>
  );
}