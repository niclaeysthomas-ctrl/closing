// LE CLOSING — LE CHIFFRAGE : le calcul de tête, sous chrono.
// Écrit le 2026-09-24, suite du module LE CAS.
//
// ⚠️ CE N'EST PAS UNE APP DE CALCUL MENTAL. En entretien de conseil,
// personne ne demande 47 × 83. On demande « ça fait combien, à peu
// près ? » — et ce qui est noté, c'est la VITESSE, l'ORDRE DE
// GRANDEUR et le fait de ne pas se taire pendant qu'on cherche.
// Chaque item porte donc un `truc` : la technique qu'un consultant
// utilise réellement. C'est elle le contenu, pas la réponse.
//
// ⚠️ LES TOLÉRANCES SONT LARGES EXPRÈS sur les familles d'estimation.
// Arrondir n'est pas tricher : c'est la compétence.
//
// {id, ic, nom, sujet, regle, tolPct (tolérance en % de la réponse),
//  gen(R) -> {q, val, unit, calcul, truc}}

/* Affiche un nombre avec juste assez de décimales pour que le corrigé
   ne contredise jamais la réponse attendue (un « 0,1 » affiché en face
   d'un 0,144 attendu fait un corrigé faux). */
function cf(x){ const a=Math.abs(x); const d=a>=100?0:a>=10?1:a>=1?2:3;
  return x.toFixed(d).replace(".",","); }

