import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
// CropImg
import { ImageCroppedEvent, ImageCropperComponent } from "ngx-image-cropper";

@Component({
  selector: 'app-profile-settings-coverimg',
  templateUrl: './profile-settings-coverimg.component.html',
  styleUrls: ['./profile-settings-coverimg.component.css']
})
export class ProfileSettingsCoverimgComponent implements OnInit {
  public textError = '';
  public status = false;
  public showContent = false
  public showLoading = false
  public userSeller:any
  public imageChangedEvent: any = "";
  croppedImage: any = "";
  public imgURL: any = '';
  task: AngularFireUploadTask;
  public oldCoverImg = '';

  constructor(    public path: LinkPathService,
    public router: Router,
    public db: AngularFireDatabase,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
    ) { }

  ngOnInit(): void {
    this.path.setPath('profileSettings');
    // GET SHOP PROFILE
    this.firestore.collection('user-seller').doc(this.auth.currentUserId).valueChanges()
    .subscribe(val => {
      // console.log(val.data());
      this.userSeller = val
      
      // console.log(this.userSeller);
      // console.log(this.userSeller.profileImg.imgUrl);

      if(this.userSeller.coverImg.imgUrl == null){
        this.userSeller.coverImg.imgUrl = './assets/img/profile-settings/store-img-cover.png';
      }
      else {
        this.oldCoverImg = this.userSeller.coverImg.imgUrl
      }
      this.showContent = true;
    });
  }


  // Input Img File
  fileChangeEvent(event: any): void {
    // console.log(event);
    this.imageChangedEvent = event;
  }

  // Crop
  imageCropped(event: ImageCroppedEvent) {
    // console.log(event);
    this.croppedImage = event.base64;
  }

  // Button OK
  setProductImg() {
    // console.log(this.croppedImage);
    // Set Img
    if (this.croppedImage != "") {
      this.imgURL = this.croppedImage;
      this.userSeller.coverImg.imgUrl = this.croppedImage;
    }
  }

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }

  checkCoverImg() {
    if(this.imgURL != ''){
      this.textError = 'บันทึกรูปปกร้านค้า ?';
      this.status = true;
    }
    else {
      this.textError = 'กรุณาเพิ่มรูปปกร้านค้าที่ต้องการเปลี่ยนแปลง';
      this.status = false;
    }
  }

  addCoverImg() {
    // console.log(this.imgURL)
    if(this.status){
      this.showContent = false;
      this.showLoading = true;
      var blob = this.dataURItoBlob(this.imgURL);
      // console.log(blob);
      var file = new File([blob], "imgProduct.png", {
        type: "image/png"
      });
      // console.log(file);
      // this.imgProductArray.push(file);
      // console.log('oldCoverImg >',this.oldCoverImg);
      // DELETE OLD FILE
      if(this.oldCoverImg != ''){
        this.storage.storage.refFromURL(this.oldCoverImg).delete();
      }
      // UPLOAD NEW FILE
      const imgpath = `coverImg/${new Date().getTime()}_${this.auth.currentUserId}_shopImg.png`;
      this.task = this.storage.upload(imgpath, file)
      const imgRef = this.storage.ref(imgpath);
      this.task.snapshotChanges().pipe(
        finalize(() => {
          imgRef.getDownloadURL().subscribe(url => {
            const getFileUrl = url;
            this.firestore.collection('user-seller').doc(this.auth.currentUserId).update({
              coverImg: {
                imgUrl: getFileUrl,
                imgpath: imgpath
              }
            })
            .then(docRef => {
              this.firestore.collection('shop').doc(this.auth.currentUserId).update({
                coverImg: {
                  imgUrl: getFileUrl,
                  imgpath: imgpath
                }
              })
              .then(docRef => {
                this.router.navigate([`/profile-settings`]);
              })
            })
          });
        }))
      .subscribe();
    }
  }

}
