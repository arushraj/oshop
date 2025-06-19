import { UserService } from '../services/user-service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(private userService: UserService) {
    // Constructor logic can go here
  }

  loginWithGoogle() {
    this.userService.authenticateWithGoogle();
  }
}
