import { AppUser } from './../models/app-user';
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
  UserCredential
} from '@angular/fire/auth';
// import { setPersistence, browserSessionPersistence } from 'firebase/auth';
import { Observable } from 'rxjs';
import { FIREBASEDATAPATHS } from './firebase-datasource';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthentication {
  private user$: Observable<User | null>;

  constructor(private firebaseAuth: Auth, private userService: UserService) {
    // this.setSessionStoragePersistence();
    this.user$ = user(this.firebaseAuth);
  }

  // private setSessionStoragePersistence(): void {
  //   setPersistence(this.firebaseAuth, browserSessionPersistence);
  // }

  public get getUser(): Observable<User | null> {
    return this.user$;
  }

  public get getAuthState(): Observable<User | null> {
    return authState(this.firebaseAuth);
  }

  public googleAuth() {
    return signInWithPopup(this.firebaseAuth, new GoogleAuthProvider())
      .catch(error => {
        console.error('Google login failed:', error);
        throw error;
      })
      .finally(() => {
        const user: AppUser = {
          email: this.firebaseAuth.currentUser?.email || '',
          displayName: this.firebaseAuth.currentUser?.displayName || '',
          photoURL: this.firebaseAuth.currentUser?.photoURL || '',
          lastLogin: new Date().toISOString(),
          provider: 'google'
        }
        this.userService.updateData(FIREBASEDATAPATHS.USERS + this.firebaseAuth.currentUser?.uid, user);
      });
  }

  googleLogout() {
    return signOut(this.firebaseAuth)
      .catch(error => {
        console.error('Google logout failed:', error);
        throw error;
      })
      .finally(() => {
        sessionStorage.clear();
      });
  }

  loginWithEmail(email: string, password: string): Promise<UserCredential> {
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
