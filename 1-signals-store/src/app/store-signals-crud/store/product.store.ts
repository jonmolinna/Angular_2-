import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Product } from '../models/product.model';
import { inject } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, finalize, pipe, switchMap, tap } from 'rxjs';

interface ProductState {
  products: Product[];
  selectPŕoduct: Product | null
  loading: boolean
  error: string | null
}

const initialState: ProductState = {
  products: [],
  loading: false,
  selectPŕoduct: null,
  error: null  
}

export const ProductStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, productService = inject(ProductsService)) => ({
    addProduct: rxMethod<CreateProduct>(
      pipe(
        tap(() => patchState(store, {loading: true, error: null})),
        switchMap((CreateProduct) => {
          return productService.addPost(CreateProduct).pipe(
            tap(data => {
              console.log("data ----> ", data)
              patchState(store, (state) => ({
                products: [...state.products, data]
              }))
            }),
            catchError((error) => {
              console.log("ERROR --> ", error)
              patchState(store, {error: 'Ocurrio un error'})
              return []
            }),
            finalize(() => {
              patchState(store, { loading: false})
            })
          )
        })
      )
    )
  }))
)