import { useCallback, useRef } from "react";
import type { ReactNode } from "react";
import Bouton from "../components/Bouton";
import { CADEAUX, REPONSES } from "../content";
import { useFocusTrap } from "../hooks";
import { lire } from "../lib/store";
export default function Tableau({ fermer }: { fermer: () => void }) {
  const s = lire(); const h = (t: number) => new Date(t).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });
  const dlg = useRef<HTMLDivElement>(null);
  const onClose = useCallback(() => fermer(), [fermer]);
  useFocusTrap(true, dlg, onClose);
  const Carte = ({ t, children }: { t: string; children: ReactNode }) => <div className="glass mx-auto mb-4 max-w-[640px] p-5"><h3 className="font-script text-[1.9rem] text-blush">{t}</h3>{children}</div>;
  return (
    <div ref={dlg} className="fixed inset-0 z-[60] overflow-auto bg-nuit/95 px-4 pb-8 pt-20 text-left" role="dialog" aria-modal="true" aria-label="Tableau de bord">
      <Carte t="Tableau de bord"><p>Données de cet appareil. Les réponses envoyées depuis le site en ligne arrivent dans ton espace Netlify (Forms) et par e-mail si tu actives la notification.</p></Carte>
      <Carte t="Sa réponse"><p>{s.reponse ? REPONSES[s.reponse].bouton : "En attente… et c’est très bien ainsi."}</p></Carte>
      <Carte t={`Surprises ouvertes\u00a0: ${s.ouvertes.length}/4`}><ul className="ml-5 list-disc">{s.ouvertes.map((i) => <li key={i}>{CADEAUX[i]?.titre}</li>)}</ul></Carte>
      <Carte t="Journal"><ul className="ml-5 list-disc">{[...s.journal].reverse().map((j, i) => <li key={i}>{h(j.t)} — {j.ev}</li>)}{!s.journal.length && <li>Aucune activité pour l’instant.</li>}</ul></Carte>
      <div className="text-center"><Bouton data-autofocus autoFocus onClick={fermer}>Fermer</Bouton></div>
    </div>
  );
}
