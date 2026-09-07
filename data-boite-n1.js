// LE CLOSING — LA BOÎTE : les trois niveaux, et le deck complet du NIVEAU 1.
// Principe inchangé : aucune conséquence chiffrée n'est donnée d'avance.
// Nouveau : chaque option porte un q (qualité objective de la décision, −2 à +2)
// qui alimente la NOTE GLOBALE de fin de partie. Le q n'est jamais affiché avant.

const NIVEAUX = [
{
  n:1, id:"artisan", emoji:"🔨", nom:"L'artisan",
  duree:36,
  pitch:"Tu tiens une boîte à toi. Une seule question : est-ce que tu passes les trois ans ?",
  aide:"maximale",
  resume:"Le bilan et le compte de résultat te sont donnés chaque mois, ligne par ligne, avec l'explication de chacune. Ton travail : lire, décider, justifier en deux phrases.",
  notions:[
    "Le résultat n'est pas la trésorerie — l'identité ΔCash = RN − ΔBFR",
    "Marge brute, marge nette, et pourquoi la première ment",
    "Le point mort : combien tu dois vendre juste pour exister",
    "Le BFR : stock + créances clients − dettes fournisseurs",
    "DSO et DPO : qui finance qui, et à quel prix",
    "L'élasticité-prix : pourquoi baisser ses prix est presque toujours perdant",
    "L'escompte de règlement, et son coût annualisé (le piège des 2 %)",
    "Le prêt bancaire : mensualité, garantie, et son effet sur le cash vs sur le résultat",
    "Le découvert : le financement le plus cher que tu prendras jamais",
    "Investir ou sous-traiter : CAPEX, amortissement, levier opérationnel",
    "Le coût complet d'un salarié — et le volume qu'il doit générer pour se payer",
    "Racheter un concurrent : le multiple d'EBITDA et ce que tu achètes vraiment",
    "Négocier : les leviers qui marchent, et ceux qui se retournent contre toi",
    "La saisonnalité : financer un pic sans mourir en février",
    "L'impayé : provision, relance, et le jour où une créance devient une perte"
  ]
},
{
  n:2, id:"patron", emoji:"📈", nom:"Le patron",
  duree:48,
  pitch:"Plus d'aide au tableau. Tu produis tes propres chiffres et tu finances ta croissance.",
  aide:"partielle",
  resume:"Le bilan ne t'est plus servi commenté : tu reçois les opérations, tu construis les états, l'app corrige. Les événements arrivent sans signal préalable.",
  notions:[
    "Construire soi-même le compte de résultat et le bilan à partir des opérations",
    "Le tableau de flux de trésorerie (les trois flux : exploitation, investissement, financement)",
    "Dette et covenants : dette nette / EBITDA, et ce qui se passe quand tu casses le ratio",
    "Financer la croissance : autofinancement, dette, dilution — le coût de chacun",
    "Le levier opérationnel et le levier financier, et pourquoi les cumuler est mortel",
    "Amortissements, provisions, et la différence entre charge et décaissement",
    "Le BFR normatif : combien de jours de CA ton modèle immobilise structurellement",
    "Valoriser une cible : multiples de comparables, et leurs limites",
    "Structurer une acquisition : cash, dette d'acquisition, earn-out, crédit-vendeur",
    "L'intégration post-acquisition : là où meurent la moitié des deals"
  ]
},
{
  n:3, id:"dealmaker", emoji:"🎩", nom:"Le dealmaker",
  duree:60,
  pitch:"Tu ne diriges plus une boîte : tu en achètes, tu les redresses, tu les revends.",
  aide:"aucune",
  resume:"Plus aucun garde-fou. Tu montes des opérations à effet de levier, tu négocies contre des contreparties qui ont leurs propres intérêts, et tu réponds devant tes investisseurs.",
  notions:[
    "Le LBO : structure, dette senior et mezzanine, capacité de remboursement",
    "Le TRI et le multiple de sortie — et pourquoi ils ne disent pas la même chose",
    "La création de valeur : effet multiple, croissance de l'EBITDA, désendettement",
    "Due diligence : la quality of earnings et les EBITDA « ajustés » qui ne le sont pas",
    "Garantie d'actif et de passif, earn-out, clauses de sortie",
    "La dilution et la table de capitalisation, tour après tour",
    "Négocier face à un vendeur informé : asymétrie d'information et signaux",
    "Le retournement : ce qu'on coupe, dans quel ordre, et à quelle vitesse",
    "Sortir : industriel, LBO secondaire, ou marché — et ce que chacun paie",
    "Répondre à un comité d'investissement sur ses propres chiffres"
  ]
}
];

