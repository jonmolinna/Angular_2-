import { CreateProduct } from "./create-product.model";

export interface Product extends CreateProduct {
  id: number;
}
