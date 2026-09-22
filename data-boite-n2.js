// LE CLOSING — LA BOÎTE : deck du NIVEAU 2 « Le patron ».
// Ajouté le 2026-09-20. Le niveau était défini (pitch, résumé, 10 notions)
// mais n'avait AUCUN cas : jouer en niveau 2 servait le deck artisan sur
// 48 mois au lieu de 36. Voilà ce qui manquait.
//
// Le saut de niveau 1 à 2 : on ne décide plus sur un chiffre qu'on te donne,
// on décide sur un chiffre que tu dois CONSTRUIRE. D'où des setups qui
// livrent des composants bruts et jamais le ratio final.


/* ============================================================
   LES TROIS CAS « CONSTRUCTION » — ajoutés le 2026-09-21.
   Le niveau 2 promettait noir sur blanc : « tu reçois les
   opérations, tu construis les états, l'app corrige » (aide
   partielle), et ses deux premières notions sont « construire
   soi-même le compte de résultat et le bilan » et « le tableau
   de flux ». Aucun des dix cas ne le faisait : tous servaient
   les composants dans l'énoncé et demandaient de cocher A/B/C/D.
   Ici il n'y a rien à cocher.

   LES TROIS CAS SONT UN SEUL JEU DE COMPTES : même mois, mêmes
   opérations, et le bilan de clôture DOIT tomber. D'où deux
   contraintes qu'il a fallu construire, pas espérer :
   · le bilan d'OUVERTURE est équilibré par construction — les
     réserves sont la variable d'ajustement, jamais un chiffre
     choisi au hasard (sinon l'écart d'ouverture se propage) ;
   · l'acompte client encaissé a une contrepartie partout : il
     est au passif au bilan, et il DIMINUE le BFR au tableau de
     flux. Un montant qui n'apparaît qu'à un endroit déséquilibre
     tout — c'est exactement la faute que le cas apprend à voir.
   Tout est déterministe (aucun Math.random) et arrondi à la
   centaine : son calcul à la main doit tomber sur le corrigé.
   ============================================================ */
/* Les chiffres ne doivent PAS être les mêmes d'une partie à l'autre — la
   première version était volontairement déterministe pour que l'arithmétique
   soit reproductible, mais du coup il retombait sur le même exercice. Le
   tirage est donc semé par B.seed : DIFFÉRENT à chaque nouvelle boîte,
   IDENTIQUE tout au long d'une même partie (indispensable : les trois cas
   partagent le même mois, et rouvrir un cas doit redonner les mêmes cases).
   Le bilan tombe quel que soit le tirage — c'est structurel, pas une
   propriété des ratios : chaque montant a deux jambes et les réserves
   d'ouverture équilibrent. Vérifié sur 400 tirages. */
/* ================================================================
   L'ÉCHELLE — correctif du 2026-09-21.
   Quatre cas du niveau 2 (n2covenant, n2dilution, n2valo, n2earnout)
   appliquaient des montants EN DUR, écrits pour une cible dont
   l'EBITDA vaut 300 000 €. Or sa boîte de niveau 2 fait 14 à 40 k€
   de CA MENSUEL : une dette d'acquisition de 1 140 000 € y représente
   plus de dix ans de chiffre d'affaires. Mesuré sur 25 parties :
   jouer les cas en prenant les MEILLEURES options tuait 14 fois sur
   25, alors qu'ignorer tous les cas ne tuait jamais. Le jeu punissait
   l'engagement — l'exact contraire de ce qu'on veut.
   On garde chaque phrase et chaque ratio (le multiple, la dette nette,
   la prime, la dilution) ; seuls les zéros bougent. sc() met un
   montant de référence à son échelle et l'arrondit proprement. */