// ---------------- DECK NIVEAU 1 ----------------
// type : "choice" (A/B/C/D) · "loan" (structuré) · "nego" (leviers d'argumentation)
const BIZCASES_N1 = [

{id:"n1pret", lvl:1, type:"loan", ch:3, icon:"🏦", title:"La banque te propose un prêt",
 concept:"Prêt bancaire · mensualité · cash vs résultat", lesson:"b2",
 when:B=>B.month>=7 && !B.loans.length,
 signal:"Ton conseiller t'a appelé deux fois ce mois-ci. Une banque ne t'appelle jamais par amitié.",
 setup:B=>`Ta banque te propose de financer ton développement. Tu peux prendre le montant que tu veux, sur la durée que tu veux — dans les limites qu'elle t'accorde.
   <br><br>Ta trésorerie aujourd'hui : <b>${eur(B.cash)}</b>. Tes charges fixes : <b>${eur(B.fc)}</b> par mois. Ton EBITDA du dernier mois : <b>${eur(B.hist.length?B.hist[B.hist.length-1].ebitda:0)}</b>.
   <br><br>Elle demande une <b>caution personnelle</b> : si la boîte tombe, c'est toi qui rembourses.`,
 offers:[
  {k:"N", amount:0, months:0, rate:0, label:"Tu ne prends rien", q:0},
  {k:"A", amount:15000, months:24, rate:.052, label:"15 000 € sur 2 ans", q:1},
  {k:"B", amount:30000, months:48, rate:.058, label:"30 000 € sur 4 ans", q:2},
  {k:"C", amount:60000, months:60, rate:.069, label:"60 000 € sur 5 ans", q:-1}
 ],
 debrief:(B,k)=>{
  const l=B.loans[B.loans.length-1];
  return `
  <p><b>Le piège du prêt, c'est qu'il ne coûte rien au résultat et beaucoup à la trésorerie.</b> Sur ton compte de résultat, tu ne verras passer que les <b>intérêts</b>. Le remboursement du capital, lui, n'est pas une charge — c'est un décaissement pur. Il ne baisse pas ton bénéfice, il vide ton compte en banque. C'est exactement l'inverse de l'amortissement, qui plombe ton résultat sans jamais toucher ton cash.</p>
  ${l?`<p><b>Concrètement pour toi.</b> Tu rembourses <b>${eur(l.pay)}</b> par mois pendant <b>${l.months} mois</b>, dont seule une part décroissante est déductible. Rapporté à tes charges fixes de ${eur(B.fc)}, ce prêt vient d'augmenter ton point mort de <b>${Math.round(l.pay/B.fc*100)} %</b>. Tu as acheté du temps, et tu l'as payé en rigidité.</p>`:`<p><b>Tu n'as rien pris.</b> Ce n'est pas une faute en soi — mais vérifie que c'est un choix et pas un réflexe. Refuser un financement quand on a un besoin réel, c'est se financer par le découvert plus tard, à 12 % au lieu de 5.</p>`}
  <p><b>La bonne question n'était pas « combien puis-je emprunter ».</b> C'était <b>« quel besoin précis je finance, et sur quelle durée ce besoin existe-t-il ? »</b> On finance un besoin long par une ressource longue, un besoin court par une ressource courte. Emprunter sur 5 ans pour financer un pic de stock de trois mois, c'est payer des intérêts pendant quatre ans et neuf mois pour rien.</p>
  <p><b>Et la caution personnelle n'est pas un détail administratif.</b> Elle supprime la principale protection de ta société : la responsabilité limitée. À partir de maintenant, ta boîte et toi ne faites plus qu'un aux yeux de la banque.</p>`},
 grid:[
  "Avoir identifié le BESOIN précis que le prêt finance — et sa durée de vie.",
  "Avoir calculé la mensualité et l'avoir rapportée à tes charges fixes actuelles.",
  "Avoir vu que le remboursement du capital ne passe PAS par le compte de résultat.",
  "Avoir mesuré ce que la caution personnelle t'engage réellement."
 ]},

{id:"n1embauche", lvl:1, type:"choice", ch:3, icon:"🧑‍🏭", title:"Le premier salarié",
 concept:"Coût complet d'un poste · levier opérationnel", lesson:"b1",
 when:B=>B.month>=10 && !B.staff && B.demandMult>1.15,
 signal:"Tu as refusé deux commandes le mois dernier faute de temps. Tu produis à ta limite.",
 setup:B=>`Tu ne suis plus. Un candidat sérieux veut te rejoindre pour <b>1 900 € net</b> par mois.
   <br><br>Il te permettrait de produire environ <b>60 % de plus</b>.
   <br><br>Tes charges fixes actuelles : <b>${eur(B.fc)}</b>/mois. Ta marge unitaire : <b>${eur(B.price-B.mc)}</b> par ${B.unitLabel}.`,
 options:[
  {k:"A", label:"Tu embauches en CDI", term:"1 900 € net. Tu t'engages.", q:1},
  {k:"B", label:"Tu ne recrutes pas", term:"Tu restes seul et tu refuses des commandes.", q:-1},
  {k:"C", label:"Tu prends un alternant", term:"Moins cher, moins productif, aidé.", q:2},
  {k:"D", label:"Tu sous-traites la production à un atelier", term:"Pas de salarié, mais ta marge unitaire baisse.", q:0}
 ],
 apply:(B,k)=>{
   if(k==="A"){ B.staff=1; B.fc+=3300; B.capacity=1.6; }
   if(k==="B"){ B.capacity=1; B.rep=Math.max(.6,B.rep-.05); }
   if(k==="C"){ B.staff=1; B.fc+=1250; B.capacity=1.3; }
   if(k==="D"){ B.mc*=1.22; B.capacity=2.2; }
 },
 debrief:(B,k)=>`
  <p><b>1 900 € net ne coûtent jamais 1 900 €.</b> En France, il faut compter environ <b>1,75 fois le net</b> pour obtenir le coût employeur : le salarié à 1 900 € net t'en coûte à peu près <b>3 300 €</b> chargés. Quiconque raisonne sur le net se trompe de moitié — et c'est l'erreur qui tue le plus de petites boîtes en croissance.</p>
  <p><b>Le calcul qu'il fallait poser.</b> À ${eur(B.price-B.mc)} de marge par ${B.unitLabel}, ce poste doit générer <b>${Math.ceil(3300/Math.max(1,B.price-B.mc))} ${B.unitLabel}s de plus par mois</b> juste pour se payer. Pas pour rapporter : pour ne rien coûter. Compare ce chiffre à tes volumes actuels avant de signer — s'il représente 40 % de ta production, tu viens de parier ta boîte sur une hypothèse de croissance.</p>
  <p><b>C est presque toujours le bon coup à ce stade</b>, et pas parce que c'est moins cher : parce que c'est <b>réversible</b>. Quand tu ne sais pas si ta croissance tiendra, la valeur d'une décision réversible est très supérieure à son rendement affiché.</p>
  <p><b>D mérite mieux que le mépris qu'on lui réserve.</b> Sous-traiter transforme un coût fixe en coût variable : ta marge unitaire baisse, mais ton point mort ne bouge pas. Tu gagnes moins quand ça marche, tu meurs beaucoup moins vite quand ça s'arrête. C'est le choix qu'un financier prend quand la visibilité est mauvaise — et à ce stade, ta visibilité est mauvaise.</p>`,
 grid:[
  "Avoir converti le net en coût employeur (≈ ×1,75) avant tout raisonnement.",
  "Avoir calculé le volume supplémentaire nécessaire juste pour que le poste se paie.",
  "Avoir raisonné en coût FIXE vs coût VARIABLE, pas seulement en montant.",
  "Avoir valorisé la RÉVERSIBILITÉ de l'option, pas seulement son rendement."
 ]},

{id:"n1impaye", lvl:1, type:"choice", ch:4, icon:"🧾", title:"Le client qui ne paie pas",
 concept:"Créance douteuse · provision · relance", lesson:"b4",
 when:B=>B.month>=13 && B.b2b && B.ar>0,
 signal:"Leur comptable ne répond plus depuis trois semaines. Le silence est toujours un signal.",
 setup:B=>`Ton client B2B a <b>${eur(B.ar*.7)}</b> de factures échues. Deux relances, aucune réponse.
   <br><br>Il représente une part importante de ton volume. Le fâcher, c'est peut-être le perdre.
   <br><br>Ta trésorerie : <b>${eur(B.cash)}</b> · tes créances totales : <b>${eur(B.ar)}</b>.`,
 options:[
  {k:"A", label:"Tu attends encore un mois", term:"Tu ne veux pas casser la relation.", q:-2},
  {k:"B", label:"Tu bloques les livraisons jusqu'au paiement", term:"Tu arrêtes de le financer.", q:2},
  {k:"C", label:"Tu mets en recouvrement judiciaire", term:"Tu récupères peut-être, tu perds le client.", q:0},
  {k:"D", label:"Tu proposes un échéancier contre un acompte immédiat", term:"Tu étales, mais tu encaisses tout de suite.", q:1}
 ],
 apply:(B,k)=>{
   if(k==="A"){ B.ar*=1.15; B.badDebt=(B.badDebt||0)+B.ar*.35; B.cash-=B.ar*.05; }
   if(k==="B"){ B.demandMult*=.88; B.ar*=.45; B.cash+=B.ar*.5; B.dso=Math.max(20,B.dso-15); }
   if(k==="C"){ B.demandMult*=.7; B.ar*=.35; B.cash+=B.ar*.35; B.b2b=false; }
   if(k==="D"){ B.ar*=.7; B.cash+=B.ar*.3; B.dso+=10; }
 },
 debrief:(B,k)=>`
  <p><b>Une créance échue n'est pas un retard, c'est un prêt que tu accordes sans l'avoir décidé</b> — et sans intérêts. Pendant que tu attends, tu finances l'exploitation de quelqu'un d'autre avec ton propre cash. Le mot « relation commerciale » sert très souvent à habiller ça.</p>
  <p><b>La statistique qui doit décider à ta place :</b> le taux de recouvrement d'une créance s'effondre avec le temps. Ce qui est récupérable presque intégralement à 30 jours devient très difficile à 90, et largement perdu à 180. <b>Attendre n'est pas neutre : attendre coûte.</b> A est donc la pire option, et c'est aussi celle qui paraît la plus douce.</p>
  <p><b>B est brutal et c'est le bon réflexe</b>, pour une raison qu'on oublie : arrêter de livrer, c'est arrêter d'<i>augmenter</i> ton exposition. Tant que tu continues à livrer un client qui ne paie pas, tu n'as pas un problème d'impayé — tu as un problème qui grossit toutes les semaines.</p>
  <p><b>Et il y a une question que tu aurais dû poser avant.</b> Pourquoi ne paie-t-il pas ? S'il a un problème de trésorerie passager, D est excellent. S'il est en cessation de paiements, tu es un créancier chirographaire parmi d'autres, et chaque semaine d'attente réduit ta part. <b>Un impayé n'est pas un problème commercial, c'est un problème de solvabilité de la contrepartie</b> — et ça se vérifie en dix minutes sur les comptes publiés.</p>`,
 grid:[
  "Avoir vu qu'attendre a un COÛT chiffrable, et pas seulement un bénéfice relationnel.",
  "Avoir cherché à distinguer le retard de trésorerie de l'insolvabilité réelle.",
  "Avoir arrêté d'AUGMENTER l'exposition avant de chercher à récupérer l'existant.",
  "Avoir rapporté le montant en jeu à ta trésorerie disponible, pas à ton CA."
 ]},

{id:"n1negofourn", lvl:1, type:"nego", ch:3, icon:"🤝", title:"Négocier ton fournisseur",
 concept:"Leviers de négociation · BATNA · ancrage", lesson:"b4",
 when:B=>B.month>=9,
 signal:"Tes achats ont doublé en un an. Tu paies toujours le tarif du premier jour.",
 setup:B=>`Ton fournisseur de matière première te facture <b>${eur(B.mc)}</b> par ${B.unitLabel}, au tarif que tu as accepté quand tu démarrais. Depuis, tes volumes ont fortement augmenté.
   <br><br>Tu demandes un rendez-vous. Objectif : <b>faire baisser ton coût d'achat</b>.
   <br><br>Tu ne peux mobiliser que <b>trois arguments</b> — au-delà, tu dilues ton propos et il choisit celui qui l'arrange.`,
 goal:"Baisser ton prix d'achat",
 max:3,
 levers:[
  {k:"a", label:"Tes volumes sur 12 mois, chiffrés", power:2,
   why:"Un fait vérifiable qui sert SON intérêt : tu es devenu un client qui compte. C'est solide, mais tout le monde l'utilise — c'est ton argument de base, pas ton argument décisif."},
  {k:"b", label:"Un devis concurrent chiffré, en main", power:3,
   why:"C'est ton BATNA — ta meilleure solution de rechange — et il est CRÉDIBLE parce qu'il est écrit. C'est le levier le plus puissant de toute négociation : ton pouvoir ne vient pas de ce que tu demandes, il vient de ce que tu peux faire si on refuse."},
  {k:"c", label:"« Sinon je change de fournisseur » (sans devis)", power:-2,
   why:"Une menace non crédible est pire que pas de menace. Il sait que changer te coûte du temps et du risque qualité. En bluffant, tu ne perds pas seulement ce round : tu apprends à ta contrepartie que tes menaces ne valent rien."},
  {k:"d", label:"Un engagement de volume ferme sur 12 mois", power:2,
   why:"Tu lui vends de la VISIBILITÉ, ce qui a une vraie valeur pour lui — il planifie sa production. Tu troques une contrainte contre une remise : c'est de la négociation intégrative, pas du bras de fer."},
  {k:"e", label:"« Ma trésorerie est tendue en ce moment »", power:-3,
   why:"L'erreur la plus coûteuse du lot. Tu viens de lui apprendre que tu ne peux pas partir et que tu paieras avec retard. Un fournisseur qui apprend que son client est fragile ne baisse pas ses prix : il RÉDUIT ses délais de paiement et demande des garanties."},
  {k:"f", label:"Le paiement comptant contre remise", power:2,
   why:"Tu lui offres du cash immédiat, ce qui vaut cher pour lui. Attention au calcul : une remise de 2 % contre 45 jours gagnés, c'est un rendement annualisé énorme pour toi — mais seulement si tu as le cash pour le faire."},
  {k:"g", label:"Ancrer haut : demander 20 % pour obtenir 10 %", power:1,
   why:"L'ancrage fonctionne — le premier chiffre énoncé structure toute la suite. Mais un ancrage sans justification passe pour de l'amateurisme et te fait perdre en crédibilité. Il ne vaut que COMBINÉ à un argument factuel."}
 ],
 resolve:(B,picks)=>{
   const p=picks.reduce((t,k)=>t+(BIZCASES_N1.find(c=>c.id==="n1negofourn").levers.find(l=>l.k===k).power),0);
   const gain=Math.max(0,Math.min(.14, p*.022));           // jusqu'à −14 % de coût d'achat
   const hardened=p<0;
   B.mc=B.mc*(1-gain);
   if(picks.includes("d")) B.volumeLock=12;
   if(picks.includes("f")){ B.dpo=Math.max(0,B.dpo-45); B.escompteFourn=.02; }
   if(hardened){ B.dpo=Math.max(0,B.dpo-15); }
   return {p, gain, hardened};
 },
 debrief:(B,picks,r)=>`
  <p><b>Résultat : ${r.gain>0?`tu obtiens <b>−${(r.gain*100).toFixed(1)} %</b> sur ton prix d'achat`:"tu n'obtiens rien"}.</b> ${r.hardened?`Pire : il a <b>durci tes conditions de paiement</b>. Tu es sorti de cette réunion avec moins qu'en y entrant.`:""}</p>
  <p><b>Le seul levier qui compte vraiment, c'est le devis concurrent.</b> Ce n'est pas un détail de technique : c'est le principe central de toute négociation. <b>Ton pouvoir ne vient pas de ce que tu demandes, il vient de ce que tu peux faire si l'autre refuse.</b> C'est ton BATNA. Sans lui, tu ne négocies pas — tu demandes poliment. ${picks.includes("b")?"Tu l'avais.":"<b>Tu ne l'avais pas</b>, et c'est ce qui a plafonné tout le reste."}</p>
  <p><b>Les deux pièges, et pourquoi ils sont si tentants.</b> Menacer sans devis (c) paraît fort et ne coûte rien — sauf que ça détruit la crédibilité de toutes tes menaces futures. Et dire que ta trésorerie est tendue (e) paraît honnête et humain — c'est en réalité l'information la plus dangereuse que tu puisses lui donner. ${picks.includes("e")?"<b>Tu l'as dit.</b> Retiens ce moment.":""}</p>
  <p><b>Ce que fait un bon négociateur et que personne ne fait spontanément :</b> il cherche ce qui a de la valeur pour l'autre et lui coûte peu à toi. La visibilité (d) et le cash immédiat (f) sont exactement ça. Une négociation gagnée n'est pas une négociation où l'autre perd — c'est une négociation où vous n'échangez pas les mêmes choses.</p>`,
 grid:[
  "Avoir apporté un BATNA CRÉDIBLE et documenté, pas une menace en l'air.",
  "N'avoir jamais révélé ta contrainte de trésorerie — ta faiblesse n'est pas un argument.",
  "Avoir cherché ce qui a de la valeur POUR LUI et te coûte peu (visibilité, cash rapide).",
  "Avoir combiné l'ancrage avec un fait, au lieu de lancer un chiffre nu."
 ]},

{id:"n1rachat", lvl:1, type:"nego", ch:5, icon:"🎯", title:"Racheter ton concurrent",
 concept:"Multiple d'EBITDA · retraitements · négociation d'un prix", lesson:"a3",
 when:B=>B.month>=20 && B.cash>8000,
 signal:"Son dirigeant a 61 ans et n'a pas de repreneur. Ça se sait dans le métier depuis un moment.",
 setup:B=>`Ton concurrent direct veut vendre. Il part à la retraite.
   <br><br>Ses chiffres, tels qu'il te les présente : CA <b>${eur(B.fc*11)}</b>/an, EBITDA annoncé <b>${eur(B.fc*2.2)}</b>/an.
   <br><br>Son prix : <b>${eur(B.fc*2.2*4)}</b>, soit <b>4× son EBITDA</b>. Il dit que « c'est le multiple du secteur ».
   <br><br>Ta trésorerie : <b>${eur(B.cash)}</b>. Trois arguments maximum — au-delà, tu t'éparpilles et il reprend la main.`,
 goal:"Faire baisser le prix demandé",
 max:3,
 levers:[
  {k:"a", label:"Son EBITDA inclut son propre salaire de dirigeant", power:3,
   why:"LE retraitement fondamental, et celui que les amateurs oublient. Il part : il faudra payer quelqu'un pour faire son travail. Cette charge future n'est pas dans l'EBITDA qu'il te présente. Corrigé, le vrai EBITDA baisse — et comme le prix est un MULTIPLE de l'EBITDA, chaque euro de retraitement enlève quatre euros au prix."},
  {k:"b", label:"Deux de ses trois gros clients ne sont pas sous contrat", power:3,
   why:"La qualité du chiffre d'affaires compte autant que son montant. Un CA concentré et non contractualisé peut disparaître au départ du dirigeant — parce que c'est LUI que les clients connaissent. Tu n'achètes pas ses clients, tu achètes le pari qu'ils restent."},
  {k:"c", label:"« Ton prix est complètement délirant »", power:-2,
   why:"Une agression sans chiffre. Tu attaques sa personne au lieu de son calcul, il se braque, et tu perds l'accès à l'information dont tu as besoin. En négociation, on attaque toujours le RAISONNEMENT, jamais celui qui le tient."},
  {k:"d", label:"Proposer un earn-out sur les résultats des deux ans", power:2,
   why:"Tu ne réduis pas le prix, tu le rends CONDITIONNEL. Si ses clients restent, il touche tout ; s'ils partent, tu ne paies pas. C'est l'outil exact du désaccord sur l'avenir : au lieu de discuter d'une prévision, on parie dessus. Et son refus t'apprendrait quelque chose sur sa propre confiance."},
  {k:"e", label:"« J'ai déjà le financement bouclé, je peux payer vite »", power:-2,
   why:"Tu viens de lui dire que tu es décidé et solvable. Il n'a plus aucune raison de baisser. La rapidité de paiement est une CONTREPARTIE à échanger contre une baisse — pas une information à offrir gratuitement."},
  {k:"f", label:"Faire valoir les synergies que tu vas dégager", power:-3,
   why:"L'erreur la plus chère de tout le M&A, et elle paraît intelligente. Les synergies, c'est de la valeur que TU vas créer, avec ton travail et ton risque. En les mettant sur la table, tu invites le vendeur à te les facturer — tu paies d'avance une valeur qui n'existe pas encore et qui dépend entièrement de toi. On n'achète jamais une cible au prix de ce qu'elle vaudra entre tes mains."},
  {k:"g", label:"Des transactions comparables récentes dans le métier", power:2,
   why:"Tu contestes son multiple avec des faits plutôt qu'avec une humeur. Attention : les comparables sont solides sur le principe et manipulables sur le choix de l'échantillon — c'est un bon levier, pas une preuve."}
 ],
 resolve:(B,picks)=>{
   const L=BIZCASES_N1.find(c=>c.id==="n1rachat").levers;
   const p=picks.reduce((t,k)=>t+L.find(l=>l.k===k).power,0);
   const ask=B.fc*2.2*4;
   const disc=Math.max(-.10, Math.min(.42, p*.06));
   const price=Math.round(ask*(1-disc));
   const walked=p<=-4;
   if(!walked){
     B.acquired=true; B.acqPrice=price; B.acqEarnout=picks.includes("d");
     const cashNow=picks.includes("d") ? price*.6 : price;
     B.cash-=cashNow;
     B.earnoutLeft=picks.includes("d") ? price*.4 : 0;
     B.demandMult*=1.55; B.fc+=B.fc*.55; B.rep=Math.min(1.25,B.rep+.05);
     if(!picks.includes("a")) B.fc+=2600;          // il faut payer un remplaçant
     if(!picks.includes("b")) B.demandMult*=.72;   // les clients non contractualisés partent
   }
   return {p, price, ask, disc, walked};
 },
 debrief:(B,picks,r)=>`
  ${r.walked?`<p><b>Il a mis fin à la discussion.</b> Tu l'as agressé sans argument chiffré et tu lui as donné des raisons de te vendre cher. Il vendra à quelqu'un d'autre.</p>`:
  `<p><b>Tu l'achètes ${eur(r.price)}</b>, contre ${eur(r.ask)} demandés — soit <b>${r.disc>0?"−"+(r.disc*100).toFixed(0)+" %":"+"+Math.abs(r.disc*100).toFixed(0)+" % de plus que le prix affiché"}</b>.</p>`}
  <p><b>Le mécanisme central : un prix en multiple amplifie tout.</b> Le prix vaut 4 × EBITDA. Donc chaque euro d'EBITDA que tu retraites à la baisse enlève <b>quatre euros</b> au prix. C'est pour ça que la bataille d'une acquisition ne se joue jamais sur le multiple — elle se joue sur <b>ce qu'on met dans l'EBITDA</b>. Contester le multiple, c'est se battre sur le terrain du vendeur ; retraiter l'EBITDA, c'est déplacer le terrain.</p>
  <p><b>Le salaire du dirigeant est le retraitement roi.</b> ${picks.includes("a")?"Tu l'as utilisé — c'est ce qui a fait le gros du chemin.":`<b>Tu ne l'as pas utilisé.</b> Il part, et tu devras payer quelqu'un pour faire son travail : cette charge n'était pas dans son EBITDA. Tu viens de payer quatre fois un salaire que tu vas devoir verser tous les mois.`}</p>
  <p><b>Et voilà le piège que presque personne n'évite : les synergies.</b> ${picks.includes("f")?"<b>Tu les as mises sur la table.</b> Tu as donc proposé au vendeur de lui payer la valeur que tu comptais créer toi-même, avec ton travail et ton risque. C'est l'erreur la plus coûteuse de ce cas, et c'est celle qui ressemble le plus à un bon argument.":"Tu ne les as pas mises sur la table — bien joué, c'est le piège du cas. Les synergies sont la valeur que TU crées : les annoncer revient à les payer d'avance au vendeur."}</p>
  <p><b>Ce qu'il fallait avoir en tête avant même d'ouvrir la bouche :</b> qu'est-ce que j'achète exactement ? Des clients, une marque, un savoir-faire, une capacité de production, ou juste le retrait d'un concurrent du marché ? Chacun de ces actifs a une durée de vie différente. Des clients attachés à un dirigeant qui s'en va sont l'actif le plus fragile qui soit — et c'est presque toujours celui qu'on paie le plus cher.</p>`,
 grid:[
  "Avoir retraité l'EBITDA (le salaire du dirigeant en tête) AVANT de discuter du multiple.",
  "Avoir compris qu'à 4×, un euro d'EBITDA retraité vaut quatre euros de prix.",
  "N'avoir JAMAIS argumenté avec tes synergies — c'est ta valeur, pas la sienne.",
  "Avoir regardé la QUALITÉ du chiffre d'affaires (concentration, contractualisation).",
  "Avoir su nommer ce que tu achètes réellement, et sa durée de vie."
 ]},

