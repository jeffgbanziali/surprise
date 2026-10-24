interface P { x: number; y: number; vx: number; vy: number; r: number; a: number; t: "p" | "g" | "h"; l: number }
const RM = () => matchMedia("(prefers-reduced-motion:reduce)").matches;
const VIE = 1e9;
const MAX = 140;
let parts: P[] = []; let mx = -99, my = -99;
const mk = (t: "p" | "g", y = -20): P => ({ x: Math.random() * innerWidth, y, vx: Math.random() - 0.5, vy: 0.6 + Math.random() * 1.3, r: t === "p" ? 6 + Math.random() * 7 : 1 + Math.random() * 1.8, a: Math.random() * 6, t, l: VIE });
const push = (p: P) => { parts.push(p); if (parts.length > MAX) parts = parts.slice(-MAX); };
export const fx = {
  burst(x: number, y: number, n = 16) { for (let i = 0; i < (RM() ? 4 : n); i++) { const a = Math.random() * 6.28, s = 1 + Math.random() * 3.4; push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, r: 3, a: 0, t: "h", l: 70 }); } },
  petals(n: number) { for (let i = 0; i < (RM() ? 8 : n); i++) push(mk("p", -Math.random() * 400)); },
};
export function startFx(cv: HTMLCanvasElement) {
  const cx = cv.getContext("2d");
  if (!cx) return () => { parts = []; };
  let W = 0, H = 0, raf = 0, pause = document.hidden;
  const dpr = Math.min(devicePixelRatio || 1, 1.5);
  const rs = () => {
    W = innerWidth; H = innerHeight;
    cv.width = Math.floor(W * dpr); cv.height = Math.floor(H * dpr);
    cv.style.width = `${W}px`; cv.style.height = `${H}px`;
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  rs(); addEventListener("resize", rs);
  for (let i = 0; i < (RM() ? 8 : 36); i++) { const p = mk(Math.random() < 0.7 ? "p" : "g"); p.y = Math.random() * H; push(p); }
  const mv = (e: PointerEvent) => {
    mx = e.clientX; my = e.clientY;
    const s = document.documentElement.style; s.setProperty("--mx", (e.clientX / W - 0.5).toFixed(3)); s.setProperty("--my", (e.clientY / H - 0.5).toFixed(3));
    if (!RM() && e.pointerType === "mouse" && Math.random() < 0.3) push({ x: e.clientX, y: e.clientY, vx: Math.random() - 0.5, vy: Math.random() - 0.5, r: 2, a: 0, t: "g", l: 55 });
  };
  addEventListener("pointermove", mv);
  const vis = () => { pause = document.hidden; if (!pause && !raf) loop(); };
  document.addEventListener("visibilitychange", vis);
  const loop = () => {
    if (pause) { raf = 0; return; }
    cx.clearRect(0, 0, W, H);
    parts = parts.filter((p) => p.l > 0 && p.y < H + 30);
    if (parts.filter((p) => p.l > 1e8).length < (RM() ? 8 : 32)) push(mk(Math.random() < 0.7 ? "p" : "g"));
    for (const p of parts) {
      p.x += p.vx + Math.sin(p.y / 60 + p.a) * 0.4; p.y += p.vy; p.a += 0.03;
      if (p.l < 1e8) { p.l--; p.vy += 0.03; }
      const d = Math.hypot(p.x - mx, p.y - my); if (d < 100 && p.l > 1e8) p.x += ((p.x - mx) / d) * 2.5;
      cx.save(); cx.translate(p.x, p.y); cx.globalAlpha = p.l < 1e8 ? p.l / 70 : 0.85;
      if (p.t === "p") { cx.rotate(p.a); cx.fillStyle = p.r > 10 ? "#a78bfa" : "#e8456f"; cx.beginPath(); cx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, 6.3); cx.fill(); }
      else { cx.fillStyle = p.t === "h" ? "#ff7fa3" : "#dcb76d"; cx.beginPath(); cx.arc(0, 0, p.r, 0, 6.3); cx.fill(); }
      cx.restore();
    }
    raf = requestAnimationFrame(loop);
  };
  loop();
  return () => {
    pause = true;
    cancelAnimationFrame(raf); raf = 0;
    removeEventListener("resize", rs); removeEventListener("pointermove", mv);
    document.removeEventListener("visibilitychange", vis);
    parts = [];
  };
}
