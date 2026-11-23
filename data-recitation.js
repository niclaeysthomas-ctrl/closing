// LE CLOSING — LA RÉCITATION : dérouler une structure DE TÊTE, dans l'ordre.
//
// Ajouté le 2026-10-07, mot pour mot : « trop de choses à faire par jour
// […] faisons d'abord chaque jour les fondamentaux de fondamentaux
// (compta etc… tant que je ne sais pas dérouler par cœur un compte de
// résultat etc) ça ne sert à rien ».
//
// CE QUI N'EXISTAIT PAS. L'app savait tout faire sauf ça. Les EXOS lui
// DONNENT les lignes et lui font calculer — « voici la marge brute et les
// charges fixes, trouve l'EBITDA ». Les QUIZ lui font RECONNAÎTRE la bonne
// réponse parmi quatre. Les FLASHCARDS lui font RESTITUER une définition.
// Nulle part l'app ne lui demandait de PRODUIRE LA STRUCTURE ELLE-MÊME,
// de mémoire, dans l'ordre, sans qu'on lui souffle les lignes. Or c'est
// exactement ce qu'un entretien demande : « déroule-moi un compte de
// résultat ». Reconnaître n'est pas réciter. On ne peut pas calculer une
// cascade qu'on ne sait pas écrire.
//
// LA MÉCANIQUE, et pourquoi elle est ainsi :
// — les lignes arrivent MÉLANGÉES, et il les remet dans l'ordre. C'est la
//   seule forme de restitution qui se corrige objectivement sur un
//   téléphone (taper du texte libre se corrige mal, et s'auto-évaluer en
//   mémoire laisse toujours le bénéfice du doute) ;
// — il y a des INTRUS. Sans eux, l'exercice serait une permutation : on
//   finit par le réussir par élimination. Les intrus sont tous des lignes
//   que l'on croit voir dans un compte de résultat et qui n'y sont pas —
//   le remboursement du capital, l'investissement, le dividende. Refuser
//   une ligne fait partie de la récitation ;
// — aucun retour pendant la construction. On valide à la fin, d'un bloc.
//   Un retour ligne à ligne transformerait la récitation en jeu d'essais ;
// — puis trois questions « ça tombe où ? ». L'ordre prouve la mémoire,
//   ces questions prouvent la compréhension. Une récitation n'est PROPRE
//   que si les deux sont parfaits.
//
// Chaque fiche : {id, n, ic, titre, sujet, duree, avant, lignes[], intrus[],
// ou[], corrige}.
//   avant   : le rappel. Lu avant la première tentative seulement — après,
//             il est masqué derrière un bouton. On ne récite pas en lisant.
//   lignes  : {t, k} dans L'ORDRE ATTENDU. t = la ligne telle qu'elle
//             s'affiche (signe compris), k = l'idée à retenir, montrée au
//             corrigé en face de la ligne.
//   intrus  : {t, k} — t ne doit JAMAIS pouvoir se défendre, k dit pourquoi.
//   ou      : {q, opts[], bon, exp} — trois items, réponse unique.
//   corrige : ce que la structure dit vraiment. Le mot de la fin.

