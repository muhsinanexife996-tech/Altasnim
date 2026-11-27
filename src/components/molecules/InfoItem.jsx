// import Icon from "../atoms/Icon";

// export default function InfoItem({ icon, lines, href, className = "", style }) {
//   const text = lines.map((l, i) => (
//     <span key={i}>
//       {l}
//       {i < lines.length - 1 && <br />}
//     </span>
//   ));
//   return (
//     <div className={`cd-li ${className}`} style={style}>
//       <Icon name={icon} />
//       <span className="cd-t">
//         {href ? <a href={href}>{text}</a> : text}
//       </span>
//     </div>
//   );
// }

import Icon from "../atoms/Icon";

/* lines: string  or  { pre: "Telephone: ", t: "+968 2421 4000", href: "tel:+96824214000" }
   every line with an href becomes its own link with its own hover effect */
export default function InfoItem({ icon, lines, href, className = "", style }) {
  const text = lines.map((l, i) => {
    const o = typeof l === "string" ? { t: l, href } : l;
    return (
      <span key={i}>
        {o.pre}
        {o.href ? <a className="cd-lk" href={o.href}>{o.t}</a> : o.t}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
  return (
    <div className={`cd-li ${className}`} style={style}>
      <Icon name={icon} />
      <span className="cd-t">{text}</span>
    </div>
  );
}