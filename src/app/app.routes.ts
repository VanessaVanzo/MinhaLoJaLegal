import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [

  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },       // rota inicial
  { path: 'formulario', component: FormularioComponent, canActivate: [authGuard] }, // rota formulario
  { path: 'login', component: LoginComponent }, // rota login
  { path: '**', redirectTo: '' }                // rota curinga
];
