import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lecteur from "./components/Lecteur";
import Particules from "./components/Particules";
import CoeurScene from "./scenes/CoeurScene";
import Enveloppe from "./scenes/Enveloppe";
import Final from "./scenes/Final";
import Intro from "./scenes/Intro";
import Jardin from "./scenes/Jardin";
import Tableau from "./scenes/Tableau";
import { estAuteur } from "./lib/auteur";
import { ecrireScene, lireScene, reinitialiser } from "./lib/store";
const SCENES = [Intro, Enveloppe, CoeurScene, Jardin, Final];
export default function App() {
  const [s, setS] = useState(lireScene), [tab, setTab] = useState(() => location.hash === "#tableau"), [auteur, setAuteur] = useState(estAuteur);
  const go = useCallback((n: number) => { ecrireScene(n); setS(n); scrollTo(0, 0); }, []);
  useEffect(() => {
    const h = () => { setAuteur(estAuteur()); setTab(location.hash === "#tableau"); };
    addEventListener("hashchange", h);
    return () => removeEventListener("hashchange", h);
  }, []);
  const C = SCENES[s];
  const reset = () => {
    if (!confirm("Effacer la progression de cet appareil\u00a0?")) return;
    reinitialiser(); location.hash = ""; location.reload();
  };
  return (
    <>
      <div id="bg" />
      <Particules />
      <header {...(tab ? { inert: "" } : {})} className="fixed inset-x-0 top-0 z-30 flex justify-between gap-2 px-4 py-3" style={{ top: "env(safe-area-inset-top,0)" }}>
        <Lecteur />
        {auteur && (
          <span className="flex gap-2">
            <button type="button" className="ib" aria-label="Tableau de bord privé" onClick={() => setTab(true)}>📊</button>
            <button type="button" className="ib" onClick={reset}>↺ Recommencer</button>
          </span>
        )}
      </header>
      <main {...(tab ? { inert: "" } : {})}>
        <AnimatePresence mode="wait">
          <motion.section key={s} aria-label={`Étape ${s + 1}`} className="relative z-[2] flex min-h-[100dvh] flex-col items-center justify-center gap-6 px-5 pb-8 pt-20 text-center"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <C go={go} />
          </motion.section>
        </AnimatePresence>
      </main>
      {auteur && tab && <Tableau fermer={() => setTab(false)} />}
    </>
  );
}
