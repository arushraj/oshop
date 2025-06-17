import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductForm } from '../product-form/product-form';

@Component({
  selector: 'app-admin-products',
  standalone: false,
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminProducts {

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(ProductForm);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
