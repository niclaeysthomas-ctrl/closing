// LE CLOSING — LES EXOS : l'échelle des calculs, depuis le tout début.
// Ajouté le 2026-09-21, sur « je me suis rendu compte que je n'ai pas les
// bases : tu me donnes les infos et je dois calculer ».
//
// CE QUI N'EXISTAIT PAS. Les CASCADES sont des raisonnements qu'il
// s'auto-évalue. LE FORMULAIRE est une calculatrice de référence. LES
// PALIERS expliquent l'énoncé d'un cas. Nulle part l'app ne lui DONNAIT
// des chiffres, ne le faisait CALCULER, et ne CORRIGEAIT. Et rien ne
// partait des fondations.
//
// LA RÈGLE D'ÉCRITURE, non négociable : on commence par le bas. Le
// palier 1 demande une soustraction. Les bêtas et la structure
// financière n'arrivent qu'au palier 12, et ils ne sont même pas
// atteignables avant d'avoir validé les onze précédents. On ne saute
// pas une marche.
//
// Chaque palier : {id, n, ic, titre, sujet, rappel (la règle AVANT le
// premier exercice), gen(R) -> {contexte, donnees[], questions[]}}.
// gen reçoit un générateur semé : mêmes chiffres tant qu'on ne relance
// pas, chiffres différents à chaque nouvelle série.
// Une question : {q, val, unit, calcul, cle, tol?}
//   unit : "€" · "%" · "×" · "j" · "" (nombre nu)
//   calcul : le calcul posé, avec SES chiffres
//   cle : ce qu'il faut avoir compris — pas la formule, l'idée

/* Virgule française : un prix unitaire s'interpole brut dans le corrigé
   (${p}, ${cv}, ${m}) et sortait « 4.35 » au milieu d'une phrase en
   français. Les montants passent par eur() et les taux par toFixed, qui
   commutent déjà ; ce sont les prix unitaires qui manquaient. */
function vf(x){ return String(Math.round(x*100)/100).replace(".",","); }

