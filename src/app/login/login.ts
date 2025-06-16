import { FirebaseAuthentication } from './../services/firebase-authentication';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(private firebaseAuth: FirebaseAuthentication) {
    // Constructor logic can go here
  }

  loginWithGoogle() {
    // Implement Google login logic here
    console.log('Logging in with Google...');
    this.firebaseAuth.googleAuth();
  }
}
