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
| `data-recitation.js` | 10 structures à dérouler de tête (compte de résultat, SIG, actif, passif, FR/BFR/trésorerie, CAF, tableau de flux, FCFF, pont de valorisation, cascade d'un amortissement) |
| `data-pensees.js` | 10 lectures philosophiques (le temps, l'incertitude, la valeur, le jugement, le désir, la promesse, la responsabilité, la mesure, le hasard, le langage) — lecture + idées à garder + penseurs + quiz |
| `data-masterclass.js` | 23 masterclass : **17 sectorielles** (comment un secteur gagne de l'argent) et **6 métiers** (private equity, secondaire & liquidité, capital-risque, processus M&A, destruction de valeur en M&A, mécanique du SPA) — lecture longue + modèles mentaux + ordres de grandeur + œil de l'investisseur + quiz |
| `data-lexique.js` | 97 termes FR/EN du deal-maker, **+ 50 termes de private equity** poussés par `data-fonds.js` (147 au total) |
| `data-fonds.js` | **LE FONDS** : 9 ateliers (un par ligne de l'offre de stage), 44 calculs du kit LP (appels de capitaux, DPI/RVPI/TVPI, TRI contre multiple, cascade de distribution, frais, secondaire, lecture d'un fonds), et le calendrier des 14 semaines jusqu'au 1er mars 2027 |
| `data-stage.js` | **Oral et entretiens** (ex-« Objectif stage », recentré le 2026-11-24) : : module Finance d'entreprise, leçons M&A/LBO/analyse ajoutées, oral technique et fit, drill des trois états, 5 deals récents sourcés, plan de six semaines |
| `anki-closing.txt` | Deck Anki de 184 cartes (lexique, multiples sectoriels, IPO, LBO, vérités du métier) |
| `anki-fondamentaux.txt` | Deck Anki de 44 cartes — les formules seules (CAF, FCFF, FCFE, WACC, bêta, ROCE/ROE, DCF, multiples, élasticité), téléchargeable depuis Les exos |
| `sw.js`, `manifest.webmanifest` | Hors-ligne + installation PWA |

## Mécaniques

- **Aucun verrou de progression** (depuis le 2026-11-08) : les **62 paliers des exos** sont ouverts dès le premier jour — plus besoin de valider le précédent — et le **mode socle**, qui réduisait la journée à trois blocs et rangeait deals, sparring, cas et boîte jusqu'à ce que les fondamentaux tiennent, a été retiré. L'ordre reste affiché et conseillé partout ; il n'est plus imposé. L'avancement du socle (12 paliers, 10 structures) reste suivi dans le Profil, comme repère. Seuls verrous conservés : les **niveaux de Ma boîte** (le 2 s'ouvre en finissant le 1) et, dans les cas, l'obligation de **poser le chiffre et sa justification avant de voir les options**.
- **La récitation** : les lignes d'une structure arrivent mélangées, avec des intrus, et il faut les remettre dans l'ordre — sans aucun retour avant d'avoir validé. Puis trois questions « ça tombe où ? ». Ordre parfait = bloc du jour validé ; ordre parfait **et** 3/3 = la boîte avance (J+1, J+3, J+7, puis entretien à 21 jours). Une erreur, la boîte retombe à zéro.
- **Menu du jour** : 1 lecture + 1 leçon + 1 sparring (rotation sur 5 types) + chiffrage + exos + flashcards = journée validée, streak. La récitation s'y ajoute les jours où une structure est due ; elle reste proposée tous les autres jours tant que les 10 ne sont pas acquises, sans bloquer la validation.
- **La lecture du jour** : un seul créneau, trois registres en rotation sur quatre jours — 2 jours un **deal réel** (ce qui s'est passé), 1 jour une **masterclass** (comment un secteur — ou un métier de la finance — gagne de l'argent), 1 jour une **pensée** (pourquoi on fait ce métier comme ça). Les trois valident le même bloc : la journée ne s'allonge pas, elle change de registre.
- **Les masterclass, deux familles** : les **sectorielles** expliquent comment un secteur gagne ou perd de l'argent ; les **métiers** expliquent comment gagnent de l'argent ceux qui sont assis en face de la table — fonds de LBO, secondaire, capital-risque, banquier M&A, acquéreur, négociateur du contrat — et surtout ce que leur mode de rémunération les pousse réellement à faire. Elles partagent le même créneau de lecture : le stock grandit, la cadence ne bouge pas.
- **Révision espacée** : chaque contenu terminé revient à J+3, J+7, J+21. Trois révisions tenues = acquis.
- **Rattrapage** : toute question de quiz ratée reste au tableau jusqu'à être réussie.
- **Modes entretien** : 12 questions aléatoires, 8 minutes chrono, verdict du recruteur — en français et en anglais.
- **Sparring anti-flou** : réponse écrite de 200 caractères minimum, puis grille de correction **à cocher point par point** (score calculé).
- **Mission terrain** : une par semaine (URD, earnings call, DCF réel, paper LBO sur cible réelle…), preuve écrite exigée.
- **Le mémo du dimanche** : mémo d'investissement guidé en 6 sections, exporté pour correction par le coach.
- **XP et grades** : Stagiaire → Analyst → Associate → VP → Director → Managing Director → Rainmaker.
- **Sauvegarde** : export/import JSON depuis l'onglet Profil (la progression vit en localStorage).

- **Oral et entretiens** (ex-« Objectif stage ») : tuile en tête du menu du jour et du Sparring. Oral à voix haute (90 s, enregistrement possible, points attendus à cocher), réponses de fit rédigées puis dites, drill des trois états, deals récents et fiches personnelles, plan de six semaines.
- **Séance guidée** (activée par défaut) : chaque jour, 12 étapes dans un ordre imposé (chiffrage, formules, trois états, leçon, exos, oral, mise en situation, revue de presse, métier, conseil, deal, flashcards). Onglets et réglages verrouillés jusqu'à la fin ; bouton « Étape suivante » après chaque étape ; « Je suis bloqué » passe une étape mais ne valide pas la journée.
- **Formules en cartes** (`data-quotidien.js`) : 45 formules, recto = nom, verso = formule ; révision espacée (1, 2, 4, 7, 14, 30 jours), cartes ratées reprises dans la séance. Formulaire complet consultable dans l'Académie.
- **Conseil et bases M&A chaque jour** : une structuration de cas (30 énoncés, 2 minutes chrono, structure attendue et grille), une fiche conseil, deux cas de conseil par semaine, et une leçon du parcours Bases M&A (18 leçons dans l'ordre : métier, process, valeur, juridique du deal, LBO).
- **Métier du jour / conseil du jour** (`data-quotidien.js`) : 30 métiers de la finance et 30 fiches de conseil, un de chaque par jour, dans l'ordre.
- **Le quotidien recentré sur le private equity** (2026-11-24), à durée constante — 135 min avant, 135 min après :
  la **récitation** revient dans la séance (elle existait depuis le 7 octobre mais le programme stage ne l'affichait
  pas), à la place du drill des trois états et seulement quand une structure est due ; la **lecture du jour**
  (deal / masterclass / pensée) remplace le « métier du jour », dont les 30 fiches servaient à choisir une voie
  désormais choisie ; l'**oral** passe de 15 à 10 min et devient technique — le fit visait des entretiens de
  candidature et reste accessible dans l'espace Oral et entretiens. La **mise en situation** a une seule rotation au
  lieu de deux : la variante qui doublait les entretiens blancs à l'approche de janvier a disparu, et **Face au
  gérant** y prend deux jours par semaine.
- **Face au gérant** (`data-fonds.js`) : 6 situations posées par un associé de fonds — deux minutes pour trancher sur
  une cible, un co-investissement, un covenant qui va sauter, un build-up, un fonds à sélectionner, un minoritaire à
  structurer. Même mécanique que les autres sparrings (réponse écrite, puis grille à cocher), et le type **prend son
  tour** dans la rotation : zéro minute ajoutée.
- **Private equity · le métier** (`data-fonds.js`) : 4 leçons dans l'Académie — d'où vient le rendement d'un LBO, la
  due diligence et ses quatre portes, les cinq leviers de création de valeur, les quatre sorties. Le module entre dans
  l'ordre des priorités **devant** la finance d'entreprise.
- **Mode stage** (Profil) : Académie, leçon du jour et entretiens blancs recentrés sur les modules prioritaires (bases, compta, analyse, valo, M&A, LBO, finance d'entreprise).  ⚠️ **Deux programmes de journée coexistent** (fusion du 2026-11-23) : mode stage activé → le programme en 13 blocs de `data-stage.js` fait foi, et il ne contient **ni la récitation ni la lecture du jour** (deal / masterclass / pensée) ; mode stage désactivé → le menu du jour historique, qui les contient. Les pensées et les masterclass restent atteignables par l'onglet Lectures dans les deux cas ; la récitation, seulement hors mode stage. À arbitrer quand le programme sera recentré sur le stage de private equity.
- **Échappement, deux fonctions à ne pas confondre** (2026-11-23) : `esc()` échappe `& < > " '` pour le texte et
  les valeurs d'attribut ; `escJS()` échappe pour JavaScript **puis** pour HTML, et sert aux littéraux placés dans
  un attribut (`onclick="f('…')"`) — l'échappement HTML seul n'y suffit pas, le navigateur décodant les entités
  avant de lire le script. L'ancien `esc()` n'échappait que `<` : le bouton « Liquider <nom> » de Ma boîte était
  cassé pour toute société dont le nom contient une apostrophe.
- **La sauvegarde ne s'écrase plus toute seule** (2026-11-23) : `load()` distingue **vide** (pas de sauvegarde) de
  **illisible** (sauvegarde présente, JSON corrompu). Dans le second cas, `save()` **refuse d'écrire** et un bandeau
  rouge s'affiche en tête de toutes les vues — avant, le profil par défaut était servi en silence et le premier
  enregistrement effaçait tout. `save()` encaisse aussi le dépassement de quota (les ~30 apps partagent ~5 Mo) :
  il ne lève plus, et le bandeau dit depuis quelle heure plus rien n'est enregistré.
- **Service worker, les deux garde-fous** (2026-11-23) : il ne purge que les caches préfixés `closing-` — les ~30 apps partagent une seule origine, et l'ancien code vidait le cache hors-ligne de toutes les autres à chaque déploiement (constaté en direct) ; et il ne met jamais en cache une réponse dont `res.ok` est faux, sinon un 404 servi pendant un build GitHub Pages fige l'app sur « File not found ».
- **LE FONDS** (onglet, ajouté le 2026-11-23) : l'espace du stage de private equity, **libre et indépendant**.
  Il ne valide pas la journée, n'alimente ni la file de révision ni le Rattrapage, et **reste accessible pendant
  la séance guidée** — exception explicite dans `nav()` et `render()`, les seules de l'app. Ses questions ratées
  restent dans `S.fonds.ratees` et ne remontent pas dans le menu du jour. Son état vit dans `S.fonds`, isolé du reste.
  Quatre blocs : le **calendrier des 14 semaines** (la semaine courante se déduit de la date, aucune case ne tombe
  en retard), les **neuf ateliers** — chacun porte dans `ligne` la mission de l'offre qu'il couvre, lecture longue
  + modèles mentaux + ordres de grandeur + livrable + 5 questions —, et le **kit LP**, 44 calculs sur la mécanique
  d'un fonds, que l'app ne couvrait pas du tout — et **trois outils** : la fiche maison (coquille à
  remplir depuis les documents publics, rien de pré-rempli), le pipeline de cibles, et le mémo de comité
  en huit sections, assemblé et copié pour correction. L'XP est partagée : c'est du travail, il compte.
- **Réponds d'abord** (Profil, activé par défaut) : les choix d'un QCM restent cachés tant qu'on n'a pas formulé sa réponse.

## Règle d'écriture des QCM

La bonne réponse ne doit pas se reconnaître à sa forme : longueurs comparables, distracteurs plausibles, justification dans `exp` et non dans l'option. Les options sont mélangées à l'affichage partout (quiz, marches, cas) ; dans `exp`, une lettre en gras (`<b>A</b>`) est traduite vers la lettre affichée. Avant l'audit du 2026-10-10, la bonne réponse était la plus longue dans 96 % des 578 questions ; elle l'est désormais dans environ 24 % des cas, le niveau du hasard. Les 89 questions de `data-fonds.js` ont été vérifiées au même étalon : bonne réponse la plus longue dans 24 % des cas, écart moyen de longueur de −1 caractère.

## Ajouter du contenu

Chaque fichier `data-*.js` est un tableau d'objets autonome : ajouter une entrée suffit, aucun code à toucher. Le format est documenté en tête de chaque fichier.
