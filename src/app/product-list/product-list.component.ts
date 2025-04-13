import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Product } from '../product';
import { SortPipe } from '../sort.pipe';
import { ProductsService } from '../products.service';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product-list',
  imports: [ProductDetailComponent, SortPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  products = toSignal(inject(ProductsService).getProducts(), {
    initialValue: []
  })
  selectedProduct: Product | undefined;

  onAdded(product: Product) {
    alert(`${product.title} added to the cart!`);
  }

}
