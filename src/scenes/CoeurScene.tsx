import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Bouton from "../components/Bouton";
import Coeur from "../components/Coeur";
import { fx } from "../lib/fx";
import { enregistrer } from "../lib/store";
export default function CoeurScene({ go }: { go: (n: number) => void }) {
  const [n, setN] = useState(0), [rip, setRip] = useState<{ id: number; x: number; y: number }[]>([]);
  const timers = useRef<number[]>([]);
  useEffect(() => () => { timers.current.forEach(clearTimeout); }, []);
  const tap = (e: MouseEvent<HTMLButtonElement>) => {
    const b = e.currentTarget.getBoundingClientRect(), x = e.clientX || b.left + b.width / 2, y = e.clientY || b.top + b.height / 2, id = Math.random();
    setRip((a) => [...a, { id, x, y }]);
    timers.current.push(window.setTimeout(() => setRip((a) => a.filter((z) => z.id !== id)), 1700));
    fx.burst(x, y); fx.petals(3);
    setN((v) => {
      const next = v + 1;
      if (next === 5) enregistrer("Message du cœur révélé");
      return next;
    });
  };
  return (
    <>
      <h2 className="titre">Touche mon cœur</h2>
      <motion.button type="button" whileTap={{ scale: 0.88 }} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300, damping: 12 }} onClick={tap} aria-label="Toucher le cœur lumineux" className="w-[min(60vw,270px)] border-0 bg-transparent p-0">
        <Coeur />
      </motion.button>
      <AnimatePresence mode="wait">
        {n < 5 ? <motion.p key="h" exit={{ opacity: 0 }} className="text-ivoire/90">Effleure-le doucement, sans pression.</motion.p>
          : <motion.p key="m" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} className="glass max-w-[34ch] px-6 py-5 text-[1.45rem] italic">Même quand les mots dépassent nos pensées, mon amour pour toi mérite toujours de la douceur, du respect et de l’écoute.</motion.p>}
      </AnimatePresence>
      {n >= 5 && <Bouton onClick={() => go(3)}>Continuer</Bouton>}
      {rip.map((r) => (
        <div key={r.id} className="rip" style={{ left: r.x, top: r.y }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 21s-8-5.6-8-11.2C4 6.6 6.4 5 8.5 5c1.5 0 2.7.8 3.5 2 .8-1.2 2-2 3.5-2C17.6 5 20 6.6 20 9.8 20 15.4 12 21 12 21z" /></svg>
        </div>
      ))}
    </>
  );
}
