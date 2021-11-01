import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipped-list',
  templateUrl: './shipped-list.component.html',
  styleUrls: ['./shipped-list.component.css']
})
export class ShippedListComponent implements OnInit {
  // public buttonCheck = false;
  public showContent = false;
  public showTextNoData = false;
  public productDataFromFirebase: any = [];
  public fbTimestamp: any
  // public productCheck = false;
  public items: any;
  public productCheck: any = [];

  constructor(
    public path: LinkPathService,
    public router: Router,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.path.setPath('shippedList');
    // console.log(firebase.firestore.Timestamp.now());
    this.fbTimestamp = new Date(firebase.firestore.Timestamp.now().seconds * 1000)
    this.firestore.collection('order', ref => ref
      .where('status', '==', 'waiting-for-delivery')
      .where('sellerUID', '==', this.auth.currentUserId)
      .orderBy('createAt')
      .limit(8)
    ).snapshotChanges()
      .map(actions => {
        return actions.map(action => ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
      }).subscribe(items => {
        this.items = items;
        // console.log('items', items)
        if (this.items.length != 0) {
          for (var i = 0; i < this.items.length; i++) {
            if(this.items[i].value.delivery.dateOverForPickUp.status){
              // DATE OVER FOR PICK UP
              var dateOverInput = this.items[i].value.delivery.dateOverForPickUp.dateForPickUp;
              this.items[i].value.countDate = dateOverInput - this.datediff(new Date(this.items[i].value.createAt.seconds * 1000), this.fbTimestamp);
              if (this.items[i].value.countDate < 1) {
                // SPLICE ITEM OUT OF ARRAY
                this.items.splice(this.items.indexOf(this.items[i]), 1);
                this.cancelOrder(this.items[i]);
              }
            }
            else{
              // NOT DATE OVER FOR PICK UP
              this.items[i].value.countDate = 7 - this.datediff(new Date(this.items[i].value.createAt.seconds * 1000), this.fbTimestamp);
              // SET COUNT DATE < 24 HR => 1 DAY
              if(this.items[i].value.countDate == 0){
                this.items[i].value.countDate = 1;
              }
              if (this.items[i].value.countDate < 1) {
                // SPLICE ITEM OUT OF ARRAY
                this.items.splice(this.items.indexOf(this.items[i]), 1);
                this.cancelOrder(this.items[i]);
              }
            }
          }
          if(this.items.length != 0){
            this.productDataFromFirebase = this.items;
            this.showContent = true;
            this.showTextNoData = false;
          }
          else{
            this.showContent = false;
            this.showTextNoData = true;
          }
        }
        else {
          this.showContent = false;
          this.showTextNoData = true;
        }
      });
  }

  cancelOrder(items){
    // UPDATE ORDER => CANCEL BY SELLER
    this.firestore.collection('order').doc(items.key).update({
      status: 'cancelBySeller',
      cancelAt: firebase.firestore.Timestamp.now()
    })
    .then(() => {
      // ADD NOTI SELLER => CANCEL ORDER
      this.firestore.collection('shop').doc(this.auth.currentUserId).collection('notifications').add({
        createAt: firebase.firestore.Timestamp.now(),
        topic: `สินค้าที่ต้องส่ง #${items.value.orderNo} เกินกำหนดการจัดส่ง`,
        description: `สินค้าที่ต้องส่ง #${items.value.orderNo} เกินกำหนดการจัดส่ง`,
        product: {
          productKey: items.value.productKey,
          productName: items.value.productName,
          imgProduct1: {
            imgUrl: items.value.imgProduct[0].imgUrl,
            imgpath: items.value.imgProduct[0].imgpath
          },
          orderNo: items.value.orderNo
        },
        type: 'order',
        readed: false
      })
      // ADD NOTI BUYER => REFUND
      this.firestore.collection('user-buyer').doc(items.value.buyerUID).collection('notifications').add({
        createAt: firebase.firestore.Timestamp.now(),
        topic: `คำสั่งซื้อ #${items.value.orderNo} ยกเลิกโดยร้านค้า`,
        description: `คำสั่งซื้อ #${items.value.orderNo} ยกเลิกโดยร้านค้า ระบบกำลังดำเนินการคืนเงิน`,
        product: {
          productKey: items.value.productKey,
          productName: items.value.productName,
          imgProduct1: {
            imgUrl: items.value.imgProduct[0].imgUrl,
            imgpath: items.value.imgProduct[0].imgpath
          },
          orderNo: items.value.orderNo
        },
        type: 'order',
        readed: false
      })
    })
  }

  parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0] - 1, mdy[1]);
  }

  datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

  clickProductCheck(dataKey) {
    if (this.productCheck.indexOf(dataKey) !== -1) {
      this.productCheck = this.productCheck.filter(item => item !== dataKey)
    }
    else {
      this.productCheck.push(dataKey);
    }
    // console.log(this.productCheck);
  }

  productCheckAll() {
    // LOOP UPDATE this.items[i].value.key
    // console.log('productCheckAll');
    for (var i = 0; i < this.items.length; i++) {
      if (this.productCheck.indexOf(this.items[i].key) !== -1) {
        // this.productCheck = this.productCheck.filter(item => item !== dataKey)
      }
      else {
        this.productCheck.push(this.items[i].key);
      }
    }
    // console.log(this.productCheck);
  }

  clearProductCheck() {
    this.productCheck = []
  }

  productUpdate() {
    // console.log('productUpdate');
    // console.log(this.productCheck);
    // UPDATE PRODUCT STATUS > this.productCheck > FIREBASE
    for (var i = 0; i < this.productCheck.length; i++) {
      this.firestore.collection('order').doc(this.productCheck[i]).update({
        status: 'shipping'
      })
      this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product').doc(this.productCheck[i]).update({
        productStatus: 'shipping'
      })
    }
    // GOTO > shipping-list
  }

  productDetail(dataKey) {
    // console.log('dataKey : ',dataKey);
    this.router.navigate([`/shipped-detail/${dataKey}`]);
  }

}
