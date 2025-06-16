import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent {
  private formBuilder = inject(FormBuilder);

  initialForm = this.formBuilder.group({
    name: [''],
    description: [''],
    price: [''],
  });

  handleSubmitProduct(event: Event): void {
    event.preventDefault();

    let form = this.initialForm.value;

    console.log("form ----> ", this.initialForm.value)
    this.initialForm.reset()
  }
}
