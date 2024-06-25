<?php
  $type = $_POST["type"];

  if($type == "test"){
    header('Content-Type: application/json');  
    $data = array("code" => "404", "msg" => "Hello");  
    $result = json_encode($data);
    echo $result;
  }
?>