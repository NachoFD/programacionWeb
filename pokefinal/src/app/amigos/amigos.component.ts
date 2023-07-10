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
  hayAmigos = false;

  constructor(private dataService: ApiService, private router: Router, private httpClient : HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit() {
    // Verificar si el usuario está logeado al cargar el componente
    if (!this.dataService.isLoggedIn()) {
      this.router.navigate(['/login']); // Redireccionar al componente de inicio de sesión
    }

    const idUsuario = this.dataService.getId(); // Obtener el ID del usuario desde el almacenamiento local

    this.buscarAmigos(idUsuario)

    if(this.amigos != null){
      this.hayAmigos = true;
    }
  }

  buscarAmigos(idUsuario: any){
    this.httpClient.get(`http://localhost/programacionweb/backend/api.php?accion=amigos&id=${idUsuario}`).subscribe((usuario: any) => {
      this.amigos = usuario;
    });;

  }

  buscarUsuario(event: any) {
    event.preventDefault();

    const idUsuario = this.dataService.getId(); // Obtener el ID del usuario desde el almacenamiento local

    this.httpClient.get(`http://localhost/programacionweb/backend/api.php?accion=usuario&usuario=${this.nombreUsuario}&id=${idUsuario}`).subscribe((usuario: any) => {
      this.busqueda = usuario;
    });;
  }  

  agregarAmigo(id_amigo: any) {
    console.log(id_amigo);
    
    const idUsuario = this.dataService.getId(); // Obtener el ID del usuario desde el almacenamiento local
  
    const body = {
      usuario: id_amigo,
      id: idUsuario
    };
  
    this.httpClient.post<any>('http://localhost/programacionweb/backend/api.php?accion=amigo', body)
    .subscribe(
      data => {
        console.log(data); // Hacer algo con la respuesta si es necesario
        location.reload(); // Recargar la página
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
      
      this.httpClient.delete<any>(`http://localhost/programacionweb/backend/api.php?accion=amigo&id=${idUsuario}&id_amigo=${id_amigo}`)
        .subscribe(
          data => {
            console.log(data); // Hacer algo con la respuesta si es necesario
            location.reload(); // Recargar la página
          },
          error => {
            console.error(error); // Manejar el error en caso de fallo en la solicitud
          }
        );
    }
  }  
  
  mensaje(id: any){
    console.log("Mensaje: " , id)
  }
  
  regalo(id: any){
    console.log("Regalo: ", id)
  }
}
