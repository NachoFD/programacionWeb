import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  @ViewChild('messageContainer', { static: false }) messageContainer!: ElementRef;

  messages: Message[] = [];
  usuario: any;
  contenido: string = '';

  constructor(private dataService: ApiService, private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit() {
    const idUsuario = this.dataService.getId(); // Obtener el ID del usuario desde el almacenamiento local
    
    this.getPerfil(idUsuario).subscribe((mensaje: any) => {
      this.usuario = mensaje.nombre_usuario;
    });
    
    this.loadMessages();
    this.scrollToBottom();
  }

  public getPerfil(id: any) {
    return this.http.get(`http://localhost/programacionweb/backend/api.php?accion=perfil&id=${id}`);
  }

  loadMessages() {
    this.http
      .get<Message[]>('http://localhost/programacionweb/backend/api.php?accion=Mensaje')
      .pipe(map((response) => response as Message[])) // Utiliza el operador map para transformar la respuesta en un array de Message
      .subscribe((messages) => {
        this.messages = messages.reverse();
        this.scrollToBottom();
      });
  }

  sendMessage() {
    const message: Message = {
      usuario: this.usuario,
      contenido: this.contenido,
      fecha_envio: ''
    };

    if(this.contenido == null || this.contenido == ""){
      this.snackBar.open('Completa el campo antes de enviar el mensaje.', 'Cerrar', {
        duration: 4000, // Duración en milisegundos
        horizontalPosition: 'center', // Posición horizontal del mensaje
        verticalPosition: 'top' // Posición vertical del mensaje
      })
    }
    else
    {
      this.http
        .post('http://localhost/programacionweb/backend/api.php?accion=Mensaje', message)
        .subscribe((response) => {
          console.log(response);
          this.contenido = '';
  
          this.loadMessages();
          this.scrollToBottom();
      });
    }

  }

  scrollToBottom() {
    setTimeout(() => {
      this.messageContainer.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 100);
  }
}
