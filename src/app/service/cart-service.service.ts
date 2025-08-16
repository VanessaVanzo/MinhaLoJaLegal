import { Injectable, signal, Signal } from '@angular/core';
import { Produtos } from '../models/produtos';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor() { }

   // Signal que mantém a lista de produtos no carrinho
  private _cart = signal<Produtos[]>([]);

  // Exposição do signal apenas para leitura
  get cart(): Signal<Produtos[]> {
    return this._cart.asReadonly();
  }

  // Adicionar produto
  addToCart(product: Produtos) {
    this._cart.update(current => [...current, product]);

  }

  // Remover produto
  removeFromCart(productId: number) {
    this._cart.update(current => current.filter(p => p.id !== productId));
  }

  // Limpar carrinho
  clearCart() {
    this._cart.set([]);
  }
}
