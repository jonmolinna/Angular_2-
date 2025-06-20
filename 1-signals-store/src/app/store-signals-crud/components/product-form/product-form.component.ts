import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProductStore } from '../../store/product.store';
import { CreateProduct } from '../../models/create-product.model';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent {
  private formBuilder = inject(FormBuilder);
  private store = inject(ProductStore);

  initialForm = this.formBuilder.group({
    name: [''],
    description: [''],
    price: [''],
  });

  handleSubmitProduct(event: Event): void {
    event.preventDefault();
    let form = this.initialForm.value as CreateProduct;
    this.store.addProduct(form);
    this.initialForm.reset();
  }
}
