import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  id: any;
  nombre: any;
  dato: any;
  altura: any;
  categoria: any;
  peso: any;
  habilidad: any;
  url_imagen: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const pokemonId = params.get('id');
      this.getPokemonData(pokemonId);
    });
  }

  getPokemonData(pokemonId: any) {
    this.http
      .get<any>(`http://localhost/programacionweb/backend/api.php?accion=pokemon_datos&id=${pokemonId}`)
      .subscribe(data => {
        this.id = data[0].id;
        this.nombre = data[0].nombre_pokemon;
        this.dato = data[0].dato;
        this.altura = data[0].altura;
        this.categoria = data[0].categoria;
        this.peso = data[0].peso;
        this.habilidad = data[0].habilidad;
        this.url_imagen = data[0].url_imagen;
      });
  }
}

