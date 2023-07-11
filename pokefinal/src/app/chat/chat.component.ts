import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface Message {
  usuario: string;
  contenido: string;
  fecha_envio: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  usuario: any;
  contenido: string = '';

  constructor(private dataService: ApiService, private router: Router, private http : HttpClient) { }

  ngOnInit() {
    this.loadMessages();
    const idUsuario = this.dataService.getId(); // Obtener el ID del usuario desde el almacenamiento local
    
    this.getPerfil(idUsuario).subscribe((mensaje: any) => {
      this.usuario = mensaje.nombre_usuario;
    });
  }

  public getPerfil(id: any) {
    return this.http.get(`http://localhost/programacionweb/backend/api.php?accion=perfil&id=${id}`);
  }  

  

  loadMessages() {
    this.http.get<Message[]>('http://localhost/programacionweb/backend/api.php?accion=Mensaje')
      .pipe(
        map(response => response as Message[]) // Utiliza el operador map para transformar la respuesta en un array de Message
      )
      .subscribe(messages => {
        this.messages = messages.reverse();
      });
  }

  sendMessage() {
    const message: Message = {
      usuario: this.usuario,
      contenido: this.contenido,
      fecha_envio: ''
    };

    this.http.post('http://localhost/programacionweb/backend/api.php?accion=Mensaje', message)
      .subscribe(response => {
        console.log(response);
        this.usuario = '';
        this.contenido = '';
        this.loadMessages();
      });
  }
}