<?php

$type='CO2';

function draw_my_chart($type, $data){

  include("../pChart2.1.4/class/pData.class.php");
  include("../pChart2.1.4/class/pDraw.class.php");
  include("../pChart2.1.4/class/pImage.class.php");


  $MyData = new pData();
  $MyData->addPoints(array($data[0]['NUM'],$data[1]['NUM'],5,8,5,-5),"graphique");
  $MyData->setSerieTicks("graphique",1);
  $MyData->setSerieWeight("graphique",1);
  if($type=='humidite')
    $MyData->setAxisName(0,"Taux d'humidité");
  if($type=='temperature')
    $MyData->setAxisName(0,"Température");
  if($type=='CO2')
    $MyData->setAxisName(0,"Taux de CO2");
  $MyData->addPoints(array("12h30","12h35","12h40","12h45","12h50","12h55"),"Labels");
  $MyData->setSerieDescription("Labels","Months");
  $MyData->setAbscissa("Labels");

  $myPicture = new pImage(700,230,$MyData);
  $myPicture->Antialias = FALSE;
  $myPicture->drawRectangle(0,0,699,229,array("R"=>0,"G"=>0,"B"=>0));

  $myPicture->setFontProperties(array("FontName"=>"../pChart2.1.4/fonts/Forgotte.ttf","FontSize"=>11));
  if($type=='humidite')
    $myPicture->drawText(150,35,"Taux d'humidité de la pièce",array("FontSize"=>20,"Align"=>TEXT_ALIGN_BOTTOMMIDDLE));
  if($type=='temperature')
    $myPicture->drawText(150,35,"Température de la pièce",array("FontSize"=>20,"Align"=>TEXT_ALIGN_BOTTOMMIDDLE));
  if($type=='CO2')
    $myPicture->drawText(150,35,"Taux de CO2 de la pièce",array("FontSize"=>20,"Align"=>TEXT_ALIGN_BOTTOMMIDDLE));

  $myPicture->setFontProperties(array("FontName"=>"../pChart2.1.4/fonts/pf_arma_five.ttf","FontSize"=>6));
  $myPicture->setGraphArea(60,40,650,200);
  $scaleSettings = array("XMargin"=>10,"YMargin"=>10,"Floating"=>TRUE,"GridR"=>200,"GridG"=>200,"GridB"=>200,"DrawSubTicks"=>TRUE,"CycleBackground"=>TRUE);
  $myPicture->drawScale($scaleSettings);
  $myPicture->Antialias = TRUE;
  $myPicture->drawLineChart();
  $myPicture->drawPlotChart(array("DisplayValues"=>TRUE,"PlotBorder"=>TRUE,"BorderSize"=>2,"Surrounding"=>-60,"BorderAlpha"=>80));
  $myPicture->drawLegend(540,20,array("Style"=>LEGEND_NOBORDER,"Mode"=>LEGEND_HORIZONTAL));
  $myPicture->render("image_name.png");
}


?>