function n2f(B){
  const eb=Math.max(18000, (typeof eb12Of==="function"?eb12Of(B):0));
  return Math.max(.035, Math.min(1, eb*1.15/300000));
}
function sc(B,x){
  const v=x*n2f(B);
  const p = Math.abs(v)>=100000?5000 : Math.abs(v)>=10000?1000 : Math.abs(v)>=1000?100 : 10;
  return Math.round(v/p)*p;
}
function n2rnd(B,k){
  let h=((B&&B.seed)||123456789)>>>0;
  for(let i=0;i<k.length;i++) h=Math.imul(h^k.charCodeAt(i),2654435761)>>>0;
  h^=h>>>15; h=Math.imul(h,2246822507)>>>0; h^=h>>>13;
  return (h>>>0)/4294967296;
}
function n2v(B,k,min,max){ return min+(max-min)*n2rnd(B,k); }
function n2ops(B){
  const h=(B.hist&&B.hist.length)?B.hist[B.hist.length-1]:null;
  const c100=x=>Math.round(x/100)*100;
  const ca=Math.max(14000, c100((h&&h.ca)||20000));
  /* Fourchettes volontairement larges : sur 400 tirages la première version
     ne produisait AUCUN mois en perte, donc jamais d'impôt à zéro ni de
     réserves qui baissent. Un mois déficitaire est une leçon à part entière. */
  const achats=c100(ca*n2v(B,"ach",.38,.56)), salaires=c100(ca*n2v(B,"sal",.15,.34)),
        loyer=c100(ca*n2v(B,"loy",.03,.10)), autres=c100(ca*n2v(B,"aut",.02,.08));
  const dot=c100(ca*n2v(B,"dot",.02,.05)), interets=c100(ca*n2v(B,"int",.008,.02));
  const machine=c100(ca*n2v(B,"mac",.55,1.35)), remb=c100(ca*n2v(B,"rem",.03,.08)),
        emprunt=c100(ca*n2v(B,"emp",.30,.95)), acompte=c100(ca*n2v(B,"aco",.07,.20));
  const dcr=c100(ca*n2v(B,"dcr",.12,.30));              /* hausse des créances clients */
  const dbfr=dcr-acompte;              /* BFR net : l'acompte est de l'argent du client chez toi */
  /* compte de résultat — chaque ligne dérive des composantes ARRONDIES */
  const mb=ca-achats;
  const ebitda=mb-salaires-loyer-autres;
  const ebit=ebitda-dot;
  const rcai=ebit-interets;
  const is=c100(Math.max(0,rcai)*.25);
  const rn=rcai-is;
  /* tableau de flux */
  const fluxExpl=rn+dot-dbfr, fluxInv=-machine, fluxFin=emprunt-remb;
  const dcash=fluxExpl+fluxInv+fluxFin;
  /* bilan d'ouverture : les réserves ÉQUILIBRENT, elles ne sont pas choisies */
  const im0=c100(machine*n2v(B,"im0",.2,.9)), st=c100(achats*n2v(B,"st",.8,1.8)), cr=c100(ca*n2v(B,"cr",.6,1.3));
  const treso0=c100(Math.min(ca*1.6, Math.max(ca*.8, (B&&B.cash)||ca*1.1)));
  const cap=c100(ca*n2v(B,"cap",.3,.8)), fo=c100(achats*n2v(B,"fo",1.0,2.0));
  const actif0=im0+st+cr+treso0;
  let dette0=c100(ca*n2v(B,"det",.9,1.8));
  let res0=actif0-cap-fo-dette0;
  /* les réserves ÉQUILIBRENT le bilan d'ouverture : si le tirage les rend
     trop maigres, c'est la dette qu'on rabote, jamais l'équilibre. */
  if(res0<c100(ca*.10)){ const manque=c100(ca*.10)-res0; dette0-=manque; res0+=manque; }
  if(dette0<c100(ca*.20)){ const manque=c100(ca*.20)-dette0; dette0+=manque; res0-=manque; }
  const treso1=treso0+dcash;
  /* bilan de clôture */
  const im1=im0+machine-dot, cr1=cr+dcr, res1=res0+rn, dette1=dette0+emprunt-remb;
  const actif1=im1+st+cr1+treso1;
  const passif1=cap+res1+fo+dette1+acompte;
  return {ca,achats,salaires,loyer,autres,dot,interets,machine,remb,emprunt,acompte,dcr,dbfr,
          mb,ebitda,ebit,rcai,is,rn,fluxExpl,fluxInv,fluxFin,dcash,
          im0,st,cr,treso0,cap,fo,dette0,res0,actif0,
          im1,cr1,res1,dette1,treso1,actif1,passif1};
}
function n2releve(B){
  const o=n2ops(B);
  return `<b>Le relevé du mois</b> — dans le désordre, comme il arrive :
   <br>· ventes facturées aux clients : <b>${eur(o.ca)}</b>
   <br>· achats de marchandises consommées : <b>${eur(o.achats)}</b>
   <br>· salaires et charges : <b>${eur(o.salaires)}</b>
   <br>· loyer : <b>${eur(o.loyer)}</b> · autres frais fixes : <b>${eur(o.autres)}</b>
   <br>· <b>${eur(o.machine)}</b> payés pour une machine livrée ce mois-ci
   <br>· dotation aux amortissements du mois : <b>${eur(o.dot)}</b>
   <br>· <b>${eur(o.emprunt)}</b> débloqués par la banque
   <br>· échéance d'emprunt payée : <b>${eur(o.remb+o.interets)}</b>, dont <b>${eur(o.interets)}</b> d'intérêts
   <br>· <b>${eur(o.acompte)}</b> encaissés d'un client pour une commande à livrer le mois prochain
   <br>· tes créances clients ont augmenté de <b>${eur(o.dcr)}</b> · stock et dettes fournisseurs inchangés
   <br>· impôt sur les sociétés : <b>25 %</b> du résultat avant impôt, arrondi à la centaine`;
}
const BIZCASES_N2 = [

/* ============================================================
   LES TROIS CAS « EN FACE » — ajoutés le 2026-09-21.
   Le niveau 2 n'avait que des QCM et des tableaux à remplir :
   aucune négociation, aucun financement structuré, alors que le
   niveau 1 en a. On y cochait et on y calculait ; on n'y discutait
   jamais. Or les deux sujets du niveau — le covenant et la
   valorisation — se jouent EN FACE DE QUELQU'UN.
   Règle d'écriture des leviers, reprise du niveau 1 : certains
   portent, certains se retournent, et rien ne dit lesquels. Le
   pouvoir ne vient pas de ce qu'on demande, il vient de ce qu'on
   peut faire si l'autre refuse.
   ============================================================ */

{id:"n2negobanque", lvl:2, type:"nego", ch:4, icon:"🏛️", title:"Négocier ton covenant",
 concept:"Négocier une clause · asymétrie d'information · BATNA bancaire", lesson:"a2",
 when:B=>B.level>=2 && B.month>=16 && B.hist.length>=12,
 signal:"Le comité de crédit demande « quelques précisions ». Ce n'est jamais une formalité.",
 setup:B=>{const eb=eb12Of(B), lev=eb>0?((bizDebtOf(B)-Math.max(0,B.cash))/eb):null;
  return `Ta banque accepte de financer ta croissance, mais elle a posé ses conditions : <b>dette nette / EBITDA ≤ 3,0</b>, testé chaque semestre, déchéance du terme au deuxième franchissement.
   <br><br>Tes chiffres aujourd'hui : EBITDA des 12 derniers mois <b>${eur(Math.max(0,eb))}</b> · dette <b>${eur(bizDebtOf(B))}</b> · trésorerie <b>${eur(B.cash)}</b>${lev!==null?` — soit un levier de <b>${lev.toFixed(2).replace(".",",")}×</b>`:''}.
   <br><br>Tu as un rendez-vous pour desserrer la clause. <b>Trois arguments, pas un de plus</b> : au-delà, tu dilues et le comité retient celui qui l'arrange.`;},
 goal:"Desserrer le covenant",
 max:3,
 levers:[
  {k:"a", label:"Tes douze derniers mois de flux d'exploitation, chiffrés", power:3,
   why:"Le seul argument qui parle vraiment à un banquier : il prête contre une capacité de remboursement, pas contre un résultat comptable. Un historique de flux d'exploitation positif est un fait vérifiable qui sert SON dossier auprès de son propre comité."},
  {k:"b", label:"Une offre écrite d'une banque concurrente", power:3,
   why:"Ton BATNA, et il est crédible parce qu'il est écrit. Un chargé d'affaires perd un dossier et une commission ; il a une marge de manœuvre qu'il n'annonce jamais spontanément. C'est le levier le plus puissant, et le seul qui change vraiment le rapport de force."},
  {k:"c", label:"Proposer un test ANNUEL au lieu de semestriel", power:2,
   why:"Tu ne demandes pas un ratio plus haut, tu demandes moins d'occasions de le franchir — et c'est souvent plus facile à accorder, parce que ça ne change pas le niveau de risque affiché dans son dossier. Négocier la MÉCANIQUE plutôt que le chiffre : la manœuvre la plus sous-employée du métier."},
  {k:"d", label:"T'engager toi-même à plafonner tes dividendes", power:2,
   why:"Tu offres une contrainte qui ne te coûte rien aujourd'hui contre un ratio qui te coûterait cher demain. Négociation intégrative : tu échanges ce qui a peu de valeur pour toi contre ce qui en a beaucoup."},
  {k:"e", label:"Accepter la caution personnelle pour obtenir 3,5×", power:-2,
   why:"Tu troques une protection structurelle contre un demi-point de ratio. La caution supprime la responsabilité limitée : le jour où ça tourne mal, tu perds la boîte ET le reste. On ne paie jamais une clause de confort avec son patrimoine personnel."},
  {k:"f", label:"« De toute façon je n'ai pas d'autre solution »", power:-3,
   why:"La phrase la plus chère de la négociation bancaire. Tu viens de lui dire que ton BATNA est nul : à partir de là, il n'a plus aucune raison de bouger, et il resserrera même là où tu n'avais rien demandé. Ne JAMAIS révéler qu'on n'a pas d'alternative."},
  {k:"g", label:"Un prévisionnel optimiste sur trois ans", power:-1,
   why:"Il en reçoit dix par semaine et il les décote tous de moitié. Un prévisionnel sans historique en face ne pèse rien, et un prévisionnel trop beau abîme ta crédibilité sur le reste du dossier — y compris sur les chiffres qui, eux, étaient vrais."},
  {k:"h", label:"Demander une période de grâce d'un trimestre", power:2,
   why:"Tu ne contestes pas le seuil, tu demandes du temps pour corriger avant que la sanction tombe. C'est peu coûteux pour la banque et ça transforme une déchéance du terme en simple alerte. Souvent obtenu, rarement demandé."}
 ],
 resolve:(B,picks)=>{
   const C=BIZCASES_N2.find(c=>c.id==="n2negobanque");
   const p=picks.reduce((t,k)=>t+C.levers.find(l=>l.k===k).power,0);
   const seuil=Math.max(2.6, Math.min(4.2, 3 + p*.16));
   B.covenant={max:Math.round(seuil*10)/10, grace:picks.includes("h")?1:0,
               annuel:picks.includes("c"), dividendesPlafonnes:picks.includes("d")};
   if(picks.includes("e")) B.cautionPerso=true;
   if(p<0) B.rep=Math.max(.7,B.rep-.03);
   const montant=sc(B,250000);
   B.loans.push(mkLoan(montant, p>=4?.042:p>=1?.046:.053, 60, "Prêt de développement"));
   B.cash+=montant; B.debt=bizDebtOf(B); B.capacity*=1.4;
   return {p, seuil:B.covenant.max, montant};
 },
 debrief:(B,picks,r)=>{
  const eb=eb12Of(B), lev=eb>0?((bizDebtOf(B)-Math.max(0,B.cash))/eb):null;
  return `
  <p><b>Tu es reparti avec un covenant à ${String(r.seuil).replace(".",",")}× et ${eur(r.montant)}.</b>${r.seuil>3?" Tu as desserré la clause : c'est de l'air, et l'air ne se voit pas tant qu'on n'en manque pas.":r.seuil<3?" Tu es reparti avec une clause PLUS serrée qu'à l'arrivée — ça arrive, et c'est toujours le résultat d'arguments qui se sont retournés.":" La clause n'a pas bougé."}${B.covenant.annuel?" Test annuel obtenu : quatre occasions de franchir en moins sur cinq ans.":""}${B.covenant.grace?" Et un trimestre de grâce : une alerte au lieu d'une déchéance.":""}</p>
  <p><b>Ce qu'un banquier achète, ce n'est pas ton résultat : c'est ta capacité à rembourser.</b> Le covenant n'est pas une punition, c'est son instrument de surveillance — il veut être prévenu avant que ça tourne mal, pas après. Tout ce qui lui donne de la visibilité (historique de flux, engagement de dividendes, test annuel) s'échange bien. Tout ce qui lui en retire s'échange mal.</p>
  <p><b>Et le rapport de force ne tient qu'à une chose : ton alternative.</b> ${picks.includes("b")?"Tu avais une offre concurrente écrite, et c'est elle qui a fait le travail — pas ton éloquence.":"Tu n'avais aucune offre concurrente à poser sur la table. Un chargé d'affaires le sent en trois minutes, et sa marge de manœuvre s'évapore exactement au même moment."}${picks.includes("f")?" Dire à voix haute que tu n'as pas le choix a coûté plus cher que tout ce que tu as demandé ensuite.":""}</p>
  ${lev!==null?`<p><b>Ton levier après tirage : ${lev.toFixed(2).replace(".",",")}×</b> contre un seuil à ${String(r.seuil).replace(".",",")}×. ${lev>r.seuil*.8?"Tu es déjà dans la zone d'alerte : une baisse d'EBITDA de 20 % te fait franchir la ligne.":"Il te reste de la marge — c'est maintenant qu'il faut décider ce que tu en fais."}</p>`:""}`;},
 grid:[
  "Avoir posé ton levier actuel AVANT d'entrer dans la pièce.",
  "Avoir apporté un fait vérifiable (flux d'exploitation, historique), pas une promesse.",
  "Avoir compris qu'une alternative écrite vaut plus que n'importe quel argument.",
  "Avoir négocié la MÉCANIQUE de la clause (fréquence, grâce) et pas seulement le chiffre.",
  "N'avoir jamais dit que tu n'avais pas d'autre solution.",
  "Avoir refusé de payer une clause de confort avec ta caution personnelle."
 ]},

{id:"n2negovendeur", lvl:2, type:"nego", ch:6, icon:"♟️", title:"Négocier le prix avec le vendeur",
 concept:"Asymétrie d'information · VE vs prix des titres · structuration", lesson:"v3",
 when:B=>B.level>=2 && B.month>=26 && B.seen.indexOf("n2valo")>=0,
 signal:"Il t'a relancé deux fois cette semaine. Un vendeur pressé est un vendeur qui a une raison de l'être.",
 setup:B=>`Le vendeur maintient son prix : <b>${eur(sc(B,1800000))}</b>, « c'est le marché ». Tes diligences ont sorti trois choses qu'il n'a pas mises en avant : un <b>litige prud'homal provisionné à 0 €</b>, un client qui pèse <b>38 % de son chiffre</b>, et un EBITDA qui inclut <b>${eur(sc(B,40000))}</b> de frais personnels du dirigeant, qui disparaîtront avec lui.
   <br><br>Tu veux ramener le prix vers la valeur des <b>titres</b>, pas de l'entreprise.
   <br><br><b>Trois arguments.</b> Certains le feront bouger, d'autres lui apprendront que tu tiens absolument à ce deal.`,
 goal:"Ramener le prix au juste niveau",
 max:3,
 levers:[
  {k:"a", label:"La dette nette se déduit : ton prix est une VE, pas un prix d'actions", power:3,
   why:"Le point le plus solide, parce qu'il n'est pas négociable : c'est une identité comptable. Valeur d'entreprise − dette nette = prix des titres. Ce n'est pas une opinion sur sa boîte, c'est une règle. Un vendeur qui la conteste se disqualifie lui-même."},
  {k:"b", label:"Le litige non provisionné, chiffré par ton avocat", power:3,
   why:"Un risque identifié, chiffré et documenté. Il ne le conteste pas — il ne l'avait simplement pas mis sur la table. Deux issues : il baisse le prix, ou il accepte une garantie d'actif et de passif avec séquestre. Les deux te vont."},
  {k:"c", label:"L'EBITDA retraité des frais personnels du dirigeant", power:3,
   why:"C'est la quality of earnings, et c'est le cœur du métier : le multiple s'applique à un EBITDA NORMATIF, celui que la boîte produira sans lui. Retirer ces frais du calcul réduit mécaniquement la valeur d'entreprise — et c'est indiscutable."},
  {k:"d", label:"Proposer un earn-out sur la rétention du gros client", power:2,
   why:"Tu ne lui demandes pas de baisser son prix, tu lui demandes de le PROUVER. S'il a raison sur son client, il touchera tout ; s'il a tort, tu ne paies pas ce qui n'existait pas. Un vendeur sincère accepte un earn-out — c'est aussi un test de sa sincérité."},
  {k:"e", label:"« Cette boîte est exactement ce que je cherche »", power:-3,
   why:"La phrase qui coûte le plus cher du lot. Tu viens de lui dire que ton alternative est nulle. À partir de là, chaque concession que tu demanderas se paiera ailleurs, et il n'a plus aucune raison de bouger sur le prix."},
  {k:"f", label:"Lui annoncer que ton financement est déjà bouclé", power:-2,
   why:"Tu crois montrer ton sérieux, tu montres surtout que tu ne peux plus reculer. Un financement bouclé rassure sur ta capacité à closer — et supprime ton meilleur prétexte pour renégocier. Garde-le pour la fin, quand le prix est arrêté."},
  {k:"g", label:"La concentration client, sans l'avoir chiffrée", power:-1,
   why:"Le fait est vrai mais l'argument est creux tant qu'il n'est pas chiffré : combien de CA, quelle marge, quel préavis contractuel ? Sorti à main nue, il se retourne — il répondra que ce client est fidèle depuis quinze ans, et tu n'auras rien à opposer."},
  {k:"h", label:"Un crédit-vendeur sur trois ans", power:2,
   why:"Tu le fais rester dans le capital du risque : s'il croit à sa boîte, il accepte d'être payé plus tard. Ça allège ton financement bancaire, ça aligne ses intérêts sur la transition — et son refus, s'il refuse, est lui-même une information."}
 ],
 resolve:(B,picks)=>{
   const C=BIZCASES_N2.find(c=>c.id==="n2negovendeur");
   const p=picks.reduce((t,k)=>t+C.levers.find(l=>l.k===k).power,0);
   const ve=sc(B,1800000);
   const baisse=Math.max(0, Math.min(.34, p*.045));
   const prix=Math.round(ve*(1-baisse)/1000)*1000;
   B.negoPrix=prix; B.negoBaisse=baisse;
   if(picks.includes("d")) B.earnoutPrevu=true;
   if(picks.includes("h")) B.creditVendeur=true;
   if(picks.includes("b")) B.gapObtenue=true;
   if(p<0) B.rep=Math.max(.7,B.rep-.02);
   return {p, prix, ve, baisse};
 },
 debrief:(B,picks,r)=>`
  <p><b>Tu sors à ${eur(r.prix)}</b>, contre ${eur(r.ve)} annoncés — ${r.baisse>0?`soit <b>${Math.round(r.baisse*100)} % de moins</b>, ${eur(r.ve-r.prix)} que tu ne paieras pas`:`c'est-à-dire au prix affiché : il n'a pas bougé d'un euro`}.${B.gapObtenue?" Et tu repars avec une garantie d'actif et de passif sur le litige.":""}${B.earnoutPrevu?" L'earn-out transfère sur lui le risque du gros client.":""}${B.creditVendeur?" Le crédit-vendeur allège ton financement et le garde impliqué.":""}</p>
  <p><b>Les trois arguments qui marchent ici ont un point commun : ce ne sont pas des opinions.</b> La dette nette qui se déduit est une identité comptable. Le litige est documenté. Les frais personnels sont dans ses propres comptes. Un vendeur peut refuser une opinion ; il ne peut pas refuser un fait qui figure dans ses livres. <b>En négociation d'acquisition, on n'achète pas moins cher parce qu'on négocie mieux : on achète moins cher parce qu'on a mieux regardé.</b></p>
  <p><b>Et l'asymétrie d'information joue contre toi par défaut.</b> Il connaît sa boîte, tu ne la connais pas. Les diligences ne servent pas à « vérifier » : elles servent à renverser cette asymétrie, ligne par ligne. ${picks.includes("e")||picks.includes("f")?"Tu as révélé que tu tenais au deal — c'est exactement l'information qu'il lui manquait pour ne plus bouger.":"Tu n'as rien révélé de ton empressement : c'est ce qui t'a laissé une marge de manœuvre jusqu'au bout."}</p>`,
 grid:[
  "Avoir distingué valeur d'entreprise et prix des titres, et l'avoir dit.",
  "Avoir chiffré chaque risque avant de le poser sur la table.",
  "Avoir retraité l'EBITDA de ce qui disparaîtra avec le vendeur.",
  "Avoir proposé une structure (earn-out, crédit-vendeur) plutôt que de marchander un montant.",
  "N'avoir jamais montré à quel point tu voulais ce deal."
 ]},

{id:"n2acqui", lvl:2, type:"loan", ch:7, icon:"🏗️", title:"Comment tu finances l'acquisition",
 concept:"Structuration du financement · service de la dette · DSCR", lesson:"a4",
 when:B=>B.level>=2 && B.month>=30 && (B.negoPrix||B.acquired),
 signal:"Le vendeur a signé la lettre d'intention. Le financement, lui, n'est pas bouclé.",
 setup:B=>{const prix=B.negoPrix||sc(B,1440000), eb=Math.max(1,eb12Of(B));
  return `Prix arrêté : <b>${eur(prix)}</b>. Ta trésorerie : <b>${eur(B.cash)}</b>. Ton EBITDA des douze derniers mois : <b>${eur(eb)}</b>, celui de la cible environ <b>${eur(sc(B,300000))}</b>.
   <br><br>Quatre montages sur la table. Ils ne coûtent pas le même prix, et surtout ils ne pèsent pas la même chose <b>chaque mois</b>.
   <br><br>Avant de choisir : calcule la <b>mensualité rapportée à l'EBITDA combiné</b>. C'est elle qui dit si le montage tient, pas le taux affiché.`;},
 offers:[
  {k:"N", amount:0, months:0, rate:0, label:"Tu renonces — le montage ne tient pas", q:0},
  {k:"A", amountOf:B=>Math.round(((B.negoPrix||sc(B,1440000))*.75)/1000)*1000, months:84, rate:.05,
   label:"75 % en dette senior sur 7 ans, le reste en cash", q:2},
  {k:"B", amountOf:B=>Math.round(((B.negoPrix||sc(B,1440000))*.95)/1000)*1000, months:84, rate:.062,
   label:"95 % en dette, 7 ans, taux plus élevé", q:-1},
  {k:"C", amountOf:B=>Math.round(((B.negoPrix||sc(B,1440000))*.55)/1000)*1000, months:60, rate:.046,
   label:"55 % en dette sur 5 ans, tu mets plus de cash", q:1}
 ],
 apply:(B,k)=>{
   if(k==="N") return;
   const prix=B.negoPrix||sc(B,1440000);
   /* ⚠️ Le moteur a DÉJÀ encaissé le produit de l'emprunt avant d'appeler
      apply. Le prix se déduit donc EN ENTIER : la dette a financé une
      partie du chèque, elle ne le remplace pas. Première version : on ne
      retirait que l'apport, et l'acquisition RAPPORTAIT du cash. */
   B.cash-=prix;
   B.acquired=true;
   B.goodwill=(B.goodwill||0)+Math.round(prix*.55);
   B.demandMult*=1.6; B.fc+=sc(B,14000);
   if(k==="B") B.surEndette=true;
 },
 debrief:(B,k)=>{
  const l=B.loans[B.loans.length-1], eb=Math.max(1,eb12Of(B));
  const ebComb=eb+sc(B,300000);
  const service=l&&l.pay?l.pay*12:0;
  const dscr=service>0?ebComb/service:null;
  return `
  <p><b>Le taux n'est pas ce qui tue un montage. C'est le service de la dette.</b> ${l&&l.pay?`Tu rembourses <b>${eur(l.pay)} par mois</b>, soit <b>${eur(service)} par an</b>, contre un EBITDA combiné d'environ <b>${eur(ebComb)}</b>.`:"Tu n'as pris aucune dette — ton service annuel est nul, et ta trésorerie a tout encaissé."}${dscr!==null?` Ton ratio de couverture (EBITDA ÷ service de la dette) vaut <b>${dscr.toFixed(2).replace(".",",")}</b>.`:""}</p>
  ${dscr!==null?`<p>${dscr>=1.8?"<b>Au-dessus de 1,8 : le montage respire.</b> Tu peux absorber une mauvaise année sans appeler ton banquier.":dscr>=1.3?"<b>Entre 1,3 et 1,8 : c'est tenable, mais sans marge.</b> Une baisse d'EBITDA de 25 % et tu ne couvres plus. C'est la zone où l'on signe des covenants qu'on regrette.":"<b>Sous 1,3 : tu as acheté une boîte que tu ne peux pas payer.</b> Le moindre accroc — un client perdu, un retard d'intégration — te met en défaut. C'est comme ça que meurent les acquisitions réussies."}</p>`:""}
  <p><b>Maximiser la dette n'est pas maximiser le rendement.</b> Plus de dette augmente ton TRI si tout se passe bien, et transforme le moindre trou d'air en cessation de paiements si ça ne se passe pas bien. Le levier ne crée pas de valeur : il amplifie celle que tu crées, et celle que tu détruis, exactement dans les mêmes proportions.</p>
  <p><b>Et la question que personne ne pose au bon moment</b> : de quoi la boîte rachetée a-t-elle besoin les douze prochains mois ? Une acquisition financée à 95 % ne laisse rien pour intégrer, recruter, remplacer le dirigeant qui part. ${k==="B"?"C'est exactement ce que tu viens de faire.":k==="N"?"Tu as renoncé — vérifie que c'était un calcul et pas un recul.":"Tu as gardé du cash pour le lendemain du deal : c'est là que la moitié des acquisitions se jouent."}</p>`;},
 grid:[
  "Avoir calculé la mensualité et l'avoir rapportée à l'EBITDA combiné, pas au prix.",
  "Avoir regardé le ratio de couverture avant le taux.",
  "Avoir gardé de la trésorerie pour l'après-deal, pas seulement pour le deal.",
  "Avoir compris que le levier amplifie dans les deux sens.",
  "Avoir vu que la dette d'acquisition se rembourse avec l'EBITDA de la CIBLE, pas avec des synergies espérées."
 ]},
{id:"n2cr", lvl:2, type:"build", ch:3, icon:"🧾",
 title:"Construis ton compte de résultat",
 concept:"Du relevé d'opérations aux soldes intermédiaires de gestion", lesson:"b1",
 when:B=>B.level>=2 && B.month>=4 && B.hist.length>=3,
 signal:"Ton comptable est en congés et ton banquier veut les chiffres du mois vendredi.",
 setup:B=>`Personne ne va te servir le tableau cette fois. ${n2releve(B)}
   <br><br><b>Cinq de ces lignes n'ont rien à faire dans un compte de résultat.</b> À toi de voir lesquelles — et de descendre la cascade jusqu'au résultat net.`,
 tableTitle:"Le compte de résultat du mois",
 intro:"Descends dans l'ordre : chaque ligne se déduit de la précédente. Un montant par case, en euros.",
 lines:B=>{const o=n2ops(B); return [
  {k:"ca",   label:"Chiffre d'affaires", hint:"ce que tu as vendu — pas ce que tu as encaissé", val:o.ca,
   how:"Le CA, ce sont les ventes <b>facturées</b> du mois.",
   trap:`Les ${eur(o.acompte)} d'acompte ne sont PAS du chiffre d'affaires : la commande n'est pas livrée. C'est une <b>dette envers le client</b> au passif, qui deviendra du CA le mois où tu livreras. Le CA suit la livraison, jamais l'encaissement.`},
  {k:"mb",   label:"Marge brute", hint:"CA − achats consommés", val:o.mb,
   how:`${eur(o.ca)} − ${eur(o.achats)} = <b>${eur(o.mb)}</b>, soit ${Math.round(o.mb/o.ca*100)} % du CA.`,
   trap:"On retire les achats <b>consommés</b>, pas les achats payés. Ce qui dort en stock n'est pas encore une charge : il est à l'actif."},
  {k:"ebitda",label:"EBITDA", hint:"marge brute − charges fixes décaissées", val:o.ebitda,
   how:`${eur(o.mb)} − ${eur(o.salaires)} − ${eur(o.loyer)} − ${eur(o.autres)} = <b>${eur(o.ebitda)}</b>.`,
   trap:`L'EBITDA est <b>avant</b> dotations : les ${eur(o.dot)} d'amortissement ne se retirent pas ici. C'est précisément ce qui en fait l'indicateur que regardent les banquiers — il ne dépend pas de la politique d'amortissement.`},
  {k:"ebit", label:"Résultat d'exploitation (EBIT)", hint:"EBITDA − dotation aux amortissements", val:o.ebit,
   how:`${eur(o.ebitda)} − ${eur(o.dot)} = <b>${eur(o.ebit)}</b>.`,
   trap:`La dotation EST une charge, même si aucun euro ne sort du compte ce mois-ci. Et la machine à ${eur(o.machine)} n'apparaît NULLE PART au compte de résultat : on n'y passe que son usure, mois après mois.`},
  {k:"rcai", label:"Résultat avant impôt", hint:"EBIT − charges financières", val:o.rcai,
   how:`${eur(o.ebit)} − ${eur(o.interets)} d'intérêts = <b>${eur(o.rcai)}</b>.`,
   trap:`Dans l'échéance de ${eur(o.remb+o.interets)}, seuls les ${eur(o.interets)} d'intérêts sont une charge. Les ${eur(o.remb)} de capital remboursé ne passent jamais par le résultat : ils éteignent une dette au passif. C'est le malentendu qui coûte le plus cher aux dirigeants.`},
  {k:"is",   label:"Impôt sur les sociétés", hint:"25 % du résultat avant impôt", val:o.is,
   how:o.rcai>0?`25 % × ${eur(o.rcai)} = <b>${eur(o.is)}</b>.`
              :`Le résultat avant impôt est négatif (${eur(o.rcai)}) : l'impôt est de <b>0 €</b>.`,
   trap:o.rcai>0?null:"On ne paie pas d'impôt sur une perte — et le déficit s'impute sur les bénéfices des exercices suivants. Écrire 25 % d'un nombre négatif, c'est s'accorder un crédit d'impôt qui n'existe pas."},
  {k:"rn",   label:"Résultat net", hint:"le bas du tableau", val:o.rn,
   how:`${eur(o.rcai)} − ${eur(o.is)} = <b>${eur(o.rn)}</b>.`,
   trap:o.rn>=0?"Retiens ce chiffre : le cas suivant repart de lui, et tu verras que ce mois bénéficiaire fait baisser ta trésorerie."
              :"Le mois est déficitaire. Retiens le chiffre quand même : au cas suivant tu verras que ta trésorerie, elle, ne suit pas forcément le même sens — un mois en perte peut très bien encaisser."}
 ];},
 debrief:(B,r)=>{const o=n2ops(B); return `
  <p><b>Les cinq intrus.</b> La machine (${eur(o.machine)}), l'emprunt débloqué (${eur(o.emprunt)}), le capital remboursé (${eur(o.remb)}), l'acompte client (${eur(o.acompte)}) et la hausse des créances (${eur(o.dcr)}) sont des mouvements de <b>trésorerie ou de bilan</b>. Aucun n'est une charge ni un produit. À l'inverse, la dotation de ${eur(o.dot)} est une charge alors qu'aucun euro ne bouge. <b>Le compte de résultat ne parle pas d'argent qui circule : il parle de richesse créée ou détruite.</b></p>
  <p><b>Ce que ta copie dit de toi.</b> ${r.bons===r.total?"Sept sur sept. Tu as la cascade en tête et tu n'es tombé dans aucun des cinq pièges. C'est le niveau attendu d'un dirigeant qui lit ses propres comptes sans intermédiaire." : r.bons>=5?"Le squelette est là. Regarde la ou les lignes ratées : dans neuf cas sur dix, c'est un mouvement de trésorerie qu'on a fait entrer dans le résultat, ou une charge sans décaissement qu'on en a sortie." : "La cascade n'est pas encore automatique. Reprends-la dans l'ordre — CA, marge brute, EBITDA, EBIT, résultat avant impôt, impôt, résultat net — et à chaque ligne pose-toi une seule question : est-ce que ça crée ou détruit de la richesse ce mois-ci ? Si la réponse est non, ça n'a rien à faire là."}</p>
  <p><b>Le chiffre à garder.</b> Résultat net <b>${eur(o.rn)}</b>, EBITDA <b>${eur(o.ebitda)}</b>. L'écart entre les deux, ce sont la dotation, les intérêts et l'impôt. Un banquier raisonne sur l'EBITDA, un actionnaire sur le résultat net, et ton compte en banque sur ni l'un ni l'autre : c'est l'objet du cas suivant.</p>`;},
 grid:[
  "Avoir écarté la machine payée : un investissement n'est pas une charge, seule sa dotation l'est.",
  "Avoir écarté le capital remboursé et gardé les seuls intérêts.",
  "Avoir écarté l'acompte : le CA suit la livraison, pas l'encaissement.",
  "Avoir écarté l'emprunt débloqué : de l'argent qui entre n'est pas un produit.",
  "Avoir gardé la dotation malgré l'absence de décaissement.",
  "Avoir placé l'EBITDA AVANT la dotation, et l'EBIT après."
 ]},

