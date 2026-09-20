// LE CLOSING — LA BOÎTE : deck du NIVEAU 2 « Le patron ».
// Ajouté le 2026-09-20. Le niveau était défini (pitch, résumé, 10 notions)
// mais n'avait AUCUN cas : jouer en niveau 2 servait le deck artisan sur
// 48 mois au lieu de 36. Voilà ce qui manquait.
//
// Le saut de niveau 1 à 2 : on ne décide plus sur un chiffre qu'on te donne,
// on décide sur un chiffre que tu dois CONSTRUIRE. D'où des setups qui
// livrent des composants bruts et jamais le ratio final.

const BIZCASES_N2 = [

{id:"n2flux", lvl:2, type:"choice", ch:3, icon:"🌊", title:"Le mois où tout va bien et la caisse est vide",
 concept:"ΔCash = RN − ΔBFR − CAPEX · le flux contre le résultat", lesson:"b3",
 when:B=>B.level>=2 && B.month>=9 && B.b2b && B.cash < B.fc*2,
 signal:"Ton résultat mensuel est en hausse depuis quatre mois. Ta trésorerie, elle, baisse depuis trois.",
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
 setup:B=>{const eb12=B.hist.slice(-12).reduce((t,h)=>t+h.ebitda,0);
  return `La banque te propose <b>250 000 €</b> sur 5 ans à 4,5 % pour financer ton développement.
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
  {k:"D", label:"Tu prends la moitié du montant", term:"125 000 €, ratio deux fois plus confortable.", q:1}
 ],
 apply:(B,k)=>{
   const eb12=B.hist.slice(-12).reduce((t,h)=>t+h.ebitda,0);
   if(k==="A"){ B.cash+=250000; B.loans.push(mkLoan(250000,.045,60,"Prêt de développement")); B.covenant={max:3,grace:0}; B.capacity*=1.5; }
   if(k==="B"){ B.cash+=250000; B.loans.push(mkLoan(250000,.048,60,"Prêt de développement")); B.covenant={max:3.5,grace:1}; B.capacity*=1.5; }
   if(k==="C"){ B.cash-=Math.min(B.cash*.6,120000); B.capacity*=1.2; B.noDebt=true; }
   if(k==="D"){ B.cash+=125000; B.loans.push(mkLoan(125000,.047,60,"Prêt de développement")); B.covenant={max:3,grace:0}; B.capacity*=1.25; }
 },
 debrief:(B,k)=>{const eb12=B.hist.slice(-12).reduce((t,h)=>t+h.ebitda,0);
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
 setup:B=>{const eb12=B.hist.slice(-12).reduce((t,h)=>t+h.ebitda,0);
  return `Pour passer à l'échelle il te faut <b>600 000 €</b>. Deux propositions sur la table.
   <br><br><b>La banque</b> : 600 000 € sur 7 ans à 5,2 %, garantie personnelle sur ta résidence, covenant à 3,0×.
   <br><br><b>Le fonds</b> : 600 000 € contre <b>30 % du capital</b>. Pas de remboursement, pas de garantie. Un siège au conseil, un droit de veto sur les investissements au-delà de 100 000 €, et une clause de sortie à 7 ans.
   <br><br>Ton EBITDA des 12 derniers mois : <b>${eur(eb12)}</b>. Les boîtes de ton secteur se négocient autour de <b>6× l'EBITDA</b>.
   <br><br>Avant de choisir : que vaut ta boîte aujourd'hui, et que vaudront 30 % dans sept ans si le plan marche ?`;},
 options:[
  {k:"A", label:"La dette bancaire", term:"Tu rembourses, tu gardes 100 % du capital, tu engages ton patrimoine.", q:1},
  {k:"B", label:"Le fonds à 30 %", term:"Pas de dette, pas de garantie, un associé au conseil.", q:0},
  {k:"C", label:"Tu négocies le fonds à 18 % avec un BSA de rattrapage", term:"Moins de dilution tout de suite, un complément si le plan n'est pas tenu.", q:2},
  {k:"D", label:"Tu montes 300 000 € de dette et tu lèves le reste plus tard", term:"Tu fais la moitié du chemin et tu te redonnes le choix.", q:1}
 ],
 apply:(B,k)=>{
   if(k==="A"){ B.cash+=600000; B.loans.push(mkLoan(600000,.052,84,"Prêt bancaire 7 ans")); B.covenant={max:3,grace:0}; B.cautionPerso=true; B.capacity*=1.8; }
   if(k==="B"){ B.cash+=600000; B.capital+=600000; B.equityIn=(B.equityIn||0)+600000; B.dilution=.30; B.board=true; B.capacity*=1.8; }
   if(k==="C"){ B.cash+=600000; B.capital+=600000; B.equityIn=(B.equityIn||0)+600000; B.dilution=.18; B.bsa=true; B.board=true; B.capacity*=1.8; }
   if(k==="D"){ B.cash+=300000; B.loans.push(mkLoan(300000,.052,84,"Prêt bancaire 7 ans")); B.capacity*=1.4; }
 },
 debrief:(B,k)=>{const eb12=B.hist.slice(-12).reduce((t,h)=>t+h.ebitda,0);
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
 setup:B=>`Ton concurrent direct est à vendre. Le vendeur annonce <b>« 1,8 million, c'est le prix »</b>.
   <br><br>Ce qu'il te montre : CA <b>2 400 000 €</b> · EBITDA <b>300 000 €</b> · résultat net <b>140 000 €</b>.
   <br><br>Ce qu'il te donne quand tu insistes : dette bancaire <b>420 000 €</b> · trésorerie <b>60 000 €</b> · un litige prud'homal en cours, provisionné à <b>0 €</b>.
   <br><br>Dans le secteur, les transactions récentes se font entre <b>5× et 7× l'EBITDA</b>.
   <br><br>Avant de répondre : à quoi s'applique le multiple — au prix des actions, ou à autre chose ?`,
 options:[
  {k:"A", label:"Tu offres 1,5 M€ : 5× l'EBITDA", term:"Tu ancres bas sur le bas de la fourchette.", q:0},
  {k:"B", label:"Tu offres 1,44 M€ pour les titres", term:"6× l'EBITDA en valeur d'entreprise, moins la dette nette.", q:2},
  {k:"C", label:"Tu acceptes 1,8 M€ : c'est dans la fourchette", term:"6× l'EBITDA, le vendeur a fait son calcul.", q:-1},
  {k:"D", label:"Tu offres 1,3 M€ avec 300 k€ d'earn-out", term:"Tu paies moins tout de suite, le solde si l'EBITDA tient.", q:2}
 ],
 apply:(B,k)=>{
   if(k==="A"){ B.offerRejected=true; B.rep=Math.max(.7,B.rep-.03); }
   if(k==="B"){ B.acquired=true; B.cash-=Math.min(B.cash,300000); B.loans.push(mkLoan(1140000,.05,84,"Dette d'acquisition")); B.demandMult*=1.75; B.fc+=14000; B.goodwill=(B.goodwill||0)+600000; }
   if(k==="C"){ B.acquired=true; B.cash-=Math.min(B.cash,400000); B.loans.push(mkLoan(1400000,.05,84,"Dette d'acquisition")); B.demandMult*=1.75; B.fc+=14000; B.goodwill=(B.goodwill||0)+950000; B.overpaid=true; }
   if(k==="D"){ B.acquired=true; B.cash-=Math.min(B.cash,250000); B.loans.push(mkLoan(1050000,.05,84,"Dette d'acquisition")); B.earnout=300000; B.demandMult*=1.7; B.fc+=14000; B.goodwill=(B.goodwill||0)+520000; }
 },
 debrief:(B,k)=>`
  <p><b>Le piège est dans la première ligne de l'annonce, et presque tout le monde tombe dedans.</b> Un multiple d'EBITDA donne une <b>valeur d'entreprise</b> — la valeur de l'outil, indépendamment de qui l'a financé. Le prix que tu paies pour les <i>actions</i>, lui, vaut : valeur d'entreprise − dette nette. Ici : 6 × 300 000 = 1 800 000 € de VE, moins (420 000 − 60 000) = 360 000 € de dette nette, soit <b>1 440 000 € pour les titres</b>. Le vendeur t'a annoncé sa VE en te laissant croire que c'était son prix. Ce n'est pas de la malhonnêteté, c'est du métier.</p>
  <p><b>Accepter 1,8 M€, c'est donc payer 7,2× l'EBITDA sans l'avoir décidé</b> — le haut de la fourchette du secteur, pour une boîte dont tu ne sais encore rien. C'est l'erreur la plus coûteuse de tout ce cas, et c'est aussi la plus discrète : tu es resté « dans la fourchette », sauf que tu n'étais pas dans la bonne unité.</p>
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
   if(k==="A"){ B.fc-=7500; B.demandMult*=.72; B.rep=Math.max(.5,B.rep-.12); B.keyManLost=true; }
   if(k==="B"){ B.fc-=0; B.synergiesLate=true; }
   if(k==="C"){ B.fc-=3200; B.mc*=.94; B.demandMult*=.97; }
   if(k==="D"){ B.fc-=5200; B.fc+=1400; B.demandMult*=.93; B.keyMan=true; }
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
 ]}

];
