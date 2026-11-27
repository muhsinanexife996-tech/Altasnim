import { useRef } from "react";
import { useInView } from "framer-motion";
import { contactPage } from "../../data/content";
import InfoItem from "../molecules/InfoItem";
import EnquiryForm from "../molecules/EnquiryForm";

const BASE = import.meta.env.BASE_URL;

export default function ContactDetails() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  const { intro, company, hq, form, help } = contactPage;

  return (
    <section ref={ref} className={`cd${inView ? " in" : ""}`} id="contact-details">
      <h2 className="cd-gt cd-rv">{intro}</h2>

      <div className="cd-ic cd-rv" style={{ "--i": 1 }}>
        <div className="cd-ph">
          <div className="cd-im" style={{ "--photo": `url(${BASE}${company.photo})` }} />
          <svg className="cd-fr" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path pathLength="1" d="M0 22V0H22M78 0H100V22M100 78V100H78M22 100H0V78" />
          </svg>
          {/* <span className="cd-tag">{company.photoLabel}</span> */}
        </div>
        <div className="cd-inf">
          <h3>{company.name}</h3>
          {company.items.map((it) => <InfoItem key={it.icon} {...it} />)}
        </div>
      </div>

      <div className="cd-two">
        <div className="cd-hq">
          <h3 className="cd-rv" style={{ "--i": 2 }}>{hq.name}</h3>
          <p className="cd-sub cd-rv" style={{ "--i": 3 }}>{hq.sub}</p>
          {hq.items.map((it, i) => (
            <InfoItem key={it.icon + i} {...it} className="cd-rv" style={{ "--i": 4 + i }} />
          ))}
        </div>
        <EnquiryForm form={form} style={{ "--i": 3 }} />
      </div>

      <div className="cd-hp">
        <h3 className="cd-rv">{help.title}</h3>
        <ul>
          {help.items.map((t, i) => (
            <li key={t} className="cd-rv" style={{ "--i": i + 1 }}>{t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}