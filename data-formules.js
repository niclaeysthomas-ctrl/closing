// LE CLOSING — LE FORMULAIRE
// Ajouté le 2026-09-20. « mets les formules quelque part, je ne les connais pas ».
// Son débriefing de la partie 1 l'a montré : sur 4 décisions coûteuses, un calcul
// de dix secondes donnait la réponse — il n'a fait aucun des quatre. Pas par
// paresse : il ne connaissait pas les formules.
//
// Chaque fiche est CALCULABLE : des champs, un résultat en direct, et une
// LECTURE du résultat. Une formule qu'on ne sait pas lire ne sert à rien.
// pre(B) pré-remplit avec les chiffres de SA boîte quand c'est possible.

const FORMULES = [

/* ═══════════ CASH & BFR ═══════════ */
{id:"escompte", cat:"Cash & BFR", ic:"💸", t:"L'escompte implicite",
 q:"On t'offre une remise si tu paies plus tôt. Ça vaut combien, en taux annuel ?",
 f:"taux = [ r ÷ (100 − r) ] × (365 ÷ jours gagnés)",
 champs:[{k:"r", lab:"remise (%)", v:2, pas:.5},{k:"j", lab:"jours gagnés", v:30, pas:5}],
 calc:x => x.r>=100||x.j<=0 ? null : (x.r/(100-x.r))*(365/x.j)*100,
 unite:"%/an",
 lire:v => v==null ? "—" : v>=30
   ? `<b style="color:var(--ok)">${Math.round(v)} %/an : énorme.</b> Tu prends, même en tirant sur ton découvert à 12 %.`
   : v>=15 ? `<b style="color:var(--ok)">${Math.round(v)} %/an :</b> au-dessus de tout financement que tu trouveras. Tu prends si tu as le cash.`
   : `<b style="color:var(--bad)">${Math.round(v)} %/an :</b> sous ton coût de financement. Garde ton délai.`,
 note:"Marche dans les deux sens. Si TU es le client, c'est ton <b>rendement</b> : compare-le à ce que te coûte l'argent. Si tu OFFRES la remise à ton client, c'est ton <b>coût</b> — et un « petit » 2 % à 30 jours te coûte près de 25 % par an.",
 piege:"Le piège est de regarder la remise (« 2 %, c'est rien ») au lieu du taux annualisé. 2 % pour 30 jours, ce n'est pas 2 % : c'est 24,8 % par an."},

{id:"bfr", cat:"Cash & BFR", ic:"🔒", t:"Le BFR, et en jours de CA",
 q:"Combien d'argent ta machine immobilise en permanence ?",
 f:"BFR = stock + créances clients − dettes fournisseurs\njours de CA = BFR ÷ CA mensuel × 30",
 champs:[{k:"st", lab:"stock (€)", v:2000},{k:"cr", lab:"créances (€)", v:20000},{k:"df", lab:"dettes fourn. (€)", v:7000},{k:"ca", lab:"CA mensuel (€)", v:30000}],
 calc:x => x.ca<=0 ? null : ((x.st+x.cr-x.df)/x.ca)*30,
 unite:"jours de CA",
 lire:v => v==null ? "—" : v<=0
   ? `<b style="color:var(--ok)">BFR négatif :</b> tes fournisseurs financent ton cycle. C'est le modèle de la grande distribution.`
   : `<b>${Math.round(v)} jours</b> de chiffre d'affaires immobilisés en permanence. Chaque fois que ton CA monte de 10 %, ce montant monte de 10 % aussi — et il faut le financer.`,
 note:"Le BFR n'est pas une dépense, c'est de l'argent <b>piégé</b> dans la machine. Il revient quand l'activité s'arrête — c'est-à-dire trop tard.",
 piege:"Croire qu'un BFR se finance par un découvert. Un besoin permanent se finance par une ressource permanente."},

{id:"dso", cat:"Cash & BFR", ic:"⏳", t:"DSO et DPO",
 q:"Combien de jours tu finances tes clients, et combien tes fournisseurs te financent ?",
 f:"DSO = créances ÷ CA mensuel × 30\nDPO = dettes fourn. ÷ achats mensuels × 30",
 champs:[{k:"cr", lab:"créances (€)", v:20000},{k:"ca", lab:"CA À CRÉDIT (€/mois)", v:13500},{k:"df", lab:"dettes fourn. (€)", v:7000},{k:"ach", lab:"achats mensuels (€)", v:12000}],
 calc:x => (x.ca<=0||x.ach<=0) ? null : (x.cr/x.ca*30)-(x.df/x.ach*30),
 unite:"jours d'écart",
 lire:(v,x) => v==null ? "—" : (()=>{const dso=Math.round(x.cr/x.ca*30), dpo=Math.round(x.df/x.ach*30);
   return `DSO <b>${dso} j</b> · DPO <b>${dpo} j</b> → ${v>0
     ? `<b style="color:var(--bad)">tu finances ${Math.round(v)} jours</b> sur ton propre argent.`
     : `<b style="color:var(--ok)">on te finance ${Math.round(-v)} jours.</b>`}`;})(),
 note:"C'est le levier le moins cher qui existe : gagner 15 jours de DPO ou en perdre 15 de DSO libère du cash <b>sans intérêts, sans dilution, sans ralentir</b>.<br><b>⚠️ Au dénominateur, mets le CA À CRÉDIT, pas le CA total.</b> Si tu vends 55 % en direct payé comptant et 45 % à des pros, seuls ces 45 % créent des créances — diviser par le CA total divise ton DSO par deux et te rassure à tort.",
 piege:"Négocier un escompte fournisseur en sacrifiant tout son crédit fournisseur. On gagne une remise et on perd du BFR — il faut comparer les deux."},

/* ═══════════ EXPLOITATION ═══════════ */
{id:"pointmort", cat:"Exploitation", ic:"⚖️", t:"Le point mort",
 q:"Combien tu dois vendre juste pour ne rien perdre ?",
 f:"marge unitaire = prix − coût variable unitaire\npoint mort = charges fixes ÷ marge unitaire",
 champs:[{k:"p", lab:"prix de vente (€)", v:16, pas:.5},{k:"cv", lab:"coût variable unit. (€)", v:5.41, pas:.1},{k:"cf", lab:"charges fixes (€/mois)", v:11243}],
 calc:x => (x.p-x.cv)<=0 ? null : x.cf/(x.p-x.cv),
 unite:"unités/mois",
 lire:(v,x) => v==null ? `<b style="color:var(--bad)">Marge unitaire négative :</b> tu perds de l'argent à chaque vente.` :
   `<b>${Math.round(v)} unités/mois</b> pour exister. Marge unitaire : <b>${(x.p-x.cv).toFixed(2)} €</b>. Au-delà, chaque unité rapporte ces ${(x.p-x.cv).toFixed(2)} € en entier.`,
 note:"Au-dessus du point mort, la marge unitaire tombe <b>intégralement</b> en résultat : les charges fixes sont déjà payées. C'est pour ça que les dernières ventes du mois valent bien plus que les premières.",
 piege:"Utiliser la marge NETTE au dénominateur. C'est la marge sur coûts VARIABLES qu'il faut — les charges fixes sont au numérateur, on ne les compte pas deux fois."},

{id:"salarie", cat:"Exploitation", ic:"🧑‍🏭", t:"Ce que coûte vraiment un salarié",
 q:"Un salaire net de X €, ça coûte combien — et il faut vendre combien pour le payer ?",
 f:"coût employeur ≈ net × 1,75\nvolume nécessaire = coût employeur ÷ marge unitaire",
 champs:[{k:"net", lab:"salaire net (€/mois)", v:1900},{k:"mu", lab:"marge unitaire (€)", v:10.59, pas:.1}],
 calc:x => x.mu<=0 ? null : (x.net*1.75)/x.mu,
 unite:"unités/mois",
 lire:(v,x) => v==null ? "—" :
   `Coût employeur : <b>${Math.round(x.net*1.75).toLocaleString("fr-FR")} €/mois</b>. Il faut vendre <b>${Math.ceil(v)} unités de plus chaque mois</b> juste pour que ce poste ne coûte rien. Pas pour rapporter : pour être à zéro.`,
 note:"Compare toujours ce volume à ta production actuelle. S'il représente 40 % de ce que tu vends aujourd'hui, tu viens de parier ta boîte sur une hypothèse de croissance.",
 piege:"Raisonner sur le net. Le ×1,75 n'est pas un détail : il te fait passer de 1 900 à 3 325 €, et c'est ce qui tue le plus de petites boîtes en croissance."},

{id:"commande", cat:"Exploitation", ic:"📮", t:"Accepter une commande à prix cassé ?",
 q:"Un client veut un prix bien plus bas. À partir de quand ça vaut le coup ?",
 f:"marge sur coûts variables = prix proposé − coût variable unitaire",
 champs:[{k:"pp", lab:"prix proposé (€)", v:9, pas:.5},{k:"cv", lab:"coût variable unit. (€)", v:5.41, pas:.1},{k:"qte", lab:"quantité", v:500}],
 calc:x => (x.pp-x.cv)*x.qte,
 unite:"€ de contribution",
 lire:(v,x) => (x.pp-x.cv)<=0
   ? `<b style="color:var(--bad)">Tu perds ${Math.abs(Math.round((x.pp-x.cv)*x.qte)).toLocaleString("fr-FR")} €.</b> En dessous du coût variable, refuse toujours.`
   : `<b style="color:var(--ok)">+${Math.round(v).toLocaleString("fr-FR")} €</b> de contribution aux charges fixes — <b>à deux conditions</b> : que tu aies la capacité libre, et que ça ne cannibalise pas tes ventes à plein tarif.`,
 note:"Tes charges fixes sont déjà payées par ton activité normale. Une commande supplémentaire n'a donc à couvrir que ses coûts VARIABLES pour être bénéfique.",
 piege:"Oublier les deux conditions. Si tu produis à la limite, cette commande en remplace une à plein tarif — et là tu perds la différence. Et si ton client habituel découvre le prix, tu as créé ton nouveau tarif."},

/* ═══════════ PRIX ═══════════ */
{id:"elast", cat:"Prix", ic:"📈", t:"L'élasticité-prix",
 q:"Si je monte mes prix de X %, je perds combien de volume — et je gagne ou je perds ?",
 f:"élasticité = (variation du volume en %) ÷ (variation du prix en %)",
 champs:[{k:"dp", lab:"hausse de prix (%)", v:8, pas:1},{k:"e", lab:"élasticité (négative)", v:-0.86, pas:.1}],
 calc:x => ((1+x.dp/100)*(1+x.e*x.dp/100)-1)*100,
 unite:"% de CA",
 lire:(v,x) => `Volume : <b>${(x.e*x.dp).toFixed(1)} %</b> · Chiffre d'affaires : <b style="color:${v>=0?"var(--ok)":"var(--bad)"}">${v>=0?"+":""}${v.toFixed(1)} %</b>.<br>${Math.abs(x.e)<1
   ? `Tu es en zone <b>INÉLASTIQUE</b> (|e| &lt; 1) : monter le prix augmente le CA <b>et</b> la marge. Ce n'est pas un pari, c'est de l'arithmétique.`
   : `Tu es en zone <b>ÉLASTIQUE</b> (|e| &gt; 1) : monter le prix fait baisser le CA. Mais attention — la marge, elle, peut quand même monter (voir la fiche suivante).`}`,
 note:"L'élasticité n'est pas une propriété du produit : c'est une propriété du <b>point de prix</b>. Le même sachet est inélastique à 12 € et élastique à 16 €.",
 piege:"Confondre chiffre d'affaires et marge. Le CA est maximal quand |e| = 1 ; la marge, elle, est maximale à un prix PLUS ÉLEVÉ — donc en zone élastique. Être élastique n'est pas une faute."},

{id:"prixopt", cat:"Prix", ic:"🎯", t:"Le prix qui maximise la marge",
 q:"Quel est le meilleur prix possible, mathématiquement ?",
 f:"P* = (prix plafond + coût variable) ÷ 2\n(demande linéaire, coût variable constant)",
 champs:[{k:"pc", lab:"prix plafond — où la demande tombe à 0 (€)", v:26, pas:1},{k:"cv", lab:"coût variable unit. (€)", v:5.41, pas:.1},{k:"p", lab:"ton prix actuel (€)", v:16, pas:.5}],
 calc:x => (x.pc+x.cv)/2,
 unite:"€",
 lire:(v,x) => {const ec=(x.p-v)/v*100;
   return `Prix optimal : <b style="color:var(--acc)">${v.toFixed(2)} €</b>. Tu es à <b>${x.p.toFixed(2)} €</b> — ${Math.abs(ec)<5
     ? `<b style="color:var(--ok)">à ${Math.abs(ec).toFixed(0)} % de l'optimum.</b> Ne touche à rien.`
     : ec<0 ? `<b style="color:var(--bad)">${Math.abs(ec).toFixed(0)} % TROP BAS.</b> Tu laisses de la marge sur la table.`
            : `<b style="color:var(--bad)">${ec.toFixed(0)} % trop haut.</b> Tu perds plus de volume que tu ne gagnes de marge.`}`;},
 note:"Le résultat est contre-intuitif : le prix optimal est <b>à mi-chemin</b> entre ton coût et le prix où plus personne n'achète. Il ne dépend pas du tout de ce que fait ton voisin.",
 piege:"Fixer son prix au coût + un pourcentage. Le coût ne dit rien de ce que le client est prêt à payer — il ne donne que le plancher."},

/* ═══════════ DETTE ═══════════ */
{id:"mensualite", cat:"Dette", ic:"🏦", t:"Mensualité et coût d'un prêt",
 q:"J'emprunte X € sur N mois. Je paie combien, et ça me coûte combien en tout ?",
 f:"m = C × t ÷ [ 1 − (1 + t)^(−n) ]   avec t = taux annuel ÷ 12",
 champs:[{k:"c", lab:"capital emprunté (€)", v:30000},{k:"tx", lab:"taux annuel (%)", v:4.5, pas:.1},{k:"n", lab:"durée (mois)", v:48}],
 calc:x => {const t=x.tx/100/12; return t<=0 ? x.c/x.n : x.c*t/(1-Math.pow(1+t,-x.n));},
 unite:"€/mois",
 lire:(v,x) => `<b>${Math.round(v).toLocaleString("fr-FR")} €/mois</b> pendant ${x.n} mois. Total remboursé <b>${Math.round(v*x.n).toLocaleString("fr-FR")} €</b> · coût du crédit <b style="color:var(--acc)">${Math.round(v*x.n-x.c).toLocaleString("fr-FR")} €</b>.`,
 note:"Seuls les <b>intérêts</b> passent au compte de résultat. Le capital remboursé sort de ta trésorerie <b>sans jamais toucher ton résultat</b> — c'est le cœur du malentendu résultat/trésorerie.",
 piege:"Choisir la durée la plus longue parce que la mensualité est plus douce. Plus c'est long, plus le coût total gonfle — et plus longtemps la banque garde ses covenants sur ton dos."},

{id:"decouvert", cat:"Dette", ic:"🔥", t:"Ce que coûte un découvert",
 q:"Je tire X € pendant J jours. Ça me coûte combien ?",
 f:"coût = montant × taux × (jours ÷ 365)",
 champs:[{k:"m", lab:"montant tiré (€)", v:20000},{k:"tx", lab:"taux annuel (%)", v:12, pas:.5},{k:"j", lab:"durée (jours)", v:120}],
 calc:x => x.m*(x.tx/100)*(x.j/365),
 unite:"€",
 lire:(v,x) => `<b style="color:var(--bad)">${Math.round(v).toLocaleString("fr-FR")} €</b> pour ${x.j} jours. Agios et commissions en plus, souvent +2 à 4 points.`,
 note:"Le découvert est le financement le plus cher que tu prendras jamais. Il ne se justifie que pour un trou <b>court et imprévu</b>.",
 piege:"Tirer sur son découvert quand on a de la trésorerie ailleurs. C'est payer 12 % pour de l'argent qu'on possède déjà."},

{id:"gearing", cat:"Dette", ic:"⛓️", t:"Dette nette / EBITDA (le covenant)",
 q:"Est-ce que ma banque va me lâcher ?",
 f:"dette nette = dettes financières − trésorerie\nratio = dette nette ÷ EBITDA 12 mois",
 champs:[{k:"d", lab:"dettes financières (€)", v:250000},{k:"tr", lab:"trésorerie (€)", v:40000},{k:"eb", lab:"EBITDA 12 mois (€)", v:120000}],
 calc:x => x.eb<=0 ? null : (x.d-x.tr)/x.eb,
 unite:"×",
 lire:(v,x) => v==null ? `<b style="color:var(--bad)">EBITDA nul ou négatif :</b> le ratio n'a pas de sens, et aucune banque ne te prêtera.` :
   `<b style="color:${v<2?"var(--ok)":v<3?"var(--acc)":"var(--bad)"}">${v.toFixed(2)}×</b> — ${v<2?"confortable.":v<3?"la zone où les banques commencent à écrire des covenants.":v<4?"limite bancaire usuelle franchie.":"zone rouge."}<br>Refais-le avec un EBITDA amputé de 30 % : <b>${((x.d-x.tr)/(x.eb*.7)).toFixed(2)}×</b>. <b>C'est CE chiffre-là qu'il faut négocier</b>, pas celui du scénario central.`,
 note:"C'est la dette <b>nette</b> : ta trésorerie vient en déduction. Un covenant classique se fixe entre 3,0 et 3,5×.",
 piege:"Tester le ratio au scénario central. Quand l'activité se dégrade, le dénominateur baisse et le numérateur ne bouge pas : le ratio explose bien plus vite que ton activité."},

