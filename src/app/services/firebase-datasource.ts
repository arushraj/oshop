import { Inject, Injectable } from '@angular/core';
import { Database, ref, push, update, get, list, remove } from '@angular/fire/database';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';



export enum FIREBASEDATAPATHS {
  USERS = 'users/',
  CATEGORIES = 'categories/',
  PRODUCTS = 'products/',
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseDatasource<T> {
  protected db: Database = inject(Database);
  protected _snackBar = inject(MatSnackBar);
  constructor(@Inject(String) protected firebasePath: string) {
  }

  async updateData(path: string = this.firebasePath, data: Partial<T>): Promise<void> {
    const dataRef = ref(this.db, path);
    return update(dataRef, data).then(() => {
      this._snackBar.open('Data updated successfully', 'Close', {
        duration: 2000,
      });
      console.log('Data updated successfully at path:', path);
    }).catch((error) => {
      console.error('Error updating data:', error);
      throw error;
    });
  }

  async pushData(path: string = this.firebasePath, data: T): Promise<void> {
    const dataRef = ref(this.db, path);
    return push(dataRef, data).then((ref) => {
      this._snackBar.open('Data pushed successfully', 'Close', {
        duration: 2000,
      });
      console.log('Data pushed successfully with key:', ref.key);
    }).catch((error) => {
      console.error('Error pushing data:', error);
      throw error;
    });
  }

  async deleteData(id?: string, path: string = this.firebasePath): Promise<void> {
    const dataRef = ref(this.db, `${path}${id}`);
    return remove(dataRef).then(() => {
      this._snackBar.open('Data deleted successfully', 'Close', {
        duration: 2000,
      });
      console.log('Data deleted successfully at path:', `${path}${id}`);
    }).catch((error) => {
      console.error('Error deleting data:', error);
      throw error;
    });
  }

  async getData(id?: string, path: string = this.firebasePath): Promise<T[] | T | null> {
    if (id)
      path = `${path}${id}`;
    else
      path = `${path}`;
    const dataRef = ref(this.db, path);
    return get(dataRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          if (id) {
            const _data: T = snapshot.val();
            return { id: snapshot.key!, ..._data } as T;
          } else {
            const _data = snapshot.val();
            return Object.keys(_data).map(key => ({ id: key, ..._data[key] }));
          }
        }
        return null;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        return null;
      });
  }

  getList(path: string = this.firebasePath): Observable<(T & { id: string })[]> {
    const dataRef = ref(this.db, path);
    return list(dataRef).pipe(
      map(changes =>
        changes.map(c => ({
          id: c.snapshot.key!,
          ...(c.snapshot.val() as T)
        }))
      )
    );
  }
}
