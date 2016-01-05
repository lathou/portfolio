var envoyer = document.getElementById('sendMail');
var form = document.querySelector('form'),
	nom = document.getElementById('nom'),
	prenom = document.getElementById('prenom'),
	mail = document.getElementById('mail'),
	texte = document.getElementById('message');

envoyer.addEventListener('click', function(e){	
	e.preventDefault();
	if(verifier()){
		message = nom.value + ' ' + prenom.value + ' :' + mail.value + '\n\n' + texte.value;

		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://sophietk.herokuapp.com/mail', true);
		xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
		xhr.send(JSON.stringify({
			from: "sender@hihi.com",
			to: "tholfou@gmail.com",
			subject: "Portfolio",
			text: message
		}));

		xhr.addEventListener('readystatechange', function(){
			if(xhr.readyState === 4){
				if(xhr.status === 200){
					alert('Votre message a bien été envoyé');
					form.reset();	
				}else{
					alert('Une erreur est survenue, votre message n\'a pas pu être envoyé');
				}
			}
		},false);
	}
}, false);

function verifier(){
	verifierChamps(nom);
	verifierChamps(prenom);
	verifierChamps(texte);
	verifierMail(mail);

	if(verifierChamps(nom) && verifierChamps(prenom) && verifierChamps(texte) && verifierMail(mail)){
		return true;
	}else{
		return false;
	}
}

function verifierChamps(champs){
	if(champs.value.length){
		return true;
	}else{
		champs.className = 'form-control invalide';
		champs.addEventListener('keypress', function(){
			champs.className = 'form-control';
		});
		return false;
	}
}

function verifierMail(mail){
	var myRegex = /^[a-zA-Z0-9._\-]+@[a-zA-A0-9]+\.[a-zA-Z]{2,4}$/;
	if(myRegex.test(mail.value)){
		return true;
	}else{
		var span = document.getElementById('erreur');

		mail.className = 'form-control invalide';
		span.style.display = 'block';

		mail.addEventListener('keypress', function(){
			mail.className = 'form-control';
			span.style.display = 'none';
		});

		return false;
	}
}

