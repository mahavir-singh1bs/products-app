import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatError, MatLabel } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { ProductsService } from '../products.service';
import { priceMaximumValidator } from '../price-maximum.validator';

@Component({
  selector: 'app-product-create',
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatInput,
    MatFormField,
    MatError,
    MatLabel,
    MatSelect,
    MatOption
  ],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit {
  productForm: FormGroup<{
    title: FormControl<string>,
    price: FormControl<number | undefined>,
    category: FormControl<string>
  }> | undefined;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.productForm?.controls.category.valueChanges.subscribe(() => {
      this.productForm?.controls.price.reset();
    })
  }

  private buildForm() {
    this.productForm = this.fb.nonNullable.group({
      title: ['', Validators.required],
      price: this.fb.nonNullable.control<number | undefined>(
        undefined,
        [
          Validators.required,
          Validators.min(1),
          priceMaximumValidator(1000)
        ]
      ),
      category: ['', Validators.required],
    });
  }

  createProduct() {
    this.productsService.addProduct(this.productForm!.value).subscribe(() => {
      this.router.navigate(['/products'])
    });
  }

}
