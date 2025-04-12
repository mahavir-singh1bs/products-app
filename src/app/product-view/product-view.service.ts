import { Injectable } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';

@Injectable()
export class ProductViewService {
  private product: Product | undefined;

  constructor(private productsService: ProductsService) { }

  getProduct(id: number): Product | undefined {
    if (!this.product) {
      const products = this.productsService.getProducts();
      this.product = products.find(product => product.id == id);
    }
    return this.product;
  }

}
