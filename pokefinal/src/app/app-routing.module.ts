import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegisterComponent } from './register/register.component';
import { InfoComponent } from './info/info.component';
import { AuthguardGuard } from './authguard.guard';

const routes: Routes = [
{ path: '', component: InfoComponent },
{ path: 'info', component: InfoComponent},
{ path: 'login', component: LoginComponent },
{ path: 'inicio', component: InicioComponent },
{ path: 'register', component: RegisterComponent },
]

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})

export class AppRoutingModule { }