{id:"n1prix", lvl:1, type:"choice", ch:2, icon:"🏷️", title:"Le prix que tu n'oses pas mettre",
 concept:"Pouvoir de prix · élasticité · segmentation", lesson:"a1",
 when:B=>B.month>=6 && B.hist.length>3,
 signal:"Personne n'a jamais discuté ton prix. Aucun client n'est parti à cause de lui. C'est un signal, et c'est mauvais.",
 setup:B=>`Ton comptable te dit d'augmenter. Ton associé imaginaire te dit que tu vas perdre tes clients.
   <br><br>Ton prix : <b>${eur(B.price)}</b> · ton coût de revient : <b>${eur(B.mc)}</b> · ta marge unitaire : <b>${eur(B.price-B.mc)}</b>.
   <br><br>Ton élasticité, au point de prix exact où tu es : <b>${B.elast.toFixed(2)}</b>.`,
 options:[
  {k:"A", label:"Tu ne touches à rien", term:"Tu gardes ton prix. Aucun risque apparent.", q:-1},
  {k:"B", label:"+8 %, sans rien changer d'autre", term:"Tu montes et tu assumes.", q:2},
  {k:"C", label:"+8 %, mais tu préviens tes clients et tu justifies", term:"Même hausse, annoncée un mois à l'avance.", q:2},
  {k:"D", label:"−5 % pour gagner du volume", term:"Tu vas chercher des parts de marché.", q:-2}
 ],
 apply:(B,k)=>{
   if(k==="B"){ B.price*=1.08; }
   if(k==="C"){ B.price*=1.08; B.rep=Math.min(1.25,B.rep+.04); }
   if(k==="D"){ B.price*=.95; }
 },
 debrief:(B,k)=>`
  <p><b>Ton élasticité vaut ${B.elast.toFixed(2)}, et elle décide à ta place.</b> ${Math.abs(B.elast)<1
   ? `Tu es en zone <b>inélastique</b> : +8 % de prix ne te coûte que ${(Math.abs(B.elast)*8).toFixed(1)} % de volume. Ton chiffre d'affaires monte, et ta marge monte <b>beaucoup</b> plus vite — parce que les euros de hausse tombent intégralement en marge, sans un centime de coût supplémentaire. <b>Ne pas augmenter était la vraie prise de risque.</b>`
   : `Tu es en zone <b>élastique</b> : +8 % te coûte ${(Math.abs(B.elast)*8).toFixed(1)} % de volume. Ton CA baisse — mais regarde ta marge avant de conclure : tu vends moins d'unités, chacune rapportant ${eur(B.price*1.08-B.mc)} au lieu de ${eur(B.price-B.mc)}. Le calcul n'est pas évident, et c'est justement pour ça qu'il faut le poser.`}</p>
  <p><b>Le calcul que personne ne fait, et qui change tout.</b> Une hausse de prix ne coûte <b>rien</b> à produire. Chaque euro gagné en prix est un euro de marge pure. À l'inverse, gagner la même marge par le volume suppose de produire, stocker, livrer, financer. <b>Un point de prix ne vaut jamais un point de volume</b> — il vaut beaucoup plus.</p>
  <p><b>D est le réflexe le plus répandu et le plus destructeur.</b> À ta marge actuelle de ${Math.round((1-B.mc/B.price)*100)} %, baisser de 5 % te fait perdre ${Math.round(5/Math.max(1,(1-B.mc/B.price)*100)*100)} % de ta marge unitaire. Il te faudrait un bond de volume que ton élasticité ne te donnera jamais. Et tu auras appris à ton marché que ton prix se discute.</p>
  <p><b>La différence entre B et C n'est pas le prix, c'est la relation.</b> Une hausse annoncée, expliquée et datée passe presque toujours ; une hausse découverte sur une facture crée un incident. Même chiffre, deux effets opposés sur la réputation. C'est gratuit, et presque personne ne le fait.</p>`,
 grid:[
  "Avoir lu ton élasticité AVANT de trancher, au lieu de raisonner à l'intuition.",
  "Avoir vu qu'un euro de prix est un euro de marge pure — sans coût de production.",
  "Avoir calculé le volume qu'il faudrait gagner pour compenser une baisse de prix.",
  "Avoir traité l'ANNONCE de la hausse comme une variable, pas seulement son montant."
 ]},

