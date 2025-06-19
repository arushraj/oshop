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
      switchMap(user => !!user && this.userService.getItem(user.uid) || of(null)),
      map((appUser) => !!appUser && appUser.isAdmin || false)
    )
  }
}
