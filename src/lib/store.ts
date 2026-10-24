import type { Choix } from "../content";
export interface Etat { ouvertes: number[]; reponse: Choix | null; journal: { t: number; ev: string }[] }
const K = "pour-toi:etat";
const SK = "pour-toi:scene";
const vide = (): Etat => ({ ouvertes: [], reponse: null, journal: [] });

function valider(brut: unknown): Etat {
  const d = vide();
  if (!brut || typeof brut !== "object") return d;
  const o = brut as Record<string, unknown>;
  const ouvertes = Array.isArray(o.ouvertes)
    ? [...new Set(o.ouvertes.filter((n): n is number => typeof n === "number" && Number.isInteger(n) && n >= 0 && n <= 3))]
    : [];
  const reponse: Choix | null = o.reponse === "oui" || o.reponse === "temps" ? o.reponse : null;
  const journal = Array.isArray(o.journal)
    ? o.journal.filter((j): j is { t: number; ev: string } => {
      if (!j || typeof j !== "object") return false;
      const x = j as Record<string, unknown>;
      return typeof x.t === "number" && typeof x.ev === "string";
    }).slice(-40)
    : [];
  return { ouvertes, reponse, journal };
}

export const lire = (): Etat => {
  try { return valider(JSON.parse(localStorage.getItem(K) || "null")); }
  catch { return vide(); }
};
export const ecrire = (e: Etat) => { try { localStorage.setItem(K, JSON.stringify(e)); } catch { /* stockage indisponible */ } };
export const enregistrer = (ev: string, patch: Partial<Etat> = {}): Etat => {
  const e = lire(); void ev; const n = { ...e, ...patch, journal: [] }; ecrire(n); return n;
};
export const lireScene = (): number => {
  try {
    const n = Number(sessionStorage.getItem(SK));
    return Number.isInteger(n) && n >= 0 && n <= 4 ? n : 0;
  } catch { return 0; }
};
export const ecrireScene = (n: number) => { try { sessionStorage.setItem(SK, String(n)); } catch { /* */ } };
export const reinitialiser = () => {
  ecrire(vide());
  try { sessionStorage.removeItem(SK); } catch { /* */ }
};
