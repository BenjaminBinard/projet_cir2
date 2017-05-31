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
  var seuil_humidite;
  var seuil_temperature;
  var seuil_CO2;
  if(data['room']==1){
    document.getElementById('titre_utilisateurs').innerHTML='Utilisateur du labo de Rennes';
    document.getElementById('breadcrumb_labo').innerHTML='labo de Rennes';
    seuil_humidite=data['seuil'][2]['THRESHOLD_LOW']+"% à "+data['seuil'][2]['THRESHOLD_HIGH'];
    seuil_temperature=data['seuil'][3]['THRESHOLD_LOW']+"°C à "+data['seuil'][3]['THRESHOLD_HIGH'];
    seuil_CO2=data['seuil'][1]['THRESHOLD_LOW']+"ppm à "+data['seuil'][1]['THRESHOLD_HIGH'];
  }
  if(data['room']==2){
    document.getElementById('titre_utilisateurs').innerHTML='Utilisateur du labo de Brest';
    document.getElementById('breadcrumb_labo').innerHTML='labo de Brest';
    seuil_humidite=data['seuil'][2]['THRESHOLD_LOW']+"% à "+data['seuil'][9]['THRESHOLD_HIGH'];
    seuil_temperature=data['seuil'][3]['THRESHOLD_LOW']+"°C à "+data['seuil'][10]['THRESHOLD_HIGH'];
    seuil_CO2=data['seuil'][1]['THRESHOLD_LOW']+"ppm à "+data['seuil'][8]['THRESHOLD_HIGH'];
  }
  document.getElementById('humidite_taux').innerHTML=data['humidite'][0]['NUM']+" %. <br>Seuils de conformité : de "+seuil_humidite+"%";
  document.getElementById('temperature_taux').innerHTML=data['temperature'][0]['NUM']+" °C. <br>Seuils de conformité : de "+seuil_temperature+"°C";
  document.getElementById('CO2_taux').innerHTML=data['CO2'][0]['NUM']+" ppm. <br>Seuils de conformité : de "+seuil_CO2+"ppm";

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
  if(document.getElementById('stop_taux').value=='non_stop_taux'){
    setTimeout(function(){ ajaxRequest('GET','php/request.php/taux', loadTaux); }, 60000);
  }

}
