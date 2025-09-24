import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Produtos } from '../../../models/produtos';
import { ProductService } from '../../../service/product-service.service';
import { Router, RouterModule } from '@angular/router'; // IMPORTANTE


@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent {
  produtoForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null; // para mostrar preview

  constructor(private fb: FormBuilder, private produtoService: ProductService) {
    this.produtoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      image: ['', Validators.required],
      createdAt: [new Date().toISOString().substring(0, 10), Validators.required]
    });
  }


  submit() {
    if (this.produtoForm.valid) {
      const novoProduto: Produtos = this.produtoForm.value;

      this.produtoService.createProduto(novoProduto).subscribe({
        next: (res) => {
          console.log('Produto cadastrado com sucesso:', res);

          alert('Produto cadastrado com sucesso!');

          // Reseta o formulário com valores válidos para os validators
          this.produtoForm.reset({
            title: ' ',
            description: ' ',
            price: 0,
            stock: 0,
            image: ' ',
            createdAt: new Date().toISOString().substring(0, 10)
          });

          // Marca tudo como pristine e untouched
          this.produtoForm.markAsPristine();
          this.produtoForm.markAsUntouched();
        },
        error: (err) => {
          console.error('Erro ao cadastrar produto:', err);
          alert('Ocorreu um erro ao cadastrar o produto.');
        }
      });
    } else {
      this.produtoForm.markAllAsTouched();
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }


}


