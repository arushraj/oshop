import { Injectable } from '@angular/core';
import { FirebaseDatasource, FIREBASEDATAPATHS } from './firebase-datasource';
import { ICategory } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends FirebaseDatasource<ICategory> {

  constructor() {
    super(FIREBASEDATAPATHS.CATEGORIES);
  }
}
