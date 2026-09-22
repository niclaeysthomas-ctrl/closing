// LE CLOSING — LA BOÎTE : deck du NIVEAU 3 « Le dealmaker ».
// Ajouté le 2026-09-20. Comme le niveau 2, il était défini et vide.
//
// Le saut de 2 à 3 : on ne décide plus pour son entreprise, on décide pour
// des investisseurs, face à des contreparties qui ont leur propre intérêt
// et leur propre information. D'où des setups où une partie des chiffres
// est fournie PAR L'ADVERSAIRE — et où la vraie question est de savoir
// lesquels croire.


/* ============================================================
   LE NIVEAU 3 S'ÉTOFFE — 2026-09-22.
   Cinq cas pour une partie de soixante mois, tous en QCM : aucune
   construction, aucune négociation, et TROIS NOTIONS PROMISES SANS
   AUCUN EXERCICE — la création de valeur décomposée, la table de
   capitalisation tour après tour, et « répondre à un comité
   d'investissement sur ses propres chiffres ».

   ⚠️ CONVENTION DU NIVEAU 3, à respecter : le LBO se monte dans une
   HOLDING de reprise. Ses montants ne sont PAS mis à l'échelle de sa
   boîte d'exploitation (contrairement au niveau 2) — c'est une étude
   de dossier, pas son propre bilan, et n3lbo le dit déjà dans son
   apply. On lit B.lbo quand il existe, pour que les chiffres suivent
   la structure QU'IL a choisie, et on retombe sinon sur un dossier
   de référence.
   ============================================================ */
function n3deal(B){
  const L=(B&&B.lbo)||{};
  const ebE=L.ebitda||2000000;
  const dette=(L.debt||8000000)+(L.mezz||0);
  const eqE=L.equity||4000000;
  const multE=Math.round((dette+eqE)/ebE*10)/10;          /* multiple d'entrée effectif */
  const ebS=Math.round(ebE*1.45/10000)*10000;             /* EBITDA de sortie, +45 % en 5 ans */
  const multS=Math.round((multE+1)*10)/10;                /* un cran de multiple gagné */
  const veS=Math.round(ebS*multS);
  const detteS=Math.round(dette*.44/10000)*10000;         /* désendettement sur 5 ans */
  const eqS=veS-detteS;
  return {ebE, multE, veE:Math.round(ebE*multE), dette, eqE,
          ebS, multS, veS, detteS, eqS,
          gain:eqS-eqE,
          effetEbitda:Math.round((ebS-ebE)*multE),
          effetMultiple:Math.round((multS-multE)*ebS),
          desendettement:dette-detteS,
          mult:eqS/eqE, tri:Math.pow(eqS/eqE,1/5)-1};
}

