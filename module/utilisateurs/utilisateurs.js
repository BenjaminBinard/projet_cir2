ajaxRequest('GET','php/request.php/utilisateurs', loadUtilisateurs);

function loadUtilisateurs(ajaxResponse){
  var data=JSON.parse(ajaxResponse);
  console.log(data);
  document.getElementById('nom_utilisateur').innerHTML=data['utilisateurs'][0]['CAR'];
}
