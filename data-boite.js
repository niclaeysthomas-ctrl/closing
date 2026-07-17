// LE CLOSING — LA BOÎTE : simulateur d'entreprise
// Modèle de demande LINÉAIRE : Q = a - b·P.
// Conséquence pédagogique : l'élasticité e = -b·P/Q varie le long de la courbe.
// L'élasticité n'est pas une propriété du produit, c'est une propriété du POINT DE PRIX.
// Prix qui maximise la marge (monopole, coût marginal constant) : P* = (Pchoke + CM)/2.

const SECTORS = [
{id:"cafe", emoji:"☕", name:"Torréfaction de spécialité", unit:"sachet 250 g",
 blurb:"Tu achètes du café vert, tu torréfies, tu vends en direct et sur les marchés. Marge correcte, clientèle fidèle.",
 // Marge brute 40 %, marge nette ~6 % : les vrais chiffres d'un artisan torréfacteur.
 p0:12, choke:26, mc:7.2, fc:3500,
 // b = Q0/(choke-p0) = 900/14 ; a = b·choke
 a:1671.4, b:64.286,
 season:[.95,.92,.95,1,.98,.9,.82,.78,1,1.1,1.15,1.25],
 lesson:"Ton élasticité au prix de départ est d'environ −0,86 : tu es en zone INÉLASTIQUE. Traduction : +10 % de prix ne te coûte que 8,6 % de volume, donc ton chiffre d'affaires MONTE. Tu démarres sous-tarifé — comme 90 % des artisans."},

{id:"biere", emoji:"🍺", name:"Micro-brasserie", unit:"bouteille 33 cl",
 blurb:"Du volume, des bars, des festivals. Ça mousse vite, mais la bière artisanale est un marché encombré.",
 p0:3.2, choke:5.5, mc:1.76, fc:7300,
 // b = 6000/2.3 ; a = b·choke
 a:14347.8, b:2608.7,
 season:[.75,.75,.85,.95,1.15,1.35,1.45,1.4,1.1,.9,.8,.95],
 lesson:"Ton élasticité au prix de départ est d'environ −1,39 : tu es en zone ÉLASTIQUE. Tes clients ont trente substituts au même rayon. Tu n'as quasi aucun pouvoir de prix — ton prix de départ est déjà presque optimal. Ta guerre se gagnera sur les coûts et le volume, jamais sur le prix."},

{id:"maroq", emoji:"👜", name:"Atelier de maroquinerie", unit:"pièce",
 blurb:"Du cuir pleine fleur, cousu main, quelques dizaines de pièces par mois. Peu de volume, beaucoup de valeur.",
 p0:180, choke:420, mc:90, fc:7200,
 // b = 95/240 ; a = b·choke
 a:166.25, b:0.3958,
 season:[.8,.85,.9,.95,1.05,1,.85,.8,1,1.05,1.2,1.6],
 lesson:"Ton élasticité au prix de départ est d'environ −0,75 : très INÉLASTIQUE. Le savoir-faire ne se compare pas au rayon d'à côté. Tu as un vrai pouvoir de prix et tu ne t'en sers pas — c'est la maladie classique de l'artisan qui facture ses heures au lieu de facturer sa valeur."}
];

// ---------- LES CAS ----------
// when(B) : conditions sur l'état RÉEL de la boîte. Aucun cas ne tombe au hasard.
// signal(B) : ce que les chiffres montraient AVANT. Un cas sans signal serait injuste.
// options : les TERMES seulement. Jamais la conséquence chiffrée — c'est à lui de l'estimer.
// apply(B) : la facture. Elle tombe sur le bilan, et elle reste.

