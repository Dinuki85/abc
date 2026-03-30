<?php 

session_start();

require "connection.php";

$ind = $_POST["i"];
$fname = $_POST["f"];
$initials = $_POST["it"];
$specialneed = $_POST["sn"]; 
$paddress = $_POST["paddress"];
$taddress = $_POST["taddress"];
$emno = $_POST["emno"];
$wtno = $_POST["wtno"];
$hmno = $_POST["hmno"];
$mbno = $_POST["mbno"];

// echo $ind;
// echo $fname;
// echo $initials;
// echo $specialneed;
// echo $birthday;
// echo $paddress;
// echo $taddress;
// echo $emno;
// echo $wtno;
// echo $hmno;
// echo $mbno;

if(!preg_match("/07[0,1,2,4,5,6,7,8][0-9]/",$emno)){
    echo ("Invalid Mobile Number!");
}else if(!preg_match("/07[0,1,2,4,5,6,7,8][0-9]/",$emno)){
    echo ("Invalid Mobile Number!");
}else if(empty($mbno)){
    echo "Please Enter Your Mobile Number";
}else if(!preg_match("/07[0,1,2,4,5,6,7,8][0-9]/",$mbno)){
    echo ("Invalid Mobile Number!");
}else{
    $rs = Database::search("SELECT * FROM `student` WHERE `index`='".$ind."' OR `full_name`='".$fname."' AND `initial`='".$initials."'");
    $n = $rs->num_rows;

    if($n>0){
         
    Database::iud("UPDATE `student` SET `full_name`='".$fname."', `initial`='".$initials."', `special_need`='".$specialneed."',
    `permenant_address`='".$paddress."',`tempory_address`='".$taddress."',
    `emergency_no`='".$emno."',`whatsapp_no`='".$wtno."',`home_no`='".$hmno."',`mobile_no`='".$mbno."'  WHERE `student`.`index`='".$ind."'" );
       
echo("SUCCESS");
    }

}

?>