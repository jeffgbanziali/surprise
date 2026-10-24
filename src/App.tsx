import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Particules from "./components/Particules";
import Son from "./components/Son";
import CoeurScene from "./scenes/CoeurScene";
import Enveloppe from "./scenes/Enveloppe";
import Final from "./scenes/Final";
import Intro from "./scenes/Intro";
import Jardin from "./scenes/Jardin";
import { ecrireScene, lireScene } from "./lib/store";
const SCENES = [Intro, Enveloppe, CoeurScene, Jardin, Final];
export default function App() {
  const [s, setS] = useState(lireScene);
  const go = useCallback((n: number) => { ecrireScene(n); setS(n); scrollTo(0, 0); }, []);
  const C = SCENES[s];
  return (
    <>
      <div id="bg" />
      <Particules />
      <header className="fixed inset-x-0 top-0 z-30 flex justify-end gap-2 px-4 py-3" style={{ top: "env(safe-area-inset-top,0)" }}>
        <Son />
      </header>
      <main>
        <AnimatePresence mode="wait">
          <motion.section key={s} aria-label={`Étape ${s + 1}`} className="relative z-[2] flex min-h-[100dvh] flex-col items-center justify-center gap-6 px-5 pb-8 pt-20 text-center"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <C go={go} />
          </motion.section>
        </AnimatePresence>
      </main>
    </>
  );
}
