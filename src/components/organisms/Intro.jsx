import { useRef } from "react";
import { useInView } from "framer-motion";
import { introPics } from "../../data/content";

const headingLines = ["Exploring Mineral", "Potential Delivering", "Mining Operations"];
const TILT = 16; // maximum tilt in degrees

export default function Intro() {
  const ref = useRef(null);
  const txtRef = useRef(null);

  // each plays once, the first time it scrolls into view
  const inView = useInView(ref, { once: true, amount: 0.15 });   // heading + photos
  const txtIn = useInView(txtRef, { once: true, amount: 0.3 });  // text below the photos

  // 3D tilt + moving glare: follows the cursor over a photo
  const handleMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${((x - 0.5) * TILT).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${((0.5 - y) * TILT).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
  };
  const handleLeave = (e) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <section ref={ref} className={`intro-sec ${inView ? "in" : ""}`} id="about">
      <div className="wrap intro">
        <h2 className="intro__hd">
          {headingLines.map((line, k) => (
            <span key={line} className="iln" style={{ "--k": k }}>
              <b>{line}</b>
            </span>
          ))}
        </h2>

        <div>
          <div className="pics">
            {introPics.map((ph, i) => (
              <div
                key={ph}
                className="pic"
                style={{ "--i": i }}
                onMouseMove={handleMove}
                onMouseLeave={handleLeave}
              >
                <div className={`im ph ${ph}`} />
                {/* five strips that cover the photo, then lift away */}
                <div className="strips" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <span key={s} style={{ "--s": s }} />
                  ))}
                </div>
                <span className="glare" aria-hidden="true" />
              </div>
            ))}
          </div>

          <div ref={txtRef} className={`intro__txt ${txtIn ? "in" : ""}`}>
            <p style={{ "--j": 0 }}>
              Exploration relates to the blocks Al Tasnim Gulf holds in its own name. Client
              services are mining operations, delivered on the licence holder’s ground.
            </p>
            <p style={{ "--j": 1 }}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
              euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
              minim veniam, quis nostrud exerci velit esse molestie consequat, vel illum dolore
              eu feugiat nulla facilisis at vero eros et accumsan
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}