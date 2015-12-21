
//Gestion des taille et alignement des thumbnails

resizeThumbnails();
window.addEventListener('resize', resizeThumbnails, false);

function resizeThumbnails(){
	var maxHeight = 0;
	var thumbnails = document.querySelectorAll('.thumbnail');

	for(var i = 0; i<thumbnails.length; i++){
		thumbnails[i].style.height = 'auto';
	}

	for(var i = 0; i<thumbnails.length; i++){
		if(thumbnails[i].offsetHeight > maxHeight){
			maxHeight = thumbnails[i].offsetHeight;
		}
	}

	console.log('maxHeight : ' + maxHeight);
	for(var i = 0; i<thumbnails.length; i++){
		thumbnails[i].style.height = maxHeight+ "px";
	}
}