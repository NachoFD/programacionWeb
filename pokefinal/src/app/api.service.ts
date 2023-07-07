import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from './usuarios';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  redirectUrl: string | undefined;
  baseUrl:string = "http://localhost/programacionweb/backend";
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient : HttpClient) { }
  
  public userlogin(username: any, password: any) {
    // alert(username)
  
    return this.httpClient.post<any>(this.baseUrl + '/login.php', { username, password })
      .pipe(map(Users => {
  
        this.setToken(Users[0].nombre_usuario, Users[0].id);
        this.getLoggedInName.emit(true);
        return Users;
      }));
}

public userregistration(name: any,email: any, pwd: any) {
  return this.httpClient.post<any>(this.baseUrl + '/register.php', { name,email, pwd })
    .pipe(map(Users => {
      return Users;
    }));
}


//token
setToken(token: string, id: string) {
  localStorage.setItem('token', token);
  localStorage.setItem('id', id);
}

getToken() {
  return localStorage.getItem('token');
}

getId() {
  return localStorage.getItem('id');
}

deleteToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
}

isLoggedIn() {
  const usertoken = this.getToken();
  
  if (usertoken != null) {
    return true
  }
  
  return false;
}
}