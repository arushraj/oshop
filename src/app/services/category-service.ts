import { Injectable } from '@angular/core';
import { FirebaseData, FIREBASEDATAPATHS } from './firebase-data';
import { of } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(public firebaseDS: FirebaseData) { }
  public getCategories(): Promise<Category[]> {
    return this.firebaseDS.getData(FIREBASEDATAPATHS.CATEGORIES)
      .then(snapshot => {
        if (snapshot.exists()) {
          const categories = snapshot.val();
          return Object.keys(categories).map(key => ({ id: key, ...categories[key] }));;
        }
        return [];
      });
  }
}
