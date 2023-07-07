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

CREATE TABLE usuarios (
  id INT PRIMARY KEY auto_increment,
  nombre_usuario VARCHAR(30),
  email VARCHAR(250),
  contraseña VARCHAR(30)
);

CREATE TABLE registro (
  id INT PRIMARY KEY,
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

