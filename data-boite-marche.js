// LE CLOSING — LA BOÎTE : LES CHOCS DE MARCHÉ.
// Ajouté le 2026-09-21, sur « mets plus de challenge, d'imprévisible ».
//
// Règles d'écriture de ce deck, à respecter si on l'enrichit :
// 1. ASYMÉTRIQUE. Un bruit symétrique n'apprend rien : il s'annule.
//    Ici certains chocs sont des aubaines, d'autres coûtent cher, et
//    ils n'ont ni la même probabilité ni la même ampleur.
// 2. AUCUN SIGNAL PRÉALABLE. C'est la promesse écrite du niveau 2.
//    Il découvre le choc le mois où il tombe, comme dans la vraie vie.
// 3. BEAUCOUP TOUCHENT bM — la SENSIBILITÉ AU PRIX. C'est le cœur :
//    quand bM monte, la clientèle compare, l'élasticité grimpe et le
//    prix optimal DESCEND. Quand bM baisse, il peut monter ses prix.
//    Un choc qui ne bougerait que les volumes ne ferait pas réfléchir.
// 4. Le texte dit ce qu'un patron VOIT dans la presse ou chez ses
//    clients — jamais le multiplicateur. À lui de le mesurer.
//
// Champs : {id, ic, titre, lvl, duree (mois), aM (taille du marché),
//           bM (sensibilité au prix), when(B), texte(B), fin, apply(B)}

