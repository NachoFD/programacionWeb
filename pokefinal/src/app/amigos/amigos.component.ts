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
  nombreUsuario: any;
  busqueda: any[] = [];
  amigos: any[] = [];

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
    this.httpClient.get(`http://localhost/programacionweb/backend/api.php?accion=amigos&id=${idUsuario}`).subscribe((usuario: any) => {
      this.amigos = usuario;
    });;

  }

  buscarUsuario(event: any) {
    event.preventDefault();

    this.httpClient.get(`http://localhost/programacionweb/backend/api.php?accion=usuario&usuario=${this.nombreUsuario}`).subscribe((usuario: any) => {
      this.busqueda = usuario;
    });;

  }  
}
