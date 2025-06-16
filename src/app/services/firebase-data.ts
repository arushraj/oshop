import { AppUser } from './../models/app-user';
import { Injectable } from '@angular/core';
import { Database, ref, set, update, get, onChildChanged } from '@angular/fire/database';
import { inject } from '@angular/core';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseData {

  constructor() { }
  private db: Database = inject(Database);

  // Store data at a specific path in the database
  storeData(path: string, data: AppUser): void {
    const dataRef = ref(this.db, path);
    update(dataRef, data)
      .then(() => {
        console.log('Data saved!');
        // this.getData(path).subscribe((data) => console.log('Data retrieved:', data));
      })
      .catch(err => console.error('Error:', err));
  }

  getData(pathWithUid: string): Observable<AppUser | null> {
    const dataRef = ref(this.db, pathWithUid);
    return from(get(dataRef)).pipe(
      map(snapshot => snapshot.val() as AppUser | null)
    );
  }

}

export enum FIREBASEDATAPATHS {
  USERS = 'users/',
}
