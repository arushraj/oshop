import { Injectable } from '@angular/core';
import { AppUser } from '../models/app-user';
import { FIREBASEDATAPATHS, FirebaseDatasource } from './firebase-datasource';
import { FirebaseAuthentication } from './firebase-authentication';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService extends FirebaseDatasource<AppUser> {

  constructor(
    private firebaseAuth: FirebaseAuthentication,
    private router: Router,
    private route: ActivatedRoute) {
    super(FIREBASEDATAPATHS.USERS);

    this.firebaseAuth.getUser.pipe(
      switchMap(user => !!user && this.getItem(user.uid) || of(null)),
      map((appUser) => !!appUser && appUser || null))
      .subscribe(appUser => this.authenticatedUser = appUser);

    this.getChildChanges()
      .subscribe(({ value }) => this.authenticatedUser = value || null);
  }

  readonly _appUser = new BehaviorSubject<AppUser | null>(null);

  get authenticatedUser(): Observable<AppUser | null> {
    return this._appUser.asObservable();
  }

  set authenticatedUser(user: AppUser | null) {
    this._appUser.next(user);
  }

  public async authenticateWithGoogle() {
    // Implement Google login logic here
    console.log('Logging in with Google...');
    return this.firebaseAuth.googleAuth()
      .finally(() => {
        const user: AppUser = {
          email: this.firebaseAuth.currentUser?.email || '',
          displayName: this.firebaseAuth.currentUser?.displayName || '',
          photoURL: this.firebaseAuth.currentUser?.photoURL || '',
          lastLogin: new Date().toISOString(),
          provider: 'google'
        }
        this.updateData(
          FIREBASEDATAPATHS.USERS + this.firebaseAuth.currentUser?.uid,
          user,
          {
            message: `Login successful! You are now signed in with your Google account. Signed in as ${user.email}`,
            config: { duration: 5000 }
          });
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        if (returnUrl)
          this.router.navigateByUrl(returnUrl);
      });
  }

  public async logoutWithGoogle() {
    return this.firebaseAuth.googleLogout()
      .finally(() => {
        this._snackBar.open(
          'You have been logged out. See you again soon!',
          'Close',
          { duration: 3000 }
        );
        this.router.navigateByUrl('/')
      });
  }


}
