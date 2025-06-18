import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductForm } from '../product-form/product-form';
import { ProductService } from '../../services/product-service';
import { Product } from '../../models/product';
import { Observable, ReplaySubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Confirmdialog } from '../../common/confirmdialog/confirmdialog';

@Component({
  selector: 'app-admin-products',
  standalone: false,
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminProducts implements OnInit {

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productService.getList()
      .subscribe(products => {
        this.productsDataSource = products;
      });

    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService
        .getData(productId).then(product => {
          if (product && !Array.isArray(product)) {
            this.openDialog(product);
          } else {
            console.error('Product not found');
          }
        }).catch(error => {
          console.error('Error fetching product:', error);
        });
    }
  }

  readonly dialog = inject(MatDialog);
  readonly _productsDataSource = new ReplaySubject<Product[]>();
  readonly displayedColumns: string[] = ['name', 'price', 'category', 'actions'];
  readonly columnsToDisplay: string[] = this.displayedColumns.slice(0, this.displayedColumns.length - 1);

  openDialog(product?: Product | null) {
    this.dialog
      .open(ProductForm, { data: { ...product }, disableClose: true })
      .afterClosed()
      .subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  }
  deleteProduct(product: Product) {
    this.dialog
      .open(Confirmdialog, { disableClose: true })
      .afterClosed()
      .subscribe(result => {
        if (result === 'true') {
          this.productService.commitProduct(product, true);
        }
      });
  }
  get productsDataSource(): Observable<Product[]> {
    return this._productsDataSource;
  }

  set productsDataSource(products: Product[]) {
    this._productsDataSource.next(products);
  }
}
