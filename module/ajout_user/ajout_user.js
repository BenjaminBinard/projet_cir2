document.getElementById('mon_compte').innerHTML='';
//Ajouter un utilisateurs supervisé
function ajout_user(){
  var mail=document.getElementById('ajout_mail');
  var salle1=document.getElementById('salle_1');
  var salle2=document.getElementById('salle_2');
  var bool_mail=verification_mail(mail, 1);
  if(salle1.checked && bool_mail=='TRUE'){
    ajaxRequest('GET','php/request.php/ajout_user',loadUser,'mail='+mail.value+'&salle=1');
  }
  if(salle2.checked && bool_mail=='TRUE'){
    ajaxRequest('GET','php/request.php/ajout_user',loadUser,'mail='+mail.value+'&salle=2');
  }
}
//Retour après utilisateur supervisé ajouté
function loadUser(ajaxResponse){
  var data=JSON.parse(ajaxResponse);
  ajaxRequest('GET', 'php/request.php/module/mon_compte', loadHtmlAndJs);
}