{id:"n2tft", lvl:2, type:"build", ch:4, icon:"🌊",
 title:"Ton résultat et ta caisse racontent deux histoires",
 concept:"Le tableau de flux de trésorerie · les trois flux", lesson:"b3",
 when:B=>B.level>=2 && B.month>=7 && B.seen.indexOf("n2cr")>=0,
 signal:"Le même mois que ton compte de résultat. Compare ce que tu as gagné et ce que la banque a vu passer.",
 setup:B=>{const o=n2ops(B); return `Tu as établi ton compte de résultat : <b>résultat net ${eur(o.rn)}</b>. Ton compte en banque, lui, ouvrait le mois à <b>${eur(o.treso0)}</b>.
   <br><br>${n2releve(B)}
   <br><br>Le tableau de flux range chaque mouvement dans <b>une seule</b> des trois cases : <b>exploitation</b> (ce que le métier produit), <b>investissement</b> (ce qu'on achète pour durer), <b>financement</b> (ce qu'on emprunte, rembourse ou distribue).
   <br><br>Commence par le BFR, puis par l'exploitation : pars du résultat net, <b>remets ce qui n'est pas sorti</b>, <b>retire ce qui est immobilisé</b>.`;},
 tableTitle:"Le tableau de flux du mois",
 intro:"Les flux négatifs s'écrivent avec un signe moins. Un montant par case, en euros.",
 lines:B=>{const o=n2ops(B); return [
  {k:"dbfr", label:"Variation du besoin en fonds de roulement", hint:"hausse des créances − acompte encaissé", val:o.dbfr,
   how:`${eur(o.dcr)} − ${eur(o.acompte)} = <b>${eur(o.dbfr)}</b>. Stock et fournisseurs n'ont pas bougé.`,
   trap:`L'acompte <b>réduit</b> ton BFR : c'est l'argent de ton client qui finance ton cycle. Le BFR n'est pas « stock + créances », c'est <b>ce que ton cycle immobilise net de ce que les autres t'avancent</b> — fournisseurs et acomptes compris.`},
  {k:"expl", label:"Flux de trésorerie d'exploitation", hint:"résultat net + dotation − variation du BFR", val:o.fluxExpl,
   how:`${eur(o.rn)} + ${eur(o.dot)} − ${eur(o.dbfr)} = <b>${eur(o.fluxExpl)}</b>.`,
   trap:`On <b>remet</b> la dotation parce qu'elle a réduit le résultat sans sortir un euro. On <b>retire</b> la hausse du BFR parce que cet argent existe — il dort chez tes clients. Les intérêts, eux, restent ici : ils sont déjà dans le résultat net et relèvent bien de l'exploitation.`},
  {k:"inv",  label:"Flux d'investissement", hint:"négatif : de l'argent qui sort", val:o.fluxInv,
   how:`La machine : <b>−${eur(o.machine)}</b>.`,
   trap:"Elle sort ici <b>en entier et tout de suite</b>, alors qu'au compte de résultat elle n'apparaissait que par sa dotation. Même objet, deux tableaux, deux rythmes : c'est toute la différence entre charge et décaissement."},
  {k:"fin",  label:"Flux de financement", hint:"emprunt débloqué − capital remboursé", val:o.fluxFin,
   how:`+${eur(o.emprunt)} − ${eur(o.remb)} = <b>${eur(o.fluxFin)}</b>.`,
   trap:`Le capital remboursé atterrit ICI, et nulle part ailleurs. Les intérêts, eux, sont restés en exploitation. <b>Une même échéance de ${eur(o.remb+o.interets)} se coupe donc en deux</b> et part dans deux cases différentes : c'est la manipulation que personne ne fait spontanément.`},
  {k:"dcash",label:"Variation de trésorerie du mois", hint:"la somme des trois flux", val:o.dcash,
   how:`${eur(o.fluxExpl)} − ${eur(o.machine)} + ${eur(o.fluxFin)} = <b>${eur(o.dcash)}</b>.`,
   trap:o.dcash<0?"Négative, alors que le mois est bénéficiaire. Ce n'est pas une anomalie : c'est le cas le plus fréquent d'une entreprise qui investit et qui grandit en même temps.":"Positive ce mois-ci — vérifie toujours d'où elle vient : un emprunt n'est pas une performance."},
  {k:"treso1",label:"Trésorerie à la fin du mois", hint:"ouverture + variation", val:o.treso1,
   how:`${eur(o.treso0)} + (${eur(o.dcash)}) = <b>${eur(o.treso1)}</b>.`,
   trap:"Cette ligne est le contrôle du tableau : si elle ne tombe pas sur le solde réel de ton compte, une opération s'est perdue en route ou a été comptée deux fois."}
 ];},
 debrief:(B,r)=>{const o=n2ops(B); return `
  <p><b>Le mois a ${o.rn>=0?"créé "+eur(o.rn)+" de richesse":"détruit "+eur(Math.abs(o.rn))+" de richesse"} et ${o.dcash<0?"détruit "+eur(Math.abs(o.dcash))+" de trésorerie":"dégagé "+eur(o.dcash)+" de trésorerie"}.</b> ${o.rn>=0!==o.dcash>=0?"Les deux affirmations sont exactes en même temps, et c'est là que la plupart des dirigeants décrochent.":"Les deux vont dans le même sens ce mois-ci — ce n'est pas toujours le cas, et c'est bien le problème."} L'écart tient en trois lignes : la machine sort en entier (${eur(o.machine)}) alors qu'elle ne pèse que ${eur(o.dot)} au résultat, le BFR immobilise ${eur(o.dbfr)} de plus, et l'emprunt de ${eur(o.emprunt)} entre sans être un produit.</p>
  <p><b>Ce que ce tableau permet que les deux autres ne permettent pas.</b> Le compte de résultat dit si ton métier est rentable. Le bilan dit à quoi ressemble ton patrimoine un jour donné. <b>Seul le tableau de flux dit d'où vient l'argent.</b> Un flux d'exploitation durablement négatif est une alerte vitale même avec un résultat positif ; un flux d'exploitation qui finance seul l'investissement est la signature d'une boîte qui tient debout toute seule.</p>
  <p><b>La question à se poser chaque mois.</b> Est-ce que mon exploitation finance mes investissements, ou est-ce que c'est la banque ? Ce mois-ci : ${eur(o.fluxExpl)} d'exploitation contre ${eur(o.machine)} d'investissement — ${o.fluxExpl>=o.machine?"le métier paie, la dette n'est qu'un confort.":"c'est la banque, et c'est tenable tant que ça reste ponctuel et que la machine produit ce que tu attends d'elle."}</p>
  <p>${r.bons===r.total?"<b>Six sur six.</b> Tu sais construire un tableau de flux à partir d'un relevé — ce que la majorité des candidats en entretien de M&A ne savent pas faire sans modèle sous les yeux." : r.bons>=4?"<b>La structure est acquise</b>, l'erreur est dans le rangement. Le test : chaque opération va dans UNE case et une seule ; si tu hésites, demande-toi si elle relève du métier, du long terme, ou de qui finance." : "<b>À refaire.</b> Retiens l'ordre : on part du résultat net, on remet les charges sans décaissement, on retire ce que le BFR immobilise. Puis l'investissement en entier. Puis le financement. Et le total doit retomber sur ton relevé bancaire."}</p>`;},
 grid:[
  "Avoir calculé le BFR net : l'acompte du client le RÉDUIT.",
  "Être parti du résultat net, pas du chiffre d'affaires.",
  "Avoir remis la dotation aux amortissements (charge sans décaissement).",
  "Avoir retiré la hausse du BFR : cet argent existe, il est immobilisé.",
  "Avoir coupé l'échéance d'emprunt en deux : intérêts en exploitation, capital en financement.",
  "Avoir sorti la machine en totalité en investissement, et pas par douzièmes.",
  "Avoir vérifié que le total retombe sur la trésorerie de clôture."
 ]},

