function pre_loadGraph(type){
  //document.getElementById('utilisateurs').style.top="-430px";
  var p = document.getElementById('stop_graphique');
  var att = document.createAttribute("value");
  att.value = type;
  p.setAttributeNode(att);
  var nbr=document.getElementById('nbr_points').value;
  ajaxRequest('GET', 'php/request.php/graph', loadGraph ,'type='+type+'&nbr='+nbr);
}

function loadGraph(ajaxResponse){
  document.getElementById('canvas').innerHTML='';
  document.getElementById('canvas').innerHTML="<canvas id='updating-chart' width='600' height='400'>";
  var data;
  data=JSON.parse(ajaxResponse);
  console.log(data);
  document.getElementById('updating-chart').innerHTML='';
  var nbr=data['nbr'];
  draw_my_chart_js(data['donnees'],data['type'], nbr);

  var type=data['type'];
  var texte;
  if(type=='temperature')
  texte="Graphique de la température";
  if(type=='CO2')
  texte="graphique du taux de CO2";
  if(type=='humidite')
  texte="Graphique du taux d'humidité";
  document.getElementById('titre_graph').innerHTML=texte;
}

function draw_my_chart_js(data,type, nbr){
  var p_pointColor;
  var p_strokeColor;
  var p_fillColor;
  var i;
  var data_num=[];
  var data_time=[];

  var j=nbr-1;
  for(i=0;i<nbr;i++){
    data_time[j]=data[i]['DTIME'];
    data_num[j]=data[i]['NUM'];
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
      }
    ]
  };

  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: graph_data,
    options: {animation:0}
});

  nbr=document.getElementById('nbr_points').value;
  if(type==document.getElementById('stop_graphique').value){
    setTimeout(function(){ ajaxRequest('GET','php/request.php/graph',loadGraph,'type='+type+'&nbr='+nbr); }, 3000);
  }
}
