import { Component, Input } from '@angular/core';
import { Produtos } from '../../models/produtos';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { CartServiceService } from '../../service/cart-service.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AuthService } from '../../service/auth.service';
import { ProductService } from '../../service/product-service.service';


@Component({
  selector: 'app-card-produto-component',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, FlexLayoutModule, RouterModule, MatIconModule],
  templateUrl: './card-produto-component.html',
  styleUrl: './card-produto-component.scss'
})
export class CardProdutoComponent {

  @Input() product!: Produtos;

  constructor(
    private cartService: CartServiceService,
    private dialog: MatDialog,
    public authService: AuthService,
    public productService: ProductService

  ) { }

  addToCart(prod: Produtos) {
    this.cartService.addToCart(prod);
  }

  removerItemComConfirmacao(produto: Produtos) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '280px',
      data: { message: 'Deseja realmente remover este item?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removerItem(produto); // só executa se confirmar
      }
    });
  }

  removerItem(produto: Produtos) {
    this.productService.deleteProduto(produto.id).subscribe({
      next: () => {
        console.log('Produto deletado com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao deletar produto', err);
      }
    });
  }
}
