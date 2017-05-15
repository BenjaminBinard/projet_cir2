chargement_inscription();

function chargement_inscription(){
  console.log("On est la ici a!");
  var texte;
  var body;

  //body=document.getElementById('connexion')
  //body.innerHTML='';
  texte=document.getElementById('connexion');
  texte.innerHTML='';
  texte.innerHTML="<div class='inscription'><input type='text' placeholder='username' name='user'><br><input type='text' placeholder='password' name='password'><br><input type='text' placeholder='re taper password' name='password1'><br><input type='text' placeholder='mail' name='mail'><br><input type='button' value='Inscription'></div>";

}
