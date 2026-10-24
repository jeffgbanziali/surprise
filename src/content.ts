export const LETTRE = [
  "Mon amour, Pipillonnnnnnnnnnnn,",
  "je suis désolé pour notre dispute de la dernière fois.",
  "Je regrette que nous ayons vécu ce moment et que mes paroles ou mes réactions aient pu te faire de la peine.",
  "Je ne veux pas minimiser ce que tu ressens ni chercher des excuses.",
  "J’aimerais prendre le temps de t’écouter, de comprendre ton cœur et de reconnaître ce que je dois améliorer.",
  "Tu comptes énormément pour moi, et je veux que mon amour se voie aussi dans ma manière de te respecter, de te parler et de prendre soin de nous.",
  "Je ne te demande pas de tout oublier ni de me pardonner immédiatement.",
  "Je voulais simplement te dire pardon, avec sincérité, et te laisser la liberté de ressentir les choses à ton rythme.",
  "Si tu en as envie, je serai là pour qu’on puisse se parler doucement et discuter de la clause pour les réparations des dégâts causés.",
  "Je t’aime.",
];
export const SIGNATURE = "Celui qui t’aime et veut apprendre à mieux aimer, moi ❤️";
export const HOMME_POIRE = "De la part de l'Homme Poire 🍐";
export const LETTRE_COEUR = [
  "Tina Tina, je pense à notre dispute et je tiens à te présenter mes excuses. Je reconnais ma part de responsabilité dans ce qui s’est passé.",
  "Je comprends que mes paroles ou ma façon de réagir ont pu te blesser. Ce que tu ressens est important, et je ne cherche ni à l’effacer ni à me justifier.",
  "Je souhaite t’écouter avec attention et apprendre à mieux faire. Prends le temps qu’il te faut\u00a0: je suis là, avec respect et tendresse. Je t’aime.",
];
export const AIME = [
  "Je ne te demande rien en t’écrivant ces mots. Je voulais seulement que tu saches ce que tu représentes pour moi.",
  "Pipillon, Ndourou, Ceinture, Tina Tina… tous ces petits noms que seuls nous comprenons me font sourire rien que d’y penser.",
  "Ta présence rend mes journées plus douces. Près de toi, je me sens chez moi.",
  "Quoi que tu décides de ressentir ou de faire de ces mots, ils restent un cadeau, sans condition. Je tenais simplement à te dire combien tu comptes.",
];
export const VOEUX: [string, string][] = [
  ["Patience", "Je prendrai le temps, sans me presser."],
  ["Respect", "Je te parlerai toujours avec douceur."],
  ["Écoute honnête", "Je t’écouterai vraiment, sans me défendre."],
  ["Clarté", "Je te dirai les choses avec calme et sincérité."],
  ["Nous", "Je prendrai soin de nous, chaque jour."],
];
export const POS: [number, number][] = [[12, 70], [30, 25], [50, 62], [70, 22], [88, 65]];
export const CADEAUX = [
  { icon: "💌", titre: "Une lettre de mon cœur" },
  { icon: "🌹", titre: "Ce que j’aime chez toi" },
  { icon: "✨", titre: "Un vœu pour nous" },
  { icon: "💐", titre: "Notre petit moment" },
];
export type Choix = "oui" | "temps";
export const REPONSES: Record<Choix, { texte: string; bouton: string }> = {
  oui: { bouton: "Oui, parlons-en ❤️", texte: "Merci, mon amour. Je serai là, avec douceur et avec toute mon écoute. ❤️" },
  temps: { bouton: "J’ai besoin de temps 🤍", texte: "Prends tout le temps dont tu as besoin. Ce n’est pas un refus, et il n’y a aucune pression. Je reste là, sans rien attendre. 🤍" },
};
