var envoyer = document.getElementById('sendMail');
var form = document.querySelector('form');
	var nom = document.getElementById('nom'),
		prenom = document.getElementById('prenom'),
		mail = document.getElementById('mail'),
		texte = document.getElementById('message');

envoyer.addEventListener('click', function(){	
	if(verifierMail(mail.value)){		
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
	}else{

	}
}, false);


function verifierMail(mail){
	var myRegex = /^[a-zA-Z0-9._\-]+@[a-zA-A0-9]+\.[a-zA-Z]{2,4}$/;
	if(myRegex.test(mail)){
		return true;
	}
}

