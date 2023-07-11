import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    title(title: any) {
      throw new Error('Method not implemented.');
    }
    loginbtn:boolean;
    logoutbtn:boolean;
    admin = false;

    constructor(private dataService: ApiService, private httpClient: HttpClient) {
    dataService.getLoggedInName.subscribe(name => this.changeName(name));
    
        if(this.dataService.isLoggedIn())
        {
            this.loginbtn=false;
            this.logoutbtn=true

            // OBTENER SI EL USUARIO ES ADMIN
            const idUsuario = this.dataService.getId(); // Obtener el ID del usuario desde el almacenamiento local
            this.getAdmin(idUsuario)
        }
        else
        {
            this.loginbtn=true;
            this.logoutbtn=false
        }
    }   

    private changeName(name: boolean): void {
        this.logoutbtn = name;
        this.loginbtn = !name;
    }

    logout(){
        this.dataService.deleteToken();
        window.location.href = "/info";
    }

    getAdmin(id: any){
        this.httpClient.get(`http://localhost/programacionweb/backend/api.php?accion=admin&id=${id}`).subscribe((usuario: any) => {
          console.log(usuario)
          if(usuario != null){
            if(usuario[0].administrador == true){
                this.admin = true;
            }
          }
        });
    }
}   
