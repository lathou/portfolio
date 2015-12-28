var joueur = joueurJaune,
	ennemi = joueurBleu,
	enCombat = false;

tour();

function tour(){
	//Affichage des cases jouables et creation de leurs evenements
	if(joueur === joueurJaune){
		classeJouable = 'jouable J';
	}else{
		classeJouable = 'jouable B';
	}

	casesPossibles(joueur,classeJouable);
	var jouables = document.querySelectorAll('.jouable');

	for(var i = 0; i< jouables.length; i++){
		jouables[i].addEventListener('click', onCaseClick, false);			
	}	
}

function onCaseClick(e){
	jouer(e.target);
		
	//Au tour de l'autre joueur	s'il n'y a pas de combat
	if(joueur.vie > 0 && ennemi.vie > 0 && enCombat === false){			
		// On change de joueur
		if(joueur === joueurJaune){
			joueur = joueurBleu;
			ennemi = joueurJaune;
		}else{
			joueur = joueurJaune;
			ennemi = joueurBleu;
		}
		
		tour();
	}
}

function jouer(target){

	supprimerCasesPossibles();

	//On supprime la div joueur de l'ancienne case, et la place dans la nouvelle
	joueur.div.parentNode.removeChild(joueur.div);
	target.appendChild(joueur.div);
	joueur.xy = Number(target.id);

	//Si case arme on recupère la nouvelle arme et repose l'ancienne					
	if(!/vide/.test(target.className)){
		var ancienneArme = joueur.arme.nom;	
		switch(target.className){
			case 'Gun' :
				joueur.arme = gun;
				break;
			case 'Fusil' :
				joueur.arme = fusil;
				break;
			case 'Mitraillette' :
				joueur.arme = mitraillette;
				break;
			case 'Bazooka' :
				joueur.arme = bazooka;
				break;
			case 'Couteau' :
				joueur.arme = couteau;
				break;
		}										
		target.className = ancienneArme;																
	}	

	//Mise à jour des caracteristiques		
	joueur.caracteristique();

	//Si case à coté de l'autre joueur, on entre en combat
	if(joueur.xy === ennemi.xy+1 || joueur.xy === ennemi.xy-1 || joueur.xy === ennemi.xy+10 || joueur.xy === ennemi.xy-10 ){
		supprimerCasesPossibles();
		enCombat = true;
		combat(joueur, ennemi);
	}
}

function supprimerCasesPossibles(){
	for(var j = 0; j < cases.length; j++){         
		cases[j].className = cases[j].className.replace(/\sjouable\sJ/,''); 
		cases[j].className = cases[j].className.replace(/\sjouable\sB/,''); 
		cases[j].removeEventListener('click', onCaseClick, false);
	}
}

function casesPossibles(joueur,classe){
	troisCases(joueur.xy, +1, classe);   // Vers la droite
	troisCases(joueur.xy, -1, classe);	 // Vers la gauche
	troisCases(joueur.xy, +10, classe);  // Vers le bas
	troisCases(joueur.xy, -10, classe);  // Vers le haut
}

function troisCases(positionJoueur,direction, classe){
	if(positionJoueur + direction < 100 && positionJoueur + direction >= 0){
		casePossible1 = document.getElementById(positionJoueur + direction);

		/*si la case n'est ne contient pas de joueur et n'est pas inaccessible, et si elle n'est ni sur la ligne suivante (pas une dizaine) ni sur la ligne précédente (pas un nombre en 9) 
		alors on lui donne la classe 'jouable' et on passe à la case possible suivante*/

		if((!casePossible1.hasChildNodes() && casePossible1.className!=='inaccessible') && !(direction===+1 && casePossible1.id%10===0) && !(direction===-1 && casePossible1.id%10!==0 && (casePossible1.id%10)%9===0)){
			casePossible1.className = casePossible1.className + ' ' + classe;			

			if(positionJoueur + direction*2 < 100 && positionJoueur + direction*2 >= 0){
			casePossible2 = document.getElementById(positionJoueur + direction*2);

				if((!casePossible2.hasChildNodes() && casePossible2.className!=='inaccessible') && !(direction===+1 && casePossible2.id%10===0) && !(direction===-1 && casePossible2.id%10!==0 && (casePossible2.id%10)%9===0)){
					casePossible2.className = casePossible2.className + ' ' + classe;

					if(positionJoueur + direction*3 < 100 &&positionJoueur +direction*3 >= 0){
					casePossible3 = document.getElementById(positionJoueur + direction*3);

						if((!casePossible3.hasChildNodes() && casePossible3.className!=='inaccessible') && !(direction===+1 && casePossible3.id%10===0) && !(direction===-1 && casePossible3.id%10!==0 && (casePossible3.id%10)%9===0)){
							casePossible3.className = casePossible3.className + ' ' + classe;
						}
					}
				}
			}				
		}
	}
}


