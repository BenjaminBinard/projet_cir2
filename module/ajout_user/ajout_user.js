document.getElementById('mon_compte').innerHTML='';

function ajout_user(){
  var mail=document.getElementById('ajout_mail');
  var salle1=document.getElementById('salle_1');
  var salle2=document.getElementById('salle_2');
  var bool_mail=verification_mail(mail, 1);
  console.log(salle1.checked);
  console.log(salle2.checked);
  if(salle1.checked && bool_mail=='TRUE'){
    ajaxRequest('GET','php/request.php/ajout_user',loadUser,'mail='+mail.value+'&salle=1');
  }
  if(salle2.checked && bool_mail=='TRUE'){
    ajaxRequest('GET','php/request.php/ajout_user',loadUser,'mail='+mail.value+'&salle=2');
  }
}

function loadUser(ajaxResponse){
  var data=JSON.parse(ajaxResponse);
  console.log(data);
  ajaxRequest('GET','php/request.php/user_room',afficher_utilisateurs_room);
}
