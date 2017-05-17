chargement_connexion();

function chargement_connexion(){
  var texte;
  var body;

  texte=document.getElementById('taux');
  texte.innerHTML='';
  texte=document.getElementById('alerte');
  texte.innerHTML='';
  texte=document.getElementById('graph');
  texte.innerHTML='';
  texte=document.getElementById('mon_compte');
  texte.innerHTML='';
  texte=document.getElementById('utilisateurs');
  texte.innerHTML='';

}

function verif_connexion(){
  var mail=document.getElementById('mail');
  var mot_de_passe=document.getElementById('password');
  var bool_mail;
  var bool_pass;

  if(mail.value==''){
    bool_mail='FALSE';
    contour_rouge(username);
  }
  else
    bool_mail='TRUE';
  if(mot_de_passe.value==''){
    bool_pass='FALSE';
    contour_rouge(mot_de_passe);
  }
  else
    bool_pass='TRUE';

  if(bool_mail=='TRUE' && bool_pass=='TRUE'){
    console.log('champs non vide');
    ajaxRequest('PUT','php/request.php/connexion',connexion,'mail='+mail.value+'&password='+mot_de_passe.value);
  }
}

function connexion(ajaxResponse){
  console.log("Check");
  console.log(ajaxResponse);
}
