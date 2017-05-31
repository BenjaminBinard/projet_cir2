//Verification des champs avant inscription
function verification_champs(){
  var nom = document.getElementById('nom');
  var prenom = document.getElementById('prenom');
  var mot_de_passe=document.getElementById('password');
  var mot_de_passe_1=document.getElementById('password1');
  var mail=document.getElementById('mail');

  var bool_nom;
  var bool_prenom;
  var bool_mail;
  var bool_pass_1;
  var bool_pass_2;
  var bool_mail;

  if(mot_de_passe_1.value!=mot_de_passe.value){
    console.log("Le mot de passe n'est pas bon !");
    contour_rouge(mot_de_passe_1);
    bool_pass_1='FALSE';
  }else{
    contour_vert(mot_de_passe_1);
    contour_vert(mot_de_passe);
    bool_pass_1='TRUE';
  }
  if(mot_de_passe.value==''){
    contour_rouge(mot_de_passe);
    contour_rouge(mot_de_passe_1);
    bool_pass_2='FALSE';
  }else{
    bool_pass_2='TRUE';
  }

  if(nom.value==''){
    contour_rouge(nom);
    bool_nom='FALSE';
  }else{
    contour_vert(nom);
    bool_nom='TRUE';
  }
  if(prenom.value==''){
    contour_rouge(prenom);
    bool_prenom='FALSE';
  }else{
    contour_vert(prenom);
    bool_prenom='TRUE';
  }
  bool_mail=verification_mail(mail,1);
  console.log(prenom.value);
  console.log(nom.value);
  console.log(mail.value);
  console.log(mot_de_passe.value);
  if(bool_mail=='TRUE' && bool_nom=='TRUE' && bool_prenom=='TRUE' && bool_pass_1=='TRUE' && bool_pass_2=='TRUE'){
    ajaxRequest('PUT','php/request.php/inscription', sendInscription, 'nom='+nom.value+'&prenom='+prenom.value+'&password='+mot_de_passe.value+'&mail='+mail.value); //
  }
}

//Retour d'inscription. Chargement du compte et du menu
function sendInscription(ajaxResponse){
  ajaxRequest('GET', 'php/request.php/module/mon_compte', loadHtmlAndJs);
  ajaxRequest('GET', 'php/request.php/module/header', loadHtmlAndJs);
}
