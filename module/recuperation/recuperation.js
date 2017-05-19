chargement_recuperation();

function chargement_recuperation(){
  var texte;

  texte=document.getElementById('alerte');
  texte.innerHTML='';
  texte=document.getElementById('graph');
  texte.innerHTML='';
  texte=document.getElementById('mon_compte');
  texte.innerHTML='';
  texte=document.getElementById('taux');
  texte.innerHTML='';
  texte=document.getElementById('utilisateurs');
  texte.innerHTML='';

}

function verif_recuperation(){
  console.log("chargement");
  var mail=document.getElementById('mail');
  var bool_mail=verification_mail(mail,1);
  if(bool_mail=='FALSE'){
    alert('Veuillez entrer une adresse mail valide.');
  }
  else{
    ajaxRequest('PUT','php/request.php/recuperation',recuperation,'mail='+mail.value);
  }
}

function recuperation(ajaxResponse){
  alert("Un mail avec votre mot de passe vous à été envoyé.");
  ajaxRequest('GET', 'php/request.php/module/connexion', loadHtmlAndJs);
}