const BIZCASES_N3 = [
{id:"n3bridge", lvl:3, type:"build", ch:9, icon:"🌉", title:"Le pont de création de valeur",
 concept:"D'où vient vraiment le gain : EBITDA, multiple, désendettement", lesson:"l3",
 when:B=>B.level>=3 && B.month>=40 && B.seen.indexOf("n3lbo")>=0,
 signal:"Ton investisseur te demande « d'où vient la performance ». Ce n'est pas une question de politesse.",
 setup:B=>{const d=n3deal(B); return `Cinq ans après l'entrée, tu prépares la sortie. Il est temps de dire <b>d'où vient l'argent</b> — trois sources, et une seule dépend vraiment de toi.
   <br><br><b>À l'entrée :</b> EBITDA ${eurX(d.ebE)} · multiple ${String(d.multE).replace(".",",")}× · dette nette ${eurX(d.dette)} · ton apport en fonds propres ${eurX(d.eqE)}.
   <br><br><b>À la sortie :</b> EBITDA ${eurX(d.ebS)} · multiple ${String(d.multS).replace(".",",")}× · dette nette ${eurX(d.detteS)}.
   <br><br>Le pont décompose le gain sur les fonds propres en trois blocs, et leur somme doit retomber EXACTEMENT sur l'écart. C'est le tableau que tout fonds présente à ses souscripteurs.`;},
 tableTitle:"Le pont, ligne par ligne",
 intro:"Les trois effets, puis le contrôle. Un montant par case, en euros.",
 lines:B=>{const d=n3deal(B); return [
  {k:"ve", label:"Valeur d'entreprise à la sortie", hint:"EBITDA de sortie × multiple de sortie", val:d.veS,
   how:`${eurX(d.ebS)} × ${String(d.multS).replace(".",",")} = <b>${eurX(d.veS)}</b>`,
   cle:"Tout part de là. Le multiple s'applique à l'EBITDA, et donne une valeur d'ENTREPRISE — pas encore ce qui te revient."},
  {k:"eq", label:"Valeur de tes fonds propres à la sortie", hint:"valeur d'entreprise − dette nette", val:d.eqS,
   how:`${eurX(d.veS)} − ${eurX(d.detteS)} = <b>${eurX(d.eqS)}</b>`,
   cle:"La dette se déduit à la sortie comme elle se déduisait à l'entrée. C'est la même identité, cinq ans plus tard."},
  {k:"eb", label:"Effet CROISSANCE de l'EBITDA", hint:"(EBITDA sortie − EBITDA entrée) × multiple d'ENTRÉE", val:d.effetEbitda,
   how:`(${eurX(d.ebS)} − ${eurX(d.ebE)}) × ${String(d.multE).replace(".",",")} = <b>${eurX(d.effetEbitda)}</b>`,
   cle:"On valorise la croissance au multiple d'ENTRÉE, pas de sortie : sinon on compterait deux fois l'effet de multiple. C'est la ligne qui mesure ce que tu as réellement fait dans l'entreprise."},
  {k:"mu", label:"Effet MULTIPLE", hint:"(multiple sortie − multiple entrée) × EBITDA de sortie", val:d.effetMultiple,
   how:`(${String(d.multS).replace(".",",")} − ${String(d.multE).replace(".",",")}) × ${eurX(d.ebS)} = <b>${eurX(d.effetMultiple)}</b>`,
   cle:"Cette ligne-là ne dépend pas de toi : c'est le marché qui te l'offre ou te la retire. Un fonds qui présente un beau TRI dont l'essentiel vient du multiple n'a pas créé de valeur, il a eu de la chance sur le calendrier."},
  {k:"de", label:"Effet DÉSENDETTEMENT", hint:"dette nette d'entrée − dette nette de sortie", val:d.desendettement,
   how:`${eurX(d.dette)} − ${eurX(d.detteS)} = <b>${eurX(d.desendettement)}</b>`,
   cle:"Chaque euro de dette remboursé est un euro qui bascule des prêteurs vers toi. C'est le cash de l'entreprise qui achète tes propres parts, lentement."},
  {k:"ct", label:"CONTRÔLE : la somme des trois effets", hint:"elle doit égaler l'écart de fonds propres", val:d.gain,
   how:`${eurX(d.effetEbitda)} + ${eurX(d.effetMultiple)} + ${eurX(d.desendettement)} = <b>${eurX(d.gain)}</b>, soit exactement ${eurX(d.eqS)} − ${eurX(d.eqE)}.`,
   cle:"Si la somme ne retombe pas sur l'écart, une des trois lignes est fausse. Le pont EST sa propre preuve — c'est pour ça qu'on le présente ainsi."}
 ];},
 apply:(B,r)=>{ B.bridgeFait=true; },
 debrief:(B,r)=>{const d=n3deal(B); const pcEb=Math.round(d.effetEbitda/d.gain*100), pcMu=Math.round(d.effetMultiple/d.gain*100), pcDe=Math.round(d.desendettement/d.gain*100);
  return `
  <p><b>Ton multiple sur fonds propres vaut ${(d.mult).toFixed(2).replace(".",",")}×, soit un TRI d'environ ${(d.tri*100).toFixed(1).replace(".",",")} % sur cinq ans.</b> Le chiffre qui fait la plaquette. Mais la question du souscripteur n'est jamais « combien » : c'est <b>« d'où »</b>.</p>
  <p><b>Ta décomposition : ${pcEb} % de croissance d'EBITDA, ${pcMu} % d'effet multiple, ${pcDe} % de désendettement.</b> ${pcMu>=40?"Près de la moitié du gain vient du marché, pas de toi. C'est agréable à encaisser et indéfendable à raconter : personne ne sait refaire ça sur commande.":pcEb>=45?"L'essentiel vient de la croissance de l'EBITDA — la seule des trois lignes que tu contrôles vraiment. C'est celle qui se reproduit sur le dossier suivant.":"Le désendettement pèse lourd : c'est le cash de la boîte qui a racheté tes parts. Ça marche, mais c'est un effet de structure, pas une performance opérationnelle."}</p>
  <p><b>Pourquoi on valorise la croissance au multiple d'ENTRÉE.</b> Si on la valorisait au multiple de sortie, l'effet de multiple serait compté deux fois : une fois sur l'EBITDA d'origine, une fois sur la croissance. Le pont ne tomberait plus juste — et c'est précisément parce qu'il doit tomber juste qu'il est un outil de preuve, et pas de présentation.</p>
  <p><b>Ce que ce tableau change dans une salle de comité.</b> Deux fonds affichent 30 % de TRI. Le premier l'a fait en doublant l'EBITDA, le second en achetant à 6× et revendant à 9× dans un marché porteur. Ils n'ont pas le même métier, et seul le premier sait ce qu'il refera demain.</p>`;},
 grid:[
  "Avoir déduit la dette nette pour passer de la valeur d'entreprise aux fonds propres, aux DEUX bouts.",
  "Avoir valorisé la croissance d'EBITDA au multiple d'ENTRÉE, pour ne pas compter deux fois l'effet de multiple.",
  "Avoir vu que l'effet multiple ne dépend pas de toi.",
  "Avoir compris que le désendettement transfère de la valeur des prêteurs vers l'actionnaire.",
  "Avoir vérifié que la somme des trois effets retombe sur l'écart de fonds propres."
 ]},

{id:"n3captable", lvl:3, type:"build", ch:8, icon:"🧾", title:"La table de capitalisation, tour après tour",
 concept:"Dilution · pre-money, post-money · effet de deux tours", lesson:"l2",
 when:B=>B.level>=3 && B.month>=34,
 signal:"Le fondateur te dit qu'il « garde le contrôle ». Il n'a pas refait le calcul après le deuxième tour.",
 setup:B=>`Une société que tu regardes a levé deux fois. Le fondateur détenait <b>100 %</b> au départ.
   <br><br><b>Tour A</b> — valorisation <b>pre-money</b> de ${eurX(4000000)}, levée de ${eurX(1000000)}.
   <br><b>Tour B</b>, deux ans plus tard — valorisation <b>pre-money</b> de ${eurX(12000000)}, levée de ${eurX(3000000)}.
   <br><br>Rappel de la mécanique : <b>post-money = pre-money + montant levé</b>, et la part du nouvel entrant vaut <b>montant levé ÷ post-money</b>. Les anciens se partagent le reste, chacun dilué dans la même proportion.
   <br><br>Six lignes. La dernière est celle que le fondateur n'avait pas faite.`,
 tableTitle:"La table, tour après tour",
 intro:"Les pourcentages à une décimale près, les montants en euros.",
 lines:B=>{
  const preA=4000000, levA=1000000, postA=preA+levA;
  const partA=levA/postA*100, fondA=100-partA;
  const preB=12000000, levB=3000000, postB=preB+levB;
  const partB=levB/postB*100;
  const fondB=fondA*(1-levB/postB);
  const valFond=postB*fondB/100;
  return [
  {k:"postA", label:"Valorisation post-money du tour A", hint:"pre-money + montant levé", val:postA, unit:"€",
   how:`${eurX(preA)} + ${eurX(levA)} = <b>${eurX(postA)}</b>`,
   cle:"Le post-money est la seule valorisation qui sert à calculer des pourcentages. Le pre-money sert à négocier, le post-money sert à répartir."},
  {k:"partA", label:"Part de l'investisseur du tour A, en %", hint:"montant levé ÷ post-money", val:partA, unit:"%", tol:.2,
   how:`${eurX(levA)} ÷ ${eurX(postA)} = <b>${partA.toFixed(1).replace(".",",")} %</b>`,
   cle:"Une levée de 1 M€ sur 4 M€ pre-money ne donne pas 25 % mais 20 % : le dénominateur inclut l'argent qui vient d'entrer."},
  {k:"fondA", label:"Part du fondateur après le tour A, en %", hint:"ce qu'il reste aux anciens", val:fondA, unit:"%", tol:.2,
   how:`100 % − ${partA.toFixed(1).replace(".",",")} % = <b>${fondA.toFixed(1).replace(".",",")} %</b>`,
   cle:"Il a vendu un cinquième de sa société pour financer sa croissance. Jusqu'ici, rien d'anormal."},
  {k:"partB", label:"Part de l'investisseur du tour B, en %", hint:"même mécanique, nouvelle valorisation", val:partB, unit:"%", tol:.2,
   how:`${eurX(levB)} ÷ ${eurX(postB)} = <b>${partB.toFixed(1).replace(".",",")} %</b>`,
   cle:"Le tour B dilue TOUT LE MONDE de la même façon — le fondateur comme l'investisseur du tour A. Personne n'est protégé, sauf clause contraire."},
  {k:"fondB", label:"Part du fondateur après le tour B, en %", hint:"sa part précédente, diluée à son tour", val:fondB, unit:"%", tol:.3,
   how:`${fondA.toFixed(1).replace(".",",")} % × (1 − ${partB.toFixed(1).replace(".",",")} %) = <b>${fondB.toFixed(1).replace(".",",")} %</b>`,
   cle:"C'est ici que tout le monde se trompe : la dilution est MULTIPLICATIVE, pas additive. On ne retire pas 20 % puis 20 %, on multiplie deux fois par ce qui reste."},
  {k:"valF", label:"Valeur de la part du fondateur après le tour B", hint:"post-money B × sa part", val:valFond, unit:"€",
   how:`${eurX(postB)} × ${fondB.toFixed(1).replace(".",",")} % = <b>${eurX(valFond)}</b>`,
   cle:"Le paradoxe à retenir : il possède une part BEAUCOUP plus petite d'une société BEAUCOUP plus grande — et il est largement plus riche qu'avant. Se battre pour un pourcentage sans regarder la valorisation est la première erreur d'un fondateur."}
  ];},
 debrief:(B,r)=>{
  const fondB=80*(1-3000000/15000000);
  return `
  <p><b>Le fondateur est passé de 100 % à ${fondB.toFixed(1).replace(".",",")} % en deux tours, et sa participation vaut ${eurX(15000000*fondB/100)} contre ${eurX(4000000)} de valorisation initiale.</b> Il a perdu un tiers de sa société et multiplié sa fortune par trois. Les deux sont vrais en même temps, et c'est tout le sujet.</p>
  <p><b>La dilution est multiplicative.</b> 80 % puis −20 % ne fait pas 60 % : ça fait 64 %. Sur quatre tours, l'erreur additive se trompe de dix points ou plus. C'est le calcul le plus simple de tout ce palier et le plus souvent faux en réunion.</p>
  <p><b>Ce qu'un professionnel regarde, et que la table ne montre pas.</b> Les pourcentages ne disent rien des <b>préférences de liquidation</b> : un investisseur à 20 % avec une préférence 1× non participative récupère son argent AVANT tout le monde en cas de sortie basse. À 15 M€ de valorisation, la table suffit ; à 12 M€ de sortie, elle ment. <b>Une table de capitalisation sans le détail des préférences est une photo sans la légende.</b></p>`;},
 grid:[
  "Avoir calculé les parts sur le POST-money, jamais sur le pre-money.",
  "Avoir vu que le tour B dilue aussi l'investisseur du tour A.",
  "Avoir appliqué la dilution de façon multiplicative, pas additive.",
  "Avoir converti le pourcentage final en valeur, et pas seulement en fierté.",
  "Savoir que la table seule ne dit rien des préférences de liquidation."
 ]},

{id:"n3comite", lvl:3, type:"build", ch:10, icon:"🎙️", title:"Le comité d'investissement",
 concept:"Défendre son dossier sur ses propres chiffres", lesson:"l4",
 when:B=>B.level>=3 && B.month>=46 && B.seen.indexOf("n3bridge")>=0,
 signal:"Le comité a lu ton mémo en diagonale. Il ne posera que des questions chiffrées.",
 setup:B=>{const d=n3deal(B); return `Tu présentes ta sortie au comité d'investissement. Personne ne conteste ton histoire — ils veulent tes chiffres, et ils les veulent maintenant.
   <br><br><b>Ton dossier :</b> apport en fonds propres ${eurX(d.eqE)} · valeur des fonds propres à la sortie ${eurX(d.eqS)} · durée de détention <b>5 ans</b>.
   <br>EBITDA d'entrée ${eurX(d.ebE)}, de sortie ${eurX(d.ebS)} · dette nette d'entrée ${eurX(d.dette)}, de sortie ${eurX(d.detteS)}.
   <br><br>Cinq questions. Celles qu'on pose vraiment, dans l'ordre où on les pose.`;},
 tableTitle:"Les cinq questions du comité",
 intro:"Pas de récit, pas d'adjectif. Des nombres.",
 lines:B=>{const d=n3deal(B); const levE=d.dette/d.ebE, levS=d.detteS/d.ebS; return [
  {k:"mult", label:"Multiple sur fonds propres", hint:"valeur de sortie ÷ apport initial", val:d.mult, unit:"×", tol:.08,
   how:`${eurX(d.eqS)} ÷ ${eurX(d.eqE)} = <b>${d.mult.toFixed(2).replace(".",",")}×</b>`,
   cle:"Le premier chiffre demandé, toujours. Il ne dit rien du temps qu'il a fallu — c'est exactement pour ça qu'on enchaîne avec le TRI."},
  {k:"tri", label:"TRI annualisé, en %", hint:"multiple à la puissance 1/5, moins 1", val:d.tri*100, unit:"%", tol:.6,
   how:`${d.mult.toFixed(2).replace(".",",")}<sup>1/5</sup> − 1 = <b>${(d.tri*100).toFixed(1).replace(".",",")} %</b>`,
   cle:"Multiple et TRI ne disent pas la même chose : 2× en trois ans (26 %) vaut mieux que 2,5× en sept (14 %). Un fonds est jugé sur le TRI, un souscripteur encaisse le multiple."},
  {k:"levE", label:"Levier à l'entrée (dette nette / EBITDA)", hint:"en nombre de fois l'EBITDA", val:levE, unit:"×", tol:.08,
   how:`${eurX(d.dette)} ÷ ${eurX(d.ebE)} = <b>${levE.toFixed(2).replace(".",",")}×</b>`,
   cle:"La question qui teste si tu as acheté ou si tu as emprunté. Au-delà de 4×, le comité veut savoir ce qui se passe si l'EBITDA recule de 20 %."},
  {k:"levS", label:"Levier à la sortie", hint:"même calcul, cinq ans plus tard", val:levS, unit:"×", tol:.08,
   how:`${eurX(d.detteS)} ÷ ${eurX(d.ebS)} = <b>${levS.toFixed(2).replace(".",",")}×</b>`,
   cle:"L'écart entre les deux leviers raconte toute l'histoire : tu as remboursé, et l'EBITDA a grossi sous la dette. C'est ce double mouvement qui fabrique le rendement d'un LBO."},
  {k:"crois", label:"Croissance de l'EBITDA sur la période, en %", hint:"écart rapporté à l'EBITDA d'entrée", val:(d.ebS/d.ebE-1)*100, unit:"%", tol:.8,
   how:`(${eurX(d.ebS)} ÷ ${eurX(d.ebE)}) − 1 = <b>${((d.ebS/d.ebE-1)*100).toFixed(1).replace(".",",")} %</b>`,
   cle:"La seule ligne que le comité retiendra vraiment. C'est elle qui dit si tu sais faire grandir une entreprise, ou seulement en acheter une au bon moment."}
 ];},
 debrief:(B,r)=>{const d=n3deal(B); return `
  <p><b>Un comité d'investissement ne teste pas ta conviction : il teste si tu connais ton propre dossier sans tes notes.</b> ${r.bons===r.total?"Cinq sur cinq. C'est le minimum, et la plupart ne l'ont pas." : r.bons>=3?"Ce qui manque n'est pas de la compréhension, c'est de l'automatisme. Ces cinq chiffres doivent sortir sans hésitation — sinon on doute du reste." : "Ces cinq chiffres sont ceux de TON dossier. Ne pas les avoir en tête, c'est laisser penser que quelqu'un d'autre les a calculés pour toi."}</p>
  <p><b>Le piège du TRI, celui qu'on tend à chaque fois.</b> Il récompense la vitesse autant que le gain. Un fonds peut afficher un TRI superbe en sortant vite d'un dossier moyen, et un TRI médiocre en gardant huit ans une belle entreprise. C'est pour ça qu'on demande toujours les DEUX — multiple et TRI — et qu'on se méfie de celui qui n'en cite qu'un.</p>
  <p><b>Et la question suivante, celle qui vient toujours après les chiffres :</b> « qu'est-ce qui se serait passé si l'EBITDA avait reculé de 20 % en année 2 ? » À ${(d.dette/d.ebE).toFixed(1).replace(".",",")}× de levier d'entrée, la réponse tient en une ligne — et si tu ne l'as pas préparée, le comité l'écrira à ta place.</p>`;},
 grid:[
  "Avoir les cinq chiffres de son propre dossier sans hésiter.",
  "Savoir que multiple et TRI ne répondent pas à la même question.",
  "Avoir regardé le levier aux DEUX bouts, pas seulement à l'entrée.",
  "Avoir isolé la croissance d'EBITDA — la seule ligne qui prouve un savoir-faire.",
  "Avoir préparé le scénario dégradé avant qu'on te le demande."
 ]},

{id:"n3vendeurpro", lvl:3, type:"nego", ch:9, icon:"♟️", title:"Face à un vendeur qui fait ça toute l'année",
 concept:"Process structuré · exclusivité · asymétrie d'information", lesson:"l5",
 when:B=>B.level>=3 && B.month>=38,
 signal:"La data room a ouvert un vendredi à 18 h. Ce n'est jamais un hasard de calendrier.",
 setup:B=>`En face, ce n'est plus un dirigeant qui vend l'œuvre de sa vie : c'est <b>un fonds</b>, qui vend trois dossiers par an et qui a écrit les règles du process.
   <br><br>Tu es en short-list avec deux autres. Le banquier d'affaires demande une offre ferme sous quinze jours, <b>sans exclusivité</b>, sur la base d'une data room incomplète — les contrats clients n'y sont pas.
   <br><br>Ton objectif : <b>obtenir l'exclusivité et le temps de regarder</b>. Trois leviers, pas plus.`,
 goal:"Obtenir l'exclusivité et le temps",
 max:3,
 levers:[
  {k:"a", label:"Une offre indicative chiffrée, assortie de conditions précises", power:3,
   why:"Tu donnes ce qu'il veut — un chiffre — en l'assortissant de ce dont tu as besoin. Un prix conditionnel n'est pas un prix mou : c'est un prix honnête, et un vendeur professionnel le préfère à un chiffre élevé qui s'effondrera en diligences."},
  {k:"b", label:"Le calendrier de ton financement, daté et confirmé", power:3,
   why:"Face à un fonds, la certitude d'exécution vaut souvent plus qu'un demi-point de prix : il a déjà vu deux process échouer au financement. Tu deviens l'acheteur qui ferme, et ça s'achète en exclusivité."},
  {k:"c", label:"Demander les contrats clients comme condition de l'offre ferme", power:2,
   why:"Tu ne demandes pas une faveur, tu poses une condition de validité. Un vendeur qui refuse de montrer ses contrats clients vient de te donner une information — peut-être la plus chère du dossier."},
  {k:"d", label:"Monter ton prix pour décrocher l'exclusivité", power:-2,
   why:"C'est exactement ce que le process est conçu pour produire. Tu paies l'exclusivité en prix, puis tu découvres en diligences ce qui la justifiait — et renégocier après avoir surenchéri te fait passer pour un acheteur qui se dédit."},
  {k:"e", label:"Accepter le calendrier de quinze jours sans réserve", power:-3,
   why:"Tu renonces à la seule protection qui te reste. Quinze jours sans les contrats clients, c'est signer sur une photo retouchée ; le jour où tu découvriras la concentration réelle, tu auras déjà une offre ferme sur la table."},
  {k:"f", label:"Faire savoir que tu es le seul à pouvoir intégrer la cible", power:1,
   why:"L'argument industriel porte — tu peux payer plus cher parce que tu vaudras plus avec. Mais il se retourne s'il est seul : tu viens d'annoncer que ce dossier t'est plus utile qu'aux autres, donc que tu peux monter."},
  {k:"g", label:"Menacer de te retirer du process", power:2,
   why:"Crédible seulement si tu peux le faire, et c'est la question que le banquier se pose en t'écoutant. Face à un vendeur professionnel, le retrait est le seul levier symétrique : il a un calendrier à tenir vis-à-vis de ses propres souscripteurs."},
  {k:"h", label:"Demander une exclusivité courte, de trois semaines", power:3,
   why:"La demande la plus intelligente du lot, parce qu'elle est facile à accorder. Tu ne réclames pas un privilège, tu proposes un échange : de la certitude pour lui, du temps pour toi. Courte, elle ne lui coûte presque rien — et elle te donne tout ce qu'il te faut."}
 ],
 resolve:(B,picks)=>{
   const C=BIZCASES_N3.find(c=>c.id==="n3vendeurpro");
   const p=picks.reduce((t,k)=>t+C.levers.find(l=>l.k===k).power,0);
   const exclu=p>=5, jours=exclu?21:p>=2?10:0;
   B.exclusivite=exclu; B.joursDiligence=jours;
   if(picks.includes("d")) B.surencheri=true;
   if(picks.includes("e")) B.signeAveugle=true;
   return {p, exclu, jours};
 },
 debrief:(B,picks,r)=>`
  <p><b>${r.exclu?`Tu repars avec trois semaines d'exclusivité.`:r.jours?`Pas d'exclusivité, mais ${r.jours} jours de plus pour regarder.`:`Ni exclusivité, ni délai : tu joues au calendrier qu'il a écrit.`}</b> ${r.exclu?"C'est la seule chose qui comptait : hors exclusivité, tu paies des avocats pour une option que deux concurrents ont aussi.":"Chaque jour de diligence perdu est un risque que tu achètes sans le savoir."}</p>
  <p><b>Ce qui change quand le vendeur est un professionnel.</b> Un dirigeant qui vend sa boîte vend une histoire et une vie ; un fonds vend un actif, avec un calendrier, une thèse de sortie et des souscripteurs à qui rendre des comptes. Tu ne le feras pas céder à l'émotion, et il ne tombera dans aucun des pièges classiques. <b>En revanche, il a une contrainte que l'autre n'avait pas : il doit clôturer.</b> C'est là qu'est ton levier — pas sur le prix, sur la certitude d'exécution.</p>
  <p><b>Et une data room incomplète n'est pas un oubli.</b> ${picks.includes("c")?"Tu as posé les contrats clients en condition : soit tu les obtiens, soit son refus t'apprend ce qu'ils contiennent. Les deux te servent.":"Tu n'as pas réclamé les contrats clients. Ce qui manque dans une data room structurée manque toujours pour une raison, et cette raison finit par arriver — après la signature."}${picks.includes("d")?" Et tu as payé l'exclusivité en prix : c'est précisément le mécanisme que le process est conçu pour déclencher.":""}</p>`,
 grid:[
  "Avoir compris que le levier, face à un fonds, est la certitude d'exécution — pas le prix.",
  "Avoir demandé une exclusivité COURTE, facile à accorder, plutôt qu'un privilège.",
  "Avoir posé l'accès aux contrats clients comme condition, pas comme faveur.",
  "N'avoir jamais payé du temps avec du prix.",
  "Avoir lu ce qu'une data room incomplète dit d'elle-même."
 ]},

{id:"n3lbo", lvl:3, type:"choice", ch:6, icon:"🏗️", title:"Combien de dette ce dossier supporte",
 concept:"Structure LBO · capacité de remboursement · levier", lesson:"l1",
 when:B=>B.level>=3 && B.month>=30 && B.hist.length>=12,
 signal:"Le banquier d'affaires te presse : « trois autres fonds sont sur le dossier ». C'est vrai une fois sur quatre.",
 gate:{ask:"Avant tout : combien de cash cette cible dégage-t-elle VRAIMENT chaque année pour servir sa dette ?", unit:"€", pal:10, tol:.07, plancher:15000,
   val:B=>Math.round((2000000-350000-120000)*0.75),
   how:"Cash disponible = (EBITDA − CAPEX de maintien − variation de BFR) × (1 − impôt) = (2 000 000 − 350 000 − 120 000) × 0,75.",
   why:"L'EBITDA ne rembourse pas la dette : le cash libre la rembourse. Entre les deux il y a le CAPEX qu'il faut bien payer, le BFR qui grossit avec l'activité, et l'impôt. Raisonner sur les 2 M€ surestime la capacité de remboursement de près de moitié — et c'est exactement l'erreur que les quatre options te tendent."},
 setup:B=>`Tu montes ton premier LBO sur une cible industrielle. Les chiffres audités :
   <br><br>EBITDA <b>2 000 000 €</b> · CAPEX de maintien <b>350 000 €</b>/an · variation de BFR <b>+120 000 €</b>/an · impôt effectif <b>25 %</b>.
   <br><br>Prix négocié : <b>12 000 000 €</b> (6× l'EBITDA). Il faut décider de la structure.
   <br><br>La dette senior se place à <b>5,5 %</b>, amortissable sur 7 ans. La mezzanine à <b>11 %</b>, remboursable in fine.
   <br><br>Avant de choisir : calcule le <b>cash disponible pour le service de la dette</b>. Ce n'est pas l'EBITDA.`,
 options:[
  {k:"A", label:"8 M€ de senior, 4 M€ d'equity", term:"Levier 4× l'EBITDA. Structure agressive, TRI élevé si ça passe.", q:0},
  {k:"B", label:"6 M€ de senior, 2 M€ de mezzanine, 4 M€ d'equity", term:"Levier 4× aussi, mais une partie in fine.", q:1},
  {k:"C", label:"5 M€ de senior, 7 M€ d'equity", term:"Levier 2,5×. Tu dors la nuit, ton TRI est plus faible.", q:2},
  {k:"D", label:"9 M€ de senior, 3 M€ d'equity", term:"Levier 4,5×. Le maximum que la banque accepte de dire tout haut.", q:-2}
 ],
 apply:(B,k)=>{
   const st={A:{d:8000000,e:4000000,mz:0},B:{d:6000000,e:4000000,mz:2000000},C:{d:5000000,e:7000000,mz:0},D:{d:9000000,e:3000000,mz:0}}[k];
   /* Le LBO se monte dans une HOLDING de reprise : sa dette ne figure pas au
      bilan de l'exploitation. On la garde donc dans B.lbo et on ne touche ni
      au cash ni aux emprunts de la boîte — sinon on injecte 8 M€ de dette
      dans un artisan et le bilan n'a plus aucun sens. */
   B.lbo={debt:st.d,mezz:st.mz,equity:st.e,ebitda:2000000};
   B.leverage=(st.d+st.mz)/2000000;
   if(k==="D") B.lboStress=true;
 },
 debrief:(B,k)=>`
  <p><b>L'EBITDA ne rembourse pas la dette : le cash libre la rembourse.</b> C'est la première chose qu'on apprend en LBO et la dernière qu'on applique. Le calcul qu'il fallait poser : 2 000 000 d'EBITDA − 350 000 de CAPEX de maintien − 120 000 de BFR − l'impôt ≈ <b>un peu plus de 1,1 M€</b> de cash réellement disponible chaque année. Tout raisonnement fondé sur les 2 M€ surestime la capacité de remboursement de près de moitié.</p>
  <p><b>Confronte maintenant ce chiffre au service de la dette.</b> 8 M€ de senior sur 7 ans, c'est environ 1,14 M€ de capital par an, <i>plus</i> 440 000 € d'intérêts la première année : près de 1,6 M€ à sortir pour 1,1 M€ disponible. L'option A ne passe pas, et l'option D encore moins. <b>Le ratio qui décide s'appelle le DSCR</b> — cash disponible ÷ service de la dette. En dessous de 1, tu ne rembourses pas ; en dessous de 1,2, tu n'as le droit à aucun imprévu.</p>
  <p><b>C'est exactement pour ça que la mezzanine existe, et l'option B est plus intelligente qu'elle n'en a l'air.</b> Elle coûte 11 % au lieu de 5,5 %, ce qui paraît absurde — sauf qu'elle est <i>in fine</i> : elle ne pèse pas sur le cash annuel, seulement à la sortie. <b>En LBO, le calendrier d'une dette compte autant que son taux.</b> Une dette chère qui ne demande rien pendant cinq ans peut sauver un dossier qu'une dette bon marché et amortissable aurait tué.</p>
  <p><b>Et le vrai point, celui que le levier maximal fait oublier : le levier n'augmente pas le rendement, il augmente la dispersion.</b> À 4,5×, si l'EBITDA progresse comme prévu tu fais un TRI spectaculaire ; s'il recule de 15 %, tu es en défaut de covenant dès la deuxième année et ton equity vaut zéro. C n'est pas le choix du frileux : c'est le choix de celui qui a compris que <b>la première règle du LBO est de survivre jusqu'à la sortie</b>, parce qu'un fonds qui perd son equity ne se refait jamais sur le dossier suivant.</p>`,
 grid:[
  "Avoir déduit CAPEX, BFR et impôt de l'EBITDA avant de parler de capacité de dette.",
  "Avoir confronté le cash disponible au service ANNUEL de la dette (DSCR), pas au montant total.",
  "Avoir vu que le profil de remboursement (amortissable vs in fine) compte autant que le taux.",
  "Avoir raisonné sur le scénario dégradé, où le levier détruit l'equity au lieu de l'amplifier."
 ]},

{id:"n3qoe", lvl:3, type:"choice", ch:7, icon:"🔬", title:"L'EBITDA ajusté qui ne l'est pas",
 concept:"Quality of earnings · retraitements · due diligence", lesson:"j2",
 when:B=>B.level>=3 && B.lbo && B.month>=34,
 signal:"La data room a été ouverte tard, et le fichier des retraitements est le seul à être en PDF.",
 gate:{ask:"Quel EBITDA retiens-tu, une fois écartés les retraitements qui n'en sont pas ?", unit:"€", pal:2, tol:.04, plancher:10000,
   val:B=>1520000+150000,
   how:"EBITDA comptable 1 520 000 € + la seule correction légitime : les 150 000 € de rémunération du dirigeant qui part = 1 670 000 €.",
   why:"Un retraitement n'est recevable que s'il est NON RÉCURRENT et VÉRIFIABLE. Un litige « exceptionnel » présent trois années de suite est une charge ordinaire ; des frais de conseil liés à la vente sont un coût du vendeur ; et des synergies que TU réaliseras ne s'achètent pas — les payer, c'est se payer soi-même."},
 setup:B=>`Le vendeur présente un <b>« EBITDA ajusté »</b> de 2 000 000 €. L'EBITDA comptable brut est de <b>1 520 000 €</b>.
   <br><br>Les 480 000 € d'écart, ligne par ligne, tels qu'il les justifie :
   <br>· <b>150 000 €</b> — rémunération du dirigeant « au-dessus du marché », qui partira
   <br>· <b>120 000 €</b> — « coûts exceptionnels » d'un litige… présent aussi en N−1 et N−2
   <br>· <b>90 000 €</b> — frais de conseil liés à la vente
   <br>· <b>70 000 €</b> — « synergies que l'acquéreur réalisera »
   <br>· <b>50 000 €</b> — perte d'un contrat client « non récurrent », perdu il y a 4 mois
   <br><br>Chaque 100 000 € d'EBITDA vaut <b>600 000 €</b> de prix à 6×. Tu retraites quoi ?`,
 options:[
  {k:"A", label:"Tu acceptes l'ajusté : c'est la norme du marché", term:"2,0 M€ d'EBITDA, prix à 12 M€.", q:-2},
  {k:"B", label:"Tu ne gardes que la rémunération du dirigeant", term:"1,67 M€ d'EBITDA, prix à 10 M€.", q:2},
  {k:"C", label:"Tu refuses tout retraitement", term:"1,52 M€ d'EBITDA, prix à 9,1 M€. Position dure.", q:1},
  {k:"D", label:"Tu acceptes tout sauf les synergies", term:"1,93 M€ d'EBITDA, prix à 11,6 M€.", q:0}
 ],
 apply:(B,k)=>{
   const eb={A:2000000,B:1670000,C:1520000,D:1930000}[k];
   B.lbo.ebitdaRetenu=eb; B.lbo.prix=eb*6;
   if(k==="A"||k==="D") B.overpaid=true;
 },
 debrief:(B,k)=>`
  <p><b>Un retraitement est légitime quand il corrige une charge qui n'existera plus après le deal — et seulement dans ce cas.</b> Passe les cinq lignes à ce test unique et le dossier se range tout seul. La rémunération du dirigeant qui part : <b>légitime</b>, à condition de déduire ce que coûtera son remplaçant — un directeur général ne travaille pas gratuitement, et « 150 000 € d'économie » devient souvent 60 000 € une fois le successeur payé.</p>
  <p><b>Les quatre autres sont des prises de prix déguisées en comptabilité.</b> Un « exceptionnel » qui revient trois années de suite est une charge récurrente : c'est le retraitement le plus fréquent et le plus facile à démonter — il suffit de demander l'historique sur cinq ans. Les frais de conseil liés à la vente sont supportés par le <i>vendeur</i> : les ajouter revient à te faire payer les honoraires de son propre banquier. Les <b>synergies futures</b> sont ta création de valeur à toi ; les payer d'avance, c'est offrir au vendeur le fruit du travail que tu n'as pas encore fait. Et un contrat perdu il y a quatre mois n'est pas « non récurrent » : c'est ton EBITDA de l'an prochain.</p>
  <p><b>Regarde l'enjeu chiffré, il est brutal.</b> À 6×, accepter les 480 000 € d'écart coûte <b>2 880 000 €</b> de prix. La <i>quality of earnings</i> n'est pas une formalité d'audit : c'est la ligne de négociation la mieux rémunérée de tout le process. Quelques semaines de travail sur un tableur valent ici plusieurs millions — aucun autre poste du deal n'offre ce rendement.</p>
  <p><b>C paraît le plus dur et c'est en réalité le plus faible.</b> Refuser en bloc, c'est refuser d'argumenter : tu perds la rémunération du dirigeant, qui était retraitable, et tu perds surtout ta crédibilité technique face au vendeur. <b>En due diligence, la force ne vient pas de la fermeté : elle vient de la ligne à ligne.</b> Un acheteur qui accepte un retraitement justifié et démonte les quatre autres est beaucoup plus difficile à contrer qu'un acheteur qui dit non à tout.</p>`,
 grid:[
  "Avoir appliqué un test unique : cette charge disparaît-elle vraiment après le deal ?",
  "Avoir déduit le coût du remplaçant du retraitement de rémunération du dirigeant.",
  "Avoir refusé de payer les synergies que l'acquéreur crée lui-même.",
  "Avoir converti l'écart d'EBITDA en écart de PRIX (× le multiple) pour mesurer l'enjeu."
 ]},

{id:"n3gap", lvl:3, type:"choice", ch:7, icon:"🛡️", title:"Face à un vendeur mieux informé que toi",
 concept:"Garantie d'actif et de passif · séquestre · asymétrie", lesson:"j4",
 when:B=>B.level>=3 && B.lbo && B.lbo.ebitdaRetenu && B.month>=38,
 signal:"Le vendeur a accepté ton prix en une heure, sans contre-proposition. Personne ne fait ça pour un bon prix.",
 gate:{ask:"La GAP est plafonnée à 5 % du prix. Sur un prix de 12 000 000 €, combien couvre-t-elle au maximum ?", unit:"€", pal:1, tol:.05, plancher:5000,
   val:B=>600000,
   how:"5 % × 12 000 000 € = 600 000 €.",
   why:"Un plafond ne se juge jamais en pourcentage : il se juge en euros, face au risque identifié. 600 000 € de couverture contre un contentieux fiscal sur trois exercices, avec une garantie qui expire au bout de douze mois quand l'administration a trois ans pour agir — le chiffre dit tout seul si le contrat te protège."},
 setup:B=>`Prix arrêté. Reste le contrat — et c'est là que se joue le reste.
   <br><br>Le vendeur propose : garantie d'actif et de passif <b>plafonnée à 5 % du prix</b>, <b>durée 12 mois</b>, <b>aucun séquestre</b>, seuil de déclenchement à 50 000 €.
   <br><br>Ce que tu sais : la société a un contentieux fiscal latent sur trois exercices, et le délai de reprise de l'administration est de <b>trois ans</b>.
   <br><br>Ce que tu ne sais pas : pourquoi il a accepté ton prix si vite.`,
 options:[
  {k:"A", label:"Tu signes : 5 % vaut mieux que rien", term:"Le deal avance, tu ne veux pas le perdre sur du juridique.", q:-2},
  {k:"B", label:"Tu exiges 20 %, 36 mois, et 10 % séquestrés", term:"Tu alignes la garantie sur le risque réel et tu la rends exécutable.", q:2},
  {k:"C", label:"Tu demandes une baisse de prix à la place", term:"Tu préfères un rabais certain à une garantie incertaine.", q:1},
  {k:"D", label:"Tu exiges 20 % et 36 mois, sans séquestre", term:"Tu obtiens le texte, tu fais confiance pour l'exécution.", q:0}
 ],
 apply:(B,k)=>{
   if(k==="A"){ B.gap={cap:.05,mois:12,escrow:0}; B.riskFiscal=true; }
   if(k==="B"){ B.gap={cap:.20,mois:36,escrow:.10}; B.lbo.prix*=1.01; }
   if(k==="C"){ B.gap={cap:.05,mois:12,escrow:0}; B.lbo.prix*=.93; }
   if(k==="D"){ B.gap={cap:.20,mois:36,escrow:0}; B.riskExec=true; }
 },
 debrief:(B,k)=>`
  <p><b>Commence par le signal, pas par le contrat.</b> Un vendeur qui accepte un prix en une heure te dit une chose : ton prix était au-dessus du sien. Dans un process de cession, la vitesse d'acceptation est une information sur la valeur — et quand elle arrive juste avant la négociation des garanties, elle annonce souvent que le vendeur sait ce qu'il vend et compte bien ne pas le garantir.</p>
  <p><b>Une garantie se cale sur la durée du risque, pas sur l'usage du marché.</b> Le délai de reprise fiscale est de trois ans ; une garantie de douze mois expire donc <b>deux ans avant</b> que le risque ne s'éteigne. Ce n'est pas une garantie plus courte : c'est une garantie qui ne couvre rien, puisqu'elle sera close quand le redressement tombera. <b>Sur les sujets fiscaux et sociaux, on aligne la durée sur la prescription, point.</b></p>
  <p><b>Et une garantie sans séquestre ne vaut que la solvabilité du vendeur au jour du sinistre.</b> Dans trois ans, le vendeur aura vendu, encaissé, peut-être réinvesti, peut-être quitté le pays. Tu détiendras un droit parfaitement rédigé contre quelqu'un qui n'a plus rien de saisissable. C'est pour ça que D, qui obtient le bon texte et renonce à l'exécution, est presque aussi faible que A : <b>en droit des affaires, un mécanisme qui ne s'auto-exécute pas est une intention, pas une protection.</b></p>
  <p><b>C mérite le respect, et on l'oublie trop souvent.</b> Échanger une garantie contre une baisse de prix, c'est convertir un risque probabiliste en certitude immédiate — 7 % de rabais encaissés aujourd'hui valent parfois mieux que 20 % de garantie théorique. <b>C'est le bon arbitrage quand le risque est diffus et difficile à documenter.</b> Ici il ne l'est pas : le contentieux est identifié, daté, chiffrable. Face à un risque nommé, on garantit ; face à un risque flou, on décote.</p>`,
 grid:[
  "Avoir lu le comportement du vendeur comme une information, pas comme une bonne nouvelle.",
  "Avoir aligné la DURÉE de la garantie sur la prescription du risque identifié.",
  "Avoir exigé un séquestre : sans exécution, la garantie ne vaut que la solvabilité future.",
  "Avoir su quand la décote de prix vaut mieux que la garantie (risque flou) — et l'inverse."
 ]},

{id:"n3retourn", lvl:3, type:"choice", ch:8, icon:"🩸", title:"Ce qu'on coupe, et dans quel ordre",
 concept:"Retournement · cash burn · séquence des décisions", lesson:"r1",
 when:B=>B.level>=3 && B.lbo && B.month>=44,
 signal:"Le reporting mensuel de la cible est arrivé avec onze jours de retard. C'est toujours le premier symptôme.",
 gate:{ask:"Combien de mois de trésorerie reste-t-il à la cible, au rythme actuel ?", unit:"", pal:5, tol:.08, plancher:.4,
   val:B=>1100000/180000,
   how:"1 100 000 € de trésorerie ÷ 180 000 € consommés par mois = 6,1 mois.",
   why:"C'est ce chiffre qui commande l'ORDRE des coupes, pas leur efficacité affichée. Une mesure qui produit son effet en quatre mois ne sert à rien si tu meurs au sixième — et les mesures les plus efficaces sur le papier sont justement les plus lentes et les plus chères à déclencher."},
 setup:B=>`La cible brûle <b>180 000 € par mois</b>. Sa trésorerie : <b>1 100 000 €</b>. Tu as donc <b>six mois</b>, pas plus.
   <br><br>Ce que tu peux faire, avec l'effet annoncé et le délai réel :
   <br>· <b>Fermer le site secondaire</b> : −90 k€/mois, mais 400 k€ de coûts de fermeture et 4 mois de préavis
   <br>· <b>Plan social de 12 postes</b> : −70 k€/mois, 350 k€ de coût, 3 mois de procédure
   <br>· <b>Arrêter la gamme déficitaire</b> : −45 k€/mois, effet immédiat, −15 % de CA
   <br>· <b>Renégocier fournisseurs et loyers</b> : −25 k€/mois, effet en 6 semaines, coût nul
   <br><br>Les quatre ensemble coûtent <b>750 000 €</b> de cash à court terme. Tu en as 1,1 M€.`,
 options:[
  {k:"A", label:"Tout, tout de suite", term:"Tu traites le problème en une fois et tu encaisses le choc.", q:0},
  {k:"B", label:"Le gratuit et l'immédiat d'abord, le lourd ensuite", term:"Négociations et gamme déficitaire maintenant ; site et plan social dans trois mois.", q:2},
  {k:"C", label:"Le site secondaire d'abord : c'est le plus gros gisement", term:"Tu attaques la ligne la plus lourde.", q:-1},
  {k:"D", label:"Rien avant d'avoir un diagnostic complet à 90 jours", term:"Tu refuses de couper à l'aveugle.", q:-2}
 ],
 apply:(B,k)=>{
   if(k==="A"){ B.turnCash=350000; B.turnBurn=-50000; B.demandMult*=.85; B.rep=Math.max(.5,B.rep-.1); }
   if(k==="B"){ B.turnCash=1100000; B.turnBurn=110000; B.demandMult*=.88; B.turnSeq=true; }
   if(k==="C"){ B.turnCash=700000; B.turnBurn=90000; B.demandMult*=.95; }
   if(k==="D"){ B.turnCash=560000; B.turnBurn=180000; B.turnLate=true; }
 },
 debrief:(B,k)=>`
  <p><b>En retournement, la seule unité qui compte est le temps qui reste avant la panne de cash.</b> 1,1 M€ à 180 k€ par mois : six mois. Toute décision se juge à une question unique — <i>est-ce qu'elle allonge ou raccourcit ces six mois ?</i> Et le piège est que <b>les mesures les plus puissantes coûtent du cash avant d'en rapporter</b> : la fermeture de site rapporte 90 k€ par mois… dans quatre mois, après avoir consommé 400 k€ tout de suite. Elle raccourcit ton horizon avant de l'allonger.</p>
  <p><b>D'où la seule séquence qui tienne : gratuit et immédiat d'abord, coûteux et lent ensuite.</b> Renégocier les loyers et les fournisseurs ne coûte rien et produit dans six semaines ; arrêter la gamme déficitaire produit tout de suite. Ces deux mesures seules font passer le burn de 180 à 110 k€ par mois — ton horizon passe de six à dix mois. <b>Tu viens d'acheter quatre mois avec de l'argent que tu n'as pas dépensé</b>, et c'est ce délai qui rend les mesures lourdes finançables.</p>
  <p><b>A est l'erreur de l'acheteur courageux.</b> Sortir 750 000 € sur 1,1 M€ de trésorerie pour traiter le problème d'un coup, c'est se retrouver avec 350 000 € en caisse au milieu d'un plan social, sans aucune marge pour le premier imprévu — et en retournement, l'imprévu est la seule chose garantie. On a raison sur le fond et on meurt sur le calendrier. <b>C fait la même erreur en plus concentré</b> : la plus grosse ligne est aussi la plus lente et la plus chère à déclencher.</p>
  <p><b>Et D est le pire des quatre, parce qu'il a l'air raisonnable.</b> Quatre-vingt-dix jours de diagnostic à 180 k€ par mois coûtent 540 000 € — la moitié de la trésorerie — pour produire un document. Tu arrives au bout avec un excellent rapport et plus de moyens d'agir. <b>Le diagnostic se fait en coupant</b> : les mesures sans regret se prennent tout de suite, et on affine pendant qu'elles produisent. Attendre d'être sûr est un luxe que seules les entreprises solvables peuvent s'offrir.</p>`,
 grid:[
  "Avoir calculé le nombre de mois de survie AVANT de classer les mesures.",
  "Avoir vu que les mesures lourdes consomment du cash avant d'en produire.",
  "Avoir séquencé : coût nul et effet rapide d'abord, pour financer le reste.",
  "Avoir refusé d'acheter de l'information avec du temps qu'on n'a pas."
 ]},

{id:"n3sortie", lvl:3, type:"choice", ch:9, icon:"🚪", title:"TRI ou multiple : quand sortir",
 concept:"TRI vs multiple de sortie · fenêtre de marché · acheteurs", lesson:"l3",
 when:B=>B.level>=3 && B.lbo && B.month>=52,
 signal:"Deux LBO comparables se sont signés ce trimestre à des multiples en hausse. Les fenêtres ne restent jamais ouvertes longtemps.",
 gate:{ask:"À 7,5× l'EBITDA, combien te revient-il après remboursement de la dette ?", unit:"€", pal:9, tol:.05, plancher:20000,
   val:B=>2900000*7.5-3800000,
   how:"Valeur d'entreprise 2 900 000 × 7,5 = 21 750 000 €, moins la dette nette de 3 800 000 € = 17 950 000 €.",
   why:"Le multiple s'applique à l'EBITDA et donne une valeur d'ENTREPRISE ; ce qui te revient, c'est ce qui reste après les prêteurs. Comparer deux offres sur leur seul multiple, c'est comparer deux chiffres qui ne parlent pas de la même chose — et l'écart de dette entre deux dates en dit souvent plus que l'écart de multiple."},
 setup:B=>`Trois ans après l'entrée. Equity investie : <b>4 000 000 €</b>. EBITDA passé de 2,0 à <b>2,9 M€</b>, dette réduite de 6,0 à <b>3,8 M€</b>.
   <br><br>Trois portes :
   <br>· <b>Un industriel</b> paie <b>7,5× l'EBITDA</b> maintenant. Il y a des synergies, il paie pour elles.
   <br>· <b>Un LBO secondaire</b> paie <b>6,5×</b> maintenant, sans condition.
   <br>· <b>Tu attends deux ans</b> : le plan prévoit 3,6 M€ d'EBITDA et 2,0 M€ de dette. Multiple supposé : 6,5×.
   <br><br>Calcule les trois : valeur d'entreprise, moins la dette, puis le multiple sur ton equity — et seulement après, le TRI.`,
 options:[
  {k:"A", label:"L'industriel maintenant, à 7,5×", term:"21,75 M€ de VE, moins 3,8 M€ de dette.", q:2},
  {k:"B", label:"Le LBO secondaire maintenant, à 6,5×", term:"18,85 M€ de VE, moins 3,8 M€ de dette.", q:1},
  {k:"C", label:"Tu attends deux ans", term:"23,4 M€ de VE prévus, moins 2,0 M€ de dette.", q:0},
  {k:"D", label:"Tu vends 60 % à l'industriel et gardes 40 %", term:"Tu sécurises la majeure partie et tu gardes du potentiel.", q:2}
 ],
 apply:(B,k)=>{
   const v={A:{eq:17950000,an:3},B:{eq:15050000,an:3},C:{eq:21400000,an:5},D:{eq:10770000,an:3}}[k];
   B.exit={equity:v.eq, annees:v.an, mult:(v.eq/4000000).toFixed(2)};
   if(k==="D") B.rollover=.4;
 },
 debrief:(B,k)=>`
  <p><b>Fais les trois calculs avant toute intuition.</b> Industriel : 21,75 − 3,8 = <b>17,95 M€</b> pour 4 M€ investis, soit <b>4,5×</b> en trois ans — un TRI d'environ <b>65 %</b>. Secondaire : 15,05 M€, soit 3,8× et environ 56 %. Attendre : 23,4 − 2,0 = 21,4 M€, soit <b>5,35×</b>… mais en <b>cinq ans</b>, ce qui donne un TRI d'environ <b>40 %</b>. <b>Le scénario qui rapporte le plus d'argent est celui qui rapporte le moins par an.</b> C'est toute la tension du métier, résumée en trois lignes.</p>
  <p><b>Multiple et TRI ne répondent pas à la même question, et un fonds est jugé sur les deux.</b> Le multiple dit combien tu as gagné ; le TRI dit à quelle vitesse. Un investisseur qui récupère son argent en trois ans peut le réinvestir — c'est pour ça qu'un TRI élevé sur une durée courte vaut souvent mieux qu'un multiple supérieur obtenu deux ans plus tard. <b>Et le TRI supplémentaire des deux années d'attente doit être comparé à ce que tu ferais d'autre de cet argent</b>, pas à zéro.</p>
  <p><b>Surtout, le scénario C n'est pas un chiffre : c'est une prévision.</b> 3,6 M€ d'EBITDA dans deux ans, à un multiple de 6,5 <i>supposé</i> — deux hypothèses, dont la seconde ne dépend pas de toi du tout. Les multiples de sortie suivent le cycle du crédit : ils se compriment quand les taux montent et quand la dette d'acquisition se raréfie. <b>Attendre, c'est prendre un risque de marché non rémunéré en plus du risque d'exécution.</b> Et le signal du setup — deux comparables signés en hausse ce trimestre — dit précisément que la fenêtre est ouverte <i>maintenant</i>.</p>
  <p><b>D est le coup de maître, et c'est le moins spectaculaire.</b> Vendre 60 % à l'industriel sécurise 10,77 M€ — soit déjà 2,7× ton equity, ton capital est rentré et ta performance est acquise — tout en gardant 40 % qui profiteront de la croissance et des synergies de l'acheteur. <b>Le rollover, c'est refuser le faux choix entre encaisser et croire.</b> Tu ne paries plus ton résultat sur une prévision à deux ans : tu paries un surplus que tu peux te permettre de perdre.</p>`,
 grid:[
  "Avoir calculé VE − dette nette pour chaque porte avant de comparer quoi que ce soit.",
  "Avoir distingué le multiple (combien) du TRI (à quelle vitesse) et su pourquoi les deux comptent.",
  "Avoir traité le scénario d'attente comme une PRÉVISION à deux hypothèses, pas comme un chiffre.",
  "Avoir envisagé de ne pas trancher : rollover partiel, sécuriser le capital et garder l'upside."
 ]}

];
