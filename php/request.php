<?php
include 'database.php';

$request = substr($_SERVER['PATH_INFO'], 1);

// We check if the request is a module.
if (is_dir('../'.$request))
{
	// We extract the module name.
	$moduleName = substr($request, strrpos($request, '/') + 1);
	if($moduleName=='connexion' || $moduleName=='recuperation' || $moduleName=='inscription'){
		sendHtmlAndJsData('connexion', $request, $moduleName);
	}
	if($moduleName=='header'){
		sendHtmlAndJsData('header', $request, $moduleName);
	}
	if($moduleName=='alerte'){
		sendHtmlAndJsData('alerte', $request, $moduleName);
	}
	if($moduleName=='mon_compte'){
		sendHtmlAndJsData('mon_compte', $request, $moduleName);
	}
	if($moduleName=='taux'){
		//if($_GET['labo']==Rennes){
		sendHtmlAndJsData('taux', $request, $moduleName);
		//}
	}
}
else
{
	$request=explode('/', $request);
	$requestType = $_SERVER['REQUEST_METHOD'];
	if($requestType=='GET'){
		if($request[0]=='taux'){
			$type=$_GET['type'];
			$data=array('type'=>$type);
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
			}
		}
		if($request[0]=='recuperation'){
			$mail=$_GET['mail'];
			sendJsonData($mail);
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
