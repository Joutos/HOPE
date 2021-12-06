<?php header("Content-type: text/html; charset=utf-8");
// Definição do Banco//
$database = "usuarios";
//Varíaveis do Login//
$conexao = mysqli_connect("localhost:3306", "root", "", $database);

session_start();
mysqli_set_charset( $conexao, 'utf8');

$login = $_POST["email"];
$senha = $_POST["password"];


$verifica = $conexao->query("SELECT * FROM users WHERE email =
    '$login' AND senha = '$senha'") or die("<script language='javascript' type='text/javascript'>
        alert('Usuário não encontrado');window.location
        .href='http://localhost:3000/login';</script>");

 $tipo = $conexao->query("SELECT tipo FROM users WHERE email = '$login' AND senha = '$senha'")->fetch_object()->tipo;

      if ($row_cnt = $verifica->num_rows<=0){
        echo"<script language='javascript' type='text/javascript'>
        alert('Login e/ou senha incorretos');window.location
        .href='http://localhost:3000/login';</script>";
        die();
      }else{
        if($tipo == "1"){
          setcookie("login",$login);
          
          header("Location:http://localhost:3000/app");
        }else{
          setcookie("login",$login);
          
          header("Location:http://localhost:3000/map");
        }
        }
        
      

?>
