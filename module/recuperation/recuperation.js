chargement_recuperation();

function chargement_recuperation(){
  var texte="<div id='recuperation'><input type='text' placeholder='e-mail' name='mail'><br><input type='button' value='Recupérer mon mot de passe'><input id='inscription' type='button' value='inscription'></div>";
  var body=document.getElementById('connexion');
  body.innerHTML=texte;

  var node=document.getElementById('inscription')
  var onclick = document.createAttribute("onclick");       // Create a "class" attribute
  onclick.value = "ajaxRequest('GET','php/request.php/module/inscription',loadHtmlAndJs)";                           // Set the value of the class attribute
  node.setAttributeNode(onclick);

}
