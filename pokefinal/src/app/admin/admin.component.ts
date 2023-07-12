import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
admin: Boolean = false;

menu: Boolean = true;
pantallaUsuario: Boolean = false;
pantallaPokemon: Boolean = false;

usuarios: any[] = [];
hayUsuarios: Boolean = false;

pokemones: any[] = [];
nuevoPokemon = {
  nombre: '',
  url: '',
  dato: '',
  altura: '',
  categoria: '',
  peso: '',
  habilidad: '',
  tipo: ''
};

  constructor(private dataService: ApiService, private httpClient: HttpClient, private router: Router) {  
      
        if(this.dataService.isLoggedIn())
        {
            // OBTENER SI EL USUARIO ES ADMIN
            const idUsuario = this.dataService.getId(); // Obtener el ID del usuario desde el almacenamiento local
            this.getAdmin(idUsuario)
        }
        else
        {
          this.router.navigate(['/login']);
        }
    }
    
  getAdmin(id: any){
      this.httpClient.get(`https://pokefinal.000webhostapp.com/backend/api.php?accion=admin&id=${id}`).subscribe((usuario: any) => {

        if(usuario != null){
          if(usuario[0].administrador == true){
              this.admin = true;
          }

          if(!this.admin){
            this.router.navigate(['/login']);
          }
      }
    });
  }

  setPantalla(pantalla: any){
    if(pantalla == 0){
      this.pantallaUsuario = true;
      this.menu = false;

      this.getUsuarios()
    }
    else if(pantalla == 1)
    {
      this.pantallaPokemon = true;
      this.menu = false;

      this.getPokemones()
    }
    else
    {
      this.pantallaPokemon = false;
      this.pantallaUsuario = false;
      this.menu = true;
    }
  }

  getUsuarios(){
    const idUsuario = this.dataService.getId(); // Obtener el ID del usuario desde el almacenamiento local
    this.httpClient.get(`https://pokefinal.000webhostapp.com/backend/api.php?accion=allUsuarios&id=${idUsuario}`).subscribe((usuario: any) => {
      this.usuarios = usuario;
      
      if(this.usuarios[0] != null){
        this.hayUsuarios = true
      }
      else
      {
        this.hayUsuarios = false
      }
    });;

  }

  getPokemones(){
    this.httpClient.get(`https://pokefinal.000webhostapp.com/backend/api.php?accion=allPokemones`).subscribe((pokemon: any) => {
      this.pokemones = pokemon;
    });;
  }

  eliminarPokemon(id: any){
    console.log(id)

    const confirmacion = window.confirm('¿Estás seguro de eliminar a este pokemon?');
    
    if (confirmacion) {
      
      this.httpClient.delete<any>(`http://localhost/programacionweb/backend/api.php?accion=pokemon&id=${id}`)
        .subscribe(
          data => {
            console.log(data); // Hacer algo con la respuesta si es necesario
            this.getPokemones();
          },
          error => {
            console.error(error); // Manejar el error en caso de fallo en la solicitud
          }
        );
    }
  }

  eliminarUsuario(id: any){
    console.log(id)

    const confirmacion = window.confirm('¿Estás seguro de eliminar a este usuario?');
    
    if (confirmacion) {
      
      this.httpClient.delete<any>(`https://pokefinal.000webhostapp.com/backend/api.php?accion=usuario&id=${id}`)
        .subscribe(
          data => {
            console.log(data); // Hacer algo con la respuesta si es necesario
            this.getUsuarios()
          },
          error => {
            console.error(error); // Manejar el error en caso de fallo en la solicitud
          }
        );
    }
  }

  postPokemon() {
    this.httpClient.post<any>('https://pokefinal.000webhostapp.com/backend/api.php?accion=pokemon', this.nuevoPokemon)
      .subscribe(
        data => {
          console.log(data); // Hacer algo con la respuesta si es necesario
          // Limpiar los valores del formulario
          this.nuevoPokemon = {
            nombre: '',
            url: '',
            dato: '',
            altura: '',
            categoria: '',
            peso: '',
            habilidad: '',
            tipo: ''
          };
          // Actualizar la lista de pokémones
          this.getPokemones();
        },
        error => {
          console.error(error); // Manejar el error en caso de fallo en la solicitud
        }
      );
  }

  obtenerPokemones(){
    const idUsuario = this.dataService.getId(); // Obtener el ID del usuario desde el almacenamiento local

    console.log("Se obtuvieron todos los pokemones!")

    this.httpClient.get(`https://pokefinal.000webhostapp.com/backend/api.php?accion=pokemonesAdmin&id=${idUsuario}`).subscribe()
  }
}
