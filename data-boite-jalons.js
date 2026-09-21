// LE CLOSING — LA BOÎTE : LES JALONS.
// Ajoutés le 2026-09-21, sur « continue d'améliorer le côté gamifié niveau 2 ».
//
// Le constat : une partie de niveau 2 dure 48 tours et la note n'arrivait
// qu'au dernier. Aucun objectif intermédiaire, aucune trace de ce qu'on
// avait réussi, rien à battre. Les jalons sont la boucle courte qui
// manquait — et ils sont écrits POUR LE MARCHÉ VIVANT : la plupart ne
// peuvent se décrocher qu'en traversant un régime, un choc ou un
// covenant. Ils transforment la turbulence en quelque chose à battre.
//
// Champs : {id, ic, nom, quoi (ce qu'il faut faire), lvl (niveau minimum),
//           xp, ok(B) -> booléen}
// Les compteurs viennent de B.jx, tenu à jour par jxTurn() dans le moteur.
// Un jalon décroché ne se reperd jamais.

const JALONS = [

/* ---- pilotage du marché (le coeur du niveau 2) ---- */
{id:"crise", ic:"🌊", nom:"Traverser une crise", lvl:2, xp:40,
 quoi:"Vivre un régime de crise du début à la fin sans jamais passer à découvert.",
 ok:B=>(B.jx.crisesTenues||0)>=1},

{id:"lireMarche", ic:"📈", nom:"Lire le marché", lvl:2, xp:35,
 quoi:"Ajuster ton prix dans les deux mois qui suivent un changement de régime — trois fois.",
 ok:B=>(B.jx.reprixRapides||0)>=3},

{id:"chocEncaisse", ic:"🛡️", nom:"Encaisser le choc", lvl:2, xp:40,
 quoi:"Subir un coup dur et retrouver ta trésorerie d'avant en six mois ou moins.",
 ok:B=>(B.jx.chocsEncaisses||0)>=1},

{id:"hausseAuBonMoment", ic:"🎯", nom:"Le bon moment", lvl:2, xp:30,
 quoi:"Monter ton prix pendant une expansion — quand les clients regardent le moins l'étiquette.",
 ok:B=>!!B.jx.hausseEnBoom},

{id:"elastique", ic:"⚖️", nom:"Trouver la bascule", lvl:2, xp:30,
 quoi:"Tenir ton prix à moins de 8 % du prix optimal pendant six mois d'affilée.",
 ok:B=>(B.jx.moisBienPrice||0)>=6},

/* ---- solidité financière ---- */
{id:"sixMois", ic:"🏦", nom:"Six mois d'avance", lvl:1, xp:35,
 quoi:"Atteindre une trésorerie égale à six mois de charges fixes.",
 ok:B=>(B.jx.maxMoisCash||0)>=6},

{id:"jamaisDecouvert", ic:"✨", nom:"Jamais dans le rouge", lvl:1, xp:45,
 quoi:"Terminer la partie sans avoir été à découvert un seul mois.",
 ok:B=>B.finished && !B.jx.aEteDecouvert},

{id:"covenant", ic:"⛓️", nom:"Sous le covenant", lvl:2, xp:40,
 quoi:"Avoir de la dette et tenir un ratio dette nette / EBITDA sous 2,5 pendant six mois d'affilée.",
 ok:B=>(B.jx.moisCovenantOK||0)>=6},

{id:"marge", ic:"💎", nom:"La marge tenue", lvl:2, xp:45,
 quoi:"Douze mois consécutifs avec plus de 10 % de marge nette.",
 ok:B=>(B.jx.moisMarge10||0)>=12},

{id:"cashPositif", ic:"🌱", nom:"L'exploitation paie", lvl:2, xp:35,
 quoi:"Douze mois consécutifs où ta trésorerie progresse hors emprunt.",
 ok:B=>(B.jx.moisCashOk||0)>=12},

/* ---- maîtrise comptable (les cas « build ») ---- */
{id:"comptable", ic:"🧾", nom:"Comptable", lvl:2, xp:35,
 quoi:"Construire un état sans la moindre faute.",
 ok:B=>!!B.jx.etatParfait},

{id:"lesTrois", ic:"📚", nom:"Les trois états", lvl:2, xp:60,
 quoi:"Construire le compte de résultat, le tableau de flux ET le bilan, chacun sans faute.",
 ok:B=>(B.jx.etatsParfaits||0)>=3},

/* ---- qualité des décisions ---- */
{id:"serie3", ic:"🔥", nom:"Trois de suite", lvl:1, xp:25,
 quoi:"Enchaîner trois décisions notées au maximum.",
 ok:B=>(B.jx.maxSerie||0)>=3},

{id:"serie6", ic:"⚡", nom:"Six de suite", lvl:2, xp:55,
 quoi:"Enchaîner six décisions notées au maximum.",
 ok:B=>(B.jx.maxSerie||0)>=6},

{id:"aucuneFaute", ic:"🧠", nom:"Aucune décision ratée", lvl:2, xp:50,
 quoi:"Terminer la partie sans une seule décision notée négativement.",
 ok:B=>B.finished && B.answers.length>=8 && !B.answers.some(a=>a.q!==undefined && a.q<0)},

/* ---- le bout du chemin ---- */
{id:"finir", ic:"🏁", nom:"Aller au bout", lvl:1, xp:50,
 quoi:"Terminer les mois de ta partie sans cessation de paiements.",
 ok:B=>B.finished && B.alive},

{id:"noteA", ic:"👑", nom:"La note A", lvl:2, xp:90,
 quoi:"Finir avec 88 points sur 100 ou plus.",
 ok:B=>B.finished && (B.jx.noteFinale||0)>=88},

{id:"double", ic:"🚀", nom:"Doubler", lvl:2, xp:45,
 quoi:"Faire que ton chiffre d'affaires de la dernière année vaille le double de la première.",
 ok:B=>(B.jx.croissanceMax||1)>=2}

];
