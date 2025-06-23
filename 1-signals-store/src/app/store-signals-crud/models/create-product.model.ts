export interface CreateProduct {
  name: string;
  description: string;
  price: string;
}

export interface UpdateProduct extends CreateProduct {}
