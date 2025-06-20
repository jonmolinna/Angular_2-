import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProduct } from '../models/create-product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);

  private readonly url: string = 'http://localhost:3000/products';

  addPost(body: CreateProduct): Observable<any> {
    return this.http.post<any>(this.url, body);
  }

  getAllPosts(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
