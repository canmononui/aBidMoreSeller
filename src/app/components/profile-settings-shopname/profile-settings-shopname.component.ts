import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-settings-shopname',
  templateUrl: './profile-settings-shopname.component.html',
  styleUrls: ['./profile-settings-shopname.component.css']
})
export class ProfileSettingsShopnameComponent implements OnInit {
  public textError = ''
  public status = false
  public showContent = false;
  public showLoading = false;
  public userSeller:any
  public shopNameLength = 0;
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
        if(this.userSeller.shopName != null){
          this.shopNameLength = this.userSeller.shopName.length
        }
        this.showContent = true
      }
    });
  }

  shopNameInput($event): void {
    this.shopNameLength = Number($event.target.value.length)
  }

  checkShopName(shopName) {
    if(shopName == '') {
      this.textError = 'กรุณาเพิ่มชื่อร้านค้า';
      this.status = false;
    }
    else if(this.shopNameLength < 6) {
      this.textError = 'ชื่อร้านค้าต้องมีความยาวมากกว่า 5 ตัวอักษร';
    }
    else {
      // Check dbShopName == InputShopName
      this.firestore.collection('shop', ref => ref.where('shopName', '==', shopName)).get()
      .subscribe(val => {
        if(val.size != 0){
          this.textError = 'ข้อผิดพลาดชื่อร้านค้านี้ถูกใช้งานบนระบบแล้ว';
          this.status = false;
        }
        else {
          this.textError = 'ต้องการเพิ่มชื่อร้านค้า ?';
          this.status = true;
        }
      });
    }
  }

  addShopName(shopName) {
    if(this.status){
      this.firestore.collection('user-seller').doc(this.auth.currentUserId).update({
        shopName: shopName
      })
      .then(docRef => {
        this.firestore.collection('shop').doc(this.auth.currentUserId).update({
          shopName: shopName
        })
        .then(docRef => {
          this.router.navigate([`/profile-settings`]);
        })
      })
    }

  }

}
