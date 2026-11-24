import useCountUp from "../../hooks/useCountUp";

export default function CounterStat({ end, suffix = "", label, variant = "plain" }) {
  const { ref, value } = useCountUp(end);
  const isBox = variant === "box";

  return (
    <div ref={ref} className={isBox ? "box" : "c"}>
      <div className="num">
        {value.toLocaleString("en-US")}
        {isBox ? <sup>{suffix}</sup> : suffix}
      </div>
      <div className="lbl">{label}</div>
    </div>
  );
}