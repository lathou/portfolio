window.addEventListener('load', function(){

	let hasSkrollr = false;
	document.body.classList.add('js-enabled');

	// Start animation
	if(window.scrollY < 100){

		const homeElement = document.querySelector('.home');
		homeElement.addEventListener('click', function(){
			document.body.classList.remove('animate');
			initSkrollr();
		});

		var nameElement = document.querySelector('.js-home__name');
		var titleElement = document.querySelector('.js-home__subtitle');

		var previousName = nameElement.getAttribute('data-previous');
		var finalName = nameElement.getAttribute('data-final');
		var commonNameLettersIndex = 0;
		var nameLength = previousName.length;
		var title = titleElement.innerText;
		var typingDelay = 50;

		(async function initName(){
			new Promise((resolve) => {
				nameElement.innerText = '';
				titleElement.innerText = '';
				resolve()
			})
		})();

		(async function writeName(){
			for (var i = 0; i < nameLength; i++) {
				await addLetter(nameElement, previousName[i], true);
				if (finalName.substring(0, i) === previousName.substring(0, i)) {
					commonNameLettersIndex = i;
				}
			}

			for (var i = previousName.length; i >= commonNameLettersIndex; i--) {
				await removeLetter(nameElement, i);
			}

			for (var i = commonNameLettersIndex; i < finalName.length; i++) {
				await addLetter(nameElement, finalName[i], i !== finalName.length -1);
			}

			for (var i = 0; i < title.length; i++) {
				await addLetter(titleElement, title[i], i !== title.length -1);
			}

			initSkrollr();
		})();

	}else {
		initSkrollr();
	}

	function initSkrollr() {
		document.body.classList.remove('animate');
		if(window.innerWidth > 768){
			!hasSkrollr && skrollr.init();
			hasSkrollr = true;
		}
	}

	async function addLetter(where, letter, shouldShowTypingCursor){
		return new Promise((resolve) => {
			setTimeout(function(){
				where.innerText = where.innerText.replace('|', '') + letter.replace(' ', '\u00a0') + (shouldShowTypingCursor ? '|' : '');
				resolve();
			}, typingDelay)
		})
	}

	function removeLetter(where, id){
		return new Promise((resolve) => {
			setTimeout(function(){
				where.innerText = where.innerText.substring(0, id);
				resolve();
			}, typingDelay)
		})
	}

	//Menu
	window.addEventListener('scroll', function(){
		const menuElement = document.querySelector('.menu');

		if(window.scrollY > 100){
			menuElement.classList.add('menu_bkg');
		} else {
			menuElement.classList.remove('menu_bkg');
		}

	})

	document.querySelectorAll('nav a').forEach(link => {
		if(link.getAttribute('href').indexOf('#') < 0) return;
		link.addEventListener('click', function(e){
			e.preventDefault();
			const anchor = document.querySelector(link.getAttribute('href'))
			window.scroll({
			  top: anchor.offsetTop - 60,
			  behavior: "smooth",
			});
		})
	})
});