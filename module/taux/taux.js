chargement_taux()

function chargement_taux(){
  var texte;
  ajaxRequest('GET', 'php/request.php/module/alerte', loadHtmlAndJs);
  texte=document.getElementById('connexion');
  texte.innerHTML='';
}

function loadGraph(ajaxResponse){
  var data;
  data=JSON.parse(ajaxResponse);
  console.log(data);
  var type=data['type'];

  var body=document.getElementById('graph');
  var texte;
  if(type=='temperature'){
    texte="Graphique de la température";
  }
  if(type=='CO2'){
    texte="graphique du taux de CO2";
  }
  if(type=='humidite'){
    texte="Graphique du taux d'humidité";
  }
  body.innerHTML=texte;
}
