import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-settings-info',
  templateUrl: './profile-settings-info.component.html',
  styleUrls: ['./profile-settings-info.component.css']
})
export class ProfileSettingsInfoComponent implements OnInit {
  public textError = ''
  public status = false
  public showContent = false;
  public showLoading = false;
  public userSeller: any;
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
      var a: any = val.data()
      if(a.name == null || a.lastName == null || a.phoneNumber == null){
        this.userSeller = val.data()
        this.showContent = true
      }
    });
  }

  checkInfo(name, lastName, phoneNumber){
    if(name == ''){
      this.textError = 'กรุณาเพิ่มชื่อ'
      this.status = false
    }
    else if(lastName == ''){
      this.textError = 'กรุณาเพิ่มนามสกุล'
      this.status = false
    }
    else if(phoneNumber == ''){
      this.textError = 'กรุณาเพิ่มหมายเลขโทรศัพท์'
      this.status = false
    }
    else {
      // Check dbPhoneNumber == InputPhoneNumber
      this.firestore.collection('user-seller', ref => ref.where('phoneNumber', '==', phoneNumber)).get()
      .subscribe(val => {
        // console.log(val.size);
        if(val.size >= 3){
          this. textError = 'ข้อผิดพลาดหมายเลขโทรศัพท์ถูกใช้งานบนระบบเกินแล้ว';
          this.status = false
        }
        else {
          this.textError = 'ต้องการเพิ่มข้อมูลผู้สมัคร ?'
          this.status = true
        }
      });
    }
  }

  addInfo(name, lastName, phoneNumber){
    if(this.status){
      this.firestore.collection('user-seller').doc(this.auth.currentUserId).update({
        name: name,
        lastName: lastName,
        phoneNumber: phoneNumber,
      })
      .then(docRef => {
        this.router.navigate([`/profile-settings`]);
      })
    }
  }

}
