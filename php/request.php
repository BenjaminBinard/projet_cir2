<?php
include 'database.php';
include 'graph.php';

$request = substr($_SERVER['PATH_INFO'], 1);

// We check if the request is a module.
if (is_dir('../'.$request))
{
	// We extract the module name.
	$moduleName = substr($request, strrpos($request, '/') + 1);
	if($moduleName=='connexion' || $moduleName=='recuperation' || $moduleName=='inscription')
		sendHtmlAndJsData('connexion', $request, $moduleName);
	if($moduleName=='header')
		sendHtmlAndJsData('header', $request, $moduleName);
	if($moduleName=='mon_compte')
		sendHtmlAndJsData('mon_compte', $request, $moduleName);
	if($moduleName=='lab')
		sendHtmlAndJsData('lab', $request, $moduleName);
	if($moduleName=='alerte')
		sendHtmlAndJsData('alerte', $request, $moduleName);
	if($moduleName=='taux')
		sendHtmlAndJsData('taux', $request, $moduleName);
	if($moduleName=='graph')
		sendHtmlAndJsData('graph', $request, $moduleName);
	if($moduleName=='utilisateurs')
		sendHtmlAndJsData('utilisateurs', $request, $moduleName);
	if($moduleName=='ajout_user')
		sendHtmlAndJsData('ajout_user', $request, $moduleName);
}
else
{
	$request=explode('/', $request);
	$requestType = $_SERVER['REQUEST_METHOD'];
	if($requestType=='GET'){
		if($request[0]=='graph'){
			$type=$_GET['type'];
			$nbr=$_GET['nbr'];
			$data=array('donnees'=> data_chart($type, $nbr), 'type'=>$type, 'nbr'=>$nbr);
		}
		if($request[0]=='is_connected'){
			if(isset($_SESSION['mail'])){
				$data='TRUE';
			}else{
				$data='FALSE';
			}
		}
		if($request[0]=='deconnexion'){
			if(isset($_SESSION['mail'])){
				unset($_SESSION['mail']);
				session_destroy();
				$data='FIN';
			}
		}
		if($request[0]=='mon_compte'){
			if(isset($_SESSION['mail'])){
				$data=mes_donnees($_SESSION['mail']);
			}else {
				$data='ERROR';
			}
		}
		if($request[0]=='taux'){
			$humidite=db_recup_taux('humidite');
			$temperature=db_recup_taux('temperature');
			$CO2=db_recup_taux('CO2');
			$four=db_recup_taux('four');
			$tv=db_recup_taux('tv');
			$data=array('humidite'=>$humidite,'temperature'=>$temperature,'CO2'=>$CO2, 'four'=>$four, 'tv'=>$tv);
		}
		if($request[0]=='utilisateurs'){
			$utilisateurs=db_recup_taux('utilisateurs');
			//$pas=db_recup_taux('pas')
			if($utilisateurs[0]['CAR']=="")
				$data='error';
			else
				$data=array('utilisateurs'=>$utilisateurs);
		}
		if($request[0]=='alerte'){
			$time=db_get_time();
			$data=db_recup_alerte();
			if($time[0]['MAX(DTIME)']!=$data[0]['DTIME'])
				$data='NULL';
		}
		if($request[0]=='user_room'){
			$data1=db_recup_user();
			for($i=0;$i<sizeof($data1);$i++){
				$data2[$i]=db_recup_contact($data1[$i]['MAIL_USER']);
			}
			$data=array('mail_user'=>$data1,'mail_contact'=>$data2);
		}
		if($request[0]=='ajout_user'){
			$mail=$_GET['mail'];
			$salle=$_GET['salle'];
			$data=db_ajout_user($mail,$salle);
		}
		if($request[0]=='supprimer_contact'){
			if(isset($_GET['mail_contact']) && isset($_GET['mail_user'])){
				$data=db_suppression_mail_contact($_GET['mail_contact'],$_GET['mail_user']);
			}else {
				$data='FALSE';
			}
		}
		if($request[0]=='ajouter_contact'){
			if(isset($_GET['mail_contact']) && isset($_GET['mail_user'])){
				$data=db_ajouter_contact($_GET['mail_contact'],$_GET['mail_user']);
			}else {
				$data='FALSE';
			}
		}
		sendJsonData($data);
	}

	if($requestType=='PUT'){
		if($request[0]=='inscription'){
			$nom=$_GET['nom'];
			$prenom=$_GET['prenom'];
			$mail=$_GET['mail'];
			$password=$_GET['password'];
			inscription($nom,$prenom,$mail,$password);
		}
		if($request[0]=='connexion'){
			$mail=$_GET['mail'];
			$password=$_GET['password'];
			$result=connexion($mail,$password);
			if($result=='TRUE'){
				$_SESSION['mail']=$mail;
				$_SESSION['password']=$password;
				sendJsonData(array('is_connected'=>'TRUE','mail'=>$mail));
			}else
				sendJsonData(array('is_connected'=>'FALSE'));
		}
		if($request[0]=='recuperation'){
			$mail=$_GET['mail'];
			$mdp=db_recup_mdp($mail);
			$to      = 'personne@example.com';
			$subject = 'le sujet';
			$message = 'Bonjour !';
			$headers = 'From: webmaster@example.com' . "\r\n" .
			'Reply-To: webmaster@example.com' . "\r\n" .
			'X-Mailer: PHP/' . phpversion();
			$test=mail($to, $subject, $message, $headers);
			sendJsonData($test);
		}
		if($request[0]=='mon_compte'){
			if(isset($_GET['nom']))
				$request=infosUpdate($_GET['nom'],'USER', 'LASTNAME');
			if(isset($_GET['prenom']))
				$request=infosUpdate($_GET['prenom'],'USER', 'FIRSTNAME');
			if(isset($_GET['password']))
				$request=infosUpdate($_GET['password'], 'USER', 'PASS');
			if(isset($_GET['mail'])){
				$request=infosUpdate($_GET['mail'], 'USER', 'MAIL_USER');
				unset($_SESSION['mail']);
				session_destroy();
				$data='DECONNEXION';
			}
			else
				sendJsonData($request);
		}
	}
}

	//----------------------------------------------------------------------------
	//--- sendHtmlAndJsData ------------------------------------------------------
	//----------------------------------------------------------------------------
	function sendHtmlAndJsData($divId, $modulePath, $moduleName)
	{
		// We create the data (Html and Js).
		$data = array ('html' => $modulePath.'/'.$moduleName.'.html',
		'divId' => $divId, 'js' => $modulePath.'/'.$moduleName.'.js');
		sendJsonData($data);
	}

	function sendHtmlAndJsDataSpecial($divId, $modulePath, $moduleName, $type)
	{
		// We create the data (Html and Js).
		$data = array ('html' => $modulePath.'/'.$moduleName.'.html',
		'divId' => $divId, 'js' => $modulePath.'/'.$moduleName.'.js', 'type'=>$type);
		sendJsonData($data);
	}

	//----------------------------------------------------------------------------
	//--- sendJsonData -----------------------------------------------------------
	//----------------------------------------------------------------------------
	function sendJsonData($data, $code = 200)
	{
		// We send the data to the client.
		header('Content-Type: text/plain; charset=utf-8');
		header('Cache-control: no-store, no-cache, must-revalidate');
		header('Pragma: no-cache');
		header('HTTP/1.1 200 OK');
		echo json_encode($data);
		exit;
	}

	?>
