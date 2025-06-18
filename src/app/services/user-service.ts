import { Injectable } from '@angular/core';
import { AppUser } from '../models/app-user';
import { FIREBASEDATAPATHS, FirebaseDatasource } from './firebase-datasource';

@Injectable({
  providedIn: 'root'
})
export class UserService extends FirebaseDatasource<AppUser> {

  constructor() { super(FIREBASEDATAPATHS.USERS); }
}
