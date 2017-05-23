chargement_taux();

function chargement_taux(){
  var texte;
  texte=document.getElementById('connexion');
  texte.innerHTML='';
}

ajaxRequest('GET','php/request.php/taux', loadTaux);

function loadTaux(ajaxResponse){
  var data=JSON.parse(ajaxResponse);
  console.log(data);
  document.getElementById('humidite_taux').innerHTML=data['humidite'][0]['NUM']+" %";
  document.getElementById('temperature_taux').innerHTML=data['temperature'][0]['NUM']+" °C";
  document.getElementById('CO2_taux').innerHTML=data['CO2'][0]['NUM']+" ppm";

  if(data['four'][0]['CAR']=='TRUE'){
    document.getElementById('image_four').setAttribute('src', 'images/four_on.png');
    document.getElementById('four_titre').innerHTML='Four allumé';
  }
  else{
    document.getElementById('image_four').setAttribute('src', 'images/four_off.png');
    document.getElementById('four_titre').innerHTML='Four éteint';
  }
  if(data['tv'][0]['CAR']=='on'){
    document.getElementById('image_tv').setAttribute('src', 'images/tv_on.png');
    document.getElementById('tv_titre').innerHTML='TV allumée';
  }
  else{
    document.getElementById('image_tv').setAttribute('src', 'images/tv_off.png');
    document.getElementById('tv_titre').innerHTML='TV éteinte';
  }
  setTimeout(function(){ ajaxRequest('GET','php/request.php/taux', loadTaux); }, 60000);
}
