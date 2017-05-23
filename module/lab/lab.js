document.getElementById('connexion').innerHTML='';
document.getElementById('mon_compte').innerHTML='';
document.getElementById('utilisateurs').style.top="10px";
ajaxRequest('GET', 'php/request.php/module/alerte', loadHtmlAndJs);
ajaxRequest('GET', 'php/request.php/module/taux', loadHtmlAndJs);
ajaxRequest('GET', 'php/request.php/module/graph', loadHtmlAndJs);
ajaxRequest('GET', 'php/request.php/module/utilisateurs', loadHtmlAndJs);
