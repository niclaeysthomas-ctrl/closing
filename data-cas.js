// LE CLOSING — LE CAS : l'entretien de conseil en quatre temps.
// Écrit le 2026-09-24, sur « je me destine au consulting ».
//
// RÈGLE D'ÉCRITURE : aucun cas ne donne ses chiffres dans l'énoncé.
// En entretien, on les demande — ils arrivent donc au temps ③.
// Et les mauvaises options de cadrage ne sont pas absurdes : ce sont
// des questions RAISONNABLES mais qui ne changent pas la décision.
// Un cadre appris par cœur n'est jamais la bonne réponse.
//
// {id, ic, titre, type, duree, niveau, client, enonce,
//  clarif:{q, opts:[{t,bon,why}]}, structure:{q,opts[],a,exp,rappel?},
//  chiffres:{contexte, donnees:[[lab,val,unit]], questions:[{q,val,unit,calcul,cle,tol?}]},
//  reco:{q,opts[],a,exp}, debrief, grid[]}

const CAS = [

{id:"cas1", ic:"📉", titre:"La marge qui s'effrite", type:"Rentabilité", duree:"25 min", niveau:1,
 client:"Un fabricant français de mobilier de bureau, 80 M€ de chiffre d'affaires.",
 enonce:`Le directeur général te reçoit. « Notre chiffre d'affaires progresse de 4 % par an depuis trois ans, et pourtant notre résultat a fondu de moitié. Je ne comprends pas. Trouvez-moi ce qui se passe. »
   <br><br>Il n'a apporté aucun document.`,
 clarif:{q:"Avant de structurer quoi que ce soit, quelles questions poses-tu ? Choisis les TROIS qui changent réellement la suite.",
  opts:[
   {t:"La baisse du résultat vient-elle des volumes, des prix, ou des coûts ?", bon:true,
    why:"C'est LA question d'ouverture d'un cas de rentabilité. Profit = (prix × volume) − coûts : on demande laquelle des trois branches a bougé, et on divise le problème en deux d'un coup."},
   {t:"La baisse touche-t-elle toutes les gammes et tous les clients, ou est-elle concentrée ?", bon:true,
    why:"Un problème moyen est presque toujours un problème concentré. Si 80 % de la perte vient d'une gamme ou d'un client, le cas est déjà résolu à moitié."},
   {t:"S'agit-il d'un phénomène propre à l'entreprise ou de tout le secteur ?", bon:true,
    why:"La réponse change complètement la recommandation : un problème d'exécution se corrige en interne, un problème de marché impose un choix stratégique."},
   {t:"Quelle est la structure de l'actionnariat ?", bon:false,
    why:"Question légitime dans un autre contexte, mais elle n'explique pas une marge qui s'effrite. En entretien, une question qui ne fait pas avancer coûte du temps — et le temps est la note."},
   {t:"Quel logiciel de gestion utilisent-ils ?", bon:false,
    why:"C'est une question d'exécution, pas de diagnostic. On y viendra peut-être à la fin, jamais au début."},
   {t:"Combien de salariés compte l'entreprise ?", bon:false,
    why:"Un chiffre de contexte, pas un chiffre de décision. Il ne permet d'éliminer aucune hypothèse."}
  ]},
 structure:{q:"Par quelle décomposition attaques-tu ?",
  rappel:"Un bon découpage est MECE — sans recouvrement, sans trou — et surtout il est <b>fait pour ce problème-là</b>. Réciter un cadre générique est le signal le plus sûr d'un candidat qui n'a pas réfléchi.",
  opts:[
   "Les 4P du marketing : produit, prix, place, promotion",
   "Résultat = (prix × volume) − coûts fixes − coûts variables, puis on descend dans la branche qui a bougé",
   "Forces, faiblesses, opportunités, menaces",
   "Les cinq forces de Porter appliquées au mobilier de bureau"],
  a:1, exp:"La décomposition arithmétique du profit est la seule qui garantisse de trouver : chaque euro perdu est forcément dans une de ces branches. Les autres cadres sont des grilles d'analyse de marché — utiles plus tard, incapables de localiser une perte. <b>On descend ensuite dans la seule branche qui a bougé</b> : c'est ce qui distingue une structuration d'une liste."},
 chiffres:{contexte:"Tu demandes les chiffres. Le DG revient avec trois années comparées.",
  donnees:[["Chiffre d'affaires année 1",74000000,"€"],["Chiffre d'affaires année 3",80000000,"€"],
           ["Volume année 1 (unités)",185000,""],["Volume année 3 (unités)",216000,""],
           ["Coût variable unitaire année 1",248,"€u"],["Coût variable unitaire année 3",279,"€u"],
           ["Coûts fixes annuels (stables)",22000000,"€"]],
  questions:[
   {q:"Quel était le prix moyen en année 1 ?", val:400, unit:"€", tol:2,
    calcul:"74 000 000 € ÷ 185 000 = <b>400 €</b>",
    cle:"Le prix moyen ne se demande pas : il se déduit. Chiffre d'affaires ÷ volume, toujours."},
   {q:"Quel est le prix moyen en année 3 ?", val:370.37, unit:"€", tol:2,
    calcul:"80 000 000 € ÷ 216 000 = <b>370,4 €</b> — soit −7,4 % en deux ans",
    cle:"Le chiffre d'affaires montait pendant que le prix baissait : la croissance était achetée au prix. C'est invisible dans le compte de résultat, et c'est tout le cas."},
   {q:"Quelle était la marge sur coût variable TOTALE en année 1 ?", val:28120000, unit:"€",
    calcul:"(400 € − 248 €) × 185 000 = 152 € × 185 000 = <b>28 120 000 €</b>",
    cle:"On raisonne en marge sur coût variable avant d'aller aux coûts fixes : c'est elle qui doit les couvrir."},
   {q:"Et en année 3 ?", val:19736000, unit:"€", tol:60000,
    calcul:"(370,4 € − 279 €) × 216 000 = 91,4 € × 216 000 = <b>19 736 000 €</b>",
    cle:"La marge unitaire est passée de 152 € à 91,4 €, soit −40 %. Vendre 17 % d'unités en plus n'a pas suffi : il en aurait fallu 66 %."},
   {q:"De combien de % la marge sur coût variable totale a-t-elle chuté ?", val:29.8, unit:"%", tol:1.5,
    calcul:"(28 120 000 − 19 736 000) ÷ 28 120 000 = <b>29,8 %</b> de baisse",
    cle:"Voilà l'explication complète, et elle tient en une phrase : l'entreprise a acheté 17 % de volume en concédant 7 % de prix, pendant que ses coûts montaient de 12 %."}
  ]},
 reco:{q:"Que recommandes-tu au DG, en une phrase ?",
  opts:[
   "Augmenter les volumes pour absorber les coûts fixes",
   "Arrêter d'acheter du volume au prix, et remonter les prix là où l'élasticité le permet — en acceptant de perdre les clients les moins rentables",
   "Réduire les coûts fixes de 30 %",
   "Lancer une nouvelle gamme haut de gamme"],
  a:1, exp:"Le problème n'est pas le volume : c'est que chaque unité vendue rapporte 40 % de moins. Pousser les volumes aggrave. La recommandation doit viser la CAUSE identifiée — la double compression prix/coût — et assumer sa conséquence : perdre des clients. Une recommandation qui ne coûte rien à personne n'est pas une recommandation, c'est un vœu."},
 debrief:`<p><b>Ce cas teste une seule chose : sais-tu que la croissance peut masquer une destruction de valeur ?</b> Le chiffre d'affaires montait de 4 % par an. Tous les voyants « commerciaux » étaient au vert. Et la marge sur coût variable perdait 30 %.</p>
  <p><b>La bonne démarche, dans l'ordre :</b> ① décomposer le profit arithmétiquement ; ② déduire le prix moyen au lieu de le demander ; ③ voir la ciseau — prix qui baisse, coût qui monte ; ④ chiffrer l'écart ; ⑤ conclure sur la cause, pas sur le symptôme.</p>
  <p><b>Le piège classique</b> était de se lancer sur les coûts fixes. Ils sont stables dans l'énoncé : les regarder, c'est perdre dix minutes. Un bon candidat élimine une branche en une phrase et n'y revient pas.</p>
  <p>⚠️ <b>Et le lien avec le reste de l'app :</b> « remonter les prix là où l'élasticité le permet » n'est pas une formule creuse. C'est exactement le calcul du <b>palier 16 des exos</b> — le volume de compensation. Un consultant qui recommande une hausse de prix sans l'avoir chiffrée se fait démonter au premier comité.</p>`,
 grid:["Avoir posé une structure AVANT de demander le moindre chiffre, et l'avoir énoncée à voix haute.",
  "Avoir déduit le prix moyen au lieu de le demander — c'est le réflexe qui distingue tout de suite.",
  "Avoir éliminé explicitement les coûts fixes en une phrase, au lieu de les ignorer en silence.",
  "Avoir donné une recommandation qui ASSUME une conséquence désagréable (perdre des clients).",
  "Avoir parlé pendant le calcul, pour que l'interlocuteur suive le raisonnement et pas seulement le résultat."]},

{id:"cas2", ic:"📏", titre:"Combien de cafés se boivent à Paris chaque jour ?", type:"Market sizing", duree:"15 min", niveau:1,
 client:"Un torréfacteur qui envisage d'ouvrir un réseau de points de vente.",
 enonce:`« Avant de parler d'implantation, donnez-moi un ordre de grandeur : combien de cafés sont consommés hors domicile à Paris intra-muros, un jour de semaine ? »
   <br><br>Aucune donnée. Aucun accès à Internet. Tu as cinq minutes et un tableau blanc.`,
 clarif:{q:"Quelles TROIS précisions demandes-tu avant de te lancer ?",
  opts:[
   {t:"Hors domicile uniquement, ou tout le café consommé ?", bon:true,
    why:"Le périmètre est la première chose à verrouiller : hors domicile est un sous-ensemble bien plus petit. Un sizing sur le mauvais périmètre est juste et inutilisable."},
   {t:"Paris intra-muros, ou l'agglomération ?", bon:true,
    why:"2,1 millions d'habitants contre plus de 10 : un facteur 5 sur le résultat final. On fixe la géographie avant de compter."},
   {t:"Un jour de semaine ouvré, ou une moyenne annuelle incluant week-ends et août ?", bon:true,
    why:"Paris se vide en août et le week-end. Préciser « jour ouvré » évite de devoir corriger après coup — et montre qu'on sait que les flux de travailleurs comptent plus que les résidents."},
   {t:"Quel est le prix moyen d'un café ?", bon:false,
    why:"Utile pour passer ensuite au marché EN VALEUR, mais inutile pour compter des unités. On ne mélange pas les deux étapes."},
   {t:"Quelles sont les parts de marché des principales chaînes ?", bon:false,
    why:"C'est une question de la phase suivante — le marché adressable. Elle n'aide pas à dimensionner le total."},
   {t:"Quelle est la consommation de café en Italie ?", bon:false,
    why:"Un comparable international peut servir de contrôle à la fin, jamais de point de départ. On construit d'abord son propre chemin."}
  ]},
 structure:{q:"Quelle approche annonces-tu ?",
  rappel:"Deux chemins existent toujours : par la <b>demande</b> (combien de gens, combien de fois) ou par l'<b>offre</b> (combien de points de vente, combien chacun en sert). Le bon réflexe est d'en choisir un, de le dérouler proprement, puis de <b>contrôler avec l'autre</b>.",
  opts:[
   "Je cherche la population de Paris et je multiplie par la consommation française moyenne par habitant",
   "Je segmente la population présente en journée (résidents + travailleurs entrants + touristes), j'applique à chaque segment un taux de consommation hors domicile, puis je contrôle par l'offre (nombre de cafés × tasses/jour)",
   "Je pars du nombre de cafés et bars parisiens, que j'estime, et j'en déduis tout",
   "J'extrapole depuis le chiffre d'affaires d'une grande chaîne"],
  a:1, exp:"La segmentation par population PRÉSENTE est décisive : Paris compte 2,1 millions d'habitants mais accueille chaque jour près d'un million de travailleurs entrants, qui sont précisément les plus gros consommateurs hors domicile. Partir des seuls résidents sous-estime massivement. Et annoncer d'emblée le <b>contrôle par l'offre</b> montre qu'on sait qu'un sizing sans vérification ne vaut rien."},
 chiffres:{contexte:"Tu poses tes hypothèses au tableau. L'associé les accepte — c'est leur cohérence qui est notée, pas leur exactitude.",
  donnees:[["Résidents de Paris intra-muros",2100000,""],["Travailleurs entrants chaque jour ouvré",900000,""],
           ["Touristes présents en moyenne",200000,""],
           ["Part des résidents buvant un café hors domicile",25,"%"],["Tasses par jour pour ceux-là",1.2,""],
           ["Part des travailleurs entrants concernés",60,"%"],["Tasses par jour pour ceux-là",1.8,""],
           ["Part des touristes concernés",70,"%"],["Tasses par jour pour ceux-là",1.5,""]],
  questions:[
   {q:"Combien de tasses proviennent des résidents ?", val:630000, unit:"", tol:5000,
    calcul:"2 100 000 × 25 % × 1,2 = 525 000 × 1,2 = <b>630 000 tasses</b>",
    cle:"On applique toujours deux filtres : qui est concerné, puis combien de fois. Confondre « part de la population » et « fréquence » est l'erreur la plus fréquente d'un sizing."},
   {q:"Combien de tasses proviennent des travailleurs entrants ?", val:972000, unit:"", tol:8000,
    calcul:"900 000 × 60 % × 1,8 = 540 000 × 1,8 = <b>972 000 tasses</b>",
    cle:"Ils sont deux fois moins nombreux que les résidents et consomment plus. C'est exactement ce que la segmentation servait à révéler."},
   {q:"Combien de tasses proviennent des touristes ?", val:210000, unit:"", tol:3000,
    calcul:"200 000 × 70 % × 1,5 = 140 000 × 1,5 = <b>210 000 tasses</b>",
    cle:"Un segment petit qu'on garde quand même : l'oublier serait une faute de méthode, même s'il pèse peu."},
   {q:"Quel est le total, en tasses par jour ouvré ?", val:1812000, unit:"", tol:15000,
    calcul:"630 000 + 972 000 + 210 000 = <b>1 812 000 tasses</b>, soit environ 1,8 million",
    cle:"On arrondit pour annoncer : « de l'ordre de 1,8 million de tasses par jour ». Un sizing s'énonce en ordre de grandeur, jamais avec six chiffres significatifs."},
   {q:"Contrôle par l'offre : si Paris compte environ 7 000 établissements servant du café, combien chacun en sert-il par jour selon ton estimation ?", val:259, unit:"", tol:12,
    calcul:"1 812 000 ÷ 7 000 = <b>259 tasses par établissement et par jour</b>",
    cle:"C'est ici que le sizing se valide ou s'effondre. 259 tasses sur une journée de 12 heures, soit une vingtaine par heure : c'est plausible pour un café parisien. Si on était tombé sur 3 000, il aurait fallu revenir sur les hypothèses — à voix haute, devant l'examinateur."}
  ]},
 reco:{q:"Comment présentes-tu ton résultat à l'associé ?",
  opts:[
   "« 1 812 000 tasses par jour. »",
   "« De l'ordre de 1,8 million de tasses par jour ouvré. Le contrôle par l'offre donne 259 tasses par établissement, ce qui est plausible. Mon hypothèse la plus fragile est la fréquence des travailleurs entrants : à 1,2 tasse au lieu de 1,8, le total tombe à 1,5 million. »",
   "« Entre 1 et 3 millions, difficile d'être plus précis. »",
   "« Il faudrait une étude de marché pour répondre sérieusement. »"],
  a:1, exp:"Trois choses font la différence, et ce sont exactement celles qui sont notées : l'ordre de grandeur <b>arrondi</b> (annoncer 1 812 000 est le signe qu'on n'a pas compris ce qu'est une estimation), le <b>contrôle de vraisemblance</b>, et surtout la <b>sensibilité</b> — savoir quelle hypothèse porte le résultat et ce qui se passe si elle est fausse. Répondre « il faudrait une étude » est éliminatoire : c'est précisément ce qu'on te demande de ne pas dire."},
 debrief:`<p><b>Un market sizing ne teste pas ton arithmétique.</b> Il teste trois choses : ta capacité à poser une structure sous pression, la <b>cohérence</b> de tes hypothèses, et ton honnêteté sur leur fragilité.</p>
  <p><b>La faute la plus coûteuse</b> est de partir des 2,1 millions de résidents. Paris est une ville qui double en journée : les travailleurs entrants pèsent ici plus que les habitants. Un candidat qui ne segmente pas la population <i>présente</i> se trompe de 40 % sans le savoir.</p>
  <p><b>La deuxième</b> est d'annoncer un chiffre précis. « 1 812 000 » signale qu'on a confondu un modèle avec une mesure. On dit « de l'ordre de 1,8 million », et on tient le chiffre exact en réserve si on le demande.</p>
  <p><b>Et la troisième</b> est de ne jamais contrôler. Le croisement demande/offre coûte trente secondes et sauve un entretien : c'est lui qui transforme une suite de multiplications en estimation défendable.</p>`,
 grid:["Avoir verrouillé le périmètre (hors domicile, intra-muros, jour ouvré) avant de poser le premier chiffre.",
  "Avoir segmenté la population PRÉSENTE, pas la population résidente.",
  "Avoir énoncé chaque hypothèse à voix haute en la justifiant d'une demi-phrase, au lieu de l'écrire en silence.",
  "Avoir contrôlé le résultat par l'autre chemin, spontanément et sans qu'on le demande.",
  "Avoir nommé l'hypothèse la plus fragile et chiffré son impact — c'est le réflexe qui fait passer de « bon candidat » à « embauché »."]},

{id:"cas3", ic:"🚪", titre:"Faut-il entrer en Espagne ?", type:"Entrée sur un marché", duree:"30 min", niveau:2,
 client:"Un éditeur français de logiciels de gestion pour PME, 40 M€ de chiffre d'affaires, rentable.",
 enonce:`« Notre marché français arrive à maturité. Le comité pousse pour l'Espagne : même taille de tissu de PME, proximité culturelle, équipe commerciale motivée. Faut-il y aller ? »
   <br><br>Ils ont déjà choisi le pays. Ils veulent que tu valides.`,
 clarif:{q:"Trois questions, et seulement trois.",
  opts:[
   {t:"Quel problème l'Espagne résout-elle : la croissance, la marge, ou la dépendance au marché français ?", bon:true,
    why:"On ne valide pas une décision, on valide un OBJECTIF. Si l'enjeu est la croissance, d'autres options existent (nouveaux segments, nouvelles offres, acquisition) et doivent être comparées. Un cas d'entrée qui n'interroge pas l'objectif est un cas mal cadré."},
   {t:"Le produit fonctionne-t-il tel quel, ou faut-il l'adapter (fiscalité, comptabilité, langue, réglementation) ?", bon:true,
    why:"Pour un logiciel de gestion, la localisation n'est pas cosmétique : la comptabilité et la fiscalité sont nationales. Ce coût-là décide souvent à lui seul de la rentabilité de l'entrée."},
   {t:"Qui occupe déjà ce marché, et pourquoi un acteur local perdrait-il face à un entrant français ?", bon:true,
    why:"La question qui tue les cas d'entrée. « Marché de même taille » ne signifie pas « marché accessible ». S'il n'existe aucune raison qu'un prospect préfère l'entrant, il n'y a pas de marché adressable."},
   {t:"Quel est le taux de change euro-euro ?", bon:false,
    why:"Aucun : les deux pays sont dans la zone euro. Une question qui trahit un cadre appliqué sans réfléchir au contexte."},
   {t:"Quelle est la croissance du PIB espagnol ?", bon:false,
    why:"Chiffre de contexte. Il ne change ni le coût d'entrée, ni la part de marché atteignable, ni la décision."},
   {t:"Combien de commerciaux sont volontaires pour partir ?", bon:false,
    why:"Une contrainte d'exécution, pas un critère de décision. Elle arrive après le « faut-il », jamais avant."}
  ]},
 structure:{q:"Comment structures-tu la décision ?",
  rappel:"Une entrée sur un marché se juge sur trois questions enchaînées, et l'ordre compte : <b>le marché est-il attractif ? · pouvons-nous y gagner ? · cela crée-t-il plus de valeur qu'une autre option ?</b> Beaucoup de candidats répondent aux deux premières et oublient la troisième, qui est pourtant celle du comité.",
  opts:[
   "Attractivité du marché → capacité à y gagner → comparaison au meilleur usage alternatif du capital",
   "SWOT de l'Espagne, puis plan d'action à 90 jours",
   "Analyse PESTEL du marché espagnol",
   "Étude des concurrents espagnols, puis recrutement"],
  a:0, exp:"Les trois étages, dans cet ordre. Le troisième est celui qu'on oublie et c'est le plus important : un projet peut être rentable <b>et</b> être le mauvais choix, si le même euro rapporte davantage ailleurs. C'est le lien direct avec le WACC et le coût d'opportunité — <b>palier 11 des exos</b>."},
 chiffres:{contexte:"L'équipe te sort ses hypothèses d'entrée. Tu les prends telles quelles et tu calcules.",
  donnees:[["PME espagnoles dans la cible",180000,""],["Part réellement adressable (taille, secteur)",15,"%"],
           ["Part de marché visée à 5 ans",3,"%"],["Prix annuel moyen par client",2400,"€"],
           ["Coût de localisation du produit (une fois)",1800000,"€"],
           ["Coût commercial annuel (équipe, marketing)",2600000,"€"],
           ["Marge sur coût variable du logiciel",80,"%"],
           ["Coût du capital de l'entreprise",9,"%"]],
  questions:[
   {q:"Combien de PME sont réellement adressables ?", val:27000, unit:"", tol:200,
    calcul:"180 000 × 15 % = <b>27 000 PME</b>",
    cle:"Le marché adressable n'est jamais le marché total. Confondre les deux est la faute qui gonfle tous les business plans d'entrée."},
   {q:"Combien de clients cela représente-t-il à 5 ans ?", val:810, unit:"", tol:10,
    calcul:"27 000 × 3 % = <b>810 clients</b>",
    cle:"3 % paraît modeste, et c'est justement ce qui rend l'hypothèse crédible. Un candidat qui accepte « 15 % de part de marché à 5 ans » sans broncher a déjà perdu."},
   {q:"Quel chiffre d'affaires annuel à 5 ans ?", val:1944000, unit:"€",
    calcul:"810 × 2 400 € = <b>1 944 000 €</b>",
    cle:"Moins de 2 M€ sur une base de 40 M€ : le premier ordre de grandeur doit déjà faire tiquer. C'est le moment de le dire à voix haute."},
   {q:"Quelle marge sur coût variable annuelle à 5 ans ?", val:1555200, unit:"€",
    calcul:"1 944 000 € × 80 % = <b>1 555 200 €</b>",
    cle:"La marge logicielle est élevée : c'est ce qui rend ce type d'entrée tentant. Elle ne suffit pourtant pas ici."},
   {q:"Quel est le résultat annuel à 5 ans, une fois le coût commercial déduit ?", val:-1044800, unit:"€",
    calcul:"1 555 200 € − 2 600 000 € = <b>−1 044 800 €</b>",
    cle:"Négatif en régime de croisière, cinq ans après l'entrée, et sans compter le 1,8 M€ de localisation. La question n'est plus « faut-il y aller » mais « pourquoi personne n'a fait ce calcul avant le comité ? »."},
   {q:"Quelle part de marché faudrait-il atteindre pour simplement couvrir le coût commercial annuel ?", val:5.01, unit:"%", tol:.3,
    calcul:"Il faut 2 600 000 € de marge, soit 3 250 000 € de chiffre d'affaires, soit 1 354 clients · 1 354 ÷ 27 000 = <b>5,0 %</b>",
    cle:"Voilà la vraie question à poser au comité : passer de 3 % à 5 % de part de marché sur un marché occupé, en tant qu'entrant étranger. Est-ce crédible ? C'est une question à laquelle un dirigeant peut répondre — contrairement à « faut-il y aller ? »."}
  ]},
 reco:{q:"Quelle est ta recommandation ?",
  opts:[
   "Y aller : la marge logicielle est excellente et le marché est vaste",
   "Ne pas y aller sous cette forme : le seuil de rentabilité exige 5 % de part de marché, presque le double de l'hypothèse. Tester d'abord via un partenaire local ou un revendeur, sans les 1,8 M€ de localisation, et n'engager les coûts fixes qu'après preuve de traction",
   "Ne jamais s'internationaliser",
   "Acquérir un concurrent espagnol immédiatement"],
  a:1, exp:"La bonne recommandation ne dit pas « non » : elle dit <b>« pas comme ça »</b>, et elle propose une façon de réduire l'incertitude à moindre coût. C'est la différence entre un consultant et un censeur. Le raisonnement sous-jacent est celui d'une option : on paie peu pour acheter de l'information, et on n'engage le gros du capital qu'une fois le doute levé."},
 debrief:`<p><b>Ce cas teste ta capacité à ne pas valider ce qu'on te demande de valider.</b> Le client a déjà choisi le pays ; il attend une confirmation. Le chiffrage dit l'inverse — et le dire est exactement le métier.</p>
  <p><b>La chaîne qui fait tout</b> : marché total → adressable → part atteignable → clients → chiffre d'affaires → marge → résultat. Chaque étage divise. Partir de « 180 000 PME » et finir sur un résultat négatif en six multiplications, c'est ce qu'on attend d'un candidat en dix minutes.</p>
  <p><b>Le geste qui distingue</b> est la dernière question : renverser le calcul pour sortir le <b>seuil</b>. « Il vous faut 5 % de part de marché » est une phrase qu'un dirigeant peut évaluer avec son intuition du terrain. « Le projet a une VAN négative » ne se discute pas, donc ne convainc personne.</p>
  <p>⚠️ <b>Et l'étage que presque tous oublient</b> : le coût d'opportunité. Même rentable, ce projet devrait être comparé à ce que les mêmes 4,4 M€ rapporteraient sur le marché français. Un projet se juge contre son meilleur concurrent interne, jamais contre zéro.</p>`,
 grid:["Avoir remis en cause le périmètre imposé (« pourquoi l'Espagne ? ») sans être désagréable.",
  "Avoir descendu la chaîne marché total → adressable → part atteignable sans sauter d'étage.",
  "Avoir renversé le calcul pour donner un SEUIL, pas seulement un verdict.",
  "Avoir proposé une option à faible coût plutôt qu'un « non » sec.",
  "Avoir mentionné le coût d'opportunité, même en une phrase."]},

{id:"cas4", ic:"🎚️", titre:"Le concurrent casse les prix de 15 %", type:"Pricing", duree:"25 min", niveau:2,
 client:"Un fabricant de consommables techniques pour laboratoires.",
 enonce:`« Notre principal concurrent vient de baisser ses tarifs de 15 %. Mon directeur commercial veut s'aligner dès lundi, il parle d'hémorragie. Mon directeur financier refuse. Tranchez. »
   <br><br>On te demande un arbitrage, pas une analyse.`,
 clarif:{q:"Trois questions avant de trancher.",
  opts:[
   {t:"Quelle est notre marge unitaire, en % du prix ?", bon:true,
    why:"Sans le taux de marge, il est impossible de calculer le volume nécessaire pour compenser une remise. C'est le chiffre sans lequel la conversation n'a pas lieu."},
   {t:"Quelle est notre élasticité-prix observée sur ce produit ?", bon:true,
    why:"Elle donne le volume que la baisse rapporterait RÉELLEMENT. Sans elle, « on va gagner des parts de marché » est une croyance, pas une prévision."},
   {t:"Le concurrent peut-il tenir ce prix durablement — quelle est sa structure de coûts, quelle est sa trésorerie ?", bon:true,
    why:"Une guerre des prix se gagne par celui qui survit, pas par celui qui baisse le premier. Si le concurrent brûle du cash pour prendre des parts, attendre est une stratégie."},
   {t:"Quel est notre chiffre d'affaires total ?", bon:false,
    why:"Il ne change pas la décision : le calcul se fait en pourcentages, sur la marge unitaire. Un gros chiffre d'affaires ne rend pas une remise plus supportable."},
   {t:"Depuis combien d'années sommes-nous sur ce marché ?", bon:false,
    why:"Du contexte. Il n'entre dans aucun calcul et ne départage pas les deux directeurs."},
   {t:"Quel est le taux de satisfaction client ?", bon:false,
    why:"Intéressant pour la stratégie de long terme, inutile pour trancher une décision de prix à quinze jours."}
  ]},
 structure:{q:"Sur quoi fondes-tu l'arbitrage ?",
  rappel:"Une remise ne se prend pas sur le prix : elle se prend <b>entièrement sur la marge</b>. La seule question qui tranche est donc : <b>combien de volume en plus faut-il pour retrouver la même marge totale, et le marché me le donne-t-il ?</b>",
  opts:[
   "L'effet de la baisse sur le chiffre d'affaires",
   "La comparaison entre le volume de compensation nécessaire — r/(m−r) — et le volume que l'élasticité donne réellement",
   "Le ressenti de la force de vente sur le terrain",
   "La part de marché relative face au concurrent"],
  a:1, exp:"Le chiffre d'affaires est un piège : sur un produit élastique, il peut monter <b>pendant que la marge s'effondre</b>. Le seul arbitrage valide oppose ce qu'il FAUT (r/(m−r)) à ce que le marché DONNE (|e| × r). C'est exactement le <b>palier 16 des exos</b> — et exactement ce que LA BOÎTE te reproche quand tu veux t'aligner."},
 chiffres:{contexte:"Le DAF t'envoie les chiffres dans l'heure.",
  donnees:[["Prix de vente unitaire",180,"€u"],["Coût variable unitaire",99,"€u"],
           ["Remise envisagée (alignement)",15,"%"],["Élasticité-prix observée",-1.4,""],
           ["Volume mensuel actuel",4200,""],["Trésorerie du concurrent (estimée)",6000000,"€"],
           ["Perte mensuelle du concurrent à ce prix (estimée)",700000,"€"]],
  questions:[
   {q:"Quel est ton taux de marge, en % du prix ?", val:45, unit:"%", tol:.5,
    calcul:"(180 € − 99 €) ÷ 180 € = 81 € ÷ 180 € = <b>45 %</b>",
    cle:"Le taux de marge est le seul chiffre qui dise ce qu'une remise coûte vraiment. On le calcule avant toute discussion."},
   {q:"Quelle serait ta marge unitaire après un alignement de 15 % ?", val:54, unit:"€", tol:.5,
    calcul:"180 € × 85 % = 153 € · 153 € − 99 € = <b>54 €</b>, contre 81 € avant",
    cle:"15 % de prix en moins, 33 % de marge en moins. Le coût variable, lui, n'a pas bougé : toute la remise sort de ta poche."},
   {q:"Quel volume EN PLUS, en %, faudrait-il pour retrouver la même marge totale ?", val:50, unit:"%", tol:1.5,
    calcul:"r ÷ (m − r) = 15 % ÷ (45 % − 15 %) = 15 ÷ 30 = <b>+50 %</b> · soit 6 300 unités au lieu de 4 200",
    cle:"Une remise de 15 % exige de vendre une fois et demie plus. C'est le chiffre à poser sur la table avant que quiconque parle d'hémorragie."},
   {q:"Quel volume l'élasticité te donne-t-elle réellement, en % ?", val:21, unit:"%", tol:.8,
    calcul:"1,4 × 15 % = <b>+21 %</b>",
    cle:"21 quand il en faut 50. L'écart n'est pas discutable : l'alignement détruit de la marge, même en faisant monter le chiffre d'affaires."},
   {q:"Combien de mois le concurrent peut-il tenir à ce rythme de pertes ?", val:8.6, unit:"", tol:.5,
    calcul:"6 000 000 € ÷ 700 000 € = <b>8,6 mois</b>",
    cle:"C'est la vraie durée du problème. Une guerre des prix n'est pas un état permanent : c'est un compte à rebours, et il faut savoir lequel des deux s'arrête en premier."},
   {q:"À quelle élasticité l'alignement deviendrait-il rentable ?", val:3.33, unit:"", tol:.15,
    calcul:"|e| ≥ 1 ÷ (m − r) = 1 ÷ 30 % = <b>3,33</b> · la tienne vaut 1,4",
    cle:"Il faudrait une élasticité plus de deux fois supérieure. Ce n'est pas une question d'opinion ni de courage commercial : c'est arithmétiquement perdant."}
  ]},
 reco:{q:"Que tranches-tu ?",
  opts:[
   "S'aligner dès lundi pour protéger les parts de marché",
   "Ne pas s'aligner sur le tarif. Défendre la marge, cibler une remise sélective sur les seuls comptes réellement menacés, et tenir : le concurrent a environ huit mois de trésorerie à ce prix",
   "Baisser de 7,5 % pour couper la poire en deux",
   "Augmenter les prix pour signaler la qualité"],
  a:1, exp:"L'alignement général est perdant (21 % de volume contre 50 % nécessaires). Le demi-alignement est le pire des choix : il détruit de la marge sans convaincre personne — c'est le piège du « compromis raisonnable ». La bonne réponse combine les trois chiffres : <b>défendre le prix affiché</b>, <b>concéder de façon sélective et négociée</b> là où le risque est réel, et <b>utiliser le runway du concurrent</b> comme horizon de la décision."},
 debrief:`<p><b>Ce cas a une bonne réponse, et elle est arithmétique.</b> C'est rare et c'est précieux : la plupart des arbitrages de prix se règlent au rapport de force interne entre commerce et finance, alors qu'ils se calculent en trois lignes.</p>
  <p><b>Les trois chiffres qui tranchent :</b> ce qu'il faut (+50 %), ce que le marché donne (+21 %), et combien de temps l'adversaire tient (8,6 mois). Aucun des deux directeurs ne les avait.</p>
  <p><b>Le piège du demi-alignement</b> mérite d'être nommé, parce qu'il gagne presque toujours en réunion : il a l'air raisonnable, il ménage tout le monde, et il cumule les deux inconvénients — on perd de la marge <i>et</i> on ne récupère pas le client qui partait pour le prix.</p>
  <p>⚠️ <b>Et le réflexe à garder de ce cas</b> : quand on te demande de trancher entre deux personnes, ne tranche pas entre les personnes. Sors le chiffre qui rend la question sans objet. C'est la seule façon de ne pas se faire le complice du plus convaincant des deux.</p>`,
 grid:["Avoir refusé de répondre avant d'avoir la marge et l'élasticité.",
  "Avoir posé le volume de compensation AVANT de parler de part de marché.",
  "Avoir nommé le demi-alignement comme un piège, au lieu de le proposer comme compromis.",
  "Avoir regardé la trésorerie du concurrent — la guerre des prix est une question de durée, pas de prix.",
  "Avoir donné une décision claire, datée et assumée, et non un éventail d'options."]},

];

