import { useState } from "react";
import { motion } from "framer-motion";
import { HOMME_POIRE, SIGNATURE } from "../content";
export default function Lettre({ lignes, signature = false }: { lignes: string[]; signature?: boolean }) {
  const [tout, setTout] = useState(false);
  const cont = { hidden: {}, show: { transition: { staggerChildren: tout ? 0 : 0.45, delayChildren: tout ? 0 : 0.1 } } };
  const ligne = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: tout ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] as const } } };
  return (
    <div className="flex w-full max-w-[580px] flex-col items-stretch gap-3">
      <motion.div key={tout ? "tout" : "stagger"} variants={cont} initial={tout ? "show" : "hidden"} animate="show" className="glass px-6 py-7 text-left italic leading-[1.75]">
        {lignes.map((l, i) => <motion.p key={i} variants={ligne} className="mb-2.5">{l}</motion.p>)}
        {signature && <motion.p variants={ligne} className="mt-3 text-right font-script text-[1.8rem] not-italic text-or">{SIGNATURE}<span className="mt-1 block text-[1.5rem]">{HOMME_POIRE.replace("De la part de", "—")}</span></motion.p>}
      </motion.div>
      {!tout && (
        <button type="button" className="ib self-center" onClick={() => setTout(true)}>Afficher toute la lettre</button>
      )}
    </div>
  );
}
