import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InfoComponent } from './info/info.component';
import { AmigosComponent } from './amigos/amigos.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { GatchaComponent } from './gatcha/gatcha.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PokemonComponent } from './pokemon/pokemon.component';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegalosComponent } from './regalos/regalos.component';
import { ChatComponent } from './chat/chat.component';
import { AdminComponent } from './admin/admin.component';

import { HashLocationStrategy , LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    RegisterComponent,
    InfoComponent,
    AmigosComponent,
    PokedexComponent,
    GatchaComponent,
    PerfilComponent,
    PokemonComponent,
    RegalosComponent,
    ChatComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [MatSnackBar, {provide :
    LocationStrategy , useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
