import { useState } from "react";
import { motion } from "framer-motion";
import Bouton from "../components/Bouton";
import { CONFIG } from "../config";
import { REPONSES, type Choix } from "../content";
import { fx } from "../lib/fx";
import { enregistrer, lire } from "../lib/store";
export default function Final() {
  const [c, setC] = useState<Choix | null>(lire().reponse), [mot, setMot] = useState(""), [envoi, setEnvoi] = useState(""), [enCours, setEnCours] = useState(false);
  const choisir = (k: Choix) => { setC(k); fx.petals(40); enregistrer("Réponse choisie\u00a0: " + REPONSES[k].bouton, { reponse: k }); };
  const texte = c ? REPONSES[c].bouton + (mot ? "\n\n" + mot : "") : "";
  const netlify = async () => {
    if (enCours || !c) return;
    setEnCours(true);
    try {
      const r = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ "form-name": "reponse", "bot-field": "", choix: REPONSES[c].bouton, mot }).toString() });
      setEnvoi(r.ok ? "Ta réponse a bien été envoyée. 💌" : "L’envoi n’a pas fonctionné. Réessaie plus tard, ou une fois le site en ligne.");
    } catch { setEnvoi("L’envoi n’a pas fonctionné. Réessaie plus tard, ou une fois le site en ligne."); }
    finally { setEnCours(false); }
  };
  return (
    <>
      <h2 className="titre">Sous un ciel d’étoiles…</h2>
      <p className="glass max-w-[34ch] px-6 py-5 text-[1.45rem] italic">Je ne peux pas changer ce qui s’est passé, mais je peux apprendre, faire mieux et te le montrer par mes actes.</p>
      <p className="max-w-[34ch] text-[1.4rem]">Quand tu te sentiras prête, accepterais-tu qu’on prenne un moment pour se parler\u00a0?</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Bouton aria-pressed={c === "oui"} onClick={() => choisir("oui")}>{REPONSES.oui.bouton}</Bouton>
        <Bouton aria-pressed={c === "temps"} onClick={() => choisir("temps")}>{REPONSES.temps.bouton}</Bouton>
      </div>
      {c && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="flex flex-col items-center gap-4 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]" aria-live="polite">
          <p className="glass max-w-[36ch] px-5 py-4 text-[1.3rem] italic">{REPONSES[c].texte}</p>
          <p className="max-w-[36ch] text-base text-ivoire/90">Si tu le souhaites, tu peux le lui faire savoir. C’est toi qui choisis, et seulement si tu en as envie.</p>
          <textarea rows={2} value={mot} onChange={(e) => setMot(e.target.value)} onFocus={(e) => e.currentTarget.scrollIntoView({ block: "center", behavior: "smooth" })} placeholder="Un petit mot de ta part (facultatif)" aria-label="Un petit mot facultatif" className="w-[min(88vw,420px)] resize-y rounded-2xl border border-white/20 bg-white/10 p-3 font-serif text-inherit placeholder:text-blush/90" />
          <p className="max-w-[36ch] text-base text-ivoire/90">Si tu l’envoies, ta réponse arrive uniquement à lui, via le formulaire de ce site. Rien d’autre n’est collecté.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Bouton douce disabled={enCours} onClick={netlify}>{enCours ? "Envoi…" : "Envoyer ma réponse"}</Bouton>
            {CONFIG.whatsapp && <a className="btn min-h-11" target="_blank" rel="noopener noreferrer" href={`https://wa.me/${CONFIG.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(texte)}`}>WhatsApp</a>}
            {CONFIG.email && <a className="btn soft min-h-11" href={`mailto:${CONFIG.email}?subject=${encodeURIComponent("Ma réponse")}&body=${encodeURIComponent(texte)}`}>E-mail</a>}
          </div>
          {envoi && <p role="status" className="text-base">{envoi}</p>}
        </motion.div>
      )}
    </>
  );
}
