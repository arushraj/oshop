import { UserService } from './../services/user-service';
import { Component } from '@angular/core';

@Component({
  selector: 'bs-navbar',
  standalone: false,
  templateUrl: './bs-navbar.html',
  styleUrl: './bs-navbar.css'
})
export class BsNavbar {

  constructor(
    private userService: UserService) {
  }

  get currentUser() {
    return this.userService.authenticatedUser;
  }


  logout() {
    // Implement logout logic here
    this.userService.logoutWithGoogle();
  }
}