{id:"n2bilan", lvl:2, type:"build", ch:5, icon:"⚖️",
 title:"Fais tomber ton bilan juste",
 concept:"Le bilan de clôture · actif = passif, toujours", lesson:"b2",
 when:B=>B.level>=2 && B.month>=10 && B.seen.indexOf("n2tft")>=0,
 signal:"Toujours le même mois. Cette fois, on regarde ce que tu possèdes et à qui tu le dois.",
 setup:B=>{const o=n2ops(B); return `<b>Ton bilan à l'ouverture du mois</b> — il tombe, vérifie-le si tu veux :
   <br>· <b>ACTIF</b> — immobilisations nettes ${eur(o.im0)} · stock ${eur(o.st)} · créances clients ${eur(o.cr)} · trésorerie ${eur(o.treso0)}
   <br>· <b>PASSIF</b> — capital ${eur(o.cap)} · réserves ${eur(o.res0)} · dettes fournisseurs ${eur(o.fo)} · emprunts ${eur(o.dette0)}
   <br><br>${n2releve(B)}
   <br><br>Tu as calculé aux deux cas précédents : <b>résultat net ${eur(o.rn)}</b> et <b>variation de trésorerie ${eur(o.dcash)}</b>.
   <br><br>Six lignes à produire. Et le total du passif doit tomber exactement sur celui de l'actif — <b>une ligne du passif est celle que tout le monde oublie</b>.`;},
 tableTitle:"Le bilan à la clôture",
 intro:"Six lignes. La dernière doit égaler le total de l'actif — si ce n'est pas le cas, une écriture n'a qu'une seule jambe.",
 lines:B=>{const o=n2ops(B); return [
  {k:"immo", label:"Immobilisations nettes", hint:"ouverture + acquisition − dotation", val:o.im1,
   how:`${eur(o.im0)} + ${eur(o.machine)} − ${eur(o.dot)} = <b>${eur(o.im1)}</b>.`,
   trap:"La dotation ne « part » nulle part : elle transfère de la valeur de l'actif vers les charges. L'actif maigrit du montant exact passé en charge — c'est pour ça que le bilan reste équilibré sans qu'on touche au cash."},
  {k:"creances", label:"Créances clients", hint:"ouverture + hausse du mois", val:o.cr1,
   how:`${eur(o.cr)} + ${eur(o.dcr)} = <b>${eur(o.cr1)}</b>.`,
   trap:"Une créance est un actif : c'est de l'argent qui t'appartient et que tu n'as pas. Toute la difficulté du BFR tient dans cette phrase."},
  {k:"actif",label:"TOTAL DE L'ACTIF", hint:"immobilisations + stock + créances + trésorerie", val:o.actif1,
   how:`${eur(o.im1)} + ${eur(o.st)} + ${eur(o.cr1)} + ${eur(o.treso1)} = <b>${eur(o.actif1)}</b>. La trésorerie de clôture vaut ${eur(o.treso0)} ${o.dcash<0?"−":"+"} ${eur(Math.abs(o.dcash))} = ${eur(o.treso1)}.`},
  {k:"res",  label:"Réserves", hint:"la seule ligne du passif que le résultat touche", val:o.res1,
   how:`${eur(o.res0)} + ${eur(o.rn)} = <b>${eur(o.res1)}</b>.`,
   trap:"Le résultat net ne se pose nulle part ailleurs au bilan. Il ne va pas au capital : le capital, ce sont les apports des actionnaires, et il ne bouge que par une augmentation de capital."},
  {k:"dette",label:"Emprunts", hint:"ouverture + déblocage − capital remboursé", val:o.dette1,
   how:`${eur(o.dette0)} + ${eur(o.emprunt)} − ${eur(o.remb)} = <b>${eur(o.dette1)}</b>.`,
   trap:`Seul le capital de ${eur(o.remb)} réduit la dette. Les intérêts, eux, sont déjà passés en charge : ils ne figurent pas ici.`},
  {k:"passif",label:"TOTAL DU PASSIF", hint:"capital + réserves + fournisseurs + emprunts + … la ligne oubliée", val:o.passif1,
   how:`${eur(o.cap)} + ${eur(o.res1)} + ${eur(o.fo)} + ${eur(o.dette1)} + ${eur(o.acompte)} d'acompte client = <b>${eur(o.passif1)}</b>.`,
   trap:`<b>L'acompte de ${eur(o.acompte)} est la ligne oubliée</b> : encaissé mais pas gagné, c'est une dette envers le client. Sans elle, ton passif est plus léger que ton actif d'exactement ce montant — et le bilan refuse de tomber.`}
 ];},
 debrief:(B,r)=>{const o=n2ops(B); return `
  <p><b>Un bilan qui ne tombe pas n'est pas « presque juste » : il est faux.</b> Chaque euro à l'actif vient de quelque part. La machine à ${eur(o.machine)} en est la démonstration : elle entre à l'actif, et en face il y a ${eur(o.emprunt)} d'emprunt au passif et le reste pris sur la trésorerie — qui est elle-même à l'actif. Rien ne se crée.</p>
  <p><b>Les trois écritures qui coupent la copie en deux.</b> La dotation, qui fait maigrir l'actif sans toucher au cash. Le résultat net, qui ne se pose que sur les <b>réserves</b> — jamais sur le capital. Et l'acompte client, encaissé mais pas gagné, qui est une <b>dette</b> : neuf fois sur dix c'est lui qui manque, et l'écart vaut alors exactement ${eur(o.acompte)}.</p>
  <p><b>Le réflexe à installer.</b> Quand ton bilan ne tombe pas, ne cherche pas une erreur de calcul : cherche une écriture à une seule jambe. Un mouvement qui a bougé l'actif sans rien bouger au passif, ou l'inverse. C'est toujours ça. ${r.bons===r.total?"Tu as trouvé les six, acompte compris — c'est le vrai test du cas." : "Reprends ligne à ligne et, pour chacune, demande-toi ce qui a bougé EN FACE."}</p>
  <p><b>Et maintenant tu as les trois états du même mois.</b> Résultat net ${eur(o.rn)}, variation de trésorerie ${eur(o.dcash)}, total de bilan ${eur(o.actif1)}. Trois chiffres, trois questions différentes : suis-je rentable, est-ce que j'ai de l'argent, que possède l'entreprise et à qui. Aucun des trois ne répond à la place des deux autres — c'est tout le niveau 2.</p>`;},
 grid:[
  "Avoir fait maigrir l'actif immobilisé de la dotation.",
  "Avoir augmenté les créances clients de la hausse du mois.",
  "Avoir porté le résultat net aux réserves, et pas au capital.",
  "Avoir réduit l'emprunt du seul capital remboursé, pas de l'échéance entière.",
  "Avoir inscrit l'acompte client au passif : encaissé n'est pas gagné.",
  "Avoir vérifié que le total du passif égale celui de l'actif."
 ]},


