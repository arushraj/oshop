import { Injectable } from '@angular/core';
import { FirebaseAuthentication } from './firebase-authentication';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private firebaseAuth: FirebaseAuthentication,
    private route: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.firebaseAuth.getUser.pipe(
      map(user => {
        if (user) {
          return true
        } else {
          this.route.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }
      })
    );
  }
}
