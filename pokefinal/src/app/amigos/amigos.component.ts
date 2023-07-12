import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  styleUrls: ['./amigos.component.css']
})
export class AmigosComponent {
  nombreUsuario: any;
  busqueda: any;
  amigos: any[] = [];
  pokemones: any[] = [];
  hayAmigos = false;
  regalo = false;
  id_amigo: any;
  noEncontro: boolean = false;

  constructor(private dataService: ApiService, private router: Router, private httpClient : HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit() {
    // Verificar si el usuario está logeado al cargar el componente
    if (!this.dataService.isLoggedIn()) {
      this.router.navigate(['/login']); // Redireccionar al componente de inicio de sesión
    }

    const idUsuario = this.dataService.getId(); // Obtener el ID del usuario desde el almacenamiento local

    this.buscarAmigos(idUsuario)
  }

  buscarAmigos(idUsuario: any){
    this.httpClient.get(`https://pokefinal.000webhostapp.com/backend/api.php?accion=amigos&id=${idUsuario}`).subscribe((usuario: any) => {
      this.amigos = usuario;
      
      if(this.amigos[0] != null){
        this.hayAmigos = true;
      }
    });;
  }

  buscarUsuario(event: any) {
    event.preventDefault();

    const idUsuario = this.dataService.getId(); // Obtener el ID del usuario desde el almacenamiento local

    this.httpClient.get(`https://pokefinal.000webhostapp.com/backend/api.php?accion=usuario&usuario=${this.nombreUsuario}&id=${idUsuario}`).subscribe((usuario: any) => {
      this.busqueda = usuario;
      
      if(this.busqueda[0] == null){
        this.noEncontro = true;
      }
      else
      {
        this.noEncontro = false;
      }
    });;

  }  

  agregarAmigo(id_amigo: any) {
    console.log(id_amigo);
    
    const idUsuario = this.dataService.getId(); // Obtener el ID del usuario desde el almacenamiento local
  
    const body = {
      usuario: id_amigo,
      id: idUsuario
    };
  
    this.httpClient.post<any>('https://pokefinal.000webhostapp.com/backend/api.php?accion=amigo', body)
    .subscribe(
      data => {
        console.log(data); // Hacer algo con la respuesta si es necesario

        this.buscarAmigos(idUsuario)
      },
      error => {
        console.error(error); // Manejar el error en caso de fallo en la solicitud
      }
    );
  }

  eliminarAmigo(id_amigo: any) {
    const confirmacion = window.confirm('¿Estás seguro de eliminar a este amigo?');
    
    if (confirmacion) {
      const idUsuario = this.dataService.getId();
      
      this.httpClient.delete<any>(`https://pokefinal.000webhostapp.com/backend/api.php?accion=amigo&id=${idUsuario}&id_amigo=${id_amigo}`)
        .subscribe(
          data => {
            console.log(data); // Hacer algo con la respuesta si es necesario

            this.buscarAmigos(idUsuario)          
          },
          error => {
            console.error(error); // Manejar el error en caso de fallo en la solicitud
          }
        );
    }
  }  
  
  regalar(id_amigo: any){
    console.log("Amigo: ", id_amigo)
    this.id_amigo = id_amigo
    const idUsuario = this.dataService.getId(); // Obtener el ID del usuario desde el almacenamiento local

    this.regalo = true;
    this.buscarPokemonesRepetidos()
  }

  buscarPokemonesRepetidos(){
    const idUsuario = this.dataService.getId(); // Obtener el ID del usuario desde el almacenamiento local

    this.httpClient.get(`https://pokefinal.000webhostapp.com/backend/api.php?accion=pokemonesRepetidos&id=${idUsuario}`).subscribe((pokemon: any) => {
      this.pokemones = pokemon;
    });;
  }

  enviarRegalo(id_pokemon: any){
    console.log("Pokemon:" , id_pokemon)

    const confirmacion = window.confirm('¿Estás seguro de enviar este regalo?');
    
    if (confirmacion) {
      const idUsuario = this.dataService.getId();
      
      const body = {
        id_usuario: idUsuario,
        id_destino: this.id_amigo,
        id_pokemon: id_pokemon
      };
    
      this.httpClient.post<any>('https://pokefinal.000webhostapp.com/backend/api.php?accion=regalo', body)
      .subscribe(
        data => {
          console.log(data); // Hacer algo con la respuesta si es necesario
          
          this.snackBar.open('Se envio el regalo!', 'Cerrar', {
            duration: 4000, // Duración en milisegundos
            horizontalPosition: 'center', // Posición horizontal del mensaje
            verticalPosition: 'top' // Posición vertical del mensaje
          }).afterDismissed().subscribe(() => {
            location.reload(); // Recargar la página después de que se cierre el SnackBar
          });
        },
        error => {
          console.error(error); // Manejar el error en caso de fallo en la solicitud
        }
      );
    }
  }
}
