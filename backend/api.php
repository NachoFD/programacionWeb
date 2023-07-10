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
        $id_usuario = $_GET['id'];

        // Guarda la consulta en una variable
        $consulta = "SELECT * FROM usuarios WHERE nombre_usuario = '$nombre_usuario' AND id != $id_usuario;";

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
            SELECT *
            FROM amigos a
            JOIN usuarios u1 ON a.id_amigo = u1.id
            WHERE a.id_usuario = $id_usuario
            UNION
            SELECT *
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
    
    function postAmigo() {
        global $mysqli;
      
        $data = json_decode(file_get_contents('php://input'), true); // Obtener los datos del cuerpo de la solicitud POST
      
        $id_usuario = $data['id'];
        $id_amigo = $data['usuario'];
      
        // Guarda la consulta en una variable
        $consulta = "INSERT INTO amigos (id_usuario, id_amigo) VALUES ($id_usuario, $id_amigo)";
      
        // Envia la consulta y guarda el resultado
        $resulConsulta = $mysqli->query($consulta);
      
        if ($resulConsulta) {
          // Imprime el JSON como respuesta
          echo json_encode('Agregado correctamente!');
        } else {
          // Maneja el error en caso de que la consulta falle
          echo "Error en la consulta: " . $mysqli->error;
        }
    }
    
    function deleteAmigo(){
        global $mysqli;
    
        $idUsuario = $_GET['id'];
        $idAmigo = $_GET['id_amigo'];
    
        // Guarda la consulta en una variable
        $consulta = "DELETE FROM amigos
            WHERE (id_usuario = $idUsuario AND id_amigo = $idAmigo)
            OR (id_usuario = $idAmigo AND id_amigo = $idUsuario);";
    
        // Envia la consulta y guarda el resultado
        $resulConsulta = $mysqli->query($consulta);
    
        if($resulConsulta)
        {
            // Imprime el JSON como respuesta
            echo json_encode('Amigo eliminado correctamente!');
    
        } else {
            // Maneja el error en caso de que la consulta falle
            echo "Error en la consulta: " . $mysqli->error;
        }
    }

    function getRegalos(){
        global $mysqli;
    
        $id_usuario = $_GET['id'];
    
        // Guarda la consulta en una variable
        $consulta = "SELECT u.nombre_usuario, p.url_imagen, r.fecha, r.id FROM regalos r JOIN usuarios u ON r.id_usuario = u.id JOIN pokemon p ON r.id_pokemon = p.id WHERE r.id_destino = $id_usuario";
    
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

    function postRegalo(){
        global $mysqli;
      
        $data = json_decode(file_get_contents('php://input'), true); // Obtener los datos del cuerpo de la solicitud POST
      
        $id_usuario = $data['id_usuario'];
        $id_destino = $data['id_destino'];
        $id_pokemon = $data['id_pokemon'];
      
        // Guarda la consulta en una variable
        $consulta = "INSERT INTO regalos (id_usuario, id_destino, id_pokemon, fecha)
        VALUES ($id_usuario, $id_destino, $id_pokemon, CURDATE())";
      
        // Envia la consulta y guarda el resultado
        $resulConsulta = $mysqli->query($consulta);
      
        if ($resulConsulta) {
          // Imprime el JSON como respuesta

          // Elimina el pokemon del registro
          $eliminar = "DELETE FROM registro
          WHERE id = (
              SELECT id
              FROM registro
              WHERE id_usuario = $id_usuario AND id_pokemon = $id_pokemon
              LIMIT 1
          );";

          $mysqli->query($eliminar);

          echo json_encode('Se envio el regalo correctamente!');
        } else {
          // Maneja el error en caso de que la consulta falle
          echo "Error en la consulta: " . $mysqli->error;
        }
    }

    function postAceptarRegalo(){
        global $mysqli;
      
        $data = json_decode(file_get_contents('php://input'), true); // Obtener los datos del cuerpo de la solicitud POST
      
        $id_usuario = $data['id_usuario'];
        $id_destino = $data['id_destino'];
        $id_pokemon = $data['id_pokemon'];
      
        // Guarda la consulta en una variable
        $consulta = "INSERT INTO regalos (id_usuario, id_destino, id_pokemon, fecha)
        VALUES ($id_usuario, $id_destino, $id_pokemon, CURDATE())";
      
        // Envia la consulta y guarda el resultado
        $resulConsulta = $mysqli->query($consulta);
      
        if ($resulConsulta) {
          // Imprime el JSON como respuesta

          // Elimina el pokemon del registro
          $eliminar = "DELETE FROM registro
          WHERE id = (
              SELECT id
              FROM registro
              WHERE id_usuario = $id_usuario AND id_pokemon = $id_pokemon
              LIMIT 1
          );";

          $mysqli->query($eliminar);

          echo json_encode('Se envio el regalo correctamente!');
        } else {
          // Maneja el error en caso de que la consulta falle
          echo "Error en la consulta: " . $mysqli->error;
        }
    }

    function getPokemonesRepetidos(){
        global $mysqli;

        $id_usuario = $_GET['id'];

        // Guarda la consulta en una variable
        $consulta = "SELECT r.id_pokemon, p.url_imagen, COUNT(*) AS cantidad_repeticiones
        FROM registro r
        JOIN pokemon p ON r.id_pokemon = p.id
        WHERE r.id_usuario = $id_usuario AND r.id_pokemon IN (
            SELECT id_pokemon
            FROM registro
            WHERE id_usuario = $id_usuario
            GROUP BY id_pokemon
            HAVING COUNT(*) > 1
        )
        GROUP BY r.id_pokemon;";

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

    function random(){

        return rand(1, 25);

    }

    function postGachapon(){

        global $mysqli;

        $data = json_decode(file_get_contents('php://input'), true);

        $id_user = $data['id'];
        
        $id_pokemon = random();

        $consulta = "INSERT INTO registro (id_usuario, id_pokemon) VALUES ($id_user, $id_pokemon)";
        
        $resulConsulta = $mysqli->query($consulta);

        if ($resulConsulta) {
          // Imprime el JSON como respuesta
          echo json_encode($id_pokemon);
        } else {
          // Maneja el error en caso de que la consulta falle
          echo "Error en la consulta: " . $mysqli->error;
        }


    }
?>
