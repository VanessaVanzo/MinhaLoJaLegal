import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CartServiceService } from '../../service/cart-service.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router'; // IMPORTANTE




@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    FlexLayoutModule,
    MatMenuModule,
    MatDividerModule,
    MatSidenavModule,
    RouterModule


  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(public cartService: CartServiceService) { }

  get cartCount() {
    return this.cartService.cart;
  }

  checkout() {
    // Aqui você pode redirecionar para a página de checkout ou abrir um modal
    console.log('Finalizando compra', this.cartService.cart());
    // Exemplo: limpar o carrinho após finalizar
    // this.cartService.clearCart();
  }

}

