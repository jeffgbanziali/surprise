import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Bouton from "../components/Bouton";
import Lettre from "../components/Lettre";
import { AIME, CADEAUX, LETTRE_COEUR, POS, VOEUX } from "../content";
import { useFocusTrap, useTilt } from "../hooks";
import { fx } from "../lib/fx";
import { enregistrer, lire } from "../lib/store";

function Voeux() {
  const [on, setOn] = useState<number[]>([]);
  const pts = [...on].sort().map((i) => POS[i].join(",")).join(" ");
  return (
    <div>
      <p className="text-center">Touche chaque étoile.</p>
      <div className="relative h-[210px]">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full"><polyline fill="none" stroke="#dcb76d" strokeWidth=".7" vectorEffect="non-scaling-stroke" points={pts} /></svg>
        {POS.map((p, i) => (
          <motion.button type="button" key={i} aria-label={`Étoile\u00a0: ${VOEUX[i][0]}`} animate={{ scale: on.includes(i) ? 1.4 : 1, rotate: on.includes(i) ? 72 : 0 }} whileHover={{ scale: 1.3 }} transition={{ type: "spring", stiffness: 260, damping: 12 }}
            className={`star absolute -m-[23px] h-[46px] w-[46px] min-h-11 min-w-11 border-0 bg-transparent text-[1.9rem] ${on.includes(i) ? "text-white" : "text-or"}`} style={{ left: p[0] + "%", top: p[1] + "%" }}
            onClick={(e) => { setOn([...new Set([...on, i])]); const b = e.currentTarget.getBoundingClientRect(); fx.burst(b.left + 23, b.top + 23, 10); }}>★</motion.button>
        ))}
      </div>
      <div aria-live="polite" className="min-h-20 text-center italic">{on.map((i) => <motion.p key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="my-1"><b>{VOEUX[i][0]}</b> — {VOEUX[i][1]}</motion.p>)}</div>
    </div>
  );
}
function Bouquet() {
  const R: [number, number, number][] = [[150, 70, 1], [85, 105, 0.8], [215, 105, 0.8], [115, 150, 0.7], [185, 150, 0.7]];
  const C: [number, string][] = [[26, "#7a1030"], [20, "#a01844"], [14, "#c9285a"], [8, "#e5497a"], [3, "#ff7fa3"]];
  return (
    <div>
      <svg viewBox="0 0 300 220" className="mx-auto w-[min(80vw,320px)]" role="img" aria-label="Bouquet de roses qui s’épanouit">
        {R.map(([x, y, s], k) => (
          <g key={k}>
            <path d={`M${x} ${y + 25 * s}Q150 210 150 215`} stroke="#3f7a4a" strokeWidth="4" fill="none" />
            {C.map(([r, c], i) => <motion.circle key={i} cx={x + (i % 2 ? 3 : -3) * s} cy={y} r={r * s} fill={c} stroke="#fbe0e6" strokeOpacity=".35" style={{ transformBox: "fill-box", transformOrigin: "center" }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: k * 1.1 + i * 0.45, type: "spring", stiffness: 120, damping: 11 }} />)}
          </g>
        ))}
      </svg>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5.5, duration: 1.5 }} className="italic">Pour toi, Pipillon. Pétale après pétale, comme mon amour qui grandit quand je prends le temps de t’écouter. Ce petit moment est pour toi, sans rien attendre en retour. 🌹</motion.p>
    </div>
  );
}
const contenu = [
  () => <Lettre lignes={LETTRE_COEUR} />, () => <Lettre lignes={AIME} />, () => <Voeux />, () => <Bouquet />,
];
function Cadeau({ i, fait, ouvert, onClick, btnRef }: { i: number; fait: boolean; ouvert: boolean; onClick: () => void; btnRef: (el: HTMLButtonElement | null) => void }) {
  const r = useTilt<HTMLButtonElement>(16);
  return (
    <button type="button" ref={(el) => { (r as React.MutableRefObject<HTMLButtonElement | null>).current = el; btnRef(el); }} onClick={onClick}
      aria-haspopup="dialog" aria-expanded={ouvert}
      className={`gift glass flex min-h-11 flex-col items-center gap-1 px-2 py-5 ${fait ? "done" : ""}`}>
      <span className="text-4xl" aria-hidden="true">{CADEAUX[i].icon}</span><span>{CADEAUX[i].titre}</span><small className="text-[.95rem] text-ivoire/90">{fait ? "Ouverte ✓" : "À ouvrir"}</small>
    </button>
  );
}
export default function Jardin({ go }: { go: (n: number) => void }) {
  const [cur, setCur] = useState<number | null>(null), [k, setK] = useState(0), [d, setD] = useState<number[]>(lire().ouvertes);
  const dlg = useRef<HTMLDivElement>(null);
  const retour = useRef<HTMLButtonElement | null>(null);
  const cadeaux = useRef<(HTMLButtonElement | null)[]>([]);
  const fermer = useCallback(() => setCur(null), []);
  useFocusTrap(cur !== null, dlg, fermer, retour);
  useEffect(() => {
    const header = document.querySelector("header");
    if (cur === null) { header?.removeAttribute("inert"); return; }
    header?.setAttribute("inert", "");
    return () => header?.removeAttribute("inert");
  }, [cur]);
  const ouvrir = (i: number) => {
    retour.current = cadeaux.current[i] ?? null;
    setCur(i); setK(0);
    if (!d.includes(i)) { const n = [...d, i]; setD(n); enregistrer("Surprise ouverte\u00a0: " + CADEAUX[i].titre, { ouvertes: n }); }
  };
  return (
    <>
      <div {...(cur !== null ? { inert: "" } : {})}>
        <h2 className="titre">Un jardin secret de surprises</h2>
        <p className="max-w-[34ch]">Ouvre-les dans l’ordre que tu veux, quand tu veux.</p>
        <div className="grid w-[min(92vw,520px)] grid-cols-2 gap-4" style={{ perspective: 900 }}>{CADEAUX.map((_, i) => <Cadeau key={i} i={i} fait={d.includes(i)} ouvert={cur === i} onClick={() => ouvrir(i)} btnRef={(el) => { cadeaux.current[i] = el; }} />)}</div>
        <div className="flex items-center gap-2" aria-live="polite">
          {CADEAUX.map((_, i) => <motion.i key={i} animate={{ scale: d.includes(i) ? 1.4 : 1, backgroundColor: d.includes(i) ? "#dcb76d" : "#ffffff30" }} className="block h-2.5 w-2.5 rounded-full" />)}
          <span>{d.length} surprise{d.length > 1 ? "s" : ""} sur 4 ouverte{d.length > 1 ? "s" : ""}</span>
        </div>
        <Bouton onClick={() => go(4)}>Vers la dernière lumière</Bouton>
      </div>
      <AnimatePresence>
        {cur !== null && (
          <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={fermer}>
            <motion.div ref={dlg} role="dialog" aria-modal="true" aria-labelledby="dt" onClick={(e) => e.stopPropagation()} initial={{ scale: 0.85, y: 40, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 20, opacity: 0 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="glass max-h-[88dvh] w-[min(94vw,560px)] overflow-auto px-5 py-6 text-center" style={{ background: "linear-gradient(160deg,#4d1028f5,#12040af8)" }}>
              <h2 id="dt" className="titre mb-3">{CADEAUX[cur].titre}</h2>
              <div key={k}>{contenu[cur]()}</div>
              <div className="mt-4 flex flex-wrap justify-center gap-3"><Bouton douce onClick={() => setK(k + 1)}>↺ Rejouer</Bouton><Bouton data-autofocus autoFocus onClick={fermer}>Fermer</Bouton></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
