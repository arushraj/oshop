import { map, switchMap } from 'rxjs';
import { AppUser } from '../models/app-user';
import { FirebaseData, FIREBASEDATAPATHS } from '../services/firebase-data';
import { FirebaseAuthentication } from './../services/firebase-authentication';
import { Component } from '@angular/core';

@Component({
  selector: 'bs-navbar',
  standalone: false,
  templateUrl: './bs-navbar.html',
  styleUrl: './bs-navbar.css'
})
export class BsNavbar {

  constructor(private firebaseAuth: FirebaseAuthentication,
    private firebaseDS: FirebaseData) {
    this.firebaseAuth.getUser.pipe(
      switchMap(user => this.firebaseDS.getData(`${FIREBASEDATAPATHS.USERS}/${user?.uid}` || '')),
      map(user => user)
    ).subscribe(user => this.appUser = !!user && user || null);

  }

  appUser: AppUser | null = null;
  isDropdownOpen = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    // Implement logout logic here
    console.log('Logging out...');
    this.firebaseAuth.googleLogout();
  }
}
