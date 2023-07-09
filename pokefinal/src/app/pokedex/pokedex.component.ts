import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent {
  coleccion: any[] = [];
  pokemones: any[] = [];

  constructor(private dataService: ApiService, private router: Router, private httpClient : HttpClient) { }

  ngOnInit() {
    // Verificar si el usuario está logeado al cargar el componente
    if (!this.dataService.isLoggedIn()) {
      this.router.navigate(['/login']); // Redireccionar al componente de inicio de sesión
    }

    const idUsuario = this.dataService.getId(); // Obtener el ID del usuario desde el almacenamiento local
  
    this.getColeccion(idUsuario).subscribe((pokemon: any) => {
      this.coleccion = pokemon;
    });

    this.getPokemones(idUsuario).subscribe((pokemon: any) => {
      this.pokemones = pokemon;
    });
  }


  public getColeccion(id: any) {
    return this.httpClient.get(`http://localhost/programacionweb/backend/api.php?accion=coleccion&id=${id}`);
  }

  public getPokemones(id: any) {
    return this.httpClient.get(`http://localhost/programacionweb/backend/api.php?accion=pokemones&id=${id}`);
  }

  public getPokemon(id: any){
    console.log(id)

    this.router.navigate(['/pokemon', id]); // Redireccionar al componente de pokemon para mostrar el pokemon junto con sus datos
  }
  
}
