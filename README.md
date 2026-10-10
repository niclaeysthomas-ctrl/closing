# LE CLOSING

App quotidienne pour devenir un directeur financier redoutable : deals réels racontés, académie finance/M&A/juridique, sparring anti-flou. PWA locale-first, aucune donnée ne quitte l'appareil.

## Lancer

Ouvrir `index.html` dans un navigateur, ou servir le dossier (`python3 -m http.server 8741`) pour activer le mode hors-ligne (service worker) et l'installation sur écran d'accueil.

## Structure

| Fichier | Rôle |
|---|---|
| `index.html` | App complète : vues, moteur de quiz, révision espacée, modes entretien FR/EN, missions, mémo |
| `data-deals.js` | 18 deals réels (histoire + quiz + leçon) |
| `data-academy.js` | 11 modules, 62 leçons (bases → restructuring, fiscalité, macro, consolidation), quiz inclus |
| `data-sparring.js` | 12 cas DAF, 10 négociations, 26 brain teasers (auto-évalués) |
| `data-drills.js` | 8 cascades comptables, 6 paper LBO, 16 missions terrain, 24 questions d'entretien en anglais |
| `data-lexique.js` | 97 termes FR/EN du deal-maker |
| `data-stage.js` | Objectif stage (janvier) : module Finance d'entreprise, leçons M&A/LBO/analyse ajoutées, oral technique et fit, drill des trois états, 5 deals récents sourcés, plan de six semaines |
| `anki-closing.txt` | Deck Anki de 184 cartes (lexique, multiples sectoriels, IPO, LBO, vérités du métier) |
| `anki-fondamentaux.txt` | Deck Anki de 44 cartes — les formules seules (CAF, FCFF, FCFE, WACC, bêta, ROCE/ROE, DCF, multiples, élasticité), téléchargeable depuis Les exos |
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

- **Objectif stage** : tuile en tête du menu du jour et du Sparring. Oral à voix haute (90 s, enregistrement possible, points attendus à cocher), réponses de fit rédigées puis dites, drill des trois états, deals récents et fiches personnelles, plan de six semaines.
- **Séance guidée** (activée par défaut) : chaque jour, 12 étapes dans un ordre imposé (chiffrage, formules, trois états, leçon, exos, oral, mise en situation, revue de presse, métier, conseil, deal, flashcards). Onglets et réglages verrouillés jusqu'à la fin ; bouton « Étape suivante » après chaque étape ; « Je suis bloqué » passe une étape mais ne valide pas la journée.
- **Formules en cartes** (`data-quotidien.js`) : 45 formules, recto = nom, verso = formule ; révision espacée (1, 2, 4, 7, 14, 30 jours), cartes ratées reprises dans la séance. Formulaire complet consultable dans l'Académie.
- **Conseil et bases M&A chaque jour** : une structuration de cas (30 énoncés, 2 minutes chrono, structure attendue et grille), une fiche conseil, deux cas de conseil par semaine, et une leçon du parcours Bases M&A (18 leçons dans l'ordre : métier, process, valeur, juridique du deal, LBO).
- **Métier du jour / conseil du jour** (`data-quotidien.js`) : 30 métiers de la finance et 30 fiches de conseil, un de chaque par jour, dans l'ordre.
- **Mode stage** (Profil) : Académie, leçon du jour et entretiens blancs recentrés sur les modules prioritaires (bases, compta, analyse, valo, M&A, LBO, finance d'entreprise).
- **Réponds d'abord** (Profil, activé par défaut) : les choix d'un QCM restent cachés tant qu'on n'a pas formulé sa réponse.

## Règle d'écriture des QCM

La bonne réponse ne doit pas se reconnaître à sa forme : longueurs comparables, distracteurs plausibles, justification dans `exp` et non dans l'option. Les options sont mélangées à l'affichage partout (quiz, marches, cas) ; dans `exp`, une lettre en gras (`<b>A</b>`) est traduite vers la lettre affichée. Avant l'audit du 2026-10-10, la bonne réponse était la plus longue dans 96 % des 578 questions ; elle l'est désormais dans environ 24 % des cas, le niveau du hasard.

## Ajouter du contenu

Chaque fichier `data-*.js` est un tableau d'objets autonome : ajouter une entrée suffit, aucun code à toucher. Le format est documenté en tête de chaque fichier.
