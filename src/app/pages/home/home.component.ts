import { Component, computed, signal } from '@angular/core';
import { ProductService } from '../../service/product-service.service';
import { CommonModule } from '@angular/common';
import { CardProdutoComponent } from '../../components/card-produto-component/card-produto-component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router'; // IMPORTANTE
import { AuthService } from '../../service/auth.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CardProdutoComponent,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] // corrigido
})
export class HomeComponent {

  // termo do filtro
  filterTerm = signal('');

  constructor(public productService: ProductService, public authService: AuthService) { }

  // getter para os produtos
  get products() {
    return this.productService.products(); // já retorna o array atualizado
  }

  // computed: recalcula a lista filtrada sempre que mudar produtos() ou filterTerm()
  filteredProducts = computed(() =>
    this.products.filter(p =>
      p.title.toLowerCase().includes(this.filterTerm().toLowerCase())
    )
  );

  onFilterChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterTerm.set(input.value);
  }

}