const CHIFFRAGE = [

{id:"pct", ic:"%", nom:"Le pourcentage de tête", sujet:"X % de Y, sans poser d'opération", tolPct:0,
 regle:`On ne multiplie jamais par 0,35. On <b>décompose</b>.
   <br><br><b>10 %</b> = on déplace la virgule. <b>5 %</b> = la moitié de 10 %. <b>1 %</b> = deux crans de virgule.
   <br>Ensuite on additionne : <b>35 % = 10 + 10 + 10 + 5</b>, ou plus vite <b>= 1/3 environ</b>.
   <br><br>Les raccourcis qui servent tous les jours : <b>25 % = ÷4</b> · <b>20 % = ÷5</b> · <b>12,5 % = ÷8</b> · <b>75 % = ÷4 puis ×3</b>.
   <br><br>Et le réflexe qui impressionne : <b>X % de Y = Y % de X</b>. 16 % de 25 est pénible ; 25 % de 16 est immédiat — c'est 4.`,
 gen:R=>{
  const bases=[[10,"÷10"],[20,"÷5"],[25,"÷4"],[5,"moitié de 10 %"],[15,"10 % + la moitié"],[30,"3 × 10 %"],[40,"÷5 puis ×2"],[75,"÷4 puis ×3"],[12.5,"÷8"],[60,"÷5 puis ×3"]];
  const [p,tr]=bases[R.ent(0,bases.length-1)];
  /* multiple de 400 : toutes les familles de % ci-dessus (12,5 comprise)
     tombent alors sur un entier. Un calcul de tête ne finit pas en ,5. */
  const y=R.ent(3,60)*(R.ent(0,1)?400:4000);
  const v=y*p/100;
  return {q:`Combien font ${p.toString().replace(".",",")} % de ${eurX(y).replace(" €","")} ?`, val:v, unit:"",
   calcul:`${p.toString().replace(".",",")} % → ${tr} · ${eurX(y).replace(" €","")} → <b>${eurX(v).replace(" €","")}</b>`,
   truc:`${p} % se fait en un geste : ${tr}. Poser une multiplication par ${(p/100).toString().replace(".",",")} est le réflexe d'un tableur, pas d'un candidat.`};}},

{id:"var", ic:"📈", nom:"La variation en %", sujet:"De A à B, combien de pour cent", tolPct:2,
 regle:`<b>Variation = (arrivée − départ) ÷ DÉPART.</b> Toujours sur le départ, jamais sur l'arrivée.
   <br><br>Le geste rapide : chercher une <b>fraction simple</b> avant de diviser. De 2 400 à 3 000, l'écart est 600, soit 600/2400 = <b>1/4 = 25 %</b>. On a trouvé sans diviser.
   <br><br>⚠️ <b>L'asymétrie</b>, qui piège tout le monde : une hausse de 25 % s'annule par une baisse de 20 %, pas de 25 %. Monter de 100 à 125, puis redescendre de 25 % donne 93,75. Pour revenir à 100 depuis 125, il faut −20 %.`,
 gen:R=>{
  const fracs=[[1,4,"1/4"],[1,5,"1/5"],[1,3,"1/3"],[1,2,"1/2"],[1,10,"1/10"],[3,4,"3/4"],[2,5,"2/5"],[1,8,"1/8"],[3,10,"3/10"],[1,6,"1/6"]];
  const [n,d,lab]=fracs[R.ent(0,fracs.length-1)];
  const sens=R.ent(0,1);
  const a=d*R.ent(4,40)*10;
  const ecart=a*n/d, b=sens?a+ecart:a-ecart;
  const pct=(b-a)/a*100;
  const noms=[["Le chiffre d'affaires","a-t-il"],["Le volume vendu","a-t-il"],["Le coût unitaire","a-t-il"],
              ["La base de clients","a-t-elle"],["Le panier moyen","a-t-il"],["La marge totale","a-t-elle"]];
  const [nom,aux]=noms[R.ent(0,noms.length-1)];
  return {q:`${nom} passe de ${eurX(a).replace(" €","")} à ${eurX(b).replace(" €","")}. De combien de % ${aux} ${sens?"augmenté":"baissé"} ?`,
   val:Math.abs(pct), unit:"%",
   calcul:`Écart ${eurX(ecart).replace(" €","")} sur un départ de ${eurX(a).replace(" €","")} = ${lab} = <b>${Math.abs(pct).toFixed(1).replace(".",",")} %</b>`,
   truc:`On reconnaît ${lab} avant de diviser. Chercher la fraction simple est deux fois plus rapide que poser la division — et ça se dit à voix haute.`};}},

{id:"pts", ic:"⚠️", nom:"Points contre pour cent", sujet:"Le piège qu'on entend en entretien", tolPct:3,
 regle:`Deux façons de dire la même chose, et une seule est juste selon le contexte.
   <br><br>Une marge qui passe de <b>4 % à 6 %</b> gagne <b>2 POINTS</b>. En pourcentage, elle gagne <b>50 %</b> — parce que 2 rapporté à 4 fait la moitié.
   <br><br>Dire « la marge a augmenté de 2 % » quand elle a gagné 2 points est une faute que l'interlocuteur entend immédiatement. Et c'est la même confusion qui fait annoncer des plans de « +2 % de marge » qui exigent en réalité de la multiplier par 1,5.
   <br><br><b>Règle :</b> on parle en POINTS pour une grandeur déjà en pourcentage (marge, part de marché, taux). On parle en POUR CENT pour une grandeur en euros ou en volume.`,
 gen:R=>{
  const a=R.ent(2,14);
  const d=R.ent(1,Math.max(1,Math.round(a*0.8)));   /* un saut plausible, pas un quadruplement */
  const b=a+d;
  const rel=d/a*100;
  /* ⚠️ le corrigé affichait rel arrondi à l'entier alors que la réponse
     attendue était exacte : sur un petit pourcentage (7,14 %), l'écart
     dépassait la tolérance et le corrigé contredisait la correction. */
  const fmt=Math.abs(rel-Math.round(rel))<0.05?rel.toFixed(0):rel.toFixed(1).replace(".",",");
  const sujets=[["Ta marge nette","elle"],["Ta part de marché","elle"],
                ["Ton taux de conversion","il"],["Ta marge opérationnelle","elle"],
                ["Ton taux de marge brute","il"]];
  const [quoi,pron]=sujets[R.ent(0,sujets.length-1)];
  return {q:`${quoi} passe de ${a} % à ${b} %. De combien de POUR CENT a-t-${pron} progressé ?`,
   val:rel, unit:"%",
   calcul:`${d} point${d>1?"s":""} rapporté${d>1?"s":""} à ${a} % = ${d} ÷ ${a} = <b>${fmt} %</b>`,
   truc:`+${d} point${d>1?"s":""}, mais +${fmt} %. ${rel>=40
     ? "Sur une base aussi faible, quelques points sont un bouleversement : annoncer « +"+d+" % » aurait divisé l'ampleur réelle par "+(rel/d).toFixed(0)+"."
     : "Les deux chiffres sont proches ici, et c'est justement ce qui rend la confusion facile à laisser passer. La règle ne dépend pas de l'écart : points pour une grandeur déjà en %, pour cent pour le reste."}`};}},

{id:"frac", ic:"🔢", nom:"Les fractions usuelles", sujet:"La table qu'un consultant connaît par cœur", tolPct:3,
 regle:`Quinze valeurs à savoir instantanément. Elles reviennent dans tous les sizings.
   <br><br><b>1/2</b> = 50 % · <b>1/3</b> = 33 % · <b>1/4</b> = 25 % · <b>1/5</b> = 20 % · <b>1/6</b> = 16,7 %
   <br><b>1/7</b> = 14,3 % · <b>1/8</b> = 12,5 % · <b>1/9</b> = 11,1 % · <b>1/10</b> = 10 % · <b>1/12</b> = 8,3 %
   <br><b>2/3</b> = 67 % · <b>3/4</b> = 75 % · <b>2/5</b> = 40 % · <b>3/8</b> = 37,5 % · <b>5/6</b> = 83 %
   <br><br>Pourquoi ça compte : un sizing revient presque toujours à « quelle proportion de la population » — et répondre « un septième, donc 14 % » en une seconde change la façon dont l'examinateur te regarde.`,
 gen:R=>{
  const t=[[1,3],[1,6],[1,7],[1,8],[1,9],[1,12],[2,3],[3,4],[2,5],[3,8],[5,6],[5,8],[2,7],[7,8],[1,16]];
  const [n,d]=t[R.ent(0,t.length-1)];
  const v=n/d*100;
  return {q:`Exprime ${n}/${d} en pourcentage.`, val:v, unit:"%",
   calcul:`${n} ÷ ${d} = <b>${v.toFixed(1).replace(".",",")} %</b>`,
   truc:d===7?"Les septièmes se retiennent en bloc : 1/7 = 14,3 %, et chaque septième ajoute 14,3 points.":d===8?"Les huitièmes descendent de 12,5 en 12,5. C'est la famille la plus rentable à mémoriser.":d===3?"Les tiers sont 33 et 67. On ne les recalcule jamais.":`${n}/${d} fait ${v.toFixed(1).replace(".",",")} %. Cette table se récite, elle ne se recalcule pas.`};}},

{id:"ordre", ic:"🔭", nom:"Les ordres de grandeur", sujet:"Multiplier des grands nombres sans se noyer dans les zéros", tolPct:4,
 regle:`La seule méthode qui tienne sous pression : <b>on sépare les chiffres significatifs des puissances de dix.</b>
   <br><br>2 400 × 350 000 ? On écrit <b>2,4 × 10³ et 3,5 × 10⁵</b>. Puis 2,4 × 3,5 ≈ 8,4, et 10³ × 10⁵ = 10⁸. Résultat : <b>8,4 × 10⁸ = 840 millions</b>.
   <br><br>Les repères à avoir en tête, parce qu'on les confond sous stress :
   <br><b>10⁶</b> = un million · <b>10⁹</b> = un milliard · <b>mille × mille</b> = un million · <b>mille × un million</b> = un milliard.
   <br><br>⚠️ Le vrai risque n'est jamais l'arithmétique, c'est le <b>facteur mille</b>. Annoncer 840 millions au lieu de 840 000 est l'erreur qui se remarque le plus, et elle ne vient jamais d'un mauvais calcul — elle vient de zéros mal comptés.`,
 gen:R=>{
  const m1=R.ent(12,95)/10, e1=R.ent(3,4);
  const m2=R.ent(12,95)/10, e2=R.ent(3,8-e1);   /* produit entre ~1 M et ~9 Md : des chiffres de cas réel */
  const a=m1*Math.pow(10,e1), b=m2*Math.pow(10,e2);
  const v=a*b/1e6;
  return {q:`Environ combien font ${eurX(a).replace(" €","")} × ${eurX(b).replace(" €","")} ? Réponds <b>en millions</b>.`,
   val:v, unit:"",
   calcul:`${m1.toString().replace(".",",")} × ${m2.toString().replace(".",",")} ≈ ${(m1*m2).toFixed(1).replace(".",",")} · 10<sup>${e1}</sup> × 10<sup>${e2}</sup> = 10<sup>${e1+e2}</sup> · soit ${(m1*m2).toFixed(1).replace(".",",")} × 10<sup>${e1+e2}</sup> = <b>${cf(v)} millions</b>`,
   truc:`On sépare toujours : ${m1.toString().replace(".",",")} × ${m2.toString().replace(".",",")} d'un côté, ${e1} + ${e2} = ${e1+e2} zéros de l'autre. Les zéros se comptent, ils ne se multiplient pas.`};}},

{id:"div", ic:"➗", nom:"La division rapide", sujet:"Simplifier avant de diviser", tolPct:3,
 regle:`On ne divise jamais des grands nombres : on <b>simplifie d'abord</b>.
   <br><br>840 000 000 ÷ 35 000 ? On barre les zéros par paquets égaux : <b>840 000 ÷ 35</b>. Puis on reconnaît que 35 × 24 = 840. Réponse : <b>24 000</b>.
   <br><br>Les simplifications qui reviennent : <b>÷ 250 = × 4 ÷ 1000</b> · <b>÷ 500 = × 2 ÷ 1000</b> · <b>÷ 50 = × 2 ÷ 100</b> · <b>÷ 25 = × 4 ÷ 100</b>.
   <br><br>Et le réflexe de contrôle, qui vaut plus que le calcul : avant de répondre, <b>estimer l'ordre de grandeur</b>. 840 millions divisé par 35 mille, c'est « des dizaines de milliers ». Si le résultat sort à 240, c'est qu'on s'est trompé d'un facteur cent — et on le sait avant de l'avoir dit.`,
 gen:R=>{
  const q0=R.ent(12,96), d0=R.ent(12,95);
  const zq=R.ent(2,4), zd=R.ent(1,3);
  const num=q0*d0*Math.pow(10,zq+zd), den=d0*Math.pow(10,zd);
  const v=q0*Math.pow(10,zq);
  return {q:`Combien font ${eurX(num).replace(" €","")} ÷ ${eurX(den).replace(" €","")} ?`, val:v, unit:"",
   calcul:`On barre ${zd} zéro${zd>1?"s":""} de chaque côté : ${eurX(q0*d0*Math.pow(10,zq)).replace(" €","")} ÷ ${d0} · ${d0} × ${eurX(v).replace(" €","")} = ${eurX(q0*d0*Math.pow(10,zq)).replace(" €","")} · réponse <b>${eurX(v).replace(" €","")}</b>`,
   truc:`Barrer les zéros en premier transforme une division impossible en une division à deux chiffres. Et avant de répondre : l'ordre de grandeur attendu était « ${v>=1e6?"des millions":v>=1e3?"des milliers":"des unités ou dizaines"} ».`};}},

{id:"r72", ic:"⏳", nom:"Doublements et croissance", sujet:"La règle de 72, et le composé de tête", tolPct:6,
 regle:`<b>Règle de 72 : un capital double en 72 ÷ (taux en %) années.</b> À 6 %, douze ans. À 9 %, huit ans. À 12 %, six ans.
   <br><br>Elle tombe à quelques mois près et se fait en une seconde. C'est le calcul le plus rentable à connaître par cœur : il dit immédiatement si une promesse de rendement est crédible.
   <br><br>Dans l'autre sens : <b>quel taux pour doubler en n ans ? 72 ÷ n.</b> Doubler en 5 ans exige environ 14,4 % par an — quand quelqu'un l'annonce sans sourciller, c'est là qu'on regarde les hypothèses.
   <br><br>Et pour le composé court : <b>(1 + x)ⁿ ≈ 1 + n·x</b> tant que n·x reste petit. 3 % pendant 4 ans ≈ +12 % (la valeur exacte est 12,6 %). Au-delà d'environ 25 %, l'approximation décroche et il faut compter les doublements.`,
 gen:R=>{
  const mode=R.ent(0,2);
  if(mode===0){ const t=R.ent(3,18); return {q:`À ${t} % par an, en combien d'années un capital double-t-il ?`, val:72/t, unit:"",
    calcul:`72 ÷ ${t} = <b>${(72/t).toFixed(1).replace(".",",")} ans</b>`,
    truc:`La règle de 72 se fait de tête et suffit toujours. La valeur exacte ici est ${(Math.log(2)/Math.log(1+t/100)).toFixed(1).replace(".",",")} ans — l'écart ne change aucune décision.`}; }
  if(mode===1){ const n=R.ent(3,15); return {q:`Quel taux annuel faut-il pour doubler en ${n} ans ?`, val:72/n, unit:"%",
    calcul:`72 ÷ ${n} = <b>${(72/n).toFixed(1).replace(".",",")} %</b> par an`,
    truc:`La règle se lit dans les deux sens. C'est le test de crédibilité le plus rapide : doubler en ${n} ans suppose ${(72/n).toFixed(1).replace(".",",")} % par an, tous les ans, sans exception.`}; }
  /* ⚠️ on reste dans le domaine où l'approximation n·x est honnête
     (n·x ≲ 15) : tester une technique là où elle décroche n'apprend rien. */
  let x=R.ent(2,8), n=R.ent(3,6);
  while(x*n>15){ if(n>3) n--; else x--; }
  const approx=n*x, exact=(Math.pow(1+x/100,n)-1)*100;
  return {q:`Une grandeur croît de ${x} % par an pendant ${n} ans. De combien a-t-elle augmenté au total, environ ?`,
   val:exact, unit:"%", tolPct:10,   /* l'approximation ENSEIGNÉE doit passer */
   calcul:`Approximation : ${n} × ${x} % = ${approx} % · valeur exacte (1,0${x<10?"0"+x:x})<sup>${n}</sup> − 1 = <b>${exact.toFixed(1).replace(".",",")} %</b>`,
   truc:`n × x donne ${approx} % pour ${exact.toFixed(1).replace(".",",")} % réels : l'approximation sous-estime toujours, et l'écart grandit avec n·x. En dessous de 25 % cumulés, elle suffit largement.`};}},

{id:"flux", ic:"🗓️", nom:"Les conversions de flux", sujet:"Passer de l'année au jour, et inversement", tolPct:4,
 regle:`Un cas se chiffre à l'année, mais se raconte à la journée — et l'inverse. Les repères se savent par cœur :
   <br><br><b>250 jours ouvrés</b> par an · <b>365 jours</b> calendaires · <b>52 semaines</b> · <b>12 mois</b> · <b>~21 jours ouvrés</b> par mois · <b>~4,3 semaines</b> par mois.
   <br><br>Les raccourcis : <b>÷ 250 = × 4 ÷ 1 000</b> (parce que 250 = 1 000 ÷ 4). <b>÷ 52 ≈ × 2 ÷ 100</b>. <b>÷ 365 ≈ ÷ 360 = ÷ 36 ÷ 10</b>.
   <br><br>⚠️ Et la question à poser avant de convertir : <b>jours ouvrés ou jours calendaires ?</b> Un magasin ouvre 360 jours, une usine 250, un cabinet 220. Se tromper de base, c'est se tromper de 45 % — bien plus que toutes les erreurs d'arrondi réunies.`,
 gen:R=>{
  const mode=R.ent(0,2);
  const annee=R.ent(6,90)*1e6;
  if(mode===0) return {q:`${eurX(annee)} de chiffre d'affaires par an. Combien par jour OUVRÉ (250 jours) ?`, val:annee/250, unit:"€",
   calcul:`${eurX(annee)} ÷ 250 = ${eurX(annee)} × 4 ÷ 1 000 = <b>${eurX(annee/250)}</b>`,
   truc:`Diviser par 250, c'est multiplier par 4 et barrer trois zéros. Jamais poser la division.`};
  if(mode===1) return {q:`${eurX(annee)} par an. Combien par SEMAINE (52 semaines) ?`, val:annee/52, unit:"€", tolPct:8,   /* le raccourci ×2÷100 se trompe de 4 % par construction */
   calcul:`${eurX(annee)} ÷ 52 ≈ ${eurX(annee)} × 2 ÷ 100 = <b>${eurX(annee/52)}</b> environ`,
   truc:`÷52 ≈ ×2 puis deux zéros en moins : l'approximation est à 4 % près, largement suffisante pour un ordre de grandeur.`};
  const jour=R.ent(8,90)*100;
  return {q:`${eurX(jour)} de recette par jour ouvré. Combien cela fait-il par AN (250 jours) ?`, val:jour*250, unit:"€",
   calcul:`${eurX(jour)} × 250 = ${eurX(jour)} × 1 000 ÷ 4 = <b>${eurX(jour*250)}</b>`,
   truc:`Multiplier par 250, c'est ajouter trois zéros et diviser par 4. Le sens inverse du raccourci précédent — les deux se travaillent ensemble.`};}}

];
