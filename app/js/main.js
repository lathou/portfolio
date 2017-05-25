$(document).ready(function(){

	// Start animation
	if($(window).scrollTop() < 100){
		var name = 'Nathalie Trin';
		var title = 'Développeuse Front-End';
		var nameLength = name.length;
		$('.home h1').text('')

		for (var i = 0; i < nameLength; i++) {
			addLetter('.home h1',name[i], i*100);
		}

		setTimeout(function(){
			for (var i = 1; i <= 3; i++) {
				removeLetter(nameLength - i, i*100)
			}
		},nameLength*100)

		setTimeout(function(){
			addLetter('.home h1','K', 200);
		}, (nameLength+3)*100)

		setTimeout(function(){
			$('.home h1').append('<span></span>');
			$('body').removeClass('animate');
			if($(window).innerWidth() > 768){
				var s = skrollr.init();
			}

			for (var i = 0; i < title.length; i++) {
				addLetter('.home h1 span',title[i], i*100);
			}
		},(nameLength+6)*100)
	}else{
		$('body').removeClass('animate');
		if($(window).innerWidth() > 768){
			var s = skrollr.init();
		}
	}

	function addLetter(where,letter, delay){
		setTimeout(function(){
			$(where).text($(where).text() + letter)
		}, delay)
	}

	function removeLetter(id, delay){
		setTimeout(function(){
			var text = $('.home h1').text()
			$('.home h1').text(text.substring(0, id))
		}, delay)
	}

	//Anchors
	$('nav a').on('click', function(e){
		if($(this).find('img').length == 0){
			e.preventDefault();
		}
		$('html, body').animate({scrollTop : $($(this).attr('href')).offset().top},1000)
	})
});	

//Percent
$(window).on('scroll load', function(){
	var percent = [0.8, 0.6, 0.5, 0.8];
	if($(window).scrollTop() >= $('.skills').offset().top -100){
		$('.skills li svg #bar').each(function(id, item){
			$(item).css('stroke-dashoffset', (424.11 * (1-percent[id])) + 'px')
		})
	}
})

//Mouse
$(window).on('load scroll', function(){
	if($(window).scrollTop() + $(window).innerHeight() > $('.home').innerHeight()){
		$('.home .mouse').removeClass('fixed');
	}else{
		$('.home .mouse').addClass('fixed')
	}
})