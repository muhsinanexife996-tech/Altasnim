/* Outline icons drawn to match the design: pin, envelope, globe with orbit dots, handset */
const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };

const DOTS = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2;
  return [12 + 10.4 * Math.cos(a), 12 + 10.4 * Math.sin(a)];
});

const PATHS = {
  pin: (
    <>
      <path fillRule="evenodd" fill="currentColor"
        d="M12 1.2a7 7 0 0 0-7 7c0 4.9 7 11.4 7 11.4s7-6.5 7-11.4a7 7 0 0 0-7-7zm0 9.6a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4z" />
      <ellipse cx="12" cy="21.7" rx="4.4" ry="1.2" {...S} />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="1.6" {...S} />
      <path d="M2.6 6.2L12 13.4l9.4-7.2M2.8 18.2l6.6-6M21.2 18.2l-6.6-6" {...S} />
    </>
  ),
  web: (
    <>
      <circle cx="12" cy="12" r="6.4" {...S} />
      <ellipse cx="12" cy="12" rx="2.7" ry="6.4" {...S} />
      <path d="M5.6 12h12.8M6.5 8.6h11M6.5 15.4h11" {...S} />
      {DOTS.map(([x, y], i) => <circle key={i} cx={x.toFixed(2)} cy={y.toFixed(2)} r="0.95" fill="currentColor" />)}
    </>
  ),
  tel: (
    <path {...S}
      d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  ),
};

export default function Icon({ name }) {
  return (
    <i className="cd-ico" aria-hidden="true">
      <svg viewBox="0 0 24 24">{PATHS[name]}</svg>
    </i>
  );
}