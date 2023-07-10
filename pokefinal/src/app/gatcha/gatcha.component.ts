import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gatcha',
  templateUrl: './gatcha.component.html',
  styleUrls: ['./gatcha.component.css']
})

export class GatchaComponent {

  constructor(private dataService: ApiService, private router: Router, private httpClient : HttpClient) { }

  ngOnInit() {
    // Verificar si el usuario está logeado al cargar el componente
    if (!this.dataService.isLoggedIn()) {
      this.router.navigate(['/login']); // Redireccionar al componente de inicio de sesión
    }
    const idUsuario = this.dataService.getId(); // Obtener el ID del usuario desde el almacenamiento local

  }

  botonGacha() {

    const idUsuario = this.dataService.getId(); // Obtener el ID del usuario desde el almacenamiento local
  
    const body = {
      id: idUsuario
    };
  
    this.httpClient.post<any>('http://localhost/programacionweb/backend/api.php?accion=Gachapon', body)
    .subscribe(
      data => {
        console.log(data); // Hacer algo con la respuesta si es necesario
      },
      error => {
        console.error(error); // Manejar el error en caso de fallo en la solicitud
      }
    );
  }

  // DESPUES DE OBTENER AL POKEMON SE MOSTRAR AL POKEMON JUNTO CON UN BOTON PARA IR AL INICIO
  // this.router.navigate(['/inicio']);
  
}
