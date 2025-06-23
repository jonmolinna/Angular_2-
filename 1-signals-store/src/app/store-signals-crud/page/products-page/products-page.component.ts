import { Component, inject, OnInit } from '@angular/core';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { ProductStore } from '../../store/product.store';

@Component({
  selector: 'app-products-page',
  imports: [ProductFormComponent, ProductListComponent],
  templateUrl: './products-page.component.html',
})
export class ProductsPageComponent implements OnInit {
  readonly store = inject(ProductStore);

  ngOnInit(): void {
    this.store.listProducts();
  }
}