{id:"n1saison", lvl:1, type:"choice", ch:4, icon:"🎄", title:"Financer le pic de saison",
 concept:"BFR saisonnier · financement court terme", lesson:"b4",
 when:B=>B.month>=11 && (B.month%12===9 || B.month%12===10),
 signal:"Ta saisonnalité est dans tes propres chiffres depuis le premier mois. Tu la découvres pourtant chaque année.",
 setup:B=>`Ton gros mois approche. Pour le servir, il faut acheter et produire <b>maintenant</b> — donc décaisser maintenant et encaisser dans deux mois.
   <br><br>Le stock à constituer représente environ <b>${eur(B.fc*1.8)}</b> de décaissement.
   <br><br>Ta trésorerie : <b>${eur(B.cash)}</b>.`,
 options:[
  {k:"A", label:"Tu tires sur ton découvert", term:"Immédiat, aucune démarche.", q:-1},
  {k:"B", label:"Un crédit de campagne sur 4 mois", term:"Un prêt court terme calé sur la saison.", q:2},
  {k:"C", label:"Tu produis moins et tu assumes la rupture", term:"Tu ne finances rien, tu vends moins.", q:-1},
  {k:"D", label:"Tu demandes un acompte à tes clients B2B", term:"Ils financent ton stock à ta place.", q:2}
 ],
 apply:(B,k)=>{
   if(k==="A"){ B.stockTarget+=.8; B.usedOverdraft=true; }
   if(k==="B"){ B.stockTarget+=.8; B.loans.push({amount:Math.round(B.fc*1.8),rate:.055,months:4,left:4,pay:Math.round(B.fc*1.8/4*1.02),label:"Crédit de campagne"}); B.cash+=B.fc*1.8; }
   if(k==="C"){ B.stockTarget=Math.max(.3,B.stockTarget-.3); B.rep=Math.max(.6,B.rep-.06); }
   if(k==="D"){ B.stockTarget+=.8; B.acompte=Math.max(B.acompte||0,.35); B.dso=Math.max(15,B.dso-10); }
 },
 debrief:(B,k)=>`
  <p><b>La règle d'or du financement, et elle tient en une phrase :</b> on finance un besoin court par une ressource courte, un besoin long par une ressource longue. Ton pic de saison est un besoin <b>court</b> — il dure trois mois et se rembourse tout seul quand tu encaisses. Le crédit de campagne (B) est fait exactement pour ça : il naît avec le besoin et meurt avec lui.</p>
  <p><b>Le découvert (A) fonctionne, et c'est bien le problème.</b> Il est immédiat, sans dossier, sans explication à donner — et à 12 % l'an, c'est le financement le plus cher que tu prendras jamais. Surtout, il est <b>révocable à tout moment</b> : ta banque peut le couper précisément le jour où tu en as besoin. Un financement qu'on peut te retirer au pire moment n'est pas un financement, c'est un pari.</p>
  <p><b>D est l'option des gens qui ont compris comment marche le BFR.</b> Tu ne cherches pas d'argent : tu déplaces le financement chez celui qui a le plus intérêt à être livré. L'acompte n'est pas une faveur qu'on demande, c'est une clause commerciale ordinaire — et le pire qui puisse arriver, c'est qu'on te dise non.</p>
  <p><b>Et le vrai reproche, c'est le calendrier.</b> Ta saisonnalité était dans tes chiffres depuis le début : elle se voyait dans ton historique et dans celui de ton métier. Un besoin de trésorerie prévisible douze mois à l'avance qu'on découvre six semaines avant, ce n'est pas un problème de financement — c'est un problème de pilotage. <b>Le prévisionnel de trésorerie, c'est exactement ça et rien d'autre.</b></p>`,
 grid:[
  "Avoir adossé la DURÉE de la ressource à la durée du besoin.",
  "Avoir chiffré le coût réel du découvert plutôt que de le prendre par facilité.",
  "Avoir pensé à déplacer le besoin chez le client (acompte) avant de chercher un prêteur.",
  "Avoir reconnu que ce besoin était prévisible — et qu'il aurait dû l'être un an plus tôt."
 ]},

