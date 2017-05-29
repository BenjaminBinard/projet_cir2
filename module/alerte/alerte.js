ajaxRequest('GET','php/request.php/alerte',loadAlerte);
setTimeout(function(){ ajaxRequest('GET','php/request.php/alerte',loadAlerte); }, 60000);

function loadAlerte(ajaxResponse){
  document.getElementById('sub_alerte').innerHTML="<div class='alert alert-success' role='alert'><h3>Pas d'alerte en cours</h3></div>";
  var data=JSON.parse(ajaxResponse);
  var i;
  var alerte='';
  console.log(data);
  if(data=='NULL'){
    console.log("Pas d'alertes en cours.");
    document.getElementById('sub_alerte').innerHTML="<div class='alert alert-success' role='alert'><h3>Pas d'alerte en cours</h3></div>";
  }else {
    for(i=0;i<data.length;i++){
      alerte=alerte+"<div class='alert alert-danger' role='alert'><h3>"+data[i]['DETAIL']+"</h3></div>";
    }
    document.getElementById('sub_alerte').innerHTML=alerte;
  }
}
