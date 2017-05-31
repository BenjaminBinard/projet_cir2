ajaxRequest('GET','php/request.php/alerte',loadAlerte);

//Chargement des alertes
function loadAlerte(ajaxResponse){
  document.getElementById('sub_alerte').innerHTML="<div class='alert alert-success' role='alert'><h3>Pas d'alerte en cours</h3></div>";
  var data=JSON.parse(ajaxResponse);
  var i;
  var alerte='';
  if(data!='NULL'){
    for(i=0;i<data.length;i++){
      alerte=alerte+"<div class='alert alert-danger' role='alert'><h3>"+data[i]['DETAIL']+"</h3></div>";
    }
    document.getElementById('sub_alerte').innerHTML=alerte;
  }
  if(document.getElementById('stop_taux').value=='non_stop_taux'){
    setTimeout(function(){ ajaxRequest('GET','php/request.php/alerte',loadAlerte); }, 60000);
  }
}
//Chargement de l'historique des alertes
function loadHistoriqueAlerte(ajaxResponse){
  document.getElementById('historique').innerHTML="<div class='alert alert-info' role='alert' id='espace_historique_alerte'></div>";
  var data=JSON.parse(ajaxResponse);
  var element=document.getElementById('espace_historique_alerte');
  var i;
  var texte='';
  for(i=0;i<data.length;i++){
    texte=texte+"<div class='alert alert-warning' role='alert'>Le "+data[i]['DTIME']+" une alerte \""+data[i]['DETAIL']+"\" à été émise.</div>"
  }
  element.innerHTML=texte;
}
