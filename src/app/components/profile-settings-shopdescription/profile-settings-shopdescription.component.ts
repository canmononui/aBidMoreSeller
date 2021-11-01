import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-settings-shopdescription',
  templateUrl: './profile-settings-shopdescription.component.html',
  styleUrls: ['./profile-settings-shopdescription.component.css']
})
export class ProfileSettingsShopdescriptionComponent implements OnInit {
  public textError = ''
  public status = false
  public showContent = false;
  public showLoading = false;
  public userSeller:any

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
      // var userSeller:any = val.data()
      if(val.data() != undefined){
        this.userSeller = val.data()
        this.showContent = true
      }
    });
  }

  checkShopDescription(shopDescription) {
    // console.log(shopDescription)
    if(shopDescription == '') {
      this.textError = 'กรุณาเพิ่มคำอธิบายร้านค้า';
      this.status = false;
    }
    else {
      // Check dbShopName == InputShopName
      // this.firestore.collection('shop', ref => ref.where('shopName', '==', shopDescription)).get()
      // .subscribe(val => {
      //   // console.log(val.size);
      //   if(val.size != 0){
      //     this.textError = 'ข้อผิดพลาดชื่อร้านค้านี้ถูกใช้งานบนระบบแล้ว';
      //     this.status = false;
      //   }
      //   else {
      //     this.textError = 'ต้องการเพิ่มชื่อร้านค้า ?';
      //     this.status = true;
      //   }
      // });
      this.textError = 'ต้องการเพิ่มคำอธิบายร้านค้า ?';
      this.status = true;
    }
  }

  addShopDescription(shopDescription) {
    console.log(shopDescription)
    if(this.status){
      this.firestore.collection('user-seller').doc(this.auth.currentUserId).update({
        shopDescription: shopDescription
      })
      .then(docRef => {
        this.firestore.collection('shop').doc(this.auth.currentUserId).update({
          shopDescription: shopDescription
        })
        .then(docRef => {
          this.router.navigate([`/profile-settings`]);
        })
      })
    }

  }

}
