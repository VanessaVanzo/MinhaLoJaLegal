import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Produtos } from '../models/produtos';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products = toSignal(
    this.http.get<{ products: Produtos[] }>('https://dummyjson.com/products').pipe(
      map(response => response.products.slice(0, 20))),
    { initialValue: [] }
  );

  constructor(private http: HttpClient) {}

  getProductById(id: number) {
    return toSignal(
      this.http.get<Produtos>(`https://dummyjson.com/products/${id}`),
      { initialValue: undefined }
    );
  }

}
