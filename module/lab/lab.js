//Chargement des éléments qui composent le labo
document.getElementById('connexion').innerHTML='';
document.getElementById('mon_compte').innerHTML='';

ajaxRequest('GET', 'php/request.php/module/alerte', loadHtmlAndJs);
ajaxRequest('GET', 'php/request.php/module/taux', loadHtmlAndJs);
ajaxRequest('GET', 'php/request.php/module/graph', loadHtmlAndJs);
ajaxRequest('GET', 'php/request.php/module/utilisateurs', loadHtmlAndJs);
