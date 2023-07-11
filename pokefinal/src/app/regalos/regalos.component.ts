import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-regalos',
  templateUrl: './regalos.component.html',
  styleUrls: ['./regalos.component.css']
})
export class RegalosComponent {
  hayRegalos = false;
  regalos: any[] = []

  constructor(private httpClient: HttpClient, private dataService: ApiService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {
    // Verificar si el usuario está logeado al cargar el componente
    if (!this.dataService.isLoggedIn()) {
      this.router.navigate(['/login']); // Redireccionar al componente de inicio de sesión
    }

    const idUsuario = this.dataService.getId(); // Obtener el ID del usuario desde el almacenamiento local

    this.buscarRegalos(idUsuario)
  }

  buscarRegalos(id: any){
    this.httpClient.get(`http://localhost/programacionweb/backend/api.php?accion=regalos&id=${id}`).subscribe((regalo: any) => {
      this.regalos = regalo;
      
      if(this.regalos[0] != null){
        this.hayRegalos = true;
      }
    });;
  }

  aceptar(id_regalo: any, id_pokemon: any){
    const idUsuario = this.dataService.getId();

    console.log("Regalo ID: ", id_regalo, " - Pokemon ID: ", id_pokemon)
      
    const body = {
      id_regalo: id_regalo,
      id_usuario: idUsuario,
      id_pokemon: id_pokemon
    };
    
    this.httpClient.post<any>('http://localhost/programacionweb/backend/api.php?accion=aceptarRegalo', body)
      .subscribe(
        data => {
          console.log(data); // Hacer algo con la respuesta si es necesario
          
          this.snackBar.open('Se acepto el regalo!', 'Cerrar', {
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

  rechazar(id_regalo: any, id_pokemon: any, id_userRegalo: any){
    const confirmacion = window.confirm('¿Estás seguro de rechazar este regalo?');
    
    if (confirmacion) {
      const body = {
        id_usuario: id_userRegalo,
        id_regalo: id_regalo,
        id_pokemon: id_pokemon
      };
    
      this.httpClient.post<any>('http://localhost/programacionweb/backend/api.php?accion=regalo', body)
      .subscribe(
        data => {
          console.log(data); // Hacer algo con la respuesta si es necesario
          
          this.snackBar.open('Se rechazo el regalo!', 'Cerrar', {
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
