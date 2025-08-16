import { Component } from '@angular/core';
import { ProductService } from '../../service/product-service.service';
import { CommonModule } from '@angular/common';
import { CardProdutoComponent } from '../../components/card-produto-component/card-produto-component';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CardProdutoComponent,FlexLayoutModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  products = this.productService.products;

  constructor(private productService: ProductService) {}



}
