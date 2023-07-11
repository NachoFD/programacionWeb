import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegisterComponent } from './register/register.component';
import { InfoComponent } from './info/info.component';
import { AuthguardGuard } from './authguard.guard';
import { AmigosComponent } from './amigos/amigos.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PerfilComponent } from './perfil/perfil.component';
import { GatchaComponent } from './gatcha/gatcha.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { RegalosComponent } from './regalos/regalos.component';
import { ChatComponent } from './chat/chat.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
{ path: '', component: InfoComponent },
{ path: 'info', component: InfoComponent},
{ path: 'amigos', component: AmigosComponent},
{ path: 'perfil', component: PerfilComponent},
{ path: 'regalos', component: RegalosComponent},
{ path: 'comunidad', component: ChatComponent},
{ path: 'admin', component: AdminComponent},
{ path: 'gatcha', component: GatchaComponent},
{ path: 'pokedex', component: PokedexComponent},
{ path: 'pokemon/:id', component: PokemonComponent},
{ path: 'login', component: LoginComponent },
{ path: 'inicio', component: InicioComponent },
{ path: 'register', component: RegisterComponent },
]

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})

export class AppRoutingModule { }