{id:"n2flux", lvl:2, type:"choice", ch:3, icon:"🌊", title:"Le mois où tout va bien et la caisse est vide",
 concept:"ΔCash = RN − ΔBFR − CAPEX · le flux contre le résultat", lesson:"b3",
 when:B=>B.level>=2 && B.month>=9 && B.b2b && B.cash < B.fc*2,
 signal:"Ton résultat mensuel est en hausse depuis quatre mois. Ta trésorerie, elle, baisse depuis trois.",
 gate:{ask:"Avant de choisir : combien ton cycle immobilise-t-il ? Calcule ton BFR.", unit:"€", pal:4, tol:.08, plancher:150,
   val:B=>Math.round(B.stockU*B.mc + B.ar - B.ap),
   how:"BFR = stock + créances clients − dettes fournisseurs.",
   why:"C'est l'argent que ta machine immobilise en permanence, et il grandit avec ton chiffre d'affaires. Tant que sa hausse mensuelle dépasse ton résultat, tu gagnes de l'argent et tu en perds : aucune des quatre options ne se juge sans ce chiffre."},
 setup:B=>`Ton expert-comptable t'annonce un <b>résultat net positif</b> sur le trimestre. Ton banquier, lui, t'appelle parce que ton compte est passé sous le seuil d'alerte.
   <br><br>Les deux ont raison. Tes chiffres : trésorerie <b>${eur(B.cash)}</b> · créances clients <b>${eur(B.ar)}</b> · stock <b>${eur(Math.round(B.stockU*B.mc))}</b> · dettes fournisseurs <b>${eur(B.ap)}</b>.
   <br><br>Tu tournes à <b>${eur(B.hist.length?B.hist[B.hist.length-1].ca:0)}</b> de CA mensuel et tu grandis d'environ <b>8 % par mois</b>.
   <br><br>Avant de choisir : pose le calcul. Combien d'argent ta croissance immobilise-t-elle chaque mois ?`,
 options:[
  {k:"A", label:"Tu demandes un découvert autorisé", term:"Tu couvres le trou avec la ligne la plus chère du marché.", q:-1},
  {k:"B", label:"Tu ralentis volontairement la croissance", term:"Tu refuses des commandes le temps de reconstituer du cash.", q:0},
  {k:"C", label:"Tu attaques le BFR : acomptes, relances, stock", term:"Tu ne touches ni au CA ni au financement — tu libères l'argent déjà dans la machine.", q:2},
  {k:"D", label:"Tu factures de l'affacturage sur tes créances", term:"Tu vends tes créances pour encaisser tout de suite, contre une commission.", q:1}
 ],
 apply:(B,k)=>{
   if(k==="A"){ B.overdraft=true; B.fc+=Math.round(B.cash<0?900:450); }
   if(k==="B"){ B.growth=Math.min(B.growth,1.01); B.demandMult*=.9; }
   if(k==="C"){ B.dso=Math.max(15,B.dso-18); B.stockTarget=Math.max(.5,B.stockTarget-.35); B.acompte=.25; }
   if(k==="D"){ B.factoring=true; B.dso=Math.max(10,B.dso-30); B.mc*=1.02; }
 },
 debrief:(B,k)=>`
  <p><b>Il n'y a aucune contradiction entre ton comptable et ton banquier.</b> Le résultat net mesure ce que tu as <i>gagné</i> ; la trésorerie mesure ce que tu as <i>encaissé</i>. Entre les deux, il y a le BFR — et une entreprise qui grandit vite l'alimente tous les mois. L'identité à retenir, c'est <b>ΔCash = RN − ΔBFR − CAPEX + financement</b>. Tant que ΔBFR dépasse ton résultat, tu gagnes de l'argent et tu en perds.</p>
  <p><b>Le calcul qu'il fallait poser.</b> Ton BFR vaut stock + créances − dettes fournisseurs, soit environ <b>${eur(Math.round(B.stockU*B.mc + B.ar - B.ap))}</b>. Rapporté à ton CA mensuel, c'est le nombre de mois de chiffre d'affaires que ta machine immobilise en permanence. Quand tu grandis de 8 %, ce montant grandit de 8 % lui aussi : <b>ta croissance te présente une facture mensuelle</b>, et personne ne te l'envoie par courrier.</p>
  <p><b>C est la seule option qui s'attaque à la cause.</b> Les trois autres financent le symptôme. Un acompte de 25 %, quinze jours de DSO en moins et un tiers de stock en moins libèrent de l'argent qui t'appartient déjà — sans intérêts, sans dilution, sans ralentir. C'est le gisement le moins cher de toute la finance d'entreprise, et c'est celui qu'on regarde en dernier.</p>
  <p><b>A est le pire, et c'est le réflexe le plus courant.</b> Le découvert se paie entre 10 et 15 % l'an, agios compris — pour financer un besoin <i>structurel</i> qui ne disparaîtra pas. On finance un besoin permanent avec une ressource permanente : c'est la règle d'équilibre du bilan, et elle ne se négocie pas. <b>D n'est pas honteux</b> : l'affacturage coûte cher mais il est <i>proportionnel</i> à l'activité, donc il s'arrête quand la croissance s'arrête. C'est un bon pansement, ce n'est pas un traitement.</p>`,
 grid:[
  "Avoir calculé le BFR (stock + créances − fournisseurs) avant de chercher un financement.",
  "Avoir compris que le BFR croît AVEC le chiffre d'affaires, donc que le trou se recreuse.",
  "Avoir cherché à libérer du cash déjà dans la machine avant d'en emprunter.",
  "Avoir refusé de financer un besoin structurel avec une ressource court terme."
 ]},

{id:"n2covenant", lvl:2, type:"choice", ch:4, icon:"⛓️", title:"Le prêt qui vient avec une laisse",
 concept:"Covenants · dette nette / EBITDA · gearing", lesson:"a2",
 when:B=>B.level>=2 && B.month>=14 && B.hist.length>=12,
 signal:"Ta banque t'a proposé un rendez-vous « pour accompagner ta croissance ». Ce n'est jamais désintéressé.",
 gate:{ask:"Avant de lire les clauses : quel est ton levier ACTUEL, dette nette / EBITDA ?", unit:"×", pal:6, tol:.10, plancher:.06,
   val:B=>{const eb=eb12Of(B); if(!(eb>0)) return null; return (bizDebtOf(B)-Math.max(0,B.cash))/eb;},
   how:"Levier = (dettes financières − trésorerie) ÷ EBITDA des 12 derniers mois.",
   why:"Le covenant est fixé à 3,0×. Savoir où tu es AVANT de signer, c'est savoir combien d'air il te reste — et si une baisse d'EBITDA de 30 % te ferait franchir la limite."},
 setup:B=>{const eb12=eb12Of(B);
  return `La banque te propose <b>${eur(sc(B,250000))}</b> sur 5 ans à 4,5 % pour financer ton développement.
   <br><br>Le contrat contient trois clauses que tu n'as jamais lues ailleurs :
   <br>· <b>dette nette / EBITDA ≤ 3,0</b>, testé chaque semestre
   <br>· <b>distribution de dividendes interdite</b> tant que le ratio dépasse 2,5
   <br>· <b>déchéance du terme</b> si le ratio est franchi deux fois de suite
   <br><br>Tes chiffres : EBITDA des 12 derniers mois <b>${eur(eb12)}</b> · dette existante <b>${eur(B.debt)}</b> · trésorerie <b>${eur(B.cash)}</b>.
   <br><br>Pose le ratio AVANT de répondre. Et pose-le aussi dans un scénario où ton EBITDA baisse de 30 %.`;},
 options:[
  {k:"A", label:"Tu signes : le taux est bon", term:"4,5 %, c'est moins cher que tout le reste.", q:0},
  {k:"B", label:"Tu négocies le covenant à 3,5 et un trimestre de grâce", term:"Tu paies 0,3 % de plus pour de l'air.", q:2},
  {k:"C", label:"Tu refuses et tu finances sur ta trésorerie", term:"Tu grandis moins vite, tu ne dois rien à personne.", q:0},
  {k:"D", label:"Tu prends la moitié du montant", term:B=>`${eur(sc(B,125000))}, ratio deux fois plus confortable.`, q:1}
 ],
 apply:(B,k)=>{
   const eb12=eb12Of(B);
   if(k==="A"){ B.cash+=sc(B,250000); B.loans.push(mkLoan(sc(B,250000),.045,60,"Prêt de développement")); B.covenant={max:3,grace:0}; B.capacity*=1.5; }
   if(k==="B"){ B.cash+=sc(B,250000); B.loans.push(mkLoan(sc(B,250000),.048,60,"Prêt de développement")); B.covenant={max:3.5,grace:1}; B.capacity*=1.5; }
   if(k==="C"){ B.cash-=Math.min(B.cash*.6,sc(B,120000)); B.capacity*=1.2; B.noDebt=true; }
   if(k==="D"){ B.cash+=sc(B,125000); B.loans.push(mkLoan(sc(B,125000),.047,60,"Prêt de développement")); B.covenant={max:3,grace:0}; B.capacity*=1.25; }
 },
 debrief:(B,k)=>{const eb12=eb12Of(B);
  const ratio=eb12>0?((B.debt+250000-B.cash)/eb12).toFixed(2):"n/a";
  return `
  <p><b>Un covenant n'est pas une formalité : c'est une option gratuite que tu donnes à ton prêteur.</b> Tant que tu tiens le ratio, il ne se passe rien. Le jour où tu le franchis — et c'est toujours le jour où tu vas mal — la banque récupère le droit d'exiger le remboursement immédiat. Autrement dit : <b>ton financement disparaît précisément au moment où tu en as besoin.</b> C'est le mécanisme le plus contre-cyclique de la finance d'entreprise.</p>
  <p><b>Le calcul qu'il fallait poser.</b> Dette nette = dette totale − trésorerie. Avec ce prêt : (${eur(B.debt)} + 250 000 − ${eur(B.cash)}) ÷ ${eur(eb12)} d'EBITDA ≈ <b>${ratio}×</b>. Mais le vrai test n'est pas là : refais-le avec un EBITDA amputé de 30 %. Le dénominateur baisse, le numérateur ne bouge pas — <b>le ratio explose beaucoup plus vite que ton activité ne se dégrade.</b> C'est pour ça qu'on négocie toujours sur le scénario dégradé, jamais sur le scénario central.</p>
  <p><b>B est le bon coup, et 0,3 % de marge en plus est dérisoire face à ce qu'on achète.</b> Un covenant à 3,5 au lieu de 3,0, c'est environ 17 % d'EBITDA de marge d'erreur. Un trimestre de grâce (<i>equity cure</i> ou simple délai de régularisation), c'est le droit de ne pas mourir d'un mauvais trimestre. <b>En dette, on ne négocie pas d'abord le taux : on négocie la flexibilité.</b> Le taux coûte de l'argent ; le covenant coûte l'entreprise.</p>
  <p><b>C n'est pas prudent, c'est coûteux.</b> Financer une croissance rentable sur sa trésorerie, c'est refuser un levier qui fonctionne : tant que le rendement de l'investissement dépasse 4,5 %, la dette crée de la valeur pour toi. Le refus de la dette par principe est une position morale, pas une position financière. <b>D est le compromis des gens qui n'ont pas fait le calcul</b> — moitié moins de risque, mais aussi moitié moins de projet, et le ratio reste testé aux mêmes dates.</p>`;},
 grid:[
  "Avoir calculé la dette NETTE (dette − trésorerie), pas la dette brute.",
  "Avoir refait le ratio dans un scénario d'EBITDA dégradé, pas seulement au central.",
  "Avoir compris que le covenant se déclenche au pire moment, par construction.",
  "Avoir négocié la flexibilité (seuil, grâce, définition) avant de négocier le taux."
 ]},

{id:"n2dilution", lvl:2, type:"choice", ch:5, icon:"🧬", title:"Dette ou fonds propres",
 concept:"Coût du capital · dilution · pacte d'actionnaires", lesson:"cp4",
 when:B=>B.level>=2 && B.month>=20 && B.hist.length>=12,
 signal:"Un fonds régional t'a contacté après avoir vu tes comptes publiés. Ils ne t'ont pas trouvé par hasard.",
 gate:{ask:"Le prêt bancaire est à 5,2 % l'an. Combien te coûte-t-il RÉELLEMENT, en % après impôt ?", unit:"%", pal:11, tol:.15, plancher:.12,
   val:B=>5.2*.75,
   how:"Coût de la dette après impôt = taux × (1 − taux d'impôt) = 5,2 % × 0,75.",
   why:"Les intérêts sont déductibles : l'État paie un quart de ta facture. C'est la seule raison sérieuse pour laquelle la dette est moins chère que les fonds propres — et c'est à ce chiffre-là qu'il faut comparer ce que te coûteraient 30 % du capital, qui eux n'ont pas d'échéance, donc pas de fin."},
 setup:B=>{const eb12=eb12Of(B);
  return `Pour passer à l'échelle il te faut <b>${eur(sc(B,600000))}</b>. Deux propositions sur la table.
   <br><br><b>La banque</b> : ${eur(sc(B,600000))} sur 7 ans à 5,2 %, garantie personnelle sur ta résidence, covenant à 3,0×.
   <br><br><b>Le fonds</b> : ${eur(sc(B,600000))} contre <b>30 % du capital</b>. Pas de remboursement, pas de garantie. Un siège au conseil, un droit de veto sur les investissements au-delà de ${eur(sc(B,100000))}, et une clause de sortie à 7 ans.
   <br><br>Ton EBITDA des 12 derniers mois : <b>${eur(eb12)}</b>. Les boîtes de ton secteur se négocient autour de <b>6× l'EBITDA</b>.
   <br><br>Avant de choisir : que vaut ta boîte aujourd'hui, et que vaudront 30 % dans sept ans si le plan marche ?`;},
 options:[
  {k:"A", label:"La dette bancaire", term:"Tu rembourses, tu gardes 100 % du capital, tu engages ton patrimoine.", q:1},
  {k:"B", label:"Le fonds à 30 %", term:"Pas de dette, pas de garantie, un associé au conseil.", q:0},
  {k:"C", label:"Tu négocies le fonds à 18 % avec un BSA de rattrapage", term:"Moins de dilution tout de suite, un complément si le plan n'est pas tenu.", q:2},
  {k:"D", label:B=>`Tu montes ${eur(sc(B,300000))} de dette et tu lèves le reste plus tard`, term:"Tu fais la moitié du chemin et tu te redonnes le choix.", q:1}
 ],
 apply:(B,k)=>{
   if(k==="A"){ B.cash+=sc(B,600000); B.loans.push(mkLoan(sc(B,600000),.052,84,"Prêt bancaire 7 ans")); B.covenant={max:3,grace:0}; B.cautionPerso=true; B.capacity*=1.8; }
   if(k==="B"){ B.cash+=sc(B,600000); B.capital+=sc(B,600000); B.equityIn=(B.equityIn||0)+sc(B,600000); B.dilution=.30; B.board=true; B.capacity*=1.8; }
   if(k==="C"){ B.cash+=sc(B,600000); B.capital+=sc(B,600000); B.equityIn=(B.equityIn||0)+sc(B,600000); B.dilution=.18; B.bsa=true; B.board=true; B.capacity*=1.8; }
   if(k==="D"){ B.cash+=sc(B,300000); B.loans.push(mkLoan(sc(B,300000),.052,84,"Prêt bancaire 7 ans")); B.capacity*=1.4; }
 },
 debrief:(B,k)=>{const eb12=eb12Of(B);
  return `
  <p><b>La dette a un prix affiché, les fonds propres ont un prix caché — et le caché est presque toujours le plus élevé.</b> 5,2 % l'an sur 7 ans, c'est environ 120 000 € d'intérêts au total : c'est écrit dans le contrat, tu peux le calculer aujourd'hui. 30 % du capital, c'est 30 % de <i>tout ce que la boîte vaudra un jour</i>. Si ton plan marche, c'est infiniment plus cher que la dette. <b>C'est pour ça qu'on dit que les fonds propres sont la ressource la plus chère : ils n'ont pas d'échéance, donc pas de fin.</b></p>
  <p><b>Le calcul qu'il fallait poser.</b> À 6× l'EBITDA, ta boîte vaut aujourd'hui environ <b>${eur(Math.round(eb12*6))}</b>. 30 %, c'est donc <b>${eur(Math.round(eb12*6*.3))}</b> de valeur cédée pour 600 000 € reçus — regarde bien ce rapport, il te dit si tu vends cher ou si tu brades. Et surtout : si tu triples l'EBITDA en sept ans, ces 30 % valent trois fois plus, alors que la dette, elle, aurait été remboursée et oubliée.</p>
  <p><b>C est le vrai bon coup parce qu'il traite l'incertitude au lieu de la trancher.</b> Tu ne sais pas si ton plan sera tenu — le fonds non plus. Un BSA de rattrapage (des actions supplémentaires pour l'investisseur si les objectifs ne sont pas atteints) transforme un désaccord de valorisation en une clause : <b>tu paies plus cher seulement si tu réussis moins bien.</b> C'est exactement la même logique qu'un earn-out en M&A, vu de l'autre côté de la table.</p>
  <p><b>Ce que presque personne ne regarde dans l'offre du fonds, c'est le droit de veto à 100 000 €.</b> Tu n'as pas cédé 30 % du capital : tu as cédé 30 % du capital <i>et</i> la liberté d'investir. Dans un pacte d'actionnaires, les clauses de gouvernance pèsent souvent plus lourd que le pourcentage. <b>La garantie personnelle de l'option A relève du même angle mort</b> : elle ne coûte rien tant que tout va bien, et elle coûte ta maison le jour où ça casse.</p>`;},
 grid:[
  "Avoir valorisé la boîte AVANT de décider quel pourcentage céder.",
  "Avoir comparé le coût total de la dette au coût futur de la dilution, pas au taux facial.",
  "Avoir lu les clauses de gouvernance (veto, siège, sortie) et pas seulement le pourcentage.",
  "Avoir vu que la garantie personnelle transfère le risque sur ton patrimoine, hors bilan."
 ]},

