import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category-service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductForm implements OnInit {

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      imageUrl: ['', Validators.required],
      description: ['']
    });
    this.categoryService.getCategories()
      .then(categories => this.categories = categories);
    // ['Electronics', 'Books', 'Clothing', 'Home Appliances'];
  }
  productForm: FormGroup;
  categories: Category[] = [];

  ngOnInit() {
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      console.log('Product Data:', productData);
      // Here you would typically send the data to your backend service
      this.productForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }

  onCancel() {
    this.productForm.reset();
  }
}
