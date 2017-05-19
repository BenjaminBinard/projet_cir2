chargement_connexion();

function chargement_connexion(){
  var texte;
  var body;

  document.getElementById('taux').innerHTML='';
  document.getElementById('alerte').innerHTML='';
  document.getElementById('graph').innerHTML='';
  document.getElementById('mon_compte').innerHTML='';
  document.getElementById('utilisateurs').innerHTML='';

}

function verif_connexion(){
  var mail=document.getElementById('mail');
  var mot_de_passe=document.getElementById('password');
  var bool_mail;
  var bool_pass;

  if(mail.value!='' && verification_mail(mail,1)=='TRUE'){
    bool_mail='TRUE';
  }
  else{
    bool_mail='FALSE';
    contour_rouge(mail);
  }
  if(mot_de_passe.value==''){
    bool_pass='FALSE';
    contour_rouge(mot_de_passe);
  }
  else
    bool_pass='TRUE';

  if(bool_mail=='TRUE' && bool_pass=='TRUE'){
    ajaxRequest('PUT','php/request.php/connexion',connexion,'mail='+mail.value+'&password='+mot_de_passe.value);
  }
}

function connexion(ajaxResponse){
  if(JSON.parse(ajaxResponse)=='TRUE'){
    ajaxRequest('GET','php/request.php/module/mon_compte',loadHtmlAndJs);
    ajaxRequest('GET','php/request.php/is_connected',is_connected);
  }
  //document.getElementById('if_not_connected').innerHTML='';
  //ajaxRequest('GET','php/request.php/is_connected',is_connected);
}
