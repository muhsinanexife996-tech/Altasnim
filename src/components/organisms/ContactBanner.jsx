import { useEffect, useRef, useState } from "react";
import { contactPage } from "../../data/content";

const COLS = [[40, 80, 255], [62, 58, 238], [28, 112, 255], [128, 60, 255], [247, 132, 31], [74, 104, 255], [112, 52, 242]];
const POOL = [0, 0, 0, 1, 2, 2, 3, 3, 5, 6, 4];
const DMAX = 0.5;
const LINES = [];
const STARS = [];

(function build() {
  let seed = 23;
  const r = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  let d = 0.012, cl = 0, f = 0;
  while (d < DMAX) {
    let k = 2 + ((r() * 4) | 0);
    const ci = cl % 5 === 3 ? 4 : POOL[(r() * POOL.length) | 0];
    cl++;
    if (ci === 4) k = 1 + ((r() * 2) | 0);
    for (let j = 0; j < k && d < DMAX; j++) {
      f = d / DMAX;
      LINES.push({
        d, f, c: COLS[ci],
        w: (ci === 4 ? 2 : 1) + Math.pow(f, 1.7) * (ci === 4 ? 14 : 22) * (0.7 + r() * 0.6),
        v: 0.04 + r() * 0.1, ph: r(), dash: ci === 4 && f < 0.6,
      });
      d += 0.004 + f * 0.017;
    }
    d += 0.01 + f * 0.06;
  }
  for (let i = 0; i < 60; i++) {
    STARS.push({ x: 0.3 + r() * 0.7, y: r() * 0.8, ph: r() * 6.28, s: 0.8 + r() * 1.6, c: r() < 0.45 ? COLS[4] : COLS[2] });
  }
})();

