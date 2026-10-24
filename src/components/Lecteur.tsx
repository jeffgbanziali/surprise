import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
export default function Lecteur() {
  const [ouvert, setOuvert] = useState(false), [src, setSrc] = useState<string | null>(null), [lit, setLit] = useState(false), [muet, setMuet] = useState(false), [vol, setVol] = useState(0.6), [err, setErr] = useState("");
  const a = useRef<HTMLAudioElement>(null);
  useEffect(() => { if (a.current) { a.current.volume = vol; a.current.muted = muet; } }, [vol, muet, src]);
  useEffect(() => () => { if (src) URL.revokeObjectURL(src); }, [src]);
  useEffect(() => {
    if (!ouvert) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOuvert(false); };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [ouvert]);
  return (
    <>
      <button type="button" className="ib" aria-expanded={ouvert} aria-controls="lecteur-musique" onClick={() => setOuvert(!ouvert)}>🎵 Musique</button>
      <AnimatePresence>
        {ouvert && (
          <motion.div id="lecteur-musique" initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10 }}
            role="region" aria-label="Lecteur de musique" className={`glass fixed z-40 flex w-[min(88vw,300px)] flex-col gap-2.5 p-4 text-base ${lit ? "play" : ""}`}
            style={{ left: "max(1rem, env(safe-area-inset-left, 0px))", top: "calc(env(safe-area-inset-top, 0px) + 3.5rem)" }}>
            <div className="waves flex h-6 items-end gap-[3px]" aria-hidden="true">{Array.from({ length: 7 }, (_, i) => <b key={i} />)}</div>
            <p className="leading-snug">{err || (src ? "Fichier prêt. Appuie sur Lecture quand tu veux." : "Aucune musique n’est incluse\u00a0: choisis un fichier audio afro-love libre de droits depuis ton appareil.")}</p>
            <input type="file" accept="audio/*" aria-label="Choisir un fichier audio" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setSrc((old) => { if (old) URL.revokeObjectURL(old); return URL.createObjectURL(f); }); setErr(""); } }} />
            {src && (
              <div className="flex flex-wrap items-center gap-2">
                <button type="button" className="ib" onClick={() => (lit ? a.current?.pause() : a.current?.play().catch(() => setErr("Ce fichier n’a pas pu être lu.")))}>{lit ? "⏸ Pause" : "▶ Lecture"}</button>
                <button type="button" className="ib" onClick={() => setMuet(!muet)}>{muet ? "🔊 Son" : "🔇 Muet"}</button>
                <label className="flex items-center gap-2">Volume <input type="range" min="0" max="1" step="0.05" value={vol} onChange={(e) => setVol(+e.target.value)} /></label>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <audio ref={a} className="hidden" src={src ?? undefined} loop onPlay={() => setLit(true)} onPause={() => setLit(false)} />
    </>
  );
}
