
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Produtos } from '../models/produtos';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products = signal<Produtos[]>([]);

  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  // Carregar produtos do backend
  loadProducts() {
    this.http.get<Produtos[]>(this.apiUrl)
      .subscribe(produtos => this.products.set(produtos));
  }

  // Criar novo produto
  createProduto(produto: Produtos): Observable<Produtos> {
    return this.http.post<Produtos>(this.apiUrl, produto)
      .pipe(
        map(novoProduto => {
          this.products.update(lista => [...lista, novoProduto]);
          return novoProduto;
        })
      );
  }

  // Excluir produto
  deleteProduto(id: string): Observable<void> {
    console.log('Tentando deletar produto com id:', id);

    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        map(() => {
          // Atualiza o Signal removendo o produto
          this.products.update(lista => lista.filter(prod => prod.id !== id));
        })
      );
  }

  // Buscar produto por ID
  getProdutoById(id: string) {
    return this.http.get<Produtos>(`${this.apiUrl}/${id}`);
  }

  // Atualizar produto
  updateProduto(id: string, produto: Produtos) {
    return this.http.put<Produtos>(`${this.apiUrl}/${id}`, produto)
      .pipe(
        map(updated => {
          this.products.update(lista => lista.map(p => p.id === id ? updated : p));
          return updated;
        })
      );
  }

}

