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
