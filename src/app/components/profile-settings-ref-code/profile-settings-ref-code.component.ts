import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-settings-ref-code',
  templateUrl: './profile-settings-ref-code.component.html',
  styleUrls: ['./profile-settings-ref-code.component.css']
})
export class ProfileSettingsRefCodeComponent implements OnInit {
  public textError = ''
  public status = false
  public showContent = false;
  public showLoading = false;

  constructor(
    public path: LinkPathService,
    public router: Router,
    public db: AngularFireDatabase,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.path.setPath('profileSettings');
    // GET SHOP PROFILE
    this.firestore.collection('user-seller').doc(this.auth.currentUserId).get()
    .subscribe(val => {
      var userSeller:any = val.data()
      if(userSeller.refCode == null){
        this.showContent = true
      }
    });
  }

  checkRefCode(refCode){
    if(refCode == ''){
      this.textError = 'กรุณาเพิ่มรหัสแนะนำ'
      this.status = false
    }
    else if(refCode == this.auth.currentUserId) {
      this.textError = 'กรุณาเพิ่มรหัสแนะนำที่ไม่ตรงกับรหัสแนะนำของคุณ'
      this.status = false
    }
    else {
      var _refCodeUpper:any =  refCode.toUpperCase()
      // CHECK REFCODE IN DB
      this.firestore.collection('user-seller', ref => ref
      .where('yourRefCode', '==', _refCodeUpper))
      .get().toPromise()
      .then((doc) => {
        if(doc.empty){
          this.textError = 'ข้อผิดพลาดรหัสแนะนำไม่ถูกต้อง'
          this.status = false
        }
        else{
          this.status = true
          this.textError = 'เพิ่มรหัสแนะนำคือ ' + String(_refCodeUpper);
        }
      })
    }
  }

  addRefCode(refCode){
    if(this.status){
      this.firestore.collection('user-seller').doc(this.auth.currentUserId).update({
        refCode: refCode.toUpperCase()
      });
      this.router.navigate([`/profile-settings`]);
    }
  }
  
}
