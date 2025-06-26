import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProductStore } from '../../store/product.store';
import { CreateProduct } from '../../models/create-product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent {
  private formBuilder = inject(FormBuilder);
  readonly store = inject(ProductStore);

  initialForm = this.formBuilder.group({
    name: [''],
    description: [''],
    price: [''],
  });

  handleSubmitProduct(event: Event): void {
    event.preventDefault();
    let form = this.initialForm.value as CreateProduct;
    let product = this.store.selectProduct();

    if (product) {
      this.store.updateProduct({id: product.id, body: form})
    }
    else {
      this.store.addProduct(form);
    }

    this.initialForm.reset();
  }

  updateProduct = effect(() => {
    let product = this.store.selectProduct();

    if (product) {
      this.initialForm.patchValue({
        name: product.name,
        description: product.description,
        price: product.price
      });
    }
  });

  handleResetProduct(): void {
    this.store.resetSelectProduct();
    this.initialForm.reset()
  }
}