{id:"n2valo", lvl:2, type:"choice", ch:5, icon:"🔍", title:"Combien vaut la boîte d'en face",
 concept:"Multiples de comparables · dette nette · valeur d'entreprise", lesson:"v3",
 when:B=>B.level>=2 && B.month>=24 && B.hist.length>=12,
 signal:"Le dirigeant du concurrent a 61 ans et ses deux enfants ont choisi d'autres métiers.",
 gate:{ask:"Avant de répondre au vendeur : à 6× l'EBITDA, combien vaut le PRIX DES TITRES ?", unit:"€", pal:9, tol:.06, plancher:500,
   val:B=>sc(B,1800000)-sc(B,420000)+sc(B,60000),
   how:"Prix des titres = valeur d'entreprise (6 × EBITDA) − dette nette (dette − trésorerie).",
   why:"Le vendeur t'a annoncé sa valeur d'ENTREPRISE en te laissant croire que c'était son prix. Tu reprends sa dette avec la boîte : elle se déduit du chèque. C'est l'erreur la plus coûteuse de tout ce cas, et la plus discrète."},
 setup:B=>`Ton concurrent direct est à vendre. Le vendeur annonce <b>« ${eur(sc(B,1800000))}, c'est le prix »</b>.
   <br><br>Ce qu'il te montre : CA <b>${eur(sc(B,2400000))}</b> · EBITDA <b>${eur(sc(B,300000))}</b> · résultat net <b>${eur(sc(B,140000))}</b>.
   <br><br>Ce qu'il te donne quand tu insistes : dette bancaire <b>${eur(sc(B,420000))}</b> · trésorerie <b>${eur(sc(B,60000))}</b> · un litige prud'homal en cours, provisionné à <b>0 €</b>.
   <br><br>Dans le secteur, les transactions récentes se font entre <b>5× et 7× l'EBITDA</b>.
   <br><br>Avant de répondre : à quoi s'applique le multiple — au prix des actions, ou à autre chose ?`,
 options:[
  {k:"A", label:B=>`Tu offres ${eur(sc(B,1500000))} : 5× l'EBITDA`, term:"Tu ancres bas sur le bas de la fourchette.", q:0},
  {k:"B", label:B=>`Tu offres ${eur(sc(B,1800000)-sc(B,420000)+sc(B,60000))} pour les titres`, term:"6× l'EBITDA en valeur d'entreprise, moins la dette nette.", q:2},
  {k:"C", label:B=>`Tu acceptes ${eur(sc(B,1800000))} : c'est dans la fourchette`, term:"6× l'EBITDA, le vendeur a fait son calcul.", q:-1},
  {k:"D", label:B=>`Tu offres ${eur(sc(B,1300000))} avec ${eur(sc(B,300000))} d'earn-out`, term:"Tu paies moins tout de suite, le solde si l'EBITDA tient.", q:2}
 ],
 apply:(B,k)=>{
   if(k==="A"){ B.offerRejected=true; B.rep=Math.max(.7,B.rep-.03); }
   if(k==="B"){ B.acquired=true; B.cash-=Math.min(B.cash,sc(B,300000)); B.loans.push(mkLoan(sc(B,1140000),.05,84,"Dette d'acquisition")); B.demandMult*=1.75; B.fc+=sc(B,14000); B.goodwill=(B.goodwill||0)+sc(B,600000); }
   if(k==="C"){ B.acquired=true; B.cash-=Math.min(B.cash,sc(B,400000)); B.loans.push(mkLoan(sc(B,1400000),.05,84,"Dette d'acquisition")); B.demandMult*=1.75; B.fc+=sc(B,14000); B.goodwill=(B.goodwill||0)+sc(B,950000); B.overpaid=true; }
   if(k==="D"){ B.acquired=true; B.cash-=Math.min(B.cash,sc(B,250000)); B.loans.push(mkLoan(sc(B,1050000),.05,84,"Dette d'acquisition")); B.earnout=sc(B,300000); B.demandMult*=1.7; B.fc+=sc(B,14000); B.goodwill=(B.goodwill||0)+sc(B,520000); }
 },
 debrief:(B,k)=>`
  <p><b>Le piège est dans la première ligne de l'annonce, et presque tout le monde tombe dedans.</b> Un multiple d'EBITDA donne une <b>valeur d'entreprise</b> — la valeur de l'outil, indépendamment de qui l'a financé. Le prix que tu paies pour les <i>actions</i>, lui, vaut : valeur d'entreprise − dette nette. Ici : 6 × ${eur(sc(B,300000))} = ${eur(sc(B,1800000))} de VE, moins (${eur(sc(B,420000))} − ${eur(sc(B,60000))}) = ${eur(sc(B,420000)-sc(B,60000))} de dette nette, soit <b>${eur(sc(B,1800000)-sc(B,420000)+sc(B,60000))} pour les titres</b>. Le vendeur t'a annoncé sa VE en te laissant croire que c'était son prix. Ce n'est pas de la malhonnêteté, c'est du métier.</p>
  <p><b>Accepter ${eur(sc(B,1800000))}, c'est donc payer 7,2× l'EBITDA sans l'avoir décidé</b> — le haut de la fourchette du secteur, pour une boîte dont tu ne sais encore rien. C'est l'erreur la plus coûteuse de tout ce cas, et c'est aussi la plus discrète : tu es resté « dans la fourchette », sauf que tu n'étais pas dans la bonne unité.</p>
  <p><b>Le litige prud'homal provisionné à zéro est un second prix caché.</b> Un passif non provisionné ne disparaît pas parce qu'on ne l'a pas écrit : il t'attend après le closing. Deux outils, et il faut les deux : une <b>garantie d'actif et de passif</b> (le vendeur paie si le passé remonte) et un <b>séquestre</b> sur une partie du prix pour que la garantie ne soit pas qu'une signature. Une garantie sans séquestre vaut la solvabilité du vendeur au moment du sinistre — c'est-à-dire souvent rien.</p>
  <p><b>D est excellent pour une raison qu'on sous-estime : l'earn-out déplace le désaccord.</b> Tu penses que l'EBITDA de 300 000 € doit beaucoup au dirigeant lui-même ; lui pense que la boîte tourne toute seule. Personne ne peut trancher aujourd'hui. L'earn-out dit : <i>prouve-le, et je paie</i>. <b>Attention quand même</b> — c'est la clause la plus procédurière du M&A : il faut définir l'EBITDA au mot près, qui produit les comptes, et ce que l'acheteur s'interdit de faire pendant la période.</p>`,
 grid:[
  "Avoir distingué valeur d'entreprise et prix des titres (VE − dette nette).",
  "Avoir recalculé le multiple IMPLICITE du prix demandé au lieu de vérifier une fourchette.",
  "Avoir chiffré le passif non provisionné et exigé garantie + séquestre.",
  "Avoir proposé une structure qui règle le désaccord de valeur au lieu de le trancher au pif."
 ]},

{id:"n2integration", lvl:2, type:"choice", ch:6, icon:"🧩", title:"Le lendemain du deal",
 concept:"Intégration post-acquisition · synergies · rétention", lesson:"v4",
 when:B=>B.level>=2 && B.acquired && B.month>=28,
 signal:"Deux des cinq salariés de la boîte rachetée ont posé des congés la semaine du closing. Ce n'est pas une coïncidence.",
 setup:B=>`Le deal est signé. Tu as maintenant <b>deux ateliers</b>, <b>deux équipes</b>, deux façons de faire le même métier — et tu as payé une partie du prix pour des <b>synergies</b> que tu as promises à ton banquier.
   <br><br>Sur le papier : 90 000 € d'économies annuelles en fusionnant les achats, la production et l'administratif.
   <br><br>Dans la vraie vie : leur chef d'atelier a 22 ans de maison, il connaît les clients par leur prénom, et il vient de te demander « ce qui va changer ».
   <br><br>Trésorerie : <b>${eur(B.cash)}</b> · charges fixes cumulées : <b>${eur(B.fc)}</b>/mois.`,
 options:[
  {k:"A", label:"Fusion immédiate des deux sites", term:"Tu fermes le leur, tu rapatries tout, tu prends les synergies tout de suite.", q:-1},
  {k:"B", label:"Tu ne touches à rien pendant un an", term:"Tu laisses tourner, tu observes, tu ne casses rien.", q:0},
  {k:"C", label:"Tu fusionnes les achats, tu laisses la production tranquille", term:"La synergie la moins visible d'abord, la plus sensible plus tard.", q:2},
  {k:"D", label:"Tu fusionnes et tu attaches le chef d'atelier avec un intéressement", term:"Tu vas vite, mais tu paies pour garder l'homme-clé.", q:1}
 ],
 apply:(B,k)=>{
   if(k==="A"){ B.fc-=sc(B,7500); B.demandMult*=.72; B.rep=Math.max(.5,B.rep-.12); B.keyManLost=true; }
   if(k==="B"){ B.fc-=0; B.synergiesLate=true; }
   if(k==="C"){ B.fc-=sc(B,3200); B.mc*=.94; B.demandMult*=.97; }
   if(k==="D"){ B.fc-=sc(B,5200); B.fc+=sc(B,1400); B.demandMult*=.93; B.keyMan=true; }
 },
 debrief:(B,k)=>`
  <p><b>La moitié des acquisitions détruisent de la valeur, et presque jamais à cause du prix payé.</b> Elles meurent après, dans les six mois qui suivent le closing. Le prix, tu l'as négocié pendant des semaines avec des avocats ; l'intégration, tu l'improvises un lundi matin avec des gens qui ont peur. Le déséquilibre d'attention est total, et il est exactement inversé par rapport aux enjeux.</p>
  <p><b>Toutes les synergies ne se valent pas, et l'ordre compte plus que le montant.</b> Les synergies d'<i>achat</i> (un seul fournisseur, un volume doublé, une meilleure remise) sont rapides, chiffrables, et ne se voient pas de l'extérieur : personne ne démissionne parce que le café vert vient d'un autre importateur. Les synergies de <i>production</i> touchent aux gestes, aux habitudes et aux identités. <b>On prend les premières tout de suite, on gagne le droit aux secondes.</b></p>
  <p><b>A est le scénario catastrophe classique</b> : tu encaisses 90 000 € d'économies et tu perds 28 % de la demande, parce que la clientèle de cette boîte n'était pas fidèle à l'enseigne mais à un homme. Tu as acheté un carnet de clients et tu viens de licencier le carnet. En petite entreprise, <b>ce que tu achètes est très rarement l'outil : c'est une relation</b>, et une relation ne figure à aucune ligne du bilan.</p>
  <p><b>C'est pour ça que D mérite mieux que sa réputation de dépense inutile.</b> 1 400 € par mois d'intéressement pour retenir l'homme qui tient les clients, quand tu viens d'en payer plus d'un million : c'est l'assurance la moins chère de toute l'opération. <b>Dans une acquisition de PME, la première ligne du plan d'intégration n'est pas une ligne de coût, c'est un nom.</b> Et B n'est pas absurde — attendre coûte les synergies promises, mais ne rien casser vaut souvent mieux que tout rater vite.</p>`,
 grid:[
  "Avoir hiérarchisé les synergies par risque, pas par montant.",
  "Avoir identifié l'homme-clé et chiffré ce que son départ coûterait.",
  "Avoir compris qu'en PME on achète une relation client, pas seulement un outil.",
  "Avoir accepté de payer pour de la rétention plutôt que d'encaisser une économie immédiate."
 ]},


