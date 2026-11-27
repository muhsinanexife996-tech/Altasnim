import { useState } from "react";

/* Put your own form endpoint here (PHP mail script, Formspree, etc.).
   Leave it empty to just show the "Thank you" message without sending. */
const FORM_ENDPOINT = "";

export default function EnquiryForm({ form, style }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle"); // idle | sending | sent | error

  const set = (name, v) => setValues((o) => ({ ...o, [name]: v }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    form.fields.forEach((f) => {
      if (f.required && !String(values[f.name] || "").trim()) errs[f.name] = true;
    });
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setState("sending");
    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error("failed");
      }
      setState("sent");
      setValues({});
      setTimeout(() => setState("idle"), 2600);
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 2600);
    }
  };

  return (
    <form className="cd-fm cd-rv" style={style} onSubmit={submit} noValidate>
      <h4>{form.title}</h4>
      <p className="cd-req">{form.note}</p>

      <div className="cd-fg">
        {form.fields.map((f, i) => {
          const v = values[f.name] || "";
          const cls = [
            "cd-fld",
            "cd-rv",
            f.full && "full",
            f.type === "textarea" && "ta",
            f.type === "select" && "sel",
            v && "has",
            errors[f.name] && "err",
          ].filter(Boolean).join(" ");
          const common = {
            id: `f-${f.name}`,
            name: f.name,
            value: v,
            onChange: (e) => set(f.name, e.target.value),
            "aria-label": f.label,
            "aria-required": f.required || undefined,
          };
          return (
            <div className={cls} key={f.name} style={{ "--i": 4 + i }}>
              {f.type === "select" ? (
                <select {...common}>
                  <option value="" />
                  {f.options.map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : f.type === "textarea" ? (
                <textarea {...common} />
              ) : (
                <input type={f.type} autoComplete="off" {...common} />
              )}
              <label htmlFor={`f-${f.name}`}>
                {f.label}{f.required ? " *" : ""}
              </label>
              <span className="cd-bd" />
            </div>
          );
        })}
      </div>

      <button className={`cd-sb ${state}`} type="submit" disabled={state === "sending"}>
        <span className="cd-lb">
          {state === "sent" ? form.sent : state === "error" ? form.error : form.submit}
        </span>
        {state === "idle" && <span className="cd-arw cd-lb">→</span>}
      </button>
    </form>
  );
}