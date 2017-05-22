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
			sendJsonData($mail);
		}
		if($request[0]=='mon_compte'){
			if(isset($_GET['nom']))
				infosUpdate($_GET['nom'],'USER', 'LASTNAME');
			if(isset($_GET['prenom']))
					infosUpdate($_GET['prenom'],'USER', 'FIRSTNAME');
			if(isset($_GET['mail']))
				infosUpdate($_GET['mail'], 'USER', 'MAIL_USER');
			if(isset($_GET['password']))
				infosUpdate($_GET['password'], 'USER', 'PASS');
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
