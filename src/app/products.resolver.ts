import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Product } from './product';
import { ProductsService } from './products.service';

export const productsResolver: ResolveFn<Product[]> = (route, state) => {
  const productsService = inject(ProductsService);
  const limit = Number(route.queryParamMap.get('limit'));
  return productsService.getProducts(limit);
};
