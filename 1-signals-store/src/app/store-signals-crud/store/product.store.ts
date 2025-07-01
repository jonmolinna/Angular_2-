import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Product } from '../models/product.model';
import { inject } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, finalize, pipe, switchMap, tap } from 'rxjs';
import { CreateProduct, UpdateProduct } from '../models/create-product.model';

interface ProductState {
  products: Product[];
  selectProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  selectProduct: null,
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
            tap((data: Product) => {
              patchState(store, (state) => ({
                products: [...state.products, data],
              }));
            }),
            catchError((error) => {
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

    // DELETE PRODUCT
    deleteProduct: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((id) =>
          productService.deleteProduct(id).pipe(
            tap((data: Product) => {
              patchState(store, (state) => ({
                loading: true,
                products: state.products.filter(
                  (product) => product.id !== data.id
                ),
              }));
            })
          )
        )
      )
    ),

    // UPDATE PRODUCT
    updateProduct: rxMethod<{ id: string; body: UpdateProduct }>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(({ id, body }) => {
          return productService.updateProduct(id, body).pipe(
            tap((data: Product) => {
              patchState(store, (state) => ({
                products: state.products.map(product => product.id === data.id ? data : product )
              }))
            }),
            catchError((error) => {
              patchState(store, {error: 'Ocurrio un error'})
              return [];
            }),
            finalize(() => {
              patchState(store, { loading: false });
            })
          );
        })
      )
    ),

    // FIND PRODUCT FOR UPDATE
    findProduct: (id: string) => {
      const product = store.products().find((product) => product.id === id);
      patchState(store, {
        selectProduct: product,
      });
    },

    // CLEAR SELECT PRODUCT
    resetSelectProduct: () => {
      patchState(store, {
        selectProduct: null,
      });
    },
  }))
);
