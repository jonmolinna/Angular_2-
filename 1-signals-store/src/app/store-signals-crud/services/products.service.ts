import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProduct, UpdateProduct } from '../models/create-product.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);

  private readonly url: string = 'http://localhost:3000/products';

  addPost(body: CreateProduct): Observable<Product> {
    return this.http.post<Product>(this.url, body);
  }

  getAllPosts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.url}/${id}`);
  }

  updateProduct(id: String, body: UpdateProduct) {
    return this.http.put<Product>(`${this.url}/${id}`, body);
  }
}
