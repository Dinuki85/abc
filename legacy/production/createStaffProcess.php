<?php
require "connection.php";


$id = $_POST["in"];
$name = $_POST["n"];
$salary = $_POST["s"];
$catergory = $_POST["c"];
$birthday = $_POST["b"];
$emeno = $_POST["e"];
$whtno = $_POST["w"];
$hmno = $_POST["h"];
$mbno = $_POST["m"];
$paddress = $_POST["p"];
$taddress = $_POST["t"];
$email = $_POST["el"];

$cat_rs =  Database::search("SELECT * FROM `catergory` WHERE `idcatergory`='".$catergory."'");
    $cat_data;
    if($cat_rs->num_rows >0)
    {
        $cat_data = $cat_rs->fetch_assoc();
        
    }

// echo ($catergory);

// echo $name;
// echo $salary;
// // echo $catergory;
// echo $birthday;
// echo $emeno;
// echo $whtno;
// echo $hmno;
// echo $mbno;
// echo $paddress;
// echo $taddress;
// echo $email;

if(empty($id)){
    echo "Insert a Staff ID";
}else if(empty($name)){
    echo "Enter Your Name";
}elseif(empty($salary)){
    $salary = '0';
    // echo $salary;
}else if(!is_numeric($salary)){
    echo "Invalid Value" ; 
}else if($catergory == 0){
  echo "Select A catergory";
}else if(empty($birthday)){
    echo ("Please enter Your Birthday");
}else if(empty($paddress)){
    echo("Please Enter Your Address");
}else if(empty($emeno)){
    echo "Please Enter an Emergency Number";
}else if(!preg_match("/07[0,1,2,4,5,6,7,8][0-9]/",$emeno)){
    echo ("Invalid Mobile Number!");        
}else if(empty($whtno)){
    echo "please Enter Whatsapp Number";
}else if(!preg_match("/07[0,1,2,4,5,6,7,8][0-9]/",$whtno)){
    echo ("Invalid Mobile Number!");
}else if(empty($hmno)){
    echo "Please Enter Mobile Number";
}else if(!preg_match("/07[0,1,2,4,5,6,7,8][0-9]/",$hmno)){
    echo ("Invalid Mobile Number!");
}else if(empty($mbno)){
    echo "Please Enter Your Mobile Number";
}else if(!preg_match("/07[0,1,2,4,5,6,7,8][0-9]/",$mbno)){
    echo ("Invalid Mobile Number!");
}else{
   
   
   $sta =  Database::search("SELECT * FROM `staff` WHERE `id`='".$id."' AND `catergory_idcatergory`='".$catergory."'");
    $n = $sta->num_rows;

    if($n>0){
        echo "Staff Already Exist";
    }else{
        Database::iud("INSERT INTO `staff`(`id`,`name`,`salary`,`catergory_idcatergory`,`birthday`,`permenant_address`,`tempory_address`,`emergency_no`,`whats_no`,`home_no`,`mobile_no`,`email`)VALUES
        ('".$id."','".$name."','".$salary."','".$catergory."','".$birthday."','".$paddress."','".$taddress."','".$emeno."','".$whtno."','".$hmno."','".$mbno."','".$email."')");

        echo("Success");
    }   
}
?>