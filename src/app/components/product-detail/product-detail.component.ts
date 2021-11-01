import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
// DATEPICKER
import { NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public id;
  public productData: any;
  public showContent = false;
  public imgUrl = '';
  public aaa: any;

  constructor(
    private calendar: NgbCalendar, 
    public formatter: NgbDateParserFormatter,
    public path: LinkPathService,
    private route: ActivatedRoute,
    public router: Router,
    public db: AngularFireDatabase,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.path.setPath('productList');
    this.id = this.route.snapshot.paramMap.get("id");
    if(this.id){
        this.productDataKey();
    }
  }

  copyProductKey(){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.id;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  productDataKey() {
    // this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product').doc(this.id).collection('history', ref => ref
    // .orderBy('createAt', 'desc')
    // .limit(1)
    // ).snapshotChanges()
    // .map(actions => {
    //   return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
    // }).subscribe(items => {
    //   // console.log('items : ',items);
    //   if(items.length != 0) {
    //   // console.log('IF');
    //   this.productData = items[0].value;
    //   this.showContent = true;
    //   }
    //   else {
    //     // console.log('ELSE');
    //     this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product').doc(this.id).get()
    //     .subscribe(val => {
    //       // console.log(val.data());
    //       if(val.data() != undefined){
    //         this.productData = val.data();
    //         // console.log(this.productData);
    //         this.showContent = true;
    //       }
    //     });
    //   }
    // });

    this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product').doc(this.id).get()
    .subscribe(val => {
      // console.log(val.data());
      if(val.data() != undefined){
        this.productData = val.data();
        // SET HR
        if(this.productData.dateTime.timeBidCount.hour < 10){
          this.productData.dateTime.timeBidCount.hour = '0' + this.productData.dateTime.timeBidCount.hour.toString();
        }
        else{
          this.productData.dateTime.timeBidCount.hour.toString();
        }
        // SET MIN
        if(this.productData.dateTime.timeBidCount.minute < 10){
          this.productData.dateTime.timeBidCount.minute = '0' + this.productData.dateTime.timeBidCount.minute.toString();
        }
        else{
          this.productData.dateTime.timeBidCount.minute.toString();
        }
        // SET SEC
        if(this.productData.dateTime.timeBidCount.second < 10){
          this.productData.dateTime.timeBidCount.second = '0' + this.productData.dateTime.timeBidCount.second.toString();
        }
        else{
          this.productData.dateTime.timeBidCount.second.toString();
        }
        
        // console.log(this.productData);
        this.showContent = true;
      }
    });
  }

  popUpImg(imgUrl){
    this.imgUrl = imgUrl;
  }

  goToEditProduct(){
    // console.log('this.id : ',this.id);
    this.router.navigate([`/product-edit/${this.id}`]);
  }

  deleteProduct(){
    // console.log(this.id)

    // ----------------------- NO DELETE DATA IN SUB COL 'history' BUT UPDATE PRODUCT STATUS > 'deleted' -----------------------
    // // CREATE VARIABLE ARRAY imgUrlProductData
    // var imgUrlProductData:any = [];
    // // SET OLD IMG PRODUCT
    // for (var i = 0; i < this.productData.imgProduct.length; i++){
    //   imgUrlProductData.push(this.productData.imgProduct[i].imgUrl)
    // }
    // // CREATE VARIABLE ARRAY imgUrlForCompare
    // var imgUrlForCompare:any = [];
    // // GET DATA SUB COL 'histroy'
    // this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product').doc(this.id).collection('history')
    // .get().toPromise()
    // .then((querySnapshot: any) => {
    //   querySnapshot.forEach((doc: any) => {
    //     // console.log(doc.id, " => ", doc.data());
    //     for (var i = 0; i < doc.data().imgProduct.length; i++){
    //       console.log(i, ' > ' , doc.data().imgProduct[i].imgUrl);
    //       if (!imgUrlForCompare.includes(doc.data().imgProduct[i].imgUrl) && !imgUrlProductData.includes(doc.data().imgProduct[i].imgUrl)) {
    //         imgUrlForCompare.push(doc.data().imgProduct[i].imgUrl)
    //       }
    //     }
    //     // DELETE DOC IN SUB COL 'history'
    //     this.firestore.collection(`/shop/${this.auth.currentUserId}/product/${this.id}/history/`).doc(doc.id).delete();
    //   });
    // });
    // // DELETE IMG PRODUCT IN STORAGE
    // for (var i = 0; i < imgUrlForCompare.length; i++){
    //   this.storage.storage.refFromURL(imgUrlForCompare[i]).delete();
    // }

    // UPDATE DOC PRODUCT IN COL 'product'
    this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product').doc(this.id).update({
      updateAt: firebase.firestore.Timestamp.now(),
      productStatus: 'deleted'
    })
    .then(docRef => {
      this.router.navigate([`/product-list`]);
    })
    .catch(error => {
      console.error("Error adding document: ", error)
    })
  }

  gotoProductDescription(){
    // https://abidmore.com/product-description/FML6Rw11oO4xj6CtFMlw
    // DOC KEY IN COLLECTION PRODUCT
    this.firestore.collection('product', ref => ref
    .where('productKey', '==', this.id)
    ).get().toPromise()
    .then((product) => {
      console.log(product.docs[0].id)
      window.open(`https://abidmore.com/product-description/${product.docs[0].id}`, "_blank");
    })
    // window.open(`https://abidmore.com/product-description/${product.docs[0].id}`, "_blank");
  }

}
