import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatError, MatSuffix } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatChipSet, MatChip } from '@angular/material/chips';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../product';
import { Observable, switchMap } from 'rxjs';
import { ProductsService } from '../products.service';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { PriceMaximumDirective } from '../price-maximum.directive';

@Component({
  selector: 'app-product-detail',
  imports: [
    CommonModule,
    FormsModule,
    PriceMaximumDirective,
    MatButton,
    MatInput,
    MatFormField,
    MatError,
    MatIcon,
    MatSuffix,
    MatIconButton,
    MatChipSet,
    MatChip,
    MatSnackBarModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  id = input<string>();
  price: number | undefined;
  product$: Observable<Product> | undefined;

  constructor(
    private productService: ProductsService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.product$ = this.productService.getProduct(Number(this.id()));
  }

  addToCart(id: number) {
    this.cartService.addProduct(id).subscribe(() => {
      this.snackbar.open('Product added to the cart!', undefined, {
        duration: 1000
      })
    });
  }

  changePrice(product: Product) {
    this.productService.updateProduct(
      product.id,
      this.price!
    ).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }

  remove(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }

  updatePrice(price: number) {
    console.log('New price: ', price);
    this.price = price;
  }

}
