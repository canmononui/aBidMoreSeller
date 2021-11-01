import { Component, OnInit, ViewChild } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
// CROP IMG
import { ImageCroppedEvent, ImageCropperComponent } from "ngx-image-cropper";

@Component({
  selector: 'app-return-products-argue-request',
  templateUrl: './return-products-argue-request.component.html',
  styleUrls: ['./return-products-argue-request.component.css']
})
export class ReturnProductsArgueRequestComponent implements OnInit {

  public id;
  // PRODUCT IMG
  public imgURL1: any = './assets/img/productThumbnail.png';
  public imgURL2: any = './assets/img/productThumbnail.png';
  public imgURL3: any = './assets/img/productThumbnail.png';
  public imgURL4: any = './assets/img/productThumbnail.png';
  public imgURL5: any = './assets/img/productThumbnail.png';
  public imgDisabled1 = false;
  public imgDisabled2 = true;
  public imgDisabled3 = true;
  public imgDisabled4 = true;
  public imgDisabled5 = true;
  public imageChangedEvent: any = "";
  croppedImage: any = "";
  public imgProductArray: any = [];
  public imgProductArrayURL: any = [];
  public imgURL: any;
  public textError = '';
  public status = false;
  task: AngularFireUploadTask;

  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;

  constructor(
    public path: LinkPathService,
    public router: Router,
    private route: ActivatedRoute,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.path.setPath('returnProducts');
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      console.log(this.id)
      // this.productDataKey();
    }
  }

  submit(argueInput) {
    if (argueInput != '') {
      if (this.imgURL1 == './assets/img/productThumbnail.png' && this.imgURL2 == './assets/img/productThumbnail.png' && this.imgURL3 == './assets/img/productThumbnail.png' && this.imgURL4 == './assets/img/productThumbnail.png' && this.imgURL5 == './assets/img/productThumbnail.png') {
        // console.log('No IMG one');
        this.textError = 'กรุณาเพิ่มภาพสินค้าอย่างน้อย 1 ภาพ';
        this.status = false;
      }
      else {
        this.textError = 'ต้องการบันทึกข้อมูลสำหรับการโต้แย้ง ?'
        this.status = true;
      }
    }
    else {
      this.textError = 'กรุณาเพิ่มข้อมูลให้ครบถ้วน'
      this.status = false;
    }
    // this.router.navigate([`/return-products-detail/${this.id}`]);
  }

  argueInput(argueInput) {
    // console.log(shopDescription)
    if (this.status) {
      // Check Img Producl Null
      if (this.imgURL1 != './assets/img/productThumbnail.png') {
        var blob = this.dataURItoBlob(this.imgURL1);
        var file = new File([blob], "imgProduct.png", {
          type: "image/png"
        });
        this.imgProductArray.push(file);
      }
      if (this.imgURL2 != './assets/img/productThumbnail.png') {
        var blob = this.dataURItoBlob(this.imgURL2);
        var file = new File([blob], "imgProduct.png", {
          type: "image/png"
        });
        this.imgProductArray.push(file);
      }
      if (this.imgURL3 != './assets/img/productThumbnail.png') {
        var blob = this.dataURItoBlob(this.imgURL3);
        var file = new File([blob], "imgProduct.png", {
          type: "image/png"
        });
        this.imgProductArray.push(file);
      }
      if (this.imgURL4 != './assets/img/productThumbnail.png') {
        var blob = this.dataURItoBlob(this.imgURL4);
        var file = new File([blob], "imgProduct.png", {
          type: "image/png"
        });
        this.imgProductArray.push(file);
      }
      if (this.imgURL5 != './assets/img/productThumbnail.png') {
        var blob = this.dataURItoBlob(this.imgURL5);
        var file = new File([blob], "imgProduct.png", {
          type: "image/png"
        });
        this.imgProductArray.push(file);
      }

      // UPLOAD IMG
      // UPLOAD IMG 1
      const imgpath = `return-products/${new Date().getTime()}_${this.auth.currentUserId}_imgProduct1.png`;
      this.task = this.storage.upload(imgpath, this.imgProductArray[0])
      const imgRef = this.storage.ref(imgpath);
      this.task.snapshotChanges().pipe(
        finalize(() => {
          imgRef.getDownloadURL().subscribe(url => {
            const getFileUrl = url;
            this.imgProductArrayURL.push({
              imgpath: imgpath,
              imgUrl: getFileUrl
            });
            // UPLOAD IMG 2
            if (this.imgProductArray[1]) {
              const imgpath = `return-products/${new Date().getTime()}_${this.auth.currentUserId}_imgProduct2.png`;
              this.task = this.storage.upload(imgpath, this.imgProductArray[1])
              const imgRef = this.storage.ref(imgpath);
              this.task.snapshotChanges().pipe(
                finalize(() => {
                  imgRef.getDownloadURL().subscribe(url => {
                    const getFileUrl = url;
                    this.imgProductArrayURL.push({
                      imgpath: imgpath,
                      imgUrl: getFileUrl
                    });
                    // UPLOAD IMG 3
                    if (this.imgProductArray[2]) {
                      const imgpath = `return-products/${new Date().getTime()}_${this.auth.currentUserId}_imgProduct3.png`;
                      this.task = this.storage.upload(imgpath, this.imgProductArray[2])
                      const imgRef = this.storage.ref(imgpath);
                      this.task.snapshotChanges().pipe(
                        finalize(() => {
                          imgRef.getDownloadURL().subscribe(url => {
                            const getFileUrl = url;
                            this.imgProductArrayURL.push({
                              imgpath: imgpath,
                              imgUrl: getFileUrl
                            });
                            // UPLOAD IMG 4
                            if (this.imgProductArray[3]) {
                              const imgpath = `return-products/${new Date().getTime()}_${this.auth.currentUserId}_imgProduct4.png`;
                              this.task = this.storage.upload(imgpath, this.imgProductArray[3])
                              const imgRef = this.storage.ref(imgpath);
                              this.task.snapshotChanges().pipe(
                                finalize(() => {
                                  imgRef.getDownloadURL().subscribe(url => {
                                    const getFileUrl = url;
                                    this.imgProductArrayURL.push({
                                      imgpath: imgpath,
                                      imgUrl: getFileUrl
                                    });
                                    // UPLOAD IMG 5
                                    if (this.imgProductArray[4]) {
                                      const imgpath = `return-products/${new Date().getTime()}_${this.auth.currentUserId}_imgProduct5.png`;
                                      this.task = this.storage.upload(imgpath, this.imgProductArray[4])
                                      const imgRef = this.storage.ref(imgpath);
                                      this.task.snapshotChanges().pipe(
                                        finalize(() => {
                                          imgRef.getDownloadURL().subscribe(url => {
                                            const getFileUrl = url;
                                            this.imgProductArrayURL.push({
                                              imgpath: imgpath,
                                              imgUrl: getFileUrl
                                            });
                                            // CHECK ADD CALL FUNCTION
                                            if (this.imgProductArrayURL.length == this.imgProductArray.length) {
                                              this.update(argueInput)
                                            }
                                          });
                                        }))
                                        .subscribe();
                                      // UPLOAD IMG 3
                                    }
                                    else { this.update(argueInput) }
                                  });
                                }))
                                .subscribe();
                              // UPLOAD IMG 3
                            }
                            else { this.update(argueInput) }
                          });
                        }))
                        .subscribe();
                      // UPLOAD IMG 3
                    }
                    else { this.update(argueInput) }
                  });
                }))
                .subscribe();
              // UPLOAD IMG 3
            }
            else { this.update(argueInput) }

          });
        }))
        .subscribe();
    }
  }

  update(argueInput){
    this.firestore.collection('order').doc(this.id).update({
      'returnProduct.sellerArgueAt': firebase.firestore.Timestamp.now(),
      'returnProduct.sellerArgueImg': this.imgProductArrayURL,
      'returnProduct.sellerArgueDes': argueInput,
      'returnProduct.status': 'sellerArgueRequest',
    })
    .then(docRef => {
      this.router.navigate([`/return-products-detail/${this.id}`]);
    })
    .catch(error => {
      console.error("Error adding document: ", error)
    })
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

  setProductImg1() {
    if (this.croppedImage != "") {
      this.imgURL1 = this.croppedImage;
      this.imgDisabled2 = false;
    }
  }

  setProductImg2() {
    if (this.croppedImage != "") {
      this.imgURL2 = this.croppedImage;
      this.imgDisabled3 = false;
    }
  }

  setProductImg3() {
    if (this.croppedImage != "") {
      this.imgURL3 = this.croppedImage;
      this.imgDisabled4 = false;
    }
  }

  setProductImg4() {
    if (this.croppedImage != "") {
      this.imgURL4 = this.croppedImage;
      this.imgDisabled5 = false;
    }
  }

  setProductImg5() {
    if (this.croppedImage != "") {
      this.imgURL5 = this.croppedImage;
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

  deleteProductImg1() {
    this.imgURL1 = './assets/img/productThumbnail.png';
  }

  deleteProductImg2() {
    this.imgURL2 = './assets/img/productThumbnail.png';
  }

  deleteProductImg3() {
    this.imgURL3 = './assets/img/productThumbnail.png';
  }

  deleteProductImg4() {
    this.imgURL4 = './assets/img/productThumbnail.png';
  }

  deleteProductImg5() {
    this.imgURL5 = './assets/img/productThumbnail.png';
  }

}
