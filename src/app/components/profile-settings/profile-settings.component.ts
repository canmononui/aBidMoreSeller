import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import firebase from 'firebase';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})

export class ProfileSettingsComponent implements OnInit {
  public showContent = false;
  public showLoading = false;
  public userSeller: any;
  public textError = '';
  public showModal = false;
  // public closeModal: any;
  public fileDocKey = '';
  public fileItems: any = null;
  public fileShowStatus = false;

  constructor(
    public path: LinkPathService,
    public router: Router,
    public db: AngularFireDatabase,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
  ) { }

  @ViewChild('closeModal') closeModal:ElementRef;

  ngOnInit(): void {
    this.path.setPath('profileSettings');
    // console.log(this.auth.currentUserId)
    // GET SHOP PROFILE
    this.firestore.collection('user-seller').doc(this.auth.currentUserId).valueChanges()
    .subscribe(val => {
      // console.log(val.data());
      this.userSeller = val;
      // console.log('userSeller > ', this.userSeller);
      // console.log(this.userSeller.profileImg.imgUrl);
      // if(this.userSeller.phoneNumberVerifyAt == null){
      //   this.router.navigate([`/update-user-seller`]);
      // }
      if(this.userSeller.profileImg.imgUrl == null){
        this.userSeller.profileImg.imgUrl = '/assets/img/profile-settings/store-icon.png';
      }
      if(this.userSeller.coverImg.imgUrl == null){
        this.userSeller.coverImg.imgUrl = './assets/img/profile-settings/store-img-cover.png';
      }
      if(!this.userSeller.checkStatus){
        if(this.userSeller.bookbank != null && this.userSeller.name != null && this.userSeller.lastName != null && this.userSeller.phoneNumber != null 
          && this.userSeller.shopAddress != null && this.userSeller.shopName != null && this.userSeller.shopDescription != null && this.userSeller.shopType != null){
            this.firestore.collection('user-seller').doc(this.auth.currentUserId).update({
              checkStatus: true
            });
            this.firestore.collection('shop').doc(this.auth.currentUserId).update({
              checkStatus: true
            });
        }
      }
      // this.showContent = true;
    });

    // FILE
    this.firestore.collection('user-seller').doc(this.auth.currentUserId).collection('linkFile', ref => ref
    .limit(1)
    ).snapshotChanges()
    .map(actions => {
      return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
    }).subscribe(items => {
      // console.log('items', items.length)
      if(items.length != 0){
        this.fileDocKey = items[0].key;
        this.fileItems = items[0].value
      }
      // console.log(this.fileItems)
      this.showContent = true;
    });
  }

  copyYourRefCode(){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.userSeller.yourRefCode;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  copyLinkYourRefCode(){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = 'https://merchant.abidmore.com/' + this.userSeller.yourRefCode;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  refCode(){
    // console.log('this.userSeller.uid : ',this.userSeller.uid);
    this.router.navigate([`/profile-settings-refCode`]);
  }

  info(){
    this.router.navigate([`/profile-settings-info`]);
  }

  shopName(){
    this.router.navigate([`/profile-settings-shopname`]);
  }

  shopDescription(){
    this.router.navigate([`/profile-settings-shopdescription`]);
  }

  profileImg(){
    this.router.navigate([`/profile-settings-profileimg`]);
  }

  coverImg(){
    this.router.navigate([`/profile-settings-coverimg`]);
  }

  bookBank(){
    this.router.navigate([`/profile-settings-bookbank`]);
  }

  deleteBank(){
    // DELETE FILE BOOK BANK IN FIRESTORAGE
    if(this.fileItems.bookBank != null){
      this.storage.storage.refFromURL(this.fileItems.bookBank).delete()
    }
    // UPDATE BOOK BANK IMG URL SUB COLLECTION LINKFILE = NULL
    this.firestore.collection('user-seller').doc(this.auth.currentUserId).collection('linkFile').doc(this.fileDocKey).update({
      bookBank: null
    });
    // UPDATE USER SELLER BOOK BANK = NULL & CHECKSTATUS = FALSE
    this.firestore.collection('user-seller').doc(this.auth.currentUserId).update({
      bookbank: null,
      checkStatus: false
    });
    // UPDATE SHOP CHECKSTATUS = FALSE
    this.firestore.collection('shop').doc(this.auth.currentUserId).update({
      checkStatus: false
    });
  }

  shopAddress(){
    this.router.navigate([`/profile-settings-shopaddress/${this.userSeller.uid}`]);
  }

  shopFile(){
    this.router.navigate([`/profile-settings-shopfile/${this.userSeller.uid}`]);
  }

  editShopName(shopName) {
    // console.log('Func editShopName')
    // console.log(shopName)
    // Check dbShopName == InputShopName
    this.firestore.collection('shop', ref => ref.where('shopName', '==', shopName)).get()
    .subscribe(val => {
      // console.log(val.size);
      if(val.size != 0){
        this.textError = 'ข้อผิดพลาดชื่อร้านค้านี้ถูกใช้งานบนระบบแล้ว';
        // console.log('ข้อผิดพลาดชื่อร้านค้านี้ถูกใช้งานบนระบบแล้ว')
        // this.showModal = false;
        // this.closeModal.nativeElement.click(); 
      }
      else {
        // SAVE NEW SHOP NAME
        // console.log('SAVE')
        // this.showModal = true;
        this.closeModal.nativeElement.click(); 

      }
    });
  }


  showFile(){
    if(this.fileShowStatus){
      this.fileShowStatus = false
    }
    else {
      this.fileShowStatus = true
    }
  }


    
}
