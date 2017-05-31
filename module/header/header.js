ajaxRequest('GET','php/request.php/is_connected',is_connected);
//Verification de la connection. Charge le header si l'utilisateur est connecé
function is_connected(ajaxResponse){
  var is_connected=JSON.parse(ajaxResponse);
  var body;
  var texte;
  if(is_connected=='TRUE'){
    body=document.getElementById('if_connected');
    texte="<button id='lab_rennes' class='btn btn-primary'>Lab Rennes</button><button id='lab_brest' class='btn btn-primary'>Lab Brest</button><button id='mon_compte_btn' class='btn btn-primary'>Mon compte</button><button id='deconnexion' class='btn btn-primary'>Deconnexion</button>";
    body.innerHTML=texte;

    var attribute0=document.createAttribute("onclick");
    attribute0.value="ajaxRequest('GET','php/request.php/module/lab',loadHtmlAndJs,'labo=Rennes')";
    document.getElementById('lab_rennes').setAttributeNode(attribute0);

    var attribute=document.createAttribute("onclick");
    attribute.value="ajaxRequest('GET','php/request.php/module/lab',loadHtmlAndJs,'labo=Brest')";
    document.getElementById('lab_brest').setAttributeNode(attribute);

    var attribute1=document.createAttribute("onclick");
    attribute1.value="ajaxRequest('GET','php/request.php/module/mon_compte',loadHtmlAndJs)";
    document.getElementById('mon_compte_btn').setAttributeNode(attribute1);

    var attribute2=document.createAttribute("onclick");
    attribute2.value="ajaxRequest('GET','php/request.php/deconnexion',deconnexion)";
    document.getElementById('deconnexion').setAttributeNode(attribute2);

  }else{
    ajaxRequest('GET','php/request.php/module/connexion',loadHtmlAndJs);
  }
}

//Retour de deconnexion. Charge la page d'acceuil (connexion)
function deconnexion(ajaxResponse){
  document.getElementById('if_connected').innerHTML='';
  ajaxRequest('GET','php/request.php/is_connected',is_connected);
}