{id:"dscr", cat:"Dette", ic:"🏗️", t:"Le cash vraiment disponible (DSCR)",
 q:"Combien de dette ce dossier peut-il réellement porter ?",
 f:"cash dispo = EBITDA − CAPEX de maintien − ΔBFR − impôt\nDSCR = cash dispo ÷ service annuel de la dette",
 champs:[{k:"eb", lab:"EBITDA (€/an)", v:2000000},{k:"cap", lab:"CAPEX de maintien (€/an)", v:350000},{k:"bfr", lab:"ΔBFR (€/an)", v:120000},{k:"is", lab:"taux d'impôt (%)", v:25, pas:5},{k:"srv", lab:"service de la dette (€/an)", v:1140000}],
 calc:x => {const cash=(x.eb-x.cap-x.bfr)*(1-x.is/100); return x.srv<=0?null:cash/x.srv;},
 unite:"× (DSCR)",
 lire:(v,x) => {const cash=(x.eb-x.cap-x.bfr)*(1-x.is/100);
   return v==null ? "—" : `Cash disponible : <b>${Math.round(cash).toLocaleString("fr-FR")} €</b> — et non ${Math.round(x.eb).toLocaleString("fr-FR")} €.<br>DSCR <b style="color:${v>=1.3?"var(--ok)":v>=1.1?"var(--acc)":"var(--bad)"}">${v.toFixed(2)}×</b> — ${v<1?"tu ne rembourses pas.":v<1.2?"aucune marge d'erreur.":v<1.5?"tenable.":"confortable."}`;},
 note:"<b>L'EBITDA ne rembourse pas la dette : le cash libre la rembourse.</b> C'est la première chose qu'on apprend en LBO et la dernière qu'on applique.",
 piege:"Raisonner sur l'EBITDA. Ici il surestime la capacité de remboursement de près de moitié."},

