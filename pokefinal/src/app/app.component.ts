import { Component } from '@angular/core';
import { ApiService } from './api.service';

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

    constructor(private dataService: ApiService) {
    dataService.getLoggedInName.subscribe(name => this.changeName(name));
    
        if(this.dataService.isLoggedIn())
        {
            this.loginbtn=false;
            this.logoutbtn=true

            // OBTENER SI EL USUARIO ES ADMIN
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
}   