const RECITATIONS = [

/* ============ 1 ============ */
{id:"r1", n:1, ic:"📉", titre:"Le compte de résultat, de haut en bas",
 sujet:"Du chiffre d'affaires au résultat net — les douze lignes, et ce qui se retranche à chacune",
 duree:"~8 min",
 avant:`C'est LA question. « Déroule-moi un compte de résultat. » Si tu hésites, l'entretien est fini, et personne ne te le dira.
   <br><br>Un compte de résultat se lit <b>de haut en bas</b>, et chaque ligne se déduit de la précédente en retranchant une famille de charges. L'ordre n'est pas décoratif : il va du plus opérationnel au plus financier, puis au fiscal. On enlève d'abord ce que coûte le produit, puis ce que coûte la structure, puis ce que coûte la machine, puis ce que coûte la dette, puis ce que coûte l'État.
   <br><br>Les quatre soldes qui portent des noms, et à qui ils parlent : <b>la marge brute</b> au commerçant, <b>l'EBITDA</b> au banquier, <b>l'EBIT</b> à l'industriel, <b>le résultat net</b> à l'actionnaire.
   <br><br>Et une règle qui élimine la moitié des candidats : <b>le compte de résultat n'enregistre que des charges et des produits.</b> Jamais un mouvement de trésorerie pur. Un remboursement d'emprunt, un investissement, un dividende : aucun des trois n'y figure.`,
 lignes:[
  {t:"Chiffre d'affaires", k:"Ce qui est facturé sur la période — pas ce qui est encaissé. La différence s'appelle le poste clients."},
  {t:"− Coût des ventes", k:"Ce que coûtent les produits vendus : matière, achats consommés, main-d'œuvre directe. Il varie avec le volume."},
  {t:"= Marge brute", k:"Le premier chiffre qu'un financier regarde : ce qu'il reste sur 100 € vendus avant d'avoir payé quoi que ce soit d'autre."},
  {t:"− Charges externes", k:"Tout ce qu'on achète à l'extérieur sans que ça entre dans le produit : loyer, énergie, honoraires, marketing, assurances."},
  {t:"− Charges de personnel", k:"Salaires et charges sociales des fonctions non directes. La plus grosse charge fixe de la plupart des entreprises."},
  {t:"= EBITDA", k:"Ce que le métier produit avant toute décision comptable ou financière. Le chiffre du banquier, parce qu'il se compare d'une boîte à l'autre."},
  {t:"− Dotations aux amortissements et provisions", k:"Une charge qui ne sort pas de la caisse : elle constate l'usure d'un actif déjà payé."},
  {t:"= EBIT (résultat d'exploitation)", k:"La performance du métier, machine comprise. C'est lui qu'on compare au capital employé pour juger la rentabilité."},
  {t:"± Résultat financier", k:"Les intérêts payés, moins les produits financiers. Ici seulement apparaît le coût de la dette — et seulement les intérêts."},
  {t:"= Résultat avant impôt", k:"La base de l'impôt, à quelques retraitements fiscaux près."},
  {t:"− Impôt sur les sociétés", k:"25 % en France sur le résultat fiscal. Jamais calculé sur l'EBITDA, jamais sur le chiffre d'affaires."},
  {t:"= Résultat net", k:"Ce qui revient aux actionnaires. Et le point de départ du tableau de flux — pas son point d'arrivée."}],
 intrus:[
  {t:"− Remboursement du capital de l'emprunt", k:"Rembourser un capital n'appauvrit personne : une dette disparaît, du cash sort. Ça passe au tableau de flux, en financement. Seuls les INTÉRÊTS sont une charge."},
  {t:"− Achat d'une machine", k:"Un investissement n'est pas une charge : on échange du cash contre un actif. Il n'entre au compte de résultat que par petits morceaux, via l'amortissement."},
  {t:"− Dividendes versés aux actionnaires", k:"Un dividende est une répartition du résultat DÉJÀ calculé, pas une charge qui le réduit. Il sort après le résultat net, par les capitaux propres."}],
 ou:[
  {q:"Tu achètes une machine 120 000 € payée comptant, amortie sur 5 ans. Qu'est-ce qui bouge au compte de résultat cette année ?",
   opts:["Une charge de 120 000 €","Une dotation aux amortissements de 24 000 €","Rien, c'est un investissement","Une charge externe de 120 000 €"], bon:1,
   exp:"120 000 € sortent de la trésorerie aujourd'hui, mais le compte de résultat n'en voit qu'un cinquième par an : 24 000 € de dotation. C'est précisément l'écart entre le résultat et le cash — et il joue dans les deux sens."},
  {q:"Le loyer de l'entrepôt tombe sur quelle ligne ?",
   opts:["Coût des ventes","Charges externes","Charges de personnel","Dotations aux amortissements"], bon:1,
   exp:"Le loyer est acheté à l'extérieur et ne rentre pas dans le produit : charges externes. Il est donc SOUS la marge brute — un loyer ne dégrade pas ta marge brute, il dégrade ton EBITDA."},
  {q:"Tu rembourses 2 000 € par mois à ta banque, dont 300 € d'intérêts. Combien passe au compte de résultat ?",
   opts:["2 000 €","1 700 €","300 €","Rien"], bon:2,
   exp:"300 €. Les 1 700 € de capital éteignent une dette, ils n'appauvrissent pas l'entreprise. C'est l'erreur de débutant la plus fréquente, et elle fausse tout un prévisionnel."}],
 corrige:`Retiens la logique, pas la liste : <b>on enlève le produit, puis la structure, puis la machine, puis la banque, puis l'État.</b> Dans cet ordre, toujours. Et si une ligne te vient qui n'est ni une charge ni un produit, c'est qu'elle appartient au tableau de flux, pas ici.`},

/* ============ 2 ============ */
{id:"r2", n:2, ic:"🇫🇷", titre:"Les soldes intermédiaires de gestion",
 sujet:"La version française du compte de résultat : marge commerciale, valeur ajoutée, EBE, résultat courant",
 duree:"~10 min",
 avant:`La récitation 1 est la version anglo-saxonne, celle des banques d'affaires. Voici la française, celle du plan comptable, des liasses fiscales et des commissaires aux comptes. Tu croiseras les deux, souvent dans la même semaine.
   <br><br>Elle ajoute deux soldes que l'anglo-saxon ne connaît pas, et ils sont les plus intéressants.
   <br><br><b>La valeur ajoutée</b> = ce que l'entreprise crée vraiment : son chiffre d'affaires moins TOUT ce qu'elle a acheté à l'extérieur. C'est le gâteau à partager entre les salariés (charges de personnel), l'État (impôts et taxes), les prêteurs (intérêts), et l'entreprise elle-même (ce qui reste). Un seul chiffre te dit à qui profite une activité.
   <br><br><b>L'excédent brut d'exploitation (EBE)</b> = la valeur ajoutée moins la part des salariés et de l'État. C'est l'EBITDA français, au détail près.
   <br><br>Et une subtilité qui trahit le niveau : la cascade française distingue le <b>résultat courant</b> (ce qui se répète) de l'<b>exceptionnel</b> (ce qui ne se répète pas). Un acheteur ne paie jamais pour l'exceptionnel.`,
 lignes:[
  {t:"Chiffre d'affaires", k:"Ventes de marchandises + production vendue."},
  {t:"− Achats consommés", k:"Achats de l'exercice corrigés de la variation de stock. Consommé, pas acheté : ce qui dort en stock n'est pas une charge."},
  {t:"= Marge commerciale (ou marge brute)", k:"Ce que laisse l'acte de vendre, avant toute structure."},
  {t:"− Autres achats et charges externes", k:"Loyers, énergie, intérim, honoraires, sous-traitance. Tout ce qui vient de l'extérieur."},
  {t:"= Valeur ajoutée", k:"La richesse réellement créée par l'entreprise. Le gâteau, avant partage."},
  {t:"− Impôts et taxes", k:"CFE, CVAE, taxe foncière. L'État se sert avant les salariés dans l'ordre comptable."},
  {t:"− Charges de personnel", k:"Salaires + charges sociales. Dans l'industrie française, c'est souvent 60 à 70 % de la valeur ajoutée."},
  {t:"= Excédent brut d'exploitation (EBE)", k:"Ce que l'exploitation dégage avant amortissements, financement et impôt sur les bénéfices. L'EBITDA français."},
  {t:"− Dotations aux amortissements et provisions", k:"Le coût de l'usure et du risque, constatés sans sortie de caisse."},
  {t:"= Résultat d'exploitation", k:"La performance du métier, machine comprise."},
  {t:"± Résultat financier", k:"Intérêts versés, produits de placement, différences de change."},
  {t:"= Résultat courant avant impôt", k:"Ce qui se répète. C'est CE solde qu'un acheteur regarde, pas le résultat net."},
  {t:"± Résultat exceptionnel", k:"Cession d'un immeuble, indemnité de litige, restructuration. Ce qui ne se reproduira pas."},
  {t:"− Participation des salariés et impôt sur les sociétés", k:"Les deux derniers prélèvements, dans cet ordre."},
  {t:"= Résultat net", k:"Le solde de tout compte, courant et exceptionnel confondus. D'où sa fragilité comme indicateur."}],
 intrus:[
  {t:"− Variation du besoin en fonds de roulement", k:"Le BFR n'est pas une charge : c'est de l'argent immobilisé dans le cycle. Il n'apparaît qu'au tableau de flux."},
  {t:"+ Souscription d'un nouvel emprunt", k:"Encaisser un emprunt n'enrichit personne — on reçoit du cash et on doit la même somme. Flux de financement, pas produit."},
  {t:"= Capacité d'autofinancement", k:"La CAF se calcule À PARTIR du résultat net, en dehors de la cascade. Ce n'est pas un solde intermédiaire de gestion."}],
 ou:[
  {q:"Une entreprise fait 10 M€ de chiffre d'affaires et 3 M€ de valeur ajoutée. Qu'est-ce que ça dit ?",
   opts:["Sa marge nette est de 30 %","Elle achète 7 M€ à l'extérieur : elle transforme peu","Elle est rentable à 30 %","Son EBE est de 3 M€"], bon:1,
   exp:"7 M€ partent chez des tiers avant même de payer un salaire. Un négociant a une valeur ajoutée faible, un cabinet de conseil une valeur ajoutée proche de 90 % du chiffre d'affaires. Ce ratio dit le métier, pas la performance."},
  {q:"L'entreprise vend un entrepôt avec 2 M€ de plus-value. Où tombe le gain ?",
   opts:["Au résultat d'exploitation","Au résultat financier","Au résultat exceptionnel","À la valeur ajoutée"], bon:2,
   exp:"Exceptionnel. Et c'est pour ça qu'on normalise : un résultat net gonflé par une cession ne vaut rien pour valoriser. Un acheteur paie un multiple du résultat COURANT."},
  {q:"Les charges de personnel pèsent 85 % de la valeur ajoutée. Verdict ?",
   opts:["Normal pour l'industrie","L'entreprise est en danger : il reste peu pour l'État, la banque et la machine","C'est bon signe, elle crée de l'emploi","Impossible, le ratio dépasse toujours 100 %"], bon:1,
   exp:"Au-delà de 80 %, il ne reste plus rien pour amortir, payer les intérêts et investir. C'est le ratio qui annonce les restructurations deux ans avant qu'elles arrivent."}],
 corrige:`Deux soldes à ne jamais lâcher : la <b>valeur ajoutée</b> dit ce que l'entreprise crée, l'<b>EBE</b> ce qu'il en reste après les hommes et l'État. Le reste de la cascade n'est que de la soustraction. Et si on te demande « combien gagne vraiment cette boîte ? », réponds par le <b>résultat courant</b> — jamais par le résultat net.`},

/* ============ 3 ============ */
{id:"r3", n:3, ic:"🧱", titre:"L'actif du bilan, du moins liquide au plus liquide",
 sujet:"Immobilisations, stocks, créances, trésorerie — et pourquoi cet ordre",
 duree:"~7 min",
 avant:`Le bilan est une photo, pas un film. À gauche, l'actif : <b>où est l'argent</b>. À droite, le passif : <b>d'où il vient</b>.
   <br><br>L'actif français se range par <b>liquidité croissante</b> : en haut ce qui mettrait des mois à se transformer en cash, en bas le cash lui-même. Ce n'est pas une convention gratuite — c'est un test de solvabilité intégré à la présentation. Plus la masse est haute, plus elle est immobilisée ; plus elle est basse, plus elle est disponible.
   <br><br>(Les comptes anglo-saxons font l'inverse : cash en haut. Même logique, lue à l'envers. Ne te fais pas piéger.)
   <br><br>Et une règle d'entrée : <b>un actif, c'est une ressource contrôlée dont on attend des avantages futurs.</b> Une marque rachetée est un actif ; une marque construite en interne n'y est presque jamais. Un contrat prometteur n'est pas un actif. Des salariés brillants non plus.`,
 lignes:[
  {t:"Immobilisations incorporelles", k:"Brevets, licences, logiciels, fonds de commerce, goodwill. Les actifs qu'on ne peut pas toucher — les plus difficiles à revendre."},
  {t:"Immobilisations corporelles", k:"Terrains, bâtiments, machines, véhicules. Comptabilisés au coût d'achat moins les amortissements, jamais à la valeur de marché."},
  {t:"Immobilisations financières", k:"Titres de participation, prêts accordés, dépôts de garantie."},
  {t:"= Actif immobilisé", k:"Ce qui sert durablement l'exploitation. Le haut de bilan."},
  {t:"Stocks et en-cours", k:"Matières, produits en cours, produits finis. Du cash transformé en marchandise, qui attend un client."},
  {t:"Créances clients", k:"Ce qui est facturé mais pas encaissé. Comptablement un produit, dans les faits une avance faite au client."},
  {t:"Autres créances et comptes de régularisation", k:"TVA déductible, charges constatées d'avance, acomptes d'impôt."},
  {t:"Trésorerie et équivalents", k:"Caisse, comptes bancaires, placements immédiatement disponibles. Le seul poste qu'on ne discute pas."},
  {t:"= Actif circulant", k:"Ce qui tourne avec le cycle d'exploitation : acheter, produire, vendre, encaisser, recommencer."},
  {t:"= TOTAL DE L'ACTIF", k:"Égal au total du passif. Toujours. Si ce n'est pas le cas, ce n'est pas un bilan."}],
 intrus:[
  {t:"Capitaux propres", k:"C'est une RESSOURCE, pas un emploi : elle est au passif. Croire que les capitaux propres sont « de l'argent qu'on a » est l'erreur fondatrice."},
  {t:"Dettes fournisseurs", k:"Au passif. Un fournisseur qui t'accorde 60 jours te finance — c'est une ressource, même si elle ne coûte rien."},
  {t:"Chiffre d'affaires de l'exercice", k:"Un flux de la période, pas un stock à une date. Il n'y a aucune ligne de compte de résultat dans un bilan."}],
 ou:[
  {q:"L'entreprise a développé sa propre marque, estimée à 20 M€ par un cabinet. Que vaut-elle au bilan ?",
   opts:["20 M€ en incorporel","Rien ou presque","20 M€ en financier","Sa valeur de marque moins l'amortissement"], bon:1,
   exp:"Presque rien. Une marque créée en interne ne s'active pas ; une marque RACHETÉE, si. Deux entreprises identiques peuvent donc afficher des bilans très différents selon qu'elles ont construit ou acheté. Le bilan n'est pas la valeur."},
  {q:"Un immeuble acheté 2 M€ il y a vingt ans en vaut 8 M€ aujourd'hui. Il figure pour combien ?",
   opts:["8 M€","2 M€ moins les amortissements","2 M€","La moyenne des deux"], bon:1,
   exp:"Au coût historique moins les amortissements — soit peut-être 800 k€. Les plus-values latentes n'existent pas en comptabilité française. C'est pour ça qu'on retraite avant de valoriser une foncière."},
  {q:"Quel poste de l'actif grossit mécaniquement quand l'activité accélère ?",
   opts:["Les immobilisations corporelles","Les stocks et les créances clients","Les immobilisations financières","La trésorerie"], bon:1,
   exp:"Stocks et créances : c'est le BFR. Une croissance rapide consomme du cash avant d'en produire, et c'est ainsi que des entreprises rentables meurent. La trésorerie, elle, BAISSE."}],
 corrige:`L'actif ne te dit pas ce que l'entreprise vaut — il te dit <b>ce qu'elle a payé et ce qu'elle n'a pas encore consommé</b>. Lis-le toujours de haut en bas en te demandant : « combien de temps pour que cette ligne redevienne du cash ? »`},

/* ============ 4 ============ */
{id:"r4", n:4, ic:"🏛️", titre:"Le passif du bilan, du moins exigible au plus exigible",
 sujet:"Capitaux propres, provisions, dettes financières, dettes d'exploitation",
 duree:"~7 min",
 avant:`Le passif répond à une seule question : <b>à qui appartient l'argent qui finance l'actif, et quand faut-il le rendre ?</b>
   <br><br>L'ordre va du <b>moins exigible au plus exigible</b>. En haut, ce qu'on ne rendra jamais (les capitaux propres). En bas, ce qu'il faut payer dans trente jours (les fournisseurs, l'URSSAF). Lire un passif de haut en bas, c'est lire un échéancier.
   <br><br>Le piège de vocabulaire qui coûte des points : <b>toutes les dettes ne sont pas financières</b>. La dette fournisseur est une dette d'exploitation — gratuite, renouvelée en permanence, elle fait partie du BFR. La dette financière porte des intérêts et se rembourse à date. Quand un financier dit « la dette », il parle de la seconde.
   <br><br>Et la ligne la plus instructive est la plus discrète : <b>les capitaux propres contiennent le résultat de l'exercice.</b> C'est par là, et seulement par là, que le compte de résultat rejoint le bilan.`,
 lignes:[
  {t:"Capital social", k:"Ce que les actionnaires ont apporté. Jamais remboursable tant que la société vit."},
  {t:"+ Primes et réserves", k:"Les bénéfices passés non distribués. Le patrimoine accumulé de l'entreprise."},
  {t:"+ Report à nouveau", k:"Le cumul des résultats non affectés. Négatif, il raconte une histoire de pertes successives."},
  {t:"+ Résultat de l'exercice", k:"Le pont entre les deux états : le résultat net du compte de résultat atterrit ICI, et nulle part ailleurs."},
  {t:"= Capitaux propres", k:"Le matelas. S'ils deviennent inférieurs à la moitié du capital social, une procédure d'alerte s'ouvre."},
  {t:"Provisions pour risques et charges", k:"Un litige, une garantie, une restructuration annoncée. Une dette probable dont le montant ou l'échéance est incertain."},
  {t:"Dettes financières", k:"Emprunts bancaires, obligations, crédit-bail, découvert. Elles portent intérêt et ont une échéance."},
  {t:"Dettes fournisseurs", k:"Le crédit que te font tes fournisseurs. Gratuit, exigible à court terme, et composante du BFR."},
  {t:"Dettes fiscales et sociales", k:"TVA collectée, URSSAF, impôt dû. Les créanciers les plus dangereux : ils sont privilégiés et ne négocient pas."},
  {t:"= Total des dettes", k:"Tout ce qui devra être rendu, un jour, à quelqu'un."},
  {t:"= TOTAL DU PASSIF", k:"Égal au total de l'actif. L'équilibre n'est pas une performance : c'est une identité comptable."}],
 intrus:[
  {t:"Trésorerie et équivalents", k:"À l'actif. Confondre « j'ai du cash » et « je dois de l'argent » est le genre d'erreur qu'on ne rattrape pas en entretien."},
  {t:"Créances clients", k:"À l'actif. C'est toi qui finances ton client, pas l'inverse."},
  {t:"− Dotations aux amortissements de l'exercice", k:"Une charge du compte de résultat. Au bilan, les amortissements CUMULÉS se déduisent de l'actif immobilisé, ils ne s'ajoutent pas au passif."}],
 ou:[
  {q:"Une entreprise affiche 5 M€ de dettes fournisseurs et 2 M€ d'emprunts bancaires. Quelle est sa dette financière brute ?",
   opts:["7 M€","5 M€","2 M€","2 M€ moins la trésorerie"], bon:2,
   exp:"2 M€. Les dettes fournisseurs ne sont pas de la dette financière : elles sont dans le BFR. Les additionner double le levier et fausse tous les ratios — c'est l'erreur qui fait recalculer un covenant."},
  {q:"L'entreprise fait 1 M€ de bénéfice. Qu'est-ce qui bouge au passif ?",
   opts:["Les dettes financières baissent de 1 M€","Les capitaux propres montent de 1 M€","Rien tant que le dividende n'est pas voté","Les provisions montent de 1 M€"], bon:1,
   exp:"Les capitaux propres montent de 1 M€ par la ligne « résultat de l'exercice ». C'est l'unique articulation entre compte de résultat et bilan — et la première chose qu'on vérifie dans un modèle qui ne boucle pas."},
  {q:"Capitaux propres de 100, dettes financières de 300, trésorerie de 50. Le gearing ?",
   opts:["3,0×","2,5×","4,0×","0,33×"], bon:1,
   exp:"Gearing = dette NETTE ÷ capitaux propres = (300 − 50) ÷ 100 = 2,5×. Au-delà de 1, tu dois plus que tu ne possèdes ; à 2,5, un prêteur regarde d'abord la génération de cash, pas le bilan."}],
 corrige:`Le passif est un <b>échéancier classé par urgence</b>. Et la seule ligne qui relie tes deux états financiers est « résultat de l'exercice » : si ton bilan ne boucle pas, c'est là qu'il faut regarder en premier.`},

/* ============ 5 ============ */
{id:"r5", n:5, ic:"⚙️", titre:"Fonds de roulement, BFR, trésorerie nette",
 sujet:"Le bilan fonctionnel — la seule lecture qui explique pourquoi une boîte rentable manque de cash",
 duree:"~9 min",
 avant:`Le bilan comptable dit où est l'argent. Le bilan <b>fonctionnel</b> dit si le montage tient debout. Il repose sur une règle de bon sens : <b>un besoin permanent se finance par une ressource permanente.</b> Financer une machine par un découvert, c'est la faillite à retardement.
   <br><br>Trois grandeurs, et une seule équation à connaître par cœur :
   <br><br><b>Fonds de roulement</b> = ressources stables − actif immobilisé. Ce qui reste des financements durables une fois l'outil payé. Un matelas.
   <br><b>Besoin en fonds de roulement</b> = stocks + créances − dettes d'exploitation. L'argent piégé en permanence dans le cycle : tu paies tes fournisseurs et tes stocks avant que tes clients ne te paient.
   <br><b>Trésorerie nette = fonds de roulement − BFR.</b> Le matelas moins le besoin. C'est une CONSÉQUENCE, jamais une décision.
   <br><br>Voilà pourquoi une entreprise rentable dépose le bilan : son BFR grossit plus vite que son fonds de roulement. Le résultat est bon, la trésorerie est morte.`,
 lignes:[
  {t:"Stocks", k:"Du cash transformé en marchandise. Il ne redeviendra du cash qu'après la vente ET l'encaissement."},
  {t:"+ Créances clients", k:"Ton client utilise ton argent gratuitement pendant 30, 60 ou 90 jours."},
  {t:"− Dettes fournisseurs et dettes d'exploitation", k:"Le seul financement gratuit du cycle. En obtenir plus coûte zéro et libère du cash immédiatement."},
  {t:"= Besoin en fonds de roulement", k:"L'argent immobilisé en permanence. Il grossit proportionnellement à l'activité — c'est le piège de la croissance."},
  {t:"Capitaux propres + dettes financières à long terme", k:"Les ressources qu'on ne te réclamera pas demain matin."},
  {t:"= Ressources stables", k:"Le financement durable, actionnaires et banquiers de long terme confondus."},
  {t:"− Actif immobilisé", k:"L'outil de travail, qui a déjà consommé une partie de ces ressources."},
  {t:"= Fonds de roulement", k:"Ce qui reste des ressources durables pour financer le cycle. Négatif, le montage est déjà bancal."},
  {t:"Fonds de roulement − besoin en fonds de roulement", k:"La soustraction qui conclut tout."},
  {t:"= Trésorerie nette", k:"Positive : le cycle est financé par des ressources durables. Négative : il est financé par le découvert, et la banque décide de ta survie."}],
 intrus:[
  {t:"+ Trésorerie disponible", k:"La trésorerie est le RÉSULTAT du calcul, jamais une de ses composantes. L'inclure dans le BFR, c'est se mordre la queue."},
  {t:"+ Découvert bancaire", k:"C'est de la trésorerie négative, pas une ressource stable ni une dette d'exploitation. Le mettre dans le BFR efface précisément le problème qu'on cherche à voir."},
  {t:"− Dotations aux amortissements de l'exercice", k:"Une charge du compte de résultat. Le bilan fonctionnel ne manipule que des stocks à une date, pas des flux de la période."}],
 ou:[
  {q:"Fonds de roulement 200 k€, BFR 350 k€. Que vit l'entreprise ?",
   opts:["Une trésorerie de 550 k€","Un découvert de 150 k€","Un fonds de roulement négatif","Rien d'anormal"], bon:1,
   exp:"Trésorerie nette = 200 − 350 = −150 k€. Le cycle d'exploitation est financé à court terme par la banque. Tant que la banque suit, ça tient ; le jour où elle coupe, c'est fini en une semaine."},
  {q:"L'entreprise double son chiffre d'affaires en un an, à conditions de paiement inchangées. Le BFR…",
   opts:["reste stable","double à peu près","baisse grâce aux économies d'échelle","dépend uniquement de la marge"], bon:1,
   exp:"Il double. Stocks et créances suivent l'activité presque proportionnellement. Doubler son chiffre d'affaires sans financer le BFR, c'est la définition même de la croissance qui tue."},
  {q:"Quel métier a structurellement un BFR négatif ?",
   opts:["Un constructeur de machines-outils","La grande distribution alimentaire","Un cabinet de conseil","Un chantier naval"], bon:1,
   exp:"La grande distribution : le client paie comptant, les stocks tournent en quelques jours, les fournisseurs sont payés à 60 jours. Les fournisseurs financent le cycle — et le BFR négatif devient une machine à cash tant que l'enseigne grandit."}],
 corrige:`Une seule équation : <b>trésorerie nette = fonds de roulement − BFR</b>. Elle explique 90 % des morts d'entreprises rentables. Quand on te montre un compte de résultat flatteur, demande le BFR en jours de chiffre d'affaires — la réponse, ou son absence, dit tout.`},

/* ============ 6 ============ */
{id:"r6", n:6, ic:"💧", titre:"Du résultat net à la capacité d'autofinancement",
 sujet:"La CAF : ce que l'activité dégage vraiment, avant tout investissement",
 duree:"~8 min",
 avant:`Le résultat net est pollué par des écritures qui ne touchent jamais la caisse. La <b>capacité d'autofinancement</b> les enlève : c'est le cash que l'exploitation dégage avant d'avoir investi, remboursé ou distribué quoi que ce soit.
   <br><br>La règle de tri est mécanique, et elle suffit : <b>on ajoute toutes les charges non décaissées, on retire tous les produits non encaissés.</b> Les dotations ont réduit le résultat sans sortir un euro : on les rajoute. Les reprises l'ont gonflé sans entrée d'argent : on les retire.
   <br><br>Le cas qui piège tout le monde est la <b>cession d'actif</b>. Vendre une machine 30 qui vaut 10 au bilan génère une plus-value de 20 au compte de résultat. Mais le cash reçu est de 30, et il n'appartient pas à l'exploitation : c'est un flux d'investissement. Donc on sort la totalité du résultat de cession de la CAF, et on fait réapparaître les 30 plus bas, en investissement. Ni plus ni moins.
   <br><br>Et la phrase à retenir : <b>la CAF n'est pas de la trésorerie.</b> Entre les deux, il reste le BFR à financer.`,
 lignes:[
  {t:"Résultat net de l'exercice", k:"Le point de départ. Pollué par tout ce qui est comptable et non monétaire."},
  {t:"+ Dotations aux amortissements, dépréciations et provisions", k:"Des charges qui n'ont fait sortir aucun euro. On les remet."},
  {t:"− Reprises sur amortissements et provisions", k:"Des produits qui n'ont fait entrer aucun euro. On les enlève."},
  {t:"− Produits de cession d'éléments d'actif", k:"Le prix de vente encaissé : c'est un flux d'investissement, pas d'exploitation. Il ressortira plus bas."},
  {t:"+ Valeur comptable des éléments d'actif cédés", k:"La charge constatée à la sortie de l'actif. On la neutralise de la même façon."},
  {t:"= Capacité d'autofinancement", k:"Le cash potentiel dégagé par l'activité. Potentiel : il n'est pas encore à la banque."},
  {t:"− Variation du besoin en fonds de roulement", k:"Ce que la croissance du cycle a immobilisé. Le BFR baisse ? Il libère du cash, et le signe s'inverse."},
  {t:"= Flux de trésorerie d'exploitation", k:"Cette fois, c'est du vrai cash. C'est lui qui paiera les investissements, la dette et les dividendes."}],
 intrus:[
  {t:"− Investissements de l'exercice", k:"Le capex vient APRÈS : il est financé par la CAF, il n'en fait pas partie. Les mélanger, c'est ne plus savoir si l'activité s'autofinance."},
  {t:"− Dividendes versés", k:"L'autofinancement, c'est la CAF MOINS les dividendes. Le dividende est un arbitrage d'affectation, pas une charge d'exploitation."},
  {t:"+ Nouvel emprunt bancaire", k:"Un financement externe. La CAF mesure précisément ce qu'on dégage SANS lui."}],
 ou:[
  {q:"Résultat net 100, dotations 60, aucune reprise ni cession. La CAF ?",
   opts:["40","100","160","60"], bon:2,
   exp:"160. Et c'est l'écart le plus fréquent entre un résultat « médiocre » et une activité qui dégage très bien du cash : une industrie lourde affiche souvent un résultat net faible et une CAF massive."},
  {q:"La CAF est de 160 et le BFR a augmenté de 200. Le flux d'exploitation ?",
   opts:["+360","−40","+160","+200"], bon:1,
   exp:"−40. L'activité dégage 160 de cash potentiel et en immobilise 200 dans le cycle : la caisse se vide alors que le résultat est positif. C'est exactement le scénario de la croissance non financée."},
  {q:"L'entreprise vend pour 30 une machine inscrite à 10 au bilan. Effet sur la CAF ?",
   opts:["+30","+20","0, le résultat de cession est neutralisé","−10"], bon:2,
   exp:"Zéro : on retire les 30 de produit de cession et on rajoute les 10 de valeur comptable, ce qui annule exactement la plus-value de 20 passée au résultat. Les 30 encaissés réapparaissent en flux d'investissement. La CAF ne doit mesurer que l'exploitation."}],
 corrige:`La CAF mesure la <b>machine</b>, pas le patrimoine ni la stratégie. Un seul réflexe : partir du résultat net et annuler tout ce qui n'est pas monétaire. Et ne jamais oublier la ligne d'après — <b>entre la CAF et la banque, il y a le BFR</b>.`},

/* ============ 7 ============ */
{id:"r7", n:7, ic:"🌊", titre:"Le tableau de flux de trésorerie",
 sujet:"Les trois blocs — exploitation, investissement, financement — et la réconciliation de la caisse",
 duree:"~10 min",
 avant:`Troisième état, le moins lu et le plus honnête : il ne se discute pas. Un résultat se négocie avec des hypothèses ; une trésorerie se constate à la banque.
   <br><br>Il est construit en <b>trois blocs</b>, et leur somme doit expliquer au centime près la variation de la caisse entre l'ouverture et la clôture. L'ordre raconte une histoire : ce que le métier produit, ce que l'outil consomme, ce que les financeurs apportent ou reprennent.
   <br><br><b>Exploitation</b> : le métier. <b>Investissement</b> : l'outil. <b>Financement</b> : les actionnaires et les banques.
   <br><br>Et une grille de lecture qui vaut un diagnostic complet. Exploitation positive, investissement négatif, financement négatif : une entreprise mature qui s'autofinance et rembourse — le profil idéal. Exploitation négative compensée par du financement positif : quelqu'un paie la facture, et il ne le fera pas éternellement.`,
 lignes:[
  {t:"Résultat net", k:"Toujours le point de départ de la méthode indirecte."},
  {t:"+ Charges non décaissées (dotations, provisions)", k:"On annule le comptable pour retrouver le monétaire."},
  {t:"− Variation du besoin en fonds de roulement", k:"L'argent immobilisé dans le cycle. La ligne qui sépare le résultat du cash."},
  {t:"= Flux net de trésorerie d'exploitation", k:"Ce que le métier rapporte réellement. S'il est durablement négatif, rien d'autre ne compte."},
  {t:"− Acquisitions d'immobilisations (capex)", k:"L'investissement sort EN ENTIER l'année où il est payé — pas étalé comme l'amortissement."},
  {t:"+ Cessions d'actifs", k:"Le prix encaissé lors d'une vente d'actif. C'est ici qu'il réapparaît, et nulle part ailleurs."},
  {t:"= Flux net d'investissement", k:"Négatif chez une entreprise qui prépare l'avenir. Durablement positif, elle vend ses meubles."},
  {t:"+ Augmentation de capital", k:"Les actionnaires remettent au pot."},
  {t:"+ Nouveaux emprunts − remboursements d'emprunts", k:"Le capital de la dette circule ICI. Les intérêts, eux, sont restés au résultat net."},
  {t:"− Dividendes versés", k:"La seule ligne où le dividende apparaît dans tous les états financiers."},
  {t:"= Flux net de financement", k:"Qui finance qui, et dans quel sens."},
  {t:"= Variation de trésorerie de la période", k:"La somme des trois blocs. Pas une estimation : une identité."},
  {t:"+ Trésorerie d'ouverture", k:"Le solde au premier jour de l'exercice."},
  {t:"= Trésorerie de clôture", k:"Et ce chiffre doit être EXACTEMENT celui du bilan. Sinon le tableau est faux."}],
 intrus:[
  {t:"− Charges d'intérêts de l'exercice", k:"Déjà déduites : elles sont dans le résultat net, point de départ. Les retirer une seconde fois les compte deux fois — l'erreur classique du modèle qui ne boucle pas."},
  {t:"= Marge brute", k:"Un solde du compte de résultat. Le tableau de flux ne connaît que des mouvements de caisse."},
  {t:"+ Plus-value latente sur un immeuble", k:"Latente veut dire « pas encaissée ». Aucune trésorerie n'a bougé, donc aucune ligne."}],
 ou:[
  {q:"Flux d'exploitation +500, investissement −800, financement +400. Que lis-tu ?",
   opts:["L'entreprise se vide","Elle investit plus qu'elle ne dégage et finance l'écart par de la dette ou du capital","Elle est en faillite","Elle rembourse ses dettes"], bon:1,
   exp:"Variation de trésorerie : +100. Elle investit 800 pour 500 dégagés et comble les 300 manquants en se finançant. Ce n'est ni bon ni mauvais en soi : tout dépend du rendement attendu de ces 800. Mais le jour où le financement se ferme, l'investissement s'arrête net."},
  {q:"Une entreprise affiche un résultat net de +2 M€ et un flux d'exploitation de −1 M€. La cause la plus probable ?",
   opts:["Trop d'amortissements","Une explosion du BFR ou des produits non encaissés","Un dividende trop élevé","Un investissement massif"], bon:1,
   exp:"Le BFR. Un dividende et un investissement sont hors du bloc exploitation, et les amortissements AMÉLIORENT le flux. Reste le cycle : des clients qui ne paient pas, ou des stocks qui gonflent. Et c'est le premier signal de fraude au chiffre d'affaires."},
  {q:"Où apparaît le remboursement du capital d'un emprunt ?",
   opts:["En exploitation","En investissement","En financement","Au compte de résultat"], bon:2,
   exp:"En financement. Les intérêts sont une charge et vivent dans le résultat net ; le capital est un mouvement de caisse entre l'entreprise et son prêteur. Confondre les deux fausse à la fois le résultat et le flux."}],
 corrige:`Trois blocs, une identité : <b>exploitation + investissement + financement = variation de la caisse</b>. Et le test qui ne pardonne pas : la trésorerie de clôture du tableau doit être au centime celle du bilan. Si tu ne dois lire qu'un seul état financier d'une entreprise que tu ne connais pas, lis celui-là.`},

/* ============ 8 ============ */
{id:"r8", n:8, ic:"💵", titre:"De l'EBIT au flux disponible : FCFF, puis FCFE",
 sujet:"Le flux qu'on actualise en DCF, et celui qui revient aux seuls actionnaires",
 duree:"~9 min",
 avant:`Tout le DCF tient dans cette cascade. Si tu la récites juste, tu peux valoriser ; sinon, tu récites des formules.
   <br><br>Le <b>FCFF</b> (free cash flow to firm) est le flux disponible pour <b>tous</b> les apporteurs de capitaux, banquiers et actionnaires confondus. D'où la règle qui structure tout : <b>il part de l'EBIT, jamais du résultat net</b>, parce qu'on le veut indépendant du financement. On l'actualisera au WACC, qui contient déjà l'effet de la dette : y mettre les intérêts les compterait deux fois.
   <br><br>D'où aussi l'impôt « comme si » : <b>NOPAT = EBIT × (1 − taux)</b>. On calcule l'impôt que paierait l'entreprise si elle n'avait aucune dette. Le gain fiscal réel de la dette est logé dans le WACC, pas ici.
   <br><br>Le <b>FCFE</b> descend d'un étage : on paie les banquiers, et ce qui reste appartient aux actionnaires. Lui s'actualise au coût des fonds propres, et donne directement la valeur des capitaux propres.`,
 lignes:[
  {t:"EBIT (résultat d'exploitation)", k:"Le point de départ : la performance du métier, avant tout financement."},
  {t:"− Impôt théorique sur l'EBIT", k:"L'impôt que l'entreprise paierait sans aucune dette. On neutralise la structure financière."},
  {t:"= NOPAT", k:"Résultat d'exploitation après impôt, sans dette. Le profit économique du métier."},
  {t:"+ Dotations aux amortissements", k:"Une charge sans sortie de caisse : on la remet, comme partout ailleurs."},
  {t:"− Variation du besoin en fonds de roulement", k:"La croissance immobilise du cash dans le cycle. Un plan d'affaires qui l'oublie surévalue toujours."},
  {t:"− Investissements (capex)", k:"Ce qu'il faut dépenser pour maintenir ET développer l'outil. À long terme, capex ≈ amortissements, sinon l'outil fond."},
  {t:"= FCFF — flux disponible pour tous les apporteurs de capitaux", k:"Le flux du DCF. On l'actualise au WACC et on obtient la VALEUR D'ENTREPRISE."},
  {t:"− Intérêts après impôt", k:"On paie les prêteurs. Après impôt, parce que les intérêts sont déductibles."},
  {t:"− Remboursements d'emprunts", k:"Le capital rendu à la banque."},
  {t:"+ Nouveaux emprunts", k:"Ce que la banque remet dans la machine."},
  {t:"= FCFE — flux disponible pour les seuls actionnaires", k:"Actualisé au coût des fonds propres, il donne directement la VALEUR DES CAPITAUX PROPRES."}],
 intrus:[
  {t:"− Dividendes versés", k:"Le FCFE est ce qui POURRAIT être distribué, avant qu'on décide de le faire. Soustraire le dividende, c'est confondre la capacité et le choix."},
  {t:"− Variation de la trésorerie", k:"La trésorerie est le résultat de la cascade, pas une de ses lignes."},
  {t:"+ Produit de cession d'une filiale", k:"Un flux exceptionnel, non récurrent. Le DCF n'actualise que ce qui se reproduit — sinon la valeur terminale hérite d'une cession unique répétée à l'infini."}],
 ou:[
  {q:"Pourquoi le FCFF part-il de l'EBIT et non du résultat net ?",
   opts:["Parce que l'EBIT est plus grand","Pour rester indépendant de la structure financière, l'effet de la dette étant déjà dans le WACC","Parce que le résultat net inclut l'exceptionnel","Par convention anglo-saxonne"], bon:1,
   exp:"Le WACC contient déjà le coût et l'avantage fiscal de la dette. Partir d'un flux après intérêts les compterait une seconde fois et surévaluerait l'entreprise — d'autant plus qu'elle est endettée."},
  {q:"EBIT 100, IS 25 %, dotations 30, capex 40, BFR +10. Le FCFF ?",
   opts:["80","55","75","45"], bon:1,
   exp:"NOPAT = 75 ; 75 + 30 − 10 − 40 = 55. Remarque l'ordre de grandeur : un EBIT de 100 ne donne que 55 de cash disponible. C'est l'écart que les plans d'affaires optimistes oublient systématiquement."},
  {q:"Sur un horizon long, quelle relation attend-on entre capex et dotations ?",
   opts:["Capex très inférieur aux dotations","Capex à peu près égal aux dotations","Capex nul","Aucune relation"], bon:1,
   exp:"À l'équilibre, le capex remplace ce qui s'use : il converge vers les dotations. Un modèle où le capex reste durablement sous les amortissements fabrique du cash en laissant l'outil se dégrader — et c'est l'astuce la plus courante pour embellir une valeur terminale."}],
 corrige:`Deux flux, deux taux, deux résultats. <b>FCFF au WACC → valeur d'entreprise. FCFE au coût des fonds propres → valeur des capitaux propres.</b> Croiser les deux est l'erreur qui se voit immédiatement dans un modèle, et elle se compte en dizaines de pour cent.`},

/* ============ 9 ============ */
{id:"r9", n:9, ic:"🌉", titre:"Le pont valeur d'entreprise → prix par action",
 sujet:"De la valeur de l'outil économique au prix d'une action",
 duree:"~8 min",
 avant:`Une valorisation donne une <b>valeur d'entreprise</b> : ce que vaut l'outil économique, tous financeurs confondus. Personne n'achète ça. On achète des <b>actions</b>. Entre les deux, il y a un pont, et c'est là que les deals se gagnent ou se perdent.
   <br><br>Le principe tient en une phrase : <b>on retire tout ce qui devra être payé à quelqu'un d'autre que l'actionnaire.</b> La dette, bien sûr. Mais aussi les minoritaires, les retraites non financées, les litiges provisionnés, les earn-outs dus — tout ce qui ressemble à une dette sans porter son nom (les <i>debt-like items</i>). Et on ajoute le cash, puisqu'il est déjà là.
   <br><br>Le piège, systématique en entretien : <b>les dettes fournisseurs ne sont pas de la dette.</b> Elles sont dans le BFR, donc déjà dans les flux qui ont servi à calculer la valeur d'entreprise. Les retirer ici reviendrait à les compter deux fois.
   <br><br>Dernier étage, celui qu'on oublie : on divise par le nombre d'actions <b>dilué</b>, options et instruments convertibles compris.`,
 lignes:[
  {t:"Valeur d'entreprise", k:"Issue du DCF ou d'un multiple d'EBITDA. Elle ne dépend pas du financement."},
  {t:"− Dettes financières", k:"Emprunts, obligations, crédit-bail. Ce qui est dû aux prêteurs passe avant l'actionnaire."},
  {t:"+ Trésorerie et équivalents", k:"Le cash est déjà dans la maison : il revient à l'actionnaire en plus de l'outil."},
  {t:"− Intérêts minoritaires", k:"Si une filiale consolidée à 100 % n'est détenue qu'à 70 %, 30 % de sa valeur appartient à d'autres."},
  {t:"− Provisions sous-financées (retraites, litiges)", k:"Des engagements réels, à payer en cash un jour. Des dettes qui ne disent pas leur nom."},
  {t:"− Autres éléments assimilés à de la dette", k:"Earn-outs dus, dividendes votés non versés, dettes d'acquisition. Ils se négocient ligne à ligne dans le SPA."},
  {t:"= Valeur des capitaux propres", k:"Le prix de 100 % des actions. C'est ce chiffre qu'on écrit dans l'offre."},
  {t:"÷ Nombre d'actions dilué", k:"Dilué : options dans la monnaie et convertibles comprises. Sinon le prix par action est surestimé."},
  {t:"= Prix par action", k:"Le seul chiffre que l'actionnaire regarde — et le seul qui s'affiche en une du Figaro."}],
 intrus:[
  {t:"− Dettes fournisseurs", k:"Elles font partie du BFR, donc des flux qui ont produit la valeur d'entreprise. Les retirer ici les compte deux fois et casse le prix."},
  {t:"+ Goodwill inscrit au bilan", k:"Un reste comptable d'acquisitions passées. Il n'a rien à faire dans un pont de valorisation, qui raisonne sur des flux futurs."},
  {t:"+ Chiffre d'affaires de l'année", k:"Un flux de la période. On ne mélange pas un flux annuel et une valeur patrimoniale."}],
 ou:[
  {q:"VE 1 000, dette financière 300, trésorerie 50, minoritaires 80. La valeur des capitaux propres ?",
   opts:["670","750","620","630"], bon:0,
   exp:"1 000 − 300 + 50 − 80 = 670. L'oubli des minoritaires est l'erreur la plus fréquente quand la cible a des filiales partiellement détenues : ici, 80 de trop, soit 12 % du prix."},
  {q:"Deux entreprises ont le même EBITDA et le même multiple. L'une a 500 de dette nette, l'autre zéro. Qu'est-ce qui diffère ?",
   opts:["Leur valeur d'entreprise","La valeur de leurs capitaux propres, de 500","Leur EBITDA retraité","Rien"], bon:1,
   exp:"Même valeur d'entreprise, mais 500 d'écart sur l'equity. C'est exactement pour ça qu'on compare les multiples sur la VE et jamais sur la capitalisation : le levier déforme le second, pas le premier."},
  {q:"La cible a 2 millions d'options exerçables à 10 €, le prix d'offre est de 50 €. Que fais-tu ?",
   opts:["Rien, ce sont des charges futures","Tu augmentes le nombre d'actions, net du cash d'exercice encaissé","Tu retires 20 M€ de la valeur d'entreprise","Tu ajoutes 100 M€ au prix"], bon:1,
   exp:"Méthode du rachat d'actions : les porteurs versent 20 M€ pour exercer, ce cash rachète 400 000 actions à 50 €, la dilution nette est de 1,6 million d'actions. Ignorer les options surestime toujours le prix par action."}],
 corrige:`Le pont se résume à une question posée ligne par ligne : <b>« est-ce que cette somme devra être payée à quelqu'un d'autre que l'actionnaire ? »</b> Si oui, elle sort. Si elle est déjà dans le BFR, elle reste. C'est tout — et c'est pourtant là que se négocient les dernières dizaines de millions d'un deal.`},

/* ============ 10 ============ */
{id:"r10", n:10, ic:"⛓️", titre:"La cascade d'un amortissement de 100",
 sujet:"Les trois états s'articulent — la question d'entretien qui élimine le plus de candidats",
 duree:"~9 min",
 avant:`« Une dotation aux amortissements de 100. Déroule-moi les trois états. » Si cette question tombe et que tu improvises, c'est terminé. Si tu la déroules proprement, tu as prouvé en trente secondes que tu comprends la comptabilité — pas que tu l'as apprise.
   <br><br>La méthode, toujours la même, dans cet ordre : <b>compte de résultat, puis tableau de flux, puis bilan.</b> Jamais l'inverse. Et on finit TOUJOURS en vérifiant que le bilan s'équilibre : c'est la preuve que le raisonnement est juste.
   <br><br>Avec un impôt à 25 %, retiens d'avance la forme de la réponse : le résultat net baisse de 75, la trésorerie MONTE de 25, et le bilan perd 75 des deux côtés.
   <br><br>Le contre-intuitif à assumer sans trembler : <b>un amortissement AUGMENTE la trésorerie.</b> Non pas qu'il rapporte de l'argent, mais parce qu'il réduit l'impôt sans jamais rien faire sortir de la caisse. C'est le bouclier fiscal — et c'est tout l'art de répondre cette phrase-là calmement.`,
 lignes:[
  {t:"Compte de résultat : dotation aux amortissements −100", k:"Une charge, comme une autre, sauf qu'aucun euro ne sort."},
  {t:"Résultat avant impôt −100", k:"L'EBIT et le résultat avant impôt baissent du même montant."},
  {t:"Impôt −25, soit une économie d'impôt de 25", k:"À 25 %. C'est le bouclier fiscal : la seule conséquence monétaire de toute l'opération."},
  {t:"Résultat net −75", k:"−100 de charge, +25 d'impôt économisé."},
  {t:"Tableau de flux : on part du résultat net, −75", k:"La méthode indirecte commence toujours là."},
  {t:"+ 100 de dotation, charge non décaissée", k:"On annule la charge comptable, puisqu'elle n'a rien fait sortir."},
  {t:"= Flux de trésorerie d'exploitation +25", k:"La trésorerie AUGMENTE de 25. Exactement le montant de l'impôt économisé."},
  {t:"Bilan, actif : immobilisations −100, trésorerie +25", k:"L'actif net baisse de 75."},
  {t:"Bilan, passif : capitaux propres −75, par le résultat", k:"Le résultat net rejoint le bilan par les capitaux propres, comme toujours."},
  {t:"Le bilan s'équilibre : −75 à l'actif, −75 au passif", k:"La conclusion obligatoire. Sans elle, la réponse est incomplète."}],
 intrus:[
  {t:"Trésorerie −100 : la dotation sort de la caisse", k:"Une dotation ne fait sortir aucun euro. La caisse a été vidée le jour où la machine a été payée, pas au rythme de son amortissement. C'est l'erreur qui élimine."},
  {t:"Dettes financières +25", k:"Aucune dette n'est née : l'économie d'impôt est de la trésorerie, pas un emprunt."},
  {t:"Capitaux propres −100", k:"−75, pas −100. Les capitaux propres encaissent le résultat NET, après économie d'impôt. Oublier le fisc fausse le bouclage du bilan."}],
 ou:[
  {q:"Même exercice, mais l'entreprise est déficitaire et ne paie aucun impôt. La trésorerie ?",
   opts:["Monte de 25","Ne bouge pas","Baisse de 100","Monte de 100"], bon:1,
   exp:"Elle ne bouge pas. Sans impôt à économiser, le bouclier fiscal ne vaut rien : résultat net −100, on rajoute 100, flux nul. C'est aussi pourquoi un acheteur paie moins cher les déficits reportables qu'on lui promet."},
  {q:"Une dépréciation de goodwill de 100, non déductible fiscalement. Effet sur la trésorerie ?",
   opts:["+25","0","−100","−25"], bon:1,
   exp:"Zéro. Non décaissée ET non déductible : aucun impact cash, ni direct ni fiscal. Le résultat net baisse de 100, on rajoute 100, le flux est nul. La dépréciation n'est qu'un aveu de surpaiement passé."},
  {q:"Dans quel ordre dérouler les trois états ?",
   opts:["Bilan, résultat, flux","Résultat, flux, bilan","Flux, bilan, résultat","L'ordre est indifférent"], bon:1,
   exp:"Résultat, flux, bilan — et vérifier l'équilibre pour conclure. C'est le seul ordre où chaque état se nourrit du précédent : le flux part du résultat net, le bilan reçoit le résultat net et la trésorerie du flux."}],
 corrige:`Trois phrases à sortir dans cet ordre, et une quatrième pour conclure : <b>« le résultat net baisse de 75 ; la trésorerie monte de 25 grâce à l'économie d'impôt ; l'actif perd 75 net et les capitaux propres 75 ; le bilan s'équilibre. »</b> Entraîne-toi jusqu'à pouvoir la dire sans réfléchir — parce que le jour où on te la pose, tu n'auras pas le temps de réfléchir.`}

];
