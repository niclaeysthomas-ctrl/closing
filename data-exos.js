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
{id:"e1", n:1, ic:"🧾", titre:"Lire un compte de résultat",
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
    {q:"En régime de croisière, les investissements égalent les dotations (on renouvelle l'outil, sans l'agrandir). Quel serait alors le FCFF ?",
     val:nopat-dbfr, unit:"€",
     calcul:`${eurX(nopat)} + ${eurX(dot)} − ${eurX(dbfr)} − ${eurX(dot)} = <b>${eurX(nopat-dbfr)}</b>`,
     cle:"Dotations et investissements s'annulent : c'est le flux « normalisé » d'une entreprise qui ne fait que se maintenir. C'est lui qu'on met dans la valeur terminale — jamais le flux d'une année d'investissement exceptionnel."}
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
{id:"e13", n:13, piste:"prix", ic:"🎚️", titre:"Lire une élasticité",
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
{id:"e14", n:14, piste:"prix", ic:"📐", titre:"La mesurer proprement",
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
{id:"e16", n:16, piste:"prix", ic:"⚔️", titre:"Élasticité et MARGE",
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
{id:"e17", n:17, piste:"prix", ic:"🔬", titre:"La mesurer dans la vraie vie",
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
{id:"e18", n:18, piste:"prix", ic:"🏭", titre:"Par secteur, et le prix optimal",
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
   ]};}}

];
