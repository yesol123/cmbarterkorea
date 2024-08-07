<?php
// 이곳에 있는 message라는 함수를 쓸수 있어여 
  function message($message,$code = "999"){
      header('Content-Type: application/json');  
      $data = array("code" => $code, "msg" => $message);  
      $result = json_encode($data);
      echo $result;
  }
?>