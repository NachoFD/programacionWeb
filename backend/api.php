<?php
    include_once("persistencia.php");

    $metodo = strtolower($_SERVER['REQUEST_METHOD']);
    $accion = strtolower($_GET['accion']);
    $funcionNombre = $metodo . ucfirst($accion);

    if (function_exists($funcionNombre)) {
        call_user_func($funcionNombre);
    }

    function getPerfil() {
        global $mysqli;

        $id = $_GET['id'];

        // Realiza la consulta a la base de datos
        $perfil = "SELECT u.nombre_usuario, u.email FROM usuarios u WHERE u.id = $id";
        $pokemones = "SELECT COUNT(DISTINCT r.id_pokemon) AS cantidad_pokemones FROM usuarios u JOIN registro r ON u.id = r.id_usuario WHERE u.id = $id GROUP BY u.id";
        $amigos = "SELECT COUNT(DISTINCT a.id) AS cantidad_amigos FROM usuarios u JOIN amigos a ON u.id = a.id_usuario OR u.id = a.id_amigo WHERE u.id = 1 GROUP BY u.id";

        $resultPerfil = $mysqli->query($perfil);
        $resultPokemones = $mysqli->query($pokemones);
        $resultAmigos = $mysqli->query($amigos);

        if ($resultPerfil) {
            $rowPerfil = $resultPerfil->fetch_assoc();

            $pokemones = 0;
            $amigos = 0;

            if($resultPokemones){
                $rowPokemones = $resultPokemones->fetch_assoc();
                
                if($rowPokemones != null){
                    $pokemones = $rowPokemones['cantidad_pokemones'];
                }
                else
                {
                    $pokemones = 0;
                }
            }

            if($resultAmigos){
                $rowAmigos = $resultAmigos->fetch_assoc();
                
                if($rowAmigos != null){
                    $amigos = $rowAmigos['cantidad_amigos'];
                }
                else
                {
                    $amigos = 0;
                }
            }

            // Obtener los datos del perfil
            $nombreUsuario = $rowPerfil['nombre_usuario'];
            $email = $rowPerfil['email'];

            // Crear el array con los datos del perfil
            $datosPerfil = array(
                'nombre_usuario' => $nombreUsuario,
                'email' => $email,
                'amigos' => $amigos,
                'pokemones' => $pokemones
            );

            // Convertir los datos a JSON
            $jsonDatosPerfil = json_encode($datosPerfil);

            // Imprimir el JSON como respuesta
            echo $jsonDatosPerfil;
        } else {
            // Manejar el error en caso de que la consulta falle
            echo "Error en la consulta: " . $mysqli->error;
        }
    }

    function getPokemones(){
        global $mysqli;

        $id_usuario = $_GET['id'];

        // Guarda la consulta en una variable
        $consulta = "SELECT u.nombre_usuario, u.email FROM usuarios u WHERE u.id = $id_usuario";

        // Envia la consulta y guarda el resultado
        $resulConsulta = $mysqli->query($consulta);

        if($resulConsulta)
        {
            // Guarda el resultado en Rows
            $rowConsulta = $resulConsulta->fetch_assoc();
        
            // Obtener los datos de los resultados
            $id = $rowConsulta['id'];
            $nombre = $rowConsulta['nombre_pokemon'];
            $imagen = $rowConsulta['url_imagen'];

            // Crear el array con los datos del perfil
            $datos = array(
                'id' => $id,
                'nombre_pokemon' => $nombre,
                'url_imagen' => $imagen
            );

            // Convertir los datos a JSON
            $jsonDatos = json_encode($datos);

            // Imprime el JSON como respuesta
            echo $jsonDatos;

        } else {
            // Maneja el error en caso de que la consulta falle
            echo "Error en la consulta: " . $mysqli->error;
        }
    }

    function getColeccion(){
        global $mysqli;

        $id_usuario = $_GET['id'];

        // Guarda la consulta en una variable
        $consulta = "SELECT u.nombre_usuario, u.email FROM usuarios u WHERE u.id = $id_usuario";

        // Envia la consulta y guarda el resultado
        $resulConsulta = $mysqli->query($consulta);

        if($resulConsulta)
        {
            // Guarda el resultado en Rows
            $rowConsulta = $resulConsulta->fetch_assoc();
        
            // Obtener los datos de los resultados
            $id = $rowConsulta['id'];
            $nombre = $rowConsulta['nombre_pokemon'];
            $imagen = $rowConsulta['url_imagen'];

            // Crear el array con los datos del perfil
            $datos = array(
                'id' => $id,
                'nombre_pokemon' => $nombre,
                'url_imagen' => $imagen
            );

            // Convertir los datos a JSON
            $jsonDatos = json_encode($datos);

            // Imprime el JSON como respuesta
            echo $jsonDatos;

        } else {
            // Maneja el error en caso de que la consulta falle
            echo "Error en la consulta: " . $mysqli->error;
        }
    }
?>
