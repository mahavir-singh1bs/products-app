import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { SortPipe } from '../sort.pipe';
import { Observable, switchMap, of } from 'rxjs';
import { Product } from '../product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  imports: [
    RouterLink,
    AsyncPipe,
    CurrencyPipe,
    SortPipe,
    MatMiniFabButton,
    MatIcon,
    MatCardModule,
    MatTableModule,
    MatButtonToggle,
    MatButtonToggleGroup
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]> | undefined;
  columnNames = ['title', 'price'];

  constructor(private productService: ProductsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.products$ = this.route.data.pipe(
      switchMap(data => of(data['products']))
    );
  }
}
