// LE CLOSING — Masterclass sectorielles
// L'équivalent condensé de plusieurs heures d'audition d'un grand opérateur du secteur.
// SYNTHÈSES distillées (pas de citations inventées) : structure économique réelle, vérités
// contre-intuitives, modèles mentaux, et lecture d'investisseur. Format : {id, domain, icon, tag,
// title, read[], insights[], numbers[], invest, questions:[{q,opts,a,exp}]}
const MASTERCLASS = [
{
id:"oil", domain:"Énergies fossiles", icon:"🛢️", tag:"Pétrole & Gaz", title:"Le pétrolier",
read:[
"Comprends d'abord ceci : le pétrole n'est pas une industrie de production, c'est une industrie de DÉPLÉTION. Chaque baril que tu vends, tu dois le remplacer — sinon tu liquides lentement ton entreprise en la faisant passer pour un profit. Le vrai indicateur d'un major n'est donc pas son bénéfice, mais son taux de renouvellement des réserves (reserve replacement ratio) : en dessous de 100 %, il rétrécit, quoi qu'en dise le compte de résultat. C'est une entreprise qui doit courir juste pour rester immobile.",
"Deuxième vérité : personne dans ce secteur ne fixe son prix. Le brut est une commodité mondiale cotée à la seconde ; qu'ExxonMobil produise à 15 $ le baril ou qu'un pétrolier de schiste américain produise à 45 $, tous vendent au même cours. La seule variable que tu contrôles, c'est ton coût. D'où l'obsession du secteur pour le coût technique complet par baril : celui qui produit le moins cher survit aux creux qui tuent les autres. Le pétrole est un jeu de coûts déguisé en jeu de croissance.",
"Troisième niveau, le plus subtil : le cycle du capital. Quand le prix monte, tout le monde investit dans de nouveaux forages — mais un projet offshore met 5 à 10 ans à produire. Le pétrole arrive donc massivement… juste quand la demande faiblit, et le prix s'effondre. Puis plus personne n'investit, l'offre se tarit, le prix repart. Les fortunes se font en investissant au CREUX, quand les capex sont coupés et que tout le monde déteste le secteur — jamais au sommet de l'euphorie. Le capital afflue toujours au pire moment.",
"Enfin, l'éléphant dans la pièce : la valeur terminale. Combien vaut une entreprise dont le produit est censé décliner dans 20-30 ans ? Le marché ne sait pas trancher, et c'est ce qui crée l'opportunité comme le piège. Les majors le savent : c'est pour ça qu'ils rendent massivement du cash aux actionnaires (dividendes, rachats) plutôt que d'investir à 30 ans — ils gèrent une rente en déclin, pas une croissance. Un pétrolier qui promet la croissance ment ; un pétrolier qui promet du cash discipliné dit la vérité."
],
insights:[
"Le renouvellement des réserves > le bénéfice. Un profit record avec un ratio sous 100 %, c'est de la liquidation déguisée.",
"Price taker absolu : ta seule arme est ton coût par baril. Le bas de la courbe de coûts survit toujours.",
"Le cycle du capital est ton horloge : on achète quand les capex sont coupés et le secteur détesté, jamais dans l'euphorie.",
"La discipline de capital (rendre le cash) vaut mieux que la croissance dans une industrie en déplétion — méfie-toi du major qui veut 'croître'."
],
numbers:[
"Coût technique complet : ~15-25 $/baril (Moyen-Orient, majors) vs 40-60 $ (schiste, offshore profond)",
"Un mégaprojet offshore : 5-10 ans entre décision et premier baril",
"Reserve replacement ratio : >100 % = sain ; <100 % = l'entreprise rétrécit"
],
invest:"Regarde le coût par baril (position sur la courbe de coûts mondiale), le reserve replacement ratio, et la discipline de capital (rend-il le cash ou le brûle-t-il en projets longs ?). Le cycle prime sur l'entreprise : le meilleur pétrolier acheté au sommet perd de l'argent ; le médiocre acheté au creux en gagne.",
questions:[
{q:"Pourquoi le taux de renouvellement des réserves est-il plus révélateur que le bénéfice ?", opts:["Il est plus facile à calculer","Le pétrole est une industrie de déplétion : sans remplacer les barils vendus, l'entreprise se liquide en affichant des profits","Il détermine le dividende","Il est exigé par l'OPEP"], a:1, exp:"Vendre un baril sans le remplacer, c'est convertir un actif en 'profit'. Un ratio durablement sous 100 % signale une entreprise qui rétrécit — le compte de résultat ne le montre pas."},
{q:"Quand se font les fortunes dans le pétrole, selon le cycle du capital ?", opts:["Au sommet, quand les prix sont hauts","Au creux, quand les capex sont coupés et le secteur détesté — l'offre future va se tarir","À tout moment, c'est aléatoire","Uniquement via les dividendes"], a:1, exp:"Les projets mettent des années à produire : investir au sommet fait arriver le pétrole quand la demande faiblit. Le contre-cyclique gagne."}
]
},
{
id:"airlines", domain:"Aviation", icon:"✈️", tag:"Compagnies aériennes", title:"L'aviateur",
read:[
"Warren Buffett a un jour dit que si un capitaliste avait été présent à Kitty Hawk en 1903, il aurait rendu service à l'humanité en abattant l'avion des frères Wright — tant l'aviation a détruit de capital depuis. Ce n'est pas de la provocation, c'est de l'analyse. Comprends pourquoi, et tu comprends ce qu'est une mauvaise industrie.",
"Le siège d'avion est la commodité parfaite : vide au décollage, il vaut zéro pour toujours — un stock qui pourrit en temps réel. Les coûts sont à 80 % fixes (l'avion vole plein ou vide, il coûte pareil) et gigantesques : kérosène (que tu ne contrôles pas), avions (des dizaines de milliards de dette), personnel (souvent syndiqué). Résultat : une compagnie doit remplir ses avions à ~80 % juste pour ne pas perdre d'argent. Les deux métriques du métier disent tout : le RASM (revenu par siège-mile) doit dépasser le CASM (coût par siège-mile), et l'écart est minuscule.",
"Pire : la demande est violemment cyclique (le voyage est la première dépense coupée en récession) et le capital afflue sans cesse — dès qu'une route est rentable, un concurrent l'attaque, et comme personne ne peut se différencier vraiment (un vol Paris-New York est un vol Paris-New York), la guerre se fait sur le prix. La faillite est endémique : aux États-Unis, presque toutes les grandes compagnies ont fait faillite au moins une fois, parfois plusieurs.",
"Alors comment certains gagnent-ils de l'argent ? Deux modèles. Le low-cost discipliné (Ryanair, Southwest) : une seule flotte d'avions (maintenance et formation simplifiées), point-à-point plutôt que hub, rotation rapide au sol, et une obsession maniaque du coût — le CASM le plus bas gagne, exactement comme le pétrolier. Et le hub premium sur le long-courrier, où les sièges avant (business/first) font l'essentiel du profit sur un vol dont l'arrière est à peine rentable. Le vrai business, souvent, c'est le programme de fidélité (les miles), une machine à cash vendue aux banques via les cartes co-brandées — parfois plus rentable que le transport lui-même."
],
insights:[
"Le siège invendu vaut zéro pour toujours : c'est le stock le plus périssable qui existe. D'où l'obsession du taux de remplissage.",
"Coûts 80 % fixes + commodité + cyclicité + capital abondant = destruction structurelle de capital. La faillite est la norme, pas l'accident.",
"Le seul avantage durable est le coût (modèle low-cost mono-flotte) — RASM > CASM, avec un écart minuscule.",
"Le profit réel se cache souvent ailleurs : cabine avant sur le long-courrier, et surtout le programme de miles vendu aux banques."
],
numbers:[
"Point mort : ~80 % de taux de remplissage (load factor)",
"Marges nettes du secteur : 2-6 % les BONNES années, négatives en récession",
"Coûts fixes : ~80 % de la structure ; le kérosène = 20-35 % selon le prix du brut"
],
invest:"Méfie-toi par principe. Si tu regardes le secteur, cherche le CASM le plus bas (low-cost discipliné), un bilan qui survit à 18 mois sans revenus (le stress-test COVID), et la valeur cachée du programme de fidélité. Ne confonds jamais un bon trimestre (cycle haut, kérosène bas) avec une bonne entreprise.",
questions:[
{q:"Pourquoi le siège d'avion est-il décrit comme 'le stock le plus périssable qui existe' ?", opts:["Il se casse souvent","Invendu au décollage, il vaut zéro définitivement — impossible à stocker ou revendre","Il coûte cher à fabriquer","Il perd de la valeur avec l'inflation"], a:1, exp:"Contrairement à un produit invendu qu'on écoule plus tard, un siège vide au décollage est une perte sèche et irrécupérable. D'où le point mort à ~80 % de remplissage."},
{q:"Où se cache souvent le vrai profit d'une grande compagnie aérienne ?", opts:["Dans la classe économique","Dans le programme de fidélité (miles) vendu aux banques, et la cabine avant du long-courrier","Dans le fret uniquement","Dans les taxes d'aéroport"], a:1, exp:"Les miles co-brandés avec les cartes bancaires sont une machine à cash à haute marge, parfois plus rentable que le transport lui-même — un actif financier déguisé en programme de fidélité."}
]
},
{
id:"semi", domain:"Semi-conducteurs", icon:"🔬", tag:"Puces", title:"Le fondeur",
read:[
"Le semi-conducteur est l'industrie la plus capitalistique de l'histoire humaine, et la plus stratégique. Une usine de pointe (une 'fab') coûte aujourd'hui 20 à 40 milliards de dollars et sera obsolète dans 5 ans. Peu d'entreprises au monde peuvent se le permettre — c'est ce qui crée le monopole le plus puissant de l'économie moderne : TSMC fabrique l'essentiel des puces les plus avancées de la planète, et personne ne peut le rattraper sans dépenser des centaines de milliards ET rattraper 20 ans de savoir-faire tacite.",
"Comprends la scission fondamentale du secteur, née dans les années 1990. Avant, une entreprise concevait ET fabriquait ses puces (modèle 'intégré', celui d'Intel). Puis est apparu le modèle 'fabless' : des entreprises comme Nvidia ou Apple CONÇOIVENT les puces mais ne possèdent aucune usine — elles sous-traitent la fabrication à TSMC. Ce découplage a tout changé : les concepteurs captent la marge du design (la propriété intellectuelle), le fondeur capte la marge de la fabrication (le capital), et Intel — qui a voulu tout garder — s'est fait dépasser sur les deux fronts. La leçon stratégique : dans une industrie hyper-capitalistique, la spécialisation bat l'intégration.",
"La loi de Moore (le doublement de la densité des transistors tous les ~2 ans) n'est pas qu'une prouesse technique : c'est un modèle économique. Elle impose une course où celui qui prend un nœud de retard perd ses clients pour une génération entière — et où chaque nouvelle génération coûte exponentiellement plus cher à développer. C'est pourquoi le nombre d'acteurs capables de rester à la pointe se réduit à chaque génération : ils étaient des dizaines, ils sont trois (TSMC, Samsung, et Intel qui lutte).",
"Enfin, la cyclicité brutale. La demande de puces amplifie les cycles économiques (effet 'coup de fouet' : une petite variation de la demande finale provoque d'énormes variations de commandes en amont), et comme les fabs se décident des années à l'avance, le secteur oscille entre pénurie (prix qui explosent, comme en 2021) et surcapacité (effondrement). Ajoute la géopolitique : les puces sont devenues l'enjeu stratégique n°1 entre les États-Unis et la Chine, Taïwan concentrant un risque mondial. C'est une industrie où l'économique et le géopolitique ne se distinguent plus."
],
insights:[
"La barrière à l'entrée ultime : une fab de pointe = 20-40 Md$ + 20 ans de savoir-faire tacite. Le monopole le plus profond de l'économie (TSMC).",
"Fabless vs intégré : séparer conception (marge d'IP) et fabrication (marge de capital) a battu le modèle tout-en-un d'Intel. Spécialisation > intégration.",
"La loi de Moore est un darwinisme : un nœud de retard = une génération de clients perdue. Le nombre d'acteurs de pointe se réduit à chaque cycle.",
"Cyclicité amplifiée (effet coup de fouet) + géopolitique : l'analyse économique et le risque pays sont indissociables (Taïwan)."
],
numbers:[
"Une fab de pointe : 20-40 Md$, obsolète en ~5 ans",
"TSMC : >90 % des puces les plus avancées (nœuds ≤5nm)",
"R&D + capex d'un leader : des dizaines de Md$/an, en hausse à chaque génération"
],
invest:"Distingue les trois couches : les concepteurs (Nvidia, marge d'IP, valos élevées), les fondeurs (TSMC, marge de capital, moat physique), et les fournisseurs d'équipements (ASML et son monopole sur la lithographie EUV — souvent le plus beau moat de tous). Intègre toujours le cycle (achète en bas de cycle de surcapacité) et le risque géopolitique de Taïwan.",
questions:[
{q:"Pourquoi le modèle 'fabless' a-t-il battu le modèle intégré d'Intel ?", opts:["Il est plus ancien","Séparer conception (marge d'IP) et fabrication (marge de capital) permet à chacun de se spécialiser et d'investir à fond ; vouloir tout garder disperse les ressources","Il évite les impôts","Il est imposé par la loi"], a:1, exp:"Dans une industrie où chaque fab coûte des dizaines de milliards, la spécialisation l'emporte : Nvidia capte l'IP, TSMC capte le capital, Intel s'est fait distancer sur les deux."},
{q:"Qu'est-ce qui crée la barrière à l'entrée quasi infranchissable de TSMC ?", opts:["Des brevets sur le silicium","Le coût d'une fab de pointe (20-40 Md$) COMBINÉ à ~20 ans de savoir-faire tacite impossible à acheter","Un accord avec l'OPEP","Sa marque grand public"], a:1, exp:"L'argent seul ne suffit pas : même en dépensant des centaines de milliards, il faudrait rattraper deux décennies d'apprentissage industriel accumulé. C'est le moat le plus profond de l'économie."}
]
},
{
id:"pharma", domain:"Pharmacie", icon:"💊", tag:"Pharma & Biotech", title:"Le laboratoire",
read:[
"La pharma est une industrie d'options financières déguisée en science. Chaque molécule en développement est un pari : ~90 % des médicaments qui entrent en essais cliniques échouent, mais celui qui réussit peut rapporter des dizaines de milliards. Tu ne valorises donc pas une pharma comme une usine, mais comme un portefeuille de billets de loterie très chers — chacun avec sa probabilité de succès et son gain potentiel. Le métier, c'est la gestion de ce portefeuille de risques.",
"Le cœur du modèle, c'est le brevet : ~20 ans de monopole légal pendant lesquels tu peux fixer ton prix presque librement (surtout aux États-Unis, où il n'y a pas de régulateur de prix unique). Un blockbuster (>1 Md$ de ventes/an) sous brevet est une machine à cash à marge colossale. MAIS le brevet expire, et le jour où il tombe, les génériques arrivent et le prix s'effondre de 80-90 % en quelques mois : c'est le 'patent cliff', la falaise des brevets. Toute la stratégie d'un grand labo consiste à remplir son pipeline pour remplacer les blockbusters qui vont tomber. Un labo se lit à son calendrier d'expiration de brevets, pas à ses ventes actuelles.",
"D'où le rôle central du M&A dans ce secteur : les grands labos, riches en cash mais pauvres en innovation interne, rachètent des biotechs qui ont l'innovation mais pas les moyens de la commercialiser. C'est un écosystème symbiotique : la biotech prend le risque scientifique (et lève du capital-risque), le big pharma achète le succès une fois dé-risqué, à prix fort. La R&D des grands labos est en partie externalisée à Wall Street et au capital-risque.",
"Enfin, la subtilité que personne ne voit venir : le vrai client n'est pas le patient, c'est le PAYEUR (assureurs, États, systèmes de santé). Le pouvoir de fixation des prix dépend entièrement de la structure de paiement du pays. Aux États-Unis (payeurs fragmentés, peu de pouvoir de négociation), les prix sont élevés — c'est là que se fait le profit mondial de l'industrie. En Europe (États acheteurs uniques qui négocient dur), les prix sont bas. Comprendre une pharma, c'est comprendre qui paie, et quel est son pouvoir de dire non."
],
insights:[
"Une pharma = un portefeuille d'options : ~90 % d'échecs cliniques, mais le succès rapporte des dizaines de milliards. On valorise du risque, pas des usines.",
"Le patent cliff gouverne tout : à l'expiration, un blockbuster perd 80-90 % en quelques mois. On lit un labo à son calendrier de brevets.",
"Le M&A est structurel : big pharma (cash, pas d'idées) rachète la biotech (idées, pas de moyens) une fois le risque scientifique levé.",
"Le vrai client est le payeur, pas le patient. Le pouvoir de prix dépend de la fragmentation du système de santé (élevé aux US, faible en Europe)."
],
numbers:[
"Taux d'échec des molécules en essais cliniques : ~90 %",
"Coût de développement d'un médicament approuvé : ~1-2,5 Md$ (échecs inclus)",
"Blockbuster = >1 Md$ de ventes annuelles ; chute post-brevet : -80/-90 % en quelques mois"
],
invest:"Le pipeline et le calendrier des brevets priment sur les ventes actuelles. Évalue : quels blockbusters tombent quand, et qu'y a-t-il pour les remplacer ? Regarde la dépendance à un seul produit (risque de concentration), la solidité du pipeline en phase avancée, et l'exposition aux réformes de prix (surtout US). Le M&A est le moteur — un labo à court de pipeline est un acheteur forcé.",
questions:[
{q:"Qu'est-ce que le 'patent cliff' et pourquoi structure-t-il toute la stratégie pharma ?", opts:["Une taxe sur les brevets","L'expiration du brevet fait chuter le prix d'un blockbuster de 80-90 % en quelques mois (arrivée des génériques) — d'où l'obsession de remplir le pipeline","Une réglementation européenne","Le coût des essais cliniques"], a:1, exp:"Le monopole du brevet est la source du profit ; sa fin est une falaise. Toute la stratégie consiste à faire arriver de nouveaux blockbusters avant que les anciens ne tombent."},
{q:"Qui est le véritable 'client' qui détermine le pouvoir de fixation des prix d'un médicament ?", opts:["Le patient","Le payeur (assureurs, États) — son pouvoir de négociation dépend de la fragmentation du système de santé","Le médecin prescripteur","Le pharmacien"], a:1, exp:"Le prix se négocie avec celui qui paie. Systèmes fragmentés (US) = prix élevés et gros profits ; acheteurs uniques étatiques (Europe) = prix bas. C'est là que se joue la rentabilité mondiale."}
]
},
{
id:"luxe", domain:"Luxe", icon:"👜", tag:"Luxe & Marques", title:"Le maroquinier",
read:[
"Le luxe viole la première loi de l'économie que tu as apprise : normalement, quand le prix monte, la demande baisse. Dans le luxe authentique, c'est l'inverse — augmenter le prix peut AUGMENTER la désirabilité (l'effet Veblen). Un sac Hermès n'est pas cher malgré sa rareté ; il est désirable À CAUSE de sa rareté et de son prix. Comprendre ça, c'est comprendre que le luxe ne vend pas des produits, il vend du statut, de l'appartenance et du rêve — des biens dont la valeur EST le prix.",
"L'actif d'une maison de luxe n'est ni ses usines ni ses boutiques : c'est la DÉSIRABILITÉ de sa marque, un capital immatériel construit sur des décennies, parfois des siècles, et qui peut être détruit en quelques années par la vulgarisation. La règle d'or, contre-intuitive : ne jamais saturer la demande. Une marque qui vend trop, trop facilement, trop de produits d'entrée de gamme, tue lentement ce qui fait sa valeur. La rareté doit être orchestrée (listes d'attente, quotas, refus de vendre) — Hermès pousse cette logique à l'extrême et affiche les plus hautes marges du secteur.",
"D'où l'intégration verticale du modèle moderne (celui de LVMH, Kering, Richemont) : posséder la production (contrôle de la qualité et de l'image), posséder la distribution (les boutiques en propre, jamais laisser un intermédiaire diluer l'expérience), et contrôler chaque point de contact. Le luxe est l'un des rares secteurs où l'on veut TOUT contrôler, précisément parce que la marque est fragile et que chaque détail la nourrit ou l'abîme.",
"Économiquement, c'est un secteur de rêve pour l'investisseur : pricing power réel (on augmente les prix chaque année sans perdre de clients), marges brutes énormes (le coût de fabrication d'un sac à 5 000 € est une fraction du prix), résilience (les très riches consomment même en récession), et croissance structurelle (l'émergence de nouvelles classes aisées mondiales). Le risque n'est pas économique, il est culturel : perdre la désirabilité. Une marque de luxe se juge à sa capacité à rester désirée par la génération suivante."
],
insights:[
"Effet Veblen : dans le luxe, le prix élevé PEUT augmenter la demande. Le prix n'est pas un coût, c'est une partie du produit (le statut).",
"L'actif unique est la désirabilité de la marque : immatérielle, construite sur des décennies, détruisible en quelques années par la sur-vente.",
"Règle d'or contre-intuitive : ne jamais saturer la demande. La rareté s'orchestre (Hermès en est le maître, d'où ses marges records).",
"Intégration verticale totale (production + distribution en propre) parce que la marque est fragile et chaque détail compte."
],
numbers:[
"Marge brute typique d'une grande maison : 60-70 %+ ; marge opérationnelle Hermès : ~40 %",
"Coût de fabrication d'un sac de luxe : souvent <15 % du prix de vente",
"Croissance structurelle portée par les nouvelles classes aisées mondiales (surtout Asie)"
],
invest:"Cherche le pricing power réel (augmente-t-elle ses prix sans perdre de volume ?), la discipline de rareté (résiste-t-elle à la tentation de sur-vendre pour un trimestre ?), et la désirabilité transgénérationnelle. Méfie-toi des marques qui 'démocratisent' — c'est du profit immédiat contre une érosion invisible. Le contrôle de la distribution est un signal de qualité.",
questions:[
{q:"Pourquoi augmenter le prix peut-il AUGMENTER la demande dans le luxe (effet Veblen) ?", opts:["Parce que les coûts montent","Parce que le luxe vend du statut et de la rareté : le prix élevé fait partie de la désirabilité, pas seulement de la valeur d'usage","Parce que l'inflation le justifie","Ce n'est jamais vrai"], a:1, exp:"Un bien de statut tire sa valeur de sa rareté et de son inaccessibilité. Baisser le prix le banaliserait et le rendrait MOINS désirable — l'inverse de la logique normale."},
{q:"Quelle est la 'règle d'or' contre-intuitive de la gestion d'une marque de luxe ?", opts:["Vendre le plus possible","Ne jamais saturer la demande : la rareté s'orchestre, sur-vendre détruit lentement la désirabilité qui fait toute la valeur","Baisser les prix en récession","Externaliser la production"], a:1, exp:"L'actif est la désirabilité. La sur-vente et la banalisation rapportent à court terme mais érodent l'immatériel — Hermès prouve que la retenue maximise la valeur long terme (et les marges)."}
]
},
{
id:"defense", domain:"Défense", icon:"🛡️", tag:"Défense & Aérospatial", title:"Le maître d'œuvre",
read:[
"La défense est une industrie où il n'existe qu'UN client par pays : l'État. Cette singularité change tout. Tu ne fais pas de marketing, tu ne fais pas de prix de marché — tu négocies des programmes avec un acheteur unique, souvent sur des contrats de plusieurs décennies. Un avion de chasse ou un porte-avions se conçoit sur 10-20 ans et se maintient sur 40. La visibilité est donc extraordinaire : le carnet de commandes (backlog) d'un grand du secteur représente plusieurs années de chiffre d'affaires garanti par contrat.",
"Les barrières à l'entrée sont quasi absolues, pour trois raisons qui se cumulent. D'abord la technologie et le capital (concevoir un système d'armes moderne coûte des dizaines de milliards). Ensuite la confiance et le secret (un État ne confie pas sa sécurité à un nouvel entrant ni à un étranger — la souveraineté impose des champions nationaux). Enfin l'expérience accumulée sur les programmes précédents. Résultat : une poignée d'acteurs par pays, des positions quasi inexpugnables, et des relations profondes avec le pouvoir politique.",
"Le modèle économique a une particularité : une grande partie des contrats est en 'cost-plus' (coût + marge garantie) ou à prix négocié avec l'État qui, en tant que client unique et bailleur, absorbe une partie du risque de développement. Cela plafonne la marge (l'État surveille les profits sur l'argent public) mais garantit une rentabilité stable et prévisible — l'opposé exact de l'aviation civile. Le vrai profit récurrent se fait souvent sur le 'sustainment' : la maintenance, les pièces et les mises à niveau sur 40 ans, une rente bien plus juteuse que la vente initiale.",
"Enfin, le moteur de tout : la géopolitique. Le secteur suit les budgets de défense, eux-mêmes dictés par les tensions mondiales. Une période de paix est un vent contraire ; un monde qui se réarme (comme depuis 2022) est un vent structurellement porteur. L'analyste de la défense lit d'abord les tensions géopolitiques, ensuite les comptes. C'est un secteur où le risque politique n'est pas un risque à côté du business : il EST le business."
],
insights:[
"Un seul client par pays (l'État) : pas de marché, mais des programmes négociés sur des décennies. Visibilité extrême (backlog = plusieurs années de CA).",
"Barrières quasi absolues : capital + technologie + confiance/souveraineté (champions nationaux) + expérience. Positions inexpugnables.",
"Cost-plus / prix négocié = marge plafonnée mais stable et prévisible (l'inverse de l'aérien civil). Le vrai profit récurrent est le 'sustainment' (maintenance sur 40 ans).",
"Le moteur est géopolitique : on lit les tensions mondiales avant les comptes. Le réarmement est un vent structurel."
],
numbers:[
"Cycle de vie d'un programme majeur : conception 10-20 ans, service 40 ans+",
"Backlog des grands du secteur : souvent 2-3× le chiffre d'affaires annuel",
"Le 'sustainment' (maintenance/pièces) : souvent plus rentable et récurrent que la vente initiale"
],
invest:"Regarde le backlog (visibilité), l'exposition aux budgets qui montent (géopolitique porteuse), et la part de sustainment récurrent vs ventes ponctuelles. La marge est plafonnée mais la stabilité est exceptionnelle. Le risque : dépendance à un programme unique, et retournement des budgets en cas de détente durable (rare aujourd'hui).",
questions:[
{q:"Qu'est-ce qui donne à l'industrie de défense sa visibilité exceptionnelle ?", opts:["La publicité","Le backlog : des programmes contractés sur des décennies avec l'État, représentant plusieurs années de CA garanti","Les prix de marché","La diversité des clients"], a:1, exp:"Un client unique (l'État) engagé sur des programmes de 10-40 ans crée un carnet de commandes qui donne une visibilité qu'aucune industrie de consommation n'a."},
{q:"Où se trouve souvent le profit le plus récurrent d'un programme d'armement ?", opts:["Dans la vente initiale du système","Dans le 'sustainment' : maintenance, pièces et mises à niveau sur 40 ans","Dans l'export uniquement","Dans les subventions"], a:1, exp:"Vendre l'avion est ponctuel ; le maintenir en condition pendant 40 ans est une rente longue et à haute marge — souvent plus profitable que la vente d'origine."}
]
},
{
id:"banque", domain:"Banque", icon:"🏦", tag:"Banques", title:"Le banquier",
read:[
"Une banque est l'entreprise la plus trompeuse à analyser, parce que son bilan est son produit — et qu'il est presque toujours opaque. Comprends d'abord le métier fondamental : la transformation de maturité. La banque emprunte court (tes dépôts, que tu peux retirer à tout moment) et prête long (crédits immobiliers sur 25 ans). Elle gagne l'écart entre les deux : la marge nette d'intérêt. Ce décalage EST le service qu'elle rend à l'économie — et c'est aussi sa vulnérabilité mortelle (relis SVB : si les déposants courent, la maturité longue à l'actif ne peut pas suivre).",
"Deuxième vérité : une banque est une machine à levier. Là où une entreprise normale a peut-être 1 € de dette pour 1 € de fonds propres, une banque a facilement 10-15 € d'actifs pour 1 € de capital. Ce levier démultiplie le rendement des capitaux propres (ROE) quand tout va bien — mais signifie qu'une perte de quelques pourcents sur ses actifs peut effacer tout son capital. C'est pourquoi les banques sont les entreprises les plus régulées du monde : la société ne peut pas se permettre qu'elles se comportent comme des acteurs normaux.",
"Troisième niveau, le plus important : l'actif réel d'une banque, c'est la CONFIANCE, et elle ne figure sur aucun bilan. Une banque solvable sur le papier peut mourir en 48 heures si ses déposants cessent d'y croire — la ruée bancaire n'attend pas la faillite comptable. À l'ère du mobile banking et des réseaux sociaux, une panique qui prenait des semaines en 1930 prend un après-midi. La qualité d'une banque se mesure donc autant à la stabilité et à la diversité de ses dépôts qu'à ses ratios.",
"Enfin, le piège de l'analyse : le résultat d'une banque dépend massivement des provisions pour créances douteuses — un chiffre que la direction ESTIME. En haut de cycle, on sous-provisionne (les défauts sont rares, les profits paraissent superbes) ; en bas de cycle, les pertes cachées ressortent d'un coup. Une banque qui affiche des profits records en fin de cycle expansionniste est souvent celle qui provisionne le moins — pas celle qui gère le mieux. On juge une banque sur un cycle entier, jamais sur une année."
],
insights:[
"Le métier est la transformation de maturité (emprunter court, prêter long) : la source du profit ET la vulnérabilité mortelle (ruée).",
"Machine à levier (10-15× les fonds propres) : le levier démultiplie le ROE et le risque. D'où la régulation extrême.",
"L'actif réel est la confiance — invisible au bilan. Une banque solvable meurt en 48h si les déposants fuient. La stabilité des dépôts > les ratios.",
"Le résultat dépend des provisions estimées : en haut de cycle on sous-provisionne. On juge une banque sur un cycle entier, pas une année."
],
numbers:[
"Levier bancaire : ~10-15× les fonds propres (vs ~1-2× pour une entreprise normale)",
"Marge nette d'intérêt : quelques points de %, mais démultipliée par le levier",
"Une perte de ~5-7 % sur les actifs peut effacer tout le capital d'une banque"
],
invest:"Regarde la qualité et la diversité des dépôts (stabilité), le niveau de capital (coussin), le coût du risque à travers le cycle (pas juste cette année), et la prudence des provisions. Méfie-toi des ROE spectaculaires en fin de cycle — ils cachent souvent un sous-provisionnement. La confiance est l'actif invisible : une banque se juge sur sa résilience, pas sur son meilleur trimestre.",
questions:[
{q:"Qu'est-ce que la 'transformation de maturité', cœur du métier bancaire ?", opts:["Changer de dirigeants","Emprunter court (dépôts retirables) et prêter long (crédits sur 25 ans), en gagnant l'écart de taux — source du profit et de la vulnérabilité à la ruée","Transformer des devises","Rallonger la durée des prêts"], a:1, exp:"C'est le service rendu à l'économie ET le talon d'Achille : si les déposants retirent leur argent d'un coup, les actifs longs ne peuvent pas être liquidés à temps (cf. SVB)."},
{q:"Pourquoi un ROE record en fin de cycle expansionniste doit-il rendre méfiant ?", opts:["Le ROE est toujours faux","Il reflète souvent un sous-provisionnement (défauts rares en haut de cycle) : les pertes cachées ressortiront au retournement","Les impôts sont plus bas","C'est un bon signe sans réserve"], a:1, exp:"Les provisions sont estimées par la direction. En haut de cycle, sous-provisionner gonfle les profits. On juge une banque sur un cycle complet, jamais sur sa meilleure année."}
]
},
{
id:"assurance", domain:"Assurance", icon:"☂️", tag:"Assurance", title:"L'assureur",
read:[
"L'assurance cache le modèle économique le plus élégant de la finance, et Warren Buffett a bâti une partie de sa fortune en le comprenant mieux que quiconque : le 'float'. Voici l'idée. Tu encaisses les primes de tes assurés AUJOURD'HUI, et tu paieras les sinistres DEMAIN — parfois des années plus tard. Entre les deux, tu détiens et tu investis un énorme matelas d'argent qui ne t'appartient pas mais que tu peux faire fructifier : le float. Une compagnie d'assurance bien gérée, c'est une caisse qui te PAIE pour détenir l'argent des autres et l'investir.",
"La métrique reine est le ratio combiné : (sinistres + frais) / primes encaissées. En dessous de 100 %, tu gagnes de l'argent sur l'activité d'assurance elle-même AVANT même d'investir le float — le graal. Au-dessus de 100 %, tu perds sur l'assurance, mais tu peux quand même être rentable si les revenus de placement du float compensent. La distinction fondamentale que la plupart des gens ratent : une compagnie d'assurance a DEUX moteurs, la souscription (le risque) et l'investissement (le float), et un bon assureur gagne sur les deux.",
"Le vrai métier, c'est la sélection et la tarification du risque. Sous-tarifer pour gagner des parts de marché est le péché mortel du secteur : tu encaisses des primes aujourd'hui pour des sinistres que tu paieras dans 3 ans, quand il sera trop tard pour corriger. Les assureurs qui grandissent le plus vite sont souvent ceux qui tarifent le moins bien — la croissance rapide dans l'assurance est un signal d'alarme, pas de succès. Discipline > volume.",
"Enfin, le risque de queue (tail risk) : l'assurance vit de la loi des grands nombres (des milliers de petits risques indépendants se compensent), mais elle meurt des catastrophes corrélées — un ouragan qui frappe des millions de polices en même temps, une pandémie, un tremblement de terre. D'où la réassurance (l'assurance des assureurs) et l'obsession de la modélisation des événements extrêmes. Un assureur se juge sur sa capacité à survivre à l'année catastrophique, pas à optimiser l'année normale."
],
insights:[
"Le 'float' : encaisser les primes aujourd'hui, payer les sinistres demain, et investir l'argent entre-temps. On est PAYÉ pour détenir l'argent des autres.",
"Ratio combiné < 100 % = profit sur l'assurance avant même d'investir le float. Deux moteurs : souscription (risque) + investissement (float).",
"Sous-tarifer pour croître est le péché mortel : les sinistres arrivent des années plus tard. Croissance rapide = signal d'alarme, pas de succès.",
"Vit de la loi des grands nombres, meurt des catastrophes corrélées (tail risk). On juge un assureur sur sa survie à l'année catastrophe."
],
numbers:[
"Ratio combiné : <100 % = souscription rentable ; le graal est bien en dessous",
"Le float peut représenter plusieurs fois les fonds propres — un levier d'investissement 'gratuit' si la souscription est à l'équilibre",
"Délai primes/sinistres : de quelques mois à plusieurs décennies (assurance long terme)"
],
invest:"Cherche un ratio combiné durablement sous 100 % (discipline de souscription) et une gestion prudente du float. Méfie-toi de la croissance rapide (souvent = sous-tarification). Évalue l'exposition aux catastrophes et la solidité de la réassurance. Un grand assureur gagne sur les deux moteurs à travers le cycle et survit aux années noires.",
questions:[
{q:"Qu'est-ce que le 'float' en assurance ?", opts:["La trésorerie de l'entreprise","L'argent des primes encaissées avant de payer les sinistres, détenu et investi entre-temps — on est payé pour gérer l'argent des autres","Un produit dérivé","La marge de solvabilité"], a:1, exp:"C'est l'insight de Buffett : le décalage entre encaisser les primes et payer les sinistres crée un capital à investir qui n'appartient pas à l'assureur mais le fait fructifier."},
{q:"Pourquoi une croissance rapide est-elle souvent un signal d'alarme en assurance ?", opts:["Elle attire les régulateurs","Elle vient souvent d'une sous-tarification : on encaisse aujourd'hui des primes pour des sinistres payés dans des années, quand il est trop tard","Elle coûte trop cher en marketing","Elle dilue les actionnaires"], a:1, exp:"Le coût réel d'une police n'est connu que des années plus tard. Grandir vite en cassant les prix, c'est acheter des pertes futures — la discipline de tarification prime sur le volume."}
]
},
{
id:"shipping", domain:"Transport maritime", icon:"🚢", tag:"Shipping", title:"L'armateur",
read:[
"Le transport maritime est le cycle du capital à l'état pur, sans le moindre voile — c'est le meilleur cas d'école pour comprendre pourquoi les industries de commodité détruisent et créent des fortunes. Un porte-conteneurs transporte une boîte identique à celle du concurrent : service parfaitement indifférencié, prix (le taux de fret) fixé uniquement par l'offre et la demande de cales disponibles. Aucun pouvoir de prix, jamais.",
"Voici le mécanisme mortel et magnifique. Quand les taux de fret explosent (comme en 2021, où ils ont été multipliés par 5-10), les armateurs gagnent des fortunes et commandent en masse de nouveaux navires. Mais un navire met 2-3 ans à être construit et livré. Donc toute cette capacité arrive sur le marché EN MÊME TEMPS, deux ans plus tard — souvent quand la demande a déjà faibli. Les taux s'effondrent, les armateurs perdent de l'argent, plus personne ne commande, les vieux navires partent à la casse, l'offre se contracte, et les taux finissent par repartir. Le cycle recommence, éternellement.",
"La conséquence pour l'investisseur est brutale et contre-intuitive : dans le shipping, on achète quand les taux sont au plancher, que les armateurs perdent de l'argent et que personne ne commande de navires (l'offre future va se tarir), et on VEND dans l'euphorie où tout le monde gagne des fortunes (l'offre future va exploser). Le carnet de commandes mondial de navires (orderbook) est l'indicateur clé : un orderbook élevé annonce une future surcapacité ; un orderbook au plus bas annonce la prochaine flambée.",
"La leçon dépasse le maritime : c'est la loi de TOUTE industrie de commodité à cycle de capital long (pétrole, mines, mémoire informatique, chimie de base). Le réflexe humain — investir quand ça va bien, fuir quand ça va mal — est exactement l'inverse de ce qui gagne. Le shipping l'enseigne dans sa forme la plus pure, sans marque ni technologie pour brouiller le signal. C'est le laboratoire du contrarien."
],
insights:[
"Commodité pure : service indifférencié, prix fixé par la seule offre/demande de cales. Aucun pouvoir de prix, jamais.",
"Le mécanisme mortel : taux hauts → commandes massives → livraisons 2-3 ans plus tard → surcapacité → effondrement. Et inversement.",
"On achète au plancher (armateurs qui perdent, orderbook vide = offre future qui se tarit), on vend dans l'euphorie (orderbook plein = surcapacité à venir).",
"C'est la loi de TOUTE commodité à cycle long (pétrole, mines, mémoire). Le réflexe humain est exactement l'inverse du geste gagnant."
],
numbers:[
"Délai de construction d'un navire : 2-3 ans (d'où le décalage offre/demande)",
"Taux de fret conteneurs 2021 : ×5 à ×10 vs niveau normal, puis effondrement",
"L'orderbook (carnet de commandes mondial en % de la flotte) : l'indicateur clé du cycle"
],
invest:"Le seul vrai indicateur est le cycle, lu via l'orderbook et les taux de fret. Achète le désespoir (taux au plancher, orderbook vide, casse des vieux navires), vends l'euphorie. Regarde aussi le bilan : un armateur peu endetté survit au creux qui tue les autres — et rachète leurs actifs bradés. Ne confonds jamais un pic de taux avec une bonne entreprise.",
questions:[
{q:"Pourquoi les taux de fret s'effondrent-ils typiquement 2-3 ans après un pic ?", opts:["La demande disparaît soudainement","Les commandes massives de navires passées au pic sont livrées ensemble ~2-3 ans plus tard, créant une surcapacité","Les États régulent les prix","Le carburant baisse"], a:1, exp:"Le délai de construction crée le décalage fatal : la capacité commandée dans l'euphorie arrive sur le marché quand la demande a souvent déjà faibli. C'est le cœur du cycle du capital."},
{q:"Quel indicateur annonce le mieux la prochaine phase du cycle maritime ?", opts:["Le prix du pétrole","L'orderbook (carnet de commandes mondial de navires) : plein = surcapacité à venir ; vide = future flambée","Le taux de change","Le PIB mondial"], a:1, exp:"L'orderbook mesure l'offre future. Un carnet vide signifie que l'offre va se tarir (taux qui vont monter) ; un carnet plein annonce la surcapacité (taux qui vont chuter). On investit à contre-courant de l'euphorie."}
]
},
{
id:"saas", domain:"Logiciel (SaaS)", icon:"💻", tag:"Tech & Software", title:"L'éditeur",
read:[
"Le logiciel est l'inversion la plus radicale de toute l'économie industrielle : son coût marginal est quasi nul. Fabriquer et livrer une copie supplémentaire d'un logiciel ne coûte presque rien. Cette seule caractéristique explique les marges brutes de 80-90 % et les valorisations qui semblent délirantes vues avec les yeux d'un industriel. Mais elle cache un piège : l'essentiel du coût est en amont (développement, acquisition de clients), et il faut des années pour le rentabiliser client par client.",
"Le modèle SaaS (Software as a Service, l'abonnement) a transformé l'économie du secteur. Au lieu de vendre une licence une fois, tu loues l'accès chaque mois. Résultat : des revenus RÉCURRENTS et prévisibles (le rêve de tout financier), mais un coût d'acquisition payé d'avance qu'il faut amortir sur la durée de vie du client. D'où les deux métriques qui gouvernent tout : la LTV (valeur totale d'un client sur sa vie) doit largement dépasser le CAC (coût pour l'acquérir) — un ratio LTV/CAC sain est d'au moins 3. Et le churn (taux d'attrition) est le tueur silencieux : un client qui part avant d'avoir remboursé son coût d'acquisition est une perte sèche.",
"La règle de terrain qui résume la santé d'un SaaS s'appelle la 'règle de 40' : croissance du chiffre d'affaires (%) + marge de cash-flow (%) devrait dépasser 40. Elle capture l'arbitrage fondamental du secteur : tu peux croître vite en brûlant du cash, ou être rentable en croissant lentement, mais la somme des deux doit rester élevée. Une entreprise qui croît à 20 % en brûlant 30 % de cash échoue la règle — elle achète une croissance non rentable.",
"Enfin, le graal : les effets de réseau et les coûts de changement (switching costs). Un logiciel qui devient indispensable au fonctionnement d'une entreprise (le CRM où vivent toutes ses données clients, l'ERP qui fait tourner l'usine) est presque impossible à déloger — changer coûterait des mois de chaos. Cette 'adhérence' (stickiness) crée un pricing power croissant et un revenu quasi éternel. La question à poser sur tout SaaS : que se passe-t-il si le client veut partir ? Si la réponse est 'un cauchemar', tu tiens une machine à cash."
],
insights:[
"Coût marginal quasi nul → marges brutes 80-90 %. Mais coût concentré en amont (dev + acquisition), rentabilisé sur des années.",
"Le SaaS transforme la vente unique en revenu récurrent prévisible. Deux métriques reines : LTV/CAC (>3) et le churn (le tueur silencieux).",
"Règle de 40 : croissance (%) + marge de cash-flow (%) > 40. Croître vite en brûlant trop de cash échoue le test.",
"Le moat ultime : coûts de changement élevés (logiciel indispensable, données captives). La question clé : 'que se passe-t-il si le client veut partir ?'"
],
numbers:[
"Marge brute SaaS : 75-90 %",
"LTV/CAC sain : ≥ 3 ; période de récupération du CAC : idéalement < 12-18 mois",
"Règle de 40 : croissance % + marge de FCF % > 40"
],
invest:"Regarde la récurrence et la qualité des revenus (net revenue retention > 100 % = les clients existants dépensent plus chaque année, le signal le plus fort), le churn, l'unit economics (LTV/CAC), la règle de 40, et surtout les coûts de changement. Méfie-toi de la croissance achetée à perte sans chemin vers la rentabilité — le marché finit toujours par exiger le cash.",
questions:[
{q:"Pourquoi le logiciel a-t-il des marges brutes de 80-90 % ?", opts:["Il est vendu très cher","Son coût marginal est quasi nul : livrer une copie de plus ne coûte presque rien (le coût est en amont, dev + acquisition)","Il n'y a pas de concurrence","Il évite les impôts"], a:1, exp:"Contrairement à un bien physique, dupliquer un logiciel ne consomme quasi aucune ressource. Le défi n'est pas de produire mais d'amortir le coût initial de développement et d'acquisition client."},
{q:"Que capture la 'règle de 40' d'un SaaS ?", opts:["Le nombre de clients","L'arbitrage croissance / rentabilité : croissance (%) + marge de cash-flow (%) doit dépasser 40","La marge brute minimale","Le taux de churn maximal"], a:1, exp:"Elle mesure si l'entreprise crée de la valeur : on peut croître vite en brûlant du cash OU être rentable en croissant lentement, mais la somme doit rester élevée. Croître en brûlant trop échoue le test."}
]
},
{
id:"mines", domain:"Mines & Métaux", icon:"⛏️", tag:"Matières premières", title:"Le mineur",
read:[
"La mine partage l'ADN du pétrole (commodité, déplétion, cycle du capital), mais avec une brutalité supplémentaire : la teneur du minerai (le grade). Une mine d'or à 5 grammes par tonne est une fortune ; la même à 1 gramme peut être une ruine — pour le même métal, au même prix de vente. La géologie décide de qui survit avant même l'économie. Le premier réflexe du mineur n'est pas le prix du métal, c'est le grade et le coût d'extraction qui en découle.",
"La métrique qui gouverne tout est l'AISC (all-in sustaining cost) : le coût complet pour produire une once ou une tonne, entretien de la mine compris. Comme le pétrolier, le mineur est price taker absolu (le cours du cuivre ou de l'or est mondial) ; sa seule arme est sa position sur la courbe de coûts. Le bas de la courbe traverse les creux qui liquident les producteurs marginaux — et rachète leurs actifs à prix cassé.",
"Le péché récurrent du secteur, documenté sur des décennies : les mineurs détruisent systématiquement du capital en haut de cycle. Quand les prix des métaux flambent, ils regorgent de cash, et ils l'utilisent pour racheter des concurrents à prix d'or ou lancer des méga-projets… qui produiront dans 5-10 ans, quand le cycle aura tourné. L'histoire des grands mineurs est une succession de dépréciations géantes sur des acquisitions faites au sommet. La discipline de capital y est encore plus rare et précieuse que dans le pétrole.",
"Ajoute la 'treadmill' de la déplétion : une mine s'épuise, et les gisements faciles et riches ont déjà été exploités. Les nouvelles mines sont plus profondes, plus pauvres, dans des pays plus risqués, avec des délais d'autorisation qui s'allongent (10-15 ans du gisement à la production). Cette raréfaction structurelle de l'offre nouvelle est l'argument haussier de long terme sur certains métaux — surtout le cuivre, indispensable à l'électrification. Le mineur vit une tension permanente : remplacer ce qu'il épuise coûte toujours plus cher."
],
insights:[
"Le grade (teneur) décide avant le prix : même métal, même cours, mais 5 g/t = fortune et 1 g/t = ruine. La géologie précède l'économie.",
"Price taker absolu : l'arme est l'AISC (coût complet par once/tonne). Le bas de la courbe de coûts survit et rachète les autres au creux.",
"Le péché structurel : détruire du capital en haut de cycle (acquisitions et méga-projets au sommet, dépréciés ensuite). Discipline = rareté précieuse.",
"Treadmill de déplétion : les gisements riches et faciles sont épuisés ; les nouveaux sont plus pauvres, profonds, longs (10-15 ans). Argument haussier long terme (cuivre)."
],
numbers:[
"Délai gisement → production : souvent 10-15 ans (exploration, permis, construction)",
"AISC : le coût complet par once/tonne, comparé au cours mondial",
"Le grade varie d'un facteur 5-10 entre une mine rentable et une mine marginale"
],
invest:"Regarde le grade des gisements, la position sur la courbe de coûts (AISC), et surtout la discipline de capital (rend-il le cash ou le brûle-t-il en acquisitions au sommet ?). Comme le pétrole et le shipping, le cycle prime : on achète le désespoir, on vend l'euphorie. Le cuivre bénéficie d'un vent structurel (électrification) mais reste cyclique.",
questions:[
{q:"Pourquoi le 'grade' (teneur du minerai) peut-il rendre une mine rentable et une autre ruineuse, à prix du métal identique ?", opts:["Le grade change le prix de vente","Extraire le même métal coûte beaucoup plus cher quand la teneur est faible : la géologie détermine le coût avant toute considération de prix","Le grade détermine les taxes","Ce n'est pas un vrai facteur"], a:1, exp:"Traiter une tonne de roche à 1 g/t pour obtenir 1 g d'or coûte bien plus que la traiter à 5 g/t. Le prix de vente est identique (commodité mondiale) ; c'est le coût, dicté par le grade, qui fait la différence."},
{q:"Quel est le 'péché structurel' des mineurs à travers les cycles ?", opts:["Sous-investir en permanence","Détruire du capital en haut de cycle : acquisitions et méga-projets lancés au sommet, produisant quand le cycle a tourné, puis dépréciés","Payer trop de dividendes","Fermer trop de mines"], a:1, exp:"Gorgés de cash au pic, les mineurs surpaient des actifs et lancent des projets longs qui arrivent au mauvais moment. L'histoire du secteur est jalonnée de dépréciations géantes — la discipline de capital y est rare et précieuse."}
]
},
{
id:"retail", domain:"Distribution", icon:"🛒", tag:"Retail", title:"Le distributeur",
read:[
"La grande distribution est un métier de marges minuscules et de volumes gigantesques — l'inverse exact du luxe. Un supermarché gagne peut-être 2-3 centimes de marge nette sur chaque euro de vente. À cette échelle, tout se joue sur deux leviers que le grand public ne voit jamais : la rotation des stocks et le fonds de roulement négatif.",
"Voici le secret le plus élégant du secteur, celui qui a fait la fortune des meilleurs (de Walmart à Amazon en passant par la distribution française) : le BFR négatif. Un distributeur encaisse ses clients COMPTANT (tu paies en caisse immédiatement) mais paie ses fournisseurs à 60 ou 90 jours. Résultat : il vit en permanence avec l'argent de ses fournisseurs dans la poche — il est financé gratuitement par sa propre activité, et plus il grandit, plus ce matelas de cash grandit. Amazon a financé une partie de sa croissance ainsi pendant des années : les clients payaient avant qu'Amazon ne paie ses fournisseurs.",
"La deuxième obsession est la rotation des stocks : combien de fois par an tu vends et renouvelles ton inventaire. Un produit qui dort en rayon est du capital gelé et un risque d'invendu ; un produit qui tourne vite libère du cash et de la place. La distribution performante est une machine logistique d'une précision extrême, où l'avantage se gagne en centimes et en jours de stock — pas en glamour.",
"Enfin, la disruption qui a tout redéfini : Amazon et le e-commerce ont attaqué le point faible de la distribution physique (le coût de l'immobilier et du personnel des magasins) tout en poussant à l'extrême les forces du modèle (rotation, BFR négatif, échelle). La bataille moderne est celle de la logistique du 'dernier kilomètre' et de la donnée client. Le distributeur qui survit n'est pas le moins cher ponctuellement, c'est celui qui a la structure de coûts la plus basse ET la meilleure expérience — un équilibre que très peu tiennent."
],
insights:[
"Métier de marges minuscules (2-3 % net) et de volumes énormes : l'inverse du luxe. Tout se joue en centimes et en jours de stock.",
"Le secret : le BFR négatif. Encaisser comptant, payer les fournisseurs à 60-90 jours → financé gratuitement par son activité, et plus on grandit plus le cash grandit.",
"La rotation des stocks est reine : un produit qui dort est du capital gelé ; qui tourne vite libère cash et espace. C'est une machine logistique de précision.",
"Amazon a attaqué le point faible du physique (immobilier + personnel) en poussant à l'extrême les forces du modèle. La bataille est logistique et data."
],
numbers:[
"Marge nette d'un supermarché : ~2-3 %",
"Délai de paiement fournisseurs : 60-90 jours (source du BFR négatif)",
"L'avantage concurrentiel se gagne en jours de stock et en points de base de coûts"
],
invest:"Regarde le BFR (négatif = machine à cash), la rotation des stocks, et la structure de coûts vs la concurrence (surtout Amazon). La marge nette est faible par nature : l'avantage vient de l'échelle, de la logistique et du financement gratuit par les fournisseurs. Méfie-toi des distributeurs physiques sans réponse crédible au e-commerce — la disruption est structurelle.",
questions:[
{q:"Comment un distributeur peut-il être 'financé gratuitement par son activité' (BFR négatif) ?", opts:["Par des subventions","Il encaisse ses clients comptant mais paie ses fournisseurs à 60-90 jours : il détient en permanence l'argent des autres, et ce matelas grandit avec la taille","Par la dette bancaire","En vendant à perte"], a:1, exp:"Le décalage entre encaissement immédiat et paiement différé des fournisseurs crée une trésorerie permanente gratuite. C'est un des secrets de la croissance d'Amazon et de la grande distribution."},
{q:"Pourquoi la rotation des stocks est-elle une obsession du distributeur ?", opts:["Pour respecter les normes d'hygiène","Un stock qui tourne vite libère du cash et de l'espace ; un stock qui dort est du capital gelé et un risque d'invendu","Pour payer moins d'impôts","Pour fidéliser les clients"], a:1, exp:"À marge de 2-3 %, l'efficacité du capital est vitale. Vendre et renouveler l'inventaire le plus de fois possible par an transforme une marge minuscule en rendement du capital élevé."}
]
},
{
id:"auto", domain:"Automobile", icon:"🚗", tag:"Automobile", title:"Le constructeur",
read:[
"L'automobile est le piège classique du capitalisme industriel : une industrie immense, essentielle, prestigieuse… et qui gagne très mal sa vie. Comprends pourquoi, et tu comprends pourquoi la taille sans la rentabilité est une malédiction. Un constructeur doit dépenser des milliards pour développer chaque modèle, entretenir des usines colossales à coûts fixes énormes, et affronter des syndicats puissants — le tout pour vendre un produit de plus en plus indifférencié dans un marché saturé et cyclique. Marges nettes typiques : 4-7 % les bonnes années. Un fabricant de logiciels rirait.",
"Le cœur du problème est la structure de coûts : une usine automobile doit tourner à plein régime pour être rentable (les coûts fixes s'étalent sur le volume). En récession, quand les ventes chutent de 20-30 %, les usines tournent à vide et les pertes sont abyssales — c'est pourquoi 2008-2009 a mis GM et Chrysler en faillite. Le levier opérationnel joue dans les deux sens : magnifique en haut de cycle, mortel en bas. L'auto est un pari sur le volume avec une structure de coûts qui ne pardonne pas.",
"La transition électrique redistribue toutes les cartes. Une voiture électrique a bien moins de pièces mobiles (pas de moteur thermique complexe, pas de boîte de vitesses) : les barrières technologiques historiques (la maîtrise du moteur à combustion) s'effondrent, et de nouveaux entrants (Tesla, les constructeurs chinois) attaquent des positions qu'on croyait imprenables. Mais l'électrique déplace la valeur vers la batterie (30-40 % du coût du véhicule) et le logiciel — deux domaines où les constructeurs historiques n'ont pas d'avantage. C'est une industrie en train de changer de nature.",
"La leçon financière est universelle : dans une industrie à fort levier opérationnel et faible différenciation, l'échelle est nécessaire mais pas suffisante. Ce qui distingue les rares gagnants (Toyota historiquement, via son système de production légendaire ; les premiums allemands via la marque), c'est soit une efficacité industrielle supérieure, soit un pricing power de marque. Sans l'un des deux, on est condamné à la médiocrité rentable au mieux, à la faillite au pire."
],
insights:[
"Industrie immense et prestigieuse mais peu rentable (4-7 % net) : capital intensif, coûts fixes énormes, produit indifférencié, marché saturé et cyclique.",
"Fort levier opérationnel : magnifique en haut de cycle, mortel en bas (les usines à vide en récession → faillites, cf. GM/Chrysler 2009).",
"L'électrique redistribue les cartes : moins de pièces → chute des barrières historiques, nouveaux entrants (Tesla, Chine). La valeur migre vers batterie et logiciel.",
"L'échelle est nécessaire mais insuffisante : seuls gagnent ceux qui ont une efficacité industrielle supérieure (Toyota) OU un pricing power de marque (premium)."
],
numbers:[
"Marge nette d'un constructeur généraliste : 4-7 % les bonnes années",
"La batterie : 30-40 % du coût d'un véhicule électrique",
"Développement d'un nouveau modèle : plusieurs milliards ; une usine tourne rentablement près de la pleine capacité"
],
invest:"Méfie-toi du levier opérationnel : un bon trimestre en haut de cycle ne fait pas une bonne entreprise. Cherche l'efficacité industrielle (marge à travers le cycle) ou le vrai pricing power de marque (premium). Sur l'électrique, regarde qui contrôle la batterie et le logiciel — c'est là que la valeur migre. Les constructeurs sans réponse crédible à Tesla/Chine sont en danger structurel.",
questions:[
{q:"Pourquoi une récession est-elle si dangereuse pour un constructeur automobile ?", opts:["Les taxes augmentent","Fort levier opérationnel : les coûts fixes énormes des usines ne baissent pas quand les ventes chutent, transformant une baisse de volume en pertes abyssales","Les clients changent de marque","Le pétrole devient cher"], a:1, exp:"Une usine doit tourner à plein pour être rentable. Une chute des ventes de 20-30 % laisse les coûts fixes intacts sur un volume réduit — d'où les faillites de GM et Chrysler en 2009."},
{q:"Pourquoi la transition électrique menace-t-elle les constructeurs historiques ?", opts:["Les batteries sont illégales","Moins de pièces mobiles fait tomber leur avantage historique (maîtrise du moteur thermique), et la valeur migre vers batterie et logiciel où ils n'ont pas d'avantage","Les clients ne veulent pas d'électrique","L'électrique est moins cher à produire pour eux"], a:1, exp:"L'électrique efface la barrière technologique du moteur à combustion et déplace la valeur vers des domaines (batterie, software) maîtrisés par de nouveaux entrants comme Tesla et les constructeurs chinois."}
]
},
{
id:"immo", domain:"Immobilier", icon:"🏢", tag:"Immobilier", title:"Le foncier",
read:[
"L'immobilier professionnel est, au fond, une machine à transformer de la dette en revenus locatifs — et sa valeur est presque entièrement gouvernée par une seule variable que le propriétaire ne contrôle pas : les taux d'intérêt. Comprends le mécanisme du taux de capitalisation (cap rate) et tu comprends tout le secteur. Un immeuble qui génère 5 M€ de loyers nets par an, valorisé à un cap rate de 5 %, vaut 100 M€ (5 / 0,05). Si les taux montent et que le cap rate exigé passe à 6 %, le MÊME immeuble, avec les MÊMES loyers, ne vaut plus que 83 M€ (5 / 0,06). L'immeuble n'a pas bougé ; sa valeur a chuté de 17 % à cause d'un chiffre décidé par la banque centrale.",
"C'est pourquoi l'immobilier est l'actif le plus sensible aux taux qui existe : sa valeur est une rente actualisée, exactement comme une obligation à très longue duration. La décennie de taux zéro a gonflé toutes les valorisations immobilières ; leur remontée en 2022-2023 a provoqué une correction brutale, surtout sur les actifs les plus dépendants du refinancement. Un investisseur immobilier qui ne raisonne pas d'abord en taux et en cap rate ne comprend pas ce qu'il achète.",
"Le deuxième levier est la dette — l'immobilier est l'usage historique du levier. Acheter un immeuble à 100 avec 30 de fonds propres et 70 de dette : si l'immeuble prend 10 %, tes fonds propres font +33 %. Magnifique en marché haussier, mais le levier joue dans les deux sens, et le danger mortel est le mur de refinancement : quand une dette arrive à échéance dans un marché de taux hauts et de crédit fermé, il faut refinancer beaucoup plus cher, ou vendre dans la panique. Beaucoup de faillites immobilières ne sont pas des problèmes de loyers, mais de calendrier de dette.",
"Enfin, les trois lois immuables — emplacement, emplacement, emplacement — cachent une vérité économique : la valeur d'un actif immobilier dépend de la demande locative de sa localisation, elle-même liée à des tendances longues (démographie, télétravail, e-commerce). Le bureau de centre-ville et le centre commercial, jadis rois, sont défiés par le télétravail et Amazon ; la logistique et le résidentiel bien situé prospèrent. L'immobilier semble immuable ; il est en réalité soumis à des bascules structurelles lentes mais implacables."
],
insights:[
"La valeur = loyers / cap rate. Le cap rate suit les taux : une hausse de taux fait chuter la valeur d'un immeuble inchangé (comme une obligation longue).",
"L'actif le plus sensible aux taux qui existe. Raisonner d'abord en taux et cap rate, pas en 'pierre'.",
"Le levier (dette) démultiplie les rendements et le risque. Le danger mortel n'est souvent pas les loyers mais le MUR DE REFINANCEMENT (dette à renouveler en marché fermé).",
"'Emplacement' cache la dépendance aux tendances longues (télétravail, e-commerce, démographie) : bureau et retail défiés, logistique et résidentiel bien situé prospèrent."
],
numbers:[
"Valeur = loyers nets / cap rate. Cap rate de 5 %→6 % = valeur -17 % à loyers constants",
"Levier immobilier courant : 60-70 % de dette",
"Sensibilité : l'immobilier se comporte comme une obligation à très longue duration face aux taux"
],
invest:"Raisonne en cap rate et en taux avant tout. Analyse le calendrier de la dette (mur de refinancement = le vrai risque), la qualité de l'emplacement face aux tendances longues (télétravail, e-commerce), et le levier. Un actif de qualité acheté à un cap rate élevé (donc pas cher) en marché de taux hauts peut être une excellente affaire quand les taux rebaisseront — la sensibilité joue dans les deux sens.",
questions:[
{q:"Pourquoi la valeur d'un immeuble peut-elle chuter de 17 % sans que ses loyers ne bougent ?", opts:["À cause de l'inflation des coûts","La valeur = loyers / cap rate ; si les taux montent, le cap rate exigé monte (5 %→6 %), et la même rente vaut moins — comme une obligation longue","Parce que l'immeuble se dégrade","À cause des impôts fonciers"], a:1, exp:"L'immobilier est une rente actualisée : sa valeur bouge à l'inverse des taux, exactement comme une obligation à longue duration. La banque centrale déplace la valeur sans que la 'pierre' ne change."},
{q:"Quel est souvent le vrai déclencheur d'une faillite immobilière (au-delà des loyers) ?", opts:["Une baisse des loyers de 5 %","Le mur de refinancement : une dette qui arrive à échéance dans un marché de taux hauts et de crédit fermé, impossible à renouveler sans perte","Une hausse des charges","Le départ d'un locataire"], a:1, exp:"Beaucoup de faillites viennent du calendrier de la dette, pas de l'exploitation : refinancer beaucoup plus cher (ou ne pas pouvoir refinancer du tout) force la vente en catastrophe."}
]
}
];
