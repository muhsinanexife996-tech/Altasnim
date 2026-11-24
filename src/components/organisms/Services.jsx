import { useRef } from "react";
import { useInView } from "framer-motion";
import { services } from "../../data/content";

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className={`sv${inView ? " in" : ""}`}>
      {/* T-shaped photo: 3 masked pieces sharing one photo */}
      <div className="sv-logo">
        <div className="sv-pcs">
          {[1, 2, 3].map((n, i) => (
            <div className={`sv-pc sv-p${n}`} style={{ "--i": i }} key={n}>
              <div className="sv-ph">
                <i className="sv-mv" />
                <i className="sv-shine" />
              </div>
            </div>
          ))}
        </div>

        <svg className="sv-rings" viewBox="0 0 490 318" aria-hidden="true">
          <circle className="sv-r sv-ro" style={{ "--r": 0 }} cx="165" cy="160" r="228" pathLength="1" />
          <circle className="sv-r sv-rb" style={{ "--r": 1 }} cx="141" cy="135" r="196" pathLength="1" />
          <g className="sv-orb">
            <circle className="sv-dot" cx="393" cy="160" r="5" fill="#f7841f" />
          </g>
          <g className="sv-orb sv-orb2">
            <circle className="sv-dot" cx="337" cy="135" r="5" fill="#2b3f9e" />
          </g>
        </svg>
      </div>

      <div className="sv-list">
        {services.map((s, i) => (
          <div className="sv-it" style={{ "--j": i }} key={s.num}>
            <div className="sv-hd">
              <span className="sv-n">
                <span className="sv-m"><b>{s.num}</b></span>
              </span>
              <h3 className="sv-t">
                <span className="sv-m"><b>{s.title}</b></span>
              </h3>
            </div>

            {/* paragraph split into words so they appear one by one */}
            <p className="sv-d">
              {s.text.split(" ").map((w, k) => (
                <span className="sv-w" style={{ "--k": k }} key={k}>
                  {w + " "}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}