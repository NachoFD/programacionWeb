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
        $consulta = "SELECT * FROM pokemon WHERE id NOT IN (SELECT id_pokemon FROM registro WHERE id_usuario = $id_usuario);";

        // Envia la consulta y guarda el resultado
        $resulConsulta = $mysqli->query($consulta);

        if($resulConsulta)
        {
            // Guarda el resultado en Rows
            $rows = array();

            while ($rowConsulta = $resulConsulta->fetch_assoc()) {
                $rows[] = $rowConsulta;
            }

            // Imprime el JSON como respuesta
            echo json_encode($rows);

        } else {
            // Maneja el error en caso de que la consulta falle
            echo "Error en la consulta: " . $mysqli->error;
        }
    }

    function getColeccion(){
        global $mysqli;

        $id_usuario = $_GET['id'];

        // Guarda la consulta en una variable
        $consulta = "SELECT p.* FROM pokemon p JOIN registro r ON p.id = r.id_pokemon WHERE r.id_usuario = $id_usuario;";

        // Envia la consulta y guarda el resultado
        $resulConsulta = $mysqli->query($consulta);

        if($resulConsulta)
        {
            // Guarda el resultado en Rows
            $rows = array();

        while ($rowConsulta = $resulConsulta->fetch_assoc()) {
            $rows[] = $rowConsulta;
        }

            // Imprime el JSON como respuesta
            echo json_encode($rows);

        } else {
            // Maneja el error en caso de que la consulta falle
            echo "Error en la consulta: " . $mysqli->error;
        }
    }

    function getPokemon_datos(){
        global $mysqli;

        $id_pokemon = $_GET['id'];

        // Guarda la consulta en una variable
        $consulta = "SELECT p.*, p.nombre_pokemon, pd.dato, pd.altura, pd.categoria, pd.peso, pd.habilidad, pd.tipo FROM pokemon p JOIN pokemon_datos pd ON p.id = pd.id_pokemon WHERE p.id = $id_pokemon;";

        // Envia la consulta y guarda el resultado
        $resulConsulta = $mysqli->query($consulta);

        if($resulConsulta)
        {
            // Guarda el resultado en Rows
            $rows = array();

        while ($rowConsulta = $resulConsulta->fetch_assoc()) {
            $rows[] = $rowConsulta;
        }

            // Imprime el JSON como respuesta
            echo json_encode($rows);

        } else {
            // Maneja el error en caso de que la consulta falle
            echo "Error en la consulta: " . $mysqli->error;
        }
    }

    function getUsuario(){
        global $mysqli;

        $nombre_usuario = $_GET['usuario'];

        // Guarda la consulta en una variable
        $consulta = "SELECT nombre_usuario FROM usuarios WHERE nombre_usuario = '$nombre_usuario';";

        // Envia la consulta y guarda el resultado
        $resulConsulta = $mysqli->query($consulta);

        if($resulConsulta)
        {
            // Guarda el resultado en Rows
            $rows = array();

        while ($rowConsulta = $resulConsulta->fetch_assoc()) {
            $rows[] = $rowConsulta;
        }

            // Imprime el JSON como respuesta
            echo json_encode($rows);

        } else {
            // Maneja el error en caso de que la consulta falle
            echo "Error en la consulta: " . $mysqli->error;
        }
    }

    function getAmigos(){
        global $mysqli;
    
        $id_usuario = $_GET['id'];
    
        // Guarda la consulta en una variable
        $consulta = "
            SELECT u1.nombre_usuario AS nombre_amigo
            FROM amigos a
            JOIN usuarios u1 ON a.id_amigo = u1.id
            WHERE a.id_usuario = $id_usuario
            UNION
            SELECT u2.nombre_usuario AS nombre_usuario
            FROM amigos a
            JOIN usuarios u2 ON a.id_usuario = u2.id
            WHERE a.id_amigo = $id_usuario";
    
        // Envia la consulta y guarda el resultado
        $resulConsulta = $mysqli->query($consulta);
    
        if($resulConsulta)
        {
            // Guarda el resultado en Rows
            $rows = array();
    
            while ($rowConsulta = $resulConsulta->fetch_assoc()) {
                $rows[] = $rowConsulta;
            }
    
            // Imprime el JSON como respuesta
            echo json_encode($rows);
    
        } else {
            // Maneja el error en caso de que la consulta falle
            echo "Error en la consulta: " . $mysqli->error;
        }
    }

    function getRepetido(){
        global $mysqli;
    
        $name = $_GET['usuario'];
    
        // Guarda la consulta en una variable
        $consulta = "
            SELECT *
            FROM usuarios 
            WHERE nombre_usuario = '$name'";
    
        // Envia la consulta y guarda el resultado
        $resulConsulta = $mysqli->query($consulta);
    
        if($resulConsulta)
        {
            // Guarda el resultado en Rows
            $rows = array();
    
            while ($rowConsulta = $resulConsulta->fetch_assoc()) {
                $rows[] = $rowConsulta;
            }
    
            if ($rows == null) {
                $response = array("repetido" => false); // Crea el objeto JSON con 'repetido' en 'false'
            } else {
                $response = array("repetido" => true); // Crea el objeto JSON con 'repetido' en 'true'
            }

            // Imprime el JSON como respuesta
            echo json_encode($response);
    
        } else {
            // Maneja el error en caso de que la consulta falle
            echo "Error en la consulta: " . $mysqli->error;
        }
    }    
    
?>
