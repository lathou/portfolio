var previousBott = getBottom($('#accueil'))

/*$(window).on('scroll load', function(){
	$('.section').each(function(){
		if(previousBott - 300 <= $(window).scrollTop()){
			$(this).css({transform : 'scale(1)'});
			previousBott = getBottom($(this));
		}
	})
})*/

function getBottom(that){
	return that.offset().top + that.innerHeight();
}

$(function () {
	var c=document.querySelector('.navbar-collapse');var d=c.querySelectorAll('li');for(var i=0;i<d.length;i++){d[i].addEventListener('click',function(){c.className='navbar-collapse collapse';c.setAttribute('aria-expanded','false')},false)}
	// Scrollspy fluide
	$('header a').on('click', function(e) {
		e.preventDefault();
		var hash = $(this).attr('href');

		$('html, body').animate({scrollTop: $(hash).offset().top}, 700, function(){
		    window.location.hash = hash;
		});	  	
	});

	$('.see').on('click', function(){
		console.log($('#accueil').offset().top)
		$('html, body').animate({scrollTop: $('#accueil').next('.section').offset().top},700);
	})

	//projects details
	var openedDetails = false;
	$('.thumbnail').on('click', function(){
		var project = '.' + $(this).attr('data-target');
		$('.detail-portfolio').find('.row').hide();
		$('.detail-portfolio').find(project).fadeIn()

		if(!openedDetails){
			$('.detail-portfolio').slideDown();
			$('#portfolio').animate({paddingBottom:'0'})
		}
	})

	//Print
	$('.print').on('click', function(e){
		e.preventDefault();
		window.print();
	})

});
