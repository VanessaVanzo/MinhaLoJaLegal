import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../service/product-service.service';

@Component({
  selector: 'app-editar-produto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.scss']
})
export class EditarProdutoComponent implements OnInit {
  produtoForm: FormGroup;

  private produtoService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  produtoId!: string;

  constructor() {
    // Inicializa o form vazio para evitar erro NG01052
    this.produtoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      image: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Pega o id da rota
    this.produtoId = this.route.snapshot.paramMap.get('id')!;

    this.produtoService.getProdutoById(this.produtoId).subscribe({
      next: (produto) => {
        if (!produto) {
          this.router.navigate(['/']);
          return;
        }

        // Atualiza os valores do form com os dados do produto
        this.produtoForm.patchValue({
          title: produto.title,
          description: produto.description,
          price: produto.price,
          stock: produto.stock,
          image: produto.image
        });
      },
      error: (err) => {
        console.error('Produto não encontrado', err);
        this.router.navigate(['/']);
      }
    });
  }

  salvarProduto() {
    if (this.produtoForm.invalid) return;

    const dadosAtualizados = this.produtoForm.value;

    this.produtoService.updateProduto(this.produtoId, dadosAtualizados).subscribe({
      next: (produto) => { },
      error: (err) => {
        console.error('Produto não encontrado', err);
        this.router.navigate(['/']);
      }
    });

    // Redireciona para home ou lista de produtos
    this.router.navigate(['/']);
  }
}
