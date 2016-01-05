var envoyer = document.getElementById('sendMail');
var form = document.querySelector('form');

envoyer.addEventListener('click', function(){
	e.preventDefault();
	var nom = document.getElementById('nom').value,
		prenom = document.getElementById('prenom').value,
		mail = document.getElementById('mail').value,
		message = document.getElementById('message').value;

	if(nom && prenom && mail && message){

		message = nom + ' ' + prenom + ' :' + mail + '\n\n' + message;

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
		alert('Veuillez remplir les champs');
	}
}, false);

