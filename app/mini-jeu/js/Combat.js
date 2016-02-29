function combat(joueur, ennemi){
	var btnAttaqueJ = document.getElementById('btnAttaqueJ');
	var btnDefenseJ = document.getElementById('btnDefenseJ');
	var btnAttaqueB = document.getElementById('btnAttaqueB');
	var btnDefenseB = document.getElementById('btnDefenseB');

	if(joueur === joueurJaune){
		//On active les boutons jaunes
		btnAttaqueJ.disabled = false;
		btnDefenseJ.disabled = false;
		btnAttaqueJ.addEventListener('click', attaquer, false);
		btnDefenseJ.addEventListener('click', defense, false);

		btnAttaqueB.disabled = true;
		btnDefenseB.disabled = true;		
		btnAttaqueB.removeEventListener('click',attaquer, false);
		btnDefenseB.removeEventListener('click',defense, false);
	}else if(joueur === joueurBleu){	
		//On active les boutons bleus
		btnAttaqueB.disabled = false;
		btnDefenseB.disabled = false;
		btnAttaqueB.addEventListener('click', attaquer, false);
		btnDefenseB.addEventListener('click', defense, false);

		btnAttaqueJ.disabled = true;
		btnDefenseJ.disabled = true;
		btnAttaqueJ.removeEventListener('click',attaquer, false);
		btnDefenseJ.removeEventListener('click',defense, false);
	}
}

	function attaquer(){
		if(ennemi.defense === false){
			ennemi.vie = ennemi.vie - joueur.arme.degat;
		}else if(ennemi.defense === true){
			ennemi.vie = ennemi.vie - (joueur.arme.degat/2);
			ennemi.defense = false;
		}	

		joueur.caracteristique();	
		ennemi.caracteristique();

		if(joueur.vie > 0 && ennemi.vie > 0){
			var joueurCourant = joueur;
			joueur = ennemi;
			ennemi = joueurCourant
			combat(joueur, ennemi);
		}else{
			affichageVainqueur();
		}
	}

	function defense(){
		joueur.defense = true;
		ennemi.defense = false;

		joueur.caracteristique();	
		ennemi.caracteristique();

		if(joueur.vie > 0 && ennemi.vie > 0){
			var joueurCourant = joueur;
			joueur = ennemi;
			ennemi = joueurCourant
			combat(joueur, ennemi);
		}else{
			affichageVainqueur();
		}
	}

	function affichageVainqueur(){
		//Dès que les points de vie d’un joueur (initialement à 100) tombent à 0 , celui-ci a perdu. Un message s’affiche et la partie est terminée.
		btnAttaqueJ.removeEventListener('click',attaquer, false);
		btnDefenseJ.removeEventListener('click',defense, false);
		btnAttaqueB.removeEventListener('click',attaquer, false);
		btnDefenseB.removeEventListener('click',defense, false);
		btnAttaqueJ.disabled = true;
		btnDefenseJ.disabled = true;
		btnAttaqueB.disabled = true;
		btnDefenseB.disabled = true;

		modalBody= document.getElementById('modal-body');
		modal.style.display = "block";

		if(joueur.vie <= 0){
			modalBody.innerHTML = '<h3>'+ennemi.nom + ', vous avez gagné !</h3><p>'+ joueur.nom + ' a succombé à ses blessures...</p><button id="rejouer">Quel jeu passionnant ! Rejouer !</button>';
		} else if(ennemi.vie <= 0){
			modalBody.innerHTML = '<h3>'+joueur.nom + ', vous avez gagné ! </h3><p>'+ ennemi.nom + ' a succombé à ses blessures...</p><button id="rejouer">Quel jeu passionnant ! Rejouer !</button>';
		}

		rejouer=document.getElementById('rejouer');
		rejouer.addEventListener('click', function(){location.reload();},false);
	}




