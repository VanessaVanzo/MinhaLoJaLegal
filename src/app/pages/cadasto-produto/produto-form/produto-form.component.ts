import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Produtos } from '../../../models/produtos';
import { ProductService } from '../../../service/product-service.service';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
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

  // Upload de imagem
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.produtoForm.patchValue({ image: `assets/images/${file.name}` });
      };
      reader.readAsDataURL(file);

      // Aqui você deve salvar o arquivo na pasta assets ou enviar para backend
      // Se quiser salvar localmente, você precisaria de backend para receber o arquivo
    }
  }

  submit() {
    if (this.produtoForm.valid) {
      const novoProduto: Produtos = this.produtoForm.value;

      // Chama o service para salvar na API
      this.produtoService.createProduto(novoProduto).subscribe({
        next: (res) => {
          console.log('Produto cadastrado com sucesso:', res);
          this.produtoForm.reset({
            createdAt: new Date().toISOString().substring(0, 10),
            price: 0,
            stock: 0
          });
          this.imagePreview = null;
        },
        error: (err) => {
          console.error('Erro ao cadastrar produto:', err);
        }
      });
    } else {
      this.produtoForm.markAllAsTouched();
    }
  }
}