const EXOS = [

/* ============ 1 ============ */
{id:"e1", n:1, ic:"🧾", titre:"Lire un compte de résultat",
 sujet:"Chiffre d'affaires, coût des ventes, marge brute, taux de marge",
 rappel:`Un compte de résultat se lit <b>de haut en bas</b>, et chaque ligne se déduit de la précédente.
   <br><br><b>Marge brute = chiffre d'affaires − coût des ventes.</b> Le coût des ventes, ce sont les achats <i>consommés</i> pour produire ce que tu as vendu — la matière, pas le loyer.
   <br><br><b>Taux de marge brute = marge brute ÷ chiffre d'affaires</b>, en pourcentage. C'est le premier chiffre qu'un financier regarde : il dit ce qu'il te reste sur 100 € vendus, avant d'avoir payé quoi que ce soit d'autre.`,
 gen:R=>{
  const ca=R.ent(80,400)*1000, tx=R.ent(28,62)/100;
  const cv=Math.round(ca*(1-tx)/1000)*1000, mb=ca-cv;
  return {contexte:"Un mois d'activité, rien de plus.",
   donnees:[["Chiffre d'affaires",ca,"€"],["Coût des ventes",cv,"€"]],
   questions:[
    {q:"Quelle est la marge brute ?", val:mb, unit:"€",
     calcul:`${eur(ca)} − ${eur(cv)} = <b>${eur(mb)}</b>`,
     cle:"La marge brute ne se devine pas : c'est une soustraction. Tout le reste du compte de résultat part de là."},
    {q:"Quel est le taux de marge brute, en % ?", val:mb/ca*100, unit:"%", tol:.3,
     calcul:`${eur(mb)} ÷ ${eur(ca)} = <b>${(mb/ca*100).toFixed(1).replace(".",",")} %</b>`,
     cle:"Sur 100 € vendus, il t'en reste "+(mb/ca*100).toFixed(0).replace(".",",")+" € pour payer TOUT le reste : salaires, loyer, impôts, et toi."}
   ]};}},

/* ============ 2 ============ */
{id:"e2", n:2, ic:"📊", titre:"Les soldes intermédiaires",
 sujet:"EBITDA, EBIT, résultat net, marge nette",
 rappel:`La cascade complète, dans l'ordre, et chaque ligne enlève quelque chose :
   <br><br><b>EBITDA</b> = marge brute − charges fixes décaissées (salaires, loyer, frais). C'est ce que le métier produit <i>avant</i> toute décision comptable ou financière. C'est le chiffre du banquier.
   <br><b>EBIT</b> = EBITDA − dotations aux amortissements. L'amortissement est une charge qui ne sort pas de ta poche : il constate l'usure d'une machine déjà payée.
   <br><b>Résultat avant impôt</b> = EBIT − charges financières (les intérêts).
   <br><b>Résultat net</b> = résultat avant impôt − impôt.
   <br><br><b>Marge nette = résultat net ÷ chiffre d'affaires.</b> C'est le chiffre de l'actionnaire.`,
 gen:R=>{
  const ca=R.ent(100,500)*1000, mb=Math.round(ca*R.ent(38,58)/100/1000)*1000;
  const fixes=Math.round(mb*R.ent(45,78)/100/1000)*1000;
  const dot=Math.round(ca*R.ent(2,5)/100/1000)*1000;
  const int=Math.round(ca*R.ent(1,3)/100/1000)*1000;
  const ebitda=mb-fixes, ebit=ebitda-dot, rcai=ebit-int;
  const is=Math.round(Math.max(0,rcai)*.25), rn=rcai-is;
  return {contexte:"Le même mois, ligne par ligne. L'impôt sur les sociétés est à 25 %.",
   donnees:[["Chiffre d'affaires",ca,"€"],["Marge brute",mb,"€"],["Charges fixes décaissées",fixes,"€"],
            ["Dotation aux amortissements",dot,"€"],["Intérêts d'emprunt",int,"€"]],
   questions:[
    {q:"Quel est l'EBITDA ?", val:ebitda, unit:"€",
     calcul:`${eur(mb)} − ${eur(fixes)} = <b>${eur(ebitda)}</b>`,
     cle:"L'EBITDA est AVANT dotations. C'est pour ça qu'un banquier le préfère : il ne dépend pas de la politique d'amortissement, donc il se compare d'une boîte à l'autre."},
    {q:"Quel est l'EBIT (résultat d'exploitation) ?", val:ebit, unit:"€",
     calcul:`${eur(ebitda)} − ${eur(dot)} = <b>${eur(ebit)}</b>`,
     cle:"La dotation EST une charge, même si aucun euro ne bouge ce mois-ci. La différence EBITDA − EBIT, c'est exactement l'usure de ton outil."},
    {q:"Quel est le résultat net ?", val:rn, unit:"€",
     calcul:`EBIT ${eur(ebit)} − intérêts ${eur(int)} = ${eur(rcai)} · impôt 25 % = ${eur(is)} · reste <b>${eur(rn)}</b>`,
     cle:"Trois étages séparent l'EBITDA du résultat net : l'usure, la banque, l'État. Confondre les deux, c'est confondre ce que le métier produit et ce qui te revient."},
    {q:"Quelle est la marge nette, en % ?", val:rn/ca*100, unit:"%", tol:.3,
     calcul:`${eur(rn)} ÷ ${eur(ca)} = <b>${(rn/ca*100).toFixed(1).replace(".",",")} %</b>`,
     cle:"Une marge nette de 5 % veut dire qu'une baisse de 5 % du CA, à charges fixes constantes, efface tout le résultat. C'est pour ça que ce chiffre fait peur quand on le regarde vraiment."}
   ]};}},

/* ============ 3 ============ */
{id:"e3", n:3, ic:"⚖️", titre:"Le point mort",
 sujet:"Marge sur coût variable, seuil de rentabilité, marge de sécurité",
 rappel:`Il y a deux natures de charges, et tout part de là.
   <br><br>Les <b>charges variables</b> suivent le volume (la matière). Les <b>charges fixes</b> tombent que tu vendes ou non (le loyer).
   <br><br><b>Marge sur coût variable unitaire = prix de vente − coût variable unitaire.</b> C'est ce que chaque unité vendue rapporte pour payer les charges fixes.
   <br><b>Point mort en volume = charges fixes ÷ marge unitaire.</b> Le nombre d'unités à vendre juste pour ne rien gagner.
   <br><b>Marge de sécurité = (ventes réelles − point mort) ÷ ventes réelles.</b> De combien tes ventes peuvent tomber avant que tu perdes de l'argent.`,
 gen:R=>{
  const p=R.ent(8,45), cv=Math.round(p*R.ent(40,70)/100*100)/100;
  const m=Math.round((p-cv)*100)/100;
  const fx=R.ent(20,90)*100, pm=Math.ceil(fx/m), vendu=Math.round(pm*(1+R.ent(12,80)/100));
  return {contexte:"Un produit, un prix, des charges fixes mensuelles.",
   donnees:[["Prix de vente unitaire",p,"€u"],["Coût variable unitaire",cv,"€u"],
            ["Charges fixes du mois",fx,"€"],["Unités réellement vendues",vendu,""]],
   questions:[
    {q:"Quelle est la marge sur coût variable par unité ?", val:m, unit:"€", tol:.02,
     calcul:`${vf(p)} € − ${vf(cv)} € = <b>${vf(m)} €</b>`,
     cle:"Chaque unité vendue dépose "+vf(m)+" € dans le pot qui doit remplir les charges fixes. Rien d'autre ne les remplit."},
    {q:"Combien d'unités faut-il vendre pour atteindre le point mort ?", val:pm, unit:"", tol:1,
     calcul:`${eur(fx)} ÷ ${vf(m)} € = <b>${pm} unités</b>`,
     cle:"En dessous, tu perds de l'argent chaque mois quoi que tu fasses. Un dirigeant qui ne connaît pas ce nombre pilote sans compteur."},
    {q:"Quelle est la marge de sécurité, en % des ventes ?", val:(vendu-pm)/vendu*100, unit:"%", tol:.5,
     calcul:`(${vendu} − ${pm}) ÷ ${vendu} = <b>${((vendu-pm)/vendu*100).toFixed(1).replace(".",",")} %</b>`,
     cle:"Tes ventes peuvent baisser de "+((vendu-pm)/vendu*100).toFixed(0).replace(".",",")+" % avant que tu passes dans le rouge. En dessous de 15 %, tu dors mal."}
   ]};}},

/* ============ 4 ============ */
{id:"e4", n:4, ic:"🔄", titre:"Le besoin en fonds de roulement",
 sujet:"BFR, BFR en jours de CA, DSO, DPO",
 rappel:`Le BFR, c'est <b>l'argent que ton cycle immobilise en permanence</b> — de l'argent qui t'appartient et que tu n'as pas.
   <br><br><b>BFR = stock + créances clients − dettes fournisseurs.</b> Tes clients te financent quand ils paient d'avance, tes fournisseurs te financent quand ils attendent.
   <br><br><b>BFR en jours de CA = BFR ÷ CA annuel × 365.</b> La seule façon de comparer deux entreprises de tailles différentes.
   <br><b>DSO = créances ÷ CA × 365</b> : le nombre de jours que mettent tes clients à te payer.
   <br><b>DPO = dettes fournisseurs ÷ achats × 365</b> : le nombre de jours que tu mets à payer les tiens.`,
 gen:R=>{
  const caA=R.ent(600,2800)*1000, achats=Math.round(caA*R.ent(45,65)/100/1000)*1000;
  const stock=Math.round(achats*R.ent(8,22)/100/1000)*1000;
  const cr=Math.round(caA*R.ent(9,22)/100/1000)*1000;
  const fo=Math.round(achats*R.ent(10,25)/100/1000)*1000;
  const bfr=stock+cr-fo;
  return {contexte:"Un bilan au 31 décembre, et l'activité de l'année écoulée.",
   donnees:[["Chiffre d'affaires annuel",caA,"€"],["Achats de l'année",achats,"€"],
            ["Stock",stock,"€"],["Créances clients",cr,"€"],["Dettes fournisseurs",fo,"€"]],
   questions:[
    {q:"Quel est le BFR ?", val:bfr, unit:"€",
     calcul:`${eur(stock)} + ${eur(cr)} − ${eur(fo)} = <b>${eur(bfr)}</b>`,
     cle:"Cette somme dort dans ta machine en permanence. Elle grandit avec ton chiffre d'affaires : c'est pour ça que la croissance dévore du cash."},
    {q:"Combien de jours de chiffre d'affaires cela représente-t-il ?", val:bfr/caA*365, unit:"j", tol:1.5,
     calcul:`${eur(bfr)} ÷ ${eur(caA)} × 365 = <b>${Math.round(bfr/caA*365)} jours</b>`,
     cle:"C'est le chiffre qui se compare. Un BFR de 60 jours veut dire que deux mois de ton chiffre d'affaires sont immobilisés en permanence, quoi qu'il arrive."},
    {q:"Quel est le DSO (délai de paiement de tes clients), en jours ?", val:cr/caA*365, unit:"j", tol:1.5,
     calcul:`${eur(cr)} ÷ ${eur(caA)} × 365 = <b>${Math.round(cr/caA*365)} jours</b>`,
     cle:"Chaque jour de DSO gagné rend du cash immédiatement, sans emprunter, sans diluer. C'est le gisement le moins cher qui existe — et le plus souvent ignoré."}
   ]};}},

/* ============ 5 ============ */
{id:"e5", n:5, ic:"🌊", titre:"Du résultat à la trésorerie",
 sujet:"Flux d'exploitation, variation de trésorerie",
 rappel:`Un mois peut être bénéficiaire et vider ta caisse. La réconciliation tient en une ligne :
   <br><br><b>Flux d'exploitation = résultat net + dotations − variation du BFR.</b>
   <br>On <b>rajoute</b> les dotations parce qu'elles ont réduit le résultat sans sortir un euro. On <b>retire</b> la hausse du BFR parce que cet argent existe mais dort.
   <br><br><b>Variation de trésorerie = flux d'exploitation − investissements + financement.</b>
   <br>L'investissement sort en ENTIER l'année où tu paies. Le remboursement du capital d'un emprunt sort ici aussi — jamais au compte de résultat.`,
 gen:R=>{
  const rn=R.ent(20,160)*1000, dot=R.ent(8,60)*1000, dbfr=R.ent(-30,90)*1000;
  const capex=R.ent(0,140)*1000, emprunt=R.ent(0,120)*1000, remb=R.ent(5,50)*1000;
  const fe=rn+dot-dbfr, dcash=fe-capex+emprunt-remb;
  return {contexte:"Une année complète. Attention aux signes.",
   donnees:[["Résultat net",rn,"€"],["Dotations aux amortissements",dot,"€"],
            ["Variation du BFR",dbfr,"€"],["Investissements payés",capex,"€"],
            ["Emprunt débloqué",emprunt,"€"],["Capital d'emprunt remboursé",remb,"€"]],
   questions:[
    {q:"Quel est le flux de trésorerie d'exploitation ?", val:fe, unit:"€",
     calcul:`${eur(rn)} + ${eur(dot)} − ${eur(dbfr)} = <b>${eur(fe)}</b>`,
     cle:"C'est le seul chiffre qui dit si ton MÉTIER produit du cash. Durablement négatif, c'est mortel — même avec un résultat positif."},
    {q:"Quelle est la variation de trésorerie de l'année ?", val:dcash, unit:"€",
     calcul:`${eur(fe)} − ${eur(capex)} + ${eur(emprunt)} − ${eur(remb)} = <b>${eur(dcash)}</b>`,
     cle:"Trois flux, trois questions : le métier produit-il ? est-ce que j'investis ? qui finance ? Une trésorerie qui monte grâce à un emprunt n'est pas une performance."}
   ]};}},

/* ============ 6 ============ */
{id:"e6", n:6, ic:"🏛️", titre:"La structure du bilan",
 sujet:"Dette nette, gearing, dette nette / EBITDA, couverture des intérêts",
 rappel:`Quatre ratios qu'un prêteur regarde avant toi.
   <br><br><b>Dette nette = dettes financières − trésorerie.</b> Ce que tu dois VRAIMENT, une fois ton cash déduit.
   <br><b>Gearing = dette nette ÷ capitaux propres.</b> Au-delà de 1, tu dois plus que tu ne possèdes.
   <br><b>Levier = dette nette ÷ EBITDA.</b> Le nombre d'années d'EBITDA qu'il faudrait pour tout rembourser. Au-delà de 3,5×, la plupart des banques ferment le robinet.
   <br><b>Couverture des intérêts = EBIT ÷ intérêts.</b> Combien de fois ton résultat d'exploitation paie tes intérêts. En dessous de 3, on s'inquiète ; en dessous de 1,5, on refinance en urgence.`,
 gen:R=>{
  const dettes=R.ent(200,1800)*1000, tresorerie=R.ent(20,400)*1000;
  const cp=R.ent(250,1600)*1000, ebitda=R.ent(120,700)*1000;
  const dot=Math.round(ebitda*R.ent(12,35)/100/1000)*1000, ebit=ebitda-dot;
  const int=Math.round(dettes*R.ent(3,6)/100/1000)*1000;
  const dn=dettes-tresorerie;
  return {contexte:"Le bilan et le compte de résultat d'une année.",
   donnees:[["Dettes financières",dettes,"€"],["Trésorerie",tresorerie,"€"],["Capitaux propres",cp,"€"],
            ["EBITDA",ebitda,"€"],["Dotations",dot,"€"],["Intérêts payés",int,"€"]],
   questions:[
    {q:"Quelle est la dette nette ?", val:dn, unit:"€",
     calcul:`${eur(dettes)} − ${eur(tresorerie)} = <b>${eur(dn)}</b>`,
     cle:"On raisonne toujours en dette NETTE : 1 M€ de dette avec 900 k€ en banque, ce n'est pas 1 M€ de problème."},
    {q:"Quel est le levier (dette nette / EBITDA) ?", val:dn/ebitda, unit:"×", tol:.06,
     calcul:`${eur(dn)} ÷ ${eur(ebitda)} = <b>${(dn/ebitda).toFixed(2).replace(".",",")}×</b>`,
     cle:(dn/ebitda)>3.5?"Au-dessus de 3,5× : à ce niveau, une banque ne prête plus et un covenant saute.":"En dessous de 3,5× : la structure tient, il reste de la place pour emprunter."},
    {q:"Quelle est la couverture des intérêts (EBIT / intérêts) ?", val:ebit/int, unit:"×", tol:.1,
     calcul:`${eur(ebit)} ÷ ${eur(int)} = <b>${(ebit/int).toFixed(1).replace(".",",")}×</b>`,
     cle:"Ce ratio dit si tu peux PAYER ta dette cette année. Le levier dit si tu peux la REMBOURSER un jour. Les deux, pas l'un ou l'autre."}
   ]};}},

/* ============ 7 ============ */
{id:"e7", n:7, ic:"📈", titre:"La rentabilité",
 sujet:"ROCE, ROE, et la décomposition marge × rotation",
 rappel:`Gagner de l'argent ne suffit pas : il faut savoir <b>avec combien de capital</b> tu l'as gagné.
   <br><br><b>Capitaux engagés = immobilisations + BFR.</b> L'argent immobilisé dans l'outil et dans le cycle.
   <br><b>ROCE = EBIT après impôt ÷ capitaux engagés.</b> La rentabilité de l'OUTIL, indépendamment de qui l'a financé.
   <br><b>ROE = résultat net ÷ capitaux propres.</b> La rentabilité pour l'ACTIONNAIRE — elle, elle dépend de la dette.
   <br><br><b>Décomposition : ROCE = marge opérationnelle × rotation des capitaux</b>, avec rotation = CA ÷ capitaux engagés. Deux chemins vers la même rentabilité : vendre cher peu souvent, ou vendre peu cher très souvent.`,
 gen:R=>{
  const ca=R.ent(900,4000)*1000, ebit=Math.round(ca*R.ent(6,18)/100/1000)*1000;
  const immo=R.ent(300,1600)*1000, bfr=R.ent(80,700)*1000;
  const cp=R.ent(300,1400)*1000, rn=Math.round(ebit*R.ent(50,80)/100/1000)*1000;
  const ce=immo+bfr, nopat=Math.round(ebit*.75);
  return {contexte:"Une entreprise sur un exercice. L'impôt est à 25 %.",
   donnees:[["Chiffre d'affaires",ca,"€"],["EBIT",ebit,"€"],["Immobilisations",immo,"€"],
            ["BFR",bfr,"€"],["Capitaux propres",cp,"€"],["Résultat net",rn,"€"]],
   questions:[
    {q:"Quels sont les capitaux engagés ?", val:ce, unit:"€",
     calcul:`${eur(immo)} + ${eur(bfr)} = <b>${eur(ce)}</b>`,
     cle:"On oublie presque toujours le BFR dans les capitaux engagés. C'est pourtant de l'argent immobilisé aussi sûrement qu'une machine."},
    {q:"Quel est le ROCE, en % ?", val:nopat/ce*100, unit:"%", tol:.4,
     calcul:`EBIT après impôt ${eur(nopat)} ÷ ${eur(ce)} = <b>${(nopat/ce*100).toFixed(1).replace(".",",")} %</b>`,
     cle:"Le ROCE se compare au coût du capital. S'il est en dessous, l'entreprise détruit de la valeur en grandissant — et c'est contre-intuitif au point que beaucoup ne le voient jamais."},
    {q:"Quel est le ROE, en % ?", val:rn/cp*100, unit:"%", tol:.4,
     calcul:`${eur(rn)} ÷ ${eur(cp)} = <b>${(rn/cp*100).toFixed(1).replace(".",",")} %</b>`,
     cle:"Un ROE élevé peut venir d'une belle performance… ou simplement de beaucoup de dette. C'est exactement le sujet du dernier palier."},
    {q:"Quelle est la rotation des capitaux engagés (CA / capitaux engagés) ?", val:ca/ce, unit:"×", tol:.06,
     calcul:`${eur(ca)} ÷ ${eur(ce)} = <b>${(ca/ce).toFixed(2).replace(".",",")}×</b>`,
     cle:"Un hypermarché a une marge minuscule et une rotation énorme ; un joaillier l'inverse. Même ROCE possible, deux métiers opposés."}
   ]};}},

/* ============ 8 ============ */
{id:"e8", n:8, ic:"⏳", titre:"La valeur du temps",
 sujet:"Actualisation, valeur actuelle nette, taux de rendement",
 rappel:`Un euro dans un an vaut moins qu'un euro aujourd'hui — parce qu'aujourd'hui tu peux le placer.
   <br><br><b>Valeur actuelle d'un flux = flux ÷ (1 + t)^n</b>, où t est le taux d'actualisation et n le nombre d'années.
   <br><b>VAN = somme des flux actualisés − investissement initial.</b> Si elle est positive, le projet crée de la valeur au taux exigé.
   <br><br>Et le raccourci qui sert tous les jours : <b>valeur d'une rente perpétuelle = flux ÷ taux</b>. Avec croissance g : <b>flux ÷ (t − g)</b>.`,
 gen:R=>{
  const t=R.ent(6,14)/100, f=R.ent(40,200)*1000, n=R.ent(2,5);
  const inv=R.ent(200,900)*1000, fx=R.ent(60,220)*1000;
  const va=f/Math.pow(1+t,n);
  const perp=fx/t;
  return {contexte:`Le taux d'actualisation exigé est de ${(t*100).toFixed(0).replace(".",",")} %.`,
   donnees:[["Taux d'actualisation",t*100,"%"],[`Flux unique reçu dans ${n} ans`,f,"€"],
            ["Flux annuel perpétuel d'un autre projet",fx,"€"]],
   questions:[
    {q:`Quelle est la valeur actuelle du flux reçu dans ${n} ans ?`, val:va, unit:"€", tol:Math.max(300,va*.015),
     calcul:`${eur(f)} ÷ (1 + ${(t*100).toFixed(0).replace(".",",")} %)<sup>${n}</sup> = ${eur(f)} ÷ ${Math.pow(1+t,n).toFixed(3).replace(".",",")} = <b>${eur(va)}</b>`,
     cle:"Le temps coûte cher : "+Math.round((1-va/f)*100)+" % de la valeur a disparu en "+n+" ans, sans qu'il n'arrive rien."},
    {q:"Quelle est la valeur de la rente perpétuelle ?", val:perp, unit:"€", tol:Math.max(500,perp*.015),
     calcul:`${eur(fx)} ÷ ${(t*100).toFixed(0).replace(".",",")} % = <b>${eur(perp)}</b>`,
     cle:"Diviser par le taux, c'est multiplier par "+(1/t).toFixed(1).replace(".",",")+". C'est le calcul qui fixe la valeur terminale dans toute valorisation — et il est d'une sensibilité redoutable au taux."}
   ]};}},

/* ============ 9 ============ */
{id:"e9", n:9, ic:"🔍", titre:"Les multiples",
 sujet:"VE/EBITDA, PER, passage valeur d'entreprise ↔ prix des titres",
 rappel:`Le piège le plus coûteux de toute la finance d'entreprise tient en une ligne.
   <br><br><b>Valeur d'entreprise (VE) = multiple × EBITDA.</b> C'est la valeur de l'OUTIL, indépendamment de qui l'a financé.
   <br><b>Prix des titres (capitalisation) = VE − dette nette.</b> C'est ce que tu paies aux actionnaires.
   <br><br>Un vendeur annonce presque toujours sa VE en laissant croire que c'est son prix. Ce n'est pas de la malhonnêteté, c'est du métier — et c'est à toi de faire la soustraction.
   <br><br><b>PER = capitalisation ÷ résultat net</b>, ou prix de l'action ÷ bénéfice par action.`,
 gen:R=>{
  const ebitda=R.ent(200,1500)*1000, mult=R.ent(40,95)/10;
  const dettes=R.ent(100,1400)*1000, tres=R.ent(20,300)*1000;
  const rn=Math.round(ebitda*R.ent(25,50)/100/1000)*1000;
  const ve=Math.round(ebitda*mult), dn=dettes-tres, titres=ve-dn;
  return {contexte:`Une cible à vendre. Les transactions du secteur se font autour de ${mult.toFixed(1).replace(".",",")}× l'EBITDA.`,
   donnees:[["EBITDA",ebitda,"€"],["Multiple du secteur",mult,"×"],["Dettes financières",dettes,"€"],
            ["Trésorerie",tres,"€"],["Résultat net",rn,"€"]],
   questions:[
    {q:"Quelle est la valeur d'entreprise ?", val:ve, unit:"€", tol:Math.max(500,ve*.01),
     calcul:`${mult.toFixed(1).replace(".",",")} × ${eur(ebitda)} = <b>${eur(ve)}</b>`,
     cle:"Le multiple s'applique à l'EBITDA et donne une VALEUR D'ENTREPRISE. Jamais un prix d'actions. C'est là que tout se joue."},
    {q:"Combien paies-tu pour les titres (le prix aux actionnaires) ?", val:titres, unit:"€", tol:Math.max(500,Math.abs(titres)*.01),
     calcul:`${eur(ve)} − (${eur(dettes)} − ${eur(tres)}) = ${eur(ve)} − ${eur(dn)} = <b>${eur(titres)}</b>`,
     cle:"Tu reprends la dette avec la boîte : elle se déduit du chèque. Payer la VE comme si c'était le prix des titres, c'est surpayer de "+eur(dn)+" — et ça arrive tous les jours."},
    {q:"Quel est le PER (capitalisation / résultat net) ?", val:titres/rn, unit:"×", tol:.3,
     calcul:`${eur(titres)} ÷ ${eur(rn)} = <b>${(titres/rn).toFixed(1).replace(".",",")}×</b>`,
     cle:"Le PER porte sur le résultat NET, donc après intérêts : il dépend de la structure financière. Le VE/EBITDA, non. Deux outils, deux usages."}
   ]};}},

/* ============ 10 ============ */
{id:"e10", n:10, ic:"💧", titre:"Le flux de trésorerie disponible",
 sujet:"NOPAT, FCFF, FCFE",
 rappel:`Le <b>FCFF</b> (free cash flow to firm) est le flux disponible pour <b>tous</b> les apporteurs de capitaux — banquiers et actionnaires. C'est lui qu'on actualise pour valoriser une entreprise.
   <br><br><b>NOPAT = EBIT × (1 − taux d'impôt).</b> Le résultat d'exploitation après impôt, comme si l'entreprise n'avait aucune dette.
   <br><b>FCFF = NOPAT + dotations − variation du BFR − investissements.</b>
   <br><br>Pourquoi partir de l'EBIT et pas du résultat net ? Parce qu'on veut un flux <b>indépendant du financement</b> : on l'actualisera au coût moyen du capital, qui contient déjà l'effet de la dette. Mettre les intérêts ici les compterait deux fois.
   <br><br><b>FCFE = FCFF − intérêts après impôt − remboursements + nouveaux emprunts.</b> Celui-là revient aux seuls actionnaires.`,
 gen:R=>{
  const ebit=R.ent(300,1600)*1000, tx=.25;
  const dot=R.ent(60,400)*1000, dbfr=R.ent(-60,260)*1000, capex=R.ent(80,500)*1000;
  const int=R.ent(20,160)*1000, remb=R.ent(0,200)*1000, nouv=R.ent(0,250)*1000;
  const nopat=Math.round(ebit*(1-tx));
  const fcff=nopat+dot-dbfr-capex;
  const fcfe=fcff-Math.round(int*(1-tx))-remb+nouv;
  return {contexte:"Un exercice complet. Impôt à 25 %.",
   donnees:[["EBIT",ebit,"€"],["Dotations",dot,"€"],["Variation du BFR",dbfr,"€"],
            ["Investissements",capex,"€"],["Intérêts payés",int,"€"],
            ["Remboursements de dette",remb,"€"],["Nouveaux emprunts",nouv,"€"]],
   questions:[
    {q:"Quel est le NOPAT (EBIT après impôt) ?", val:nopat, unit:"€", tol:Math.max(200,nopat*.01),
     calcul:`${eur(ebit)} × (1 − 25 %) = <b>${eur(nopat)}</b>`,
     cle:"On imagine l'entreprise SANS dette. L'économie d'impôt liée aux intérêts n'est pas oubliée : elle sera dans le coût du capital, au palier suivant."},
    {q:"Quel est le FCFF ?", val:fcff, unit:"€", tol:Math.max(400,Math.abs(fcff)*.01),
     calcul:`${eur(nopat)} + ${eur(dot)} − ${eur(dbfr)} − ${eur(capex)} = <b>${eur(fcff)}</b>`,
     cle:"C'est LE flux des valorisations. Quatre termes, pas un de plus : on remet ce qui n'est pas sorti, on retire ce que le cycle et l'outil immobilisent."},
    {q:"Quel est le FCFE (ce qui revient aux actionnaires) ?", val:fcfe, unit:"€", tol:Math.max(400,Math.abs(fcfe)*.01),
     calcul:`${eur(fcff)} − intérêts après impôt ${eur(Math.round(int*(1-tx)))} − ${eur(remb)} + ${eur(nouv)} = <b>${eur(fcfe)}</b>`,
     cle:"Les intérêts sont retirés APRÈS impôt, parce qu'ils sont déductibles : ils te coûtent réellement 75 % de leur montant affiché."}
   ]};}},

/* ============ 11 ============ */
{id:"e11", n:11, ic:"🏦", titre:"Le coût du capital",
 sujet:"Coût de la dette après impôt, coût des fonds propres, WACC",
 rappel:`Tout capital a un prix, y compris celui que tu crois gratuit.
   <br><br><b>Coût de la dette après impôt = taux × (1 − taux d'impôt).</b> Les intérêts sont déductibles : un emprunt à 5 % avec un IS à 25 % te coûte réellement 3,75 %.
   <br><b>Coût des fonds propres</b> : ce que l'actionnaire exige. Il n'apparaît sur aucune facture, et il est toujours plus élevé que la dette — l'actionnaire est remboursé en dernier, donc il exige plus.
   <br><br><b>WACC = coût des fonds propres × (CP / V) + coût de la dette après impôt × (D / V)</b>, avec V = CP + D, en valeurs de marché.
   <br><br>Le WACC est le taux minimum qu'un projet doit rapporter. En dessous, l'entreprise détruit de la valeur même en étant bénéficiaire.`,
 gen:R=>{
  const cp=R.ent(400,2000)*1000, d=R.ent(200,1600)*1000;
  const td=R.ent(3,8)/100, kcp=R.ent(8,15)/100, tx=.25;
  const kd=td*(1-tx), v=cp+d;
  const wacc=kcp*(cp/v)+kd*(d/v);
  return {contexte:"Une structure de financement, en valeurs de marché. Impôt à 25 %.",
   donnees:[["Capitaux propres",cp,"€"],["Dette financière",d,"€"],
            ["Taux d'intérêt de la dette",td*100,"%"],["Coût des fonds propres exigé",kcp*100,"%"]],
   questions:[
    {q:"Quel est le coût de la dette APRÈS impôt, en % ?", val:kd*100, unit:"%", tol:.1,
     calcul:`${(td*100).toFixed(1).replace(".",",")} % × (1 − 25 %) = <b>${(kd*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"C'est le bouclier fiscal : l'État paie un quart de tes intérêts. C'est la seule raison sérieuse pour laquelle la dette est moins chère que les fonds propres."},
    {q:"Quelle est la part des fonds propres dans le financement, en % ?", val:cp/v*100, unit:"%", tol:.4,
     calcul:`${eur(cp)} ÷ (${eur(cp)} + ${eur(d)}) = <b>${(cp/v*100).toFixed(1).replace(".",",")} %</b>`,
     cle:"Les pondérations se prennent en valeurs de MARCHÉ, pas comptables. C'est l'erreur la plus fréquente dans un WACC d'étudiant."},
    {q:"Quel est le WACC, en % ?", val:wacc*100, unit:"%", tol:.15,
     calcul:`${(kcp*100).toFixed(1).replace(".",",")} % × ${(cp/v*100).toFixed(1).replace(".",",")} % + ${(kd*100).toFixed(2).replace(".",",")} % × ${(d/v*100).toFixed(1).replace(".",",")} % = <b>${(wacc*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"Ce taux est la barre. Un projet à "+(wacc*100).toFixed(1).replace(".",",")+" % de rentabilité ne crée rien : il rembourse exactement ce que le capital coûte."}
   ]};}},

/* ============ 12 ============ */
{id:"e12", n:12, ic:"🧬", titre:"Bêta et structure financière",
 sujet:"MEDAF, bêta désendetté et réendetté, effet de la dette sur le risque",
 rappel:`Le dernier palier, et celui qui ferme la boucle.
   <br><br><b>MEDAF : coût des fonds propres = taux sans risque + β × prime de risque du marché.</b> Le bêta mesure la sensibilité de l'action au marché : β = 1, elle bouge comme le marché ; β = 1,5, elle amplifie de moitié.
   <br><br><b>Le bêta dépend de la structure financière.</b> Plus une entreprise est endettée, plus le résultat qui revient à l'actionnaire est volatil — donc plus son bêta est élevé. On distingue :
   <br>· <b>β désendetté (unlevered, β<sub>u</sub>)</b> : le risque du MÉTIER seul.
   <br>· <b>β endetté (levered, β<sub>L</sub>)</b> : le risque du métier PLUS celui de la dette.
   <br><br><b>Formule de Hamada : β<sub>L</sub> = β<sub>u</sub> × [1 + (1 − IS) × D/CP].</b>
   <br>Pour comparer deux entreprises de secteurs identiques mais d'endettements différents, on <b>désendette</b> le bêta de l'une, puis on le <b>réendette</b> à la structure de l'autre. C'est le geste qu'on fait à chaque valorisation par comparables.`,
 gen:R=>{
  const rf=R.ent(2,4)/100, prm=R.ent(5,8)/100, tx=.25;
  const bl=R.ent(90,180)/100, d1=R.ent(30,120)/100;     /* D/CP du comparable */
  const d2=R.ent(10,150)/100;                            /* D/CP de la cible */
  const bu=bl/(1+(1-tx)*d1);
  const bl2=bu*(1+(1-tx)*d2);
  const kcp=rf+bl2*prm;
  return {contexte:`Tu valorises une cible par comparaison avec une société cotée du même métier. Impôt à 25 %.`,
   donnees:[["Taux sans risque",rf*100,"%"],["Prime de risque du marché",prm*100,"%"],
            ["Bêta endetté du comparable",bl,""],["Dette / capitaux propres du comparable",d1,"×"],
            ["Dette / capitaux propres de la cible",d2,"×"]],
   questions:[
    {q:"Quel est le bêta DÉSENDETTÉ (unlevered) du comparable ?", val:bu, unit:"", tol:.03,
     calcul:`${bl.toFixed(2).replace(".",",")} ÷ [1 + (1 − 25 %) × ${d1.toFixed(2).replace(".",",")}] = ${bl.toFixed(2).replace(".",",")} ÷ ${(1+(1-tx)*d1).toFixed(3).replace(".",",")} = <b>${bu.toFixed(3).replace(".",",")}</b>`,
     cle:"On retire l'effet de SA dette pour ne garder que le risque du métier. C'est ce bêta-là qui est comparable d'une entreprise à l'autre — le bêta endetté, non."},
    {q:"Quel est le bêta RÉENDETTÉ à la structure de la cible ?", val:bl2, unit:"", tol:.03,
     calcul:`${bu.toFixed(3).replace(".",",")} × [1 + (1 − 25 %) × ${d2.toFixed(2).replace(".",",")}] = <b>${bl2.toFixed(3).replace(".",",")}</b>`,
     cle:d2>d1?"La cible est plus endettée : son bêta monte, donc ses actionnaires exigent davantage. La dette ne déplace pas le risque, elle le concentre sur eux.":"La cible est moins endettée : son bêta descend. Moins de dette, moins de volatilité pour l'actionnaire, donc une exigence de rendement plus faible."},
    {q:"Quel est le coût des fonds propres de la cible, en % ?", val:kcp*100, unit:"%", tol:.2,
     calcul:`${(rf*100).toFixed(1).replace(".",",")} % + ${bl2.toFixed(3).replace(".",",")} × ${(prm*100).toFixed(1).replace(".",",")} % = <b>${(kcp*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"Tout se tient : la structure financière change le bêta, le bêta change le coût des fonds propres, et celui-ci change le WACC — donc la valeur. Voilà pourquoi « quel impact la structure financière » n'est jamais une question rhétorique."}
   ]};}}

];