const BIZCASES = [

{id:"bc1", ch:2, icon:"🤝", title:"Le premier gros client",
 concept:"BFR · escompte de règlement", lesson:"b4",
 when:B=>B.month>=5 && !B.b2b,
 signal:"Un acheteur d'une chaîne régionale est passé deux fois sur ton stand ce mois-ci.",
 setup:B=>`Une chaîne régionale de six épiceries fines veut te référencer. Le volume : <b>+50 % de tes ventes</b>, d'un coup, sans effort commercial.
   <br><br>Une seule condition, non négociée pour l'instant : <b>paiement à 60 jours</b>, comme tous leurs fournisseurs.
   <br><br>Tu as <b>${eur(B.cash)}</b> en banque et tu tournes à <b>${eur(B.hist.length?B.hist[B.hist.length-1].ca:0)}</b> de CA mensuel.`,
 options:[
  {k:"A", label:"Tu signes tel quel", term:"60 jours de délai. Tu prends le volume et tu verras bien."},
  {k:"B", label:"Tu refuses", term:"Tu restes en direct, tu gardes ton cash et tes marges."},
  {k:"C", label:"Tu contres : 30 jours contre 2 % d'escompte", term:"Tu leur offres 2 % de remise s'ils paient à 30 jours au lieu de 60."},
  {k:"D", label:"Tu signes, mais 30 % d'acompte à la commande", term:"Ils paient 30 % tout de suite, le solde à 60 jours."}
 ],
 apply:(B,k)=>{
   if(k==="A"){ B.b2b=true; B.b2bShare=.45; B.dso=60; B.demandMult=1.5; B.growth=1.08; }
   if(k==="B"){ B.refusedB2B=true; }
   if(k==="C"){ B.b2b=true; B.b2bShare=.45; B.dso=30; B.escompteClient=.02; B.demandMult=1.3; B.growth=1.08; }
   if(k==="D"){ B.b2b=true; B.b2bShare=.45; B.dso=42; B.acompte=.3; B.demandMult=1.4; B.growth=1.08; }
 },
 debrief:(B,k)=>`
  <p><b>Le calcul que tu devais poser avant de signer.</b> Ton BFR va grossir de tout le CA que tu factures et que tu n'as pas encore encaissé. En jours : 60 jours de délai sur 45 % de ton CA, c'est environ <b>27 jours de CA immobilisés en permanence</b>. À ton niveau d'activité après croissance, c'est de l'ordre de <b>${eur(B.est60)}</b> de cash qui sort de ta trésorerie et n'y revient jamais tant que tu tournes.</p>
  <p>Ce n'est pas une perte : c'est un <b>investissement forcé</b>, financé par toi, à taux zéro, au profit de ton client. Personne ne te l'a présenté comme ça — et c'est exactement pourquoi des entreprises rentables déposent le bilan.</p>
  <p><b>Le piège de l'option C, et c'est le vrai enseignement du cas.</b> Un escompte de 2 % pour être payé 30 jours plus tôt, ça a l'air anodin. Annualise-le : <b>(2 / 98) × (365 / 30) = 24,8 % par an.</b> Tu viens d'emprunter à 24,8 % à ton propre client. Ton découvert bancaire est à 12 %. <b>Accepter cet escompte coûte deux fois plus cher que le découvert que tu cherchais à éviter.</b> Un escompte n'est jamais un geste commercial : c'est un emprunt déguisé, et il se compare à un taux.</p>
  <p><b>D est la réponse de professionnel.</b> L'acompte ne coûte rien à ta marge et il attaque le BFR à la racine — il inverse le décalage au lieu de le financer. Tu paies ça 10 % de volume en moins, ce qui est le prix le moins cher des quatre options. Le réflexe à garder : <b>on négocie les conditions de paiement AVANT le prix</b>, parce que le prix se voit et les conditions de paiement ne se voient pas.</p>
  <p><b>Et B n'est pas idiot.</b> Refuser une croissance qu'on ne sait pas financer est une décision d'adulte. Elle a un coût — tu le verras arriver.</p>`,
 grid:[
  "Avoir CHIFFRÉ le cash nécessaire avant de signer : combien de BFR ce contrat crée, et est-ce que je l'ai.",
  "Avoir vu que l'escompte de 2 % à 30 jours est un emprunt à 24,8 % annualisés — donc plus cher que le découvert.",
  "Avoir pensé à l'acompte : la seule option qui réduit le BFR au lieu de le financer.",
  "Avoir posé la question du risque de concentration : ce client va peser 45 % de ton CA."
 ]},

{id:"bc2", ch:2, icon:"💀", title:"Le mois record",
 concept:"Croissance mortelle · coût annualisé du financement", lesson:"b3",
 // Se déclenche sur le phénomène lui-même, pas sur un seuil arbitraire :
 // rentable ET trésorerie qui baisse. C'est la définition de la croissance mortelle.
 when:B=>{ const h=B.hist[B.hist.length-1]; return B.b2b && h && h.rn>0 && h.dcash<0; },
 signal:"Ton chiffre d'affaires monte depuis deux mois. Ta trésorerie descend depuis deux mois. Les deux courbes se croisent.",
 setup:B=>`Mois record. Ton chiffre d'affaires n'a jamais été aussi haut, ton résultat net est <b>positif</b>, ton comptable te félicite.
   <br><br>Tu as <b>${eur(B.cash)}</b> en banque. Les salaires et le café vert du mois prochain, c'est <b>${eur(B.fc + B.lastPurch)}</b>.
   <br><br>Tu es rentable. Et dans cinq semaines, tu ne peux plus payer.`,
 options:[
  {k:"A", label:"Découvert autorisé", term:"Ta banque t'ouvre un découvert à 12 % annuels."},
  {k:"B", label:"Affacturage", term:"Un factor t'avance tes créances immédiatement contre 2,5 % du montant cédé (délai moyen 45 jours)."},
  {k:"C", label:"Tu divises ton stock par deux", term:"Tu libères du cash tout de suite. Tu acceptes le risque de rupture."},
  {k:"D", label:"Tu refuses des commandes", term:"Tu freines volontairement la croissance pour que le BFR arrête de gonfler."}
 ],
 apply:(B,k)=>{
   if(k==="A"){ B.overdraftOk=true; }
   if(k==="B"){ B.factor=true; B.dso=Math.min(B.dso,10); }
   if(k==="C"){ B.stockTarget=Math.max(.4,B.stockTarget/2); }
   if(k==="D"){ B.demandMult*=.7; B.braked=true; }
 },
 debrief:(B,k)=>`
  <p><b>Le nom de ce que tu viens de vivre : la croissance mortelle</b> (<i>overtrading</i>). Elle tue plus d'entreprises que les pertes. Ton compte de résultat dit « bravo », ton compte en banque dit « adieu », et les deux ont raison — ils ne mesurent pas la même chose. Le résultat est une opinion comptable ; le cash est un fait bancaire.</p>
  <p>Le pont, tu l'as sous les yeux à chaque tour : <b>variation de trésorerie = résultat net − ΔBFR</b>. Tant que tu grandis, le ΔBFR est positif et il mange ton résultat. Une entreprise qui croît de 50 % consomme du cash <i>par construction</i>, même à marge parfaite. C'est de l'arithmétique, pas de la mauvaise gestion.</p>
  <p><b>Compare les coûts, annualisés, sinon tu ne compares rien :</b></p>
  <ul>
    <li><b>Découvert : 12 % par an.</b> Le moins cher, plafonné, révocable du jour au lendemain — c'est là sa vraie limite.</li>
    <li><b>Affacturage : 2,5 % pour 45 jours = (2,5/97,5) × (365/45) = <b>20,8 % par an.</b></b> Presque deux fois le découvert. En échange : c'est adossé à tes créances, donc ça grandit avec toi et la banque ne peut pas te le couper.</li>
    <li><b>Réduire le stock : gratuit en apparence</b>, payé en ruptures et en réputation. Le stock n'est pas un coût, c'est une assurance — tu viens de résilier la moitié de ton assurance.</li>
    <li><b>Freiner : le seul coût est un coût d'opportunité</b>, invisible et donc systématiquement sous-estimé. Ton concurrent, lui, ne freine pas.</li>
  </ul>
  <p><b>Le réflexe de DAF :</b> aucune de ces quatre options n'était la bonne. La bonne se jouait il y a trois mois, quand tu as signé à 60 jours sans plan de trésorerie. <b>Le cash se gère à contre-cycle — quand tout va bien.</b> Quand il devient urgent, tu ne choisis plus : tu prends ce qu'on te donne, au prix qu'on te dit.</p>`,
 grid:[
  "Avoir annualisé les deux coûts pour les comparer — et pas juste comparé « 12 % » à « 2,5 % ».",
  "Avoir nommé le phénomène : croissance mortelle / overtrading, résultat positif et cash négatif.",
  "Avoir compris que le découvert est révocable, donc moins solide qu'il n'est bon marché.",
  "Avoir vu que la vraie décision était en amont, au moment de signer le contrat à 60 jours."
 ]},

{id:"bc3", ch:3, icon:"📦", title:"La rupture",
 concept:"Le stock est du cash immobilisé", lesson:"b4",
 when:B=>B.rupturesTot>0 && B.month>=4,
 signal:"Ton stock de fin de mois baissait depuis trois tours. C'était écrit dans ton bilan.",
 setup:B=>`Rupture. Tu as perdu <b>${Math.round(B.lastRupture)} ${B.unitLabel}s</b> de ventes le mois dernier — des clients qui voulaient payer et qui sont repartis les mains vides.
   <br><br>Deux d'entre eux ne reviendront pas.
   <br><br>Ton stock actuel couvre <b>${B.stockTarget.toFixed(1)} mois</b> de ventes.`,
 options:[
  {k:"A", label:"Flux tendu — aucun stock de sécurité", term:"Tu ne produis que ta prévision. Zéro cash immobilisé, zéro filet."},
  {k:"B", label:"Une semaine de sécurité", term:"Un filet mince."},
  {k:"C", label:"Deux semaines de sécurité", term:"L'équilibre classique."},
  {k:"D", label:"Un mois de sécurité", term:"Tu ne rates plus une vente. Tu immobilises un mois de ventes en cash."}
 ],
 apply:(B,k)=>{ B.stockTarget={A:0,B:.25,C:.5,D:1}[k]; },
 debrief:(B,k)=>`
  <p><b>Le stock n'est pas une ligne de charge, c'est du cash que tu as transformé en objets.</b> Regarde ton bilan : il est à l'ACTIF, du même côté que ta trésorerie. Tu n'as rien dépensé — tu as changé ton argent de forme, et cette forme-là ne paie pas les salaires.</p>
  <p>Chaque mois de stock supplémentaire t'immobilise environ <b>${eur(B.mcost*B.lastSold)}</b> de façon <b>permanente</b> : ce n'est pas une dépense ponctuelle, c'est du cash qui ne revient qu'au jour où tu fermes boutique.</p>
  <p><b>L'arbitrage, honnêtement, n'a pas de réponse unique</b> — il dépend de deux chiffres que tu dois connaître : le <b>coût d'une rupture</b> (la marge perdue, plus le client qui ne revient pas — le vrai coût est celui-là, et il est invisible en comptabilité) et le <b>coût de portage</b> du stock (le cash immobilisé, plus le risque d'invendu). Le flux tendu n'est pas une vertu : c'est un pari sur la régularité de ta demande. Toyota peut le faire, parce que Toyota connaît sa demande à 2 % près. Toi, ta saisonnalité varie de ±40 % dans l'année.</p>
  <p><b>Le réflexe :</b> on ne fixe pas un stock « au feeling ». On le fixe sur un <b>taux de service visé</b>, et on accepte explicitement le pourcentage de ventes qu'on est prêt à rater. Ce que tu viens de faire en choisissant, sauf que maintenant tu sais que tu l'as fait.</p>`,
 grid:[
  "Avoir vu que le stock est à l'ACTIF, du même côté que le cash — pas une charge.",
  "Avoir chiffré le coût d'une rupture, client perdu compris, et pas seulement la marge du mois.",
  "Avoir relié le niveau de stock à la volatilité de TA demande (ta saisonnalité), pas à une règle générale.",
  "Avoir compris que « flux tendu » est un pari sur la prévisibilité, pas une bonne pratique universelle."
 ]},

{id:"bc4", ch:3, icon:"🎁", title:"L'escompte du fournisseur",
 concept:"Taux implicite d'un escompte", lesson:"b4",
 when:B=>B.month>=8,
 signal:"Ton fournisseur de matière a relancé deux fois ce trimestre : lui aussi a un problème de trésorerie.",
 setup:B=>`Ton fournisseur t'appelle. Il te propose <b>8 % de remise</b> sur toutes tes commandes si tu passes au <b>paiement comptant</b> au lieu de tes <b>45 jours</b> habituels.
   <br><br>Tu achètes pour environ <b>${eur(B.lastPurch)}</b> par mois. Tu as <b>${eur(B.cash)}</b> en banque.`,
 options:[
  {k:"A", label:"Tu acceptes", term:"−8 % sur tes achats, mais tu paies tout de suite."},
  {k:"B", label:"Tu refuses", term:"Tu gardes tes 45 jours de crédit fournisseur gratuit."},
  {k:"C", label:"Tu acceptes et tu finances avec ton découvert", term:"Tu prends la remise même si tu dois tirer sur ton découvert à 12 %."},
  {k:"D", label:"Tu contres : 4 % à 15 jours", term:"Un compromis : tu gardes un peu de délai, tu prends la moitié de la remise."}
 ],
 apply:(B,k)=>{
   if(k==="A"||k==="C"){ B.mc*=.92; B.dpo=0; if(k==="C") B.overdraftOk=true; }
   if(k==="D"){ B.mc*=.96; B.dpo=15; }
 },
 debrief:(B,k)=>`
  <p><b>Annualise, toujours.</b> 8 % de remise pour payer 45 jours plus tôt :</p>
  <p style="text-align:center;font-size:16px"><b>(8 / 92) × (365 / 45) = <span style="color:var(--ok)">70,5 % par an</span></b></p>
  <p>Ton fournisseur vient de t'offrir un <b>placement à 70 % annualisés, sans risque.</b> Il ne le sait probablement pas lui-même : il a juste besoin de cash et il paie très cher pour l'avoir. Tu n'as rien, absolument rien d'autre dans ton bilan qui rapporte 70 %.</p>
  <p><b>Et maintenant la partie que ton manuel ne te dira pas.</b> Ce calcul à 70 % est le calcul standard, on te le fera faire en entretien, et il est <b>incomplet</b>. Il suppose que renoncer à 45 jours de crédit fournisseur est un investissement <i>ponctuel</i> : tu avances 1,5 mois d'achats une fois, tu récoltes 8 % par mois pour toujours. Délai de retour : 1,5 / 0,08 ≈ <b>19 mois</b>. Déjà, note la nuance que 90 % des candidats ratent : <b>un taux de rendement n'est pas un délai de retour</b>, et 70 % par an peut très bien mettre dix-neuf mois à rembourser sa mise.</p>
  <p><b>Sauf que ta boîte grandit.</b> Et le crédit fournisseur auquel tu renonces n'est pas un montant figé : il vaut 1,5 mois d'<i>achats</i>, or tes achats gonflent avec ton activité. Chaque mois de croissance creuse un peu plus le trou que tu as accepté de creuser. Pose l'inéquation :</p>
  <p style="text-align:center;font-size:15px">tu gagnes <b>4,8 % du CA</b> par mois · tu perds <b>0,9 × CA × croissance</b> par mois</p>
  <p>Le point d'équilibre tombe à une croissance d'environ <b>5,3 % par mois</b>. En dessous, prends la remise les yeux fermés. Au-dessus — et tu es à <b>8 %</b> — <b>le délai de retour recule plus vite que tu ne l'atteins : il n'arrive jamais.</b> Refuser devient la bonne réponse, non pas parce que le taux est mauvais, mais parce que <b>ta croissance est un investissement concurrent qui rapporte davantage.</b></p>
  <p><b>La vraie leçon, et elle vaut pour toute ta carrière :</b> un taux de rendement ne se juge jamais dans l'absolu. Il se juge contre <b>ton coût du capital</b> et contre <b>ce que tu ferais du même euro ailleurs</b>. Un placement à 70 % est un mauvais placement si ta croissance en rapporte 90. C'est exactement le raisonnement d'un DAF qui arbitre entre rembourser sa dette, investir, ou racheter ses actions — et c'est la question à laquelle « 70 %, donc oui » ne répond pas.</p>
  <p><b>Le miroir du cas de ton client B2B, et c'est le cœur de l'affaire.</b> Le même objet — un escompte de règlement — était à <b>fuir</b> quand tu le donnais (24,8 % annualisés, tu empruntais à ton client) et à <b>prendre</b> quand on te le donne (70,5 % annualisés, tu prêtes à ton fournisseur). Un escompte n'est ni bon ni mauvais : <b>c'est un taux d'intérêt déguisé en remise commerciale.</b> Le seul geste qui compte, c'est de l'annualiser avant de répondre.</p>
  <p>La règle que tu retiendras pour un entretien : <b>escompte reçu → annualise et compare à ton coût de financement. Escompte accordé → annualise et compare à ton coût de financement.</b> Même formule, deux directions.</p>`,
 grid:[
  "Avoir annualisé la remise : (8/92) × (365/45) ≈ 70 %. Sans ce calcul, il n'y a pas de décision, juste une intuition.",
  "Avoir distingué le TAUX (70 %/an) du DÉLAI DE RETOUR (≈ 19 mois). Ce sont deux chiffres, et ils ne disent pas la même chose.",
  "Avoir vu que ta CROISSANCE change la réponse : le crédit fournisseur auquel tu renonces grossit avec tes achats.",
  "Avoir comparé les 70 % à ce que le même euro rapporterait ailleurs — un rendement ne se juge jamais dans l'absolu.",
  "Avoir fait le lien avec l'escompte que TU accordais à ton client B2B : même formule, sens inverse."
 ]},

{id:"bc5", ch:3, icon:"📉", title:"Le concurrent casse les prix",
 concept:"Élasticité-prix · comparaison de runways", lesson:"a1",
 when:B=>B.month>=12,
 signal:"Un concurrent a levé des fonds le trimestre dernier. La presse locale en a parlé.",
 setup:B=>`Un concurrent qui vient de lever des fonds baisse ses prix de <b>20 %</b>. Ton volume tombe de <b>25 %</b> en un mois.
   <br><br>Ton commercial te dit qu'on va « tous les perdre ».
   <br><br>Ton prix : <b>${eur(B.price)}</b> · ta marge brute : <b>${Math.round((1-B.mc/B.price)*100)} %</b> · ta trésorerie : <b>${eur(B.cash)}</b> · ton élasticité au point où tu es : <b>${B.elast.toFixed(2)}</b>.`,
 options:[
  {k:"A", label:"Tu alignes tes prix (−20 %)", term:"Tu récupères ton volume."},
  {k:"B", label:"Tu tiens ton prix", term:"Tu assumes de perdre du volume."},
  {k:"C", label:"Tu segmentes", term:"Tu tiens ton prix et tu sors une offre d'entrée dégradée."},
  {k:"D", label:"Tu baisses de 10 % et tu allonges les délais de paiement", term:"Un compromis pour retenir les clients qui partent."}
 ],
 apply:(B,k)=>{
   if(k==="A"){ B.price*=.8; B.compFactor=1; B.priceAnchored=true; }
   if(k==="B"){ B.compFactor=.78; B.dso=Math.max(20,B.dso-8); }
   if(k==="C"){ B.compFactor=.92; B.stockTarget+=.5; B.mc*=1.06; }
   if(k==="D"){ B.price*=.9; B.compFactor=.9; B.dso+=20; }
 },
 debrief:(B,k)=>`
  <p><b>Fais parler ton élasticité, c'est exactement à ça qu'elle sert.</b> Au point de prix où tu es, elle vaut <b>${B.elast.toFixed(2)}</b>. Baisser ton prix de 20 % te rendrait donc environ <b>${Math.abs(B.elast*20).toFixed(0)} %</b> de volume. ${Math.abs(B.elast)<1
    ? `Et c'est le verdict : <b>tu perds 20 % de prix pour ne récupérer que ${Math.abs(B.elast*20).toFixed(0)} % de volume.</b> Ton chiffre d'affaires baisse, et ta marge unitaire s'effondre en même temps. <b>T'aligner est mathématiquement perdant sur ton produit</b> — pas discutable, calculable.`
    : `Ton produit est élastique, donc l'alignement récupère bien du volume — mais regarde la marge : à −20 % de prix, ta marge unitaire passe de ${eur(B.price-B.mc)} à ${eur(B.price*.8-B.mc)}. Il te faudrait <b>${(((B.price-B.mc)/(B.price*.8-B.mc))-1)*100>0?(((B.price-B.mc)/(B.price*.8-B.mc)-1)*100).toFixed(0):"∞"} %</b> de volume en plus juste pour revenir à ta marge d'avant. Ton élasticité ne te les donne pas.`}</p>
  <p><b>D est le piège, et c'est celui qui ressemble le plus à un compromis raisonnable.</b> Tu perds sur la marge ET sur le BFR. C'est la façon classique de mourir en croyant s'adapter : deux concessions à moitié valent bien pire qu'une décision entière.</p>
  <p><b>B cache une bonne nouvelle que seul ton bilan pouvait te dire.</b> Les clients que tu perds sont les plus sensibles au prix — et ce sont <i>aussi tes plus mauvais payeurs</i>. Ton DSO s'améliore. Ton CA baisse de 25 %, mais ton cash souffre nettement moins que prévu. Tenir son prix, c'est trier ses clients.</p>
  <p><b>Et la vraie question n'était aucune des quatre.</b> Ce concurrent brûle le cash d'un fonds pour acheter des parts de marché. La question n'est pas « est-ce que je m'aligne », c'est <b>« combien de temps peut-il tenir, et combien de temps puis-je tenir ? »</b> — une comparaison de runways. Une guerre des prix se gagne par celui qui survit, pas par celui qui baisse le premier. Si tu n'as pas posé cette question dans ton argumentaire, tu as répondu en commercial, pas en financier.</p>`,
 grid:[
  "Avoir utilisé ton élasticité pour CHIFFRER ce que l'alignement rapporterait en volume — au lieu d'en débattre.",
  "Avoir calculé le volume supplémentaire nécessaire pour compenser la perte de marge unitaire.",
  "Avoir vu que D cumule les deux dégâts (marge + BFR) sous couvert de compromis.",
  "Avoir posé la question du runway du concurrent : qui tient le plus longtemps ? C'est ça, la vraie question."
 ]}
];
