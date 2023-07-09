CREATE DATABASE PokeBase;

USE PokeBase;

CREATE TABLE pokemon (
  id INT PRIMARY KEY,
  nombre_pokemon VARCHAR(120),
  url_imagen VARCHAR(355)
);

INSERT INTO pokemon (id, nombre_pokemon, url_imagen) VALUES
(1, 'Bulbasaur', 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png'),
(2, 'Charmander', 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png'),
(3, 'Squirtle', 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png'),
(4, 'Caterpie', 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/010.png'),
(5, 'Weedle', 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/013.png'),
(6, 'Pidgey', 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/016.png'),
(7, 'Rattata', 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/019.png'),
(8, 'Spearow', 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/021.png'),
(9, 'Ekans', 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/023.png'),
(10, 'Pikachu', 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png'),
(11, 'Sandshrew', 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/027.png'),
(12, 'Nidoran hembra', 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/029.png'),
(13, 'Nidoran macho', 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/032.png'),
(14, 'Clefairy', 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/035.png'),
(15, 'Vulpix', 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/037.png'),
(16, 'Jigglypuff', 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/039.png'),
(17, 'Zubat', 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/041.png'),
(18, 'Oddish', 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/043.png'),
(19, 'Paras', 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/046.png'),
(20, 'Venonat', 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/048.png'),
(21, 'Diglett', 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/050.png'),
(22, 'Meowth', 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/052.png'),
(23, 'Psyduck', 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/054.png'),
(24, 'Mankey', 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/056.png'),
(25, 'Growlithe', 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/058.png');

CREATE TABLE pokemon_datos (
  id_pokemon INT PRIMARY KEY,
  nombre VARCHAR(120),
  url_imagen VARCHAR(355),
  dato varchar(355),
  altura varchar(20),
  categoria varchar(30),
  peso varchar(20),
  habilidad varchar(60),
  tipo varchar(60)
);

INSERT INTO pokemon_datos (id_pokemon, dato, altura, categoria, peso, habilidad, tipo) VALUES
(1, 'Este pokemon nacio con una semilla en el lomo, que brota con el paso del tiempo. Se alimenta de los nutrientes de su semilla.', '0.7m', 'Semilla', '6,9 kg', 'Espesura', 'Planta'),
(2, 'Prefiere las cosas calientes. Dicen que cuando llueve le sale vapor de la punta de la cola. Si se le apagara, fallecería.', '0.6m', 'Lagartija', '8,5 kg', 'Mar Llamas', 'Fuego'),
(3, 'Cuando retrae su largo cuello en el caparazón, dispara agua a una presión increíble.', '0,5m', 'Tortuguita', '9,0 kg', 'Torrente', 'Agua'),
(4, 'Para protegerse, despide un hedor horrible por las antenas con el que repele a sus enemigos.', '0.3m', 'Gusano', '2,9 kg', 'Polvo Escudo', 'Bicho'),
(5, 'El aguijón de la cabeza es muy puntiagudo. Se alimenta de hojas oculto en la espesura de bosques y praderas.', '0.3m', 'Oruga', '3,2 kg', 'Polvo Escudo', 'Bicho'),
(6, 'Su docilidad es tal que suelen defenderse levantando arena en lugar de contraatacar.', '0.3m', 'Pajarito', '1,8 kg', 'Vista Lince', 'Volador'),
(7, 'Es propenso a hincar los incisivos en cualquier cosa que se le ponga por delante. Si se ve alguno, seguramente haya cuarenta cerca.', '0.3m', 'Raton', '3,5 kg', 'Fuga', 'Normal'),
(8, 'A la hora de proteger su territorio, compensa su incapacidad para volar a gran altura con una increíble velocidad.', '0.3m', 'Pajarito', '2,0 kg', 'Vista Lince', 'Volador'),
(9, 'La longitud de este Pokémon aumenta con el tiempo. Por la noche, se enrosca en las ramas de los árboles para descansar.', '2.0m', 'Serpiente', '0,9 kg', 'Mudar', 'Veneno'),
(10, 'Cuando se enfada, este Pokémon descarga la energía que almacena en el interior de las bolsas de las mejillas.', '0.4m', 'Raton', '6,0 kg', 'Elec. Estatica', 'Electrico'),
(11, 'Le gusta revolcarse por la arena seca para eliminar todo rastro de suciedad y humedad en la piel.', '0.6m', 'Raton', '12,0 kg', 'Velo Arena', 'Tierra'),
(12, 'Posee un olfato más fino que los Nidoran ♂. Usa los bigotes para percibir la dirección del viento y buscar comida a sotavento de sus depredadores.', '0.4m', 'Pin Veneno', '7,0 kg', 'Punto Toxico', 'Veneno'),
(13, 'Mantiene sus grandes orejas levantadas, siempre alerta. Si advierte peligro, ataca inoculando una potente toxina con su cuerno frontal.', '0.5m', 'Pin Veneno', '9,0 kg', 'Punto Toxico', 'Veneno'),
(14, 'Se dice que la felicidad llegará a quien vea un grupo de Clefairy bailando a la luz de la luna llena.', '0.6m', 'Hada', '7,5 kg', 'Gran Encanto', 'Hada'),
(15, 'De pequeño, tiene seis colas de gran belleza. A medida que crece, le van saliendo más.', '0.6m', 'Zorro', '9,9 kg', 'Absorbe Fuego', 'Fuego'),
(16, 'Cuando le tiemblan sus redondos y adorables ojos, entona una melodía agradable y misteriosa con la que duerme a sus enemigos.', '0.5m', 'Globo', '5,5 kg', 'Gran Encanto', 'Hada'),
(17, 'Emite ondas ultrasónicas por la boca para escrutar el entorno, lo que le permite volar con pericia por cuevas angostas.', '0.8m', 'Murcielago', '7,5 kg', 'Fuerza Mental', 'Veneno'),
(18, 'Se mueve al exponerse a la luz de la luna. Merodea por la noche para esparcir sus semillas.', '0.5m', 'Hierbajo', '5,4 kg', 'Clorofila', 'Planta'),
(19, 'Escarba en el suelo para extraer nutrientes de las raíces de los árboles, que las setas del lomo absorben después casi por completo.', '0.3m', 'Hongo', '5,4 kg', 'Efecto Espora', 'Bicho'),
(20, 'Rezuma veneno por todo su cuerpo. De noche, atrapa y come pequeños Pokémon insecto atraídos por la luz.', '1.0m', 'Insecto', '30,0 kg', 'Ojo Compuesto', 'Bicho'),
(21, 'Vive 1 m por debajo del suelo, donde se alimenta de raíces. A veces también aparece en la superficie.', '0.2m', 'Topo', '0,8 kg', 'Velo Arena', 'Tierra'),
(22, 'Durante el día, se dedica a dormir. De noche, vigila su territorio con un brillo en los ojos.', '0.4m', 'Gato Araña', '4,2 kg', 'Recogida', 'Normal'),
(23, 'Padece continuamente dolores de cabeza. Cuando son muy fuertes, empieza a usar misteriosos poderes.', '0.8m', 'Pato', '19,6 kg', 'Humedad', 'Agua'),
(24, 'Vive en grupos en las copas de los árboles. Si pierde de vista a su manada, se siente solo y se enfada.', '0.5m', 'Mono Cerdo', '28,0 kg', 'Espiritu Vital', 'Lucha'),
(25, 'De naturaleza valiente y honrada, se enfrenta sin miedo a enemigos más grandes y fuertes.', '0.7m', 'Perrito', '19,0 kg', 'Intimidacion', 'Fuego');

CREATE TABLE usuarios (
  id INT PRIMARY KEY auto_increment,
  nombre_usuario VARCHAR(30),
  email VARCHAR(250),
  contraseña VARCHAR(30)
);

CREATE TABLE registro (
  id INT PRIMARY KEY auto_increment,
  id_usuario int,
  id_pokemon int
);

CREATE TABLE amigos (
  id INT PRIMARY KEY auto_increment,
  id_usuario int,
  id_amigo int
);

CREATE TABLE gachapon (
  id_usuario int,
  tiempo time
);

