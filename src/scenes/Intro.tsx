import { motion } from "framer-motion";
import Bouton from "../components/Bouton";
import Coeur from "../components/Coeur";
import { HOMME_POIRE } from "../content";
import { demarrerMusique } from "../lib/musique";
const TITRE = "For you, Tina Tinaaaaaaaaaaaaaaaaaaaa".split(" ");
export default function Intro({ go }: { go: (n: number) => void }) {
  return (
    <>
      <div className="w-[90px]"><Coeur /></div>
      <h1 aria-label={TITRE.join(" ")} className="titre !text-[clamp(2.5rem,9vw,5rem)]">
        {TITRE.map((w, i) => (
          <motion.span key={i} aria-hidden="true" className="inline-block" initial={{ opacity: 0, y: 24, rotate: 3 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: 0.3 + i * 0.22, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>{w}&nbsp;</motion.span>
        ))}
      </h1>
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 1.4 }} className="max-w-[30ch] text-[1.4rem] italic">J’ai quelque chose à te dire, du fond du cœur…</motion.p>
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.6, type: "spring", stiffness: 160, damping: 14 }}>
        <Bouton onClick={() => { demarrerMusique(); go(1); }}>Découvrir ma surprise</Bouton>
      </motion.div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.85 }} transition={{ delay: 3.4, duration: 1.6 }} className="font-script text-[1.6rem] text-lilas">{HOMME_POIRE}</motion.p>
    </>
  );
}