/* ═══════════ VALORISATION ═══════════ */
{id:"multiple", cat:"Valorisation", ic:"🔍", t:"Du multiple au prix des titres",
 q:"On me dit « 6 fois l'EBITDA ». Je paie combien, exactement ?",
 f:"valeur d'entreprise = multiple × EBITDA\nprix des titres = VE − dette nette",
 champs:[{k:"mult", lab:"multiple", v:6, pas:.5},{k:"eb", lab:"EBITDA (€)", v:300000},{k:"d", lab:"dette de la cible (€)", v:420000},{k:"tr", lab:"trésorerie de la cible (€)", v:60000}],
 calc:x => x.mult*x.eb-(x.d-x.tr),
 unite:"€ pour les titres",
 lire:(v,x) => `Valeur d'entreprise <b>${Math.round(x.mult*x.eb).toLocaleString("fr-FR")} €</b> − dette nette <b>${Math.round(x.d-x.tr).toLocaleString("fr-FR")} €</b> = <b style="color:var(--acc)">${Math.round(v).toLocaleString("fr-FR")} €</b> pour les actions.<br>Si le vendeur demande la VE comme prix, il te fait payer sa dette : <b>${Math.round(x.d-x.tr).toLocaleString("fr-FR")} € de trop</b>.`,
 note:"Un multiple d'EBITDA donne une <b>valeur d'entreprise</b> : la valeur de l'outil, quel que soit son financement. Le prix des actions, c'est VE moins la dette nette.",
 piege:"LE piège classique, et il coûte cher. Le vendeur annonce « 1,8 million » en te laissant croire que c'est son prix, alors que c'est sa VE. Recalcule toujours le multiple IMPLICITE du prix demandé."},

