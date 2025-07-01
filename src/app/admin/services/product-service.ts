import { Injectable } from '@angular/core';
import {
  FIREBASEDATAPATHS,
  CHILDOPTATIONS,
  ChildChange,
  FirebaseDatasource
} from '../../services/firebase-datasource';    // Keep your paths as before
import { IProduct } from '../../models/product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends FirebaseDatasource<IProduct> {

  constructor() {
    super(FIREBASEDATAPATHS.PRODUCTS);
    this.existingIds = new Set<string>();
  }
  public readonly existingIds: Set<string>;
  readonly _productsDataSource = new BehaviorSubject<IProduct[]>([]);
  public get productsDataSource(): Observable<IProduct[]> {
    return this._productsDataSource.asObservable();
  }
  private set productsDataSource(products: IProduct[]) {
    this._productsDataSource.next(products);
  }

  commitProduct(product: IProduct, removeProduct: boolean = false) {
    if (product.id) {
      if (removeProduct) {
        return this.deleteData(product.id);
      }
      return this.updateData(`${FIREBASEDATAPATHS.PRODUCTS}${product.id}`, product);
    }
    return this.pushData(FIREBASEDATAPATHS.PRODUCTS, product);
  }

  handleProductChildChange(change: ChildChange<IProduct>) {
    switch (change.type) {
      case CHILDOPTATIONS.ADD:
        // Add the new product to your local list
        this.productsDataSource = [...this._productsDataSource.value, change.value as IProduct];
        break;
      case CHILDOPTATIONS.CHANGE:
        // Update the product in your local list
        const index = this._productsDataSource.value.findIndex(p => p.id === change.id);
        if (index !== -1) {
          const updated = [...this._productsDataSource.value];
          updated[index] = { ...updated[index], ...(change.value as IProduct) };
          this.productsDataSource = updated;
        }
        break;
      case CHILDOPTATIONS.REMOVE:
        // Remove the product from your local list
        this.productsDataSource = this._productsDataSource.value.filter(p => p.id !== change.id);
        break;
      default:
        console.warn('Unknown change type:', change.type);
    }
  }

  public async fetchProductList() {
    return this.getData()
      .then(products => {
        if (products) {
          products.map(({ id }) => {
            if (id)
              this.existingIds.add(id)
          });
          this.productsDataSource = products;
        }
      });
  }
}
