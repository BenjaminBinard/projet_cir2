chargement_mon_compte();
ajaxRequest('GET','php/request.php/mon_compte',afficher_mes_infos);
ajaxRequest('GET','php/request.php/user_room',afficher_utilisateurs_room);
//Remet à vide les autres module
function chargement_mon_compte(){
  document.getElementById('taux').innerHTML='';
  document.getElementById('alerte').innerHTML='';
  document.getElementById('graph').innerHTML='';
  document.getElementById('connexion').innerHTML='';
  document.getElementById('utilisateurs').innerHTML='';
  document.getElementById('ajout_user').innerHTML='';
  //document.getElementById('utilisateurs').style.top="10px";
}

//Verification des données avant envoi
function modifier_mes_infos(){
  var nom=document.getElementById('envoi_nom');
  var prenom=document.getElementById('envoi_prenom');
  var mot_de_passe=document.getElementById('envoi_mot_de_passe');
  var mot_de_passe_1=document.getElementById('envoi_mot_de_passe_1');
  var mail=document.getElementById('envoi_mail');
  console.log(nom.value);
  if(nom.value!='' && prenom.value!='')
    ajaxRequest('PUT','php/request.php/mon_compte',callback,'nom='+nom.value+'&prenom='+prenom.value);
  if(mot_de_passe_1.value!='' && mot_de_passe.value!=''){
    if(mot_de_passe.value==mot_de_passe_1.value)
      ajaxRequest('PUT','php/request.php/mon_compte',callback,'password='+mot_de_passe.value);
  }
  if(mail.value!=''){
    if(verification_mail(mail.value,2)=='TRUE'){
      alert("Votre mail à bien été modifié. Veuillez vous reconnecter pour mettre à jour cette donnée.");
      ajaxRequest('PUT','php/request.php/mon_compte',callback,'mail='+mail.value);
    }
  }
}
//Affichage des informations personnelles de l'utilisateur
function afficher_mes_infos(ajaxResponse){
  data=JSON.parse(ajaxResponse);
  if(data=='ERROR'){
    ajaxRequest('GET','php/request.php/module/connexion',loadHtmlAndJs);
  }
  document.getElementById('nom').innerHTML="Nom : "+data[0]['LASTNAME'];
  document.getElementById('prenom').innerHTML="Prenom : "+data[0]['FIRSTNAME'];
  document.getElementById('mail').innerHTML="Adresse mail : "+data[0]['mail'];
}
//Fonction de retour de la mise à jour des informations personnelles
function callback(ajaxResponse){
  var data = JSON.parse(ajaxResponse);
  console.log(data);
  document.getElementById('envoi_nom').value='';
  document.getElementById('envoi_prenom').value='';
  document.getElementById('envoi_mot_de_passe').value='';
  document.getElementById('envoi_mot_de_passe_1').value='';
  document.getElementById('envoi_mail').value='';

  if(data=='DECONNEXION'){
    alert("Vous allez être déconnecté pour que les effets soient pris en compte.");
    location.href='';
  }else {
    ajaxRequest('GET','php/request.php/mon_compte',afficher_mes_infos);
  }
  document.getElementById('message_modif').innerHTML='Les modifications ont bien été prises en compte.';
}
//Affichage des utilisateurs supervisés
function afficher_utilisateurs_room(ajaxResponse){
  var data=JSON.parse(ajaxResponse);
  console.log(data);
  var i;
  var j;
  var texte='';
  var texte2='';
  for(i=0;i<data['mail_user'].length;i++){
    texte=texte+"<div class='panel-heading'>"+data['mail_user'][i]['MAIL_USER']+"<button type='button' class='btn btn-default btn_suppression' value='"+data['mail_user'][i]['MAIL_USER']+"' onclick='supprimer_supervise(this)' aria-label='Left Align'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button></div><div class='panel-body'>Chambre Numéro : "+data['mail_user'][i]['ID_ROOM']+"</br><br><div id='contact_boucle_"+i+"'><voir></voir></div><br><input type='textearea' id='"+data['mail_user'][i]['MAIL_USER']+"' placeholder='mail contact' class='form-control'></input><button type='button' class='btn btn-default' aria-label='Left Align' value='"+data['mail_user'][i]['MAIL_USER']+"' onclick='ajout_contact(this)'><span class='glyphicon glyphicon-plus-sign' aria-hidden='true'></span></button></div>";
  }
  document.getElementById('utilisateur_room').innerHTML=texte;
  for(j=0;j<data['mail_user'].length;j++){
    for(i=0;i<data['mail_contact'][j].length;i++){
      texte2=texte2+data['mail_contact'][j][i]['MAIL_CONTACT']+"<button type='button' value='"+data['mail_contact'][j][i]['MAIL_CONTACT']+"&"+data['mail_user'][j]['MAIL_USER']+"' class='btn btn-default' aria-label='Left Align' onclick='delete_contact(this)'><span class='glyphicon glyphicon-trash' aria-hidden='true'></span></button><br>";
    }
    document.getElementById('contact_boucle_'+j).innerHTML=texte2;
    texte2='';
  }
}

//suppression des supervisés
function supprimer_supervise(element){
  console.log(element.value);
  ajaxRequest('GET','php/request.php/supprimer_supervise',supprimer_supervise_callback, 'mail='+element.value);
}

//ajout d'un contact à un supervisé donné
function ajout_contact(element){
  var id=element.value;//id = mail_user
  var nouveau_mail=document.getElementById(id).value;
  var bool_mail=verification_mail(document.getElementById(id),1);
  if(bool_mail=='TRUE')
    ajaxRequest('GET','php/request.php/ajouter_contact',ajout_contact_callback, 'mail_contact='+nouveau_mail+'&mail_user='+id);
  else {
    alert("veuillez saisir une adresse mail valide.");
  }
}

function delete_contact(element){
  var mail=element.value.split("&");
  console.log(mail);
  ajaxRequest('GET','php/request.php/supprimer_contact',supression_contact, 'mail_contact='+mail[0]+'&mail_user='+mail[1]);
}

function ajout_contact_callback(ajaxResponse){
  console.log(ajaxResponse);
  ajaxRequest('GET','php/request.php/user_room',afficher_utilisateurs_room);
}

function supression_contact(ajaxResponse){
  console.log(ajaxResponse);
  ajaxRequest('GET','php/request.php/user_room',afficher_utilisateurs_room);
}

function supprimer_supervise_callback(ajaxResponse){
  console.log(ajaxResponse);
  ajaxRequest('GET','php/request.php/user_room',afficher_utilisateurs_room);
}
