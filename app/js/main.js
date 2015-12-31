
$(function(){

	//Gestion des tailles et alignement des thumbnails

	setTimeout(resizeThumbnails, 500);
	window.addEventListener('resize', resizeThumbnails, false);

	function resizeThumbnails(){
		var maxHeight = 0;
		var thumbnails = document.querySelectorAll('.thumbnail');

		for(var i = 0; i < thumbnails.length; i++){
			thumbnails[i].style.height = 'auto';
		}

		for(var i = 0; i < thumbnails.length; i++){
			if(thumbnails[i].offsetHeight > maxHeight){
				maxHeight = thumbnails[i].offsetHeight;
			}
		}
		
		for(var i = 0; i < thumbnails.length; i++){
				thumbnails[i].style.height = maxHeight+ "px";
			}
		}


	//Fermeture du menu responsive lors d'un click sur un onglet
	
	var navbar = document.querySelector('.navbar-collapse');
	var liMenu = navbar.querySelectorAll('li');
	
	for(var i = 0; i < liMenu.length; i++){
		liMenu[i].addEventListener('click', function(){
			navbar.className = 'navbar-collapse collapse';
			navbar.setAttribute('aria-expanded', 'false');
		}, false);
	}
	
});
