<?php
$expediteur = $_POST['prenom']+' '+ $_POST['nom'];
$mailExpediteur = 'From : ' + $_POST['mail'];
$message = $_POST['message'];
$message = wordwrap($message, 70, "\r\n");


mail( 'tholfou@gmail.com' , 'portfolio' , $message + '\n\n' + $expediteur, $mailExpediteur);

?>