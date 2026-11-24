export default function Logo({ src = "/images/logo.png", alt = "Al Tasnim Gulf Ltd" }) {
  return (
    <a className="logo" href="#home" aria-label={`${alt} - home`}>
      <img src={src} alt={alt} />
    </a>
  );
}