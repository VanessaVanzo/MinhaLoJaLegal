import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

export const routes: Routes = [

  { path: '', component: HomeComponent },        // rota inicial
  { path: 'product/:id', component: ProductDetailComponent }, // rota com parâmetro
  { path: '**', redirectTo: '' }                // rota curinga
];
