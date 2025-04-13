import { AsyncPipe } from '@angular/common';
import { Component, OnInit, viewChild, DestroyRef, inject } from '@angular/core';
import { Product } from '../product';
import { SortPipe } from '../sort.pipe';
import { ProductsService } from '../products.service';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product-list',
  imports: [ProductDetailComponent, SortPipe, AsyncPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductsService);
  product$: Observable<Product[]> | undefined;
  selectedProduct: Product | undefined;

  onAdded(product: Product) {
    alert(`${product.title} added to the cart!`);
  }

  private getProducts() {
    this.product$ = this.productService.getProducts();
  }

  ngOnInit(): void {
    this.getProducts();
  }
}
