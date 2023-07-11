import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gatcha',
  templateUrl: './gatcha.component.html',
  styleUrls: ['./gatcha.component.css']
})

export class GatchaComponent {
  pokemon: any = null;
  hayPokemon:Boolean = false;
  tiempoActual: Date = new Date();
  permiso: Boolean = true;

  constructor(private dataService: ApiService, private router: Router, private httpClient : HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit() {
    // Verificar si el usuario está logeado al cargar el componente
    if (!this.dataService.isLoggedIn()) {
      this.router.navigate(['/login']); // Redireccionar al componente de inicio de sesión
    }

    this.getTiempo()
  }

  botonGacha() {

    const idUsuario = this.dataService.getId(); // Obtener el ID del usuario desde el almacenamiento local
  
    const body = {
      id: idUsuario
    };

    if(this.permiso){

      this.httpClient.post<any>('http://localhost/programacionweb/backend/api.php?accion=Gachapon', body)
      .subscribe(
        data => {
          this.pokemon = data.url_imagen; // Hacer algo con la respuesta si es necesario
          this.hayPokemon = true;
        },
        error => {
          console.error(error); // Manejar el error en caso de fallo en la solicitud
        }
      );
    }
    else
    {
      this.snackBar.open('Ya has abierto la pokebola el dia de hoy!', 'Cerrar', {
        duration: 4000, // Duración en milisegundos
        horizontalPosition: 'center', // Posición horizontal del mensaje
        verticalPosition: 'top' // Posición vertical del mensaje
      })
    }
  
  }

  getTiempo() {
    const idUsuario = this.dataService.getId();
  
    this.httpClient.get(`http://localhost/programacionweb/backend/api.php?accion=tiempo&id=${idUsuario}`)
      .subscribe((usuario: any) => {
        if (usuario.length > 0 && usuario[0].tiempo) {
          const gachapon = new Date(usuario[0].tiempo);
  
          console.log(gachapon);
          console.log(this.tiempoActual);
  
          if (gachapon <= this.tiempoActual) {
            this.permiso = true;
          } else {
            this.permiso = false;
          }
        }
      });
  }  

  // DESPUES DE OBTENER AL POKEMON SE MOSTRAR AL POKEMON JUNTO CON UN BOTON PARA IR AL INICIO
  volver(){
    this.router.navigate(['/inicio']);
  }
  
}
