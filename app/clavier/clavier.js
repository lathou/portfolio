//https://en.wikipedia.org/wiki/Korean_language_and_computers

var app = angular.module("monApp",[]);

app.service('Alphabet', function($http, $q){

	this.getLettres = function(langue){
		var def= $q.defer();

		$http.get('lettres.json').success(function(data){	
			
			if(langue=='fr'){
				def.resolve(data.fr);
			}else if(langue=='co'){
				def.resolve(data.co);
			}

		}).error(function(data, status){
			def.reject("erreur " + status);
		});

		return def.promise;
	};
});

app.service('Clavier', function(){

	this.sign = [],
	this.lastVoyelle = false,
	this.lastCons = false,
	this.lastLettre = '';	
	this.lastSign = '',	

	this.focus = function(){
		document.querySelector('#saisie').focus();
	}

	this.getPremiereLettre = function(lettre){
		this.remiseAZero();
		this.sign[0] = this.sign[0] = lettre.initial - 4352;
		return String.fromCharCode(lettre.initial);
	}

	this.getDeuxiemeLettre = function(index){
		this.sign[1]= this.sign[0]*588 + index*28 + 44032;
		return String.fromCharCode(this.sign[1]);
	}

	this.getTroisiemeLettre = function(index){
		this.sign[2] = this.sign[1] + index;
		return String.fromCharCode(this.sign[2]);
	}

	this.getIndexVoyelle = function(lettre, lastVoyelle){
		var index;

		if (lastVoyelle===8 ){
			switch(lettre.initial - 4449){
				case 0 : index = 9;
				break;
				case 1 : index = 10;
				break;
				case 20 : index = 11;
				break;
			}
		}else if (lastVoyelle===13 ){
			switch(lettre.initial - 4449){
				case 4 : index = 14;
				break;
				case 5 : index = 15;
				break;
				case 20 : index = 16;
				break;
			}
		}else if (lastVoyelle===18 && lettre.initial - 4449 === 20){
			index = 19;
		}

		return index;
	}

	this.getIndexCons = function(lettre, lastCons){
		var index;

		if( lastCons === 1 && lettre.indexFinal === 19){
			index = 3;
		}else if(lastCons === 4 && lettre.indexFinal === 22){
			index = 5;
		}else if(lastCons === 4 && lettre.indexFinal === 27){
			index = 6;
		}else if(lastCons === 17 && lettre.indexFinal=== 19){
			index = 18;
		}else if(lastCons === 8){
			switch(lettre.indexFinal){
				case 1 : index = 9;
				break;
				case 16 : index = 10;
				break;
				case 17 : index = 11;
				break;
				case 19 : index = 12;
				break;
				case 25 : index = 13;
				break;
				case 26 : index = 14;
				break;
				case 27 : index = 15;
				break;
			}	
		}
		return index;
	}

	this.remiseAZero = function(){
		this.sign = [];
		this.lastVoyelle = false;
		this.lastCons = false;
	}

	this.remiseAZeroTotale = function(){
		this.remiseAZero();
		this.lastSign='';
		this.lastLettre = '';
	}
});


