import { Component, OnInit } from '@angular/core';
// FIREBASE
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore  } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public showContent = true;
  public showFromLogin = true;
  public showForgotPass = false;
  public status = false;
  public textError = 'ต้องการเปลี่ยนรหัสผ่าน ?';
  public emailForResetPass: any;
  public resetPassStatus = false;
  public idRefCode;

  constructor(
    private db: AngularFireDatabase, 
    public firestore: AngularFirestore, 
    private storage: AngularFireStorage, 
    public auth: AuthService,
    private route: ActivatedRoute, 
    private router: Router
    ) { 
      auth.getCurrentLoggedIn();
    }

  ngOnInit(): void {
    this.idRefCode = this.route.snapshot.paramMap.get("id");
    // console.log(this.router.url)
    // this.auth.signInWithEmailLink('suthads56@gmail.com', this.router.url)
  }

  forgotPass() {
    this.showFromLogin = false;
    this.showForgotPass = true;
  }
  backWard() {
    this.showFromLogin = true;
    this.showForgotPass = false;
  }

  submitLogin(email , password) {
    // this.showContent = false
    this.auth.emailLogin(email, password)
  }

  facebookLogin(){
    this.auth.facebookLogin(this.idRefCode);
  }

  googleLogin(){
    this.auth.googleLogin(this.idRefCode);
  }

  resetPass(email) {
    // console.log(email)
    if(email != ''){
      this.emailForResetPass = email
      this.textError = 'ต้องการเปลี่ยนรหัสผ่าน ?'
      this.status = true
    }
    else {
      this.status = false
      this.textError = 'กรุณาเพิ่ม Email'
    }
    
  }

  firebaseResetPass() {
    if(this.status){
      this.status = false
      this.resetPassStatus = false
      this.textError = 'Loading...'
      this.auth.resetPassword(this.emailForResetPass)
      .then(() => {
        this.textError = 'โปรดกดยืนยันการเปลี่ยนรหัสผ่านใน Email: ' + this.emailForResetPass
        this.resetPassStatus = true
        this.backWard()
      })
      .catch((error) => {
        if(error){
          this.textError = 'Email ไม่ถูกต้องหรือไม่มีอยู่บนระบบนี้'
          this.resetPassStatus = true
        }
      })
    }
  }

}