{id:"n1machine", lvl:1, type:"choice", ch:4, icon:"⚙️", title:"La machine ou l'atelier",
 concept:"CAPEX vs OPEX · amortissement · levier opérationnel", lesson:"b2",
 when:B=>B.month>=15 && B.demandMult>1.3,
 signal:"Tu passes tes soirées sur des tâches qu'une machine ferait en une heure.",
 setup:B=>`Une machine à <b>${eur(B.fc*4)}</b> diviserait ton temps de production par deux et baisserait ton coût de revient d'environ <b>15 %</b>.
   <br><br>Un atelier voisin propose de faire le même travail en sous-traitance, sans investissement, mais ton coût de revient <b>monte</b> de 12 %.
   <br><br>Ta trésorerie : <b>${eur(B.cash)}</b> · ton EBITDA mensuel : <b>${eur(B.hist.length?B.hist[B.hist.length-1].ebitda:0)}</b>.`,
 options:[
  {k:"A", label:"Tu achètes la machine comptant", term:"Tu sors le cash d'un coup.", q:0},
  {k:"B", label:"Tu la finances en crédit-bail sur 4 ans", term:"Un loyer mensuel, pas de sortie de cash immédiate.", q:2},
  {k:"C", label:"Tu sous-traites", term:"Aucun investissement, marge unitaire plus faible.", q:1},
  {k:"D", label:"Tu ne fais rien pour l'instant", term:"Tu continues à la main.", q:-1}
 ],
 apply:(B,k)=>{
   if(k==="A"){ B.cash-=B.fc*4; B.mc*=.85; B.capex=(B.capex||0)+B.fc*4; B.fc+=B.fc*4/60; }
   if(k==="B"){ B.mc*=.85; B.fc+=B.fc*4/48*1.09; B.leasing=true; }
   if(k==="C"){ B.mc*=1.12; B.flexible=true; }
   if(k==="D"){ B.capacity=Math.min(B.capacity||1,1); B.rep=Math.max(.6,B.rep-.03); }
 },
 debrief:(B,k)=>`
  <p><b>Acheter et sous-traiter ne changent pas la même chose dans ton modèle.</b> La machine transforme un coût <b>variable</b> en coût <b>fixe</b> : ton coût unitaire baisse, mais ton point mort monte. La sous-traitance fait l'inverse : tu gagnes moins par unité, et tu ne dois rien quand tu ne vends rien. C'est ça, le <b>levier opérationnel</b> — et il joue dans les deux sens avec la même force.</p>
  <p><b>La règle de décision est simple et personne ne l'applique :</b> plus ta visibilité sur les volumes est <b>mauvaise</b>, plus tu dois préférer le variable. Le levier opérationnel multiplie tes profits à la hausse et tes pertes à la baisse. À ce stade, ta visibilité est faible.</p>
  <p><b>Le crédit-bail (B) est le compromis intelligent, pour une raison de trésorerie et non de coût.</b> Il coûte un peu plus cher au total — c'est le prix du service — mais il ne vide pas ton compte en banque, et le loyer passe intégralement en charge. Acheter comptant (A) est moins cher sur la durée et bien plus dangereux à court terme : la seule chose qui te tue, c'est de manquer de cash, jamais de payer 9 % de trop.</p>
  <p><b>Et voici la subtilité comptable qui piège tout le monde.</b> Si tu achètes, la sortie de ${eur(B.fc*4)} n'apparaît <b>pas</b> dans ton compte de résultat : elle entre à l'actif du bilan et se dilue en amortissements sur cinq ans. Ton bénéfice affiché reste beau <i>alors que ton compte en banque vient de se vider</i>. C'est le cas d'école le plus pur de l'écart entre résultat et trésorerie — et c'est comme ça que des entreprises rentables déposent le bilan.</p>`,
 grid:[
  "Avoir raisonné en coût FIXE vs VARIABLE, pas en coût total.",
  "Avoir relié le choix à ta VISIBILITÉ réelle sur les volumes futurs.",
  "Avoir vu que l'achat vide le cash sans toucher le résultat (amortissement).",
  "Avoir calculé le nouveau point mort après l'investissement, pas avant."
 ]},

