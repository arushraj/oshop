import { map, Observable, of, switchMap } from 'rxjs';
import { AppUser } from '../models/app-user';
import { FirebaseData, FIREBASEDATAPATHS } from '../services/firebase-data';
import { FirebaseAuthentication } from './../services/firebase-authentication';
import { Component } from '@angular/core';
import { User } from 'firebase/auth';

@Component({
  selector: 'bs-navbar',
  standalone: false,
  templateUrl: './bs-navbar.html',
  styleUrl: './bs-navbar.css'
})
export class BsNavbar {

  constructor(private firebaseAuth: FirebaseAuthentication,
    private firebaseDS: FirebaseData) {
    this._appUser = this.firebaseAuth.getUser.pipe(
      switchMap(user => !!user && this.firebaseDS.getUserData(`${FIREBASEDATAPATHS.USERS}/${user?.uid}` || '') || of(null)),
      map(user => user || null)
    );

  }

  private _appUser: Observable<AppUser | null> = of(null);
  isDropdownOpen = false;

  get currentUser(): Observable<AppUser | null> {
    return this._appUser
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    // Implement logout logic here
    console.log('Logging out...');
    this.firebaseAuth.googleLogout();
  }
}