/* ================================================================
   LE BRIEFING — ce qu'il faut savoir AVANT de faire un cas.
   Ajouté le 2026-09-24, sur « beaucoup de conseils au début ».

   ⚠️ Les processus des cabinets évoluent (formats, tests en ligne,
   nombre de tours). Ce qui est écrit ici est ce qu'on rencontre le
   plus souvent et ce qui ne change pas : les critères de notation,
   la mécanique d'un cas, les fautes qui éliminent. Pour le détail
   d'un process donné, la page carrières du cabinet fait foi.
   ================================================================ */
const CAS_BRIEF = [

{id:"b1", ic:"🎯", titre:"Ce qu'on te note vraiment", sujet:"Les cinq critères, et ce qu'ils veulent dire concrètement",
 contenu:[
  "Un entretien de cas ne teste pas ta culture business. Il simule vingt minutes de travail avec toi, et l'examinateur remplit une grille. Cinq lignes, presque toujours les mêmes d'un cabinet à l'autre.",
  "<b>① STRUCTURATION.</b> Sais-tu découper un problème flou en morceaux qui s'additionnent ? On regarde si ton découpage est exhaustif, sans recouvrement, et surtout s'il est <i>fait pour ce problème-là</i>. Un cadre récité est noté plus bas qu'un découpage maladroit mais sur mesure.",
  "<b>② QUANTITATIF.</b> Pas ta vitesse de calcul : ta <i>méthode</i>. Annonces-tu ce que tu vas calculer avant de le faire ? Arrondis-tu intelligemment ? Vérifies-tu l'ordre de grandeur ? Une erreur d'arithmétique rattrapée à voix haute coûte moins cher qu'un résultat juste sorti sans explication.",
  "<b>③ JUGEMENT BUSINESS.</b> Est-ce que tes hypothèses tiennent debout dans la vraie vie ? Est-ce que tu vois ce qui manque ? C'est le critère le moins enseignable et celui qui départage à la fin.",
  "<b>④ COMMUNICATION.</b> Parles-tu en structure — « trois raisons, la première… » — ou en flux continu ? Réponds-tu à la question posée ou à celle que tu aurais préféré ? On teste si un client te supporterait deux heures en salle.",
  "<b>⑤ PRÉSENCE.</b> Encaisses-tu une objection sans t'écrouler ni t'entêter ? L'examinateur va te contredire exprès au moins une fois. Ce n'est pas un piège, c'est le test le plus direct : on veut voir si tu changes d'avis pour de bonnes raisons.",
  "⚠️ Le malentendu le plus coûteux : croire qu'il faut <b>trouver la bonne réponse</b>. La plupart des cas n'en ont pas. On te note sur le chemin, pas sur l'arrivée — et deux candidats avec des conclusions opposées peuvent être reçus tous les deux."
 ],
 cles:["Un cadre récité est noté plus bas qu'un découpage maladroit mais sur mesure.",
  "Une erreur rattrapée à voix haute coûte moins cher qu'un résultat juste sorti sans explication.",
  "L'examinateur te contredira exprès. Le test est : changes-tu d'avis pour de bonnes raisons ?"]},

{id:"b2", ic:"🏛️", titre:"Les deux écoles : qui mène l'entretien ?", sujet:"Interviewer-led et candidate-led, et ce que ça change pour toi",
 contenu:[
  "Il existe deux mécaniques d'entretien, et elles demandent des comportements différents. Confondre les deux est la source d'erreur numéro un des candidats qui préparent seuls.",
  "<b>L'entretien mené par l'examinateur (interviewer-led)</b>, associé traditionnellement à McKinsey. L'examinateur te pose une série de questions dans un ordre qu'il a décidé : « comment structurerais-tu ? », puis « voici un graphique, qu'en conclus-tu ? », puis « calcule ceci », puis « quelles recommandations ? ». Tu ne choisis pas la suite. Ce qu'on attend : des réponses <b>complètes et autonomes à chaque question</b>, sans chercher à reprendre la main.",
  "<b>L'entretien mené par le candidat (candidate-led)</b>, associé traditionnellement à BCG et Bain. Tu proposes la structure, tu décides quelle branche explorer en premier, tu demandes les données dont tu as besoin. L'examinateur répond mais ne guide pas. Ce qu'on attend : que tu <b>conduises</b>, que tu annonces où tu vas, et que tu ne restes jamais silencieux à attendre une indication.",
  "En pratique, la frontière est poreuse : beaucoup d'entretiens mélangent les deux, et un même cabinet varie selon le bureau, le tour et l'examinateur. Le réflexe utile est donc de <b>demander au début</b> : « préférez-vous que je déroule ma structure, ou que vous me guidiez ? ». La question est bien reçue — elle montre qu'on connaît la mécanique.",
  "<b>Au-delà du cas</b>, la plupart des grands cabinets consacrent une part importante de l'entretien à ton parcours : chez McKinsey, le <i>Personal Experience Interview</i> occupe souvent la moitié du temps. Beaucoup de candidats préparent le cas à fond et improvisent cette partie-là — c'est une erreur d'allocation, pas de niveau.",
  "⚠️ Les process changent régulièrement (tests en ligne, cas écrits, entretiens de groupe selon les bureaux). Ce qui ne change pas, c'est ce qu'on cherche. Pour le format exact d'un process donné, la page carrières du cabinet fait foi."
 ],
 cles:["Demande au début qui mène : la question est bien reçue.",
  "En candidate-led, le silence est une faute. En interviewer-led, reprendre la main en est une.",
  "La partie « parcours » pèse souvent autant que le cas, et se prépare autant."]},

{id:"b3", ic:"⏱️", titre:"Les sept premières minutes", sujet:"L'ouverture, qui décide de la suite",
 contenu:[
  "L'examinateur se fait une opinion très tôt. Pas sur ton intelligence — sur ta méthode. Quatre gestes, dans cet ordre, et aucun ne se saute.",
  "<b>① REFORMULER.</b> Tu répètes l'énoncé avec tes mots, en trente secondes. « Si je comprends bien : votre client fabrique X, son résultat a baissé de moitié en trois ans alors que le chiffre d'affaires progresse, et vous voulez savoir pourquoi. » Ça vérifie que tu as entendu, ça te donne du temps, et ça corrige un malentendu avant qu'il coûte dix minutes.",
  "<b>② VERROUILLER L'OBJECTIF.</b> « L'objectif est-il de restaurer le résultat à son niveau d'il y a trois ans, ou d'atteindre une cible précise ? À quel horizon ? » Un cas sans objectif chiffré est un cas qu'on ne peut pas conclure. C'est souvent omis volontairement dans l'énoncé.",
  "<b>③ POSER TES QUESTIONS.</b> Deux ou trois, pas huit. Chacune doit pouvoir changer ta structure — sinon elle coûte du temps sans rien rapporter. Une bonne question élimine une branche entière.",
  "<b>④ DEMANDER UN TEMPS.</b> « Puis-je prendre une minute pour structurer ? » Toujours. Personne n'a jamais été pénalisé pour avoir pris soixante secondes ; beaucoup l'ont été pour avoir commencé à parler sans plan. Et prends vraiment le temps — trente secondes de silence assumé valent mieux qu'une structure bancale.",
  "Puis tu annonces ta structure <b>avant</b> de l'explorer : « je vois trois axes, je commence par le second parce que c'est là que l'énoncé pointe ». Annoncer où l'on va, puis y aller : c'est tout le métier."
 ],
 cles:["Reformuler, verrouiller l'objectif, deux ou trois questions, demander une minute.",
  "Une bonne question élimine une branche entière. Les autres coûtent du temps.",
  "Annonce ta structure AVANT de l'explorer, et dis par quelle branche tu commences et pourquoi."]},

{id:"b4", ic:"🌳", titre:"Structurer sans réciter", sujet:"MECE, arbre du problème, et pourquoi les cadres tout faits desservent",
 contenu:[
  "<b>MECE</b> — mutuellement exclusif, collectivement exhaustif — veut dire deux choses simples : pas de recouvrement entre tes branches, et rien qui manque. « Coûts fixes / coûts variables » est MECE. « Coûts de production / coûts marketing / coûts imprévus » ne l'est pas.",
  "La façon la plus sûre d'être MECE est l'<b>arbre arithmétique</b> : partir d'une équation et la décomposer. Résultat = (prix × volume) − coûts. Volume = marché total × part de marché. Coûts = fixes + variables. Chaque euro du problème est forcément dans une branche — c'est mathématiquement garanti, donc on ne peut rien oublier.",
  "Les cadres appris — 4P, SWOT, Porter, 3C — ont un autre usage : ce sont des <b>listes de contrôle</b> pour ne pas oublier une dimension, pas des plans d'attaque. Les réciter en ouverture signale qu'on a lu un livre, pas qu'on a réfléchi au problème. Un examinateur entend la différence immédiatement.",
  "<b>La règle pratique :</b> deux à quatre branches, jamais plus. Nommées avec les mots du problème (« les clients qui partent », « le coût de la matière ») et non avec des étiquettes génériques. Et chaque branche doit mener à une question à laquelle un chiffre peut répondre.",
  "<b>Et surtout : hiérarchise.</b> Une structure plate — « je regarderai A, B, C et D » — n'est pas une structure, c'est une liste. Dis lequel tu attaques en premier et <i>pourquoi</i>. « Je commence par les coûts, parce que l'énoncé dit que le chiffre d'affaires progresse : le problème est forcément en bas du compte de résultat. » Cette phrase-là vaut plus que les trois branches réunies.",
  "⚠️ Écris ta structure au propre sur une feuille séparée et retourne-la vers l'examinateur quand tu la présentes. Beaucoup de candidats gardent leurs notes pour eux et récitent — on perd le bénéfice du visuel, qui est précisément ce qui rend une structure convaincante."
 ],
 cles:["L'arbre arithmétique garantit d'être MECE : chaque euro est forcément dans une branche.",
  "Les cadres appris sont des listes de contrôle, pas des plans d'attaque.",
  "Une structure plate est une liste. Dis par quoi tu commences et pourquoi — c'est la phrase qui compte."]},

{id:"b5", ic:"🧮", titre:"Le quantitatif : parler pendant qu'on calcule", sujet:"La méthode compte plus que le résultat",
 contenu:[
  "Le moment du calcul est celui où les candidats se taisent. C'est exactement l'inverse de ce qu'il faut faire : un examinateur qui te regarde écrire en silence pendant quatre-vingt-dix secondes ne peut rien noter.",
  "<b>La séquence qui marche</b>, à chaque calcul : ① annoncer ce qu'on va calculer et pourquoi (« je vais chercher la marge unitaire avant et après, pour voir combien la remise coûte ») ; ② annoncer la méthode (« CA divisé par volume me donne le prix moyen ») ; ③ calculer en disant les étapes à voix haute ; ④ annoncer le résultat <b>avec son unité et son ordre de grandeur</b> ; ⑤ dire ce qu'il signifie, immédiatement.",
  "Ce cinquième point est le plus souvent oublié, et c'est celui qui compte. « 19,7 millions » ne vaut rien. « 19,7 millions, contre 28 il y a deux ans : la marge a perdu 30 % pendant que le chiffre d'affaires montait — c'est là qu'est le problème » vaut le cas entier.",
  "<b>Demande les données une par une</b>, et seulement celles dont tu as besoin pour l'étape en cours. Demander « pouvez-vous me donner toutes les données ? » est mal vu : on veut voir que tu sais ce que tu cherches.",
  "<b>Arrondis, et dis que tu arrondis.</b> « 2 400 × 350 000, disons 2,4 fois 3,5, ça fait 8,4, avec huit zéros : 840 millions. » Personne ne demande la précision au centime. En revanche l'ordre de grandeur, lui, ne se rate pas — se tromper d'un facteur dix est la faute la plus visible qui existe.",
  "<b>Et vérifie.</b> Avant d'annoncer, pose-toi une seconde : est-ce que ce chiffre est plausible ? Un point de vente qui servirait 3 000 cafés par jour, une part de marché de 60 % pour un entrant — ces résultats-là se détectent sans recalculer. Dire « ce chiffre me paraît élevé, laissez-moi vérifier » est un point gagné, jamais un aveu de faiblesse.",
  "⚠️ Si tu te trompes et que tu t'en aperçois : dis-le, corrige, continue. Ne recommence pas tout, ne t'excuse pas trois fois. Les examinateurs cherchent précisément cette réaction-là — c'est ce qu'ils verront en mission."
 ],
 cles:["Annoncer ce qu'on calcule, la méthode, le résultat avec son unité, PUIS ce qu'il signifie.",
  "Le silence pendant le calcul est la faute la plus fréquente et la plus coûteuse.",
  "« Ce chiffre me paraît élevé, laissez-moi vérifier » est un point gagné."]},

{id:"b6", ic:"📊", titre:"Lire un graphique en trente secondes", sujet:"L'exhibit, et les pièges qu'il contient toujours",
 contenu:[
  "Dans un entretien mené par l'examinateur, on te tend souvent un graphique ou un tableau en te demandant simplement : « qu'en concluez-vous ? ». La tentation est de commenter ce qu'on voit. C'est une erreur : on attend une <b>lecture structurée</b>, pas une description.",
  "<b>L'ordre à suivre, toujours le même :</b> ① le titre et ce qu'on mesure ; ② les <b>axes et les unités</b> — en pourcentage ou en valeur absolue ? ; ③ la période et l'échelle ; ④ seulement ensuite, ce que ça dit ; ⑤ et enfin : <b>qu'est-ce que ça change pour le problème du client ?</b>",
  "Prends trente secondes de silence assumé pour le lire avant de parler. Dire « laissez-moi trente secondes pour le regarder » est parfaitement accepté et bien mieux vu qu'un commentaire précipité.",
  "<b>Les pièges classiques</b>, qui sont dans presque tous les exhibits : une <b>échelle qui ne part pas de zéro</b> (une variation minuscule paraît spectaculaire) · une <b>somme de parts</b> qu'on lit comme une croissance · un <b>axe en pourcentage</b> qui masque une base qui s'effondre (gagner des parts d'un marché qui se réduit n'est pas gagner) · des <b>moyennes</b> qui cachent une concentration · une <b>période choisie</b> pour commencer juste après un creux.",
  "<b>Le réflexe qui impressionne</b> : chercher ce qui <i>n'est pas</i> sur le graphique. « Ces parts de marché sont en volume ; en valeur, la conclusion pourrait s'inverser si nos prix sont plus élevés. » Un examinateur note cette phrase-là très haut, parce qu'elle montre qu'on ne se laisse pas conduire par les données qu'on te donne.",
  "Puis termine toujours par une phrase qui relie au problème : « donc la baisse vient bien du segment B, et c'est là qu'il faut creuser ». Un exhibit commenté sans conclusion ne rapporte rien."
 ],
 cles:["Titre, axes, unités, échelle — AVANT de commenter le contenu.",
  "Demande trente secondes pour le lire. C'est bien vu.",
  "Cherche ce qui n'est PAS sur le graphique : volume contre valeur, moyenne contre concentration."]},

{id:"b7", ic:"🎤", titre:"La synthèse finale", sujet:"Trente secondes qui laissent la dernière impression",
 contenu:[
  "La fin d'un cas arrive souvent par surprise : « votre client entre dans l'ascenseur, vous avez trente secondes ». C'est la partie la plus scénarisée de l'entretien, donc la plus facile à préparer — et pourtant celle que la plupart des candidats improvisent.",
  "<b>La structure, dans cet ordre, sans exception :</b> ① la <b>recommandation d'abord</b>, en une phrase, à l'impératif (« Ne vous alignez pas sur le prix du concurrent ») ; ② <b>deux ou trois raisons chiffrées</b> (« il vous faudrait 50 % de volume en plus, votre élasticité n'en donne que 21, et il n'a que huit mois de trésorerie ») ; ③ le <b>risque principal</b> et comment le surveiller ; ④ le <b>prochain pas</b>, concret et daté.",
  "<b>C'est du top-down.</b> On ne raconte pas le chemin parcouru, on donne la conclusion et on la soutient. Commencer par « alors, j'ai d'abord regardé les coûts, puis… » est la faute la plus courante : c'est ainsi qu'on pense, ce n'est pas ainsi qu'on rend compte.",
  "<b>Assume une conséquence désagréable.</b> Une recommandation qui ne coûte rien à personne n'est pas une recommandation. « Remonter les prix, en acceptant de perdre les 15 % de clients les plus sensibles » est une réponse. « Améliorer la performance commerciale » n'en est pas une.",
  "<b>Nomme ce que tu n'as pas pu vérifier.</b> « Je n'ai pas eu la structure de coûts du concurrent ; si elle est très différente, ma conclusion change. » Ce n'est pas un aveu de faiblesse, c'est la marque d'un consultant : on sait ce qu'on ne sait pas, et on le dit avant que le client le découvre.",
  "⚠️ Entraîne-toi à la dire debout, à voix haute, en trente secondes chrono. C'est la seule partie du cas qui se récite — et celle qui reste en mémoire quand l'examinateur remplit sa grille."
 ],
 cles:["Recommandation d'abord, puis deux ou trois raisons chiffrées, le risque, le prochain pas.",
  "Top-down : on donne la conclusion, on ne raconte pas le chemin.",
  "Nomme ce que tu n'as pas pu vérifier. C'est la marque d'un consultant, pas une faiblesse."]},

{id:"b8", ic:"🚫", titre:"Les fautes qui éliminent", sujet:"Celles qu'on ne rattrape pas dans le même entretien",
 contenu:[
  "Il y a les maladresses — on en fait tous — et il y a une petite liste de comportements qui ferment la porte, quel que soit le reste de la performance. Les connaître est le moyen le moins cher de progresser.",
  "<b>① Se lancer dans les chiffres sans structure.</b> Le candidat qui, dès l'énoncé, demande « quel est le chiffre d'affaires ? » a déjà perdu des points. On ne cherche pas avant de savoir quoi chercher.",
  "<b>② Réciter un cadre.</b> « Je vais utiliser les 4P » en ouverture d'un cas de rentabilité signale qu'on applique une recette sans regarder le plat.",
  "<b>③ Le silence.</b> Trente secondes annoncées sont un temps de réflexion. Quatre-vingt-dix secondes non annoncées sont un trou noir : l'examinateur n'a rien à noter, et il note ce qu'il voit.",
  "<b>④ S'entêter après une objection.</b> L'examinateur va contester un point, souvent un point juste. Défendre trois fois la même position sans nouvel argument est éliminatoire ; changer d'avis immédiatement sans réfléchir l'est presque autant. La bonne réponse : « c'est un bon point, laissez-moi y réfléchir dix secondes ». Puis soit tu intègres, soit tu expliques pourquoi tu maintiens.",
  "<b>⑤ Inventer des chiffres.</b> Poser une hypothèse à voix haute est attendu. L'annoncer comme un fait ne l'est pas. On dit « je vais supposer 250 jours ouvrés », jamais « il y a 250 jours ouvrés » sur un chiffre qu'on ne connaît pas.",
  "<b>⑥ Conclure sans conclure.</b> « Il faudrait plus de données » est la réponse qu'on te demande justement de ne pas donner. On tranche avec ce qu'on a, et on dit ce qui pourrait faire changer d'avis.",
  "<b>⑦ Ne pas écouter.</b> L'examinateur glisse souvent une information décisive au milieu d'une phrase anodine. Un candidat qui déroule son plan sans réagir à ce qu'on vient de lui dire échoue au test le plus simple de tous.",
  "⚠️ Et une faute plus discrète, propre aux candidats préparés : <b>l'excès de vocabulaire</b>. Dire « synergies de revenus » ou « leviers opérationnels » sans savoir chiffrer ce qu'il y a derrière se remarque en une question. Le jargon impressionne les candidats, pas les examinateurs."
 ],
 cles:["Chercher avant de savoir quoi chercher est la faute d'ouverture la plus commune.",
  "Face à une objection : « bon point, laissez-moi dix secondes ». Puis intégrer ou expliquer.",
  "« Il faudrait plus de données » est exactement la réponse qu'on te demande de ne pas donner."]},

{id:"b9", ic:"🗣️", titre:"L'autre moitié : le parcours", sujet:"Le fit, le PEI, et pourquoi il se prépare autant que le cas",
 contenu:[
  "Beaucoup de candidats travaillent cinquante cas et improvisent la partie « parlez-moi de vous ». C'est une erreur d'allocation : chez plusieurs grands cabinets, cette partie occupe la moitié de l'entretien, et elle élimine autant.",
  "Chez McKinsey, elle porte un nom — le <b>Personal Experience Interview</b> — et une mécanique : on te demande une <b>situation vécue</b> sur un thème (leadership, impact malgré la résistance, dépassement personnel), puis on creuse pendant dix à quinze minutes. Ce n'est pas un échauffement : c'est un entretien à part entière, noté séparément.",
  "<b>Ce qu'on cherche</b> n'est pas l'exploit. C'est : ton rôle exact (pas celui de l'équipe), la difficulté réelle, ce que TU as fait et décidé, la tension avec d'autres personnes, et ce que tu en as tiré. Une histoire où tout s'est bien passé ne vaut rien — c'est la friction qui intéresse.",
  "<b>Le format à préparer</b> : situation, complication, ton action, le résultat, ce que tu en retiens. Deux à trois histoires solides suffisent si elles sont assez riches pour résister à quinze minutes de questions. Prépare-les <b>en profondeur</b> plutôt qu'en nombre : on te demandera « et qu'aurais-tu fait différemment ? », « comment as-tu su que c'était la bonne décision ? », « qu'a dit l'autre personne ? ».",
  "⚠️ La faute la plus fréquente est le <b>« nous »</b>. « Nous avons organisé, nous avons décidé » ne permet à personne d'évaluer ce que tu as fait. On veut du « j'ai », même si le travail était collectif — et surtout dans ce cas-là.",
  "Et l'histoire doit être vraie. Pas par morale : parce que quinze minutes de questions précises démontent une histoire fabriquée, et qu'un doute sur ce point-là ne se rattrape jamais."
 ],
 cles:["Cette partie pèse souvent autant que le cas et se prépare autant.",
  "Deux ou trois histoires en PROFONDEUR valent mieux que dix en surface.",
  "Dire « nous » au lieu de « j'ai » est la faute la plus fréquente — et la plus coûteuse."]},

{id:"b10", ic:"❓", titre:"Les questions que tu poses à la fin", sujet:"Cinq minutes qui comptent plus qu'on ne croit",
 contenu:[
  "« Avez-vous des questions ? » n'est pas une formule de politesse. C'est le moment où l'examinateur voit si tu as réfléchi au métier ou seulement à l'entretien — et souvent le seul moment où tu peux apprendre quelque chose d'utile pour décider si tu veux y aller.",
  "<b>Ce qui marche</b> : des questions sur SON expérience, précises et impossibles à trouver en ligne. « Quelle mission vous a le plus fait douter, et comment ça s'est terminé ? » · « Qu'est-ce qui vous a surpris dans le métier après six mois ? » · « Comment se passe le moment où l'on doit dire à un client quelque chose qu'il n'a pas envie d'entendre ? »",
  "<b>Ce qui ne marche pas</b> : ce qui est sur le site (« quelles sont vos valeurs ? »), ce qui trahit l'anxiété (« quand aurai-je une réponse ? » — ça se demande au RH, pas à l'examinateur), et les questions qui n'en sont pas (« j'ai lu que vous aviez ouvert un bureau à Singapour, pouvez-vous m'en parler ? »).",
  "<b>Une seule question suffit si elle est bonne.</b> Mieux vaut une question précise, écoutée, avec une relance sincère, que trois questions enchaînées mécaniquement.",
  "⚠️ Et un point qui vaut au-delà de l'entretien : tu es aussi là pour <b>évaluer</b>. Le rythme, la façon dont on parle des clients, ce que l'examinateur dit quand on lui demande ce qui lui a été difficile — ce sont les vraies informations. Un entretien où tu n'as rien appris sur le métier est un entretien à moitié raté, même s'il est réussi."
 ],
 cles:["Des questions sur SON expérience, précises, impossibles à trouver en ligne.",
  "Une bonne question écoutée vaut mieux que trois enchaînées.",
  "Tu es aussi là pour évaluer. C'est la partie que les candidats oublient."]}

];
