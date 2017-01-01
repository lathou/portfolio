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
		if($(hash).prev('.section').length > 0){
		  	var prevSectionBott = getBottom($(hash).prev('.section')) -45;
		}else{
		  	var prevSectionBott = 0;
		}

		$('html, body').animate({scrollTop: prevSectionBott}, 1000, function(){
		    window.location.hash = hash;
		});	  	
	});

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
