<?php 

session_start();

require "connection.php";

$username = $_POST["e"];
$password = $_POST["p"];

if(empty($username)){
    echo ("Please enter you username");
}else if (strlen($username)>50){
    echo("Username is too long");
}elseif(empty($password)){
    echo ("Please enter your password");
}else{

    $loginSearch = Database::search("SELECT * FROM `user` WHERE `username`='".$username."' AND `password`='".$password."'");
    $loginRow = $loginSearch->num_rows;

    if($loginRow == 1){
        echo ("Success");

        $loginResult = $loginSearch->fetch_assoc();
        $_SESSION["u"] = $loginResult;
    }else{
        echo("UserName or Password is incorrect");
    }

}

?>
