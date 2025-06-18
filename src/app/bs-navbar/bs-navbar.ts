import { UserService } from './../services/user-service';
import { Observable, of, ReplaySubject } from 'rxjs';
import { AppUser } from '../models/app-user';
import { FirebaseAuthentication } from './../services/firebase-authentication';
import { Component } from '@angular/core';

@Component({
  selector: 'bs-navbar',
  standalone: false,
  templateUrl: './bs-navbar.html',
  styleUrl: './bs-navbar.css'
})
export class BsNavbar {

  constructor(
    private firebaseAuth: FirebaseAuthentication,
    private userService: UserService) {
    this.firebaseAuth.getUser.subscribe(user => {
      if (user) {
        this.userService.getData(user.uid).then(appUser => {
          if (appUser && !Array.isArray(appUser)) {
            this.currentUser = appUser as AppUser;
          } else {
            console.error('App user data is not valid:', appUser);
            this.currentUser = null;
          }
        })
      }
    });

  }

  readonly _appUser = new ReplaySubject<AppUser | null>();

  get currentUser(): Observable<AppUser | null> {
    return this._appUser;
  }

  set currentUser(user: AppUser | null) {
    if (user) {
      this._appUser.next(user);
    }
    else {
      this._appUser.next(null);
    }
  }

  logout() {
    // Implement logout logic here
    console.log('Logging out...');
    this.firebaseAuth.googleLogout();
  }
}
