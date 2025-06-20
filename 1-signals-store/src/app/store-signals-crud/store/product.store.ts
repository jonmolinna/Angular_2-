import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Product } from '../models/product.model';
import { inject } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, finalize, pipe, switchMap, tap } from 'rxjs';
import { CreateProduct } from '../models/create-product.model';

interface ProductState {
  products: Product[];
  selectPŕoduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  selectPŕoduct: null,
  error: null,
};

export const ProductStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, productService = inject(ProductsService)) => ({
    // Agregar Productos
    addProduct: rxMethod<CreateProduct>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((CreateProduct) => {
          return productService.addPost(CreateProduct).pipe(
            tap((data) => {
              patchState(store, (state) => ({
                products: [...state.products, data],
              }));
            }),
            catchError((error) => {
              console.log('ERROR --> ', error);
              patchState(store, { error: 'Ocurrio un error' });
              return [];
            }),
            finalize(() => {
              patchState(store, { loading: false });
            })
          );
        })
      )
    ),

    // Listar Products
    listProducts: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(() =>
          productService.getAllPosts().pipe(
            tap((data: Product[]) => {
              patchState(store, { products: data });
            }),
            catchError((error) => {
              patchState(store, { error: 'Failed to load products' });
              return [];
            }),
            finalize(() => {
              patchState(store, { loading: false });
            })
          )
        )
      )
    ),
  }))
);