export default function ContactBanner() {
  const bn = useRef(null);
  const cv = useRef(null);
  const cur = useRef(null);
  const [on, setOn] = useState(false);
  const lines = contactPage.banner.lines;

  useEffect(() => {
    const t = setTimeout(() => setOn(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = bn.current, c = cv.current, ctx = c.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, dpr = 1, tm = reduce ? 4 : 0, last = 0, fade = 0, running = true, raf = 0;
    const M = { x: 0, y: 0, tx: 0, ty: 0, a: 0, ta: 0 };
    const PX = new Float32Array(400), PY = new Float32Array(400), HB = new Float32Array(400);
    let hdx = 0, hdy = 0, hb = 0;

    const clearBg = () => {
      ctx.globalCompositeOperation = "source-over";
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, "rgb(6,8,38)"); g.addColorStop(1, "rgb(14,16,66)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    };
    const size = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = el.clientWidth; H = el.clientHeight;
      if (!W || !H) return;
      c.width = Math.round(W * dpr); c.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      clearBg();
    };

    const hv = (x, y) => {
      hdx = 0; hdy = 0; hb = 0;
      if (M.a < 0.01) return;
      const dx = x - M.x, dy = y - M.y, d2 = dx * dx + dy * dy;
      const R = Math.min(W * 0.34, H * 0.9);
      const f = Math.exp(-d2 / (R * R * 0.55)) * M.a, d = Math.sqrt(d2) + 0.01;
      const w = Math.sin(d * 0.05 - tm * 7) * f * 12;
      hdx = (dx / d) * w; hdy = (dy / d) * w; hb = f * 0.6;
    };
    const col = (c, a, b) => {
      let r = c[0], g = c[1], bl = c[2];
      if (b > 0) {
        const k = Math.min(0.6, b) * 0.5;
        r += (255 - r) * k; g += (255 - g) * k; bl += (255 - bl) * k;
        a = Math.min(1, a + b * 0.4);
      }
      return `rgba(${r | 0},${g | 0},${bl | 0},${a.toFixed(3)})`;
    };
    const gstyle = (c, a, k) => {
      const g = ctx.createLinearGradient(PX[0], PY[0], PX[k - 1], PY[k - 1]);
      g.addColorStop(0, col(c, a * 0.15, 0)); g.addColorStop(0.08, col(c, a, 0));
      g.addColorStop(0.92, col(c, a, 0)); g.addColorStop(1, col(c, a * 0.15, 0));
      return g;
    };
    const runs = (k, c, a, w) => {
      let i = 0;
      while (i < k) {
        if (HB[i] > 0.06) {
          const s = i; let sum = 0;
          ctx.beginPath(); ctx.moveTo(PX[i], PY[i]);
          while (i < k && HB[i] > 0.06) { ctx.lineTo(PX[i], PY[i]); sum += HB[i]; i++; }
          ctx.strokeStyle = col(c, a, sum / (i - s)); ctx.lineWidth = Math.min(w, 6); ctx.stroke();
        } else i++;
      }
    };

    const draw = () => {
      const S = Math.max(W, H * 1.6), th = -0.366, cx = W * 0.67, cy = H * 0.22;
      const ux = Math.cos(th), uy = Math.sin(th), nx = -uy, ny = ux, phn = Math.atan2(ny, nx);
      const L = S * 0.6, NT = W < 700 ? 46 : 72, NC = W < 700 ? 30 : 44;

      for (const s of STARS) {
        const tw = 0.3 + 0.7 * Math.abs(Math.sin(tm * 0.8 + s.ph));
        ctx.fillStyle = col(s.c, tw * 0.8, 0);
        ctx.beginPath();
        ctx.arc(s.x * W + Math.sin(tm * 0.2 + s.ph) * 6, s.y * H + Math.cos(tm * 0.17 + s.ph) * 5, s.s, 0, 6.283);
        ctx.fill();
      }
      ctx.lineCap = "round"; ctx.lineJoin = "round";

      for (let li = LINES.length - 1; li >= 0; li--) {
        const ln = LINES[li];
        const d = ln.d * S * (1 + 0.045 * Math.sin(tm * 1.5 - ln.d * 14));
        let k = 0, i;
        for (i = 0; i <= NT; i++) { const s = L * (1 - i / NT); PX[k] = cx + d * nx + s * ux; PY[k] = cy + d * ny + s * uy; k++; }
        for (i = 1; i < NC; i++) { const p = phn + (Math.PI * i) / NC; PX[k] = cx + d * Math.cos(p); PY[k] = cy + d * Math.sin(p); k++; }
        for (i = 0; i <= NT; i++) { const s = (L * i) / NT; PX[k] = cx - d * nx + s * ux; PY[k] = cy - d * ny + s * uy; k++; }
        for (i = 0; i < k; i++) { hv(PX[i], PY[i]); PX[i] += hdx; PY[i] += hdy; HB[i] = hb; }

        const a = 0.85 * (1 - 0.72 * ln.f), w = ln.w;
        ctx.beginPath(); ctx.moveTo(PX[0], PY[0]);
        for (i = 1; i < k; i++) ctx.lineTo(PX[i], PY[i]);
        if (w > 5) {
          const layers = [[1.6, 0.05], [1.25, 0.08], [1, 0.14], [0.5, 0.2]];
          for (const [m, al] of layers) { ctx.strokeStyle = gstyle(ln.c, a * al * 3, k); ctx.lineWidth = w * m; ctx.stroke(); }
        } else {
          ctx.strokeStyle = gstyle(ln.c, a * 0.2, k); ctx.lineWidth = w * 4; ctx.stroke();
          if (ln.dash) { ctx.setLineDash([0.4, w * 2.6]); ctx.lineDashOffset = -tm * 26; }
          ctx.strokeStyle = gstyle(ln.c, a, k); ctx.lineWidth = w; ctx.stroke();
          if (ln.dash) { ctx.setLineDash([]); ctx.lineDashOffset = 0; }
        }
        if (M.a > 0.02) runs(k, ln.c, a + 0.15, w * 1.3);

        if (ln.f < 0.7) {
          const h = (((tm * ln.v + ln.ph) % 1.3) - 0.15) * (k - 1), P = 0.2 * k;
          for (let z = 0; z < 3; z++) {
            const i0 = Math.max(0, Math.floor(h - P + (z * P) / 3)), i1 = Math.min(k - 1, Math.ceil(h - P + ((z + 1) * P) / 3));
            if (i1 > i0) {
              ctx.beginPath(); ctx.moveTo(PX[i0], PY[i0]);
              for (i = i0 + 1; i <= i1; i++) ctx.lineTo(PX[i], PY[i]);
              const cc = z === 2 ? [(ln.c[0] + 510) / 3 | 0, (ln.c[1] + 510) / 3 | 0, (ln.c[2] + 510) / 3 | 0] : ln.c;
              ctx.strokeStyle = col(cc, 0.25 + z * 0.35, 0); ctx.lineWidth = Math.min(w, 5) * (1 + z * 0.5); ctx.stroke();
            }
          }
        }
      }
    };

    const frame = (ts) => {
      const dt = Math.min(0.05, (ts - last) / 1000 || 0.016); last = ts;
      if (running) {
        tm += reduce ? 0 : dt;
        M.x += (M.tx - M.x) * 0.2; M.y += (M.ty - M.y) * 0.2; M.a += (M.ta - M.a) * 0.08;
        const nd = Math.min(2, window.devicePixelRatio || 1);
        if (nd !== dpr || c.width !== Math.round(W * nd)) size();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.setLineDash([]);
        clearBg(); ctx.globalCompositeOperation = "lighter"; draw(); ctx.globalCompositeOperation = "source-over";
        if (fade < 1) { fade = Math.min(1, fade + dt * 0.9); c.style.opacity = fade; }
        el.style.setProperty("--px", (((M.x / W - 0.5) * 2) * M.a).toFixed(3));
        el.style.setProperty("--py", (((M.y / H - 0.5) * 2) * M.a).toFixed(3));
      }
      if (!reduce) raf = requestAnimationFrame(frame);
    };

    const move = (e) => {
      const r = el.getBoundingClientRect();
      M.tx = e.clientX - r.left; M.ty = e.clientY - r.top;
      if (!M.a && M.ta === 0) { M.x = M.tx; M.y = M.ty; }
      M.ta = 1;
      if (cur.current) { cur.current.style.setProperty("--cx", M.tx + "px"); cur.current.style.setProperty("--cy", M.ty + "px"); }
    };
    const leave = () => { M.ta = 0; };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerdown", move);
    el.addEventListener("pointerleave", leave);
    const io = new IntersectionObserver((es) => { running = es[0].isIntersecting; });
    io.observe(el);
    const ro = new ResizeObserver(size);
    ro.observe(el);
    size();
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerdown", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section className="cb" ref={bn}>
      <canvas ref={cv} aria-hidden="true" />
      <div className="cb-cur" ref={cur} aria-hidden="true" />
      <h1 className={`cb-tt${on ? " in" : ""}`}>
        {lines.map((t, l) => (
          <span className="cb-ln" style={{ "--l": l }} key={l}>
            <b>
              {[...t].map((ch, i) =>
                ch === " " ? <span className="cb-sp" key={i} /> : <span className="cb-ch" key={i}>{ch}</span>
              )}
            </b>
          </span>
        ))}
      </h1>
    </section>
  );
}