{id:"n2bfrnorm", lvl:2, type:"choice", ch:3, icon:"📏", title:"Ce que ta croissance coûtera l'an prochain",
 concept:"BFR normatif · financement de la croissance", lesson:"b4",
 when:B=>B.level>=2 && B.month>=12 && B.hist.length>=6 && B.growth>1.02,
 signal:"Ton expert-comptable t'a demandé un prévisionnel. Personne ne demande ça pour le plaisir.",
 gate:{ask:"Combien de JOURS de chiffre d'affaires ton BFR immobilise-t-il aujourd'hui ?", unit:"j", pal:4, tol:.12, plancher:1.5,
   val:B=>{const h=B.hist[B.hist.length-1]; if(!h||!(h.ca>0)) return null; return (B.stockU*B.mc+B.ar-B.ap)/h.ca*30;},
   how:"BFR en jours = BFR ÷ chiffre d'affaires du mois × 30.",
   why:"C'est le seul chiffre qui se compare et qui se PROJETTE : si tu immobilises 45 jours de CA et que ton CA double, ton BFR double aussi. La facture de la croissance se lit là, un an à l'avance."},
 setup:B=>{const h=B.hist[B.hist.length-1]||{ca:0};
  const bfr=Math.round(B.stockU*B.mc+B.ar-B.ap), j=h.ca>0?Math.round(bfr/h.ca*30):0;
  return `Ton banquier veut savoir de combien tu auras besoin dans douze mois. Tu n'en as aucune idée, et lui non plus — mais lui sait le calculer.
   <br><br>Aujourd'hui : CA <b>${eur(h.ca)}</b>/mois · BFR <b>${eur(bfr)}</b>, soit <b>${j} jours de CA</b> immobilisés en permanence.
   <br><br>Ton plan : <b>+60 % de chiffre d'affaires</b> sur douze mois.
   <br><br>Avant de choisir : si ton BFR représente ${j} jours de CA aujourd'hui et que ton modèle ne change pas, combien te faudra-t-il quand ton CA aura grandi de 60 % ?`;},
 options:[
  {k:"A", label:"Tu demandes une ligne de trésorerie couvrant le besoin calculé", term:"Tu chiffres, tu négocies à froid, avant d'en avoir besoin.", q:2},
  {k:"B", label:"Tu attends de voir venir", term:"Tu aviseras quand la trésorerie baissera.", q:-2},
  {k:"C", label:"Tu réduis le BFR d'abord, tu finances le reste ensuite", term:"Acomptes, relances, stock : tu fais baisser le ratio avant de grandir.", q:2},
  {k:"D", label:"Tu freines la croissance pour rester autofinancé", term:"Tu grandis au rythme de ton cash.", q:0}
 ],
 apply:(B,k)=>{
   const bfr=B.stockU*B.mc+B.ar-B.ap;
   if(k==="A"){ B.ligneTreso=Math.round(bfr*.6); B.loans.push(mkLoan(Math.max(sc(B,5000),Math.round(bfr*.6)),.055,24,"Ligne de trésorerie")); B.cash+=Math.max(sc(B,5000),Math.round(bfr*.6)); }
   if(k==="B"){ B.bfrBlind=true; }
   if(k==="C"){ B.dso=Math.max(15,B.dso-12); B.stockTarget=Math.max(.5,B.stockTarget-.3); B.acompte=Math.max(B.acompte||0,.2); }
   if(k==="D"){ B.growth=Math.min(B.growth,1.02); }
 },
 debrief:(B,k)=>{const h=B.hist[B.hist.length-1]||{ca:0};
  const bfr=Math.round(B.stockU*B.mc+B.ar-B.ap), j=h.ca>0?Math.round(bfr/h.ca*30):0;
  return `
  <p><b>Le BFR normatif, c'est ton BFR exprimé en JOURS de chiffre d'affaires</b> — et c'est une constante de ton modèle, pas un montant. Le tien vaut <b>${j} jours</b>. Tant que tes délais clients, tes délais fournisseurs et ta politique de stock ne bougent pas, ces ${j} jours ne bougeront pas non plus.</p>
  <p><b>Le calcul qu'il fallait poser.</b> +60 % de CA, c'est +60 % de BFR : environ <b>${eur(Math.round(bfr*.6))}</b> de plus à financer sur l'année. Ce n'est pas une dépense, c'est de l'argent immobilisé — il reviendra, mais seulement le jour où tu arrêteras de grandir. <b>La croissance rentable consomme du cash</b>, et c'est ce paradoxe qui tue des entreprises parfaitement bénéficiaires.</p>
  <p><b>A et C sont tous les deux justes, et pour des raisons opposées.</b> A traite le symptôme mais au bon moment : une ligne négociée <i>à froid</i>, quand tes ratios sont bons, coûte bien moins cher qu'un découvert négocié dans l'urgence — la banque prête volontiers à qui n'en a pas besoin. C traite la cause : passer de ${j} à ${Math.max(5,j-12)} jours de BFR change ton modèle pour toujours et te dispense d'une partie du financement.</p>
  <p><b>B est la pire option du jeu, et c'est la plus fréquente dans la vraie vie.</b> Attendre de voir, c'est découvrir le besoin le jour où la trésorerie devient négative — c'est-à-dire au moment précis où ton dossier devient mauvais. <b>On négocie son financement quand on va bien.</b> D n'est pas absurde : refuser une croissance qu'on ne peut pas financer est une décision légitime — mais c'est un choix, pas une prudence, et il se paie en parts de marché.</p>`;},
 grid:[
  "Avoir exprimé le BFR en JOURS de CA, et pas seulement en euros.",
  "Avoir projeté le besoin futur en appliquant la croissance au BFR normatif.",
  "Avoir compris qu'on négocie un financement AVANT d'en avoir besoin.",
  "Avoir envisagé de réduire le ratio plutôt que de financer le montant."
 ]},

{id:"n2levier", lvl:2, type:"choice", ch:5, icon:"⚗️", title:"Les deux leviers, en même temps",
 concept:"Levier opérationnel × levier financier", lesson:"a1",
 when:B=>B.level>=2 && B.month>=17 && B.hist.length>=12,
 signal:"Le commercial de l'équipementier et ton chargé d'affaires bancaire t'ont appelé la même semaine. Ce n'est jamais un hasard.",
 gate:{ask:"Combien d'unités dois-tu vendre chaque mois juste pour ne rien gagner ?", unit:"", pal:3, tol:.06, plancher:2,
   val:B=>{const m=B.price-B.mc; if(!(m>0)) return null; return B.fc/m;},
   how:"Point mort = charges fixes ÷ marge sur coût variable unitaire (prix − coût de revient).",
   why:"Un investissement fait exactement deux choses : il baisse ton coût unitaire et il MONTE ton point mort. Savoir où il est avant de signer, c'est savoir ce que tu t'engages à vendre tous les mois, quoi qu'il arrive."},
 setup:B=>{const h=B.hist[B.hist.length-1]||{ca:0,ebitda:0,dot:0};
  return `Deux propositions arrivent ensemble, et chacune est bonne prise séparément.
   <br><br><b>L'équipementier</b> : une ligne à <b>${eur(B.fc*6)}</b> qui ferait baisser ton coût unitaire de <b>18 %</b> — mais ajouterait <b>${eur(B.fc*.35)}</b> de charges fixes par mois.
   <br><br><b>La banque</b> : elle financerait l'opération à 100 %, sur 5 ans.
   <br><br>Tes chiffres : charges fixes <b>${eur(B.fc)}</b>/mois · EBITDA du mois <b>${eur(ebM(h))}</b> · marge unitaire <b>${eur(B.price-B.mc)}</b>.
   <br><br>Avant de choisir : que deviendrait ton point mort si tu prends les deux ?`;},
 options:[
  {k:"A", label:"Les deux : la ligne, financée par la dette", term:"Tu maximises. Coût unitaire en baisse, aucune sortie de cash.", q:-2},
  {k:"B", label:"La ligne, payée sur ta trésorerie", term:"Un seul levier : l'opérationnel. Pas de dette.", q:2},
  {k:"C", label:"Rien pour l'instant", term:"Tu gardes ta structure souple.", q:0},
  {k:"D", label:"Une demi-ligne, autofinancée", term:"La moitié du gain, la moitié du risque fixe.", q:1}
 ],
 apply:(B,k)=>{
   const inv=B.fc*6, dotM=inv/60;
   if(k==="A"){ B.loans.push(mkLoan(Math.round(inv),.05,60,"Financement équipement")); B.cash+=inv;
     B.cash-=inv; B.capex=(B.capex||0)+inv; B.amortM=(B.amortM||0)+dotM; B.fc+=B.fc*.35+dotM; B.mc*=.82; B.deuxLeviers=true; }
   if(k==="B"){ B.cash-=inv; B.capex=(B.capex||0)+inv; B.amortM=(B.amortM||0)+dotM; B.fc+=B.fc*.35+dotM; B.mc*=.82; }
   if(k==="C"){ B.flexible=true; }
   if(k==="D"){ const i2=inv/2, d2=i2/60; B.cash-=i2; B.capex=(B.capex||0)+i2; B.amortM=(B.amortM||0)+d2; B.fc+=B.fc*.18+d2; B.mc*=.91; }
 },
 debrief:(B,k)=>`
  <p><b>Un levier multiplie ce qui arrive — dans les deux sens.</b> Le levier <b>opérationnel</b> transforme du coût variable en coût fixe : ta marge unitaire monte, ton point mort aussi. Le levier <b>financier</b> remplace des fonds propres par de la dette : ton rendement monte, et ton obligation de payer devient inconditionnelle. Chacun, seul, est un outil. <b>Ensemble, ils se multiplient l'un l'autre.</b></p>
  <p><b>Le calcul qu'il fallait poser.</b> Ton point mort vaut charges fixes ÷ marge unitaire. Les charges fixes augmentent de 35 % et la marge unitaire de 18 % : <b>ton point mort monte d'environ 15 %</b> — il te faut vendre 15 % de plus pour simplement exister. Ajoute une mensualité de dette, qui ne dépend pas non plus de tes ventes, et tu as empilé deux obligations fixes sur un chiffre d'affaires qui, lui, reste variable.</p>
  <p><b>C'est exactement ce qui se passe quand l'activité recule de 20 %.</b> Sans levier, tu gagnes moins. Avec un levier, tu perds. Avec les deux, tu es en défaut — parce que ni les charges fixes ni les mensualités ne reculent avec ton chiffre d'affaires. <b>A est le seul piège à −2 de tout le niveau</b>, et c'est aussi l'option qui paraît la plus intelligente : elle ne coûte rien tout de suite.</p>
  <p><b>La règle qu'un directeur financier applique sans même y penser : un seul levier à la fois.</b> Si tu veux l'outil, paie-le comptant. Si tu veux la dette, garde ta structure de coûts souple. Et si ta visibilité est mauvaise, ne prends ni l'un ni l'autre — <b>C n'est pas de la frilosité, c'est le prix de l'option d'attendre</b>, et cette option vaut cher quand on ne sait pas où va la demande.</p>`,
 grid:[
  "Avoir recalculé le POINT MORT après l'investissement, pas seulement la marge unitaire.",
  "Avoir vu que charges fixes et mensualités sont deux obligations indépendantes du CA.",
  "Avoir simulé un recul d'activité de 20 % avant de cumuler les deux leviers.",
  "Avoir compris qu'un seul levier à la fois est une règle, pas une préférence."
 ]},

{id:"n2amort", lvl:2, type:"choice", ch:4, icon:"📉", title:"La charge qui ne sort pas de ta poche",
 concept:"Charge vs décaissement · provision · dotation", lesson:"b3",
 when:B=>B.level>=2 && B.month>=22 && B.ar>0,
 signal:"Ton comptable a passé une écriture que tu n'as pas demandée, et ton résultat a baissé sans que ton compte bouge.",
 gate:{ask:"Quel a été ton EBITDA du dernier mois ?", unit:"€", pal:2, tol:.05, plancher:120,
   val:B=>{const h=B.hist[B.hist.length-1]; return h?ebM(h):null;},
   how:"EBITDA = marge brute − charges fixes décaissées. AVANT dotations.",
   why:"Toute la question de ce cas tient dans l'écart entre cet EBITDA et ton résultat net : ce qui les sépare, ce sont des charges qui ne sortent pas de ta poche. Si tu ne sais pas lequel des deux tu es en train de regarder, tu ne peux pas juger l'option."},
 setup:B=>`Clôture de l'exercice. Deux écritures te sont proposées, et aucune des deux ne fait bouger ton compte en banque.
   <br><br><b>1. La dotation aux amortissements</b> sur ton matériel : une charge annuelle qui étale le prix payé sur la durée de vie.
   <br><br><b>2. Une provision</b> sur une créance de <b>${eur(Math.round(B.ar*.3))}</b> dont le client ne répond plus depuis quatre mois.
   <br><br>Ton résultat avant ces écritures : positif. Après : nettement moins.
   <br><br>Ta trésorerie : <b>${eur(B.cash)}</b>. Elle ne bougera pas d'un euro dans les deux cas.`,
 options:[
  {k:"A", label:"Tu passes les deux", term:"Résultat en baisse, image fidèle, moins d'impôt.", q:2},
  {k:"B", label:"Tu refuses la provision : le client va payer", term:"Tu gardes un résultat flatteur pour la banque.", q:-2},
  {k:"C", label:"Tu passes la provision, tu discutes l'amortissement", term:"Tu allonges la durée pour lisser la charge.", q:0},
  {k:"D", label:"Tu passes les deux ET tu relances le client le jour même", term:"L'écriture comptable ne remplace pas le recouvrement.", q:2}
 ],
 apply:(B,k)=>{
   const prov=B.ar*.3;
   if(k==="A"){ B.reserves-=prov; B.ar-=prov; B.provision=(B.provision||0)+prov; }
   if(k==="B"){ B.noProvision=true; B.badDebt=(B.badDebt||0)+prov; }
   if(k==="C"){ B.reserves-=prov; B.ar-=prov; B.amortM=(B.amortM||0)*.7; }
   if(k==="D"){ B.reserves-=prov; B.ar-=prov*.6; B.cash+=prov*.4; B.provision=(B.provision||0)+prov; B.dso=Math.max(15,B.dso-8); }
 },
 debrief:(B,k)=>`
  <p><b>Une charge n'est pas un décaissement, et c'est la distinction la plus mal comprise de toute la comptabilité.</b> La dotation aux amortissements constate qu'un bien payé <i>autrefois</i> perd de la valeur <i>aujourd'hui</i> : l'argent est sorti il y a des années. La provision constate qu'une créance ne vaut probablement plus ce qui est écrit : aucun euro ne sort. Les deux font baisser ton résultat sans toucher ton compte en banque.</p>
  <p><b>C'est pour ça que le tableau de flux existe.</b> On part du résultat net, on <b>rajoute</b> les charges non décaissées (dotations, provisions), on retranche la variation du BFR et les investissements : on obtient le cash réellement produit. Un résultat de 50 000 € avec 30 000 € de dotations, ce n'est pas la même entreprise qu'un résultat de 50 000 € sans aucune dotation — la première génère 80 000 € de cash d'exploitation.</p>
  <p><b>B est le piège de la vanité comptable, et il se retourne toujours.</b> Refuser une provision pour garder un beau résultat, c'est afficher à l'actif une créance que tu sais douteuse — et payer de l'impôt sur un profit que tu n'encaisseras jamais. Ton banquier, lui, retraite ça en dix minutes : il regarde l'antériorité de tes créances. <b>Tu ne trompes que toi.</b></p>
  <p><b>D est la seule réponse complète, et la nuance vaut le détour.</b> Provisionner est un acte <i>comptable</i> : ça constate une perte probable. Relancer est un acte <i>commercial</i> : ça essaie de l'éviter. Beaucoup de dirigeants croient qu'en provisionnant ils ont « traité » le problème — ils ont seulement arrêté de se mentir sur sa taille. <b>L'écriture ne récupère pas un euro.</b></p>`,
 grid:[
  "Avoir séparé ce qui fait baisser le RÉSULTAT de ce qui fait baisser la TRÉSORERIE.",
  "Avoir compris qu'on rajoute les dotations au résultat pour obtenir le cash d'exploitation.",
  "Avoir refusé de gonfler le résultat en laissant une créance douteuse à l'actif.",
  "Avoir vu que provisionner ne remplace pas relancer."
 ]},

