import { get } from '@angular/fire/database';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, switchMap, map, of } from 'rxjs';
import { FirebaseAuthentication } from './firebase-authentication';
import { FirebaseData, FIREBASEDATAPATHS } from './firebase-data';
import { user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private firebaseAuth: FirebaseAuthentication,
    private firebaseDS: FirebaseData

  ) { }

  canActivate(): Observable<boolean> {
    return this.firebaseAuth.getUser.pipe(
      switchMap(user => this.firebaseDS.getUserData(`${FIREBASEDATAPATHS.USERS}/${user?.uid}` || '')),
      map(appUser => !!appUser && appUser.isAdmin || false)
    )
  }
}
