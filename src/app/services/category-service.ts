import { Injectable } from '@angular/core';
import { FirebaseDatasource, FIREBASEDATAPATHS } from './firebase-datasource';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends FirebaseDatasource<Category> {

  constructor() {
    super(FIREBASEDATAPATHS.CATEGORIES);
  }
}
