import { Component, OnInit } from '@angular/core';
// FIREBASE
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import firebase from 'firebase';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  public email: any

  constructor(
    public firestore: AngularFirestore,
    public auth: AuthService,
    private router: Router,
  ) {
    auth.getCurrentLoggedIn();
  }

  ngOnInit(): void {
    this.email = window.localStorage.getItem('emailForSignIn');
    if (!this.email) {
      this.router.navigate(['/login'])
    }
    else {
      this.auth.signInWithEmailLink(this.email, this.router.url)
        .then((user) => {
          window.localStorage.removeItem('emailForSignIn');
          this.firestore.collection('user-seller').doc(user.user.uid).update({
            emailVerifyAt: firebase.firestore.Timestamp.now(),
            shopStatus: 'waitingPhoneNumberVerify',
          })
          .then(() => {
            this.firestore.collection('shop').doc(user.user.uid).update({
              emailVerifyAt: firebase.firestore.Timestamp.now(),
              shopStatus: 'waitingPhoneNumberVerify',
            })
            .then(() => {
              this.router.navigate([`/update-user-seller`])
            })
          })
        })
        .catch((error) => {
          if (error) {
            this.router.navigate(['/login'])
          }
        });
    }
  }
}
