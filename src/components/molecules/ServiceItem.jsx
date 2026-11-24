import Reveal from "../atoms/Reveal";

export default function ServiceItem({ no, title, text, delay }) {
  return (
    <Reveal delay={delay} x={50} y={0}>
      <div className="item">
        <span className="n">{no}</span>
        <div>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </div>
    </Reveal>
  );
}