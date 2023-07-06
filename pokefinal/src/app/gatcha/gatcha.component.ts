import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-gatcha',
  templateUrl: './gatcha.component.html',
  styleUrls: ['./gatcha.component.css']
})
export class GatchaComponent {

  constructor(private dataService: ApiService, private router: Router) { }

  ngOnInit() {
    // Verificar si el usuario está logeado al cargar el componente
    if (!this.dataService.isLoggedIn()) {
      this.router.navigate(['/login']); // Redireccionar al componente de inicio de sesión
    }
  }
}
