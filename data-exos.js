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
   français. Les montants passent par eurX() et les taux par toFixed, qui
   commutent déjà ; ce sont les prix unitaires qui manquaient. */
function vf(x){ return String(Math.round(x*100)/100).replace(".",","); }

const EXOS = [

/* ============ 1 ============ */
{id:"e1", n:1, ic:"🧮", titre:"Lire un compte de résultat",
 sujet:"Chiffre d'affaires, coût des ventes, marge brute, taux de marge",
 rappel:`Un compte de résultat se lit <b>de haut en bas</b>, et chaque ligne se déduit de la précédente.
   <br><br><b>Marge brute = chiffre d'affaires − coût des ventes.</b> Le coût des ventes, ce sont les achats <i>consommés</i> pour produire ce que tu as vendu — la matière, pas le loyer.
   <br><br><b>Taux de marge brute = marge brute ÷ chiffre d'affaires</b>, en pourcentage. C'est le premier chiffre qu'un financier regarde : il dit ce qu'il te reste sur 100 € vendus, avant d'avoir payé quoi que ce soit d'autre.`,
 gen:R=>{
  const ca=R.ent(80,400)*1000, tx=R.ent(28,62)/100;
  const cv=Math.round(ca*(1-tx)/1000)*1000, mb=ca-cv;
  const rem=R.ent(4,9), cv2=Math.round(cv*(1+R.ent(6,14)/100)/100)*100, loyer=R.ent(8,30)*100;
  const hausse=R.ent(5,12), cibleM=Math.round(mb*(1+R.ent(20,60)/100)/100)*100;
  return {contextes:["Un mois d'activité dans un atelier de torréfaction, rien de plus.",
    "Le mois écoulé d'une boutique de vélos. Deux lignes, pas une de plus.",
    "Un mois chez un traiteur. Rien d'autre que le haut du compte.",
    "Le mois d'une petite agence de design."],
   contexte:"Un mois d'activité, rien de plus.",
   donnees:[["Chiffre d'affaires",ca,"€"],["Coût des ventes",cv,"€"]],
   questions:[
    {q:"Quelle est la marge brute ?", val:mb, unit:"€",
     calcul:`${eurX(ca)} − ${eurX(cv)} = <b>${eurX(mb)}</b>`,
     cle:"La marge brute ne se devine pas : c'est une soustraction. Tout le reste du compte de résultat part de là."},
    {q:"Quel est le taux de marge brute, en % ?", val:mb/ca*100, unit:"%", tol:.3,
     calcul:`${eurX(mb)} ÷ ${eurX(ca)} = <b>${(mb/ca*100).toFixed(1).replace(".",",")} %</b>`,
     cle:"Sur 100 € vendus, il t'en reste "+(mb/ca*100).toFixed(0).replace(".",",")+" € pour payer TOUT le reste : salaires, loyer, impôts, et toi."},
    {q:`Tu négocies ${rem} % de remise sur le coût des ventes, à chiffre d'affaires inchangé. Quelle est la nouvelle marge brute ?`,
     val:mb+cv*rem/100, unit:"€",
     calcul:`Le coût des ventes tombe à ${eurX(cv*(1-rem/100))} · ${eurX(ca)} − ${eurX(cv*(1-rem/100))} = <b>${eurX(mb+cv*rem/100)}</b>, soit ${eurX(cv*rem/100)} de plus.`,
     cle:`Un euro économisé à l'achat est un euro de marge, en entier. Pour gagner les mêmes ${eurX(cv*rem/100)} en vendant plus, il aurait fallu ${eurX(cv*rem/100/(mb/ca))} de chiffre d'affaires supplémentaire.`},
    {q:`Ton fournisseur augmente ses prix : le coût des ventes passera à ${eurX(cv2)}. À quel chiffre d'affaires faut-il vendre pour retrouver exactement la même marge brute en euros ?`,
     val:cv2+mb, unit:"€",
     calcul:`On veut retrouver ${eurX(mb)} de marge : ${eurX(cv2)} + ${eurX(mb)} = <b>${eurX(cv2+mb)}</b>`,
     cle:"La marge brute est une soustraction, pas un pourcentage. Pour la conserver en euros, le chiffre d'affaires doit absorber la hausse à l'euro près."},
    {q:`Un stagiaire a rangé le loyer du mois, ${eurX(loyer)}, dans le coût des ventes. De combien la marge brute affichée est-elle fausse ?`,
     val:loyer, unit:"€",
     calcul:`Le loyer n'est pas un coût de vente : il tombe que tu vendes ou non. La marge brute affichée est sous-évaluée de <b>${eurX(loyer)}</b>.`,
     cle:"Le coût des ventes, c'est ce qui est CONSOMMÉ pour produire ce que tu as vendu. Le loyer arrive plus bas, dans les charges fixes. C'est tout l'intérêt d'une cascade : chaque étage a sa nature."},
    {q:`À taux de marge inchangé, quel chiffre d'affaires faut-il réaliser pour dégager ${eurX(cibleM)} de marge brute ?`,
     val:cibleM/(mb/ca), unit:"€",
     calcul:`${eurX(cibleM)} ÷ ${(mb/ca*100).toFixed(1).replace(".",",")} % = <b>${eurX(cibleM/(mb/ca))}</b>`,
     cle:"C'est le calcul qui traduit un objectif de résultat en objectif commercial. Avec un taux de marge fin, l'écart entre les deux devient vertigineux — et c'est là que les plans deviennent irréalistes sans que personne ne le voie."},
    {q:`Le coût des ventes augmente de ${hausse} % et tu répercutes exactement la hausse dans ton prix, à l'euro près. Quel est ton nouveau taux de marge brute, en % ?`,
     val:mb/(ca+cv*hausse/100)*100, unit:"%", tol:.3,
     calcul:`Marge inchangée ${eurX(mb)} · nouveau CA ${eurX(ca+cv*hausse/100)} · ${eurX(mb)} ÷ ${eurX(ca+cv*hausse/100)} = <b>${(mb/(ca+cv*hausse/100)*100).toFixed(1).replace(".",",")} %</b>, contre ${(mb/ca*100).toFixed(1).replace(".",",")} %`,
     cle:"Répercuter une hausse en EUROS conserve ta marge en euros mais fait tomber ton TAUX : tu travailles plus pour le même gain. Pour conserver le taux, il aurait fallu répercuter en pourcentage, donc augmenter davantage."}
   ]};}},

/* ============ 2 ============ */
{id:"e2", n:2, ic:"🧮", titre:"Les soldes intermédiaires",
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
  const cible=ebitda+R.ent(8,25)*1000, x2=R.ent(2,4);
  return {contextes:["Le même mois, ligne par ligne. L'impôt sur les sociétés est à 25 %.",
    "Une année entière de garage, ligne par ligne. IS à 25 %.",
    "Les comptes annuels d'une salle de sport. IS à 25 %.",
    "Le compte de résultat d'un éditeur de logiciel, du haut vers le bas. IS à 25 %."],
   contexte:"Le même mois, ligne par ligne. L'impôt sur les sociétés est à 25 %.",
   donnees:[["Chiffre d'affaires",ca,"€"],["Marge brute",mb,"€"],["Charges fixes décaissées",fixes,"€"],
            ["Dotation aux amortissements",dot,"€"],["Intérêts d'emprunt",int,"€"]],
   questions:[
    {q:"Quel est l'EBITDA ?", val:ebitda, unit:"€",
     calcul:`${eurX(mb)} − ${eurX(fixes)} = <b>${eurX(ebitda)}</b>`,
     cle:"L'EBITDA est AVANT dotations. C'est pour ça qu'un banquier le préfère : il ne dépend pas de la politique d'amortissement, donc il se compare d'une boîte à l'autre."},
    {q:"Quel est l'EBIT (résultat d'exploitation) ?", val:ebit, unit:"€",
     calcul:`${eurX(ebitda)} − ${eurX(dot)} = <b>${eurX(ebit)}</b>`,
     cle:"La dotation EST une charge, même si aucun euro ne bouge ce mois-ci. La différence EBITDA − EBIT, c'est exactement l'usure de ton outil."},
    {q:"Quel est le résultat net ?", val:rn, unit:"€",
     calcul:`EBIT ${eurX(ebit)} − intérêts ${eurX(int)} = ${eurX(rcai)} · impôt 25 % = ${eurX(is)} · reste <b>${eurX(rn)}</b>`,
     cle:"Trois étages séparent l'EBITDA du résultat net : l'usure, la banque, l'État. Confondre les deux, c'est confondre ce que le métier produit et ce qui te revient."},
    {q:"Quelle est la marge nette, en % ?", val:rn/ca*100, unit:"%", tol:.3,
     calcul:`${eurX(rn)} ÷ ${eurX(ca)} = <b>${(rn/ca*100).toFixed(1).replace(".",",")} %</b>`,
     cle:"Une marge nette de 5 % veut dire qu'une baisse de 5 % du CA, à charges fixes constantes, efface tout le résultat. C'est pour ça que ce chiffre fait peur quand on le regarde vraiment."},
    {q:"Quel est le résultat avant impôt ?", val:rcai, unit:"€",
     calcul:`${eurX(ebit)} − ${eurX(int)} = <b>${eurX(rcai)}</b>`,
     cle:"C'est l'étage de la banque. Entre l'EBIT et lui, il n'y a que le prix de ta dette : à métier identique, deux structures financières donnent deux résultats."},
    {q:`La banque exige un EBITDA d'au moins ${eurX(cible)} pour tenir son covenant. De combien faut-il réduire les charges fixes pour y arriver ?`,
     val:cible-ebitda, unit:"€",
     calcul:`Il manque ${eurX(cible)} − ${eurX(ebitda)} = <b>${eurX(cible-ebitda)}</b> · les charges fixes devraient tomber à ${eurX(fixes-(cible-ebitda))}`,
     cle:"À marge brute donnée, un euro de charge fixe en moins est un euro d'EBITDA en plus. C'est la seule arithmétique que regarde un banquier quand il parle de covenant."},
    {q:`Le comptable multiplie la dotation aux amortissements par ${x2} en changeant de plan d'amortissement. De combien l'EBITDA change-t-il ?`,
     val:0, unit:"€",
     calcul:`<b>De rien du tout : 0 €.</b> L'EBITDA est AVANT dotations. L'EBIT, lui, tomberait de ${eurX(ebit)} à ${eurX(ebitda-dot*x2)}.`,
     cle:"C'est exactement pour ça que le banquier raisonne en EBITDA : une décision comptable ne doit pas pouvoir changer le chiffre qu'on compare d'une entreprise à l'autre."}
   ]};}},

/* ============ 3 ============ */
{id:"e3", n:3, ic:"🧮", titre:"Le point mort",
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
  const dloyer=R.ent(2,9)*100, baisse=R.ent(5,12);
  const p2=Math.round(p*(1-baisse/100)*100)/100, m2=Math.round((p2-cv)*100)/100, pm2=Math.ceil(fx/m2);
  return {contextes:["Un produit, un prix, des charges fixes mensuelles.",
    "Un food-truck : un menu unique, un prix, des charges qui tombent tous les mois.",
    "Une salle de sport à l'abonnement : un tarif, un coût variable par membre, des murs à payer.",
    "Un atelier de torréfaction : un sachet, un prix, un loyer."],
   contexte:"Un produit, un prix, des charges fixes mensuelles.",
   donnees:[["Prix de vente unitaire",p,"€u"],["Coût variable unitaire",cv,"€u"],
            ["Charges fixes du mois",fx,"€"],["Unités réellement vendues",vendu,""]],
   questions:[
    {q:"Quelle est la marge sur coût variable par unité ?", val:m, unit:"€", tol:.02,
     calcul:`${vf(p)} € − ${vf(cv)} € = <b>${vf(m)} €</b>`,
     cle:"Chaque unité vendue dépose "+vf(m)+" € dans le pot qui doit remplir les charges fixes. Rien d'autre ne les remplit."},
    {q:"Combien d'unités faut-il vendre pour atteindre le point mort ?", val:pm, unit:"", tol:1,
     calcul:`${eurX(fx)} ÷ ${vf(m)} € = <b>${pm} unités</b>`,
     cle:"En dessous, tu perds de l'argent chaque mois quoi que tu fasses. Un dirigeant qui ne connaît pas ce nombre pilote sans compteur."},
    {q:"Quelle est la marge de sécurité, en % des ventes ?", val:(vendu-pm)/vendu*100, unit:"%", tol:.5,
     calcul:`(${vendu} − ${pm}) ÷ ${vendu} = <b>${((vendu-pm)/vendu*100).toFixed(1).replace(".",",")} %</b>`,
     cle:"Tes ventes peuvent baisser de "+((vendu-pm)/vendu*100).toFixed(0).replace(".",",")+" % avant que tu passes dans le rouge. En dessous de 15 %, tu dors mal."},
    {q:"Quel chiffre d'affaires le point mort représente-t-il ?", val:pm*p, unit:"€",
     calcul:`${pm} unités × ${vf(p)} € = <b>${eurX(pm*p)}</b>`,
     cle:"Le point mort se dit en volume ET en euros. C'est la version en euros qu'on compare au chiffre d'affaires réel, et c'est celle qu'un banquier demande."},
    {q:`Ton loyer augmente de ${eurX(dloyer)} par mois. Combien d'unités faut-il vendre EN PLUS, juste pour rester au point mort ?`,
     val:Math.ceil(dloyer/m), unit:"", tol:1,
     calcul:`${eurX(dloyer)} ÷ ${vf(m)} € = <b>${Math.ceil(dloyer/m)} unités</b> de plus chaque mois`,
     cle:"Une charge fixe ne se rattrape qu'en volume, et le diviseur est la marge unitaire, pas le prix. Plus ta marge est fine, plus une petite charge fixe coûte cher en effort commercial."},
    {q:`Tu baisses ton prix de ${baisse} % pour vendre plus, sans toucher au coût variable. Quel est le nouveau point mort en volume ?`,
     val:pm2, unit:"", tol:1,
     calcul:`Nouveau prix ${vf(p2)} € · marge unitaire ${vf(m2)} € · ${eurX(fx)} ÷ ${vf(m2)} € = <b>${pm2} unités</b>, contre ${pm} avant`,
     cle:`Une baisse de prix de ${baisse} % a augmenté le point mort de ${Math.round((pm2/pm-1)*100)} %. La remise ne se prend pas sur le prix, elle se prend ENTIÈREMENT sur la marge : c'est le calcul que personne ne fait avant de solder.`},
    {q:"Quel est le taux de marge sur coût variable, en % du prix ?", val:m/p*100, unit:"%", tol:.4,
     calcul:`${vf(m)} € ÷ ${vf(p)} € = <b>${(m/p*100).toFixed(1).replace(".",",")} %</b>`,
     cle:"C'est ce taux qui commande tout : point mort = charges fixes ÷ taux de marge, en euros de chiffre d'affaires. Deux entreprises aux charges fixes identiques n'ont pas du tout le même point mort si ce taux diffère."}
   ]};}},

/* ============ 4 ============ */
{id:"e4", n:4, ic:"🧮", titre:"Le besoin en fonds de roulement",
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
  const dsoNow=Math.round(cr/caA*365), dsoC=Math.max(8,dsoNow-R.ent(8,20)), croiss=R.ent(15,40);
  return {contextes:["Un bilan au 31 décembre, et l'activité de l'année écoulée.",
    "Le bilan d'un grossiste en boissons, clôturé fin décembre, et son année.",
    "Une PME industrielle au 31 décembre : ce qu'elle possède, ce qu'on lui doit, ce qu'elle doit.",
    "Un distributeur de pièces détachées : bilan de clôture et activité annuelle."],
   contexte:"Un bilan au 31 décembre, et l'activité de l'année écoulée.",
   donnees:[["Chiffre d'affaires annuel",caA,"€"],["Achats de l'année",achats,"€"],
            ["Stock",stock,"€"],["Créances clients",cr,"€"],["Dettes fournisseurs",fo,"€"]],
   questions:[
    {q:"Quel est le BFR ?", val:bfr, unit:"€",
     calcul:`${eurX(stock)} + ${eurX(cr)} − ${eurX(fo)} = <b>${eurX(bfr)}</b>`,
     cle:"Cette somme dort dans ta machine en permanence. Elle grandit avec ton chiffre d'affaires : c'est pour ça que la croissance dévore du cash."},
    {q:"Combien de jours de chiffre d'affaires cela représente-t-il ?", val:bfr/caA*365, unit:"j", tol:1.5,
     calcul:`${eurX(bfr)} ÷ ${eurX(caA)} × 365 = <b>${Math.round(bfr/caA*365)} jours</b>`,
     cle:"C'est le chiffre qui se compare. Un BFR de 60 jours veut dire que deux mois de ton chiffre d'affaires sont immobilisés en permanence, quoi qu'il arrive."},
    {q:"Quel est le DSO (délai de paiement de tes clients), en jours ?", val:cr/caA*365, unit:"j", tol:1.5,
     calcul:`${eurX(cr)} ÷ ${eurX(caA)} × 365 = <b>${Math.round(cr/caA*365)} jours</b>`,
     cle:"Chaque jour de DSO gagné rend du cash immédiatement, sans emprunter, sans diluer. C'est le gisement le moins cher qui existe — et le plus souvent ignoré."},
    {q:"Quel est le DPO (délai de paiement de tes fournisseurs), en jours ?", val:fo/achats*365, unit:"j", tol:1.5,
     calcul:`${eurX(fo)} ÷ ${eurX(achats)} × 365 = <b>${Math.round(fo/achats*365)} jours</b>`,
     cle:"Le DPO se calcule sur les ACHATS, jamais sur le chiffre d'affaires : c'est l'erreur la plus fréquente des tableaux de bord. Pendant ces jours-là, tes fournisseurs te financent gratuitement."},
    {q:`Tu ramènes le délai de paiement de tes clients à ${dsoC} jours, contre ${dsoNow} aujourd'hui. Combien de trésorerie cela libère-t-il ?`,
     val:cr-caA*dsoC/365, unit:"€",
     calcul:`Créances cibles ${eurX(caA*dsoC/365)} · ${eurX(cr)} − ${eurX(caA*dsoC/365)} = <b>${eurX(cr-caA*dsoC/365)}</b>`,
     cle:"Cet argent-là ne se demande à personne : ni banque, ni actionnaire, aucun intérêt, aucune dilution. Il est déjà à toi, il dort chez tes clients."},
    {q:`Ton chiffre d'affaires augmente de ${croiss} % l'an prochain, à délais et taux de marge inchangés. De combien le BFR augmente-t-il ?`,
     val:bfr*croiss/100, unit:"€",
     calcul:`${eurX(bfr)} × ${croiss} % = <b>${eurX(bfr*croiss/100)}</b> · le BFR passe à ${eurX(bfr*(1+croiss/100))}`,
     cle:"Le BFR suit le chiffre d'affaires. Grandir coûte du cash AVANT d'en rapporter : c'est la raison numéro un des faillites d'entreprises rentables."},
    {q:"Quel est le délai de rotation du stock, en jours d'achats ?", val:stock/achats*365, unit:"j", tol:1.5,
     calcul:`${eurX(stock)} ÷ ${eurX(achats)} × 365 = <b>${Math.round(stock/achats*365)} jours</b>`,
     cle:`Stock + clients − fournisseurs, en jours, c'est le cycle de conversion du cash : ${Math.round(stock/achats*365)} + ${Math.round(cr/caA*365)} − ${Math.round(fo/achats*365)} jours. Le nombre de jours pendant lesquels tu finances ton activité toi-même.`}
   ]};}},

/* ============ 5 ============ */
{id:"e5", n:5, ic:"🧮", titre:"Du résultat à la trésorerie",
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
  return {contextes:["Une année complète. Attention aux signes.",
    "L'exercice d'une menuiserie, du résultat jusqu'à la caisse. Attention aux signes.",
    "Une année de laboratoire d'analyses. Attention aux signes.",
    "Les flux d'une société de transport sur douze mois. Attention aux signes."],
   contexte:"Une année complète. Attention aux signes.",
   donnees:[["Résultat net",rn,"€"],["Dotations aux amortissements",dot,"€"],
            ["Variation du BFR",dbfr,"€"],["Investissements payés",capex,"€"],
            ["Emprunt débloqué",emprunt,"€"],["Capital d'emprunt remboursé",remb,"€"]],
   questions:[
    {q:"Quel est le flux de trésorerie d'exploitation ?", val:fe, unit:"€",
     calcul:`${eurX(rn)} + ${eurX(dot)} − ${eurX(dbfr)} = <b>${eurX(fe)}</b>`,
     cle:"C'est le seul chiffre qui dit si ton MÉTIER produit du cash. Durablement négatif, c'est mortel — même avec un résultat positif."},
    {q:"Quelle est la variation de trésorerie de l'année ?", val:dcash, unit:"€",
     calcul:`${eurX(fe)} − ${eurX(capex)} + ${eurX(emprunt)} − ${eurX(remb)} = <b>${eurX(dcash)}</b>`,
     cle:"Trois flux, trois questions : le métier produit-il ? est-ce que j'investis ? qui finance ? Une trésorerie qui monte grâce à un emprunt n'est pas une performance."},
    {q:"Quel est le flux libre après investissements, avant financement ?", val:fe-capex, unit:"€",
     calcul:`${eurX(fe)} − ${eurX(capex)} = <b>${eurX(fe-capex)}</b>`,
     cle:"C'est le vrai test : le métier finance-t-il son propre outil ? S'il faut emprunter chaque année pour renouveler les machines, l'entreprise n'est pas rentable, elle est perfusée."},
    {q:"Combien peux-tu investir cette année sans emprunter un euro de plus et sans toucher à ta trésorerie de départ ?", val:fe-remb, unit:"€",
     calcul:`${eurX(fe)} − remboursement du capital ${eurX(remb)} = <b>${eurX(fe-remb)}</b>`,
     cle:"La banque est servie avant l'outil. Ce qui reste après le remboursement du capital, c'est ta vraie capacité d'investissement autofinancée."},
    {q:"Quel est le financement net de l'année (emprunts débloqués − capital remboursé) ?", val:emprunt-remb, unit:"€",
     calcul:`${eurX(emprunt)} − ${eurX(remb)} = <b>${eurX(emprunt-remb)}</b>`,
     cle:"Le remboursement du CAPITAL ne passe jamais par le compte de résultat, seuls les intérêts y sont. Une entreprise peut être bénéficiaire et manquer de cash uniquement à cause de cette ligne."},
    {q:"Quelle est la capacité d'autofinancement (résultat net + dotations) ?", val:rn+dot, unit:"€",
     calcul:`${eurX(rn)} + ${eurX(dot)} = <b>${eurX(rn+dot)}</b>`,
     cle:"La CAF, c'est le cash que l'exercice a produit AVANT que le cycle ne s'en mêle. Entre elle et le flux d'exploitation, il n'y a qu'une chose : la variation du BFR."},
    {q:"De combien la trésorerie aurait-elle varié si le BFR n'avait pas bougé du tout ?", val:dcash+dbfr, unit:"€",
     calcul:`${eurX(dcash)} + ${eurX(dbfr)} = <b>${eurX(dcash+dbfr)}</b>`,
     cle:`Le BFR a ${dbfr>0?"coûté":"rapporté"} ${eurX(Math.abs(dbfr))} de trésorerie cette année, sans apparaître nulle part dans le résultat. C'est la ligne invisible qui explique la plupart des surprises de fin de mois.`}
   ]};}},

/* ============ 6 ============ */
{id:"e6", n:6, ic:"🧮", titre:"La structure du bilan",
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
  const cov=R.ent(30,40)/10;
  return {contextes:["Le bilan et le compte de résultat d'une année.",
    "Les comptes d'un transporteur : ce qu'il doit, ce qu'il possède, ce qu'il produit.",
    "Une société de services, bilan et résultat de l'exercice.",
    "Une PME industrielle vue par son banquier : les six chiffres qu'il regarde en premier."],
   contexte:"Le bilan et le compte de résultat d'une année.",
   donnees:[["Dettes financières",dettes,"€"],["Trésorerie",tresorerie,"€"],["Capitaux propres",cp,"€"],
            ["EBITDA",ebitda,"€"],["Dotations",dot,"€"],["Intérêts payés",int,"€"]],
   questions:[
    {q:"Quelle est la dette nette ?", val:dn, unit:"€",
     calcul:`${eurX(dettes)} − ${eurX(tresorerie)} = <b>${eurX(dn)}</b>`,
     cle:"On raisonne toujours en dette NETTE : 1 M€ de dette avec 900 k€ en banque, ce n'est pas 1 M€ de problème."},
    {q:"Quel est le levier (dette nette / EBITDA) ?", val:dn/ebitda, unit:"×", tol:.06,
     calcul:`${eurX(dn)} ÷ ${eurX(ebitda)} = <b>${(dn/ebitda).toFixed(2).replace(".",",")}×</b>`,
     cle:(dn/ebitda)>3.5?"Au-dessus de 3,5× : à ce niveau, une banque ne prête plus et un covenant saute.":"En dessous de 3,5× : la structure tient, il reste de la place pour emprunter."},
    {q:"Quelle est la couverture des intérêts (EBIT / intérêts) ?", val:ebit/int, unit:"×", tol:.1,
     calcul:`${eurX(ebit)} ÷ ${eurX(int)} = <b>${(ebit/int).toFixed(1).replace(".",",")}×</b>`,
     cle:"Ce ratio dit si tu peux PAYER ta dette cette année. Le levier dit si tu peux la REMBOURSER un jour. Les deux, pas l'un ou l'autre."},
    {q:"Quel est le gearing (dette nette / capitaux propres) ?", val:dn/cp, unit:"×", tol:.06,
     calcul:`${eurX(dn)} ÷ ${eurX(cp)} = <b>${(dn/cp).toFixed(2).replace(".",",")}×</b>`,
     cle:(dn/cp)>1?"Au-dessus de 1 : l'entreprise doit plus qu'elle ne possède. Les prêteurs portent plus de risque que les actionnaires, et ils le font payer.":"En dessous de 1 : les actionnaires portent encore l'essentiel du risque. C'est confortable — et c'est aussi de la capacité d'emprunt qui dort."},
    {q:`Ton covenant impose un levier maximum de ${cov.toFixed(1).replace(".",",")}×. Quel est le montant maximum de dette nette autorisé ?`,
     val:cov*ebitda, unit:"€",
     calcul:`${cov.toFixed(1).replace(".",",")} × ${eurX(ebitda)} = <b>${eurX(cov*ebitda)}</b> · tu es à ${eurX(dn)}`,
     cle:"Un covenant de levier est une limite MOBILE : elle se resserre toute seule quand l'EBITDA baisse. C'est pour ça qu'on le casse toujours au pire moment."},
    {q:"L'EBITDA baisse de 20 % l'an prochain, dette nette inchangée. Quel serait le nouveau levier ?",
     val:dn/(ebitda*.8), unit:"×", tol:.08,
     calcul:`${eurX(dn)} ÷ ${eurX(ebitda*.8)} = <b>${(dn/(ebitda*.8)).toFixed(2).replace(".",",")}×</b>, contre ${(dn/ebitda).toFixed(2).replace(".",",")}× aujourd'hui`,
     cle:"Tu n'as pas emprunté un euro de plus et ton levier a bondi. Un covenant ne sanctionne pas ta dette, il sanctionne ta performance — et il le fait au moment exact où tu as le plus besoin de ta banque."},
    {q:`Quelle est ta marge de manœuvre avant de casser le covenant : dette nette maximale − dette nette actuelle ? (un nombre négatif veut dire qu'il est déjà cassé)`,
     val:cov*ebitda-dn, unit:"€",
     calcul:`${eurX(cov*ebitda)} − ${eurX(dn)} = <b>${eurX(cov*ebitda-dn)}</b>`,
     cle:(cov*ebitda-dn)>0?"C'est exactement ce que tu peux encore emprunter aujourd'hui — et cette enveloppe fond dès que l'EBITDA recule, sans que tu aies rien signé.":"Le covenant est déjà cassé : la banque peut exiger le remboursement immédiat. On ne découvre jamais ça à temps quand on ne calcule pas ce chiffre tous les mois."}
   ]};}},