app.controller('ecrire', function($scope, Alphabet, Clavier){	

	$scope.langue = 'co';
	$scope.saisie='';
	$scope.checkbox=true;
	$scope.majActive = false;

	$scope.getLettres = function(langue){
		$scope.lettres = Alphabet.getLettres(langue).then(function(alphabet){
			$scope.lettres = alphabet.first;
			$scope.lettres1 = alphabet.first;
			$scope.lettres2 = alphabet.second;
		});
	}

	$scope.tapper = function(lettre, langue){

		var dejaAjoute = false

		if(langue === 'fr'){
			$scope.saisie += lettre.lettre;
			Clavier.remiseAZero();

		}else if(langue==='co'){

			if(!lettre.type){
				$scope.saisie += lettre.lettre;
				Clavier.remiseAZeroTotale();
				dejaAjoute = true;
			}

			if (Clavier.sign.length === 1 && lettre.type==='v'){

				// 2nd lettre voyelle1 ----- id medial = charCode - 4449		
				Clavier.lastVoyelle = lettre.initial-4449;
				$scope.saisie = $scope.saisie.substring(0, $scope.saisie.length-1);
				$scope.saisie += Clavier.getDeuxiemeLettre(lettre.initial-4449);

			}else if (Clavier.sign.length === 2 && lettre.type==='v' && Clavier.lastVoyelle){

				// 2nd lettre voyelle2 ----- id medial2 = charCode - 4449	
				if(Clavier.getIndexVoyelle(lettre, Clavier.lastVoyelle)){	
				$scope.saisie = $scope.saisie.substring(0, $scope.saisie.length-1);					
					$scope.saisie += Clavier.getDeuxiemeLettre(Clavier.getIndexVoyelle(lettre, Clavier.lastVoyelle));
					Clavier.lastVoyelle = false;
				}else{
					Clavier.remiseAZero();
				}
				
			}else if (Clavier.sign.length >= 2 && lettre.type === 'c' && lettre.indexFinal){
				if(!Clavier.lastCons){

					// 3e lettre consonne1
					Clavier.lastCons = lettre.indexFinal;
					Clavier.lastSign = Clavier.sign[1];	
					$scope.saisie = $scope.saisie.substring(0, $scope.saisie.length-1);			
					$scope.saisie += Clavier.getTroisiemeLettre(lettre.indexFinal);					
					
				}else{

					// 3e lettre consonne2
					if(Clavier.getIndexCons(lettre, Clavier.lastCons) && lettre.indexFinal){
						Clavier.lastSign = Clavier.sign[2];
						$scope.saisie = $scope.saisie.substring(0, $scope.saisie.length-1);					
						$scope.saisie += Clavier.getTroisiemeLettre(Clavier.getIndexCons(lettre, Clavier.lastCons));
						dejaAjoute = true;					
					}
					Clavier.remiseAZero();						
				}
				Clavier.lastLettre = lettre;	
			}else{
				Clavier.remiseAZero();
			}

			if(Clavier.sign.length === 0){	

				// 1ere lettre consonne ----- id initial = charCode - 4352				
				if(lettre.type === 'v'){					
					if(Clavier.lastLettre.type ==='c'){
						$scope.saisie = $scope.saisie.substring(0, $scope.saisie.length-1);
						Clavier.remiseAZero();
						$scope.saisie +=String.fromCharCode(Clavier.lastSign);
						$scope.saisie += Clavier.getPremiereLettre(Clavier.lastLettre);
						$scope.saisie = $scope.saisie.substring(0, $scope.saisie.length-1);
						$scope.saisie += Clavier.getDeuxiemeLettre(lettre.initial-4449);
						Clavier.lastVoyelle = lettre.initial-4449;
						Clavier.lastSign = '';
						Clavier.lastLettre='';
					}else{
						$scope.saisie += Clavier.getPremiereLettre(lettre);
						Clavier.remiseAZero();
					}
				}else if(!dejaAjoute){
					$scope.saisie += Clavier.getPremiereLettre(lettre);
				}
			}
		}
		Clavier.focus();
	}	

	$scope.effacer = function(){	
		$scope.saisie = $scope.saisie.substring(0, $scope.saisie.length-1);
		Clavier.remiseAZeroTotale();
		Clavier.focus();
	}	

	$scope.maj = function(){
		$scope.majActive=!$scope.majActive;
		Clavier.remiseAZero();

		if($scope.majActive){
			$scope.lettres= $scope.lettres2;
		}else{
			$scope.lettres = $scope.lettres1;				
		}
		Clavier.focus();
	}	

	$scope.espace = function(){
		$scope.saisie += ' ';
		Clavier.remiseAZeroTotale();
		Clavier.focus();
	}
});