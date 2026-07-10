// LE CLOSING — Expliqué simplement (méthode Feynman)
// Lis l'explication sans jargon, PUIS explique-le toi-même par écrit. La grille vérifie que tu as les idées, pas les mots.
const FEYNMAN = [
{id:"fy1", title:"L'EBITDA", tag:"Bases",
simple:[
"Imagine une boulangerie. Sur une année, elle encaisse ce que paient les clients, et elle paie la farine, le loyer, les salaires. Ce qui reste, c'est ce que le MÉTIER de boulanger rapporte vraiment : c'est ça, l'EBITDA. Le four qui vieillit (l'amortissement), les intérêts du crédit, les impôts ? On les met de côté pour l'instant — pas parce qu'ils ne comptent pas, mais parce qu'ils ne disent rien sur la qualité du pain ni sur le talent du boulanger.",
"Pourquoi tout le monde l'utilise ? Parce qu'il permet de comparer deux boulangeries même si l'une a acheté son four à crédit et l'autre a hérité du sien. On compare le métier, pas la façon dont il a été financé.",
"Le piège : l'EBITDA n'est PAS l'argent qui tombe dans la caisse. Si tes clients paient dans trois mois, si ton four doit être remplacé, si le fisc passe — l'EBITDA n'en sait rien. C'est un thermomètre du métier, pas un relevé de compte en banque."
],
mission:"Explique l'EBITDA à ta grand-mère avec l'image de ton choix (boulangerie interdite, trouve la tienne), puis explique-lui pourquoi ce chiffre peut mentir.",
grid:[
"L'idée du « ce que le métier rapporte, avant la façon dont il est financé et équipé » — avec une image concrète à toi.",
"POURQUOI on enlève intérêts et amortissements : pour comparer deux entreprises indépendamment de leur financement et de l'âge de leur équipement.",
"Le piège : EBITDA ≠ cash (clients qui paient plus tard, équipement à remplacer, impôts). Au moins un des trois cités.",
"Zéro jargon non expliqué : si tu as écrit « excédent brut d'exploitation » sans le traduire, c'est raté."
],
coach:"Le test Feynman est simple : si ta grand-mère ne peut pas te le répéter, tu ne l'as pas compris — tu l'as mémorisé. Ce sont deux choses différentes, et l'entretien détecte la différence en 30 secondes."},
{id:"fy2", title:"Valeur d'entreprise vs valeur des actions", tag:"Valorisation",
simple:[
"Une maison vaut 500 000 €. Il reste 300 000 € de crédit dessus. Si tu la « rachètes », tu paies 200 000 € au propriétaire ET tu reprends le crédit. La MAISON vaut 500 (c'est la valeur d'entreprise), mais la POCHE DU PROPRIÉTAIRE ne reçoit que 200 (c'est la valeur des actions, l'equity).",
"Toute la finance d'entreprise tient dans cette distinction. Quand on dit « cette boîte a été rachetée 1 milliard », demande toujours : maison ou poche du propriétaire ? Dette comprise ou pas ? Les journaux confondent en permanence.",
"Et le sens de calcul marche dans les deux directions : maison = poche + crédit. Poche = maison − crédit. Si la maison vaut 500 et le crédit 550… la poche vaut zéro, et c'est le banquier qui décide de tout. Retiens cette version-là aussi : elle explique toutes les restructurations."
],
mission:"Explique à un ami en école de droit la différence entre valeur d'entreprise et valeur des capitaux propres, avec ta propre image, puis ce qui se passe quand la dette dépasse la valeur totale.",
grid:[
"Une image type « maison + crédit » à toi (voiture en leasing, appart hypothéqué…) qui sépare la valeur de l'ACTIF et ce qui revient au PROPRIÉTAIRE.",
"La formule dans les deux sens, en mots simples : valeur totale = part du proprio + dettes ; part du proprio = valeur totale − dettes.",
"Le cas limite : dette > valeur totale → l'actionnaire n'a plus rien, les créanciers deviennent les vrais patrons.",
"L'application pratique : quand on lit « rachetée X milliards », toujours demander si c'est dette incluse (EV) ou pas (equity)."
],
coach:"Si tu as buté sur le cas limite (dette > valeur), retourne voir le waterfall. C'est la même idée : l'actionnaire est servi en dernier, donc il peut être servi zéro."},
{id:"fy3", title:"Le BFR", tag:"Bases",
simple:[
"Tu montes un stand de limonade. Lundi, tu achètes les citrons (tu PAIES). Mercredi, tu vends les verres au bureau d'à côté, qui te dit « je te paie à la fin du mois » (tu ATTENDS). Entre lundi et la fin du mois, tu as avancé l'argent des citrons de ta poche. Cet argent avancé, coincé entre le moment où tu paies et le moment où on te paie, c'est le besoin en fonds de roulement.",
"Maintenant tu doubles tes ventes. Bonne nouvelle ? Oui, mais : deux fois plus de citrons à avancer. Plus tu grandis, plus tu dois avancer — c'est pour ça que des entreprises qui marchent très fort peuvent mourir : le carnet de commandes est plein, la poche est vide.",
"L'inverse existe : le supermarché te fait payer ta limonade immédiatement, mais paie SES fournisseurs dans deux mois. Lui vit en permanence avec l'argent des autres dans la poche. Son BFR est négatif — c'est une pompe à cash."
],
mission:"Explique le BFR à un pote de 15 ans qui veut monter un business de sneakers, et pourquoi grandir trop vite pourrait le tuer. Termine par l'exemple inverse (le business qui encaisse avant de payer).",
grid:[
"L'idée du décalage : je paie mes fournisseurs AVANT d'être payé par mes clients → de l'argent à moi est coincé dans le cycle.",
"Le paradoxe de la croissance : plus je vends, plus je dois avancer — une entreprise rentable peut mourir de croissance (manque de cash, pas de clients).",
"Le BFR négatif expliqué simplement : encaisser avant de payer = vivre avec l'argent des autres (supermarché, abonnements…).",
"Un chiffre ou un ordre de grandeur concret dans ton explication (ex. : chaque paire achetée = tant d'euros immobilisés pendant tant de semaines)."
],
coach:"Le BFR est le concept le plus rentable de cette liste : il est invisible au compte de résultat et il tue en silence. Si ton explication n'avait pas le paradoxe de la croissance, elle était incomplète."},
{id:"fy4", title:"L'actualisation (le cœur du DCF)", tag:"Valorisation",
simple:[
"Question : tu préfères 100 € maintenant ou 100 € dans cinq ans ? Maintenant, évidemment. Pourquoi ? D'abord parce que d'ici cinq ans, tout peut arriver (on ne te les donnera peut-être jamais). Ensuite parce que 100 € placés aujourd'hui rapporteraient quelque chose d'ici là. Donc 100 € futurs valent MOINS que 100 € présents. L'actualisation, c'est juste calculer combien moins.",
"Le taux d'actualisation, c'est le curseur de la méfiance : promesse d'un ami fiable = je décote un peu ; promesse d'un inconnu au projet bancal = je décote énormément. Plus c'est risqué, plus le taux est haut, moins la promesse vaut cher aujourd'hui.",
"Valoriser une entreprise avec un DCF, c'est exactement ça : lister tous les billets qu'elle promet de générer dans le futur, puis décoter chaque billet selon sa distance dans le temps et le sérieux de la promesse. La somme de tous ces billets décotés, c'est la valeur de l'entreprise. Tout le reste est du détail technique."
],
mission:"Explique l'actualisation à quelqu'un qui n'a jamais fait de finance, en partant de la question « 100 € maintenant ou dans 5 ans ? ». Termine en expliquant ce qu'est un DCF en une phrase, sans prononcer « flux » ni « actualisé ».",
grid:[
"Les DEUX raisons pour lesquelles un euro futur vaut moins : le risque (peut ne jamais arriver) ET le coût d'opportunité (placé aujourd'hui, il aurait rapporté).",
"Le taux comme curseur de méfiance : promesse fiable = petit taux, promesse risquée = gros taux → grosse décote.",
"Le DCF résumé avec tes mots : la valeur d'une entreprise = la somme de tout l'argent qu'elle promet, chaque promesse comptée en « valeur d'aujourd'hui ».",
"L'effet du temps montré concrètement : un euro dans 10 ans est BEAUCOUP plus décoté qu'un euro dans 2 ans (l'exemple chiffré est un plus)."
],
coach:"Si tu maîtrises cette explication, tu tiens 80 % de la théorie de la valorisation — le reste (WACC, valeur terminale) n'est que le réglage du curseur de méfiance. C'est LA fondation. Bétonne-la."},
{id:"fy5", title:"Le WACC", tag:"Valorisation",
simple:[
"Une entreprise, c'est financé par deux types de personnes : ceux qui prêtent (les banques — remboursées en premier, gain plafonné) et ceux qui possèdent (les actionnaires — servis en dernier, gain illimité mais risque total). Chacun exige un loyer pour son argent : la banque un petit loyer (elle risque peu), l'actionnaire un gros loyer (il risque tout).",
"Le WACC, c'est simplement le loyer MOYEN de tout l'argent qui finance l'entreprise — en pondérant : si 40 % vient des banques à 5 % et 60 % des actionnaires qui veulent 10 %, le loyer moyen tourne autour de 8 %.",
"À quoi ça sert ? C'est la barre à franchir. Chaque projet, chaque usine, chaque acquisition doit rapporter PLUS que ce loyer moyen — sinon l'entreprise s'appauvrit en travaillant : elle paie 8 % pour de l'argent qu'elle fait fructifier à 6 %. Et petit bonus : les intérêts bancaires sont déductibles des impôts, donc l'État rembourse un bout du loyer de la banque. C'est pour ça que la dette coûte encore moins cher qu'elle n'en a l'air."
],
mission:"Explique le WACC à un fondateur de startup qui ne comprend pas pourquoi « son » argent aurait un coût. Utilise l'image du loyer (ou la tienne), et finis par : à quoi sert concrètement ce chiffre ?",
grid:[
"Les deux financeurs et leur logique de risque : la banque (servie d'abord, exige peu) vs l'actionnaire (servi en dernier, exige beaucoup).",
"Le WACC comme moyenne pondérée des deux « loyers », avec un mini-exemple chiffré de tête.",
"L'usage : c'est la barre minimale de rentabilité de tout projet — en dessous, l'entreprise détruit de la valeur même si elle « gagne de l'argent ».",
"Le bonus fiscal de la dette mentionné : l'État subventionne les intérêts (déductibles), pas les dividendes."
],
coach:"L'erreur du fondateur — croire que l'argent des actionnaires est « gratuit » parce qu'il n'y a pas de mensualité — est l'erreur la plus répandue de toute la finance. Si ton explication la démonte clairement, tu es au-dessus du lot."},
{id:"fy6", title:"Le LBO", tag:"LBO",
simple:[
"Tu veux acheter un immeuble à 1 million qui rapporte 80 000 € de loyers par an. Tu n'as que 300 000 €. La banque prête les 700 000 manquants — et voilà l'astuce : ce sont les LOYERS de l'immeuble qui remboursent le crédit, pas ton salaire. Dix ans plus tard, le crédit est presque remboursé : l'immeuble t'appartient en entier alors que tu n'as sorti que 300 000 de ta poche. C'est exactement un LBO, avec une entreprise à la place de l'immeuble : ses propres bénéfices remboursent la dette qui a servi à l'acheter.",
"Pourquoi c'est puissant ? Si l'immeuble prend seulement 20 % de valeur (1,2 M), toi tu ne calcules pas sur l'immeuble : tu as mis 300, tu ressors avec 1 200 − 100 de crédit restant = 1 100... ta mise a été multipliée. La dette démultiplie TON rendement — c'est l'effet de levier.",
"Le revers : si les loyers baissent (locataire parti, travaux), le crédit, lui, ne baisse pas. Une mauvaise année et la banque saisit tout : tu perds tes 300 000 en entier. Le levier amplifie dans les deux sens — c'est un accélérateur, pas un coussin. Voilà pourquoi on ne fait des LBO que sur des « immeubles » aux loyers très fiables : des entreprises stables et prévisibles."
],
mission:"Explique le LBO à quelqu'un avec l'image de l'immeuble locatif (ou une meilleure), en couvrant : qui rembourse, pourquoi ça démultiplie le gain, et pourquoi ça peut tout perdre.",
grid:[
"Le mécanisme central : c'est la CIBLE elle-même (ses bénéfices/loyers) qui rembourse la dette de son propre rachat.",
"L'effet de levier chiffré simplement : petite mise + grosse dette → une hausse modérée de la valeur totale = multiplication de la mise.",
"La symétrie du risque : si les revenus chutent, la dette reste — et la mise peut être perdue en totalité. Le levier amplifie dans les deux sens.",
"La conséquence logique : on ne leverage que des activités stables et prévisibles (le crédit déteste les surprises)."
],
coach:"Si tu as expliqué le levier uniquement côté gain, tu as fait un pitch de vendeur, pas une explication. La moitié de la compréhension du LBO, c'est le scénario où tout brûle."},
{id:"fy7", title:"Les multiples", tag:"Valorisation",
simple:[
"Comment tu sais si un appart est cher ? Tu regardes le prix au m² du quartier. 80 m² × 10 000 €/m² = 800 000 €. Tu n'as pas fait de grande théorie : tu as pris une référence de marché et tu l'as appliquée. Un multiple, c'est le prix au m² des entreprises : au lieu des mètres carrés, on prend les bénéfices. « Les boîtes de ce secteur se paient 8 fois leur EBITDA » = le quartier vaut 8× — ton entreprise fait 50 M d'EBITDA → environ 400 M.",
"Pourquoi certains « quartiers » valent 20× et d'autres 4× ? Pour les mêmes raisons que l'immobilier : la croissance attendue (le quartier qui monte), la solidité (le bâtiment bien construit), le risque (la zone inondable). Un multiple élevé n'est pas une anomalie, c'est le marché qui dit « ces bénéfices-là sont plus beaux, plus sûrs, plus croissants ».",
"Le piège du « pas cher » : l'appart à 4 000 €/m² dans une ville qui se vide n'est pas une affaire, c'est un piège. Pareil pour l'entreprise à 4× l'EBITDA dont le métier décline. Avant de dire « c'est pas cher », demande toujours POURQUOI c'est à ce prix."
],
mission:"Explique les multiples avec le prix au m², puis démonte le piège du « c'est pas cher » avec un exemple concret de ton invention.",
grid:[
"L'analogie prix au m² clairement posée : une référence de marché × la quantité (de bénéfices) = la valeur.",
"Ce qui fait varier le multiple entre secteurs : croissance, qualité/stabilité des bénéfices, risque — au moins deux des trois, illustrés.",
"Le piège de la fausse affaire : un multiple bas peut refléter un déclin réel (value trap) — toujours demander POURQUOI ce prix.",
"La limite de l'outil dite explicitement : le multiple est un raccourci qui cache toutes ses hypothèses (c'est un DCF compressé)."
],
coach:"Les multiples sont l'outil le plus utilisé ET le plus mal utilisé de la finance. Celui qui sait expliquer POURQUOI un multiple diffère d'un autre ne se fera jamais piéger par un « c'est pas cher »."},
{id:"fy8", title:"Le goodwill", tag:"Comptabilité",
simple:[
"Tu rachètes le café en bas de chez toi 500 000 €. Les murs, les machines et le stock valent 300 000 €. Pourquoi as-tu payé 200 000 de plus ? Pour ce qui ne se touche pas : les habitués qui viennent chaque matin, l'emplacement, la réputation, l'équipe qui tourne. Ces 200 000 « en plus », la comptabilité doit bien les inscrire quelque part — elle les appelle goodwill. Ce n'est pas un actif magique : c'est la trace comptable de ta CONVICTION que ce café vaut plus que ses meubles.",
"Chaque année, le comptable repose la question : « les habitués sont-ils toujours là ? La conviction tient-elle ? » Si un Starbucks a ouvert en face et vidé la salle, il faut l'avouer : on efface une partie du goodwill, et cette perte traverse les comptes. Aucun argent ne sort ce jour-là — l'argent, lui, est sorti le jour de l'achat. La dépréciation, c'est juste le reçu officiel : « j'ai payé trop cher ».",
"Voilà pourquoi les analystes surveillent le goodwill des groupes très acquisitifs : une montagne de goodwill = une montagne de convictions à tenir. Et l'histoire (AOL : 99 milliards effacés) montre que les convictions se dégonflent plus souvent que les immeubles."
],
mission:"Explique le goodwill avec le rachat d'un commerce, puis explique ce que signifie « déprécier du goodwill » et pourquoi « c'est non-cash » ne veut pas dire « c'est sans gravité ».",
grid:[
"D'où vient le goodwill : l'écart entre le prix payé et la valeur des choses « touchables » — payé pour la clientèle, la marque, l'emplacement, l'équipe.",
"Le goodwill = une conviction inscrite dans les comptes, retestée chaque année.",
"La dépréciation racontée simplement : avouer que la conviction ne tient plus — aucune sortie d'argent CE jour-là, l'argent était parti à l'achat.",
"La lecture d'analyste : beaucoup de goodwill accumulé = beaucoup d'acquisitions à justifier ; des dépréciations répétées = un management qui surpaie."
],
coach:"La phrase à bannir : « c'est juste comptable ». Une dépréciation de goodwill est le constat officiel d'une destruction d'argent réel, passée. Si ton explication l'a dit clairement, elle est bonne."},
{id:"fy9", title:"Le covenant", tag:"Dette",
simple:[
"Quand tu loues un appart, le bail dit : pas de sous-location, pas de travaux sans accord. Si tu violes une règle, le propriétaire peut te mettre dehors — même si tu paies ton loyer. Un covenant, c'est exactement ça, mais pour un prêt : la banque écrit dans le contrat « ta dette ne doit jamais dépasser 3,5 années de tes bénéfices ». Tant que tu respectes la règle, tout va bien. Si tu la franchis — même sans avoir raté un seul remboursement — la banque a le droit d'exiger tout son argent immédiatement.",
"Pourquoi les banques font ça ? Parce qu'elles ne veulent pas attendre que tu sois en faillite pour réagir. Le covenant est un fil d'alarme tendu bien AVANT le précipice : il se déclenche quand tu vas encore assez bien pour qu'on puisse discuter.",
"En pratique, franchir un covenant ne déclenche presque jamais la saisie : ça déclenche une NÉGOCIATION — où la banque est en position de force. Elle dira « d'accord, je ferme les yeux, mais tu paies des frais, un taux plus élevé, et tu me donnes des garanties ». D'où la vraie règle de survie : quand tu vois que tu vas franchir la ligne, tu appelles la banque AVANT. Celui qui prévient négocie ; celui qui se fait attraper subit."
],
mission:"Explique le covenant à quelqu'un qui n'a jamais emprunté, avec l'image du bail (ou la tienne). Couvre : à quoi ça sert pour la banque, ce qui se passe VRAIMENT quand on le casse, et la règle d'or du timing.",
grid:[
"L'idée de la règle contractuelle continue : on peut être en règle sur les paiements et quand même en infraction — et ça suffit pour tout déclencher.",
"La logique du prêteur : un fil d'alarme placé AVANT le précipice, pour intervenir quand il y a encore quelque chose à sauver.",
"La réalité du breach : pas une saisie, une négociation en position de faiblesse (frais, taux relevé, garanties).",
"La règle d'or : anticiper et prévenir la banque avant la violation — la même concession coûte deux à trois fois moins cher à froid."
],
coach:"Le covenant est le concept le plus concret de ta future vie de DAF : tu vivras avec un tableau de covenants sous les yeux chaque trimestre. Si ton explication a le mot « négociation », tu as compris l'essentiel."},
{id:"fy10", title:"L'earn-out", tag:"M&A",
simple:[
"Tu vends ta boîte. Toi tu dis « elle vaut 10 millions, l'an prochain on double ». L'acheteur dit « je vois 7 millions, ton doublement je n'y crois pas ». Personne ne ment — vous pariez juste sur des futurs différents. L'earn-out coupe la poire : « 7 millions maintenant, et 3 de plus SI le doublement arrive vraiment ». Le vendeur est payé pour ses promesses seulement si elles se réalisent.",
"Élégant sur le papier. Sauf qu'il y a un détail explosif : après la vente, c'est L'ACHETEUR qui dirige la boîte. Et c'est la performance de cette boîte — qu'il contrôle — qui décide s'il doit payer les 3 millions de plus. Imagine : tu paries avec quelqu'un que TON cheval gagnera la course… et c'est LUI le jockey. Il suffit qu'il charge la boîte de frais de groupe, qu'il retarde deux contrats, et hop, l'objectif est raté — « désolé, les chiffres sont les chiffres ».",
"D'où les protections si tu es vendeur : choisir un compteur difficile à trafiquer (le chiffre d'affaires plutôt que le bénéfice « ajusté »), écrire des règles de conduite (interdiction de changer le périmètre, les moyens), et une clause qui dit « si tu revends la boîte ou changes les règles, tu me paies tout, tout de suite ». Un earn-out sans ces protections n'est pas un complément de prix — c'est un espoir."
],
mission:"Explique l'earn-out à un fondateur qui s'apprête à vendre sa startup, avec l'image du jockey (ou la tienne). Il doit repartir en connaissant le conflit d'intérêts ET les trois protections.",
grid:[
"Le rôle de l'earn-out : combler un désaccord de valorisation en payant les promesses seulement si elles se réalisent.",
"Le conflit d'intérêts structurel rendu vivant : celui qui doit payer contrôle la machine qui décide s'il paie (le jockey adverse).",
"Au moins deux protections concrètes : métrique difficile à manipuler, règles de gestion écrites, clause d'accélération.",
"Le verdict d'ensemble : un earn-out se blinde à la signature — après, il ne reste que la diplomatie (ou le procès)."
],
coach:"L'earn-out est le meilleur test de ta compréhension des incitations : qui contrôle quoi, qui gagne à quoi. Si ton explication rend le conflit d'intérêts ÉVIDENT pour un non-financier, tu as gagné."},
{id:"fy11", title:"L'OPA et le seuil des 30 %", tag:"Boursier",
simple:[
"Une société cotée appartient à des milliers de gens. Un jour, un acheteur veut en prendre le contrôle : il propose publiquement de racheter les actions de tout le monde, à un prix précis, généralement bien au-dessus du cours — c'est l'OPA. Pourquoi payer plus cher ? Parce qu'il n'achète pas juste des actions : il achète le VOLANT. Décider de la stratégie, changer les dirigeants, capter les économies — ça vaut une prime.",
"Maintenant le problème que la loi a dû régler : imagine qu'un acheteur ramasse discrètement 40 % des actions en bourse. Avec 40 %, dans une assemblée où beaucoup ne votent pas, il contrôle la société DE FAIT — sans avoir rien proposé aux autres. Les petits actionnaires se retrouvent embarqués sous un nouveau patron qu'ils n'ont pas choisi, sans porte de sortie.",
"D'où la règle française : à partir de 30 % du capital, tu es OBLIGÉ de faire une offre à 100 % des actionnaires, au même prix. Le contrôle ne s'achète pas en douce : si tu prends le volant, tu offres une sortie à tous les passagers. Et voilà pourquoi tu verras des acheteurs s'arrêter pile à 29,9 % : un pied dans la porte, juste sous la ligne qui déclenche l'obligation."
],
mission:"Explique à un ami qui débute en bourse ce qu'est une OPA, pourquoi l'acheteur paie une prime, et à quoi sert le seuil des 30 % — avec l'image du volant et des passagers, ou la tienne.",
grid:[
"L'OPA définie simplement : une proposition publique de rachat à tous les actionnaires, à prix affiché, pour prendre le contrôle.",
"La prime expliquée : on ne paie pas des actions, on paie le VOLANT (décider, changer, restructurer).",
"Le problème sans la règle : contrôler de fait sans offre = les minoritaires embarqués sans porte de sortie.",
"La règle des 30 % et sa conséquence pratique : offre obligatoire sur 100 % — d'où les participations calibrées à 29,9 %."
],
coach:"Le droit boursier n'est que du bon sens codifié : protéger les passagers quand quelqu'un prend le volant. Si ton explication fait comprendre le POURQUOI de la règle, les articles du règlement AMF suivront tout seuls."},
{id:"fy12", title:"La courbe des taux", tag:"Macro",
simple:[
"Si tu prêtes 100 € à ton cousin jusqu'à demain, tu ne demandes presque rien. Si tu les prêtes pour 10 ans, tu demandes plus : plus d'attente, plus d'incertitude, plus de choses qui peuvent mal tourner. Trace ça sur un graphique — durée du prêt en bas, taux exigé en hauteur — et tu obtiens la courbe des taux. Normalement, elle monte : prêter longtemps rapporte plus que prêter court.",
"Ce qui la rend fascinante : la partie courte est fixée par la banque centrale, mais la partie longue est un VOTE permanent de millions d'investisseurs sur l'avenir. Les taux longs contiennent leurs anticipations : croissance, inflation, décisions futures de la banque centrale. C'est le plus grand sondage économique du monde, mis à jour chaque seconde.",
"Et parfois, la courbe s'INVERSE : prêter 10 ans rapporte MOINS que prêter 3 mois. Absurde ? Non : ça veut dire que le marché pense que les taux vont baisser — et les banques centrales baissent les taux quand l'économie va mal. Une courbe inversée, c'est des millions d'investisseurs qui murmurent « récession devant ». Ce signal a précédé presque toutes les récessions américaines modernes."
],
mission:"Explique la courbe des taux à un ami sans aucune culture éco, du prêt au cousin jusqu'à la signification d'une courbe inversée.",
grid:[
"L'intuition de base : plus le prêt est long, plus le taux exigé est élevé (attente + incertitude) → courbe croissante = normale.",
"Qui fixe quoi : la banque centrale ne pilote que le court terme ; le long terme est un vote du marché sur l'avenir.",
"L'inversion décodée pas à pas : taux longs < taux courts → le marché anticipe des baisses de taux → donc une économie qui ralentit.",
"La valeur du signal : indicateur avancé historiquement fiable des récessions — et ses conséquences concrètes pour une entreprise (sécuriser son financement avant l'orage)."
],
coach:"La courbe des taux est le seul « indicateur » que tu croiseras dans TOUS tes futurs métiers possibles. Dix minutes pour la comprendre une fois, un avantage pour trente ans."},
{id:"fy13", title:"Le waterfall (qui est payé en premier)", tag:"Restructuring",
simple:[
"Une entreprise fait faillite et on vend tout : il y a 80 dans la caisse. Qui se sert ? Imagine une file d'attente STRICTE : d'abord ceux à qui on a promis la priorité absolue (les prêteurs « seniors », disons 70 de créances), puis les prêteurs de second rang (disons 40), et tout au bout de la file, les actionnaires. On verse l'argent dans la file : les seniors prennent leurs 70 en entier. Il reste 10. Les seconds rangs, à qui on doit 40, se partagent 10 — ils perdent les trois quarts. Les actionnaires ? Rien. Zéro. C'est ça, le waterfall : l'argent coule d'étage en étage, et chaque étage doit être PLEIN avant qu'une goutte descende au suivant.",
"Maintenant le point génial : l'étage qui n'est servi qu'À MOITIÉ (ici les seconds rangs) devient le vrai patron. Ceux du dessus s'en fichent (ils seront payés de toute façon), ceux du dessous n'ont plus rien à défendre. Mais l'étage coupé en deux a tout à gagner ou à perdre — c'est lui qui négocie, et souvent il échange sa créance contre les clés de l'entreprise : « vous ne pouvez pas me rembourser ? Alors la boîte est à moi. »",
"Et voilà pourquoi, dans toute restructuration, la grande bagarre porte sur UNE question : combien vaut l'entreprise ? Car la valeur décide à quel étage l'argent s'arrête — donc qui perd tout, et qui devient propriétaire."
],
mission:"Explique le waterfall avec la file d'attente (ou l'image de ton choix), un exemple chiffré simple, et l'idée de l'étage « coupé en deux » qui prend le pouvoir.",
grid:[
"La règle de la file stricte : chaque rang est payé INTÉGRALEMENT avant que le suivant touche un centime — actionnaires toujours derniers.",
"Un exemple chiffré à toi où un étage est partiellement servi et l'equity vaut zéro.",
"Le concept du fulcrum en mots simples : l'étage partiellement payé a le vrai pouvoir et finit souvent propriétaire (dette échangée contre les clés).",
"La conséquence : la bataille d'une restructuration est une bataille de VALORISATION — la valeur décide où l'argent s'arrête."
],
coach:"Si tu sais raconter le waterfall avec un exemple chiffré fluide, tu es capable de comprendre n'importe quel dossier de restructuration dans la presse — la mécanique est TOUJOURS celle-là."},
{id:"fy14", title:"Synergies et prime : l'arithmétique d'un rachat", tag:"M&A",
simple:[
"Deux boulangeries voisines fusionnent. Un seul four suffira, un seul comptable, des achats de farine groupés : ensemble, elles gagneront PLUS que la somme des deux séparées. Ce « plus », ce sont les synergies. C'est la justification officielle de presque tous les rachats du monde.",
"Le problème, c'est le prix. Pour convaincre l'autre boulanger de vendre, tu dois payer plus que ce que sa boutique vaut seule — disons 20 % de plus : la prime. Et là, l'arithmétique devient impitoyable : si la prime que tu PAIES (certaine, aujourd'hui, en cash) dépasse les synergies que tu RÉALISERAS (incertaines, demain, à condition de bien exécuter), tu t'es appauvri en achetant. Tu as payé d'avance des économies qui n'existent pas encore — et tu les as payées au vendeur, qui est parti avec.",
"Dernier détail qui fait tout : les économies de coûts (fermer un four) se réalisent plutôt bien. Les promesses de revenus en plus (« nos clients achèteront les deux pains ! ») échouent la plupart du temps. Un acheteur discipliné paie éventuellement pour le four fermé — jamais pour les clients hypothétiques."
],
mission:"Explique à un non-financier pourquoi un rachat « stratégique » peut appauvrir l'acheteur, avec les deux boulangeries : synergies, prime, et l'inégalité qui décide de tout.",
grid:[
"Les synergies définies simplement (1+1=2,3) avec un exemple concret de coûts mutualisés.",
"La prime : le supplément payé pour convaincre — payé AUJOURD'HUI, certain, au vendeur.",
"L'inégalité décisive énoncée : valeur créée = synergies réalisées − prime payée ; si la prime gagne, l'acheteur s'appauvrit en achetant.",
"La hiérarchie de crédibilité : synergies de coûts (réalisables) vs synergies de revenus (rarement réalisées) — on ne paie jamais d'avance les secondes."
],
coach:"Ce raisonnement en trois lignes démonte 90 % des communiqués de presse de fusions. Quand tu liras « acquisition stratégique créatrice de valeur », tu feras le calcul toi-même — et souvent, il ne passera pas."}
];