/* ============ 7 ============ */
{id:"e7", n:7, ic:"🧮", titre:"La rentabilité",
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
  const redBfr=R.ent(15,30);
  return {contextes:["Une entreprise sur un exercice. L'impôt est à 25 %.",
    "Un fabricant de mobilier sur un exercice. IS à 25 %.",
    "Une chaîne de trois magasins, exercice clos. IS à 25 %.",
    "Un laboratoire pharmaceutique de taille moyenne, un exercice. IS à 25 %."],
   contexte:"Une entreprise sur un exercice. L'impôt est à 25 %.",
   donnees:[["Chiffre d'affaires",ca,"€"],["EBIT",ebit,"€"],["Immobilisations",immo,"€"],
            ["BFR",bfr,"€"],["Capitaux propres",cp,"€"],["Résultat net",rn,"€"]],
   questions:[
    {q:"Quels sont les capitaux engagés ?", val:ce, unit:"€",
     calcul:`${eurX(immo)} + ${eurX(bfr)} = <b>${eurX(ce)}</b>`,
     cle:"On oublie presque toujours le BFR dans les capitaux engagés. C'est pourtant de l'argent immobilisé aussi sûrement qu'une machine."},
    {q:"Quel est le ROCE, en % ?", val:nopat/ce*100, unit:"%", tol:.4,
     calcul:`EBIT après impôt ${eurX(nopat)} ÷ ${eurX(ce)} = <b>${(nopat/ce*100).toFixed(1).replace(".",",")} %</b>`,
     cle:"Le ROCE se compare au coût du capital. S'il est en dessous, l'entreprise détruit de la valeur en grandissant — et c'est contre-intuitif au point que beaucoup ne le voient jamais."},
    {q:"Quel est le ROE, en % ?", val:rn/cp*100, unit:"%", tol:.4,
     calcul:`${eurX(rn)} ÷ ${eurX(cp)} = <b>${(rn/cp*100).toFixed(1).replace(".",",")} %</b>`,
     cle:"Un ROE élevé peut venir d'une belle performance… ou simplement de beaucoup de dette. C'est exactement le sujet du dernier palier."},
    {q:"Quelle est la rotation des capitaux engagés (CA / capitaux engagés) ?", val:ca/ce, unit:"×", tol:.06,
     calcul:`${eurX(ca)} ÷ ${eurX(ce)} = <b>${(ca/ce).toFixed(2).replace(".",",")}×</b>`,
     cle:"Un hypermarché a une marge minuscule et une rotation énorme ; un joaillier l'inverse. Même ROCE possible, deux métiers opposés."},
    {q:"Quelle est la marge opérationnelle (EBIT / CA), en % ?", val:ebit/ca*100, unit:"%", tol:.3,
     calcul:`${eurX(ebit)} ÷ ${eurX(ca)} = <b>${(ebit/ca*100).toFixed(1).replace(".",",")} %</b>`,
     cle:`Marge × rotation = ROCE. Ici ${(nopat/ca*100).toFixed(1).replace(".",",")} % après impôt × ${(ca/ce).toFixed(2).replace(".",",")} = ${(nopat/ce*100).toFixed(1).replace(".",",")} %. Deux leviers indépendants, un seul résultat.`},
    {q:`Tu réduis le BFR de ${redBfr} % sans vendre un euro de plus. Quel est le nouveau ROCE, en % ?`,
     val:nopat/(immo+bfr*(1-redBfr/100))*100, unit:"%", tol:.4,
     calcul:`Capitaux engagés ${eurX(immo+bfr*(1-redBfr/100))} · ${eurX(nopat)} ÷ ${eurX(immo+bfr*(1-redBfr/100))} = <b>${(nopat/(immo+bfr*(1-redBfr/100))*100).toFixed(1).replace(".",",")} %</b>, contre ${(nopat/ce*100).toFixed(1).replace(".",",")} %`,
     cle:"Tu as gagné de la rentabilité sans un euro de chiffre d'affaires en plus. Le dénominateur est un levier aussi puissant que le numérateur, et il est presque toujours ignoré."},
    {q:"Quel est l'écart entre le ROE et le ROCE, en points ?", val:rn/cp*100-nopat/ce*100, unit:"%", tol:.6,
     calcul:`${(rn/cp*100).toFixed(1).replace(".",",")} % − ${(nopat/ce*100).toFixed(1).replace(".",",")} % = <b>${(rn/cp*100-nopat/ce*100).toFixed(1).replace(".",",")} points</b>`,
     cle:(rn/cp*100>nopat/ce*100)?"Le ROE dépasse le ROCE : la dette rapporte plus qu'elle ne coûte, l'effet de levier joue POUR les actionnaires. Il jouera contre eux à la seconde où le ROCE passera sous le coût de la dette.":"Le ROE est sous le ROCE : la dette coûte plus qu'elle ne rapporte. L'effet de levier joue à l'envers — on l'appelle l'effet de massue, et le nom est mérité."}
   ]};}},

/* ============ 8 ============ */
{id:"e8", n:8, ic:"🧮", titre:"La valeur du temps",
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
  const gr=R.ent(1,3)/100;
  return {contextes:[`Le taux d'actualisation exigé est de ${(t*100).toFixed(0).replace(".",",")} %.`,
    `Un comité d'investissement exige ${(t*100).toFixed(0).replace(".",",")} % sur tout projet. Deux dossiers sont sur la table.`,
    `Tu compares deux actifs au taux exigé de ${(t*100).toFixed(0).replace(".",",")} %.`,
    `Une foncière arbitre entre deux placements. Son taux d'exigence : ${(t*100).toFixed(0).replace(".",",")} %.`],
   contexte:`Le taux d'actualisation exigé est de ${(t*100).toFixed(0).replace(".",",")} %.`,
   donnees:[["Taux d'actualisation",t*100,"%"],[`Flux unique reçu dans ${n} ans`,f,"€"],
            ["Flux annuel perpétuel d'un autre projet",fx,"€"]],
   questions:[
    {q:`Quelle est la valeur actuelle du flux reçu dans ${n} ans ?`, val:va, unit:"€", tol:Math.max(300,va*.015),
     calcul:`${eurX(f)} ÷ (1 + ${(t*100).toFixed(0).replace(".",",")} %)<sup>${n}</sup> = ${eurX(f)} ÷ ${Math.pow(1+t,n).toFixed(3).replace(".",",")} = <b>${eurX(va)}</b>`,
     cle:"Le temps coûte cher : "+Math.round((1-va/f)*100)+" % de la valeur a disparu en "+n+" ans, sans qu'il n'arrive rien."},
    {q:"Quelle est la valeur de la rente perpétuelle ?", val:perp, unit:"€", tol:Math.max(500,perp*.015),
     calcul:`${eurX(fx)} ÷ ${(t*100).toFixed(0).replace(".",",")} % = <b>${eurX(perp)}</b>`,
     cle:"Diviser par le taux, c'est multiplier par "+(1/t).toFixed(1).replace(".",",")+". C'est le calcul qui fixe la valeur terminale dans toute valorisation — et il est d'une sensibilité redoutable au taux."},
    {q:`Le flux annuel perpétuel de ${eurX(fx)} croît désormais de ${(gr*100).toFixed(0)} % par an. Quelle est sa valeur ?`,
     val:fx/(t-gr), unit:"€", tol:Math.max(800,fx/(t-gr)*.015),
     calcul:`${eurX(fx)} ÷ (${(t*100).toFixed(0).replace(".",",")} % − ${(gr*100).toFixed(0)} %) = ${eurX(fx)} ÷ ${((t-gr)*100).toFixed(0).replace(".",",")} % = <b>${eurX(fx/(t-gr))}</b>`,
     cle:`La croissance a ajouté ${Math.round((fx/(t-gr)/(fx/t)-1)*100)} % de valeur sans un euro de flux supplémentaire aujourd'hui. C'est pour ça que le g de la valeur terminale est le chiffre le plus discuté d'un DCF, et le plus facile à gonfler.`},
    {q:"Le taux exigé monte d'un point. De combien la valeur de la rente perpétuelle baisse-t-elle, en % ?",
     val:(1-t/(t+.01))*100, unit:"%", tol:.5,
     calcul:`${eurX(fx)} ÷ ${((t+.01)*100).toFixed(0).replace(".",",")} % = ${eurX(fx/(t+.01))}, contre ${eurX(fx/t)} · soit <b>${((1-t/(t+.01))*100).toFixed(1).replace(".",",")} %</b> de valeur en moins`,
     cle:"Un seul point de taux, et la valeur perd près d'un dixième. La valeur terminale pèse souvent les deux tiers d'une valorisation : c'est là que se jouent les désaccords de prix, pas dans les prévisions de chiffre d'affaires."},
    {q:`On te demande ${eurX(inv)} pour un actif qui versera une rente perpétuelle. Quel flux annuel faut-il au minimum pour justifier ce prix, au taux exigé ?`,
     val:inv*t, unit:"€", tol:Math.max(500,inv*t*.015),
     calcul:`${eurX(inv)} × ${(t*100).toFixed(0).replace(".",",")} % = <b>${eurX(inv*t)}</b>`,
     cle:"Prix × taux = flux exigé. C'est exactement le calcul d'un rendement locatif, et il se fait de tête : c'est le test de cohérence le plus rapide qui existe sur un prix qu'on t'annonce."},
    {q:`Un projet coûte ${eurX(inv)} aujourd'hui et rapportera ${eurX(fx)} par an à perpétuité. Quelle est sa VAN ?`,
     val:fx/t-inv, unit:"€", tol:Math.max(800,Math.abs(fx/t-inv)*.015),
     calcul:`${eurX(fx/t)} − ${eurX(inv)} = <b>${eurX(fx/t-inv)}</b>`,
     cle:(fx/t-inv)>0?"VAN positive : le projet rapporte plus que le capital ne coûte. C'est la seule définition opérationnelle de « créer de la valeur ».":"VAN négative : le projet rapporte, mais moins que le taux exigé. Il détruit de la valeur tout en affichant des bénéfices — et c'est ce qui le rend si difficile à refuser."},
    {q:"Au taux exigé, en combien d'années un capital placé double-t-il ?",
     val:Math.log(2)/Math.log(1+t), unit:"", tol:.6,
     calcul:`ln 2 ÷ ln(1 + ${(t*100).toFixed(0).replace(".",",")} %) = <b>${(Math.log(2)/Math.log(1+t)).toFixed(1).replace(".",",")} ans</b> · la règle de 72 donne 72 ÷ ${(t*100).toFixed(0)} = ${(72/(t*100)).toFixed(1).replace(".",",")} ans`,
     cle:"La règle de 72 se fait de tête et tombe à quelques mois près. C'est le calcul le plus rentable à connaître par cœur : il dit en une seconde si une promesse de rendement est crédible."}
   ]};}},

/* ============ 9 ============ */
{id:"e9", n:9, ic:"🧮", titre:"Les multiples",
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
  const demande=Math.round(titres*(1+R.ent(8,25)/100)/1000)*1000;
  const rembAv=Math.round(tres*R.ent(40,80)/100/1000)*1000;
  const div=Math.round(tres*R.ent(30,70)/100/1000)*1000;
  return {contextes:[`Une cible à vendre. Les transactions du secteur se font autour de ${mult.toFixed(1).replace(".",",")}× l'EBITDA.`,
    `Un fonds te présente une cible. Le secteur se paie ${mult.toFixed(1).replace(".",",")}× l'EBITDA.`,
    `Le dirigeant d'une PME veut vendre. Les comparables du secteur ressortent à ${mult.toFixed(1).replace(".",",")}× l'EBITDA.`,
    `Une société familiale est mise en vente. Référence de marché : ${mult.toFixed(1).replace(".",",")}× l'EBITDA.`],
   contexte:`Une cible à vendre. Les transactions du secteur se font autour de ${mult.toFixed(1).replace(".",",")}× l'EBITDA.`,
   donnees:[["EBITDA",ebitda,"€"],["Multiple du secteur",mult,"×"],["Dettes financières",dettes,"€"],
            ["Trésorerie",tres,"€"],["Résultat net",rn,"€"]],
   questions:[
    {q:"Quelle est la valeur d'entreprise ?", val:ve, unit:"€", tol:Math.max(500,ve*.01),
     calcul:`${mult.toFixed(1).replace(".",",")} × ${eurX(ebitda)} = <b>${eurX(ve)}</b>`,
     cle:"Le multiple s'applique à l'EBITDA et donne une VALEUR D'ENTREPRISE. Jamais un prix d'actions. C'est là que tout se joue."},
    {q:"Combien paies-tu pour les titres (le prix aux actionnaires) ?", val:titres, unit:"€", tol:Math.max(500,Math.abs(titres)*.01),
     calcul:`${eurX(ve)} − (${eurX(dettes)} − ${eurX(tres)}) = ${eurX(ve)} − ${eurX(dn)} = <b>${eurX(titres)}</b>`,
     cle:"Tu reprends la dette avec la boîte : elle se déduit du chèque. Payer la VE comme si c'était le prix des titres, c'est surpayer de "+eurX(dn)+" — et ça arrive tous les jours."},
    {q:"Quel est le PER (capitalisation / résultat net) ?", val:titres/rn, unit:"×", tol:.3,
     calcul:`${eurX(titres)} ÷ ${eurX(rn)} = <b>${(titres/rn).toFixed(1).replace(".",",")}×</b>`,
     cle:"Le PER porte sur le résultat NET, donc après intérêts : il dépend de la structure financière. Le VE/EBITDA, non. Deux outils, deux usages."},
    {q:`Le vendeur veut ${eurX(demande)} pour ses titres. À quel multiple d'EBITDA cela correspond-il ?`,
     val:(demande+dn)/ebitda, unit:"×", tol:.15,
     calcul:`Prix des titres + dette nette = VE : ${eurX(demande)} + ${eurX(dn)} = ${eurX(demande+dn)} · ÷ ${eurX(ebitda)} = <b>${((demande+dn)/ebitda).toFixed(1).replace(".",",")}×</b>`,
     cle:`Pour comparer une offre au marché, il faut toujours la remonter en valeur d'entreprise. Le secteur se paie ${mult.toFixed(1).replace(".",",")}× : ce prix-là est ${((demande+dn)/ebitda)>mult?"au-dessus":"en dessous"}.`},
    {q:"Tu paies la valeur d'entreprise comme si c'était le prix des titres. De combien surpaies-tu ?", val:dn, unit:"€",
     calcul:`${eurX(ve)} − ${eurX(titres)} = <b>${eurX(dn)}</b> — exactement la dette nette.`,
     cle:"C'est le chèque en trop, et il fait exactement la taille de la dette nette. Personne ne te le signalera pendant la négociation : ce n'est pas de la malhonnêteté, c'est à toi de faire la soustraction."},
    {q:`Avant la vente, la cible rembourse ${eurX(rembAv)} de dette avec sa propre trésorerie. De combien le prix des titres change-t-il ?`,
     val:0, unit:"€",
     calcul:`Dettes ${eurX(dettes-rembAv)} − trésorerie ${eurX(tres-rembAv)} = ${eurX(dn)} : la dette NETTE n'a pas bougé d'un euro. Prix des titres inchangé, <b>0 €</b> d'écart.`,
     cle:"Rembourser de la dette avec son propre cash ne crée aucune valeur : on déplace deux lignes du bilan. Seule la dette NETTE compte — c'est pour ça qu'on la regarde elle, et jamais la dette brute."},
    {q:`Juste avant la vente, la cible verse un dividende exceptionnel de ${eurX(div)}, prélevé sur sa trésorerie. De combien le prix des titres baisse-t-il ?`,
     val:div, unit:"€",
     calcul:`La trésorerie tombe à ${eurX(tres-div)}, donc la dette nette monte à ${eurX(dn+div)} · prix des titres ${eurX(titres-div)} au lieu de ${eurX(titres)} : <b>${eurX(div)}</b> de moins`,
     cle:"Comparer avec le cas du remboursement de dette : là, rien ne bougeait. Ici, le cash SORT de l'entreprise, donc le prix baisse à l'euro près. La règle est unique — seule la dette nette compte — mais elle donne deux réponses opposées."}
   ]};}},

/* ============ 10 ============ */
{id:"e10", n:10, ic:"🧮", titre:"Le flux de trésorerie disponible",
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
  const rembX=R.ent(30,150)*1000;
  return {contextes:["Un exercice complet. Impôt à 25 %.",
    "Une année d'une société industrielle, vue par celui qui la valorise. IS à 25 %.",
    "Les flux d'un exercice, avant toute question de financement. IS à 25 %.",
    "Une cible de LBO, exercice de référence. IS à 25 %."],
   contexte:"Un exercice complet. Impôt à 25 %.",
   donnees:[["EBIT",ebit,"€"],["Dotations",dot,"€"],["Variation du BFR",dbfr,"€"],
            ["Investissements",capex,"€"],["Intérêts payés",int,"€"],
            ["Remboursements de dette",remb,"€"],["Nouveaux emprunts",nouv,"€"]],
   questions:[
    {q:"Quel est le NOPAT (EBIT après impôt) ?", val:nopat, unit:"€", tol:Math.max(200,nopat*.01),
     calcul:`${eurX(ebit)} × (1 − 25 %) = <b>${eurX(nopat)}</b>`,
     cle:"On imagine l'entreprise SANS dette. L'économie d'impôt liée aux intérêts n'est pas oubliée : elle sera dans le coût du capital, au palier suivant."},
    {q:"Quel est le FCFF ?", val:fcff, unit:"€", tol:Math.max(400,Math.abs(fcff)*.01),
     calcul:`${eurX(nopat)} + ${eurX(dot)} − ${eurX(dbfr)} − ${eurX(capex)} = <b>${eurX(fcff)}</b>`,
     cle:"C'est LE flux des valorisations. Quatre termes, pas un de plus : on remet ce qui n'est pas sorti, on retire ce que le cycle et l'outil immobilisent."},
    {q:"Quel est le FCFE (ce qui revient aux actionnaires) ?", val:fcfe, unit:"€", tol:Math.max(400,Math.abs(fcfe)*.01),
     calcul:`${eurX(fcff)} − intérêts après impôt ${eurX(Math.round(int*(1-tx)))} − ${eurX(remb)} + ${eurX(nouv)} = <b>${eurX(fcfe)}</b>`,
     cle:"Les intérêts sont retirés APRÈS impôt, parce qu'ils sont déductibles : ils te coûtent réellement 75 % de leur montant affiché."},
    {q:`L'entreprise rembourse ${eurX(rembX)} de dette en plus cette année. De combien le FCFF change-t-il ?`,
     val:0, unit:"€",
     calcul:`<b>0 €.</b> Le FCFF s'arrête avant le financement : NOPAT + dotations − variation du BFR − investissements. Le FCFE, lui, tomberait de ${eurX(fcfe)} à ${eurX(fcfe-rembX)}.`,
     cle:"Le FCFF est le flux AVANT de décider qui est payé. C'est ce qui le rend comparable entre deux entreprises financées différemment, et c'est pour ça qu'on l'actualise au WACC, jamais au coût des fonds propres."},
    {q:"Quel niveau d'investissement annulerait exactement le FCFF cette année ?", val:nopat+dot-dbfr, unit:"€",
     calcul:`${eurX(nopat)} + ${eurX(dot)} − ${eurX(dbfr)} = <b>${eurX(nopat+dot-dbfr)}</b> · au-delà, le FCFF devient négatif`,
     cle:"Au-dessus de ce montant, l'entreprise consomme du cash tout en étant rentable. C'est le seuil que personne n'écrit dans un business plan, et que tout le monde découvre en trésorerie."},
    {q:"Combien vaut l'économie d'impôt procurée par les intérêts cette année (le bouclier fiscal) ?", val:int*.25, unit:"€",
     calcul:`${eurX(int)} × 25 % = <b>${eurX(int*.25)}</b>`,
     cle:"C'est cette économie-là qu'on a volontairement exclue du FCFF. Elle est déjà dans le WACC, via le coût de la dette APRÈS impôt : la compter ici aussi serait la compter deux fois. C'est l'erreur classique du DCF d'étudiant."},
    {q:`En régime de croisière, les investissements égalent les dotations, soit ${eurX(dot)} (on renouvelle l'outil, sans l'agrandir). Quel serait alors le FCFF ?`,
     val:nopat-dbfr, unit:"€",
     calcul:`${eurX(nopat)} + ${eurX(dot)} − ${eurX(dbfr)} − ${eurX(dot)} = <b>${eurX(nopat-dbfr)}</b>`,
     cle:"Dotations et investissements s'annulent : c'est le flux « normalisé » d'une entreprise qui ne fait que se maintenir. C'est lui qu'on met dans la valeur terminale — jamais le flux d'une année d'investissement exceptionnel."}
   ]};}},

