import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  nombreUsuario: any;
  emailUsuario: any;
  cantAmigos: any;
  cantPokemones: any;

  constructor(private dataService: ApiService, private router: Router, private httpClient : HttpClient) { }

  ngOnInit() {
    // Verificar si el usuario está logeado al cargar el componente
    if (!this.dataService.isLoggedIn()) {
      this.router.navigate(['/login']); // Redireccionar al componente de inicio de sesión
    }

    const idUsuario = this.dataService.getId(); // Obtener el ID del usuario desde el almacenamiento local

    this.getPerfil(idUsuario).subscribe((perfil: any) => {
      this.nombreUsuario = perfil.nombre_usuario;
      this.emailUsuario = perfil.email;
      this.cantAmigos = perfil.amigos;
      this.cantPokemones = perfil.pokemones;
    });
  }

  public getPerfil(id: any) {
    return this.httpClient.get(`http://localhost/programacionweb/backend/api.php?accion=perfil&id=${id}`);
  }  

  logout(){
    this.dataService.deleteToken();
    window.location.href = "/info";
  }
}
