import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductForm } from '../product-form/product-form';
import { ProductService } from '../../services/product-service';
import { Product } from '../../models/product';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Confirmdialog } from '../../common/confirmdialog/confirmdialog';

@Component({
  selector: 'app-admin-products',
  standalone: false,
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminProducts implements OnInit, OnDestroy {

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute) {
    this.dialog = inject(MatDialog);
  }

  ngOnInit(): void {
    if (!this.productService.existingIds.size) {
      this.productService.fetchProductList()
        .then(() => this.subscribeChildChanges());
    } else {
      this.subscribeChildChanges();
    }

    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService
        .getItem(productId)
        .then(product => {
          if (product) {
            this.openDialog(product);
          } else {
            console.error('Product not found');
          }
        }).catch(error => {
          console.error('Error fetching product:', error);
        });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private subscriptions = new Subscription();
  readonly dialog: MatDialog;

  readonly columnsToDisplay: string[] = ['name', 'price', 'category'];
  readonly displayedColumns: string[] = [...this.columnsToDisplay, 'actions'];

  get dataSource(): Observable<Product[]> {
    return this.productService.productsDataSource;
  }

  private subscribeChildChanges() {
    this.subscriptions.add(
      this.productService.getChildChanges(this.productService.existingIds)
        .subscribe(change => this.productService.handleProductChildChange(change))
    );
  }

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
}