const MKT_CHOCS = [

{id:"lowcost", ic:"🏬", titre:"Un low-cost s'installe en face", lvl:1, duree:14, aM:.88, bM:1.38,
 when:B=>B.month>=6,
 texte:B=>"Une enseigne nationale ouvre à deux rues. Mêmes références, 20 % moins cher, et un prospectus dans toutes les boîtes aux lettres. Tes clients ne partent pas tous — mais ils regardent l'étiquette pour la première fois.",
 fin:"Le low-cost d'en face a fermé son rayon : tes clients arrêtent de comparer aussi systématiquement."},

{id:"influenceur", ic:"📣", titre:"Quelqu'un a parlé de toi", lvl:1, duree:3, aM:1.48, bM:.82,
 when:B=>B.month>=5,
 texte:B=>"Un compte suivi par 200 000 personnes a publié ta photo. Le téléphone sonne, on vient de loin, et personne ne discute le prix. Ça ne durera pas — la question est ce que tu en fais avant que ça retombe.",
 fin:"La vague est passée. Les curieux ne reviennent pas ; ceux que tu as bien servis, si."},

{id:"matiere", ic:"⛽", titre:"Ta matière première s'envole", lvl:1, duree:1,
 when:B=>B.month>=7,
 texte:B=>"Le cours de ton intrant principal a pris 22 % en trois semaines, et ton fournisseur applique dès la prochaine commande. Ton coût de revient passe de "+B.mc.toFixed(2)+" € à "+(B.mc*1.22).toFixed(2)+" €. Personne ne te rendra cette marge : soit tu la répercutes, soit tu la manges.",
 apply:B=>{ B.mc*=1.22; }},

{id:"norme", ic:"📋", titre:"Une nouvelle norme t'est imposée", lvl:1, duree:1,
 when:B=>B.month>=10 && B.cash>4000,
 texte:B=>{const c=Math.round(Math.min(B.cash*.35, B.fc*1.8)/100)*100;
   return "Mise aux normes obligatoire sous six mois : "+eur(c)+" à sortir maintenant, et "+eur(Math.round(c/48))+" par mois d'entretien ensuite. Aucune recette en face. C'est le genre de dépense qui ne se négocie pas et qui ne rapporte rien.";},
 apply:B=>{ const c=Math.round(Math.min(B.cash*.35, B.fc*1.8)/100)*100;
   B.cash-=c; B.capex=(B.capex||0)+c; B.amortM=(B.amortM||0)+c/48; B.fc+=c/48; }},

{id:"clientdepot", ic:"💀", titre:"Ton meilleur client dépose le bilan", lvl:1, duree:6, aM:.90,
 when:B=>B.b2b && B.ar>800 && B.month>=9,
 texte:B=>"Redressement judiciaire prononcé. Tu es créancier chômirographaire, ce qui veut dire en bas de la pile : tu reverras peut-être "+eur(Math.round(B.ar*.10))+" sur les "+eur(Math.round(B.ar*.45))+" qu'il te devait, dans deux ans. Et son volume disparaît de ton carnet.",
 fin:"Tu as reconstitué le volume perdu ailleurs.",
 apply:B=>{ const perte=Math.round(B.ar*.45); B.ar-=perte; B.reserves-=perte; B.badDebt=(B.badDebt||0)+perte; }},

{id:"greve", ic:"🚛", titre:"Grève des transporteurs", lvl:1, duree:2, aM:.72,
 when:B=>B.month>=6,
 texte:B=>"Blocage des dépôts. Tes livraisons sortent au compte-gouttes pendant que tes charges fixes, elles, tombent normalement. Rien à décider : il faut tenir, et le point mort ne fait pas de pause.",
 fin:"Les dépôts sont débloqués, les livraisons repartent."},

{id:"concurrentferme", ic:"🔒", titre:"Ton concurrent historique ferme", lvl:1, duree:12, aM:1.22, bM:.90,
 when:B=>B.month>=12,
 texte:B=>"Départ en retraite sans repreneur. Sa clientèle se répartit, et elle est moins regardante sur le prix que la tienne — elle n'a plus de point de comparaison. Ta capacité de production, elle, n'a pas bougé d'un pouce.",
 fin:"Un repreneur a rouvert la boutique : la parenthèse est refermée."},

{id:"hautdegamme", ic:"🥂", titre:"Le marché monte en gamme", lvl:2, duree:16, aM:.94, bM:.74,
 when:B=>B.month>=10,
 texte:B=>"Le mouvement est net depuis deux saisons : moins de clients, mais ils cherchent mieux et acceptent de payer pour ça. Ton prix actuel de "+B.price.toFixed(2)+" € a été fixé pour un marché qui n'existe plus tout à fait.",
 fin:"L'effet de mode s'essouffle, la clientèle redevient regardante."},

{id:"guerreprix", ic:"⚔️", titre:"Guerre des prix dans le secteur", lvl:2, duree:6, bM:1.52, aM:.96,
 when:B=>B.month>=8,
 texte:B=>"Deux gros acteurs se livrent une bataille de promotions et entraînent tout le monde. La moindre différence d'étiquette se voit. Suivre, c'est nourrir la guerre ; ne pas suivre, c'est perdre du volume — et les deux se paient.",
 fin:"La guerre des prix s'arrête : les clients redeviennent moins sensibles à l'étiquette."},

{id:"presse", ic:"📰", titre:"Un article qui fait mal", lvl:2, duree:5, aM:.86, bM:1.15,
 when:B=>B.month>=11,
 texte:B=>"Un journal local publie un papier sévère sur ton secteur. Tu n'es pas nommé, mais le soupçon rejaillit et tes clients demandent des garanties qu'ils ne demandaient pas. La réputation se perd plus vite qu'elle ne se construit.",
 fin:"L'article est oublié : ta réputation est revenue à son niveau.",
 apply:B=>{ B.rep=Math.max(.65,B.rep*.88); }},

{id:"penurie", ic:"📦", titre:"Pénurie chez ton fournisseur", lvl:2, duree:4,
 when:B=>B.month>=9,
 texte:B=>"Approvisionnement rationné et report sur un fournisseur de secours, plus cher de 15 %. Ton coût de revient passe à "+(B.mc*1.15).toFixed(2)+" € le temps que ça dure — et tes concurrents subissent la même chose, ce qui change tout au moment de répercuter.",
 fin:"L'approvisionnement normal est rétabli : ton coût de revient redescend.",
 apply:B=>{ B.mc*=1.15; B.mcPenurie=true; },
 onFin:B=>{ if(B.mcPenurie){ B.mc/=1.15; B.mcPenurie=false; } }},

{id:"indexation", ic:"🏠", titre:"Le loyer est indexé", lvl:1, duree:1,
 when:B=>B.month>=13,
 texte:B=>"Révision annuelle du bail : tes charges fixes passent de "+eur(B.fc)+" à "+eur(Math.round(B.fc*1.09))+" par mois. Définitif. Ton point mort vient de monter, et personne ne t'a demandé ton avis.",
 apply:B=>{ B.fc=Math.round(B.fc*1.09); }},

{id:"subvention", ic:"🎁", titre:"Une aide que tu n'attendais plus", lvl:1, duree:1,
 when:B=>B.month>=8,
 texte:B=>{const a=Math.round(B.fc*1.4/100)*100;
   return "Le dossier déposé il y a un an aboutit : "+eur(a)+" versés sur ton compte. De la trésorerie qui ne coûte ni intérêts ni dilution. La tentation sera de la dépenser ; la bonne question est de savoir quel besoin PERMANENT elle finance.";},
 apply:B=>{ const a=Math.round(B.fc*1.4/100)*100; B.cash+=a; B.reserves+=a; }},

{id:"banque", ic:"🏦", titre:"Ta banque se crispe", lvl:2, duree:8, aM:1, bM:1,
 when:B=>B.month>=14 && (B.debt>0 || B.cash<B.fc),
 texte:B=>"Changement de chargé d'affaires, et le nouveau trouve ton dossier « à surveiller ». Ta facilité de caisse est divisée par deux et les agios passent au taux fort. Rien n'a changé dans ta boîte : c'est la perception qui a changé, et elle se paie pareil.",
 fin:"Ton dossier est ressorti de la surveillance : la facilité de caisse est rétablie.",
 apply:B=>{ B.overdraftOk=false; }},

{id:"grossiste", ic:"🤝", titre:"Un grossiste veut te référencer", lvl:2, duree:9, aM:1.34, bM:1.26,
 when:B=>B.month>=12,
 texte:B=>"Il prend du volume et il paie à 75 jours, avec une remise de 12 % sur ton tarif. Ton carnet double, ton BFR aussi, et ta clientèle devient d'un coup beaucoup plus sensible au prix — parce que ce n'est plus la même clientèle.",
 fin:"Le référencement n'a pas été reconduit : le volume retombe, le BFR se dégonfle.",
 apply:B=>{ B.b2b=true; B.b2bShare=Math.min(.75,(B.b2bShare||0)+.35); B.dso=Math.max(B.dso,60); }},

{id:"meteo", ic:"🌡️", titre:"Une saison qui ne ressemble à rien", lvl:1, duree:3, aM:.79,
 when:B=>B.month>=7,
 texte:B=>"Météo aberrante depuis six semaines. Ta saisonnalité habituelle ne veut plus rien dire, tes prévisions non plus, et tu as produit pour une demande qui n'est pas venue. Le stock, lui, est déjà payé.",
 fin:"La saison redevient conforme à ce que tu connais."},

{id:"reprise", ic:"🌤️", titre:"Le pouvoir d'achat repart", lvl:1, duree:7, aM:1.16, bM:.88,
 when:B=>B.month>=9,
 texte:B=>"Hausses de salaires dans le bassin d'emploi et moral en hausse. Les paniers grossissent et on discute moins l'addition. C'est le moment où une hausse de prix passe sans qu'on la remarque — et où presque personne n'ose la faire.",
 fin:"La parenthèse favorable se referme : les clients redeviennent attentifs."}

];