{id:"n1commande", lvl:1, type:"choice", ch:3, icon:"📮", title:"La grosse commande à prix cassé",
 concept:"Marge sur coûts variables · coût d'opportunité", lesson:"b1",
 when:B=>B.month>=8,
 signal:"Ils ont consulté trois de tes concurrents avant toi. Tu es leur variable d'ajustement, pas leur choix.",
 setup:B=>`Une commande unique, très importante : l'équivalent de <b>deux mois de production</b> d'un coup.
   <br><br>Mais à <b>−30 %</b> sur ton prix, soit <b>${eur(B.price*.7)}</b> le ${B.unitLabel}. Ton coût de revient est de <b>${eur(B.mc)}</b>.
   <br><br>Ils veulent une réponse sous 48 h.`,
 options:[
  {k:"A", label:"Tu acceptes", term:"Du volume, tout de suite.", q:0},
  {k:"B", label:"Tu refuses", term:"Tu ne brades pas ton travail.", q:1},
  {k:"C", label:"Tu acceptes sous conditions : paiement comptant et marque blanche", term:"Même prix, mais tu encaisses tout de suite et ton nom n'apparaît pas.", q:2},
  {k:"D", label:"Tu contres à −15 %", term:"Tu négocies le milieu.", q:1}
 ],
 apply:(B,k)=>{
   if(k==="A"){ B.cash+=B.price*.7*B.qPrev*2*.35; B.priceAnchored=true; B.rep=Math.max(.6,B.rep-.03); B.stockU=Math.max(0,B.stockU*.4); }
   if(k==="B"){ /* rien */ }
   if(k==="C"){ B.cash+=B.price*.7*B.qPrev*2*.6; B.stockU=Math.max(0,B.stockU*.4); }
   if(k==="D"){ B.cash+=B.price*.85*B.qPrev*2*.4; B.priceAnchored=true; B.stockU=Math.max(0,B.stockU*.5); }
 },
 debrief:(B,k)=>`
  <p><b>Le bon calcul n'est pas celui que tu crois.</b> Une commande exceptionnelle ne se juge pas sur la marge <b>nette</b> mais sur la <b>marge sur coûts variables</b>. Tes charges fixes de ${eur(B.fc)} sont payées de toute façon, commande ou pas. Donc tant que le prix proposé dépasse ton coût variable de ${eur(B.mc)}, chaque unité vendue apporte <b>${eur(B.price*.7-B.mc)}</b> qui vient absorber tes fixes. ${B.price*.7>B.mc?"Ici, c'est le cas : la commande est contributive.":"<b>Ici ce n'est PAS le cas : tu vendrais sous ton coût variable.</b> Refuser n'est plus une opinion, c'est de l'arithmétique."}</p>
  <p><b>Mais trois coûts n'apparaissent nulle part dans ce calcul, et ce sont eux qui décident.</b><br>• <b>Le coût d'opportunité</b> : cette capacité utilisée à −30 % n'est plus disponible pour tes clients à plein tarif. Si tu tournes déjà près de ta limite, tu ne gagnes pas une commande, tu en échanges une contre une moins bonne.<br>• <b>L'ancrage du prix</b> : tu viens d'apprendre à ce client, et à ton marché, que ton prix se négocie à −30 %. La prochaine commande partira de là.<br>• <b>La dépendance</b> : deux mois de production chez un seul acheteur qui t'a choisi par le prix, c'est un client qui partira par le prix.</p>
  <p><b>C est la réponse d'un financier</b>, et elle tient en deux clauses. La <b>marque blanche</b> neutralise l'ancrage : ton prix public reste intact puisque ton nom n'apparaît pas. Le <b>paiement comptant</b> transforme une commande à marge faible en opération de trésorerie — tu vends moins cher, mais tu encaisses tout de suite au lieu de financer 60 jours. <b>Quand on ne peut pas gagner sur le prix, on gagne sur les termes.</b></p>`,
 grid:[
  "Avoir raisonné en marge sur coûts VARIABLES, pas en marge nette.",
  "Avoir chiffré le coût d'opportunité de la capacité mobilisée.",
  "Avoir vu l'effet d'ANCRAGE sur tes prix futurs — le coût invisible.",
  "Avoir cherché à négocier les TERMES (délai, marque, exclusivité) faute de prix."
 ]},

