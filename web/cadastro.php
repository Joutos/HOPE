<?php

header("Content-type: text/html; charset=utf-8");
// Definição do Banco//
$database = "usuarios";
//Varíaveis do Login//
$conexao = mysqli_connect("localhost:3306", "root", "", $database);

mysqli_set_charset( $conexao, 'utf8');

$nome = $_POST["name"];
$email = $_POST["email"];
$senha = $_POST["password"];
$tipo = $_POST["psych"];




$sql = "INSERT INTO users(id,nome,email,senha, tipo) VALUES (null,'$nome','$email','$senha', '$tipo')";
if (mysqli_query($conexao, $sql)) {
   header('Location: http://localhost:3000/login ');
 }else {
    echo "Error: " . $sql . "" . mysqli_error($conexao);
 }

 
mysqli_close($conexao);
?>


