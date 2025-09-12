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
import { Router, RouterModule } from '@angular/router'; // IMPORTANTE
import { AuthService } from '../../service/auth.service';




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

  constructor(public cartService: CartServiceService, public authService: AuthService, private router: Router) { }

  get cartCount() {
    return this.cartService.cart;
  }

  checkout() {
    console.log('Finalizando compra', this.cartService.cart());
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

