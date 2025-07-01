import { IUser } from '../models/user'
import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  user,
  User,
  UserCredential,
  setPersistence,
  browserSessionPersistence
} from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthentication {
  private user$: Observable<User | null>;

  constructor(private firebaseAuth: Auth) {
    this.setSessionStoragePersistence();
    this.user$ = user(this.firebaseAuth);
  }

  private setSessionStoragePersistence(): void {
    setPersistence(this.firebaseAuth, browserSessionPersistence);
  }

  public get getUser(): Observable<User | null> {
    return this.user$;
  }

  public get getAuthState(): Observable<User | null> {
    return authState(this.firebaseAuth);
  }

  public async googleAuth(): Promise<UserCredential> {
    return signInWithPopup(this.firebaseAuth, new GoogleAuthProvider())
      .catch(error => {
        console.error('Google login failed:', error);
        throw error;
      });
  }

  public async googleLogout() {
    return signOut(this.firebaseAuth)
      .catch(error => {
        console.error('Google logout failed:', error);
        throw error;
      })
      .finally(() => {
        sessionStorage.clear();
      });
  }

  public async loginWithEmail(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .catch(error => {
        console.error('Login failed:', error);
        throw error;
      })
      .finally(() => {
      });
  }

  public get currentUser() {
    return this.firebaseAuth.currentUser;
  }

}