{id:"n1cession", lvl:1, type:"choice", ch:5, icon:"💼", title:"On veut racheter ta boîte",
 concept:"Valorisation · multiple · coût d'opportunité personnel", lesson:"a3",
 when:B=>B.month>=30 && B.hist.length>24,
 signal:"Un groupe régional a racheté deux ateliers comme le tien en dix-huit mois. Tu étais sur leur liste.",
 setup:B=>{
   const eb=B.hist.slice(-12).reduce((t,h)=>t+h.ebitda,0);
   return `Un groupe te propose de racheter ta boîte.
   <br><br>Ton EBITDA des douze derniers mois : <b>${eur(eb)}</b>. Leur offre : <b>${eur(Math.max(0,eb*3.5))}</b>, soit <b>3,5×</b>.
   <br><br>Ils veulent que tu restes trois ans, avec <b>30 % du prix en earn-out</b> conditionné aux résultats.
   <br><br>Ta trésorerie : <b>${eur(B.cash)}</b>.`;
 },
 options:[
  {k:"A", label:"Tu vends aux conditions proposées", term:"Tu encaisses 70 % maintenant, le reste si les objectifs tombent.", q:1},
  {k:"B", label:"Tu refuses et tu continues seul", term:"Tu gardes 100 % de ce que tu construis.", q:1},
  {k:"C", label:"Tu négocies : plus de cash à la signature, earn-out réduit", term:"Tu déplaces le risque chez eux.", q:2},
  {k:"D", label:"Tu mets en concurrence : tu appelles deux autres acquéreurs", term:"Tu retardes, tu crées de la tension.", q:2}
 ],
 apply:(B,k)=>{
   const eb=B.hist.slice(-12).reduce((t,h)=>t+h.ebitda,0);
   if(k==="A"){ B.offerTaken=Math.max(0,eb*3.5); }
   if(k==="C"){ B.offerTaken=Math.max(0,eb*3.35); B.negotiated=true; }
   if(k==="D"){ B.offerTaken=Math.max(0,eb*4.1); B.negotiated=true; }
   if(k==="B"){ B.refusedExit=true; }
 },
 debrief:(B,k)=>`
  <p><b>Un multiple ne se juge jamais dans l'absolu.</b> 3,5× l'EBITDA, c'est cher ou bon marché selon une seule chose : <b>ce que la boîte vaut sans toi</b>. Si tout repose sur ta personne — tes clients, ton tour de main, tes relations fournisseurs — l'acheteur n'achète pas une entreprise, il achète un emploi qu'il devra financer. C'est exactement pour ça qu'il exige que tu restes trois ans.</p>
  <p><b>L'earn-out est un aveu, et il faut savoir le lire.</b> Mettre 30 % du prix sous condition, ça veut dire : « je ne crois pas complètement à vos chiffres futurs ». C'est un partage du risque, et c'est légitime — mais attention au piège : pendant ces trois ans, <b>ce n'est plus toi qui pilotes</b>. Ils contrôlent les charges, les investissements, l'affectation des coûts communs. Tu as accepté d'être payé sur un résultat que quelqu'un d'autre fabrique.</p>
  <p><b>D est la meilleure réponse, et c'est aussi la moins confortable.</b> Un seul acheteur, c'est un prix. Deux acheteurs, c'est un marché. La mise en concurrence est le seul levier qui déplace vraiment une valorisation — plus que tous les arguments sur la qualité de ton fonds de commerce. C'est le BATNA, encore : ton pouvoir ne vient pas de ce que tu dis, il vient de ce que tu peux faire d'autre.</p>
  <p><b>Et la question qu'on oublie : vendre pour aller où ?</b> Une cession n'est pas une réussite en soi. Le prix ne se compare pas à zéro, il se compare à ce que la boîte t'aurait rapporté en la gardant — c'est-à-dire à la somme actualisée de tes résultats futurs. Refuser une offre correcte n'est pas de l'orgueil si tu as calculé cette comparaison. C'en est si tu ne l'as pas faite.</p>`,
 grid:[
  "Avoir demandé ce que la boîte vaut SANS toi — c'est ce qui fixe le multiple.",
  "Avoir vu que l'earn-out te paie sur un résultat que tu ne contrôleras plus.",
  "Avoir cherché à mettre en concurrence avant de discuter le prix.",
  "Avoir comparé le prix à la valeur de la garder, pas à zéro."
 ]}

];