{id:"n2concentration", lvl:2, type:"choice", ch:4, icon:"🎯", title:"Un client pèse 40 % de ton chiffre",
 concept:"Risque de concentration · pouvoir de négociation", lesson:"a1",
 when:B=>B.level>=2 && B.month>=26 && B.b2b && B.b2bShare>=.4,
 signal:"Leur acheteur a changé. Le nouveau t'a demandé ta structure de coûts « pour mieux travailler ensemble ».",
 gate:{ask:"Ce client pèse 40 % de ton chiffre. Combien de CA mensuel représente-t-il ?", unit:"€", pal:1, tol:.06, plancher:150,
   val:B=>{const h=B.hist[B.hist.length-1]; return h&&h.ca?Math.round(h.ca*.40):null;},
   how:"40 % × chiffre d'affaires du mois.",
   why:"Un pourcentage ne fait peur à personne ; un montant, si. C'est cette somme-là qui disparaît du jour au lendemain s'il part — et tes charges fixes, elles, resteront exactement les mêmes le mois suivant."},
 setup:B=>{const h=B.hist[B.hist.length-1]||{ca:0};
  return `Ta chaîne d'épiceries pèse désormais <b>${Math.round((B.b2bShare||0)*100)} %</b> de ton chiffre d'affaires — environ <b>${eur(Math.round(h.ca*(B.b2bShare||0)))}</b> par mois.
   <br><br>Ils te demandent <b>−7 % sur tes tarifs</b> pour l'année prochaine, « comme tous leurs fournisseurs ». Et ils rappellent, sans insister, qu'ils référencent deux torréfacteurs concurrents.
   <br><br>Ta marge unitaire actuelle : <b>${eur(B.price-B.mc)}</b> sur un prix de <b>${eur(B.price)}</b>. Une baisse de 7 % du prix, c'est <b>${Math.round(B.price*.07/(B.price-B.mc)*100)} %</b> de ta marge unitaire.
   <br><br>Ta trésorerie : <b>${eur(B.cash)}</b>.`;},
 options:[
  {k:"A", label:"Tu acceptes : tu ne peux pas perdre 40 % de ton CA", term:"Tu préserves le volume.", q:-1},
  {k:"B", label:"Tu refuses net", term:"Tu tiens ton prix et tu prends le risque.", q:0},
  {k:"C", label:"Tu accordes 3 % contre un engagement de volume ferme", term:"Tu échanges de la marge contre de la visibilité contractuelle.", q:2},
  {k:"D", label:"Tu acceptes, et tu lances la reconquête du direct en parallèle", term:"Tu paies le temps de réduire ta dépendance.", q:2}
 ],
 apply:(B,k)=>{
   if(k==="A"){ B.price*=.93; B.concentration=true; }
   if(k==="B"){ if(Math.random()<.5){ B.demandMult*=.62; B.b2b=false; B.b2bShare=0; B.perduGrandCompte=true; } else { B.rep=Math.min(1.25,B.rep+.04); } }
   if(k==="C"){ B.price*=.97; B.engagementVolume=true; B.demandMult*=1.05; B.growth=Math.max(B.growth,1.03); }
   if(k==="D"){ B.price*=.93; B.fc+=Math.round(B.fc*.08); B.b2bShare=Math.max(.2,(B.b2bShare||0)-.15); B.dso=Math.max(15,B.dso-10); B.reconquete=true; }
 },
 debrief:(B,k)=>`
  <p><b>Ce n'est pas une négociation de prix, c'est le prix de ta dépendance — et il t'est présenté avec un an de retard.</b> Le moment où tu as perdu ce rapport de force, c'est le jour où ce client est passé de 15 à 40 % de ton chiffre d'affaires. Tout ce qui se joue aujourd'hui n'est que la facture de cette évolution.</p>
  <p><b>Le calcul qu'il fallait poser.</b> −7 % sur le prix, ce n'est pas −7 % sur la marge : c'est <b>${Math.round(B.price*.07/Math.max(.01,B.price-B.mc)*100)} %</b> de ta marge unitaire qui disparaît, parce que tes coûts, eux, ne baissent pas de 7 %. C'est l'erreur d'arithmétique la plus coûteuse du commerce : <b>une remise sur le prix se mesure toujours en pourcentage de la MARGE</b>, jamais du prix.</p>
  <p><b>A et B sont les deux faces de la même absence de stratégie.</b> Accepter sans contrepartie, c'est enseigner à l'acheteur que la demande fonctionne — il reviendra l'an prochain, et tu n'auras aucune raison de refuser alors que tu n'en avais aucune cette fois-ci. Refuser net sans avoir préparé d'alternative, c'est parier 40 % de ton activité sur un bluff que tu n'as pas les moyens de tenir.</p>
  <p><b>C et D sont justes parce qu'ils achètent quelque chose avec la remise.</b> C achète de la visibilité : un engagement de volume ferme transforme une menace récurrente en contrat, et rend ton prévisionnel finançable. D achète du temps : tu paies 7 % pendant que tu reconstruis du direct, et l'an prochain tu négocies à 25 % de dépendance au lieu de 40. <b>Une remise n'est jamais une perte si elle achète autre chose — c'est une perte si elle n'achète que la paix.</b></p>`,
 grid:[
  "Avoir converti la remise sur le PRIX en pourcentage de la MARGE.",
  "Avoir identifié que le problème date du jour où la dépendance s'est installée.",
  "Avoir exigé une contrepartie : volume ferme, durée, exclusivité — quelque chose.",
  "Avoir traité la dépendance elle-même, et pas seulement la demande de remise."
 ]},

{id:"n2earnout", lvl:2, type:"choice", ch:5, icon:"🤝", title:"Payer maintenant, ou payer si ça marche",
 concept:"Structuration du prix · earn-out · crédit-vendeur", lesson:"j6",
 when:B=>B.level>=2 && B.acquired && B.month>=32,
 signal:"Le vendeur a accepté ton prix sans discuter le montant, mais il insiste beaucoup sur le calendrier de paiement.",
 gate:{ask:"Prix arrêté et financement bancaire maximum connus : combien dois-tu trouver ailleurs ?", unit:"€", pal:9, tol:.06, plancher:500,
   val:B=>sc(B,1440000)-sc(B,900000),
   how:"Solde à financer = prix des titres − ce que la banque accepte de prêter.",
   why:"Ce trou-là se bouche avec ta trésorerie, un earn-out, un crédit-vendeur — ou il ne se bouche pas. Les quatre options ne sont que quatre façons de le remplir : tant que tu ne l'as pas chiffré, tu choisis une histoire, pas un montage."},
 setup:B=>`Prix arrêté : <b>${eur(sc(B,1440000))}</b>. Reste à décider comment tu le paies — et c'est là que tout se joue.
   <br><br>Tu as <b>${eur(B.cash)}</b> en banque. La banque financerait jusqu'à ${eur(sc(B,900000))} sur 7 ans.
   <br><br>Le vendeur reste dirigeant un an, puis part. Il affirme que l'EBITDA de ${eur(sc(B,300000))} tient tout seul ; tu penses qu'une partie dépend de lui.
   <br><br>Personne ne peut trancher ce désaccord aujourd'hui. C'est exactement ce que la structure du prix sert à régler.`,
 options:[
  {k:"A", label:"Tout comptant, dette bancaire maximale", term:"Le vendeur est payé, l'affaire est close, tu portes tout le risque.", q:-1},
  {k:"B", label:"60 % au closing, 40 % en earn-out sur l'EBITDA à 2 ans", term:"Tu ne paies le solde que si les résultats tiennent.", q:2},
  {k:"C", label:"70 % au closing, 30 % en crédit-vendeur sur 3 ans", term:"Le vendeur te prête une partie du prix, avec intérêts.", q:1},
  {k:"D", label:"50 % comptant, 25 % earn-out, 25 % crédit-vendeur", term:"Tu combines les deux mécanismes.", q:2}
 ],
 apply:(B,k)=>{
   if(k==="A"){ B.cash-=Math.min(B.cash,sc(B,540000)); B.loans.push(mkLoan(sc(B,900000),.05,84,"Dette d'acquisition")); B.goodwill=(B.goodwill||0)+sc(B,1440000); B.risqueVendeur=true; }
   if(k==="B"){ B.cash-=Math.min(B.cash,sc(B,264000)); B.loans.push(mkLoan(sc(B,600000),.05,84,"Dette d'acquisition")); B.earnout=sc(B,576000); B.goodwill=(B.goodwill||0)+sc(B,864000); }
   if(k==="C"){ B.cash-=Math.min(B.cash,sc(B,308000)); B.loans.push(mkLoan(sc(B,700000),.05,84,"Dette d'acquisition")); B.loans.push(mkLoan(sc(B,432000),.04,36,"Crédit-vendeur")); B.goodwill=(B.goodwill||0)+sc(B,1440000); }
   if(k==="D"){ B.cash-=Math.min(B.cash,sc(B,220000)); B.loans.push(mkLoan(sc(B,500000),.05,84,"Dette d'acquisition")); B.loans.push(mkLoan(sc(B,360000),.04,36,"Crédit-vendeur")); B.earnout=sc(B,360000); B.goodwill=(B.goodwill||0)+sc(B,1080000); }
 },
 debrief:(B,k)=>`
  <p><b>Quand deux parties ne s'accordent pas sur une valeur, on ne coupe pas la poire en deux : on structure.</b> Tu penses que l'EBITDA dépend du dirigeant, il affirme le contraire. Aucun des deux ne peut le prouver aujourd'hui — mais dans deux ans, les chiffres trancheront tout seuls. <b>L'earn-out dit : prouve-le, et je paie.</b> Il ne règle pas le désaccord, il le reporte à la date où il devient vérifiable.</p>
  <p><b>Le crédit-vendeur fait un autre travail, et on les confond souvent.</b> Il n'indexe rien sur la performance : il étale simplement le paiement. Son vrai intérêt est ailleurs — <b>il garde le vendeur créancier</b>, donc intéressé à ce que tu survives, et il te donne un levier de compensation si un passif caché remonte : tu retiens sur les échéances à venir plutôt que d'aller plaider.</p>
  <p><b>A est la pire structure, et c'est la plus demandée par les vendeurs.</b> Tout comptant, c'est payer aujourd'hui la totalité d'un résultat dont tu doutes, avec la dette maximale, en gardant 100 % du risque d'exécution et zéro recours si la réalité déçoit. Tu as transféré tout l'argent et gardé toute l'incertitude.</p>
  <p><b>Et l'avertissement qui va avec B et D : l'earn-out est la clause la plus procédurière du M&A.</b> Il faut définir l'EBITDA au mot près, dire qui produit les comptes, et surtout écrire ce que l'acheteur <b>s'interdit</b> de faire pendant la période — refacturer des frais de siège, changer les méthodes comptables, réorganiser. Sans ces garde-fous, l'earn-out ne résout pas le litige : il le programme.</p>`,
 grid:[
  "Avoir vu que la structure du prix sert à régler un désaccord de VALEUR, pas de trésorerie.",
  "Avoir distingué earn-out (indexé sur la performance) et crédit-vendeur (simple étalement).",
  "Avoir refusé de payer comptant un résultat dont on doute.",
  "Avoir anticipé la définition contractuelle de l'EBITDA et les engagements de l'acheteur."
 ]},

];
