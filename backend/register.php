<?php
    include_once("persistencia.php");
    $postdata = file_get_contents("php://input");
    
    if(isset($postdata) && !empty($postdata))
    {
        $request = json_decode($postdata);
        $name = trim($request->name);
        $pwd = mysqli_real_escape_string($mysqli, trim($request->pwd));
        $email = mysqli_real_escape_string($mysqli, trim($request->email));
        $sql = "INSERT INTO usuarios(nombre_usuario, contraseña, email, administrador) VALUES ('$name','$pwd','$email', false)";
        if ($mysqli->query($sql) === TRUE) {
            $authdata = [
            'nombre' => $name,
            'contraseña' => '',
            'email' => $email,
            'id' => mysqli_insert_id($mysqli)
            ];

            echo json_encode($authdata);
        }
    }
?>