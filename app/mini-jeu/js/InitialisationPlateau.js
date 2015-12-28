/*---- Lancement du Jeu ----*/

var lancer = document.getElementById('lancer');
var modal = document.getElementById('modal');
lancer.addEventListener('click', function(){
	modal.style.display = "none";
}, false);


/*-----Plateau------*/

var table = document.getElementById('plateau');

//Création de 10x10 cases
for (var i = 1; i <= 10; i++){
	var tr = document.createElement('tr');
	table.appendChild(tr);

	for (var j = 1; j <= 10; j++){
		var td = document.createElement('td');					
		tr.appendChild(td);
		td.className = 'vide';
	}
}

//numerotation des cases avec id
var cases = document.getElementsByTagName('td');							
for(var i = 0; i < cases.length; i++){
	cases[i].id = i;
}

//Placement de 12 cases inaccessible			
positionnementAleatoire(12, 'inaccessible');


/*----Armes-----*/

//Initialisation des armes
function Arme(nom, degat, url){													
		this.nom = nom;
		this.degat = degat;
		this.url = url;
}

var couteau = new Arme('Couteau', 10, "img/couteau.png");
var gun = new Arme('Gun', 20, "img/revolver.png");
var fusil= new Arme('Fusil',25, "img/fusil.png");
var mitraillette= new Arme('Mitraillette',30, "img/mitraillette.png");
var bazooka= new Arme('Bazooka', 40, "img/bazooka.png"); 

//On place entre 2 et 4 armes de types differents
var nbArmes = Math.floor(Math.random()*3 +2);
var armes = [gun, fusil, bazooka, mitraillette];

for(var i = 0; i < nbArmes; i++){
	var nbAleatoire = Math.floor(Math.random()*armes.length);
	var typeArme = armes[nbAleatoire].nom;
	positionnementAleatoire(1,typeArme);
	armes.splice(nbAleatoire,1);											//On supprime l'arme du tableau, pour qu'un type n'apparaisse qu'une seul fois
}


/*----Joueurs-----*/

//Initialisation des joueurs
function Joueur(nom, cote){													
	this.nom = nom;
	this.cote = cote;
	this.vie = 100;
	this.arme = couteau;
	this.defense = false;

	//creation et positionnement d'un joueur (sous forme de div)
	this.positionnement = function(url){
		var position = positionnementAleatoire(1,'vide');
		this.xy = Number(position.id);
		this.div = document.createElement('div');
		this.div.className = this.nom;
		position.appendChild(this.div);
		var img = document.createElement('img');
		img.src = url;
		this.div.appendChild(img);
	}

	//affichage des caractéristiques du joueur sur le côté
	this.caracteristique = function(){
		var caracteristiques = document.getElementById(this.cote);
		var contenu = caracteristiques.querySelector('.contenu');
		if(this.vie<0){
			this.vie = 0;
		}
		//affichage nom, PV et Arme
		contenu.innerHTML = '<h1>' + this.nom + '</h1><p class="pv">PV : '+ this.vie +'</p></strong><p>Arme : ' + this.arme.nom + '</p>';
		
		//affichage arme et degats
		var imageArme = caracteristiques.querySelector('.imageArme');
		imageArme.src= this.arme.url;
		var spanDegat = caracteristiques.querySelector('span');
		spanDegat.innerHTML = this.arme.degat;

		//affichage défense enclenchée ou non
		var imageBouclier = caracteristiques.querySelector('.imageBouclier');	

		if(this.defense === true){					
			imageBouclier.className = 'imageBouclier actived';
		}else if(imageBouclier){
			imageBouclier.className = 'imageBouclier desactived';
		}
	}
}

var joueurJaune = new Joueur('Joueur Jaune','gauche');
var joueurBleu = new Joueur('Joueur Bleu','droite');
joueurJaune.positionnement("img/joueurJaune.png");

//positionnement du deuxième joueur : boucle jusqu'à trouver un position où bleu ne touche pas jaune
while(!joueurBleu.xy || joueurBleu.xy === joueurJaune.xy-10 || joueurBleu.xy === joueurJaune.xy-9 || joueurBleu.xy === joueurJaune.xy-11 || 
	joueurBleu.xy === joueurJaune.xy+10 || joueurBleu.xy === joueurJaune.xy+9|| joueurBleu.xy === joueurJaune.xy+11 ||
	joueurBleu.xy === joueurJaune.xy+1 || joueurBleu.xy === joueurJaune.xy-1 || joueurBleu.xy === joueurJaune.xy){

	//si bleu a déjà été placé mais touche le jaune, on le supprime
	if(joueurBleu.div){
		joueurBleu.div.parentNode.removeChild(joueurBleu.div);        				
	}

	joueurBleu.positionnement("img/JoueurBleu.png");
}

joueurJaune.caracteristique();
joueurBleu.caracteristique();


/******************---Fonctions--***************/

//place aleatoirement un certains nombre d'objets à placer parmis les cases encore vides
function positionnementAleatoire(nbObjets, nouvelleClasse){   
	var casesVides = document.querySelectorAll('.vide');
	for (var i = 0; i < nbObjets; i++){
		var positionAleatoire = Math.floor(Math.random()*(casesVides.length));
		casesVides[positionAleatoire].className = nouvelleClasse;
	}
	return (casesVides[positionAleatoire]);
}
