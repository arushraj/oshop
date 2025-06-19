import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category-service';
import { Category } from '../../models/category';
import { ProductService } from '../../services/product-service';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductForm implements OnInit {

  constructor(private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public product: Product) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      imageUrl: ['', Validators.required],
      description: ['']
    });
    this.categoryService.getData()
      .then((categories) => {
        if (Array.isArray(categories)) {
          this.categories = categories;
        } else {
          this.categories = [];
        }
      });
  }
  productForm: FormGroup;
  categories: Category[] = [];

  ngOnInit() {
    if (this.product) {
      this.productForm.patchValue({
        name: this.product.name,
        price: this.product.price,
        category: this.product.category,
        imageUrl: this.product.imageUrl,
        description: this.product.description
      });
    }
  }

  public getFormValue(fieldName: string) {
    return this.productForm.get(fieldName)?.value || null;
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData: Product = this.productForm.value;
      if (this.product.id) {
        productData.id = this.product.id; // Ensure the ID is set for updates
        // Only update if data has changed
        const hasChanged = Object.keys(productData).some(
          key => productData[key as keyof Product] !== this.product[key as keyof Product]
        );
        if (!hasChanged) {
          // No changes, do not call the DB
          this.router.navigate(['/admin/products']);
          return;
        }
      }
      this.productService.commitProduct(productData)
      this.productForm.reset();
      this.router.navigate(['/admin/products']);
    } else {
      console.log('Form is invalid');
    }
  }

  onCancel() {
    this.productForm.reset();
    this.router.navigate(['/admin/products']);
  }
  get primaryButtonName() {
    return this.product?.id ? 'update' : 'save';
  }
}
