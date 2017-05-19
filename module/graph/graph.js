function loadGraph(ajaxResponse){
  var data;
  data=JSON.parse(ajaxResponse);
  console.log(data);
  document.getElementById('updating-chart').innerHTML='';
  draw_my_chart_js(data['donnees']);

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

function draw_my_chart_js(data){
  var canvas = document.getElementById('updating-chart'),
    ctx = canvas.getContext('2d'),
    startingData = {
      labels: [
        data[0]['DTIME'],
        data[1]['DTIME'],
        data[2]['DTIME'],
        data[3]['DTIME'],
        data[4]['DTIME'],
        data[5]['DTIME'],
        data[6]['DTIME'],
        data[7]['DTIME'],
        data[8]['DTIME'],
        data[9]['DTIME']
      ],
      datasets: [
          {
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              data: [
                data[0]['NUM'],
                data[1]['NUM'],
                data[2]['NUM'],
                data[3]['NUM'],
                data[4]['NUM'],
                data[5]['NUM'],
                data[6]['NUM'],
                data[7]['NUM'],
                data[8]['NUM'],
                data[9]['NUM']
              ]
          }
      ]
    };

// Reduce the animation steps for demo clarity.
var myLiveChart = new Chart(ctx).Line(startingData, {animationSteps: 15});

}
