import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  styleUrls: ['./amigos.component.css']
})
export class AmigosComponent {
  nombreUsuario: string | undefined;
  busqueda: any[] = [];
  amigos: any[] = [];

  constructor(private dataService: ApiService, private router: Router, private httpClient : HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit() {
    // Verificar si el usuario está logeado al cargar el componente
    if (!this.dataService.isLoggedIn()) {
      this.router.navigate(['/login']); // Redireccionar al componente de inicio de sesión
    }
  }

  buscarUsuario(event: any) {
    event.preventDefault();

    console.log('Buscar usuario:', this.nombreUsuario);

    this.httpClient.get(`http://localhost/programacionweb/backend/api.php?accion=usuario&usuario=${this.nombreUsuario}`).subscribe((usuario: any) => {
      this.busqueda = usuario;
    });;

    if(this.busqueda[0] == null){
      this.snackBar.open('El usuario no existe.', '', {
        duration: 4000, // Duración en milisegundos
        horizontalPosition: 'center', // Posición horizontal del mensaje
        verticalPosition: 'top' // Posición vertical del mensaje
      });
    }
  }  
}
