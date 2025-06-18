import { remove } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { FIREBASEDATAPATHS, FirebaseDatasource } from './firebase-datasource';    // Keep your paths as before
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends FirebaseDatasource<Product> {

  constructor() {
    super(FIREBASEDATAPATHS.PRODUCTS);
  }

  commitProduct(product: Product, removeProduct: boolean = false) {
    if (product.id) {
      if (removeProduct) {
        return this.deleteData(product.id);
      }
      return this.updateData(`${FIREBASEDATAPATHS.PRODUCTS}${product.id}`, product);
    }
    return this.pushData(FIREBASEDATAPATHS.PRODUCTS, product);
  }
}
