import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../../service/product-service.service';
import { Produtos } from '../../models/produtos';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CartServiceService } from '../../service/cart-service.service';



@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule,FlexLayoutModule,MatButtonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent  {

  productSignal = this.loadProduct();

  constructor(
    private productService: ProductService,
    private cartService: CartServiceService,
    private route: ActivatedRoute,
    private location: Location) {
    this.loadProduct()
  }

  private loadProduct() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      return this.productService.getProductById(id); // retorna o signal direto
    }
    return null; // caso o id não exista
  }

  addToCart() {
    const prod = this.productSignal?.();
    if (prod) {
      this.cartService.addToCart(prod);
    }
  }

  goBack() {
    this.location.back();
  }
}