/* ============ 11 ============ */
{id:"e11", n:11, ic:"🧮", titre:"Le coût du capital",
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
  const emp=Math.round(Math.min(cp*.4,v*R.ent(8,20)/100)/1000)*1000;
  const cw=Math.round((wacc*100+R.ent(-15,15)/10)*10)/10;
  return {contextes:["Une structure de financement, en valeurs de marché. Impôt à 25 %.",
    "Le financement d'une entreprise cotée, en valeurs de marché. IS à 25 %.",
    "Tu poses le taux d'exigence d'un dossier. Valeurs de marché, IS à 25 %.",
    "La structure de capital d'une cible, en valeurs de marché. IS à 25 %."],
   contexte:"Une structure de financement, en valeurs de marché. Impôt à 25 %.",
   donnees:[["Capitaux propres",cp,"€"],["Dette financière",d,"€"],
            ["Taux d'intérêt de la dette",td*100,"%"],["Coût des fonds propres exigé",kcp*100,"%"]],
   questions:[
    {q:"Quel est le coût de la dette APRÈS impôt, en % ?", val:kd*100, unit:"%", tol:.1,
     calcul:`${(td*100).toFixed(1).replace(".",",")} % × (1 − 25 %) = <b>${(kd*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"C'est le bouclier fiscal : l'État paie un quart de tes intérêts. C'est la seule raison sérieuse pour laquelle la dette est moins chère que les fonds propres."},
    {q:"Quelle est la part des fonds propres dans le financement, en % ?", val:cp/v*100, unit:"%", tol:.4,
     calcul:`${eurX(cp)} ÷ (${eurX(cp)} + ${eurX(d)}) = <b>${(cp/v*100).toFixed(1).replace(".",",")} %</b>`,
     cle:"Les pondérations se prennent en valeurs de MARCHÉ, pas comptables. C'est l'erreur la plus fréquente dans un WACC d'étudiant."},
    {q:"Quel est le WACC, en % ?", val:wacc*100, unit:"%", tol:.15,
     calcul:`${(kcp*100).toFixed(1).replace(".",",")} % × ${(cp/v*100).toFixed(1).replace(".",",")} % + ${(kd*100).toFixed(2).replace(".",",")} % × ${(d/v*100).toFixed(1).replace(".",",")} % = <b>${(wacc*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"Ce taux est la barre. Un projet à "+(wacc*100).toFixed(1).replace(".",",")+" % de rentabilité ne crée rien : il rembourse exactement ce que le capital coûte."},
    {q:`L'entreprise emprunte ${eurX(emp)} de plus pour racheter ses propres actions : la dette monte à ${eurX(d+emp)}, les capitaux propres tombent à ${eurX(cp-emp)}. Quel est le nouveau WACC, à coûts inchangés, en % ?`,
     val:(kcp*((cp-emp)/v)+kd*((d+emp)/v))*100, unit:"%", tol:.15,
     calcul:`${(kcp*100).toFixed(1).replace(".",",")} % × ${((cp-emp)/v*100).toFixed(1).replace(".",",")} % + ${(kd*100).toFixed(2).replace(".",",")} % × ${((d+emp)/v*100).toFixed(1).replace(".",",")} % = <b>${((kcp*((cp-emp)/v)+kd*((d+emp)/v))*100).toFixed(2).replace(".",",")} %</b>, contre ${(wacc*100).toFixed(2).replace(".",",")} %`,
     cle:"À coûts inchangés, remplacer des fonds propres par de la dette fait TOUJOURS baisser le WACC : c'est mécanique, et c'est un piège. Les coûts ne restent pas inchangés — plus de dette, plus de risque pour l'actionnaire, donc un coût des fonds propres qui monte. C'est exactement le sujet du palier 12."},
    {q:`Le banquier remonte son taux d'un point, à ${((td+.01)*100).toFixed(1).replace(".",",")} %. De combien le WACC monte-t-il, en points ?`,
     val:.01*(1-tx)*(d/v)*100, unit:"%", tol:.08,
     calcul:`Un point de taux coûte 0,75 point après impôt, et ne pèse que sur ${(d/v*100).toFixed(1).replace(".",",")} % du financement : 1 % × 75 % × ${(d/v*100).toFixed(1).replace(".",",")} % = <b>${(.01*(1-tx)*(d/v)*100).toFixed(2).replace(".",",")} point</b>`,
     cle:"Une hausse de taux se dilue deux fois : par l'impôt, puis par le poids de la dette dans le financement. C'est pour ça qu'un WACC bouge beaucoup moins vite que les taux, et que les valorisations mettent des mois à s'ajuster."},
    {q:`Un projet doit au minimum rapporter le WACC. Combien doit rapporter par an, en euros, un investissement de ${eurX(v)} pour ne rien détruire ?`,
     val:wacc*v, unit:"€", tol:Math.max(500,wacc*v*.02),
     calcul:`${eurX(v)} × ${(wacc*100).toFixed(2).replace(".",",")} % = <b>${eurX(wacc*v)}</b>`,
     cle:"En dessous, l'entreprise grandit en détruisant de la valeur — en étant parfaitement bénéficiaire. C'est le calcul qui transforme le WACC d'un chiffre de cours en une barre concrète qu'un projet franchit ou ne franchit pas."},
    {q:`Ton comité veut un WACC de ${cw.toFixed(1).replace(".",",")} %. Quel coût des fonds propres cela suppose-t-il, structure et taux inchangés ?`,
     val:(cw/100-kd*(d/v))/(cp/v)*100, unit:"%", tol:.25,
     calcul:`(${cw.toFixed(1).replace(".",",")} % − ${(kd*100).toFixed(2).replace(".",",")} % × ${(d/v*100).toFixed(1).replace(".",",")} %) ÷ ${(cp/v*100).toFixed(1).replace(".",",")} % = <b>${((cw/100-kd*(d/v))/(cp/v)*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"Un WACC ne se décrète pas : il se déduit de ce que la dette coûte et de ce que l'actionnaire exige. Retourner la formule, c'est voir tout de suite si l'hypothèse du comité est tenable ou si elle est une commande politique."}
   ]};}},

/* ============ 12 ============ */
{id:"e12", n:12, ic:"🧮", titre:"Bêta et structure financière",
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
  const btg=Math.round((bl2+R.ent(15,45)/100)*100)/100;
  return {contextes:[`Tu valorises une cible par comparaison avec une société cotée du même métier. Impôt à 25 %.`,
    `Un comparable coté sert de référence pour valoriser une cible non cotée. IS à 25 %.`,
    `Deux sociétés, même métier, endettements différents. Tu dois rendre leur risque comparable. IS à 25 %.`,
    `Tu prépares le coût des fonds propres d'une cible à partir d'un comparable coté. IS à 25 %.`],
   contexte:`Tu valorises une cible par comparaison avec une société cotée du même métier. Impôt à 25 %.`,
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
     cle:"Tout se tient : la structure financière change le bêta, le bêta change le coût des fonds propres, et celui-ci change le WACC — donc la valeur. Voilà pourquoi « quel impact la structure financière » n'est jamais une question rhétorique."},
    {q:"Quel serait le coût des fonds propres de la cible si elle n'avait AUCUNE dette, en % ?",
     val:(rf+bu*prm)*100, unit:"%", tol:.2,
     calcul:`${(rf*100).toFixed(1).replace(".",",")} % + ${bu.toFixed(3).replace(".",",")} × ${(prm*100).toFixed(1).replace(".",",")} % = <b>${((rf+bu*prm)*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"Voilà le prix du risque du MÉTIER, tout seul. Tout ce qui dépasse ce chiffre, dans le coût des fonds propres réel, est payé à cause de la structure financière — pas à cause de l'activité."},
    {q:"De combien la dette de la cible augmente-t-elle le coût de ses fonds propres, en points ?",
     val:(bl2-bu)*prm*100, unit:"%", tol:.15,
     calcul:`(${bl2.toFixed(3).replace(".",",")} − ${bu.toFixed(3).replace(".",",")}) × ${(prm*100).toFixed(1).replace(".",",")} % = <b>${((bl2-bu)*prm*100).toFixed(2).replace(".",",")} points</b>`,
     cle:"C'est la réponse chiffrée à « quel impact la structure financière ». La dette ne fait pas disparaître le risque : elle le transfère aux actionnaires, qui le facturent."},
    {q:`À quel ratio dette / capitaux propres la cible aurait-elle un bêta endetté de ${btg.toFixed(2).replace(".",",")} ?`,
     val:(btg/bu-1)/(1-tx), unit:"×", tol:.06,
     calcul:`${btg.toFixed(2).replace(".",",")} ÷ ${bu.toFixed(3).replace(".",",")} = ${(btg/bu).toFixed(3).replace(".",",")} · (${(btg/bu).toFixed(3).replace(".",",")} − 1) ÷ 0,75 = <b>${((btg/bu-1)/(1-tx)).toFixed(2).replace(".",",")}×</b>`,
     cle:"Hamada se lit dans les deux sens. Savoir la retourner, c'est pouvoir répondre à « jusqu'où peut-on s'endetter avant que l'actionnaire exige X % » — la vraie question d'un comité d'investissement."},
    {q:"De combien le coût des fonds propres de la cible diffère-t-il de celui du comparable, en points ? (négatif si la cible exige moins)",
     val:(bl2-bl)*prm*100, unit:"%", tol:.2,
     calcul:`Comparable : ${(rf*100).toFixed(1).replace(".",",")} % + ${bl.toFixed(2).replace(".",",")} × ${(prm*100).toFixed(1).replace(".",",")} % = ${((rf+bl*prm)*100).toFixed(2).replace(".",",")} % · cible ${((rf+bl2*prm)*100).toFixed(2).replace(".",",")} % · écart <b>${((bl2-bl)*prm*100).toFixed(2).replace(".",",")} points</b>`,
     cle:"Même métier, même risque d'exploitation, et pourtant deux exigences différentes : tout l'écart vient de la structure financière. C'est précisément ce que le désendettement puis le réendettement du bêta servent à isoler."}
   ]};}},

/* ============ 13 · piste PRIX ============ */
{id:"e13", n:13, piste:"prix", ic:"💰", titre:"Lire une élasticité",
 sujet:"Variation en %, élasticité-prix, élastique ou non",
 rappel:`L'élasticité-prix répond à une seule question : <b>si je bouge mon prix de 1 %, de combien bouge mon volume ?</b>
   <br><br><b>Élasticité = (variation du volume en %) ÷ (variation du prix en %).</b>
   <br>Elle est <b>négative</b> presque toujours : le prix monte, le volume descend. C'est normal, et on garde le signe.
   <br><br><b>|e| > 1 : produit ÉLASTIQUE.</b> Le volume réagit plus fort que le prix ne bouge. Une baisse de prix fait gagner beaucoup de volume.
   <br><b>|e| < 1 : produit INÉLASTIQUE.</b> Le volume bouge peu. Baisser le prix ne sert presque à rien.
   <br><br>Ne confonds jamais une variation en <b>points</b> et en <b>pour cent</b> : passer de 20 € à 18 €, c'est −2 € et <b>−10 %</b>. L'élasticité se calcule sur les pour cent.`,
 gen:R=>{
  const p1=R.ent(12,60), baisse=R.ent(5,20);
  const p2=Math.round(p1*(1-baisse/100)*100)/100;
  const q1=R.ent(200,2000)*(R.ent(0,1)?1:10);
  const eVrai=-(R.ent(50,280)/100);
  const q2=Math.round(q1*(1 - eVrai*baisse/100));
  const dP=(p2-p1)/p1*100, dQ=(q2-q1)/q1*100, el=dQ/dP;
  const cible=R.ent(8,30), viser=R.ent(10,35);
  return {contextes:["Un produit, deux mois : tu as baissé le prix et tu regardes ce qui s'est passé.",
    "Un mois de promotion sur une référence, et le volume qui a suivi.",
    "Une gamme de sachets de café : prix d'avant, prix d'après, volumes des deux mois.",
    "Un abonnement dont tu as baissé le tarif, et le nombre d'abonnés avant/après."],
   contexte:"Un produit, deux mois : tu as baissé le prix et tu regardes ce qui s'est passé.",
   donnees:[["Prix avant",p1,"€u"],["Prix après",p2,"€u"],
            ["Volume avant",q1,""],["Volume après",q2,""]],
   questions:[
    {q:"De combien le prix a-t-il varié, en % ?", val:dP, unit:"%", tol:.3,
     calcul:`(${vf(p2)} € − ${vf(p1)} €) ÷ ${vf(p1)} € = <b>${dP.toFixed(1).replace(".",",")} %</b>`,
     cle:"Une variation se calcule TOUJOURS sur la valeur de départ. Et elle garde son signe : ici c'est une baisse, donc un nombre négatif."},
    {q:"De combien le volume a-t-il varié, en % ?", val:dQ, unit:"%", tol:.4,
     calcul:`(${q2} − ${q1}) ÷ ${q1} = <b>${dQ.toFixed(1).replace(".",",")} %</b>`,
     cle:"C'est la réponse du marché. Tout l'exercice consiste à la mettre en face de ce que tu as concédé sur le prix."},
    {q:"Quelle est l'élasticité-prix (valeur signée) ?", val:el, unit:"", tol:.08,
     calcul:`${dQ.toFixed(1).replace(".",",")} % ÷ ${dP.toFixed(1).replace(".",",")} % = <b>${el.toFixed(2).replace(".",",")}</b>`,
     cle:`Elle se lit comme une phrase : « si je bouge mon prix de 1 %, mon volume bouge de ${Math.abs(el).toFixed(2).replace(".",",")} % en sens inverse ». Le signe négatif n'est pas un détail, c'est la loi de la demande.`},
    {q:"Quelle est la valeur absolue de l'élasticité ?", val:Math.abs(el), unit:"", tol:.08,
     calcul:`|${el.toFixed(2).replace(".",",")}| = <b>${Math.abs(el).toFixed(2).replace(".",",")}</b> · ${Math.abs(el)>1?"au-dessus de 1 : produit ÉLASTIQUE":"en dessous de 1 : produit INÉLASTIQUE"}`,
     cle:Math.abs(el)>1?"Au-dessus de 1, le volume réagit plus fort que le prix ne bouge : jouer sur le prix a un vrai effet commercial.":"En dessous de 1, le volume bouge moins que le prix. Baisser le prix te coûte plus qu'il ne te rapporte — c'est la situation du carburant ou du pain."},
    {q:`À cette élasticité, de combien de % bougerait le volume si tu baissais encore le prix de ${cible} % ?`,
     val:Math.abs(el)*cible, unit:"%", tol:.6,
     calcul:`${Math.abs(el).toFixed(2).replace(".",",")} × ${cible} % = <b>+${(Math.abs(el)*cible).toFixed(1).replace(".",",")} %</b> de volume`,
     cle:"L'élasticité est un taux de change : elle convertit des pour cent de prix en pour cent de volume. C'est tout ce qu'elle fait, et c'est déjà beaucoup."},
    {q:`Quelle baisse de prix faudrait-il, en %, pour gagner ${viser} % de volume à cette élasticité ?`,
     val:viser/Math.abs(el), unit:"%", tol:.6,
     calcul:`${viser} % ÷ ${Math.abs(el).toFixed(2).replace(".",",")} = <b>${(viser/Math.abs(el)).toFixed(1).replace(".",",")} %</b> de baisse`,
     cle:"La formule se lit dans les deux sens. C'est ce calcul-là qu'on fait avant d'annoncer une promotion — pas après."},
    {q:"Quel était le chiffre d'affaires du mois AVANT la baisse ?", val:p1*q1, unit:"€",
     calcul:`${vf(p1)} € × ${q1} = <b>${eurX(p1*q1)}</b>`,
     cle:"Retiens ce chiffre : au palier suivant, toute la question sera de savoir si la baisse de prix l'a fait monter ou descendre."}
   ]};}},

/* ============ 14 · piste PRIX ============ */
{id:"e14", n:14, piste:"prix", ic:"💰", titre:"La mesurer proprement",
 sujet:"Élasticité d'arc, point de référence, écart entre les deux méthodes",
 rappel:`Un piège apparaît dès qu'on mesure pour de vrai : <b>le résultat dépend du point de départ choisi</b>. De 20 € à 18 €, c'est −10 %. De 18 € à 20 €, c'est +11,1 %. Même mouvement, deux chiffres.
   <br><br>D'où la méthode standard, dite <b>élasticité d'arc</b> (ou du point milieu) : on divise par la <b>moyenne</b> des deux valeurs, pas par celle de départ.
   <br><br><b>Élasticité d'arc = [ (Q₂−Q₁) ÷ moyenne(Q) ] ÷ [ (P₂−P₁) ÷ moyenne(P) ]</b>
   <br>avec moyenne(Q) = (Q₁+Q₂)/2 et moyenne(P) = (P₁+P₂)/2.
   <br><br>Elle donne le même chiffre dans les deux sens. C'est celle qu'on utilise quand la variation dépasse quelques pour cent — au-delà de 10 %, l'écart avec la méthode naïve devient gênant.`,
 gen:R=>{
  const p1=R.ent(15,80), baisse=R.ent(12,30);
  const p2=Math.round(p1*(1-baisse/100)*100)/100;
  const q1=R.ent(300,3000), eV=-(R.ent(80,260)/100);
  const q2=Math.round(q1*(1 - eV*baisse/100));
  const mP=(p1+p2)/2, mQ=(q1+q2)/2;
  const dPa=(p2-p1)/mP, qUn=q1*(2-dPa)/(2+dPa);   /* Q₂ tel que l'arc vaille −1 */
  const arc=((q2-q1)/mQ)/((p2-p1)/mP);
  const simple=((q2-q1)/q1)/((p2-p1)/p1);
  const inverse=((q1-q2)/q2)/((p1-p2)/p2);
  return {contextes:["Deux relevés réels, et il faut en tirer un chiffre défendable.",
    "Tu compares deux trimestres pour présenter une élasticité à ton comité.",
    "Un test de prix mené sur deux zones : il faut un chiffre qui ne dépende pas du sens de lecture.",
    "Avant/après un repositionnement tarifaire. La variation est forte : la méthode compte."],
   contexte:"Deux relevés réels, et il faut en tirer un chiffre défendable.",
   donnees:[["Prix avant",p1,"€u"],["Prix après",p2,"€u"],["Volume avant",q1,""],["Volume après",q2,""]],
   questions:[
    {q:"Quelle est l'élasticité d'ARC (méthode du point milieu, valeur signée) ?", val:arc, unit:"", tol:.08,
     calcul:`Volume : (${q2} − ${q1}) ÷ ${Math.round(mQ)} = ${((q2-q1)/mQ*100).toFixed(1).replace(".",",")} % · Prix : (${vf(p2)} − ${vf(p1)}) ÷ ${vf(Math.round(mP*100)/100)} = ${((p2-p1)/mP*100).toFixed(1).replace(".",",")} % · rapport <b>${arc.toFixed(2).replace(".",",")}</b>`,
     cle:"On divise par la MOYENNE des deux valeurs. C'est ce qui rend la mesure symétrique : on trouvera le même chiffre en lisant de droite à gauche."},
    {q:"Quelle élasticité donne la méthode naïve (tout rapporté aux valeurs de DÉPART) ?", val:simple, unit:"", tol:.08,
     calcul:`${((q2-q1)/q1*100).toFixed(1).replace(".",",")} % ÷ ${((p2-p1)/p1*100).toFixed(1).replace(".",",")} % = <b>${simple.toFixed(2).replace(".",",")}</b>`,
     cle:"Ce n'est pas une faute grave sur de petites variations. Sur une remise à deux chiffres, ça l'est."},
    {q:"Quel est l'écart entre les deux méthodes, en valeur absolue ?", val:Math.abs(simple-arc), unit:"", tol:.06,
     calcul:`|${simple.toFixed(2).replace(".",",")} − ${arc.toFixed(2).replace(".",",")}| = <b>${Math.abs(simple-arc).toFixed(2).replace(".",",")}</b>`,
     cle:`Sur une variation de prix de ${baisse} %, les deux méthodes ne disent déjà plus la même chose. Quand quelqu'un t'annonce une élasticité, la première question est : mesurée comment ?`},
    {q:"Si tu lisais le mouvement à l'envers (d'après vers avant), que donnerait la méthode naïve ?", val:inverse, unit:"", tol:.08,
     calcul:`(${q1} − ${q2}) ÷ ${q2} = ${((q1-q2)/q2*100).toFixed(1).replace(".",",")} % · (${vf(p1)} − ${vf(p2)}) ÷ ${vf(p2)} = ${((p1-p2)/p2*100).toFixed(1).replace(".",",")} % · rapport <b>${inverse.toFixed(2).replace(".",",")}</b>`,
     cle:"Même mouvement, autre chiffre : voilà exactement le défaut que l'élasticité d'arc corrige. Elle, elle est identique dans les deux sens."},
    {q:"Quelle est la moyenne des deux volumes (le dénominateur de l'arc) ?", val:mQ, unit:"", tol:1,
     calcul:`(${q1} + ${q2}) ÷ 2 = <b>${Math.round(mQ)}</b>`,
     cle:"Un point milieu, rien de plus. C'est la seule différence entre les deux méthodes — et elle suffit à rendre la mesure honnête."},
    {q:"Le produit est-il élastique ? Donne |élasticité d'arc|.", val:Math.abs(arc), unit:"", tol:.08,
     calcul:`<b>${Math.abs(arc).toFixed(2).replace(".",",")}</b> · ${Math.abs(arc)>1?"supérieur à 1 : élastique":"inférieur à 1 : inélastique"}`,
     cle:"Le seuil de 1 ne dépend pas de la méthode, mais un chiffre mesuré à 0,95 ou à 1,05 change la décision. Raison de plus pour mesurer proprement."},
    {q:"Quel volume aurait-il fallu atteindre pour que l'élasticité d'arc vaille exactement −1 ?",
     val:qUn, unit:"", tol:Math.max(3,q1*.02),
     calcul:`On cherche Q₂ tel que (Q₂−Q₁)/moyenne(Q) = −1 × ${((p2-p1)/mP*100).toFixed(1).replace(".",",")} % · Q₂ = Q₁ × (2 − ${(dPa*100).toFixed(1).replace(".",",")} %) ÷ (2 + ${(dPa*100).toFixed(1).replace(".",",")} %) = <b>${Math.round(qUn)}</b>`,
     cle:"À −1 exactement, le chiffre d'affaires ne bouge plus : ce que tu perds en prix, tu le récupères pile en volume. C'est le sujet du palier suivant."}
   ]};}},

/* ============ 15 · piste PRIX ============ */
{id:"e15", n:15, piste:"prix", ic:"💰", titre:"Élasticité et chiffre d'affaires",
 sujet:"Effet d'une baisse de prix sur la recette, le seuil de −1",
 rappel:`Baisser son prix fait toujours deux choses en sens contraire : <b>chaque unité rapporte moins</b>, mais <b>on en vend plus</b>. Lequel des deux l'emporte ? L'élasticité, et elle seule, répond.
   <br><br><b>|e| > 1</b> (élastique) : le volume gagné bat le prix perdu → <b>le chiffre d'affaires MONTE</b> quand tu baisses le prix.
   <br><b>|e| < 1</b> (inélastique) : le volume ne suit pas → <b>le chiffre d'affaires BAISSE</b>. Tu travailles plus pour encaisser moins.
   <br><b>|e| = 1</b> : le chiffre d'affaires ne bouge pas. C'est le sommet de la courbe de recette.
   <br><br>Raccourci utile : <b>variation du CA ≈ (|e| − 1) × baisse de prix en %</b>. Approximation valable pour de petites variations — au-delà, on calcule vraiment : CA = prix × volume, avant et après.
   <br><br>⚠️ Et attention : maximiser le chiffre d'affaires n'est PAS maximiser le profit. Le palier suivant s'occupe de ça.`,
 gen:R=>{
  const p1=R.ent(10,50), baisse=R.ent(8,25), el=-(R.ent(40,260)/100);
  const p2=Math.round(p1*(1-baisse/100)*100)/100;
  const q1=R.ent(400,4000);
  const q2=Math.round(q1*(1 + Math.abs(el)*baisse/100));
  const ca1=p1*q1, ca2=p2*q2, dCA=(ca2-ca1)/ca1*100;
  const hausse=R.ent(6,18);
  const q3=Math.round(q1*(1 - Math.abs(el)*hausse/100));
  const ca3=Math.round(p1*(1+hausse/100)*100)/100*q3;
  return {contextes:[`Ton produit se vend ${p1} € l'unité. L'élasticité mesurée sur ton marché est de ${el.toFixed(2).replace(".",",")}.`,
    `Tu prépares une opération commerciale. Élasticité retenue : ${el.toFixed(2).replace(".",",")}.`,
    `Le comité veut savoir si la remise fera rentrer plus d'argent. Élasticité du segment : ${el.toFixed(2).replace(".",",")}.`,
    `Un arbitrage de tarif, sur un produit dont l'élasticité vaut ${el.toFixed(2).replace(".",",")}.`],
   contexte:`Ton produit se vend ${p1} € l'unité. L'élasticité mesurée sur ton marché est de ${el.toFixed(2).replace(".",",")}.`,
   donnees:[["Prix actuel",p1,"€u"],["Volume actuel",q1,""],["Élasticité-prix",el,""],["Baisse de prix envisagée",baisse,"%"]],
   questions:[
    {q:`Quel volume atteindrais-tu après une baisse de prix de ${baisse} % ?`, val:q2, unit:"", tol:Math.max(2,q2*.01),
     calcul:`${Math.abs(el).toFixed(2).replace(".",",")} × ${baisse} % = +${(Math.abs(el)*baisse).toFixed(1).replace(".",",")} % · ${q1} × ${(1+Math.abs(el)*baisse/100).toFixed(3).replace(".",",")} = <b>${q2}</b>`,
     cle:"Première étape, toujours la même : convertir la baisse de prix en volume avec l'élasticité. Tout le reste en découle."},
    {q:"Quel serait le nouveau chiffre d'affaires ?", val:ca2, unit:"€", tol:Math.max(100,ca2*.012),
     calcul:`${vf(p2)} € × ${q2} = <b>${eurX(ca2)}</b> · contre ${eurX(ca1)} aujourd'hui`,
     cle:"Prix × volume, sur les chiffres d'APRÈS. Pas de raccourci ici : c'est la seule version qui reste juste quand la variation est forte."},
    {q:"De combien varierait le chiffre d'affaires, en % ?", val:dCA, unit:"%", tol:.6,
     calcul:`(${eurX(ca2)} − ${eurX(ca1)}) ÷ ${eurX(ca1)} = <b>${dCA.toFixed(1).replace(".",",")} %</b>`,
     cle:dCA>0?"Le volume gagné bat le prix concédé : la recette monte. Ça ne dit encore rien de ton profit — c'est le palier suivant.":`Tu vends plus et tu encaisses moins. ⚠️ Et regarde |e| = ${Math.abs(el).toFixed(2).replace(".",",")} : ${Math.abs(el)>1?"il est pourtant AU-DESSUS de 1. La règle « |e| > 1 donc le CA monte » ne vaut que pour de petites variations ; sur une baisse de "+baisse+" %, le seuil réel est 1 ÷ (1 − "+baisse+" %) = "+(1/(1-baisse/100)).toFixed(2).replace(".",",")+".":"il est en dessous de 1 : c'est le piège classique de la remise sur un produit inélastique."}`},
    {q:`Et si tu AUGMENTAIS le prix de ${hausse} % au lieu de le baisser : quel serait le volume ?`,
     val:q3, unit:"", tol:Math.max(2,q3*.01),
     calcul:`−${Math.abs(el).toFixed(2).replace(".",",")} × ${hausse} % = ${(-Math.abs(el)*hausse).toFixed(1).replace(".",",")} % · ${q1} × ${(1-Math.abs(el)*hausse/100).toFixed(3).replace(".",",")} = <b>${q3}</b>`,
     cle:"L'élasticité marche dans les deux sens. Sur un produit inélastique, c'est même la hausse — pas la baisse — qui fait rentrer l'argent."},
    {q:`Quel serait le chiffre d'affaires après cette hausse de ${hausse} % ?`, val:ca3, unit:"€", tol:Math.max(100,ca3*.012),
     calcul:`${vf(Math.round(p1*(1+hausse/100)*100)/100)} € × ${q3} = <b>${eurX(ca3)}</b> · contre ${eurX(ca1)} aujourd'hui`,
     cle:Math.abs(el)<1?"Sur un produit inélastique, augmenter le prix augmente la recette. C'est pour ça que le prix du carburant ou du tabac monte sans que les volumes s'effondrent.":"Sur un produit élastique, monter le prix coûte de la recette. Le volume part plus vite que le prix ne gagne."},
    {q:`Pour une baisse de ${baisse} % précisément, à partir de quelle |e| le chiffre d'affaires augmenterait-il ?`,
     val:1/(1-baisse/100), unit:"", tol:.06,
     calcul:`CA après ÷ CA avant = (1 − ${baisse} %) × (1 + |e| × ${baisse} %) · ce rapport dépasse 1 quand |e| > 1 ÷ (1 − ${baisse} %) = <b>${(1/(1-baisse/100)).toFixed(2).replace(".",",")}</b>`,
     cle:`⚠️ Le fameux seuil de 1 n'est exact que pour une variation infinitésimale. Sur une baisse réelle de ${baisse} %, il faut ${(1/(1-baisse/100)).toFixed(2).replace(".",",")}, pas 1 : entre les deux, le chiffre d'affaires BAISSE alors que le manuel dit qu'il monte. C'est le genre d'approximation qui fait perdre de l'argent en vrai.`},
    {q:`Avec le raccourci « variation du CA ≈ (|e| − 1) × baisse », que prévoirait-on pour une baisse de ${baisse} % ?`,
     val:(Math.abs(el)-1)*baisse, unit:"%", tol:.6,
     calcul:`(${Math.abs(el).toFixed(2).replace(".",",")} − 1) × ${baisse} % = <b>${((Math.abs(el)-1)*baisse).toFixed(1).replace(".",",")} %</b> · le calcul exact donnait ${dCA.toFixed(1).replace(".",",")} %`,
     cle:"Le raccourci se fait de tête et suffit à trancher en réunion. Il dérive quand la variation est forte : c'est une boussole, pas une calculatrice."}
   ]};}},

/* ============ 16 · piste PRIX ============ */
{id:"e16", n:16, piste:"prix", ic:"💰", titre:"Élasticité et MARGE",
 sujet:"Volume de compensation, quand une remise se paie vraiment",
 rappel:`Voici le palier qui compte, et celui que presque personne ne calcule avant de solder.
   <br><br>Une remise ne se prend pas sur le prix : <b>elle se prend entièrement sur la marge</b>. Si tu vends 100 € un produit qui t'en coûte 60, ta marge est de 40. Une remise de 10 % te fait vendre à 90 : ta marge tombe à 30, soit <b>−25 %</b>, pour −10 % de prix seulement.
   <br><br>D'où la question qui tranche : <b>combien de volume EN PLUS faut-il pour retrouver la même marge totale ?</b>
   <br><br><b>Volume de compensation = r ÷ (m − r)</b>
   <br>où <b>r</b> = la remise en % du prix et <b>m</b> = ton taux de marge en % du prix.
   <br><br>Ensuite seulement on regarde l'élasticité : elle, elle te donne <b>|e| × r</b> de volume. Si ce qu'elle donne est plus petit que ce qu'il faut, la remise détruit de la marge — même si elle fait monter le chiffre d'affaires.
   <br><br>C'est exactement ce que LA BOÎTE te dit quand elle refuse ton alignement de prix.`,
 gen:R=>{
  const p=R.ent(40,400), m=R.ent(30,65)/100;
  const c=Math.round(p*(1-m)*100)/100;
  const r=R.ent(8,22)/100;
  const el=-(R.ent(60,260)/100);
  const mu1=Math.round((p-c)*100)/100;
  const p2=Math.round(p*(1-r)*100)/100, mu2=Math.round((p2-c)*100)/100;
  const besoin=r/(m-r)*100;
  const donne=Math.abs(el)*r*100;
  const eMin=1/(m-r);
  const q=R.ent(300,3000);
  return {contextes:[`Un concurrent casse les prix. Tu envisages de t'aligner de ${(r*100).toFixed(0)} %.`,
    `Une centrale d'achat te demande ${(r*100).toFixed(0)} % de remise pour référencer le produit.`,
    `Tu prépares une opération à −${(r*100).toFixed(0)} % et le directeur commercial promet du volume.`,
    `Un gros client négocie ${(r*100).toFixed(0)} % de baisse sur son tarif.`],
   contexte:`Un concurrent casse les prix. Tu envisages de t'aligner de ${(r*100).toFixed(0)} %.`,
   donnees:[["Prix de vente",p,"€u"],["Coût variable unitaire",c,"€u"],
            ["Remise envisagée",r*100,"%"],["Élasticité-prix du segment",el,""],["Volume mensuel actuel",q,""]],
   questions:[
    {q:"Quelle est ta marge unitaire AVANT la remise ?", val:mu1, unit:"€", tol:.05,
     calcul:`${vf(p)} € − ${vf(c)} € = <b>${vf(mu1)} €</b> · soit un taux de marge de ${(m*100).toFixed(1).replace(".",",")} %`,
     cle:"Tout part de là. Le taux de marge est le chiffre qui décide si une remise est survivable — pas le chiffre d'affaires."},
    {q:`Quelle serait ta marge unitaire APRÈS une remise de ${(r*100).toFixed(0)} % ?`, val:mu2, unit:"€", tol:.05,
     calcul:`Prix remisé ${vf(p2)} € − ${vf(c)} € = <b>${vf(mu2)} €</b>, contre ${vf(mu1)} € avant`,
     cle:`La remise n'a coûté que ${(r*100).toFixed(0)} % du prix, mais ${((1-mu2/mu1)*100).toFixed(0)} % de la marge. Le coût variable, lui, n'a pas bougé d'un centime : c'est pour ça que l'effet se concentre entièrement sur toi.`},
    {q:"De combien de % ta marge unitaire a-t-elle baissé ?", val:(1-mu2/mu1)*100, unit:"%", tol:.6,
     calcul:`(${vf(mu1)} − ${vf(mu2)}) ÷ ${vf(mu1)} = <b>${((1-mu2/mu1)*100).toFixed(1).replace(".",",")} %</b>`,
     cle:"Voilà le vrai prix d'une remise. On l'annonce en pour cent du prix parce que ça paraît petit ; il faudrait l'annoncer en pour cent de la marge."},
    {q:"Combien de volume EN PLUS, en %, faut-il pour retrouver exactement la même marge totale ?",
     val:besoin, unit:"%", tol:1,
     calcul:`r ÷ (m − r) = ${(r*100).toFixed(0)} % ÷ (${(m*100).toFixed(1).replace(".",",")} % − ${(r*100).toFixed(0)} %) = <b>+${besoin.toFixed(1).replace(".",",")} %</b> · soit ${Math.round(q*(1+besoin/100))} unités au lieu de ${q}`,
     cle:"C'est LE chiffre à poser avant d'accepter une remise. Il ne dépend que de deux choses : ta marge et la remise. Ni du volume, ni du chiffre d'affaires."},
    {q:"Et combien de volume l'élasticité te donne-t-elle réellement, en % ?", val:donne, unit:"%", tol:.6,
     calcul:`${Math.abs(el).toFixed(2).replace(".",",")} × ${(r*100).toFixed(0)} % = <b>+${donne.toFixed(1).replace(".",",")} %</b>`,
     cle:donne>=besoin?"Le marché te donne plus qu'il n'en faut : la remise est rentable. C'est rare, et ça se vérifie, ça ne se suppose pas.":"Le marché te donne moins qu'il n'en faut. La remise fera peut-être monter ton chiffre d'affaires — et baisser ta marge. C'est exactement le piège."},
    {q:"Quel est l'écart entre ce qu'il faut et ce que l'élasticité donne, en points de volume ?",
     val:donne-besoin, unit:"%", tol:1,
     calcul:`${donne.toFixed(1).replace(".",",")} % − ${besoin.toFixed(1).replace(".",",")} % = <b>${(donne-besoin).toFixed(1).replace(".",",")} points</b>`,
     cle:(donne-besoin)>=0?"Positif : la remise crée de la marge. Vérifie quand même que la capacité suit — vendre plus sans pouvoir produire ne rapporte rien.":"Négatif : chaque unité vendue en plus ne rattrape pas ce que la remise a détruit. Un nombre négatif ici, c'est une remise qu'on refuse."},
    {q:"À partir de quelle valeur absolue d'élasticité la remise deviendrait-elle rentable ?",
     val:eMin, unit:"", tol:.1,
     calcul:`Il faut |e| × r ≥ r ÷ (m − r), donc |e| ≥ 1 ÷ (m − r) = 1 ÷ ${((m-r)*100).toFixed(1).replace(".",",")} % = <b>${eMin.toFixed(2).replace(".",",")}</b> · la tienne vaut ${Math.abs(el).toFixed(2).replace(".",",")}`,
     cle:`Le seuil ne dépend que de ta marge et de la remise : ${eMin.toFixed(2).replace(".",",")}. Plus ta marge est fine, plus il monte — c'est pourquoi les métiers à faible marge ne peuvent presque jamais se permettre de solder.`}
   ]};}},

/* ============ 17 · piste PRIX ============ */
{id:"e17", n:17, piste:"prix", ic:"💰", titre:"La mesurer dans la vraie vie",
 sujet:"Biais de mesure, effets parasites, élasticité croisée et élasticité-revenu",
 rappel:`Dans un exercice, l'élasticité se lit. Dans une entreprise, elle se <b>déduit</b> — et mal, si on n'y prend pas garde.
   <br><br><b>Le biais principal : on ne baisse pas les prix au hasard.</b> On les baisse quand les ventes faiblissent. Comparer naïvement deux périodes mélange donc deux choses : l'effet de ton prix, et la raison pour laquelle tu l'as bougé. Le chiffre qui sort est presque toujours <b>sous-estimé</b>.
   <br><br><b>La parade</b> : retirer d'abord tout ce qui n'est pas le prix — la saison, une campagne, un référencement, un concurrent en rupture. Ce qui reste seulement est imputable au prix.
   <br><br>Deux cousines utiles :
   <br><b>· Élasticité CROISÉE = (Δ volume de A en %) ÷ (Δ prix de B en %).</b> Positive → B est un <b>substitut</b> (son prix monte, on se reporte sur A). Négative → un <b>complément</b> (imprimante et cartouches).
   <br><b>· Élasticité-REVENU = (Δ volume en %) ÷ (Δ revenu en %).</b> > 1 : bien de luxe. Entre 0 et 1 : bien courant. Négative : bien inférieur, qu'on abandonne dès qu'on s'enrichit.`,
 gen:R=>{
  const baisse=R.ent(10,20), obs=R.ent(14,34), parasite=R.ent(4,12);
  const vrai=obs-parasite;
  const elBrute=-obs/baisse, elNette=-vrai/baisse;
  const dPb=R.ent(8,20), dQa=R.ent(3,14);
  const croisee=dQa/dPb;
  const dRev=R.ent(3,9), dVol=R.ent(2,20);
  const revenu=dVol/dRev;
  return {contextes:["Un test de prix mené sur trois mois, avec tout ce qui s'est passé à côté.",
    "Le bilan d'une opération commerciale, à démêler de ce qui l'a accompagnée.",
    "Tu dois défendre un chiffre d'élasticité devant un comité qui va le contester.",
    "Les données d'un trimestre, promotion et concurrent compris."],
   contexte:"Un test de prix mené sur trois mois, avec tout ce qui s'est passé à côté.",
   donnees:[["Baisse de prix appliquée",baisse,"%"],["Hausse de volume observée",obs,"%"],
            ["Dont effet d'une campagne publicitaire",parasite,"%"],
            ["Hausse du prix d'un produit concurrent",dPb,"%"],["Hausse de TON volume qui en découle",dQa,"%"],
            ["Hausse du revenu moyen de ta clientèle",dRev,"%"],["Hausse de volume correspondante",dVol,"%"]],
   questions:[
    {q:"Quelle élasticité obtient-on si l'on rapporte bêtement le volume observé à la baisse de prix ?",
     val:elBrute, unit:"", tol:.1,
     calcul:`+${obs} % ÷ −${baisse} % = <b>${elBrute.toFixed(2).replace(".",",")}</b>`,
     cle:"C'est le chiffre que sort un tableur en trente secondes, et celui qu'on présente le plus souvent. Il attribue au prix tout ce qui s'est passé pendant la période."},
    {q:"Quelle est la hausse de volume réellement imputable au PRIX, en % ?", val:vrai, unit:"%", tol:.5,
     calcul:`${obs} % observés − ${parasite} % venus de la campagne = <b>+${vrai} %</b>`,
     cle:"Tout ce qui a bougé en même temps que ton prix n'a pas été causé par ton prix. C'est le geste que la plupart des analyses sautent."},
    {q:"Quelle est l'élasticité une fois l'effet de la campagne retiré ?", val:elNette, unit:"", tol:.1,
     calcul:`+${vrai} % ÷ −${baisse} % = <b>${elNette.toFixed(2).replace(".",",")}</b>, contre ${elBrute.toFixed(2).replace(".",",")} en brut`,
     cle:`L'écart entre ${Math.abs(elBrute).toFixed(2).replace(".",",")} et ${Math.abs(elNette).toFixed(2).replace(".",",")} n'est pas cosmétique : au palier précédent, il décidait si une remise était rentable ou destructrice.`},
    {q:"De combien de % l'élasticité brute surestime-t-elle la vraie ?", val:(Math.abs(elBrute)/Math.abs(elNette)-1)*100, unit:"%", tol:1.5,
     calcul:`${Math.abs(elBrute).toFixed(2).replace(".",",")} ÷ ${Math.abs(elNette).toFixed(2).replace(".",",")} − 1 = <b>${((Math.abs(elBrute)/Math.abs(elNette)-1)*100).toFixed(0)} %</b> de trop`,
     cle:"Surestimer son élasticité conduit à baisser ses prix en croyant que le marché suivra. C'est l'erreur la plus chère de ce module."},
    {q:"Quelle est l'élasticité CROISÉE avec le produit concurrent (valeur signée) ?", val:croisee, unit:"", tol:.08,
     calcul:`+${dQa} % de ton volume ÷ +${dPb} % du prix concurrent = <b>+${croisee.toFixed(2).replace(".",",")}</b>`,
     cle:"Positive : quand son prix monte, on vient chez toi. C'est un SUBSTITUT, et ce chiffre mesure à quel point tu dépends de ce que fait ton concurrent."},
    {q:"Quelle est l'élasticité-REVENU de ton produit ?", val:revenu, unit:"", tol:.1,
     calcul:`+${dVol} % de volume ÷ +${dRev} % de revenu = <b>${revenu.toFixed(2).replace(".",",")}</b>`,
     cle:revenu>1?"Au-dessus de 1 : ton produit est un bien « supérieur », il profite de l'enrichissement de tes clients — et souffre le premier en récession.":"Entre 0 et 1 : un bien courant. Les volumes bougent moins vite que les revenus, à la hausse comme à la baisse. C'est défensif."},
    {q:`Avec l'élasticité NETTE, quel volume supplémentaire en % donnerait une remise de ${baisse} % ?`,
     val:Math.abs(elNette)*baisse, unit:"%", tol:.6,
     calcul:`${Math.abs(elNette).toFixed(2).replace(".",",")} × ${baisse} % = <b>+${(Math.abs(elNette)*baisse).toFixed(1).replace(".",",")} %</b>`,
     cle:"C'est le seul chiffre défendable devant un comité : celui qu'on obtient après avoir retiré ce qui n'était pas le prix."}
   ]};}},

/* ============ 18 · piste PRIX ============ */
{id:"e18", n:18, piste:"prix", ic:"💰", titre:"Par secteur, et le prix optimal",
 sujet:"Règle de Lerner, marge optimale, pourquoi les secteurs ne se tarifient pas pareil",
 rappel:`Le point d'arrivée. On sait mesurer l'élasticité ; on va maintenant s'en servir pour <b>fixer un prix</b>.
   <br><br><b>Règle de Lerner : au prix qui maximise le profit, (P − c) ÷ P = 1 ÷ |e|.</b>
   <br>Autrement dit ton <b>taux de marge optimal est l'inverse de ton élasticité</b>. Élasticité de 2 → 50 % de marge. Élasticité de 5 → 20 %. Élasticité de 1,25 → 80 %.
   <br><br>D'où le <b>prix optimal : P* = c × |e| ÷ (|e| − 1)</b>, avec c le coût variable unitaire.
   <br>⚠️ La formule exige <b>|e| > 1</b>. En dessous, elle ne donne rien : un monopole face à une demande inélastique n'a aucune raison de s'arrêter de monter — ce sont la régulation, la concurrence ou la colère du client qui l'arrêtent, pas les maths.
   <br><br><b>Ce que ça explique</b> : le carburant et le tabac (|e| ≈ 0,3-0,5) supportent des prix et des taxes énormes. La restauration ou le voyage de loisir (|e| ≈ 1,5-3) se battent sur les prix. Un logiciel, dont le coût marginal est quasi nul, ne peut pas se tarifier au coût : son prix vient de la valeur perçue, pas de la formule.`,
 gen:R=>{
  const c=R.ent(8,120), el=-(R.ent(130,400)/100), E=Math.abs(el);
  const mOpt=1/E, pOpt=c*E/(E-1);
  const pAct=Math.round(pOpt*(1+R.ent(-25,25)/100)*100)/100;
  const mAct=(pAct-c)/pAct;
  const elInel=R.ent(30,60)/100;
  const taxe=R.ent(15,40);
  return {contextes:[`Tu fixes le prix d'un produit dont le coût variable est de ${vf(c)} € et l'élasticité de ${el.toFixed(2).replace(".",",")}.`,
    `Un lancement à tarifer. Coût variable ${vf(c)} €, élasticité estimée ${el.toFixed(2).replace(".",",")}.`,
    `Le comité tarifaire arbitre. Coût variable ${vf(c)} €, élasticité du segment ${el.toFixed(2).replace(".",",")}.`,
    `Repositionnement d'une référence : coût variable ${vf(c)} €, élasticité ${el.toFixed(2).replace(".",",")}.`],
   contexte:`Tu fixes le prix d'un produit dont le coût variable est de ${vf(c)} € et l'élasticité de ${el.toFixed(2).replace(".",",")}.`,
   donnees:[["Coût variable unitaire",c,"€u"],["Élasticité-prix",el,""],["Prix pratiqué aujourd'hui",pAct,"€u"],
            ["Élasticité d'un secteur inélastique (carburant)",-elInel,""],["Hausse de taxe envisagée sur ce secteur",taxe,"%"]],
   questions:[
    {q:"Quel est le taux de marge OPTIMAL, en % du prix (règle de Lerner) ?", val:mOpt*100, unit:"%", tol:.8,
     calcul:`1 ÷ |${el.toFixed(2).replace(".",",")}| = 1 ÷ ${E.toFixed(2).replace(".",",")} = <b>${(mOpt*100).toFixed(1).replace(".",",")} %</b>`,
     cle:"Le taux de marge n'est pas une décision de caractère, c'est l'inverse de ton élasticité. Un marché où les clients comparent beaucoup impose une marge fine, quoi qu'on en pense."},
    {q:"Quel est le prix optimal ?", val:pOpt, unit:"€", tol:Math.max(.5,pOpt*.02),
     calcul:`${vf(c)} € × ${E.toFixed(2).replace(".",",")} ÷ (${E.toFixed(2).replace(".",",")} − 1) = ${vf(c)} € × ${(E/(E-1)).toFixed(3).replace(".",",")} = <b>${vf(Math.round(pOpt*100)/100)} €</b>`,
     cle:"Le coût ne fixe pas le prix : il fixe un plancher. C'est l'élasticité qui dit de combien on peut s'en éloigner."},
    {q:"Quel est ton taux de marge ACTUEL, en % du prix ?", val:mAct*100, unit:"%", tol:.8,
     calcul:`(${vf(pAct)} € − ${vf(c)} €) ÷ ${vf(pAct)} € = <b>${(mAct*100).toFixed(1).replace(".",",")} %</b>`,
     cle:mAct<mOpt?"En dessous du taux optimal : tu laisses de l'argent sur la table, ton prix est trop bas pour ton élasticité.":"Au-dessus du taux optimal : ton prix est trop haut pour ton élasticité — le volume perdu coûte plus que la marge gagnée."},
    {q:"De combien le prix pratiqué s'écarte-t-il du prix optimal, en % ?", val:(pAct/pOpt-1)*100, unit:"%", tol:1.5,
     calcul:`${vf(pAct)} € ÷ ${vf(Math.round(pOpt*100)/100)} € − 1 = <b>${((pAct/pOpt-1)*100).toFixed(1).replace(".",",")} %</b>`,
     cle:"Un écart de quelques pour cent n'est pas alarmant : l'élasticité elle-même est estimée. Un écart de vingt l'est — il veut dire qu'on tarife à l'habitude."},
    {q:"Quel taux de marge la règle de Lerner donnerait-elle pour le secteur inélastique du carburant ?",
     val:1/elInel*100, unit:"%", tol:8,
     calcul:`1 ÷ ${elInel.toFixed(2).replace(".",",")} = <b>${(1/elInel*100).toFixed(0)} %</b> — un taux impossible à tenir`,
     cle:"Au-dessus de 100 %, la formule crie qu'elle sort de son domaine : elle exige |e| > 1. Sur un marché inélastique, ce n'est pas l'optimisation qui fixe le prix, c'est la régulation, la concurrence ou l'acceptabilité."},
    {q:`De combien baisserait le volume de carburant si une taxe en augmentait le prix de ${taxe} % ?`,
     val:elInel*taxe, unit:"%", tol:.8,
     calcul:`${elInel.toFixed(2).replace(".",",")} × ${taxe} % = <b>${(elInel*taxe).toFixed(1).replace(".",",")} %</b> de volume en moins seulement`,
     cle:"Voilà pourquoi on taxe les produits inélastiques : les volumes tiennent, donc la recette fiscale rentre. Et voilà aussi pourquoi ces taxes pèsent surtout sur ceux qui ne peuvent pas s'en passer."},
    {q:"À quelle élasticité faudrait-il être pour qu'un taux de marge de 80 % soit optimal ?",
     val:1.25, unit:"", tol:.06,
     calcul:`m = 1 ÷ |e| donc |e| = 1 ÷ 80 % = <b>1,25</b>`,
     cle:"Les marges très élevées ne signalent pas la cupidité mais une demande peu sensible au prix : marque forte, brevet, coût de changement, ou absence d'alternative. Toute la stratégie consiste à faire baisser son propre |e|."}
   ]};}},

/* ================================================================
   PISTE BÊTA — ajoutée le 2026-09-28, sur « l'élasticité n'est pas
   le seul fondamental, fais le bêta sur la même méthode : à quoi ça
   sert (niveau 1), subtilités, comment on le mesure, bons trucs ».

   Le palier 12 (dans LE SOCLE) enseignait déjà Hamada — désendetter,
   réendetter, en repartant d'un bêta DÉJÀ DONNÉ. Cette piste ne le
   répète pas : elle descend EN DESSOUS, exactement comme la piste
   PRIX descend sous l'élasticité déjà utilisée dans LA BOÎTE. D'où
   vient un bêta (la régression), ce qu'il explique vraiment (R²,
   risque systématique contre spécifique), les choix qui changent le
   résultat (fenêtre, fréquence, ajustement de Blume), le geste du
   praticien (bêta bottom-up, moyenne de comparables — Hamada refait
   surface, mais en le CONSTRUISANT au lieu de le recevoir), et enfin
   la sensibilité : pourquoi une erreur de bêta coûte cher en DCF.
   ================================================================ */

/* ============ 19 · piste BÊTA ============ */
{id:"e19", n:19, piste:"beta", ic:"🧭", titre:"À quoi sert un bêta",
 sujet:"MEDAF en une ligne, lire un bêta, rendement attendu",
 rappel:`Le bêta répond à une seule question : <b>si le marché bouge de 1 %, de combien mon action bouge-t-elle, en moyenne ?</b>
   <br><br><b>MEDAF (CAPM) : rendement attendu = taux sans risque + β × prime de risque du marché.</b>
   <br>β = 1 : l'action suit le marché au point près. β = 1,5 : elle amplifie de moitié, dans les deux sens. β = 0,5 : elle n'en fait que la moitié. β négatif (rare) : elle bouge à contre-courant du marché.
   <br><br>Ne confonds pas le bêta avec la VOLATILITÉ totale d'une action : le bêta ne mesure QUE la part de ses mouvements qui suit le marché. Le reste — ce qui lui est propre — c'est le sujet du palier suivant.`,
 gen:R=>{
  const rf=R.ent(2,4)/100, prm=R.ent(5,8)/100;
  const beta=R.ent(40,220)/100, betaB=R.ent(40,220)/100;
  const ke=rf+beta*prm, rm=rf+prm;
  const mv1=R.ent(3,12), mv2=R.ent(3,12);
  const target=R.ent(8,16)/100;
  return {contextes:[`Une action a un bêta de ${beta.toFixed(2).replace(".",",")}.`,
    `Tu regardes la fiche d'une valeur : bêta ${beta.toFixed(2).replace(".",",")}.`,
    `Un gérant te donne le bêta d'une ligne de portefeuille : ${beta.toFixed(2).replace(".",",")}.`,
    `Sur ta feuille de valorisation, une seule donnée de risque pour l'instant : bêta = ${beta.toFixed(2).replace(".",",")}.`],
   contexte:`Une action a un bêta de ${beta.toFixed(2).replace(".",",")}.`,
   donnees:[["Taux sans risque",rf*100,"%"],["Prime de risque du marché",prm*100,"%"],
            ["Bêta de l'action",beta,""],["Bêta d'une seconde action, à comparer",betaB,""]],
   questions:[
    {q:"Quel est le rendement attendu de l'action selon le MEDAF ?", val:ke*100, unit:"%", tol:.3,
     calcul:`${(rf*100).toFixed(1).replace(".",",")} % + ${beta.toFixed(2).replace(".",",")} × ${(prm*100).toFixed(1).replace(".",",")} % = <b>${(ke*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"Le MEDAF ne dit rien d'autre : un taux sans risque, plus une prime proportionnelle au bêta. Toute la mécanique du coût des fonds propres tient dans ces trois chiffres."},
    {q:"Quel est le rendement attendu du marché lui-même (β = 1) ?", val:rm*100, unit:"%", tol:.3,
     calcul:`${(rf*100).toFixed(1).replace(".",",")} % + ${(prm*100).toFixed(1).replace(".",",")} % = <b>${(rm*100).toFixed(1).replace(".",",")} %</b>`,
     cle:"La prime de risque du marché EST, par définition, l'écart entre le rendement attendu du marché et le taux sans risque. Un bêta de 1 redonne donc exactement le rendement du marché — ni plus, ni moins."},
    {q:`Si le marché monte de ${mv1} %, de combien l'action devrait-elle bouger, au premier ordre ?`, val:beta*mv1, unit:"%", tol:.4,
     calcul:`${beta.toFixed(2).replace(".",",")} × ${mv1} % = <b>${(beta*mv1).toFixed(1).replace(".",",")} %</b>`,
     cle:"Le bêta convertit un mouvement de marché en mouvement attendu de l'action — exactement comme l'élasticité convertit un mouvement de prix en mouvement de volume."},
    {q:`Et si le marché baisse de ${mv2} % cette fois, quel mouvement attendre de l'action ?`, val:-beta*mv2, unit:"%", tol:.4,
     calcul:`−${beta.toFixed(2).replace(".",",")} × ${mv2} % = <b>${(-beta*mv2).toFixed(1).replace(".",",")} %</b>`,
     cle:"Le bêta garde le même signe que le marché (sauf s'il est lui-même négatif) : une action à bêta élevé amplifie AUSSI les baisses. Ce n'est pas un outil qui ne joue que dans un sens."},
    {q:"Quelle prime de risque, en points au-dessus du taux sans risque, cette action exige-t-elle ?", val:beta*prm*100, unit:"%", tol:.3,
     calcul:`${beta.toFixed(2).replace(".",",")} × ${(prm*100).toFixed(1).replace(".",",")} % = <b>${(beta*prm*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"C'est la rémunération du risque que le marché accepte de payer pour cette action précise — β fois la prime de marché, rien de plus."},
    {q:"Quelle est la différence de rendement attendu entre les deux actions, en points ?", val:(beta-betaB)*prm*100, unit:"%", tol:.3,
     calcul:`(${beta.toFixed(2).replace(".",",")} − ${betaB.toFixed(2).replace(".",",")}) × ${(prm*100).toFixed(1).replace(".",",")} % = <b>${((beta-betaB)*prm*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"Deux actions, même marché, même taux sans risque : tout l'écart de rendement exigé vient du bêta. C'est la SEULE variable qui différencie deux lignes dans un cadre MEDAF strict."},
    {q:`Quel bêta faudrait-il pour viser un rendement attendu de ${(target*100).toFixed(0)} % ?`, val:(target-rf)/prm, unit:"", tol:.06,
     calcul:`(${(target*100).toFixed(1).replace(".",",")} % − ${(rf*100).toFixed(1).replace(".",",")} %) ÷ ${(prm*100).toFixed(1).replace(".",",")} % = <b>${((target-rf)/prm).toFixed(2).replace(".",",")}</b>`,
     cle:"La formule se lit dans les deux sens : d'un objectif de rendement, on déduit le niveau de risque systématique qu'il faut accepter pour espérer l'atteindre."}
   ]};}},

/* ============ 20 · piste BÊTA ============ */
{id:"e20", n:20, piste:"beta", ic:"🧭", titre:"Le mesurer proprement",
 sujet:"Covariance, corrélation, volatilités — la vraie formule derrière le bêta",
 rappel:`Un bêta ne s'invente pas : c'est la PENTE de la droite de régression des rendements de l'action sur ceux du marché. Deux formules, rigoureusement équivalentes.
   <br><br><b>β = Cov(R_action, R_marché) ÷ Var(R_marché)</b> — la définition statistique brute.
   <br><b>β = ρ × (σ_action ÷ σ_marché)</b> — la même chose, réécrite avec la corrélation ρ et les écarts-types (volatilités) σ. C'est souvent la plus lisible : le bêta est la corrélation au marché, AJUSTÉE par le rapport des deux volatilités.
   <br><br>Cas particulier à retenir : si l'action est exactement aussi volatile que le marché (σ_action = σ_marché), alors <b>β = ρ</b>, tout simplement.`,
 gen:R=>{
  const corr=R.ent(30,90)/100, sigI=R.ent(20,45)/100, sigM=R.ent(12,22)/100;
  const sigIp=sigI*100, sigMp=sigM*100;
  const beta=corr*(sigI/sigM);
  const covp=corr*sigIp*sigMp, varMp=sigMp*sigMp;      /* covariance et variance exprimées en %² — mêmes unités que ce que montre la table de données, pas de conversion cachée */
  const corr2=R.ent(30,90)/100, betaCorr2=corr2*(sigI/sigM);
  const sigI2=R.ent(20,45)/100, betaSig2=corr*(sigI2/sigM);
  const betaEqVol=R.ent(30,120)/100;
  return {contextes:[`Une action et son marché de référence, observés sur plusieurs années de rendements.`,
    `Tu reconstitues un bêta à partir d'une sortie de régression.`,
    `Un data provider te donne la corrélation et les volatilités, pas le bêta directement.`,
    `Avant de faire confiance à un bêta affiché, tu vérifies d'où il vient.`],
   contexte:`Une action et son marché de référence, observés sur plusieurs années de rendements.`,
   donnees:[["Corrélation action / marché (ρ)",corr,""],["Volatilité (écart-type) de l'action",sigIp,"%"],
            ["Volatilité (écart-type) du marché",sigMp,"%"]],
   questions:[
    {q:"Quel est le bêta de l'action (ρ × ratio des volatilités) ?", val:beta, unit:"", tol:.06,
     calcul:`${corr.toFixed(2).replace(".",",")} × (${sigIp.toFixed(0)} % ÷ ${sigMp.toFixed(0)} %) = <b>${beta.toFixed(2).replace(".",",")}</b>`,
     cle:"La corrélation dit SI l'action suit le marché ; le rapport des volatilités dit avec quelle AMPLITUDE. Le bêta est le produit des deux — jamais l'un sans l'autre."},
    {q:"Quelle est la covariance entre les rendements de l'action et ceux du marché, en %² ?", val:covp, unit:"%²", tol:Math.max(3,covp*.04),
     calcul:`${corr.toFixed(2).replace(".",",")} × ${sigIp.toFixed(0)} % × ${sigMp.toFixed(0)} % = <b>${covp.toFixed(0)} %²</b>`,
     cle:"On reste dans les mêmes unités que le tableau — pas besoin de repasser en décimal. La covariance mélange le degré de coïncidence (corrélation) ET l'ampleur des deux mouvements (volatilités) ; seule, elle ne se lit pas — il faut la rapporter à la variance du marché."},
    {q:"Quelle est la variance du marché, en %² (σ_marché²) ?", val:varMp, unit:"%²", tol:Math.max(3,varMp*.03),
     calcul:`${sigMp.toFixed(0)} %² = <b>${varMp.toFixed(0)} %²</b>`,
     cle:"La variance est le carré de l'écart-type — c'est elle, pas la volatilité elle-même, qui entre dans la définition statistique du bêta."},
    {q:"En repartant de la covariance et de la variance du marché (toutes deux en %²), quel bêta retrouves-tu ?", val:covp/varMp, unit:"", tol:.06,
     calcul:`${covp.toFixed(0)} %² ÷ ${varMp.toFixed(0)} %² = <b>${(covp/varMp).toFixed(2).replace(".",",")}</b>`,
     cle:"Le même chiffre que par l'autre formule — ce n'est pas une coïncidence, ce sont deux écritures de la même définition. Les %² s'annulent dans le rapport : c'est pour ça que le bêta n'a pas d'unité. Un bêta qui « tombe juste » par les deux calculs, c'est la preuve qu'on l'a compris."},
    {q:`Si la corrélation au marché montait à ${corr2.toFixed(2).replace(".",",")} (volatilités inchangées), quel serait le nouveau bêta ?`,
     val:betaCorr2, unit:"", tol:.06,
     calcul:`${corr2.toFixed(2).replace(".",",")} × (${(sigI*100).toFixed(0)} % ÷ ${(sigM*100).toFixed(0)} %) = <b>${betaCorr2.toFixed(2).replace(".",",")}</b>`,
     cle:"Une entreprise peut devenir plus corrélée au marché sans devenir plus volatile — un secteur qui se banalise, par exemple. Le bêta bouge alors sans que rien ne change dans le risque PROPRE de l'entreprise."},
    {q:`Et si la volatilité de l'action montait à ${(sigI2*100).toFixed(0)} % sans que sa corrélation au marché ne change, quel serait le nouveau bêta ?`,
     val:betaSig2, unit:"", tol:.06,
     calcul:`${corr.toFixed(2).replace(".",",")} × (${(sigI2*100).toFixed(0)} % ÷ ${(sigM*100).toFixed(0)} %) = <b>${betaSig2.toFixed(2).replace(".",",")}</b>`,
     cle:"Cette fois c'est l'inverse : plus de volatilité propre, même corrélation. Deux chemins totalement différents peuvent faire monter un bêta — un bon analyste demande toujours LEQUEL avant de commenter le chiffre."},
    {q:`Une autre action a exactement la même volatilité que le marché. Si son bêta vaut ${betaEqVol.toFixed(2).replace(".",",")}, quelle est sa corrélation au marché ?`,
     val:betaEqVol, unit:"", tol:.03,
     calcul:`Quand σ_action = σ_marché, le ratio des volatilités vaut 1, donc β = ρ × 1 = ρ = <b>${betaEqVol.toFixed(2).replace(".",",")}</b>`,
     cle:"Le cas particulier du rappel, à l'envers : dès que les deux volatilités sont égales, le bêta EST la corrélation, sans aucun calcul supplémentaire. Un raccourci à reconnaître, pas à démontrer à chaque fois."}
   ]};}},

/* ============ 21 · piste BÊTA ============ */
{id:"e21", n:21, piste:"beta", ic:"🧭", titre:"Ce qu'il explique, ce qu'il n'explique pas",
 sujet:"R², risque systématique contre risque spécifique, ce que la diversification élimine",
 rappel:`Un bêta ne raconte jamais toute l'histoire du risque d'une action. Le <b>R² (coefficient de détermination) = ρ²</b> dit quelle PART de ses mouvements le marché explique réellement.
   <br><br><b>R² élevé</b> : l'essentiel du risque de l'action est SYSTÉMATIQUE — lié au marché, donc capturé par le bêta.
   <br><b>R² faible</b> : l'essentiel est SPÉCIFIQUE (idiosyncratique) — propre à l'entreprise (un procès, un dirigeant, un produit) et SANS RAPPORT avec le marché.
   <br><br>Pourquoi ça compte : dans un portefeuille bien diversifié, le risque SPÉCIFIQUE de chaque ligne s'annule statistiquement avec celui des autres — il disparaît presque gratuitement. Le MEDAF ne rémunère donc QUE le risque systématique, celui qu'aucune diversification ne peut effacer. Un bêta élevé sur un R² famélique n'est pas un bon diagnostic : c'est un bêta mesuré sur du bruit.`,
 gen:R=>{
  const corr=R.ent(25,85)/100, r2=corr*corr;
  const sigI=R.ent(20,45)/100, sigIp=sigI*100, varTotalP=sigIp*sigIp;   /* variance en %² — mêmes unités que la volatilité affichée, pas de conversion cachée */
  const varSysP=r2*varTotalP, varSpecP=varTotalP-varSysP;
  const sigSpecP=Math.sqrt(varSpecP);
  return {contextes:[`Une action affiche une corrélation de ${corr.toFixed(2).replace(".",",")} avec le marché.`,
    `Sortie de régression : corrélation au marché ${corr.toFixed(2).replace(".",",")}.`,
    `Tu veux savoir si le bêta de cette action est fiable — tu regardes d'abord sa corrélation, ${corr.toFixed(2).replace(".",",")}.`,
    `Avant de rémunérer un risque, il faut savoir lequel : corrélation au marché de ${corr.toFixed(2).replace(".",",")}.`],
   contexte:`Une action affiche une corrélation de ${corr.toFixed(2).replace(".",",")} avec le marché.`,
   donnees:[["Corrélation action / marché (ρ)",corr,""],["Volatilité (écart-type) totale de l'action",sigIp,"%"]],
   questions:[
    {q:"Quel est le R² (coefficient de détermination) de cette action par rapport au marché ?", val:r2*100, unit:"%", tol:.8,
     calcul:`${corr.toFixed(2).replace(".",",")}² = <b>${(r2*100).toFixed(1).replace(".",",")} %</b>`,
     cle:"Le R² se lit directement comme un pourcentage de variance expliquée. C'est le carré de la corrélation — jamais la corrélation elle-même."},
    {q:"Quelle part de la variance de l'action est donc SPÉCIFIQUE (idiosyncratique), en % ?", val:(1-r2)*100, unit:"%", tol:.8,
     calcul:`100 % − ${(r2*100).toFixed(1).replace(".",",")} % = <b>${((1-r2)*100).toFixed(1).replace(".",",")} %</b>`,
     cle:"C'est la part du risque que le MEDAF ne rémunère PAS — parce qu'un portefeuille diversifié peut, en théorie, l'éliminer sans rien sacrifier de rendement."},
    {q:"Quelle est la variance TOTALE des rendements de cette action, en %² ?", val:varTotalP, unit:"%²", tol:Math.max(5,varTotalP*.03),
     calcul:`${sigIp.toFixed(0)} %² = <b>${varTotalP.toFixed(0)} %²</b>`,
     cle:"Le point de départ de toute la décomposition : la variance totale, celle qu'un actionnaire non diversifié subit dans son intégralité — le carré de la volatilité affichée, dans les mêmes unités."},
    {q:"Quelle est la variance SYSTÉMATIQUE (celle qu'explique le marché), en %² ?", val:varSysP, unit:"%²", tol:Math.max(5,varSysP*.05),
     calcul:`${(r2*100).toFixed(1).replace(".",",")} % × ${varTotalP.toFixed(0)} %² = <b>${varSysP.toFixed(0)} %²</b>`,
     cle:"C'est la seule part du risque de l'action qui bouge AVEC le marché — celle que le bêta capture, et celle que le MEDAF rémunère."},
    {q:"Quelle est la variance SPÉCIFIQUE (celle que la diversification peut éliminer), en %² ?", val:varSpecP, unit:"%²", tol:Math.max(5,varSpecP*.05),
     calcul:`${varTotalP.toFixed(0)} %² − ${varSysP.toFixed(0)} %² = <b>${varSpecP.toFixed(0)} %²</b>`,
     cle:"Le reliquat : tout ce qui, dans les mouvements de l'action, n'a RIEN à voir avec le marché. C'est cette part-là qu'un portefeuille de trente lignes bien choisies fait disparaître."},
    {q:"Quel est l'écart-type du risque spécifique seul, en % ?", val:sigSpecP, unit:"%", tol:.6,
     calcul:`√${varSpecP.toFixed(0)} %² = <b>${sigSpecP.toFixed(1).replace(".",",")} %</b>`,
     cle:"On repasse en écart-type pour comparer à quelque chose de lisible : c'est l'ampleur du risque qu'un actionnaire NON diversifié porte pour rien — que le marché ne lui paie jamais."}
   ]};}},

/* ============ 22 · piste BÊTA ============ */
{id:"e22", n:22, piste:"beta", ic:"🧭", titre:"Les subtilités du calcul",
 sujet:"Fenêtre d'observation, fréquence des rendements, l'ajustement de Blume",
 rappel:`Un bêta « mesuré » dépend de choix qu'on oublie de questionner. <b>La fenêtre</b> : deux ans de données hebdomadaires (le standard Bloomberg) captent un risque récent mais peu de points ; cinq ans de données mensuelles lissent le bruit mais peuvent inclure une période où l'entreprise n'avait plus le même profil. <b>La fréquence</b> : des rendements quotidiens sont bruités (écarts de cotation, titres peu liquides) — l'hebdomadaire ou le mensuel donnent souvent un bêta plus stable.
   <br><br>Et un fait empirique majeur : les bêtas mesurés par régression ont tendance à <b>revenir vers 1</b> dans le temps — une entreprise très risquée devient rarement AUSSI risquée indéfiniment, et l'inverse. D'où <b>l'ajustement de Blume</b>, utilisé par défaut par la plupart des terminaux financiers :
   <br><br><b>β ajusté = (2/3) × β brut + (1/3) × 1</b>`,
 gen:R=>{
  const rf=R.ent(2,4)/100, prm=R.ent(5,8)/100;
  const betaRaw=R.ent(140,250)/100, betaAdj=(2/3)*betaRaw+(1/3);
  const keRaw=rf+betaRaw*prm, keAdj=rf+betaAdj*prm;
  const betaRaw2=R.ent(30,70)/100, betaAdj2=(2/3)*betaRaw2+(1/3);
  const betaAdjTarget=R.ent(70,160)/100, betaRawSolved=1.5*betaAdjTarget-0.5;
  return {contextes:[`Une régression sur deux ans de rendements hebdomadaires donne un bêta brut de ${betaRaw.toFixed(2).replace(".",",")}.`,
    `Le terminal affiche un bêta brut de ${betaRaw.toFixed(2).replace(".",",")}, avant tout ajustement.`,
    `Une action au comportement récent agité : bêta de régression ${betaRaw.toFixed(2).replace(".",",")}.`,
    `Avant de le mettre dans ton MEDAF, tu regardes le bêta tel qu'il sort de la régression : ${betaRaw.toFixed(2).replace(".",",")}.`],
   contexte:`Une régression sur deux ans de rendements hebdomadaires donne un bêta brut de ${betaRaw.toFixed(2).replace(".",",")}.`,
   donnees:[["Taux sans risque",rf*100,"%"],["Prime de risque du marché",prm*100,"%"],
            ["Bêta brut (régression)",betaRaw,""]],
   questions:[
    {q:"Quel est le bêta ajusté de Blume ?", val:betaAdj, unit:"", tol:.03,
     calcul:`(2/3) × ${betaRaw.toFixed(2).replace(".",",")} + (1/3) × 1 = <b>${betaAdj.toFixed(2).replace(".",",")}</b>`,
     cle:"L'ajustement tire toujours le bêta VERS 1, jamais plus loin de 1. Un bêta brut agressif redescend ; un bêta brut défensif remonte — c'est la même formule dans les deux cas."},
    {q:"Quel est le coût des fonds propres calculé avec le bêta BRUT ?", val:keRaw*100, unit:"%", tol:.3,
     calcul:`${(rf*100).toFixed(1).replace(".",",")} % + ${betaRaw.toFixed(2).replace(".",",")} × ${(prm*100).toFixed(1).replace(".",",")} % = <b>${(keRaw*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"Le point de comparaison : ce que donnerait le MEDAF si on faisait une confiance totale à la régression brute, sans aucun ajustement."},
    {q:"Quel est le coût des fonds propres calculé avec le bêta AJUSTÉ ?", val:keAdj*100, unit:"%", tol:.3,
     calcul:`${(rf*100).toFixed(1).replace(".",",")} % + ${betaAdj.toFixed(2).replace(".",",")} × ${(prm*100).toFixed(1).replace(".",",")} % = <b>${(keAdj*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"Systématiquement plus proche du coût des fonds propres du marché moyen que la version brute — c'est tout l'effet, et tout le but, de l'ajustement."},
    {q:"De combien de points l'ajustement de Blume change-t-il le coût des fonds propres ?", val:keRaw*100-keAdj*100, unit:"%", tol:.3,
     calcul:`${(keRaw*100).toFixed(2).replace(".",",")} % − ${(keAdj*100).toFixed(2).replace(".",",")} % = <b>${(keRaw*100-keAdj*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"Sur un bêta déjà proche de 1, l'ajustement ne change presque rien. Plus le bêta brut est extrême, plus l'écart se creuse — c'est un correctif de queue de distribution, pas un réglage fin permanent."},
    {q:`Pour une action DÉFENSIVE, bêta brut de ${betaRaw2.toFixed(2).replace(".",",")}, quel est le bêta ajusté ?`, val:betaAdj2, unit:"", tol:.03,
     calcul:`(2/3) × ${betaRaw2.toFixed(2).replace(".",",")} + (1/3) × 1 = <b>${betaAdj2.toFixed(2).replace(".",",")}</b>`,
     cle:"Cette fois l'ajustement pousse le bêta VERS LE HAUT, pas vers le bas. La même formule mécanique fait remonter un bêta défensif comme elle fait redescendre un bêta agressif : elle ne connaît qu'un seul point d'attraction, 1."},
    {q:`Quel bêta BRUT donnerait, après ajustement de Blume, un bêta de ${betaAdjTarget.toFixed(2).replace(".",",")} ?`, val:betaRawSolved, unit:"", tol:.05,
     calcul:`${betaAdjTarget.toFixed(2).replace(".",",")} = (2/3) × β brut + 1/3 · β brut = (${betaAdjTarget.toFixed(2).replace(".",",")} − 1/3) ÷ (2/3) = <b>${betaRawSolved.toFixed(2).replace(".",",")}</b>`,
     cle:"Retourner la formule permet de vérifier un chiffre publié : si un terminal affiche un bêta ajusté, on peut reconstituer le bêta brut sous-jacent sans avoir la régression sous les yeux."}
   ]};}},

/* ============ 23 · piste BÊTA ============ */
{id:"e23", n:23, piste:"beta", ic:"🧭", titre:"Le bêta bottom-up",
 sujet:"Désendetter plusieurs comparables, faire la moyenne, réendetter à la cible",
 rappel:`Le geste que fait vraiment un analyste, la plupart du temps : une cible privée, une petite capitalisation peu liquide, ou une DIVISION d'un grand groupe n'a tout simplement <b>pas de bêta de régression fiable</b> — parfois pas de cotation du tout.
   <br><br>La solution standard (méthode Damodaran) : prendre PLUSIEURS comparables cotés du même métier, <b>désendetter</b> chacun de leur bêta (palier 12 — on retire l'effet de LEUR propre dette), faire la <b>MOYENNE</b> de ces bêtas désendettés — c'est elle qui représente le risque du MÉTIER, débarrassé du bruit d'une seule structure financière — puis <b>réendetter</b> cette moyenne à la structure de la cible.
   <br><br>Pourquoi la moyenne et pas un seul comparable ? Parce qu'un bêta individuel reste une mesure bruitée (palier précédent). En moyenner plusieurs, on fait exactement ce que fait la diversification : le bruit spécifique à chaque mesure s'annule, et ce qui reste ressemble davantage au vrai risque du métier.`,
 gen:R=>{
  const tx=.25, rf=R.ent(2,4)/100, prm=R.ent(5,8)/100;
  const bl1=R.ent(80,160)/100, d1=R.ent(20,80)/100, bu1=bl1/(1+(1-tx)*d1);
  const bl2=R.ent(90,180)/100, d2=R.ent(40,120)/100, bu2=bl2/(1+(1-tx)*d2);
  const bl3=R.ent(70,150)/100, d3=R.ent(10,60)/100, bu3=bl3/(1+(1-tx)*d3);
  const buAvg=(bu1+bu2+bu3)/3;
  const dTarget=R.ent(30,100)/100;
  const blTarget=buAvg*(1+(1-tx)*dTarget);
  const keTarget=rf+blTarget*prm;
  const bl2Solo=bu2*(1+(1-tx)*dTarget), ke2Solo=rf+bl2Solo*prm;
  const ecart=(ke2Solo-keTarget)*100;
  return {contextes:[`Trois sociétés cotées du même métier que ta cible non cotée. Impôt à 25 %.`,
    `Ta cible n'a pas de cotation : tu construis son bêta à partir de trois comparables. IS 25 %.`,
    `Une division sans bêta propre — trois comparables purs servent de référence. IS 25 %.`,
    `Le comité veut un coût des fonds propres défendable pour une cible non cotée. Trois comparables, IS 25 %.`],
   contexte:`Trois sociétés cotées du même métier que ta cible non cotée. Impôt à 25 %.`,
   donnees:[["Bêta endetté, comparable 1",bl1,""],["Dette / capitaux propres, comparable 1",d1,"×"],
            ["Bêta endetté, comparable 2",bl2,""],["Dette / capitaux propres, comparable 2",d2,"×"],
            ["Bêta endetté, comparable 3",bl3,""],["Dette / capitaux propres, comparable 3",d3,"×"],
            ["Dette / capitaux propres visée pour la cible",dTarget,"×"]],
   questions:[
    {q:"Quel est le bêta désendetté du comparable 1 ?", val:bu1, unit:"", tol:.03,
     calcul:`${bl1.toFixed(2).replace(".",",")} ÷ [1 + (1 − 25 %) × ${d1.toFixed(2).replace(".",",")}] = <b>${bu1.toFixed(3).replace(".",",")}</b>`,
     cle:"Même geste qu'au palier 12, répété comparable par comparable : on retire l'effet de SA dette pour isoler le risque du métier seul."},
    {q:"Quel est le bêta désendetté du comparable 2 ?", val:bu2, unit:"", tol:.03,
     calcul:`${bl2.toFixed(2).replace(".",",")} ÷ [1 + (1 − 25 %) × ${d2.toFixed(2).replace(".",",")}] = <b>${bu2.toFixed(3).replace(".",",")}</b>`,
     cle:"Un comparable plus endetté a un bêta endetté plus élevé pour un risque de métier comparable — le désendettement remet les trois sur un pied d'égalité."},
    {q:"Quel est le bêta désendetté du comparable 3 ?", val:bu3, unit:"", tol:.03,
     calcul:`${bl3.toFixed(2).replace(".",",")} ÷ [1 + (1 − 25 %) × ${d3.toFixed(2).replace(".",",")}] = <b>${bu3.toFixed(3).replace(".",",")}</b>`,
     cle:"Trois désendettements, trois mesures indépendantes du même risque de métier — la matière première de la moyenne qui vient ensuite."},
    {q:"Quelle est la moyenne des trois bêtas désendettés — le bêta bottom-up du métier ?", val:buAvg, unit:"", tol:.03,
     calcul:`(${bu1.toFixed(3).replace(".",",")} + ${bu2.toFixed(3).replace(".",",")} + ${bu3.toFixed(3).replace(".",",")}) ÷ 3 = <b>${buAvg.toFixed(3).replace(".",",")}</b>`,
     cle:"C'est LE chiffre du palier. Il ne dépend plus de la structure financière d'AUCUNE des trois sociétés — seulement de la nature du métier qu'elles partagent."},
    {q:"Réendetté à la structure visée de la cible, quel est son bêta ?", val:blTarget, unit:"", tol:.03,
     calcul:`${buAvg.toFixed(3).replace(".",",")} × [1 + (1 − 25 %) × ${dTarget.toFixed(2).replace(".",",")}] = <b>${blTarget.toFixed(3).replace(".",",")}</b>`,
     cle:"Le même Hamada qu'au palier 12, mais appliqué à un bêta de métier moyenné — pas au bêta d'une seule entreprise choisie un peu au hasard."},
    {q:"Quel est le coût des fonds propres de la cible avec ce bêta bottom-up ?", val:keTarget*100, unit:"%", tol:.3,
     calcul:`${(rf*100).toFixed(1).replace(".",",")} % + ${blTarget.toFixed(3).replace(".",",")} × ${(prm*100).toFixed(1).replace(".",",")} % = <b>${(keTarget*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"Le chiffre final, défendable devant un comité — parce qu'il repose sur trois mesures indépendantes, pas sur le bêta d'une seule société qui aurait pu avoir un trimestre agité."},
    {q:"Si tu avais utilisé SEULEMENT le comparable 2, réendetté à la même structure cible, de combien de points le coût des fonds propres aurait-il différé du bêta bottom-up ?",
     val:ecart, unit:"%", tol:.3,
     calcul:`Comparable 2 seul, réendetté : ${(ke2Solo*100).toFixed(2).replace(".",",")} % · bottom-up : ${(keTarget*100).toFixed(2).replace(".",",")} % · écart <b>${ecart.toFixed(2).replace(".",",")} %</b>`,
     cle:"Voilà le prix de ne PAS moyenner : un seul comparable, aussi bien choisi soit-il, reste une mesure bruitée. C'est exactement pour ça que la pratique standard en utilise plusieurs."}
   ]};}},

/* ============ 24 · piste BÊTA ============ */
{id:"e24", n:24, piste:"beta", ic:"🧭", titre:"Bêta et le reste du MEDAF",
 sujet:"Sensibilité de la valeur au bêta, repères sectoriels, signaux d'alerte",
 rappel:`Le point d'arrivée. Un bêta n'est jamais une fin en soi : il entre dans le coût des fonds propres, qui entre dans le WACC, qui entre dans un DÉNOMINATEUR de valorisation — et une petite erreur, là, produit un GROS écart de valeur.
   <br><br><b>Repères de bêta, à connaître sans les réciter :</b> biens de consommation courante et utilities, plutôt défensifs, 0,5 à 0,8. Le marché dans son ensemble, 1. Technologie, luxe, cycliques, plutôt 1,3 à 1,8. Compagnies aériennes, matières premières, très endettées : souvent au-delà de 2.
   <br><br>⚠️ <b>Signal d'alerte</b> : un bêta très élevé (> 2,5) ou négatif accompagné d'un R² faible n'est presque jamais un vrai signal de risque — c'est presque toujours une régression mesurée sur du bruit (palier 21). On vérifie le R² AVANT de croire le bêta, jamais après.`,
 gen:R=>{
  const rf=R.ent(2,4)/100, prm=R.ent(5,8)/100;
  const betaLow=R.ent(45,75)/100, betaHigh=R.ent(140,220)/100;
  const keLow=rf+betaLow*prm, keHigh=rf+betaHigh*prm;
  const g=R.ent(15,25)/1000;
  const fcf=100;
  const vLow=fcf/(keLow-g), vHigh=fcf/(keHigh-g);
  const ratio=vLow/vHigh;
  return {contextes:[`Deux entreprises, même flux de trésorerie, secteurs différents.`,
    `Un comparatif sectoriel : une valeur défensive contre une valeur cyclique.`,
    `Tu compares deux profils de risque avant d'arbitrer un portefeuille.`,
    `Le comité veut voir, en euros, ce que change un bêta différent.`],
   contexte:`Deux entreprises, même flux de trésorerie perpétuel de ${fcf} €, mais deux profils de risque très différents.`,
   donnees:[["Taux sans risque",rf*100,"%"],["Prime de risque du marché",prm*100,"%"],
            ["Bêta — secteur défensif",betaLow,""],["Bêta — secteur cyclique",betaHigh,""],
            ["Croissance perpétuelle (g)",g*100,"%"]],
   questions:[
    {q:"Coût des fonds propres pour le secteur DÉFENSIF ?", val:keLow*100, unit:"%", tol:.3,
     calcul:`${(rf*100).toFixed(1).replace(".",",")} % + ${betaLow.toFixed(2).replace(".",",")} × ${(prm*100).toFixed(1).replace(".",",")} % = <b>${(keLow*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"Un bêta bas, hérité d'une demande peu sensible au cycle économique (biens de consommation courante, énergie régulée), donne un coût des fonds propres proche du taux sans risque."},
    {q:"Coût des fonds propres pour le secteur CYCLIQUE ?", val:keHigh*100, unit:"%", tol:.3,
     calcul:`${(rf*100).toFixed(1).replace(".",",")} % + ${betaHigh.toFixed(2).replace(".",",")} × ${(prm*100).toFixed(1).replace(".",",")} % = <b>${(keHigh*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"Un bêta élevé n'est pas une faute : c'est le prix normal d'une activité dont les résultats amplifient le cycle économique."},
    {q:"Écart de coût des fonds propres entre les deux, en points ?", val:(keHigh-keLow)*100, unit:"%", tol:.3,
     calcul:`${(keHigh*100).toFixed(2).replace(".",",")} % − ${(keLow*100).toFixed(2).replace(".",",")} % = <b>${((keHigh-keLow)*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"Quelques points d'écart de taux d'actualisation seulement — et regarde ce que ça produit sur la valeur dans les deux questions suivantes."},
    {q:`Avec un flux perpétuel identique de ${fcf} € et une croissance de ${(g*100).toFixed(1).replace(".",",")} %, quelle valeur obtient l'entreprise DÉFENSIVE (modèle de Gordon) ?`,
     val:vLow, unit:"€", tol:Math.max(20,vLow*.02),
     calcul:`${fcf} € ÷ (${(keLow*100).toFixed(2).replace(".",",")} % − ${(g*100).toFixed(1).replace(".",",")} %) = <b>${vLow.toFixed(0)} €</b>`,
     cle:"Le taux d'actualisation est au DÉNOMINATEUR : plus il est bas, plus la valeur explose. Un bêta faible ne fait pas qu'économiser un peu de risque — il multiplie la valeur."},
    {q:`Et l'entreprise CYCLIQUE, au même flux et à la même croissance ?`, val:vHigh, unit:"€", tol:Math.max(20,vHigh*.02),
     calcul:`${fcf} € ÷ (${(keHigh*100).toFixed(2).replace(".",",")} % − ${(g*100).toFixed(1).replace(".",",")} %) = <b>${vHigh.toFixed(0)} €</b>`,
     cle:"Le même flux, la même croissance — et une valeur nettement plus basse. Le marché ne paie jamais que le risque, il paie la CERTITUDE d'encaisser le flux."},
    {q:"De quel FACTEUR la valeur de l'entreprise défensive dépasse-t-elle celle de la cyclique, à flux identique ?",
     val:ratio, unit:"×", tol:.1,
     calcul:`${vLow.toFixed(0)} € ÷ ${vHigh.toFixed(0)} € = <b>${ratio.toFixed(2).replace(".",",")}×</b>`,
     cle:"Voilà pourquoi une erreur de bêta est une des fautes les plus coûteuses d'une valorisation : elle ne se voit presque pas dans l'hypothèse, et elle se voit ÉNORMÉMENT dans le résultat."}
   ]};}},

/* ================================================================
   PISTE WACC — ajoutée le 2026-09-28, dans la foulée du bêta : « fais
   le WACC aussi ». Le palier 11 (LE SOCLE) donne déjà la formule et la
   calcule avec des chiffres FOURNIS — poids en valeur de marché, coût
   de la dette après impôt, sensibilité au levier. Cette piste ne le
   répète pas : elle attaque ce qu'un praticien affronte vraiment et
   qu'un palier « donné » ne peut pas montrer — la circularité, une
   dette sans marché coté, la structure CIBLE plutôt que celle du jour,
   le WACC par division, et pourquoi une petite erreur dessus coûte
   plus cher qu'ailleurs dans tout le modèle.
   ================================================================ */

/* ============ 25 · piste WACC ============ */
{id:"e25", n:25, piste:"wacc", ic:"🏦", titre:"La circularité, et comment la casser",
 sujet:"Le WACC a besoin de la valeur des fonds propres — que le DCF n'a pas encore calculée",
 rappel:`Un piège que personne ne voit avant de construire son premier DCF : le WACC pondère par la valeur de MARCHÉ des fonds propres (palier 11). Mais dans une valorisation par DCF, cette valeur est précisément ce qu'on cherche — <b>elle sort du DCF, elle n'y entre pas</b>. Le WACC a besoin d'un résultat qu'il n'a pas encore.
   <br><br>Deux façons d'en sortir, les deux légitimes. <b>Itérer</b> : partir d'une valeur de départ (comptable, ou un multiple de comparable), calculer un WACC, en déduire une valeur, recalculer le WACC avec cette nouvelle valeur, et répéter — ça converge en général en trois à cinq passages. <b>Ou trancher directement</b> : pondérer sur une structure financière CIBLE (celle que vise l'entreprise, ou la moyenne du secteur) plutôt que sur une valeur de marché qu'on n'a pas encore. C'est la méthode la plus utilisée en pratique — elle évite la boucle en posant l'hypothèse plutôt qu'en la résolvant.`,
 gen:R=>{
  const d=R.ent(200,600)*1000, eBook=R.ent(400,1400)*1000;
  const kd=R.ent(3,6)/100, ke=R.ent(9,15)/100;
  const fcff=R.ent(150,500)*1000, g=R.ent(10,18)/1000;
  const wacc0=ke*(eBook/(eBook+d))+kd*(d/(eBook+d));
  const ev1=fcff/(wacc0-g), e1=ev1-d;
  const wacc1=ke*(e1/(e1+d))+kd*(d/(e1+d));
  const wDtarget=R.ent(30,55)/100;
  const waccTarget=ke*(1-wDtarget)+kd*wDtarget;
  return {contextes:[`Tu valorises une cible par DCF. Dette financière connue et fixe.`,
    `Un DCF de première passe, avant toute itération.`,
    `Le comité veut un WACC avant même d'avoir une valeur des fonds propres.`,
    `Tu pars de la valeur comptable, faute de mieux, pour amorcer le calcul.`],
   contexte:`Tu valorises une cible par DCF. Dette financière connue et fixe.`,
   donnees:[["Dette financière (fixe)",d,"€"],["Valeur comptable des fonds propres (point de départ)",eBook,"€"],
            ["Coût de la dette après impôt",kd*100,"%"],["Coût des fonds propres",ke*100,"%"],
            ["FCFF perpétuel",fcff,"€"],["Croissance perpétuelle (g)",g*100,"%"]],
   questions:[
    {q:"Avec la valeur comptable des fonds propres comme point de départ, quel est le WACC de première itération ?", val:wacc0*100, unit:"%", tol:.2,
     calcul:`${(ke*100).toFixed(1).replace(".",",")} % × [${eurX(eBook)} ÷ (${eurX(eBook)}+${eurX(d)})] + ${(kd*100).toFixed(1).replace(".",",")} % × [${eurX(d)} ÷ (${eurX(eBook)}+${eurX(d)})] = <b>${(wacc0*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"Ce premier WACC n'a rien de faux — il est juste construit sur une valeur de fonds propres qu'on SAIT provisoire. C'est le point de départ de la boucle, pas son résultat."},
    {q:"En actualisant le FCFF perpétuel à ce WACC, quelle valeur d'entreprise obtiens-tu ?", val:ev1, unit:"€", tol:Math.max(2000,ev1*.015),
     calcul:`${eurX(fcff)} ÷ (${(wacc0*100).toFixed(2).replace(".",",")} % − ${(g*100).toFixed(1).replace(".",",")} %) = <b>${eurX(ev1)}</b>`,
     cle:"C'est le résultat du DCF, mené une première fois avec le WACC provisoire."},
    {q:"Quelle valeur des fonds propres en déduis-tu (valeur d'entreprise moins dette) ?", val:e1, unit:"€", tol:Math.max(2000,Math.abs(e1)*.015),
     calcul:`${eurX(ev1)} − ${eurX(d)} = <b>${eurX(e1)}</b>`,
     cle:"Voilà la boucle qui se referme : cette valeur, presque toujours différente de la valeur comptable de départ, doit maintenant repondérer le WACC."},
    {q:"Avec cette nouvelle valeur des fonds propres, quel est le WACC de seconde itération ?", val:wacc1*100, unit:"%", tol:.2,
     calcul:`${(ke*100).toFixed(1).replace(".",",")} % × [${eurX(e1)} ÷ (${eurX(e1)}+${eurX(d)})] + ${(kd*100).toFixed(1).replace(".",",")} % × [${eurX(d)} ÷ (${eurX(e1)}+${eurX(d)})] = <b>${(wacc1*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"En général, ce deuxième WACC est déjà très proche du troisième qu'on obtiendrait en itérant encore — la boucle converge vite. Deux à trois passages suffisent presque toujours."},
    {q:"De combien de points le WACC a-t-il bougé entre les deux itérations ?", val:(wacc1-wacc0)*100, unit:"%", tol:.2,
     calcul:`${(wacc1*100).toFixed(2).replace(".",",")} % − ${(wacc0*100).toFixed(2).replace(".",",")} % = <b>${((wacc1-wacc0)*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"Si la valeur comptable de départ était très éloignée de la valeur de marché réelle, ce premier pas peut être large — c'est justement le signal qu'il faut continuer à itérer, pas s'arrêter là."},
    {q:`Plutôt que d'itérer, un analyste pressé par le temps pondère directement sur une structure CIBLE de ${(wDtarget*100).toFixed(0)} % de dette (moyenne du secteur). Quel WACC obtient-il, sans aucune itération ?`,
     val:waccTarget*100, unit:"%", tol:.2,
     calcul:`${(ke*100).toFixed(1).replace(".",",")} % × ${(100-wDtarget*100).toFixed(0)} % + ${(kd*100).toFixed(1).replace(".",",")} % × ${(wDtarget*100).toFixed(0)} % = <b>${(waccTarget*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"Ce raccourci ne résout pas la circularité, il la CONTOURNE : on ne cherche plus la valeur de marché de l'entreprise qu'on valorise, on emprunte celle du secteur. C'est la méthode la plus utilisée en pratique — rapide, défendable, et suffisante pour la plupart des comités."}
   ]};}},

/* ============ 26 · piste WACC ============ */
{id:"e26", n:26, piste:"wacc", ic:"🏦", titre:"Le coût de la dette sans marché obligataire",
 sujet:"Ratio de couverture des intérêts, notation synthétique, spread de défaut",
 rappel:`Le coût de la dette (palier 11) suppose un taux observable — un emprunt en cours, une obligation cotée. La plupart des entreprises, notamment privées, n'en ont pas. La méthode standard (Damodaran) : reconstituer une <b>notation synthétique</b> à partir du <b>ratio de couverture des intérêts (ICR = EBIT ÷ intérêts financiers)</b>, lui associer un <b>spread de défaut</b>, puis <b>coût de la dette avant impôt = taux sans risque + spread</b>.
   <br><br><b>Table simplifiée (à utiliser telle quelle) :</b>
   <br>ICR &gt; 8,5 → spread 0,75 % · ICR 6,0-8,5 → 1,25 % · ICR 4,0-6,0 → 2,00 %
   <br>ICR 2,5-4,0 → 3,50 % · ICR 1,5-2,5 → 5,50 % · ICR &lt; 1,5 → 9,00 %
   <br><br>Plus l'EBIT couvre largement les intérêts, plus le risque de défaut perçu est bas, plus le spread — et donc le coût de la dette — est faible.`,
 gen:R=>{
  const spreadTable=[[8.5,.0075],[6.0,.0125],[4.0,.02],[2.5,.035],[1.5,.055],[0,.09]];
  const spreadFor=icr=>{ for(const [seuil,sp] of spreadTable) if(icr>seuil) return sp; return .09; };
  const rf=R.ent(2,4)/100, tx=.25;
  const ebit1=R.ent(300,1800)*1000, int1=R.ent(40,700)*1000, icr1=ebit1/int1;
  const spread1=spreadFor(icr1), kdPre1=rf+spread1, kdApres1=kdPre1*(1-tx);
  const ebit2=R.ent(300,1800)*1000, int2=R.ent(40,700)*1000, icr2=ebit2/int2;
  const spread2=spreadFor(icr2), kdPre2=rf+spread2, kdApres2=kdPre2*(1-tx);
  return {contextes:[`Une cible sans dette cotée : impossible de lire un coût de la dette sur un marché.`,
    `Deux entreprises non cotées, à comparer sur leur coût de financement implicite.`,
    `Avant toute valorisation, il faut un coût de la dette — et il n'y a pas d'obligation à observer.`,
    `Le comité veut un WACC complet ; personne n'a le taux d'emprunt réel de la cible.`],
   contexte:`Une cible sans dette cotée : impossible de lire un coût de la dette sur un marché. Impôt à 25 %.`,
   donnees:[["Taux sans risque",rf*100,"%"],["EBIT, entreprise 1",ebit1,"€"],["Intérêts financiers, entreprise 1",int1,"€"],
            ["EBIT, entreprise 2",ebit2,"€"],["Intérêts financiers, entreprise 2",int2,"€"]],
   questions:[
    {q:"Quel est le ratio de couverture des intérêts (ICR) de l'entreprise 1 ?", val:icr1, unit:"×", tol:.15,
     calcul:`${eurX(ebit1)} ÷ ${eurX(int1)} = <b>${icr1.toFixed(2).replace(".",",")}×</b>`,
     cle:"C'est le chiffre qui remplace le marché obligataire absent : plus il est élevé, plus l'EBIT couvre largement les intérêts, moins le risque de défaut perçu est grand."},
    {q:"D'après la table, à quel spread de défaut cela correspond-il, en % ?", val:spread1*100, unit:"%", tol:.05,
     calcul:`ICR = ${icr1.toFixed(2).replace(".",",")}× → tranche correspondante → <b>${(spread1*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"La table n'est pas à retenir par cœur — elle est à savoir UTILISER, comme un barème d'imposition. C'est exactement ce que fait un analyste qui n'a pas de terminal Bloomberg sous la main."},
    {q:"Quel est le coût de la dette AVANT impôt de l'entreprise 1 ?", val:kdPre1*100, unit:"%", tol:.15,
     calcul:`${(rf*100).toFixed(1).replace(".",",")} % + ${(spread1*100).toFixed(2).replace(".",",")} % = <b>${(kdPre1*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"Taux sans risque plus spread de défaut : c'est la même logique qu'une obligation d'entreprise cotée, reconstituée sans marché pour la lire directement."},
    {q:"Et APRÈS impôt ?", val:kdApres1*100, unit:"%", tol:.15,
     calcul:`${(kdPre1*100).toFixed(2).replace(".",",")} % × (1 − 25 %) = <b>${(kdApres1*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"Le bouclier fiscal s'applique exactement comme sur une dette cotée — la nature du coût ne change pas, seule sa mesure a demandé un détour."},
    {q:"Quel est le ratio de couverture des intérêts de l'entreprise 2 ?", val:icr2, unit:"×", tol:.15,
     calcul:`${eurX(ebit2)} ÷ ${eurX(int2)} = <b>${icr2.toFixed(2).replace(".",",")}×</b>`,
     cle:"Un second cas, pour vérifier que la table se lit dans les deux sens — pas seulement sur l'exemple qu'on vient de voir."},
    {q:"Quel est l'écart de coût de la dette APRÈS impôt entre les deux entreprises, en points ?", val:(kdApres1-kdApres2)*100, unit:"%", tol:.2,
     calcul:`${(kdApres1*100).toFixed(2).replace(".",",")} % − ${(kdApres2*100).toFixed(2).replace(".",",")} % = <b>${((kdApres1-kdApres2)*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"Deux entreprises, même taux sans risque, et un coût de la dette qui peut s'écarter de plusieurs points — uniquement parce que l'une couvre ses intérêts bien plus largement que l'autre. Le risque de crédit n'est jamais qu'une opinion : ici, il se lit dans un seul ratio."}
   ]};}},

/* ============ 27 · piste WACC ============ */
{id:"e27", n:27, piste:"wacc", ic:"🏦", titre:"Structure cible, pas structure du jour",
 sujet:"Pourquoi on pondère souvent sur la structure financière VISÉE plutôt que sur celle d'aujourd'hui",
 rappel:`Une entreprise qui sort d'un LBO, qui vient de faire un rachat d'actions massif, ou qui traverse une année atypique, a une structure financière du moment qui ne dit rien de sa trajectoire de long terme. Or un WACC sert à actualiser des flux sur dix, vingt ans — figer la structure d'AUJOURD'HUI reviendrait à parier qu'elle ne bougera jamais.
   <br><br>La pratique standard : pondérer (et réendetter le bêta — palier 23) sur une structure <b>CIBLE</b> — celle que vise l'entreprise, ou la moyenne durable du secteur — plutôt que sur la structure ACTUELLE, souvent transitoire. Le bêta désendetté du métier ne change pas ; ce qui change, c'est à QUELLE structure on le réendette.`,
 gen:R=>{
  const tx=.25, rf=R.ent(2,4)/100, prm=R.ent(5,8)/100;
  const bu=R.ent(70,140)/100;
  const wDnow=R.ent(55,75)/100, wDtarget=R.ent(25,40)/100;
  const deNow=wDnow/(1-wDnow), deTarget=wDtarget/(1-wDtarget);
  const betaNow=bu*(1+(1-tx)*deNow), betaTarget=bu*(1+(1-tx)*deTarget);
  const keNow=rf+betaNow*prm, keTarget=rf+betaTarget*prm;
  const kdPre=R.ent(3,7)/100, kdApres=kdPre*(1-tx);
  const waccNow=keNow*(1-wDnow)+kdApres*wDnow;
  const waccTarget=keTarget*(1-wDtarget)+kdApres*wDtarget;
  return {contextes:[`Une cible sortie d'un LBO, encore fortement endettée, qui vise une structure plus saine à horizon de cinq ans.`,
    `Une entreprise qui vient de racheter massivement ses propres actions — sa dette du jour n'est pas sa dette de croisière.`,
    `Le comité hésite entre pondérer sur la dette d'aujourd'hui ou sur celle visée à terme.`,
    `Une structure financière transitoire, et un WACC censé tenir sur vingt ans.`],
   contexte:`Une cible sortie d'un LBO, encore fortement endettée, qui vise une structure plus saine à terme. Impôt à 25 %.`,
   donnees:[["Bêta désendetté du métier",bu,""],["Part de dette ACTUELLE (D/V)",wDnow*100,"%"],
            ["Part de dette CIBLE (D/V)",wDtarget*100,"%"],["Coût de la dette après impôt",kdApres*100,"%"],
            ["Taux sans risque",rf*100,"%"],["Prime de risque du marché",prm*100,"%"]],
   questions:[
    {q:"Quel est le bêta réendetté à la structure ACTUELLE ?", val:betaNow, unit:"", tol:.04,
     calcul:`${bu.toFixed(2).replace(".",",")} × [1 + (1 − 25 %) × ${deNow.toFixed(2).replace(".",",")}] = <b>${betaNow.toFixed(2).replace(".",",")}</b>`,
     cle:"Hamada, comme au palier 23 — mais réendetté à une structure qu'on sait temporaire. Ce bêta est réel aujourd'hui ; il ne le restera pas dix ans."},
    {q:"Quel est le bêta réendetté à la structure CIBLE ?", val:betaTarget, unit:"", tol:.04,
     calcul:`${bu.toFixed(2).replace(".",",")} × [1 + (1 − 25 %) × ${deTarget.toFixed(2).replace(".",",")}] = <b>${betaTarget.toFixed(2).replace(".",",")}</b>`,
     cle:"Le MÊME bêta désendetté, réendetté à une structure différente. Seule la dette suppose change ; le risque du métier, lui, n'a pas bougé."},
    {q:"Quel est le coût des fonds propres à la structure ACTUELLE ?", val:keNow*100, unit:"%", tol:.3,
     calcul:`${(rf*100).toFixed(1).replace(".",",")} % + ${betaNow.toFixed(2).replace(".",",")} × ${(prm*100).toFixed(1).replace(".",",")} % = <b>${(keNow*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"Plus la dette actuelle est lourde, plus ce chiffre est élevé — l'actionnaire d'une structure encore très endettée exige davantage, et c'est cohérent."},
    {q:"Et à la structure CIBLE ?", val:keTarget*100, unit:"%", tol:.3,
     calcul:`${(rf*100).toFixed(1).replace(".",",")} % + ${betaTarget.toFixed(2).replace(".",",")} × ${(prm*100).toFixed(1).replace(".",",")} % = <b>${(keTarget*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"Une fois la dette redescendue au niveau visé, l'actionnaire exige mécaniquement moins — pas parce que le métier a changé, mais parce que le risque financier qui s'ajoute au risque du métier s'est réduit."},
    {q:"Quel est le WACC à la structure ACTUELLE ?", val:waccNow*100, unit:"%", tol:.25,
     calcul:`${(keNow*100).toFixed(2).replace(".",",")} % × ${(100-wDnow*100).toFixed(0)} % + ${(kdApres*100).toFixed(2).replace(".",",")} % × ${(wDnow*100).toFixed(0)} % = <b>${(waccNow*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"Un WACC construit sur une photo d'aujourd'hui qu'on sait provisoire — utile pour comprendre le point de départ, dangereux pour actualiser vingt ans de flux."},
    {q:"Quel est le WACC à la structure CIBLE ?", val:waccTarget*100, unit:"%", tol:.25,
     calcul:`${(keTarget*100).toFixed(2).replace(".",",")} % × ${(100-wDtarget*100).toFixed(0)} % + ${(kdApres*100).toFixed(2).replace(".",",")} % × ${(wDtarget*100).toFixed(0)} % = <b>${(waccTarget*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"C'est ce WACC-là, presque toujours, qu'un DCF sérieux utilise — quitte à faire converger progressivement les deux structures sur les premières années explicites du modèle plutôt que de trancher brutalement."}
   ]};}},

/* ============ 28 · piste WACC ============ */
{id:"e28", n:28, piste:"wacc", ic:"🏦", titre:"Le WACC par division",
 sujet:"Pourquoi un groupe à plusieurs métiers n'a pas UN SEUL WACC — la somme des parties",
 rappel:`Un groupe qui possède à la fois une activité stable (régulée, défensive) et une activité risquée (technologique, cyclique) commet une faute classique en les actualisant TOUTES LES DEUX au même WACC consolidé.
   <br><br>Un WACC unique, moyenné sur l'ensemble du groupe, <b>SUR-évalue systématiquement la division risquée</b> (ses flux, dangereux, sont actualisés à un taux trop doux) et <b>SOUS-évalue la division stable</b> (ses flux, sûrs, sont actualisés à un taux trop dur). La bonne pratique — la <b>somme des parties</b> (sum-of-the-parts) — actualise chaque division à SON PROPRE WACC, dérivé de comparables purs de son métier (palier 23), puis additionne les valeurs.`,
 gen:R=>{
  const tx=.25, rf=R.ent(2,4)/100, prm=R.ent(5,8)/100, wD=R.ent(25,40)/100, kdApres=R.ent(3,6)/100*(1-tx);
  const betaA=R.ent(40,70)/100, betaB=R.ent(140,210)/100;
  const fcfA=R.ent(150,400)*1000, fcfB=R.ent(80,250)*1000;
  const g=R.ent(8,15)/1000;
  const keA=rf+betaA*prm, keB=rf+betaB*prm;
  const waccA=keA*(1-wD)+kdApres*wD, waccB=keB*(1-wD)+kdApres*wD;
  const vA=fcfA/(waccA-g), vB=fcfB/(waccB-g);
  const betaBlend=(fcfA*betaA+fcfB*betaB)/(fcfA+fcfB);
  const keBlend=rf+betaBlend*prm, waccBlend=keBlend*(1-wD)+kdApres*wD;
  const vAwrong=fcfA/(waccBlend-g), vBwrong=fcfB/(waccBlend-g);
  return {contextes:[`Un groupe à deux métiers : une division défensive (A) et une division cyclique (B). Même structure financière pour les deux.`,
    `Le comité prépare une somme des parties : deux divisions, deux profils de risque.`,
    `Avant de valoriser le groupe, il faut décider : un WACC pour tout, ou un WACC par division ?`,
    `Une conglomérat classique — activité stable d'un côté, activité risquée de l'autre.`],
   contexte:`Un groupe à deux métiers : une division défensive (A) et une division cyclique (B), même structure financière (D/V) pour les deux. Impôt à 25 %.`,
   donnees:[["Bêta, division défensive (A)",betaA,""],["Bêta, division cyclique (B)",betaB,""],
            ["FCF perpétuel, division A",fcfA,"€"],["FCF perpétuel, division B",fcfB,"€"],
            ["Part de dette (D/V), commune aux deux",wD*100,"%"],["Croissance perpétuelle (g)",g*100,"%"]],
   questions:[
    {q:"Quel est le WACC de la division défensive (A) ?", val:waccA*100, unit:"%", tol:.25,
     calcul:`Ke_A = ${(rf*100).toFixed(1).replace(".",",")} % + ${betaA.toFixed(2).replace(".",",")} × ${(prm*100).toFixed(1).replace(".",",")} % = ${(keA*100).toFixed(2).replace(".",",")} % · WACC_A = ${(keA*100).toFixed(2).replace(".",",")} % × ${(100-wD*100).toFixed(0)} % + ${(kdApres*100).toFixed(2).replace(".",",")} % × ${(wD*100).toFixed(0)} % = <b>${(waccA*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"Le WACC propre au métier A — celui qu'utiliserait n'importe quel investisseur qui achèterait CETTE division seule, cotée séparément."},
    {q:"Quel est le WACC de la division cyclique (B) ?", val:waccB*100, unit:"%", tol:.25,
     calcul:`Ke_B = ${(rf*100).toFixed(1).replace(".",",")} % + ${betaB.toFixed(2).replace(".",",")} × ${(prm*100).toFixed(1).replace(".",",")} % = ${(keB*100).toFixed(2).replace(".",",")} % · WACC_B = ${(keB*100).toFixed(2).replace(".",",")} % × ${(100-wD*100).toFixed(0)} % + ${(kdApres*100).toFixed(2).replace(".",",")} % × ${(wD*100).toFixed(0)} % = <b>${(waccB*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"Nettement au-dessus du WACC de la division A — c'est le prix normal d'une activité plus risquée, et c'est exactement ce qu'un WACC unique effacerait."},
    {q:"Si on calcule un WACC consolidé unique, à partir d'un bêta moyenné par les flux des deux divisions, que trouve-t-on ?", val:waccBlend*100, unit:"%", tol:.25,
     calcul:`β moyen = (${eurX(fcfA)} × ${betaA.toFixed(2).replace(".",",")} + ${eurX(fcfB)} × ${betaB.toFixed(2).replace(".",",")}) ÷ (${eurX(fcfA)}+${eurX(fcfB)}) = ${betaBlend.toFixed(2).replace(".",",")} · WACC = <b>${(waccBlend*100).toFixed(2).replace(".",",")} %</b>`,
     cle:"Un chiffre qui n'est ni le bon taux pour A, ni le bon taux pour B — une moyenne qui n'existe dans la réalité d'AUCUNE des deux divisions."},
    {q:"Avec le bon WACC de chaque division (somme des parties), quelle est la valeur totale du groupe ?", val:vA+vB, unit:"€", tol:Math.max(5000,(vA+vB)*.02),
     calcul:`A : ${eurX(fcfA)} ÷ (${(waccA*100).toFixed(2).replace(".",",")} % − ${(g*100).toFixed(1).replace(".",",")} %) = ${eurX(vA)} · B : ${eurX(fcfB)} ÷ (${(waccB*100).toFixed(2).replace(".",",")} % − ${(g*100).toFixed(1).replace(".",",")} %) = ${eurX(vB)} · total <b>${eurX(vA+vB)}</b>`,
     cle:"La bonne valeur, division par division, puis additionnée. C'est la définition même de la somme des parties."},
    {q:"Avec le WACC consolidé UNIQUE appliqué aux deux divisions, quelle valeur totale obtient-on ?", val:vAwrong+vBwrong, unit:"€", tol:Math.max(5000,(vAwrong+vBwrong)*.02),
     calcul:`A : ${eurX(fcfA)} ÷ (${(waccBlend*100).toFixed(2).replace(".",",")} % − ${(g*100).toFixed(1).replace(".",",")} %) = ${eurX(vAwrong)} · B : ${eurX(fcfB)} ÷ (${(waccBlend*100).toFixed(2).replace(".",",")} % − ${(g*100).toFixed(1).replace(".",",")} %) = ${eurX(vBwrong)} · total <b>${eurX(vAwrong+vBwrong)}</b>`,
     cle:"Le total peut sembler proche du bon chiffre — c'est le piège. Ce qui est faux n'est pas la somme, c'est la RÉPARTITION entre les deux divisions."},
    {q:"De combien la division B (risquée) est-elle SUR-évaluée si on la calcule, par erreur, au WACC consolidé unique au lieu de son propre WACC ?",
     val:vBwrong-vB, unit:"€", tol:Math.max(3000,Math.abs(vBwrong-vB)*.03),
     calcul:`${eurX(vBwrong)} − ${eurX(vB)} = <b>${eurX(vBwrong-vB)}</b> de sur-évaluation`,
     cle:"Voilà le vrai coût de l'erreur : pas sur le total du groupe, qui peut sembler à peu près juste par compensation — mais sur CHAQUE division prise séparément. Une erreur invisible en négociant le prix global, très visible dès qu'on cède ou qu'on compare une seule division."}
   ]};}},

/* ============ 29 · piste WACC ============ */
{id:"e29", n:29, piste:"wacc", ic:"🏦", titre:"Sensibilité — pourquoi une erreur coûte cher",
 sujet:"L'effet d'une petite erreur de WACC sur un DCF complet, valeur terminale comprise",
 rappel:`Un WACC ne se contente pas d'actualiser un flux : il actualise TOUS les flux futurs, y compris la valeur terminale — qui pèse souvent 60 à 80 % d'un DCF. Une erreur de WACC ne coûte donc pas qu'une fois : elle se compose sur tout l'horizon ET sur la valeur terminale, qui l'amplifie encore.
   <br><br>C'est très différent d'une erreur sur UN flux de trésorerie : celle-là ne coûte que ce qu'elle vaut, actualisée une fois. Une erreur de WACC, elle, se propage à TOUT le modèle à la fois — c'est pour ça qu'elle est, ligne pour ligne, l'hypothèse la plus dangereuse d'un DCF.`,
 gen:R=>{
  const fcf1=R.ent(80,200)*1000, fcf2=R.ent(90,220)*1000, fcf3=R.ent(100,240)*1000;
  const wacc=R.ent(80,130)/1000, g=R.ent(10,18)/1000;
  const waccErr=wacc-.005;
  const tvOf=w=>fcf3*(1+g)/(w-g);
  const pvFcfOf=w=>fcf1/(1+w)+fcf2/Math.pow(1+w,2)+fcf3/Math.pow(1+w,3);
  const evOf=w=>pvFcfOf(w)+tvOf(w)/Math.pow(1+w,3);
  const tv=tvOf(wacc), pvTv=tv/Math.pow(1+wacc,3), pvFcf=pvFcfOf(wacc), ev=pvFcf+pvTv;
  const tvErr=tvOf(waccErr), evErr=evOf(waccErr);
  const partTv=pvTv/ev*100, ecartPct=(evErr-ev)/ev*100;
  const fcf1Err=R.ent(15,40)*1000;
  const impactFcf1=fcf1Err/(1+wacc);
  return {contextes:[`Un DCF explicite sur trois ans, plus une valeur terminale.`,
    `Un modèle complet, avant de tester sa robustesse au WACC.`,
    `Le comité veut savoir ce qu'une hypothèse de WACC un peu optimiste change vraiment.`,
    `Trois années de flux, une valeur terminale, et une question : que se passe-t-il si le WACC est sous-estimé ?`],
   contexte:`Un DCF explicite sur trois ans, plus une valeur terminale au-delà.`,
   donnees:[["FCFF année 1",fcf1,"€"],["FCFF année 2",fcf2,"€"],["FCFF année 3",fcf3,"€"],
            ["WACC retenu",wacc*100,"%"],["Croissance perpétuelle (g)",g*100,"%"]],
   questions:[
    {q:"Quelle est la valeur terminale, au WACC retenu (fin d'année 3) ?", val:tv, unit:"€", tol:Math.max(3000,tv*.02),
     calcul:`${eurX(fcf3)} × (1+${(g*100).toFixed(1).replace(".",",")} %) ÷ (${(wacc*100).toFixed(1).replace(".",",")} % − ${(g*100).toFixed(1).replace(".",",")} %) = <b>${eurX(tv)}</b>`,
     cle:"Gordon, appliqué au dernier flux explicite : c'est la valeur de tout ce qui vient APRÈS l'horizon détaillé, encore non actualisée à aujourd'hui."},
    {q:"Quelle part du total (flux explicites + valeur terminale, tous deux actualisés) représente la valeur terminale actualisée ?",
     val:partTv, unit:"%", tol:2,
     calcul:`VA de la valeur terminale ÷ valeur d'entreprise totale = <b>${partTv.toFixed(1).replace(".",",")} %</b>`,
     cle:"C'est le chiffre à garder en tête à chaque DCF : l'essentiel de la valeur ne vient presque jamais des trois années qu'on a pris la peine de détailler."},
    {q:`Avec un WACC sous-estimé de 0,5 point (${(waccErr*100).toFixed(1).replace(".",",")} % au lieu de ${(wacc*100).toFixed(1).replace(".",",")} %), quelle est la nouvelle valeur terminale ?`,
     val:tvErr, unit:"€", tol:Math.max(3000,tvErr*.02),
     calcul:`${eurX(fcf3)} × (1+${(g*100).toFixed(1).replace(".",",")} %) ÷ (${(waccErr*100).toFixed(1).replace(".",",")} % − ${(g*100).toFixed(1).replace(".",",")} %) = <b>${eurX(tvErr)}</b>`,
     cle:"Un demi-point de WACC en moins, et la valeur terminale seule bouge déjà nettement — avant même de parler du reste du modèle."},
    {q:"Quelle est la nouvelle valeur d'entreprise totale, à ce WACC sous-estimé ?", val:evErr, unit:"€", tol:Math.max(3000,evErr*.02),
     calcul:`Flux actualisés + valeur terminale actualisée, au WACC erroné = <b>${eurX(evErr)}</b> contre ${eurX(ev)} au bon WACC`,
     cle:"L'erreur ne touche pas qu'un poste : elle réactualise absolument TOUT le modèle, flux explicites compris."},
    {q:"De quel pourcentage la valeur d'entreprise a-t-elle été surestimée à cause de cette seule erreur de 0,5 point ?",
     val:ecartPct, unit:"%", tol:1,
     calcul:`(${eurX(evErr)} − ${eurX(ev)}) ÷ ${eurX(ev)} = <b>${ecartPct.toFixed(1).replace(".",",")} %</b>`,
     cle:"Un demi-point d'hypothèse, invisible dans une slide de comité, qui se traduit par plusieurs points de valeur. C'est la faute la plus coûteuse par caractère tapé de tout un modèle de DCF."},
    {q:`Si, à la place, l'erreur avait porté sur le SEUL FCFF de l'année 1 — sous-estimé de ${eurX(fcf1Err)} — quel aurait été l'impact sur la valeur d'entreprise, toutes choses égales par ailleurs ?`,
     val:impactFcf1, unit:"€", tol:Math.max(500,impactFcf1*.02),
     calcul:`${eurX(fcf1Err)} ÷ (1+${(wacc*100).toFixed(1).replace(".",",")} %) = <b>${eurX(impactFcf1)}</b>`,
     cle:"Comparé à l'écart trouvé plus haut, l'impact est minuscule. Une erreur de flux ne coûte qu'UNE année, actualisée une fois. Une erreur de WACC recalcule tout le modèle, valeur terminale comprise : ce n'est pas la même catégorie de risque de modélisation."}
   ]};}},

/* ================================================================
   PISTE MULTIPLES — ajoutée le 2026-09-28, à la suite du WACC. Le
   palier 9 (LE SOCLE) donne déjà le pont VE ↔ titres et le PER, avec
   un multiple FOURNI. Cette piste va sous ce qui est donné : choisir
   les bons comparables, ne pas confondre un multiple boursier et un
   multiple de transaction, LTM contre NTM, le vrai pont (minoritaires,
   provisions, dilution), et pourquoi un multiple n'est jamais qu'un
   DCF raccourci — le lien avec le WACC et la croissance.
   ================================================================ */

/* ============ 30 · piste MULTIPLES ============ */
{id:"e30", n:30, piste:"multiples", ic:"🔍", titre:"Choisir les bons comparables",
 sujet:"Moyenne, médiane, et le coût d'un comparable qui ne devrait pas être là",
 rappel:`Un bon comparable partage le métier, la taille, la zone géographique — et surtout un profil de CROISSANCE et de MARGE proche de la cible. Un comparable mal choisi (une pépite technologique en hyper-croissance glissée dans un échantillon d'entreprises matures) ne se contente pas de fausser un peu la moyenne : il peut la faire dériver de plusieurs points.
   <br><br>C'est pourquoi la pratique préfère souvent la <b>MÉDIANE</b> à la moyenne : elle résiste aux valeurs extrêmes, alors qu'une seule moyenne mal nettoyée peut suffire à surpayer — ou sous-évaluer — une cible entière.`,
 gen:R=>{
  const m1=R.ent(55,70)/10, m2=R.ent(60,75)/10, m3=R.ent(65,80)/10, m4=R.ent(58,85)/10;
  const mOut=R.ent(150,220)/10;
  const arr=[m1,m2,m3,m4,mOut].slice().sort((a,b)=>a-b);
  const medianAll=arr[2];
  const meanAll=(m1+m2+m3+m4+mOut)/5, meanClean=(m1+m2+m3+m4)/4;
  const ebitdaT=R.ent(300,1200)*1000;
  const veAll=meanAll*ebitdaT, veClean=meanClean*ebitdaT;
  return {contextes:[`Cinq comparables observés sur le secteur de la cible.`,
    `Un banquier te transmet cinq multiples de transactions récentes.`,
    `Avant de retenir un multiple, tu regardes l'échantillon qui le compose.`,
    `Cinq sociétés « du même secteur » — à vérifier si elles le sont vraiment.`],
   contexte:`Cinq comparables observés sur le secteur de la cible.`,
   donnees:[["Comparable 1",m1,"×"],["Comparable 2",m2,"×"],["Comparable 3",m3,"×"],
            ["Comparable 4",m4,"×"],["Comparable 5 (forte croissance, hors profil)",mOut,"×"],
            ["EBITDA de la cible",ebitdaT,"€"]],
   questions:[
    {q:"Quelle est la moyenne des cinq multiples observés ?", val:meanAll, unit:"×", tol:.15,
     calcul:`(${m1.toFixed(1).replace(".",",")}+${m2.toFixed(1).replace(".",",")}+${m3.toFixed(1).replace(".",",")}+${m4.toFixed(1).replace(".",",")}+${mOut.toFixed(1).replace(".",",")}) ÷ 5 = <b>${meanAll.toFixed(2).replace(".",",")}×</b>`,
     cle:"Une seule valeur très éloignée du reste de l'échantillon suffit à tirer la moyenne loin de ce que 4 comparables sur 5 racontent vraiment."},
    {q:"Quelle est la MÉDIANE des cinq multiples ?", val:medianAll, unit:"×", tol:.1,
     calcul:`Classés dans l'ordre : ${arr.map(x=>x.toFixed(1).replace(".",",")).join(" · ")} → la valeur du milieu = <b>${medianAll.toFixed(1).replace(".",",")}×</b>`,
     cle:"La médiane reste dans le cœur de l'échantillon, presque insensible au comparable extrême. C'est pour ça qu'elle est souvent préférée en pratique."},
    {q:"En écartant le comparable hors profil, quelle est la moyenne des 4 restants ?", val:meanClean, unit:"×", tol:.15,
     calcul:`(${m1.toFixed(1).replace(".",",")}+${m2.toFixed(1).replace(".",",")}+${m3.toFixed(1).replace(".",",")}+${m4.toFixed(1).replace(".",",")}) ÷ 4 = <b>${meanClean.toFixed(2).replace(".",",")}×</b>`,
     cle:"Très proche de la médiane trouvée juste avant — ce n'est pas un hasard : les deux méthodes convergent dès qu'on retire ce qui n'aurait jamais dû être comparé."},
    {q:"En appliquant la moyenne BRUTE (avec l'outlier) à l'EBITDA de la cible, quelle valeur d'entreprise obtient-on ?", val:veAll, unit:"€", tol:Math.max(3000,veAll*.02),
     calcul:`${meanAll.toFixed(2).replace(".",",")}× × ${eurX(ebitdaT)} = <b>${eurX(veAll)}</b>`,
     cle:"Le chiffre qu'obtiendrait un analyste pressé, sans regarder d'où vient chaque multiple de l'échantillon."},
    {q:"Et en appliquant la moyenne NETTOYÉE ?", val:veClean, unit:"€", tol:Math.max(3000,veClean*.02),
     calcul:`${meanClean.toFixed(2).replace(".",",")}× × ${eurX(ebitdaT)} = <b>${eurX(veClean)}</b>`,
     cle:"Le chiffre défendable — celui qu'on peut justifier comparable par comparable devant un comité."},
    {q:"Quel est l'écart de valeur d'entreprise, en euros, entre les deux approches ?", val:veAll-veClean, unit:"€", tol:Math.max(2000,Math.abs(veAll-veClean)*.03),
     calcul:`${eurX(veAll)} − ${eurX(veClean)} = <b>${eurX(veAll-veClean)}</b>`,
     cle:"Un seul comparable mal choisi, dans un échantillon de cinq, et l'écart se compte déjà en centaines de milliers d'euros. À l'échelle d'un vrai deal, en millions."}
   ]};}},

/* ============ 31 · piste MULTIPLES ============ */
{id:"e31", n:31, piste:"multiples", ic:"🔍", titre:"Comparables boursiers ou transactions",
 sujet:"La prime de contrôle : pourquoi un multiple de transaction n'est jamais un multiple boursier",
 rappel:`Deux familles de multiples ne se substituent JAMAIS l'une à l'autre. Les <b>comparables boursiers (trading comps)</b> reflètent le prix d'un petit paquet d'actions échangé en bourse — une participation MINORITAIRE, sans aucun pouvoir de décision. Les <b>transactions précédentes (precedent transactions)</b> reflètent des rachats de CONTRÔLE, et embarquent une <b>prime de contrôle</b> — 20 à 40 % de plus, payés pour le droit de changer la stratégie, remplacer le management, capter des synergies.
   <br><br>Utiliser un multiple boursier pour valoriser une prise de contrôle SOUS-évalue la cible. Utiliser un multiple de transaction pour valoriser un simple achat d'actions minoritaires SURÉVALUE l'opération. Le bon réflexe : faire correspondre le type de multiple au type de participation visée.`,
 gen:R=>{
  const tradingMult=R.ent(55,90)/10, premium=R.ent(20,40)/100;
  const transMultImplied=tradingMult*(1+premium);
  const ebitdaT=R.ent(300,1200)*1000;
  const veMinority=tradingMult*ebitdaT, veControl=transMultImplied*ebitdaT;
  const transMultGiven=R.ent(70,120)/10;
  const primeImplied=(transMultGiven/tradingMult-1)*100;
  const perteEnPct=(veControl-veMinority)/veControl*100;
  return {contextes:[`Un acheteur hésite entre viser une participation minoritaire ou le contrôle total d'une cible.`,
    `Deux dossiers sur le même secteur : l'un est un achat en bourse, l'autre un rachat total.`,
    `Le comité compare un multiple boursier et un multiple de transaction sans faire la différence.`,
    `Avant de citer un multiple, il faut savoir de quel type de participation il parle.`],
   contexte:`Un acheteur hésite entre viser une participation minoritaire ou le contrôle total d'une cible.`,
   donnees:[["Multiple boursier moyen du secteur (trading comps)",tradingMult,"×"],
            ["Prime de contrôle observée sur le secteur",premium*100,"%"],
            ["EBITDA de la cible",ebitdaT,"€"],["Multiple d'une transaction récente, observée",transMultGiven,"×"]],
   questions:[
    {q:"Pour une participation MINORITAIRE, quelle valeur d'entreprise donne le multiple boursier moyen ?", val:veMinority, unit:"€", tol:Math.max(3000,veMinority*.02),
     calcul:`${tradingMult.toFixed(1).replace(".",",")}× × ${eurX(ebitdaT)} = <b>${eurX(veMinority)}</b>`,
     cle:"La base de référence : ce que vaut la cible sur la base de ce qui s'échange réellement en bourse, sans aucune prime."},
    {q:"Pour viser le CONTRÔLE, à quel multiple équivalent cela correspond-il avec cette prime ?", val:transMultImplied, unit:"×", tol:.2,
     calcul:`${tradingMult.toFixed(1).replace(".",",")}× × (1 + ${(premium*100).toFixed(0)} %) = <b>${transMultImplied.toFixed(2).replace(".",",")}×</b>`,
     cle:"La prime de contrôle ne s'ajoute pas en euros, elle se multiplie sur le multiple lui-même — c'est ce qui la rend si significative sur des cibles déjà chères."},
    {q:"Quelle valeur d'entreprise cela donne-t-il pour une prise de contrôle ?", val:veControl, unit:"€", tol:Math.max(3000,veControl*.02),
     calcul:`${transMultImplied.toFixed(2).replace(".",",")}× × ${eurX(ebitdaT)} = <b>${eurX(veControl)}</b>`,
     cle:"C'est ce chiffre-là, et non le premier, qu'un acheteur qui veut décider seul doit être prêt à payer."},
    {q:"Quel est l'écart de valeur, en euros, entre les deux bases (minoritaire contre contrôle) ?", val:veControl-veMinority, unit:"€", tol:Math.max(3000,(veControl-veMinority)*.03),
     calcul:`${eurX(veControl)} − ${eurX(veMinority)} = <b>${eurX(veControl-veMinority)}</b>`,
     cle:"Exactement la prime de contrôle, en euros. Elle n'est pas un arrondi de négociation : elle a une justification économique précise — le pouvoir de décider."},
    {q:"Une transaction récente s'est faite à ce multiple observé. Quelle prime de contrôle cela implique-t-il par rapport au multiple boursier moyen ?", val:primeImplied, unit:"%", tol:2,
     calcul:`${transMultGiven.toFixed(1).replace(".",",")}× ÷ ${tradingMult.toFixed(1).replace(".",",")}× − 1 = <b>${primeImplied.toFixed(1).replace(".",",")} %</b>`,
     cle:"On peut retourner la logique : à partir d'une transaction réelle et du multiple boursier du secteur, on reconstitue la prime que l'acheteur a effectivement payée."},
    {q:"Si un vendeur, en pleine négociation de contrôle, acceptait par erreur le multiple BOURSIER au lieu du multiple de transaction, quel pourcentage de la valeur de contrôle perdrait-il ?",
     val:perteEnPct, unit:"%", tol:2,
     calcul:`(${eurX(veControl)} − ${eurX(veMinority)}) ÷ ${eurX(veControl)} = <b>${perteEnPct.toFixed(1).replace(".",",")} %</b>`,
     cle:"Confondre les deux familles de multiples n'est jamais un détail théorique : c'est exactement ce pourcentage-là qui change de camp, dans un sens ou dans l'autre selon qui se trompe."}
   ]};}},

/* ============ 32 · piste MULTIPLES ============ */
{id:"e32", n:32, piste:"multiples", ic:"🔍", titre:"Multiple LTM ou NTM",
 sujet:"Trailing contre forward : le même prix donne deux multiples très différents",
 rappel:`Un multiple n'a de sens que rapporté à UN EBITDA précis. <b>LTM (last twelve months)</b> : l'EBITDA déjà réalisé, sur les douze derniers mois — du passé certain. <b>NTM (next twelve months)</b> : l'EBITDA attendu sur les douze prochains mois — une prévision.
   <br><br>Pour une entreprise qui croît vite, l'EBITDA NTM est sensiblement plus élevé que le LTM — donc, au MÊME prix, le multiple NTM est plus BAS que le multiple LTM. Comparer le multiple LTM d'une entreprise au multiple NTM d'une autre, c'est comparer deux choses qui ne se ressemblent pas — l'erreur la plus fréquente dans un tableau de comparables mal construit.`,
 gen:R=>{
  const ebitdaLTM=R.ent(200,800)*1000, croissance=R.ent(15,45)/100;
  const ebitdaNTM=Math.round(ebitdaLTM*(1+croissance));
  const veFixe=R.ent(3000,9000)*1000;
  const multLTM=veFixe/ebitdaLTM, multNTM=veFixe/ebitdaNTM;
  const multNTMcible=R.ent(60,90)/10;
  const veImplied=multNTMcible*ebitdaNTM;
  const multLTMimplied=veImplied/ebitdaLTM;
  return {contextes:[`Une offre de rachat est sur la table, à un prix fixe.`,
    `Une cible en forte croissance : le choix de l'EBITDA change beaucoup le multiple affiché.`,
    `Le vendeur communique en LTM ; l'acheteur, lui, raisonne en NTM.`,
    `Avant de citer « on a payé X fois l'EBITDA », il faut préciser lequel.`],
   contexte:`Une offre de rachat de ${eurX(veFixe)} est sur la table pour une cible en forte croissance.`,
   donnees:[["Valeur d'entreprise offerte (fixe)",veFixe,"€"],["EBITDA des 12 derniers mois (LTM)",ebitdaLTM,"€"],
            ["Croissance attendue de l'EBITDA sur 12 mois",croissance*100,"%"]],
   questions:[
    {q:"À quel multiple LTM (sur l'EBITDA déjà réalisé) ce prix correspond-il ?", val:multLTM, unit:"×", tol:.2,
     calcul:`${eurX(veFixe)} ÷ ${eurX(ebitdaLTM)} = <b>${multLTM.toFixed(2).replace(".",",")}×</b>`,
     cle:"Le multiple qu'annoncerait un vendeur pressé de montrer un chiffre flatteur : le plus élevé des deux, puisqu'il divise par le plus petit EBITDA."},
    {q:"Quel est l'EBITDA prévisionnel (NTM), avec cette croissance ?", val:ebitdaNTM, unit:"€", tol:Math.max(2000,ebitdaNTM*.01),
     calcul:`${eurX(ebitdaLTM)} × (1 + ${(croissance*100).toFixed(0)} %) = <b>${eurX(ebitdaNTM)}</b>`,
     cle:"L'EBITDA que la cible devrait atteindre dans un an — l'hypothèse qui justifie, aux yeux de l'acheteur, de payer autant aujourd'hui."},
    {q:"À quel multiple NTM (sur l'EBITDA prévisionnel) ce même prix correspond-il ?", val:multNTM, unit:"×", tol:.2,
     calcul:`${eurX(veFixe)} ÷ ${eurX(ebitdaNTM)} = <b>${multNTM.toFixed(2).replace(".",",")}×</b>`,
     cle:"Le multiple que citerait l'acheteur, pour justifier que le prix est raisonnable RAPPORTÉ à ce que la cible va bientôt produire."},
    {q:"De combien de points le multiple affiché change-t-il selon qu'on le calcule en LTM ou en NTM ?", val:multLTM-multNTM, unit:"×", tol:.15,
     calcul:`${multLTM.toFixed(2).replace(".",",")}× − ${multNTM.toFixed(2).replace(".",",")}× = <b>${(multLTM-multNTM).toFixed(2).replace(".",",")}×</b>`,
     cle:"Même prix, même cible, et pourtant deux chiffres très différents dans une salle de négociation — selon qui a intérêt à mettre en avant lequel."},
    {q:`Un acheteur vise plutôt un multiple NTM de ${multNTMcible.toFixed(1).replace(".",",")}× pour cette cible. Quelle valeur d'entreprise cela représente-t-il ?`,
     val:veImplied, unit:"€", tol:Math.max(3000,veImplied*.02),
     calcul:`${multNTMcible.toFixed(1).replace(".",",")}× × ${eurX(ebitdaNTM)} = <b>${eurX(veImplied)}</b>`,
     cle:"On part cette fois du multiple souhaité pour retrouver le prix qu'il faudrait proposer — la démarche inverse, utile pour cadrer une offre AVANT de la faire."},
    {q:"Et à quel multiple LTM cela correspond-il, une fois remonté sur l'EBITDA déjà réalisé ?", val:multLTMimplied, unit:"×", tol:.2,
     calcul:`${eurX(veImplied)} ÷ ${eurX(ebitdaLTM)} = <b>${multLTMimplied.toFixed(2).replace(".",",")}×</b>`,
     cle:"Un multiple LTM qui peut sembler élevé, voire déraisonnable au premier regard — et qui redevient parfaitement défendable une fois qu'on précise sur quel EBITDA il porte vraiment."}
   ]};}},

/* ============ 33 · piste MULTIPLES ============ */
{id:"e33", n:33, piste:"multiples", ic:"🔍", titre:"Le vrai pont VE → capitaux propres",
 sujet:"Minoritaires, provisions sous-financées, dilution des stock-options",
 rappel:`Le pont simplifié (palier 9) — VE moins dette nette — suffit pour un premier chiffrage. Un pont complet retire aussi tout ce qui ressemble à une dette sans en porter le nom. Les <b>intérêts minoritaires</b> : si tu ne détiens pas 100 % d'une filiale mais que son EBITDA est consolidé en entier dans la VE, il faut retirer la part qui revient aux autres actionnaires. Les <b>provisions sous-financées</b> (retraites, litiges) : des engagements réels, à retirer comme une dette.
   <br><br>Et les actions ne se comptent pas non plus telles quelles : des <b>stock-options dans la monnaie</b> ajoutent des actions nouvelles. La méthode du rachat d'actions (treasury stock method) : le cash reçu à l'exercice sert à racheter des actions au cours actuel — seule la DIFFÉRENCE entre les options exercées et les actions rachetables dilue vraiment le capital.`,
 gen:R=>{
  const ve=R.ent(2000,8000)*1000, detteFin=R.ent(400,2000)*1000, tresorerie=R.ent(100,900)*1000;
  const minoritaires=R.ent(50,400)*1000, provisions=R.ent(30,300)*1000;
  const dn=detteFin-tresorerie;
  const cpSimple=ve-dn, cpComplet=ve-dn-minoritaires-provisions;
  const optionsITM=R.ent(50,300)*1000, strike=R.ent(10,20), prix=R.ent(22,40);
  const produitExercice=optionsITM*strike;
  const actionsRachetables=Math.round(produitExercice/prix);
  const dilutionNette=optionsITM-actionsRachetables;
  return {contextes:[`Une cible dont tu ne détiens qu'une partie d'une filiale — et qui porte des engagements de retraite sous-financés.`,
    `Avant de conclure sur le prix des titres, tu vérifies ce que le pont simplifié a oublié.`,
    `Le vendeur communique un pont VE → capitaux propres qui s'arrête à la dette nette. Trop tôt.`,
    `Un management doté de stock-options dans la monnaie : le nombre d'actions n'est pas figé.`],
   contexte:`Une cible dont tu ne détiens qu'une partie d'une filiale — et qui porte des engagements de retraite sous-financés.`,
   donnees:[["Valeur d'entreprise",ve,"€"],["Dette financière",detteFin,"€"],["Trésorerie",tresorerie,"€"],
            ["Intérêts minoritaires",minoritaires,"€"],["Provisions sous-financées",provisions,"€"],
            ["Stock-options dans la monnaie",optionsITM,""],["Prix d'exercice",strike,"€"],["Cours actuel de l'action",prix,"€"]],
   questions:[
    {q:"Avec le pont simplifié (VE − dette nette seulement), quels capitaux propres obtiens-tu ?", val:cpSimple, unit:"€", tol:Math.max(3000,Math.abs(cpSimple)*.015),
     calcul:`${eurX(ve)} − (${eurX(detteFin)} − ${eurX(tresorerie)}) = <b>${eurX(cpSimple)}</b>`,
     cle:"Le calcul du palier 9 — juste, mais incomplet dès qu'il existe des minoritaires ou des provisions non financées."},
    {q:"En intégrant aussi les minoritaires et les provisions sous-financées, quels capitaux propres obtiens-tu réellement ?", val:cpComplet, unit:"€", tol:Math.max(3000,Math.abs(cpComplet)*.015),
     calcul:`${eurX(cpSimple)} − ${eurX(minoritaires)} − ${eurX(provisions)} = <b>${eurX(cpComplet)}</b>`,
     cle:"Ces deux postes ne sont pas de la dette financière au sens strict, mais ce sont des créances sur la valeur de l'entreprise qui ne reviennent pas à l'actionnaire ordinaire — elles se traitent donc comme elle."},
    {q:"De combien le pont simplifié SURESTIME-t-il les capitaux propres ?", val:minoritaires+provisions, unit:"€", tol:Math.max(2000,(minoritaires+provisions)*.02),
     calcul:`${eurX(minoritaires)} + ${eurX(provisions)} = <b>${eurX(minoritaires+provisions)}</b>`,
     cle:"L'écart exact entre les deux ponts — ce que le pont simplifié promet à l'actionnaire alors que ça ne lui revient pas."},
    {q:"Si tous les détenteurs de stock-options dans la monnaie les exerçaient, combien de cash l'entreprise recevrait-elle ?", val:produitExercice, unit:"€", tol:Math.max(1000,produitExercice*.01),
     calcul:`${(optionsITM/1000).toFixed(0)} 000 options × ${strike} € = <b>${eurX(produitExercice)}</b>`,
     cle:"C'est ce cash-là, précisément, que la méthode du rachat d'actions utilise ensuite pour limiter la dilution."},
    {q:"Selon la méthode du rachat d'actions, combien d'actions ce cash permettrait-il de racheter au cours actuel ?", val:actionsRachetables, unit:"", tol:Math.max(500,actionsRachetables*.01),
     calcul:`${eurX(produitExercice)} ÷ ${prix} € = <b>${actionsRachetables.toLocaleString("fr-FR")}</b> actions`,
     cle:"L'entreprise « rend » une partie de la dilution en rachetant des actions avec le cash reçu — c'est ce qui évite de compter les options exercées comme une dilution brute."},
    {q:"Quelle est la dilution NETTE réelle — le nombre d'actions nouvelles qui s'ajoutent vraiment ?", val:dilutionNette, unit:"", tol:Math.max(500,dilutionNette*.02),
     calcul:`${optionsITM.toLocaleString("fr-FR")} − ${actionsRachetables.toLocaleString("fr-FR")} = <b>${dilutionNette.toLocaleString("fr-FR")}</b> actions`,
     cle:"Bien moins que le nombre brut d'options : c'est cette dilution nette, et seulement elle, qu'il faut ajouter au nombre d'actions pour calculer un prix par action juste."}
   ]};}},

/* ============ 34 · piste MULTIPLES ============ */
{id:"e34", n:34, piste:"multiples", ic:"🔍", titre:"Le multiple est un DCF raccourci",
 sujet:"Le lien entre multiple, croissance et WACC — pourquoi cher et bon marché ne veulent rien dire seuls",
 rappel:`Un multiple n'est jamais qu'un raccourci pour ne pas refaire un DCF entier. Version simplifiée, à flux perpétuel : <b>VE/EBITDA ≈ (1 + g) ÷ (WACC − g)</b>. Un multiple ÉLEVÉ n'est pas cher : il reflète une croissance forte, un WACC bas (risque faible), ou les deux. Un multiple BAS n'est pas une affaire : il reflète souvent une croissance faible ou un risque élevé.
   <br><br>Comparer deux multiples bruts sans regarder ce qu'ils IMPLIQUENT sur la croissance et le risque, c'est comparer deux prix sans savoir ce qu'ils achètent.`,
 gen:R=>{
  const waccLow=R.ent(70,90)/1000, gLow=R.ent(15,25)/1000;
  const waccHigh=R.ent(110,150)/1000, gHigh=R.ent(50,90)/1000;
  const multLow=(1+gLow)/(waccLow-gLow), multHigh=(1+gHigh)/(waccHigh-gHigh);
  const ebitdaT=R.ent(300,1000)*1000;
  const veLow=multLow*ebitdaT, veHigh=multHigh*ebitdaT;
  const facteur=multHigh/multLow;
  const veHighAuMultLow=multLow*ebitdaT;
  const sousPaiement=veHigh-veHighAuMultLow;
  return {contextes:[`Deux entreprises, même EBITDA, deux profils de risque et de croissance opposés.`,
    `Une valeur défensive face à une valeur de croissance — avant de comparer leurs multiples.`,
    `Le comité s'étonne qu'une société « paie » deux fois plus cher qu'une autre en multiple.`,
    `Deux sociétés du même secteur, deux WACC, deux croissances — un seul EBITDA de référence.`],
   contexte:`Deux entreprises, même EBITDA, deux profils de risque et de croissance opposés.`,
   donnees:[["WACC — société stable",waccLow*100,"%"],["Croissance perpétuelle — société stable",gLow*100,"%"],
            ["WACC — société à forte croissance",waccHigh*100,"%"],["Croissance perpétuelle — société à forte croissance",gHigh*100,"%"],
            ["EBITDA (identique pour les deux)",ebitdaT,"€"]],
   questions:[
    {q:"Selon (1+g)/(WACC−g), quel multiple « juste » obtient la société STABLE ?", val:multLow, unit:"×", tol:.3,
     calcul:`(1 + ${(gLow*100).toFixed(1).replace(".",",")} %) ÷ (${(waccLow*100).toFixed(1).replace(".",",")} % − ${(gLow*100).toFixed(1).replace(".",",")} %) = <b>${multLow.toFixed(2).replace(".",",")}×</b>`,
     cle:"Un multiple modeste, cohérent avec une croissance modeste et un risque faible — ni cher, ni bon marché : juste."},
    {q:"Et la société à forte croissance, plus risquée ?", val:multHigh, unit:"×", tol:.3,
     calcul:`(1 + ${(gHigh*100).toFixed(1).replace(".",",")} %) ÷ (${(waccHigh*100).toFixed(1).replace(".",",")} % − ${(gHigh*100).toFixed(1).replace(".",",")} %) = <b>${multHigh.toFixed(2).replace(".",",")}×</b>`,
     cle:"Un multiple bien plus élevé — et pourtant, lui aussi parfaitement JUSTE : c'est ce que la croissance et le risque, pris ensemble, impliquent mathématiquement."},
    {q:"Sur le même EBITDA, quelle valeur d'entreprise cela donne pour la société stable ?", val:veLow, unit:"€", tol:Math.max(3000,veLow*.02),
     calcul:`${multLow.toFixed(2).replace(".",",")}× × ${eurX(ebitdaT)} = <b>${eurX(veLow)}</b>`,
     cle:"La valeur qu'un investisseur rationnel paierait pour le profil défensif, à EBITDA identique."},
    {q:"Et pour la société à forte croissance ?", val:veHigh, unit:"€", tol:Math.max(3000,veHigh*.02),
     calcul:`${multHigh.toFixed(2).replace(".",",")}× × ${eurX(ebitdaT)} = <b>${eurX(veHigh)}</b>`,
     cle:"Nettement plus — et ce n'est pas de l'exubérance : c'est la contrepartie chiffrée d'une croissance plus rapide et d'un risque plus élevé assumés simultanément."},
    {q:"De quel facteur le multiple « juste » de la société à forte croissance dépasse-t-il celui de la société stable ?", val:facteur, unit:"×", tol:.2,
     calcul:`${multHigh.toFixed(2).replace(".",",")}× ÷ ${multLow.toFixed(2).replace(".",",")}× = <b>${facteur.toFixed(2).replace(".",",")}×</b>`,
     cle:"Un multiple deux ou trois fois plus élevé n'est pas, en soi, un signal de surpaiement — c'est le résultat mécanique d'hypothèses de croissance et de risque différentes."},
    {q:"Si on payait la société à forte croissance seulement au multiple « juste » de la société stable, de combien la sous-paierait-on, en euros, par rapport à ce qu'elle vaut réellement ?",
     val:sousPaiement, unit:"€", tol:Math.max(3000,Math.abs(sousPaiement)*.02),
     calcul:`${eurX(veHigh)} − ${eurX(veHighAuMultLow)} = <b>${eurX(sousPaiement)}</b>`,
     cle:"Voilà le miroir du piège habituel : on parle toujours du risque de SURPAYER un multiple élevé, rarement du risque de rater une cible en lui appliquant, par prudence mal placée, le multiple d'une tout autre catégorie d'entreprise."}
   ]};}},

/* ================================================================
   PISTE LBO — ajoutée le 2026-09-28, à la suite des multiples. LE
   CLOSING regorge déjà de contenu LBO qualitatif (Paper LBO dans
   data-drills.js : décomposition de la création de valeur, repères
   MOIC→TRI, cash sweep) — mais toujours avec des chiffres FIXES,
   qu'on finit par connaître par cœur sans avoir vraiment appris le
   geste. Cette piste reprend exactement les mêmes mécaniques, mais
   randomisées à chaque série — même logique que toutes les autres
   pistes de cette échelle.
   ================================================================ */

/* ============ 35 · piste LBO ============ */
{id:"e35", n:35, piste:"lbo", ic:"🎯", titre:"Le mécanisme du levier",
 sujet:"EV d'entrée, dette, equity — et pourquoi une petite equity amplifie tout",
 rappel:`Un LBO se lit en trois chiffres. <b>VE d'entrée = multiple d'entrée × EBITDA.</b> Cette VE est financée par de la <b>dette</b> (un multiple de l'EBITDA, fixé par les prêteurs) et le reste en <b>equity</b> — l'apport du sponsor.
   <br><br>Le levier tient dans une seule idée : l'equity n'est qu'une FRACTION de la VE — souvent 40 à 50 %, parfois moins. Toute variation de la VE totale se répercute donc, en euros, sur une base bien plus petite : l'equity. C'est ce qui amplifie les gains — et les pertes.`,
 gen:R=>{
  const ebitdaEntree=R.ent(15,50)*1000000, multEntree=R.ent(60,90)/10;
  const evEntree=Math.round(ebitdaEntree*multEntree);
  const levier=R.ent(40,60)/10;
  const detteEntree=Math.round(ebitdaEntree*levier);
  const equityEntree=evEntree-detteEntree;
  const pctEquity=equityEntree/evEntree*100;
  const evGrowthPct=R.ent(8,20);
  const evNouvelle=evEntree*(1+evGrowthPct/100);
  const deltaEV=evNouvelle-evEntree;
  const equityNouvelle=equityEntree+deltaEV;
  const pctEquityGrowth=deltaEV/equityEntree*100;
  const facteurAmplification=pctEquityGrowth/evGrowthPct;
  return {contextes:[`Un fonds prépare le rachat par levier d'une entreprise industrielle.`,
    `Une opération de LBO classique, structurée en dette et en equity.`,
    `Le comité d'investissement examine la structure de financement d'une cible.`,
    `Avant de parler de rendement, il faut poser la structure du deal.`],
   contexte:`Un fonds prépare le rachat par levier d'une entreprise industrielle.`,
   donnees:[["EBITDA d'entrée",ebitdaEntree,"€"],["Multiple d'entrée",multEntree,"×"],["Levier (Dette/EBITDA)",levier,"×"]],
   questions:[
    {q:"Quelle est la valeur d'entreprise (VE) d'entrée ?", val:evEntree, unit:"€", tol:Math.max(50000,evEntree*.01),
     calcul:`${multEntree.toFixed(1).replace(".",",")}× × ${eurX(ebitdaEntree)} = <b>${eurX(evEntree)}</b>`,
     cle:"Le point de départ de tout LBO : combien coûte la cible, avant même de parler de comment on la finance."},
    {q:"Avec ce niveau de levier, quelle dette LBO est mise en place ?", val:detteEntree, unit:"€", tol:Math.max(50000,detteEntree*.01),
     calcul:`${levier.toFixed(1).replace(".",",")}× × ${eurX(ebitdaEntree)} = <b>${eurX(detteEntree)}</b>`,
     cle:"Ce n'est pas le sponsor qui fixe ce chiffre : c'est ce que les prêteurs acceptent de prêter, en multiple de l'EBITDA."},
    {q:"Quel est l'apport en capital (equity) du sponsor ?", val:equityEntree, unit:"€", tol:Math.max(50000,equityEntree*.015),
     calcul:`${eurX(evEntree)} − ${eurX(detteEntree)} = <b>${eurX(equityEntree)}</b>`,
     cle:"Le complément entre la VE et la dette. C'est ce chiffre-là, et lui seul, que le sponsor risque réellement."},
    {q:"Quelle part de la VE d'entrée l'equity représente-t-elle, en % ?", val:pctEquity, unit:"%", tol:2,
     calcul:`${eurX(equityEntree)} ÷ ${eurX(evEntree)} = <b>${pctEquity.toFixed(1).replace(".",",")} %</b>`,
     cle:"Une equity qui ne pèse qu'une fraction de la VE totale : c'est cette fraction, précisément, qui va amplifier tout ce qui se passe ensuite."},
    {q:`Si la VE totale progressait de ${evGrowthPct} % sans qu'aucun euro de dette ne bouge, de quel montant l'equity augmenterait-elle ?`,
     val:deltaEV, unit:"€", tol:Math.max(20000,Math.abs(deltaEV)*.02),
     calcul:`${evGrowthPct} % × ${eurX(evEntree)} = <b>${eurX(deltaEV)}</b>`,
     cle:"La dette est fixe : toute la variation de VE atterrit intégralement sur l'equity, qui l'absorbe en entier."},
    {q:"Cela représente quel pourcentage de croissance pour l'equity elle-même ?", val:pctEquityGrowth, unit:"%", tol:3,
     calcul:`${eurX(deltaEV)} ÷ ${eurX(equityEntree)} = <b>${pctEquityGrowth.toFixed(1).replace(".",",")} %</b>`,
     cle:`Une VE qui progresse de ${evGrowthPct} % fait progresser l'equity de bien plus — c'est l'effet de levier en action, avant même de parler de désendettement.`},
    {q:"Quel facteur d'amplification cela représente-t-il par rapport à la croissance de la VE elle-même ?", val:facteurAmplification, unit:"×", tol:.3,
     calcul:`${pctEquityGrowth.toFixed(1).replace(".",",")} % ÷ ${evGrowthPct} % = <b>${facteurAmplification.toFixed(2).replace(".",",")}×</b>`,
     cle:"C'est l'inverse exact de la part d'equity dans la VE : plus l'equity est une petite tranche du financement, plus ce facteur d'amplification est grand. Le levier n'est rien d'autre que ça."}
   ]};}},

/* ============ 36 · piste LBO ============ */
{id:"e36", n:36, piste:"lbo", ic:"🎯", titre:"Les trois leviers de création de valeur",
 sujet:"Désendettement, croissance d'EBITDA, expansion de multiple — décomposer un gain",
 rappel:`La création de valeur d'un LBO se décompose TOUJOURS en trois leviers, et un bon candidat sait les isoler. Le <b>désendettement</b> : la dette remboursée pendant la détention revient intégralement à l'equity. La <b>croissance d'EBITDA</b>, valorisée au multiple d'ENTRÉE : (EBITDA sortie − EBITDA entrée) × multiple d'entrée. L'<b>expansion (ou contraction) de multiple</b>, valorisée sur l'EBITDA de SORTIE : (multiple sortie − multiple entrée) × EBITDA de sortie.
   <br><br>Ces trois termes s'additionnent EXACTEMENT pour retrouver l'écart total d'equity entre l'entrée et la sortie — aucun résidu, aucun arrondi de coin de table.`,
 gen:R=>{
  const ebitdaEntree=R.ent(15,50)*1000000, multEntree=R.ent(60,90)/10;
  const evEntree=Math.round(ebitdaEntree*multEntree);
  const levier=R.ent(40,60)/10;
  const detteEntree=Math.round(ebitdaEntree*levier);
  const equityEntree=evEntree-detteEntree;
  const croissancePct=R.ent(15,40)/100;
  const ebitdaSortie=ebitdaEntree*(1+croissancePct);
  const multSortie=multEntree+R.ent(-10,5)/10;
  const evSortie=ebitdaSortie*multSortie;
  const desendPct=R.ent(50,80)/100;
  const detteSortie=detteEntree*(1-desendPct);
  const equitySortie=evSortie-detteSortie;
  const contribCroissance=(ebitdaSortie-ebitdaEntree)*multEntree;
  const contribMultiple=(multSortie-multEntree)*ebitdaSortie;
  const contribDesend=detteEntree-detteSortie;
  return {contextes:[`Une opération de LBO arrive à son terme : il faut décomposer d'où vient le gain.`,
    `Le fonds prépare un mémo de sortie — chaque levier de valeur doit être chiffré séparément.`,
    `Cinq ans après l'entrée, il faut expliquer au comité ce qui a vraiment créé la valeur.`,
    `Avant de célébrer un multiple de retour, il faut savoir ce qui l'a produit.`],
   contexte:`Une opération de LBO arrive à son terme : il faut décomposer d'où vient le gain.`,
   donnees:[["EBITDA d'entrée",ebitdaEntree,"€"],["Multiple d'entrée",multEntree,"×"],["Levier à l'entrée",levier,"×"],
            ["Croissance d'EBITDA sur la période",croissancePct*100,"%"],["Multiple de sortie",multSortie,"×"],
            ["Dette remboursée sur la période",desendPct*100,"%"]],
   questions:[
    {q:"Quelle était l'equity investie à l'entrée ?", val:equityEntree, unit:"€", tol:Math.max(50000,equityEntree*.015),
     calcul:`${eurX(evEntree)} − ${eurX(detteEntree)} = <b>${eurX(equityEntree)}</b>`,
     cle:"Le point de départ, avant tout calcul de création de valeur."},
    {q:"Quelle est la valeur d'entreprise de sortie ?", val:evSortie, unit:"€", tol:Math.max(50000,evSortie*.015),
     calcul:`${eurX(ebitdaSortie)} × ${multSortie.toFixed(1).replace(".",",")}× = <b>${eurX(evSortie)}</b>`,
     cle:"L'EBITDA a grandi, le multiple a bougé : les deux effets sont mélangés dans ce chiffre — le reste du palier consiste à les séparer."},
    {q:"Quelle est l'equity de sortie ?", val:equitySortie, unit:"€", tol:Math.max(50000,equitySortie*.015),
     calcul:`${eurX(evSortie)} − ${eurX(detteSortie)} = <b>${eurX(equitySortie)}</b>`,
     cle:"Ce que le sponsor récupère au débouclage — la VE de sortie, moins ce qu'il reste de dette à rembourser."},
    {q:"Quelle part de la création de valeur vient de la seule CROISSANCE de l'EBITDA (au multiple d'entrée) ?", val:contribCroissance, unit:"€", tol:Math.max(30000,Math.abs(contribCroissance)*.02),
     calcul:`(${eurX(ebitdaSortie)} − ${eurX(ebitdaEntree)}) × ${multEntree.toFixed(1).replace(".",",")}× = <b>${eurX(contribCroissance)}</b>`,
     cle:"L'amélioration opérationnelle pure, valorisée au prix qu'on a payé à l'entrée — sans supposer que le marché paiera plus cher à la sortie."},
    {q:"Quelle part vient du DÉSENDETTEMENT (dette remboursée pendant la détention) ?", val:contribDesend, unit:"€", tol:Math.max(30000,Math.abs(contribDesend)*.02),
     calcul:`${eurX(detteEntree)} − ${eurX(detteSortie)} = <b>${eurX(contribDesend)}</b>`,
     cle:"Le levier « mécanique » : chaque euro de dette remboursé grâce au cash généré revient intégralement à l'equity, sans qu'aucune performance opérationnelle ne soit nécessaire."},
    {q:"Et quelle part vient de la variation du MULTIPLE (à EBITDA de sortie constant) ?", val:contribMultiple, unit:"€", tol:Math.max(30000,Math.abs(contribMultiple)*.03),
     calcul:`(${multSortie.toFixed(1).replace(".",",")}× − ${multEntree.toFixed(1).replace(".",",")}×) × ${eurX(ebitdaSortie)} = <b>${eurX(contribMultiple)}</b>`,
     cle:multSortie<multEntree?"Un multiple de sortie inférieur à l'entrée COÛTE de la valeur — et c'est le scénario que les comités sérieux retiennent par prudence.":"Un multiple de sortie supérieur à l'entrée ajoute de la valeur — mais c'est le levier le moins contrôlable des trois, et le moins prudent à supposer d'avance."},
    {q:"En additionnant les trois leviers, quelle création de valeur totale retrouves-tu — cohérente avec l'écart direct (equity sortie − equity entrée) ?",
     val:contribCroissance+contribDesend+contribMultiple, unit:"€", tol:Math.max(30000,Math.abs(equitySortie-equityEntree)*.02),
     calcul:`${eurX(contribCroissance)} + ${eurX(contribDesend)} + ${eurX(contribMultiple)} = <b>${eurX(contribCroissance+contribDesend+contribMultiple)}</b>`,
     cle:"Les trois termes s'additionnent EXACTEMENT jusqu'au dernier euro — c'est une identité algébrique, pas une coïncidence. Si ça ne tombe pas juste, un des trois calculs est faux."}
   ]};}},

/* ============ 37 · piste LBO ============ */
{id:"e37", n:37, piste:"lbo", ic:"🎯", titre:"MOIC et TRI",
 sujet:"Multiple de capital investi, taux de rendement interne, et le repère à connaître par cœur",
 rappel:`Le <b>MOIC</b> (multiple of invested capital) = equity de sortie ÷ equity investie. Il dit COMBIEN tu as gagné, sans dire à quelle vitesse. Le <b>TRI</b> (taux de rendement interne) annualise ce gain sur la durée de détention. Pour un investissement unique en entrée et une sortie unique (sans dividende intermédiaire) : <b>TRI ≈ MOIC^(1/n) − 1</b>, avec n le nombre d'années.
   <br><br><b>Les repères à avoir en tête, sur 5 ans :</b> ×2 ≈ 15 % de TRI · ×2,5 ≈ 20 % · ×3 ≈ 25 %. Un même MOIC donne un TRI très différent selon la durée : ×2 en 3 ans vaut beaucoup mieux que ×2 en 7 ans — le TRI récompense la VITESSE, pas seulement l'ampleur du gain.`,
 gen:R=>{
  const equityEntree=R.ent(10,60)*1000000;
  const moicBrut=R.ent(18,35)/10;
  const equitySortie=Math.round(equityEntree*moicBrut);
  const moic=equitySortie/equityEntree;
  const n=R.ent(3,7);
  const tri=Math.pow(moic,1/n)-1;
  let n2=R.ent(3,7); if(n2===n) n2=n>=6?n-3:n+3;
  const tri2=Math.pow(moic,1/n2)-1;
  const triCible=R.ent(15,25)/100;
  const moicNecessaire=Math.pow(1+triCible,n);
  const equitySortieNecessaire=equityEntree*moicNecessaire;
  const reperes=[[2,5],[2.5,5],[3,5]];
  const repere=reperes[R.ent(0,2)];
  const triRepere=(Math.pow(repere[0],1/repere[1])-1)*100;
  return {contextes:[`Un fonds sort d'une position après plusieurs années de détention.`,
    `Le compte-rendu de performance d'un deal LBO, prêt à être présenté aux investisseurs (LPs).`,
    `Avant de comparer deux opérations, il faut les ramener au même horizon.`,
    `Un comité d'investissement doit fixer un objectif de rendement avant d'entrer dans le deal.`],
   contexte:`Un fonds sort d'une position après ${n} ans de détention.`,
   donnees:[["Equity investie à l'entrée",equityEntree,"€"],["Equity récupérée à la sortie",equitySortie,"€"],["Durée de détention",n,""]],
   questions:[
    {q:"Quel est le MOIC de cette opération ?", val:moic, unit:"×", tol:.1,
     calcul:`${eurX(equitySortie)} ÷ ${eurX(equityEntree)} = <b>${moic.toFixed(2).replace(".",",")}×</b>`,
     cle:"La mesure la plus simple : combien de fois l'equity investie a-t-elle été rendue, sans référence à la durée."},
    {q:`Sur ${n} ans, quel est le TRI annualisé approximatif ?`, val:tri*100, unit:"%", tol:1.5,
     calcul:`${moic.toFixed(2).replace(".",",")}^(1/${n}) − 1 = <b>${(tri*100).toFixed(1).replace(".",",")} %</b>`,
     cle:"Le même gain, ramené à un rythme annuel — c'est ce chiffre-là, pas le MOIC seul, qui permet de comparer deux deals de durées différentes."},
    {q:`Si la même opération, au MÊME MOIC, avait duré ${n2} ans au lieu de ${n}, quel TRI cela donnerait-il ?`, val:tri2*100, unit:"%", tol:1.5,
     calcul:`${moic.toFixed(2).replace(".",",")}^(1/${n2}) − 1 = <b>${(tri2*100).toFixed(1).replace(".",",")} %</b>`,
     cle:tri2<tri?"Le même multiple, obtenu plus lentement, donne un TRI plus faible — la durée n'est jamais un détail dans un rendement de fonds.":"Le même multiple, obtenu plus vite, donne un TRI bien meilleur — c'est pour ça qu'un fonds préfère souvent sortir tôt à multiple égal."},
    {q:`Pour viser un TRI de ${(triCible*100).toFixed(0)} % sur ${n} ans, quel MOIC faut-il atteindre ?`, val:moicNecessaire, unit:"×", tol:.15,
     calcul:`(1 + ${(triCible*100).toFixed(0)} %)^${n} = <b>${moicNecessaire.toFixed(2).replace(".",",")}×</b>`,
     cle:"La formule se lit dans les deux sens : d'un objectif de TRI, on déduit le multiple qu'il faut viser dès l'entrée."},
    {q:"Et quel equity de sortie cela représente-t-il, à equity d'entrée inchangé ?", val:equitySortieNecessaire, unit:"€", tol:Math.max(50000,equitySortieNecessaire*.02),
     calcul:`${eurX(equityEntree)} × ${moicNecessaire.toFixed(2).replace(".",",")}× = <b>${eurX(equitySortieNecessaire)}</b>`,
     cle:"C'est ce chiffre-là, en euros, que le comité d'investissement doit avoir en tête AVANT de signer — pas seulement un pourcentage abstrait."},
    {q:`Repère de tête à vérifier : à combien estimes-tu le TRI exact d'un MOIC de ${repere[0]}× sur ${repere[1]} ans ?`, val:triRepere, unit:"%", tol:1,
     calcul:`${repere[0]}^(1/${repere[1]}) − 1 = <b>${triRepere.toFixed(1).replace(".",",")} %</b>`,
     cle:"C'est exactement le repère à avoir en tête sans calculer — la table du palier sert à vérifier qu'il est bien mémorisé, pas à le découvrir."}
   ]};}},

/* ============ 38 · piste LBO ============ */
{id:"e38", n:38, piste:"lbo", ic:"🎯", titre:"La dette LBO et le cash sweep",
 sujet:"FCF disponible, remboursement anticipé, ratio de couverture des intérêts",
 rappel:`Le <b>cash sweep</b> est la règle centrale de la dette LBO : tout le cash disponible après charges, intérêts et impôts sert en PRIORITÉ à rembourser la dette par anticipation — avant tout dividende au sponsor.
   <br><br><b>FCF disponible ≈ EBITDA − investissements (= amortissements, en régime de croisière) − intérêts − impôts</b>, avec impôt = (EBITDA − amortissements − intérêts) × taux d'IS.
   <br><br>Le <b>ratio de couverture des intérêts</b> (EBITDA ÷ intérêts) est le signal que surveillent les prêteurs : s'il descend trop bas, le covenant de la dette est en danger — souvent bien avant que l'entreprise ne manque réellement de cash.`,
 gen:R=>{
  const ebitda=R.ent(15,50)*1000000;
  const capex=Math.round(ebitda*R.ent(8,15)/100);
  const levier=R.ent(45,60)/10;
  const detteInit=Math.round(ebitda*levier);
  const tauxDette=R.ent(5,8)/100;
  const interets=Math.round(detteInit*tauxDette);
  const tx=.25;
  const couverture=ebitda/interets;
  const baseImposable=ebitda-capex-interets;
  const impot=Math.max(0,baseImposable*tx);
  const fcfDispo=ebitda-capex-interets-impot;
  const detteApres1An=detteInit-fcfDispo;
  const chocPct=20;
  const couvertureChoc=(ebitda*(1-chocPct/100))/interets;
  return {contextes:[`Une cible LBO, en régime de croisière (investissements = amortissements). IS à 25 %.`,
    `Le fonds modélise le premier exercice complet post-acquisition. IS à 25 %.`,
    `Un banquier senior vérifie la capacité de remboursement de la dette. IS à 25 %.`,
    `Avant de signer, le comité de crédit regarde le premier exercice sous dette. IS à 25 %.`],
   contexte:`Une cible LBO, en régime de croisière (investissements = amortissements). Impôt à 25 %.`,
   donnees:[["EBITDA",ebitda,"€"],["Investissements = amortissements (régime de croisière)",capex,"€"],
            ["Levier à l'entrée (Dette/EBITDA)",levier,"×"],["Taux d'intérêt de la dette",tauxDette*100,"%"]],
   questions:[
    {q:"Quelle est la dette LBO mise en place à l'entrée ?", val:detteInit, unit:"€", tol:Math.max(50000,detteInit*.01),
     calcul:`${levier.toFixed(1).replace(".",",")}× × ${eurX(ebitda)} = <b>${eurX(detteInit)}</b>`,
     cle:"Le point de départ : le montant que les prêteurs acceptent de financer, en multiple de l'EBITDA."},
    {q:"Quels sont les intérêts financiers annuels ?", val:interets, unit:"€", tol:Math.max(10000,interets*.01),
     calcul:`${eurX(detteInit)} × ${(tauxDette*100).toFixed(1).replace(".",",")} % = <b>${eurX(interets)}</b>`,
     cle:"La première charge que le cash généré doit couvrir, avant même de penser à rembourser le principal."},
    {q:"Quel est le ratio de couverture des intérêts (EBITDA ÷ intérêts) à l'entrée ?", val:couverture, unit:"×", tol:.2,
     calcul:`${eurX(ebitda)} ÷ ${eurX(interets)} = <b>${couverture.toFixed(2).replace(".",",")}×</b>`,
     cle:"Le chiffre que surveillent les prêteurs en premier — souvent avant même le niveau d'endettement lui-même."},
    {q:"Quelle est la base imposable de l'année (EBITDA − amortissements − intérêts) ?", val:baseImposable, unit:"€", tol:Math.max(20000,Math.abs(baseImposable)*.02),
     calcul:`${eurX(ebitda)} − ${eurX(capex)} − ${eurX(interets)} = <b>${eurX(baseImposable)}</b>`,
     cle:"Les intérêts sont déductibles, comme les amortissements : c'est ce qui reste qui est réellement imposé."},
    {q:"Quel est l'impôt dû sur l'exercice ?", val:impot, unit:"€", tol:Math.max(10000,Math.abs(impot)*.02),
     calcul:`${eurX(baseImposable)} × 25 % = <b>${eurX(impot)}</b>`,
     cle:"Le bouclier fiscal de la dette agit ici, directement : plus les intérêts sont élevés, plus l'impôt baisse — jusqu'à un certain point."},
    {q:"Quel est le FCF disponible pour rembourser la dette (cash sweep) cette année-là ?", val:fcfDispo, unit:"€", tol:Math.max(20000,Math.abs(fcfDispo)*.02),
     calcul:`${eurX(ebitda)} − ${eurX(capex)} − ${eurX(interets)} − ${eurX(impot)} = <b>${eurX(fcfDispo)}</b>`,
     cle:"C'est ce chiffre, et lui seul, qui rembourse la dette par anticipation — tant qu'il est positif, le cash sweep fait son travail sans intervention du sponsor."},
    {q:"Après application intégrale du cash sweep, quelle est la dette restante en fin de première année ?", val:detteApres1An, unit:"€", tol:Math.max(20000,Math.abs(detteApres1An)*.015),
     calcul:`${eurX(detteInit)} − ${eurX(fcfDispo)} = <b>${eurX(detteApres1An)}</b>`,
     cle:"Le désendettement d'une seule année — celui qui, cumulé sur toute la détention, alimente le levier « mécanique » de création de valeur vu au palier précédent."},
    {q:`Si l'EBITDA chutait de ${chocPct} % (choc conjoncturel, intérêts inchangés), quel serait le nouveau ratio de couverture ?`, val:couvertureChoc, unit:"×", tol:.2,
     calcul:`(${eurX(ebitda)} × ${100-chocPct} %) ÷ ${eurX(interets)} = <b>${couvertureChoc.toFixed(2).replace(".",",")}×</b>`,
     cle:"La double peine du levier en bas de cycle : l'EBITDA baisse ET le ratio de couverture s'effondre par les deux bouts, souvent bien avant que le cash ne manque réellement."}
   ]};}},

/* ============ 39 · piste LBO ============ */
{id:"e39", n:39, piste:"lbo", ic:"🎯", titre:"Sensibilité — le multiple de sortie",
 sujet:"Comparer l'impact en euros d'un point d'entrée, de sortie, et de croissance manqués",
 rappel:`Trois hypothèses peuvent se retourner contre un LBO : payer un multiple d'ENTRÉE plus élevé, sortir à un multiple plus BAS que prévu, ou générer moins de CROISSANCE d'EBITDA que prévu. Un écart d'1× sur le multiple d'entrée s'applique à l'EBITDA d'ENTRÉE — le plus petit des deux. Un écart d'1× sur le multiple de SORTIE s'applique à l'EBITDA de SORTIE — plus grand, après plusieurs années de croissance.
   <br><br>Conséquence directe : à écart de multiple égal, un raté sur le multiple de SORTIE coûte TOUJOURS plus cher qu'un raté à l'entrée. Et c'est la variable la moins contrôlable des trois : on choisit son prix d'entrée, jamais son prix de sortie.`,
 gen:R=>{
  const ebitdaEntree=R.ent(15,50)*1000000, multEntree=R.ent(65,85)/10;
  const levier=R.ent(45,60)/10;
  const detteEntree=Math.round(ebitdaEntree*levier);
  const evEntree=ebitdaEntree*multEntree;
  const equityEntree=evEntree-detteEntree;
  const croissance=R.ent(20,35)/100;
  const ebitdaSortie=ebitdaEntree*(1+croissance);
  const multSortie=multEntree;
  const desendPct=R.ent(55,75)/100;
  const detteSortie=detteEntree*(1-desendPct);
  const equitySortie=ebitdaSortie*multSortie-detteSortie;
  const profitBase=equitySortie-equityEntree;
  const deltaProfitEntree=ebitdaEntree;
  const deltaProfitSortie=ebitdaSortie;
  const facteur=ebitdaSortie/ebitdaEntree;
  const croissanceRateePts=10;
  const deltaProfitCroissance=(croissanceRateePts/100)*ebitdaEntree*multSortie;
  return {contextes:[`Un comité d'investissement teste la robustesse d'un deal LBO avant de signer.`,
    `Avant d'arbitrer sur le prix, on chiffre ce que chaque hypothèse manquée coûterait vraiment.`,
    `Trois risques identifiés sur un dossier : le prix payé, le prix de sortie, la croissance.`,
    `Le partner demande : « laquelle de ces trois hypothèses nous fait le plus peur ? »`],
   contexte:`Un comité d'investissement teste la robustesse d'un deal LBO avant de signer.`,
   donnees:[["EBITDA d'entrée",ebitdaEntree,"€"],["Multiple d'entrée (scénario de base)",multEntree,"×"],
            ["Levier à l'entrée",levier,"×"],["Croissance d'EBITDA prévue sur la période",croissance*100,"%"],
            ["Multiple de sortie (scénario de base, égal à l'entrée)",multSortie,"×"],["Dette remboursée sur la période",desendPct*100,"%"]],
   questions:[
    {q:"Quel est l'EBITDA de sortie prévu, avec cette croissance ?", val:ebitdaSortie, unit:"€", tol:Math.max(50000,ebitdaSortie*.01),
     calcul:`${eurX(ebitdaEntree)} × (1 + ${(croissance*100).toFixed(0)} %) = <b>${eurX(ebitdaSortie)}</b>`,
     cle:"Toujours plus grand que l'EBITDA d'entrée sur une opération réussie — c'est cet écart qui va faire toute la différence entre les deux sensibilités testées plus bas."},
    {q:"Quel est le profit total du scénario de base (equity sortie − equity entrée) ?", val:profitBase, unit:"€", tol:Math.max(50000,Math.abs(profitBase)*.02),
     calcul:`${eurX(equitySortie)} − ${eurX(equityEntree)} = <b>${eurX(profitBase)}</b>`,
     cle:"Le point de référence, avant de tester ce que chaque hypothèse manquée y change."},
    {q:"Si tu avais payé 1× d'EBITDA de MOINS à l'entrée, tout le reste égal, de combien le profit final augmenterait-il ?",
     val:deltaProfitEntree, unit:"€", tol:Math.max(30000,deltaProfitEntree*.01),
     calcul:`1× × EBITDA d'ENTRÉE = 1 × ${eurX(ebitdaEntree)} = <b>${eurX(deltaProfitEntree)}</b>`,
     cle:"Un euro de multiple d'entrée en moins se traduit, euro pour euro, en equity de plus au moment de signer — l'effet le plus direct et le plus contrôlable des trois."},
    {q:"Si le multiple de SORTIE finissait 1× plus bas que prévu, tout le reste égal, de combien le profit final baisserait-il ?",
     val:deltaProfitSortie, unit:"€", tol:Math.max(30000,deltaProfitSortie*.01),
     calcul:`1× × EBITDA de SORTIE = 1 × ${eurX(ebitdaSortie)} = <b>${eurX(deltaProfitSortie)}</b>`,
     cle:"Le même écart de multiple, appliqué à un EBITDA plus grand parce qu'il a eu le temps de croître — d'où un impact systématiquement plus lourd qu'à l'entrée."},
    {q:"De quel facteur l'impact d'un écart de multiple de SORTIE dépasse-t-il l'impact du même écart à l'ENTRÉE ?", val:facteur, unit:"×", tol:.15,
     calcul:`${eurX(ebitdaSortie)} ÷ ${eurX(ebitdaEntree)} = <b>${facteur.toFixed(2).replace(".",",")}×</b>`,
     cle:"Exactement 1 plus le taux de croissance de l'EBITDA sur la période — ce n'est pas une coïncidence, c'est la mécanique même de la décomposition du palier précédent."},
    {q:`Si la croissance d'EBITDA sur la période était finalement ${croissanceRateePts} points plus faible que prévu, de combien le profit final baisserait-il (en valeur absolue) ?`,
     val:deltaProfitCroissance, unit:"€", tol:Math.max(20000,deltaProfitCroissance*.02),
     calcul:`${croissanceRateePts} % × ${eurX(ebitdaEntree)} × ${multSortie.toFixed(1).replace(".",",")}× = <b>${eurX(deltaProfitCroissance)}</b>`,
     cle:"Un troisième risque, chiffré de la même façon que les deux autres — ce qui permet enfin de les COMPARER, plutôt que de les redouter au hasard."}
   ]};}}

];
