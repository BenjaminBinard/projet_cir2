//Pre chargement du graphique, lorsqu'un utilisateur clique sur le taux concerné
function pre_loadGraph(type){
  document.getElementById('graph').style.backgroundColor='transparent';
  document.getElementById('graph').style.width='100%';

  var p = document.getElementById('stop_graphique');
  var att = document.createAttribute("value");
  att.value = type;
  p.setAttributeNode(att);
  var nbr=document.getElementById('nbr_points').value;
  ajaxRequest('GET', 'php/request.php/graph', loadGraph ,'type='+type+'&nbr='+nbr);
}

//Retour du chargement du graphique. Contient les tableaux des valeures
function loadGraph(ajaxResponse){
  document.getElementById('canvas').innerHTML='';
  document.getElementById('canvas').innerHTML="<canvas id='updating-chart' width='600' height='400'>";
  var seuil_haut_humidite;
  var seuil_haut_temperature;
  var seuil_haut_CO2;
  var seuil_bas_humidite;
  var seuil_bas_temperature;
  var seuil_bas_CO2;
  var seuil_bas;
  var seuil_haut;
  var data=JSON.parse(ajaxResponse);
  console.log(data);
  document.getElementById('updating-chart').innerHTML='';

  if(data['room']==1){
    seuil_haut_humidite=data['seuil'][2]['THRESHOLD_HIGH'];
    seuil_haut_temperature=data['seuil'][3]['THRESHOLD_HIGH'];
    seuil_haut_CO2=data['seuil'][1]['THRESHOLD_HIGH'];
    seuil_bas_humidite=data['seuil'][2]['THRESHOLD_LOW'];
    seuil_bas_temperature=data['seuil'][3]['THRESHOLD_LOW'];
    seuil_bas_CO2=data['seuil'][1]['THRESHOLD_LOW'];
  }
  if(data['room']==2){
    seuil_haut_humidite=data['seuil'][9]['THRESHOLD_HIGH'];
    seuil_haut_temperature=data['seuil'][10]['THRESHOLD_HIGH'];
    seuil_haut_CO2=data['seuil'][8]['THRESHOLD_HIGH'];
    seuil_bas_humidite=data['seuil'][9]['THRESHOLD_LOW'];
    seuil_bas_temperature=data['seuil'][10]['THRESHOLD_LOW'];
    seuil_bas_CO2=data['seuil'][8]['THRESHOLD_LOW'];
  }

  var nbr=data['nbr'];
  var type=data['type'];
  var texte;

  if(type=='temperature'){
    texte="Graphique de la température";
    seuil_bas=seuil_bas_temperature;
    seuil_haut=seuil_haut_temperature;
  }
  if(type=='CO2'){
    texte="graphique du taux de CO2";
    seuil_bas=seuil_bas_CO2;
    seuil_haut=seuil_haut_CO2;
  }
  if(type=='humidite'){
    texte="Graphique du taux d'humidité";
    seuil_bas=seuil_bas_humidite;
    seuil_haut=seuil_haut_humidite;
  }

  draw_my_chart_js(data['donnees'],data['type'], nbr, seuil_bas, seuil_haut);

  document.getElementById('titre_graph').innerHTML=texte;
}

//Fonction chargée de la création du graphique. Indépendante de l'ajax
function draw_my_chart_js(data,type, nbr, seuil_bas, seuil_haut){
  var p_pointColor;
  var p_strokeColor;
  var p_fillColor;
  var i;
  var data_num=[];
  var data_time=[];

  console.log(seuil_bas);
  console.log(seuil_haut);
  var data_seuil_haut=[];
  var data_seuil_bas=[];

  var j=nbr-1;
  for(i=0;i<nbr;i++){
    data_time[j]=data[i]['DTIME'];
    data_num[j]=data[i]['NUM'];
    data_seuil_haut[i]=seuil_haut;
    data_seuil_bas[i]=seuil_bas;
    j--;
  }

  if(type=='temperature'){
    p_pointColor="rgba(128, 21, 21,1)";
    p_strokeColor="rgba(128, 21, 21,1)";
    p_fillColor="rgba(128, 21, 21,0.2)";
  }
  if(type=='humidite'){
    p_pointColor="rgba(151,187,205,1)";
    p_strokeColor="rgba(151,187,205,1)";
    p_fillColor="rgba(151,187,205,0.2)";
  }
  if(type=='CO2'){
    p_pointColor="rgba( 23, 29, 35,1)";
    p_strokeColor="rgba( 23, 29, 35,1)";
    p_fillColor="rgba( 23, 29, 35,0.2)";
  }
  var canvas = document.getElementById('updating-chart');
  ctx = canvas.getContext('2d');

  graph_data = {
    labels: data_time,
    datasets: [
      {
        borderColor: p_fillColor,
        pointBackgroundColor: p_strokeColor,
        pointBorderColor: p_pointColor,
        label : type,
        borderWidth : '2',
        data: data_num
      }, {
        borderColor: p_fillColor,
        fill: false,
        pointRadius: 0,
          label: 'Seuil haut',
          data: data_seuil_haut,
          type: 'line'
        }
        , {
            label: 'Seuil bas',
            fill: false,
            pointRadius: 0,
            data: data_seuil_bas,
            type: 'line'
          }
    ]
  };

  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: graph_data,
    options: {animation:0}
});

  nbr=document.getElementById('nbr_points').value;
  if(type==document.getElementById('stop_graphique').value){ //On boucle tout en verifiant la condition d'arret
    setTimeout(function(){ ajaxRequest('GET','php/request.php/graph',loadGraph,'type='+type+'&nbr='+nbr); }, 3000);
  }
}
