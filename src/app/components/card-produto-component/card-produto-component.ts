import { Component, Input } from '@angular/core';
import { Produtos } from '../../models/produtos';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router'; // IMPORTANTE


@Component({
  selector: 'app-card-produto-component',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule,FlexLayoutModule,RouterModule],
  templateUrl: './card-produto-component.html',
  styleUrl: './card-produto-component.scss'
})
export class CardProdutoComponent{

  @Input() product!: Produtos;

  addToCart(product: Produtos) {
    console.log('Adicionar ao carrinho:', product);
    // Aqui você pode chamar seu serviço de carrinho
  }

}
