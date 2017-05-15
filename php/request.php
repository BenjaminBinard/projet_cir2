<?php
  //include 'database.php';

	$request = substr($_SERVER['PATH_INFO'], 1);

	// We check if the request is a module.
	if (is_dir('../'.$request))
	{
		// We extract the module name.
		$moduleName = substr($request, strrpos($request, '/') + 1);
    if($moduleName=='connexion'){
      sendHtmlAndJsData('connexion', $request, $moduleName);
    }
		if($moduleName=='inscription'){
			sendHtmlAndJsData('inscription', $request, $moduleName);
		}
		if($moduleName=='recuperation'){
			sendHtmlAndJsData('recuperation', $request, $moduleName);
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
    if($request[0]=='taux'){
			$type=$_GET['type'];
			$data=array('type'=>$type);
      }
    }
		sendJsonData($data);
		header('HTTP/1.1 400 Bad request');
		exit;

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
