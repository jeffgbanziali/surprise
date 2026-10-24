import { useEffect, useRef } from "react";
import { startFx } from "../lib/fx";
export default function Particules() {
  const r = useRef<HTMLCanvasElement>(null);
  useEffect(() => startFx(r.current!), []);
  return <canvas ref={r} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] h-full w-full" />;
}
