import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { FormularioComponent } from './components/formulario/formulario.component';

export const routes: Routes = [

  { path: '', component: HomeComponent },        // rota inicial
  { path: 'product/:id', component: ProductDetailComponent }, //rota detalhes
  { path: 'formulario', component: FormularioComponent }, // rota formulario

  { path: '**', redirectTo: '' }                // rota curinga
];
