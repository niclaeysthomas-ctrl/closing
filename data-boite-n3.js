// LE CLOSING — LA BOÎTE : deck du NIVEAU 3 « Le dealmaker ».
// Ajouté le 2026-09-20. Comme le niveau 2, il était défini et vide.
//
// Le saut de 2 à 3 : on ne décide plus pour son entreprise, on décide pour
// des investisseurs, face à des contreparties qui ont leur propre intérêt
// et leur propre information. D'où des setups où une partie des chiffres
// est fournie PAR L'ADVERSAIRE — et où la vraie question est de savoir
// lesquels croire.

const BIZCASES_N3 = [

{id:"n3lbo", lvl:3, type:"choice", ch:6, icon:"🏗️", title:"Combien de dette ce dossier supporte",
 concept:"Structure LBO · capacité de remboursement · levier", lesson:"l1",
 when:B=>B.level>=3 && B.month>=30 && B.hist.length>=12,
 signal:"Le banquier d'affaires te presse : « trois autres fonds sont sur le dossier ». C'est vrai une fois sur quatre.",
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
   B.lbo={debt:st.d,mezz:st.mz,equity:st.e,ebitda:2000000};
   B.debt+=st.d+st.mz; B.leverage=(st.d+st.mz)/2000000;
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
