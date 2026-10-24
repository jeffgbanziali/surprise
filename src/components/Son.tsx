import { useSyncExternalStore } from "react";
import { abonner, basculerMuet, sonDemarre, sonMuet } from "../lib/musique";
// Un simple petit bouton discret pour couper ou remettre le son. Il n’apparaît qu’une fois la musique lancée.
export default function Son() {
  const demarre = useSyncExternalStore(abonner, sonDemarre);
  const muet = useSyncExternalStore(abonner, sonMuet);
  if (!demarre) return null;
  return (
    <button type="button" className="ib opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100" aria-pressed={muet} aria-label={muet ? "Remettre le son" : "Couper le son"} onClick={basculerMuet}>
      {muet ? "🔇" : "🔈"}
    </button>
  );
}