{id:"tri", cat:"Valorisation", ic:"🚪", t:"Multiple et TRI",
 q:"Je double ma mise en 3 ans ou je la triple en 6 : lequel vaut mieux ?",
 f:"multiple = valeur de sortie ÷ capital investi\nTRI ≈ multiple^(1 ÷ années) − 1",
 champs:[{k:"inv", lab:"capital investi (€)", v:4000000},{k:"out", lab:"valeur de sortie (€)", v:17950000},{k:"an", lab:"années", v:3, pas:1}],
 calc:x => (x.inv<=0||x.an<=0) ? null : (Math.pow(x.out/x.inv,1/x.an)-1)*100,
 unite:"%/an (TRI)",
 lire:(v,x) => v==null ? "—" : `Multiple <b>${(x.out/x.inv).toFixed(2)}×</b> en ${x.an} ans → TRI <b style="color:var(--acc)">${Math.round(v)} %/an</b>.`,
 note:"Le multiple dit <b>combien</b> tu as gagné, le TRI dit <b>à quelle vitesse</b>. Un fonds est jugé sur les deux — et l'argent qui rentre tôt peut être réinvesti.",
 piege:"Choisir le scénario au plus gros multiple. Le scénario qui rapporte le plus d'argent est souvent celui qui rapporte le moins par an — et il ajoute deux ans de risque de marché."}

];
const FORM_CATS = ["Cash & BFR","Exploitation","Prix","Dette","Valorisation"];
