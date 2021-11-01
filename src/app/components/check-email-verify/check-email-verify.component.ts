import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-email-verify',
  templateUrl: './check-email-verify.component.html',
  styleUrls: ['./check-email-verify.component.css']
})
export class CheckEmailVerifyComponent implements OnInit {

  constructor(
    public router: Router,  
    public storage: AngularFireStorage,
    public auth: AuthService,
    // public loadingCon: LoadingComponent,
  ) { 
    auth.getCurrentLoggedIn();
  }

  ngOnInit(): void {
    // this.auth.signOut()
  }

  gotoHome(){
    this.router.navigate(['/login'])
  }

}
