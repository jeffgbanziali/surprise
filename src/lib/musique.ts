// Musique d’ambiance : démarre seulement après un clic (« Découvrir ma surprise »), jamais en automatique.
const SRC = "/musique/Chocolat.mp3";
const VOLUME = 0.5;
let audio: HTMLAudioElement | null = null;
let muet = false;
const abonnes = new Set<() => void>();
const prevenir = () => abonnes.forEach((f) => f());
export const sonDemarre = () => audio !== null;
export const sonMuet = () => muet;
export const abonner = (f: () => void) => { abonnes.add(f); return () => { abonnes.delete(f); }; };
export function demarrerMusique() {
  if (audio) return;
  try {
    const a = new Audio(SRC);
    a.loop = true; a.volume = 0;
    audio = a;
    a.play().then(() => {
      prevenir();
      const t = setInterval(() => {
        if (a.volume >= VOLUME - 0.02) { a.volume = VOLUME; clearInterval(t); } else a.volume = Math.min(VOLUME, a.volume + 0.02);
      }, 120);
    }).catch(() => { audio = null; });
  } catch { audio = null; }
}
export function basculerMuet() {
  if (!audio) return;
  muet = !muet; audio.muted = muet; prevenir();
}
