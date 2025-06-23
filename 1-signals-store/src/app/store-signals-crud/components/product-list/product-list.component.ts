import { Component, inject } from '@angular/core';
import { ProductStore } from '../../store/product.store';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  readonly store = inject(ProductStore);
}
