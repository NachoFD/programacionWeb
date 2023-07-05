CREATE DATABASE PokeBase;

USE PokeBase;

CREATE TABLE pokemon (
  id INT PRIMARY KEY,
  nombre_pokemon VARCHAR(120)
);

INSERT INTO pokemon (id, nombre_pokemon) VALUES
(1, 'Bulbasaur'),
(2, 'Charmander'),
(3, 'Squirtle'),
(4, 'Pikachu'),
(5, 'Jigglypuff'),
(6, 'Meowth'),
(7, 'Snorlax'),
(8, 'Gyarados'),
(9, 'Eevee'),
(10, 'Dragonite');

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

CREATE TABLE gachapon (
  id_usuario int,
  tiempo time
);

