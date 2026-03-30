<?php 

session_start();

require "connection.php";

$ind = $_POST["i"];
$fname = $_POST["f"];
$initials = $_POST["it"];
$specialneed = $_POST["sn"];
$birthday = $_POST["bd"];
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

if(empty($ind)){
    echo ("Enter The index Number of student");
}else if(strlen($ind)>45){
    echo ("Can Only Contaiain 45 Characters");
}else if(empty($fname)){
    echo "Enter Your Full Name";
}else if(empty($initials)){
    echo("Enter Name With Initial");
}else if(empty($birthday)){
    echo ("Please enter Your Birthday");
}else if(empty($paddress)){
    echo("Please Enter Your Address");
}else if(empty($emno)){
    echo "Please Enter an Emergency Number";
}else if(!preg_match("/07[0,1,2,4,5,6,7,8][0-9]/",$emno)){
    echo ("Invalid Mobile Number!");
}else if(empty($wtno)){
    echo "please Enter Whatsapp Number";
}else if(!preg_match("/07[0,1,2,4,5,6,7,8][0-9]/",$emno)){
    echo ("Invalid Mobile Number!");
}else if(empty($hmno)){
    echo "Please Enter Mobile Number";
}else if(empty($mbno)){
    echo "Please Enter Your Mobile Number";
}else if(!preg_match("/07[0,1,2,4,5,6,7,8][0-9]/",$mbno)){
    echo ("Invalid Mobile Number!");
}else{
    $rs = Database::search("SELECT * FROM `student` WHERE `index`='".$ind."' OR `full_name`='".$fname."' AND `initial`='".$initials."'");
    $n = $rs->num_rows;

    if($n>0){
        echo "Student Already Exist";
    }else{
        Database::iud("INSERT INTO `student`
 (`index`,`full_name`,`initial`,`special_need`,`birthday`,`permenant_address`,`tempory_address`,`emergency_no`,`whatsapp_no`,`home_no`,`mobile_no`)VALUES
 ('".$ind."','".$fname."','".$initials."','".$specialneed."','".$birthday."','".$paddress."','".$taddress."','".$emno."','".$wtno."','".$hmno."','".$mbno."')");

echo("SUCCESS");
    }

}

?>