import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, switchMap, map, of } from 'rxjs';
import { FirebaseAuthentication } from './firebase-authentication';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private firebaseAuth: FirebaseAuthentication,
    private userService: UserService

  ) { }

  canActivate(): Observable<boolean> {
    return this.firebaseAuth.getUser.pipe(
      switchMap(user => this.userService.getData(user?.uid)),
      map(appUser => {
        if (!Array.isArray(appUser) && appUser) {
          return !!appUser && appUser.isAdmin || false;
        } else {
          console.error('App user data is not valid:', appUser);
          return false;
        }
      })
    )
  }
}
