import { useEffect, useRef, useState } from "react";
import Bouton from "../components/Bouton";
import Lettre from "../components/Lettre";
import { LETTRE } from "../content";
import { useTilt } from "../hooks";
import { fx } from "../lib/fx";
import { enregistrer } from "../lib/store";
export default function Enveloppe({ go }: { go: (n: number) => void }) {
  const [ouverte, setOuverte] = useState(false), [lettre, setLettre] = useState(false), [k, setK] = useState(0);
  const r = useTilt<HTMLButtonElement>(22, ouverte);
  const t = useRef(0);
  useEffect(() => () => clearTimeout(t.current), []);
  const ouvrir = () => {
    if (ouverte) return; setOuverte(true); fx.petals(40); enregistrer("Enveloppe ouverte");
    clearTimeout(t.current);
    t.current = window.setTimeout(() => setLettre(true), matchMedia("(prefers-reduced-motion:reduce)").matches ? 0 : 4200);
  };
  const rejouer = () => {
    clearTimeout(t.current);
    setOuverte(false); setLettre(false); setK((v) => v + 1);
  };
  return (
    <>
      <h2 className="titre">Une lettre t’attend</h2>
      <div style={{ perspective: 1000 }}>
        <button type="button" ref={r} onClick={ouvrir} aria-label="Ouvrir l’enveloppe scellée" className={`env ${ouverte ? "open" : ""}`}>
          <i className="eb" /><div className="paper">Pour toi ❤</div><i className="ef" /><i className="flap" /><span className="seal">❤</span>
        </button>
      </div>
      {lettre && <Lettre key={k} lignes={LETTRE} signature />}
      {lettre && (
        <div className="flex flex-wrap justify-center gap-3">
          <Bouton douce onClick={rejouer}>↺ Rejouer l’ouverture</Bouton>
          <Bouton onClick={() => go(2)}>Continuer</Bouton>
        </div>
      )}
    </>
  );
}
