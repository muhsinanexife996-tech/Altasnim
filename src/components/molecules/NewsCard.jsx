import Reveal from "../atoms/Reveal";

export default function NewsCard({ ph, date, title, text, delay }) {
  return (
    <Reveal delay={delay}>
      <article className="card">
        <div className="im">
          <div className={`ph ${ph}`} />
        </div>
        <div className="bd">
          <span className="date">{date}</span>
          <h3>{title}</h3>
          <p>{text}</p>
          <a className="more" href="#news">Know more</a>
        </div>
      </article>
    </Reveal>
  );
}