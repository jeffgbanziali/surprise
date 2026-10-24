# Pour toi, ma Sainte-Union de Jo-Christ

Site romantique interactif : React + Vite + TypeScript + Tailwind CSS + Framer Motion.

## Lancer sur ton PC
Prérequis : Node.js 18 ou plus.

    npm install
    npm run dev        # ouvre http://localhost:5173
    npm run build      # génère le dossier dist/

## Personnaliser
- `src/config.ts` : ton numéro WhatsApp (format international sans « + », ex. 33612345678) et ton e-mail. Ils activent les boutons de réponse.
- `src/content.ts` : tous les textes en français.

## Héberger sur Netlify
1. Mets le dossier sur GitHub, puis « Add new site > Import from Git » dans Netlify (build : `npm run build`, dossier : `dist`, déjà dans netlify.toml). Ou glisse le dossier `dist` sur https://app.netlify.com/drop.
2. Réponse en ligne : le bouton « Envoyer ma réponse » utilise Netlify Forms (formulaire « reponse »). Les envois apparaissent dans Netlify > Forms. Pour les recevoir par e-mail : Forms > Form notifications > Add notification > Email. Remarque : Netlify Forms demande un déploiement depuis Git ou via le build Netlify (le glisser-déposer de `dist` détecte aussi le formulaire).
3. Le bouton 📊 (ou l'adresse `/#tableau`) affiche l'activité de l'appareil courant uniquement.

## Musique
Aucune musique incluse. Bouton « Musique » : choisis un fichier audio libre de droits sur ton appareil.
Pour en embarquer une, place-la dans `public/` (ex. `public/musique.mp3`) et utilise `/musique.mp3` comme `src` du lecteur.
