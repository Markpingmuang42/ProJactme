<?php
    session_start();
    
    
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "regis_db";

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);


    if(isset($_POST) && !empty($_POST)){
        $Sto_name = $_POST['Sto_name'];
        $Sto_type = $_POST['Sto_type'];
        $Sto_subject = $_POST['Sto_subject'];
        $Sto_group = $_POST['Sto_group'];



        $sql= "INSERT INTO `story`(`Sto_name`, `Sto_tpye`, `Sto_subject`,`Sto_group`) VALUES ('$Sto_name','$Sto_type','$Sto_subject','$Sto_group')";
        $query = mysqli_query($conn,$sql);
        header("location:read.php");


        

    }