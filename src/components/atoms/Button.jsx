export default function Button({ children, href = "#", variant = "solid" }) {
  return (
    <a href={href} className={`btn ${variant === "light" ? "btn--light" : ""}`}>
      <span>{children}</span>
      <i>↗</i>
    </a>
  );
}