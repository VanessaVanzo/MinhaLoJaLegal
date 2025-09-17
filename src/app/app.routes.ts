import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './auth.guard';
import { ProdutoFormComponent } from './pages/cadasto-produto/produto-form/produto-form.component';

export const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'formulario', component: FormularioComponent, canActivate: [authGuard] },
  { path: 'cadastro-produto', component: ProdutoFormComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }                // rota curinga
];
