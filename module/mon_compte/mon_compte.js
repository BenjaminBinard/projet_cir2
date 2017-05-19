chargement_mon_compte();
ajaxRequest('GET','php/request.php/mon_compte',afficher_mes_infos);

function chargement_mon_compte(){
  document.getElementById('taux').innerHTML='';
  document.getElementById('alerte').innerHTML='';
  document.getElementById('graph').innerHTML='';
  document.getElementById('connexion').innerHTML='';
  document.getElementById('utilisateurs').innerHTML='';
}

function modifier_mes_infos(){
  var nom=document.getElementById('nom');
  var prenom=document.getElementById('prenom');
  var mot_de_passe=document.getElementById('mot_de_passe');
  var mot_de_passe_1=document.getElementById('mot_de_passe_1');
  var mail=document.getElementById('mail');

  if(nom.value!='' && prenom.value!='')
    ajaxRequest('PUT','php/request.php/mon_compte',callback,'nom='+nom.value+'&prenom='+prenom.value);
  if(mot_de_passe_1.value!='' && mot_de_passe.value!=''){
    if(mot_de_passe.value==mot_de_passe_1.value)
      ajaxRequest('PUT','php/request.php/mon_compte',callback,'password='+mot_de_passe.value);
  }
  if(mail.value!=''){
    if(verification_mail(mail.value,2)=='TRUE')
      ajaxRequest('PUT','php/request.php/mon_compte',callback,'mail='+mail.value);
  }
}
function afficher_mes_infos(ajaxResponse){
  data=JSON.parse(ajaxResponse);
  document.getElementById('nom').innerHTML="Nom : "+data[0]['LASTNAME'];
  document.getElementById('prenom').innerHTML="Prenom : "+data[0]['FIRSTNAME'];
  document.getElementById('mail').innerHTML="Adresse mail : "+data[0]['mail'];
}
function callback(ajaxResponse){

}
