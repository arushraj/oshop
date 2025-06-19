import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Database, ref, push, update, get, list, remove, onChildAdded, onChildChanged, onChildRemoved } from '@angular/fire/database';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export const FIREBASE_PATH = new InjectionToken<string>('FirebasePath');

export enum FIREBASEDATAPATHS {
  USERS = 'users/',
  CATEGORIES = 'categories/',
  PRODUCTS = 'products/',
}

export enum CHILDOPTATIONS {
  ADD = 'child_added',
  CHANGE = 'child_changed',
  REMOVE = 'child_removed',
}

export interface SnackBarConfig {
  message: string;
  action?: string;
  config?: MatSnackBarConfig;
}

export interface ChildChange<T> {
  type: string;
  id: string;
  value?: T;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseDatasource<T> {
  protected db: Database = inject(Database);
  protected _snackBar = inject(MatSnackBar);
  constructor(@Inject(FIREBASE_PATH) protected firebasePath: string) { }

  protected confirSnackBar(snackBar: Partial<SnackBarConfig>): SnackBarConfig {
    return {
      message: snackBar.message ?? 'Operation completed successfully',
      action: snackBar.action ?? 'Close',
      config: { duration: 2000, ...snackBar.config }
    };
  }

  async updateData(
    path: string = this.firebasePath,
    data: Partial<T>,
    snackBar: SnackBarConfig = { message: 'Data updated successfully' }): Promise<void> {
    const dataRef = ref(this.db, path);
    return update(dataRef, data).then(() => {
      snackBar = this.confirSnackBar(snackBar);
      this._snackBar.open(snackBar.message, snackBar.action, snackBar.config);
      console.log('Data updated successfully at path:', path);
    }).catch((error) => {
      console.error('Error updating data:', error);
      throw error;
    });
  }

  async pushData(
    path: string = this.firebasePath,
    data: T,
    snackBar: SnackBarConfig = { message: 'Data pushed successfully' }): Promise<void> {
    const dataRef = ref(this.db, path);
    return push(dataRef, data).then((ref) => {
      snackBar = this.confirSnackBar(snackBar);
      this._snackBar.open(snackBar.message, snackBar.action, snackBar.config);
      console.log('Data pushed successfully with key:', ref.key);
    }).catch((error) => {
      console.error('Error pushing data:', error);
      throw error;
    });
  }

  async deleteData(
    id?: string,
    path: string = this.firebasePath,
    snackBar: SnackBarConfig = { message: 'Data deleted successfully' }): Promise<void> {
    const dataRef = ref(this.db, `${path}${id}`);
    return remove(dataRef).then(() => {
      snackBar = this.confirSnackBar(snackBar);
      this._snackBar.open(snackBar.message, snackBar.action, snackBar.config);
      console.log('Data deleted successfully at path:', `${path}${id}`);
    }).catch((error) => {
      console.error('Error deleting data:', error);
      throw error;
    });
  }

  async getData(path: string = this.firebasePath): Promise<T[] | null> {
    const dataRef = ref(this.db, path);
    return get(dataRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          const _data = snapshot.val();
          return Object.keys(_data).map(key => ({ id: key, ..._data[key] }));
        }
        return null;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        return null;
      });
  }

  async getItem(id: string, path: string = this.firebasePath): Promise<T | null> {
    const dataRef = ref(this.db, `${path}${id}`);
    return get(dataRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          const _data: T = snapshot.val();
          return { id: snapshot.key!, ..._data } as T;
        }
        return null;
      })
      .catch(error => {
        console.error('Error fetching item:', error);
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

  getChildChanges(
    existingIds: Set<string> = new Set(),
    path: string = this.firebasePath
  ): Observable<ChildChange<T>> {
    const dataRef = ref(this.db, path);
    return new Observable<ChildChange<T>>(subscriber => {
      // Listen for child added
      const added = (snapshot: any) => {
        const id = snapshot.key!;
        if (existingIds.has(id)) {
          // Ignore initial emits for existing items
          return;
        }
        existingIds.add(id); // Track new IDs
        subscriber.next({
          type: CHILDOPTATIONS.ADD,
          id,
          value: { id, ...snapshot.val() } as T
        });
      };
      // Listen for child changed
      const changed = (snapshot: any) => {
        subscriber.next({
          type: CHILDOPTATIONS.CHANGE,
          id: snapshot.key!,
          value: { id: snapshot.key!, ...snapshot.val() } as T
        });
      };
      // Listen for child removed
      const removed = (snapshot: any) => {
        const id = snapshot.key!;
        existingIds.delete(id); // Remove from tracked IDs
        subscriber.next({ type: CHILDOPTATIONS.REMOVE, id });
      };

      // Attach listeners
      const offAdded = onChildAdded(dataRef, added);
      const offChanged = onChildChanged(dataRef, changed);
      const offRemoved = onChildRemoved(dataRef, removed);

      // Cleanup
      return () => {
        offAdded();
        offChanged();
        offRemoved();
      };
    });
  }
}
