# LE CLOSING

App quotidienne pour devenir un directeur financier redoutable : deals réels racontés, académie finance/M&A/juridique, sparring anti-flou. PWA locale-first, aucune donnée ne quitte l'appareil.

## Lancer

Ouvrir `index.html` dans un navigateur, ou servir le dossier (`python3 -m http.server 8741`) pour activer le mode hors-ligne (service worker) et l'installation sur écran d'accueil.

## Structure

| Fichier | Rôle |
|---|---|
| `index.html` | App complète : vues, moteur de quiz, révision espacée, modes entretien FR/EN, missions, mémo |
| `data-deals.js` | 18 deals réels (histoire + quiz + leçon) |
| `data-academy.js` | 11 modules, 42 leçons (bases → restructuring, fiscalité, macro, consolidation), quiz inclus |
| `data-sparring.js` | 12 cas DAF, 10 négociations, 26 brain teasers (auto-évalués) |
| `data-drills.js` | 8 cascades comptables, 6 paper LBO, 16 missions terrain, 24 questions d'entretien en anglais |
| `data-lexique.js` | ~90 termes FR/EN du deal-maker |
| `anki-closing.txt` | Deck Anki de 178 cartes (lexique, multiples sectoriels, IPO, LBO, vérités du métier) |
| `sw.js`, `manifest.webmanifest` | Hors-ligne + installation PWA |

## Mécaniques

- **Menu du jour** : 1 deal + 1 leçon + 1 sparring (rotation sur 5 types) = journée validée, streak.
- **Révision espacée** : chaque contenu terminé revient à J+3, J+7, J+21. Trois révisions tenues = acquis.
- **Rattrapage** : toute question de quiz ratée reste au tableau jusqu'à être réussie.
- **Modes entretien** : 12 questions aléatoires, 8 minutes chrono, verdict du recruteur — en français et en anglais.
- **Sparring anti-flou** : réponse écrite de 200 caractères minimum, puis grille de correction **à cocher point par point** (score calculé).
- **Mission terrain** : une par semaine (URD, earnings call, DCF réel, paper LBO sur cible réelle…), preuve écrite exigée.
- **Le mémo du dimanche** : mémo d'investissement guidé en 6 sections, exporté pour correction par le coach.
- **XP et grades** : Stagiaire → Analyst → Associate → VP → Director → Managing Director → Rainmaker.
- **Sauvegarde** : export/import JSON depuis l'onglet Profil (la progression vit en localStorage).

## Ajouter du contenu

Chaque fichier `data-*.js` est un tableau d'objets autonome : ajouter une entrée suffit, aucun code à toucher. Le format est documenté en tête de chaque fichier.
