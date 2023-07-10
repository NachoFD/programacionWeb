import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-regalos',
  templateUrl: './regalos.component.html',
  styleUrls: ['./regalos.component.css']
})
export class RegalosComponent {
  hayRegalos = false;
  regalos: any[] = []

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private dataService: ApiService, private router: Router) {}

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

  aceptar(id: any){
    console.log(id)
  }

  rechazar(id: any){
    console.log(id)
  }
}
