import { Component, OnInit } from '@angular/core';
import { FirebaseAuthentication } from './services/firebase-authentication';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {

  constructor(private firebaseAuth: FirebaseAuthentication,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.firebaseAuth.getAuthState
      .subscribe((user) => {
        if (user) {
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          if (returnUrl)
            this.router.navigateByUrl(returnUrl);
        }
      });
  }
}
