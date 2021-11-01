import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
// PDFMAKE
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-shipped-detail',
  templateUrl: './shipped-detail.component.html',
  styleUrls: ['./shipped-detail.component.css']
})
export class ShippedDetailComponent implements OnInit {
  public id;
  public showContent = false;
  public imgUrl = '';
  public sellerDes:any
  public shopAddress = ''
  public buyerName = ''
  public buyerAddress = ''
  public orderDetail:any
  public trackingNumberStatus = false
  public trackingNumberInput = ''
  public textModal = 'ส่งสินค้าเรียบร้อยและยืนยันการส่งสินค้า ?'
  public checkCOD = 'ไม่เก็บเงินปลายทาง'
  public CODPrice = '0'
  public fbTimestamp: any
  public CreateDelveryFail:boolean = false;
  public CreatePdfFail:boolean = false;
  public callCourierSucc:boolean = false;
  public responseCallCourier: any = "";
  constructor(
    public path: LinkPathService,
    public router: Router,
    private route: ActivatedRoute,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
    private http: HttpClient
  ) { 
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit(): void {
    this.path.setPath('shippedList');
    this.id = this.route.snapshot.paramMap.get("id");
    if(this.id){
      // console.log(this.id)
      this.productDataKey();
    }
  }

  productDataKey() {
    this.fbTimestamp = new Date(firebase.firestore.Timestamp.now().seconds * 1000)
    // GET ADDRESS
    this.firestore.collection('order').doc(this.id).valueChanges()
    .subscribe(val => {
      // console.log(val);
      // this.sellerDes = val.data()
      this.orderDetail = val;

      // SET TIME COUNT LIMIT
      if(this.orderDetail.delivery.dateOverForPickUp.status){
        var dateOverInput = this.orderDetail.delivery.dateOverForPickUp.dateForPickUp;
        this.orderDetail.countDate = dateOverInput - this.datediff(new Date(this.orderDetail.createAt.seconds * 1000), this.fbTimestamp);
        // if (this.orderDetail.countDate < 1) {
        //   this.items.splice(this.items.indexOf(this.items[i]), 1);
        // }
      }
      else{
        this.orderDetail.countDate = 2 - this.datediff(new Date(this.orderDetail.createAt.seconds * 1000), this.fbTimestamp);
        // if (this.orderDetail.countDate < 1) {
        //   this.items.splice(this.items.indexOf(this.items[i]), 1);
        // }
      }

      // SET SHOP ADDRESS FOR PDF
      if(this.orderDetail.delivery.sellerAddress.number != ""){
        this.shopAddress = this.shopAddress + " " + this.orderDetail.delivery.sellerAddress.number
      }
      if(this.orderDetail.delivery.sellerAddress.moo != ""){
        this.shopAddress = this.shopAddress + " " + this.orderDetail.delivery.sellerAddress.moo
      }
      if(this.orderDetail.delivery.sellerAddress.village != ""){
        this.shopAddress = this.shopAddress + " " + this.orderDetail.delivery.sellerAddress.village
      }
      if(this.orderDetail.delivery.sellerAddress.lane != ""){
        this.shopAddress = this.shopAddress + " " + this.orderDetail.delivery.sellerAddress.lane
      }
      if(this.orderDetail.delivery.sellerAddress.road != ""){
        this.shopAddress = this.shopAddress + " " + this.orderDetail.delivery.sellerAddress.road
      }
      if(this.orderDetail.delivery.sellerAddress.subDistrict != ""){
        this.shopAddress = this.shopAddress + " " + this.orderDetail.delivery.sellerAddress.subDistrict
      }
      if(this.orderDetail.delivery.sellerAddress.district != ""){
        this.shopAddress = this.shopAddress + " " + this.orderDetail.delivery.sellerAddress.district
      }
      if(this.orderDetail.delivery.sellerAddress.province != ""){
        this.shopAddress = this.shopAddress + " " + this.orderDetail.delivery.sellerAddress.province
      }
      if(this.orderDetail.delivery.sellerAddress.postalCode != ""){
        this.shopAddress = this.shopAddress + " " + this.orderDetail.delivery.sellerAddress.postalCode
      }
      if(this.orderDetail.delivery.sellerAddress.phone != ""){
        this.shopAddress = this.shopAddress + " (" + this.orderDetail.delivery.sellerAddress.phone + ")"
      }
      // console.log(this.shopAddress);

      // SET BUYYER NAME FOR PDF
      if(this.orderDetail.delivery.buyyerAddress.dataAddress.name != ""){
        this.buyerName = this.orderDetail.delivery.buyyerAddress.dataAddress.name
      }
      if(this.orderDetail.delivery.buyyerAddress.dataAddress.lastName != ""){
        this.buyerName = this.buyerName + " " + this.orderDetail.delivery.buyyerAddress.dataAddress.lastName
      }
      // SET BUYYER ADDRESS FOR PDF
      if(this.orderDetail.delivery.buyyerAddress.dataAddress.number != ""){
        this.buyerAddress = this.buyerAddress + " " + this.orderDetail.delivery.buyyerAddress.dataAddress.number
      }
      if(this.orderDetail.delivery.buyyerAddress.dataAddress.moo != ""){
        this.buyerAddress = this.buyerAddress + " " + this.orderDetail.delivery.buyyerAddress.dataAddress.moo
      }
      if(this.orderDetail.delivery.buyyerAddress.dataAddress.village != ""){
        this.buyerAddress = this.buyerAddress + " " + this.orderDetail.delivery.buyyerAddress.dataAddress.village
      }
      if(this.orderDetail.delivery.buyyerAddress.dataAddress.lane != ""){
        this.buyerAddress = this.buyerAddress + " " + this.orderDetail.delivery.buyyerAddress.dataAddress.lane
      }
      if(this.orderDetail.delivery.buyyerAddress.dataAddress.road != ""){
        this.buyerAddress = this.buyerAddress + " " + this.orderDetail.delivery.buyyerAddress.dataAddress.road
      }
      if(this.orderDetail.delivery.buyyerAddress.dataAddress.subDistrict != ""){
        this.buyerAddress = this.buyerAddress + " " + this.orderDetail.delivery.buyyerAddress.dataAddress.subDistrict
      }
      if(this.orderDetail.delivery.buyyerAddress.dataAddress.district != ""){
        this.buyerAddress = this.buyerAddress + " " + this.orderDetail.delivery.buyyerAddress.dataAddress.district
      }
      if(this.orderDetail.delivery.buyyerAddress.dataAddress.province != ""){
        this.buyerAddress = this.buyerAddress + " " + this.orderDetail.delivery.buyyerAddress.dataAddress.province
      }
      if(this.orderDetail.delivery.buyyerAddress.dataAddress.postalCode != ""){
        this.buyerAddress = this.buyerAddress + " " + this.orderDetail.delivery.buyyerAddress.dataAddress.postalCode
      }
      if(this.orderDetail.delivery.buyyerAddress.dataAddress.phone != ""){
        this.buyerAddress = this.buyerAddress + " (" + this.orderDetail.delivery.buyyerAddress.dataAddress.phone + ")"
      }
      if(this.orderDetail.delivery.codStatus){
        this.checkCOD = 'เก็บเงินปลายทาง'
        this.CODPrice = this.orderDetail.delivery.priceDelivery.priceDeliveryInput.toString()
      }
      // console.log(this.orderDetail.delivery.priceDelivery.deliveryName.toUpperCase());
      // console.log(this.buyerAddress);
      this.showContent = true;
    });
  }

  datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

  copyOrderKey(){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.orderDetail.orderNo;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  copyProductKey(){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.orderDetail.productKey;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  popUpImg(imgUrl){
    this.imgUrl = imgUrl;
  }

  cancelOrder(){
    // UPDATE ORDER => CANCEL BY SELLER
    this.firestore.collection('order').doc(this.id).update({
      status: 'cancelBySeller',
      cancelAt: firebase.firestore.Timestamp.now()
    })
    .then(() => {
      // ADD NOTI SELLER => CANCEL ORDER
      this.firestore.collection('shop').doc(this.auth.currentUserId).collection('notifications').add({
        createAt: firebase.firestore.Timestamp.now(),
        topic: `สินค้าที่ต้องส่ง #${this.orderDetail.orderNo} ยกเลิกโดยร้านค้า`,
        description: `สินค้าที่ต้องส่ง #${this.orderDetail.orderNo} ยกเลิกโดยร้านค้า`,
        product: {
          productKey: this.orderDetail.productKey,
          productName: this.orderDetail.productName,
          imgProduct1: {
            imgUrl: this.orderDetail.imgProduct[0].imgUrl,
            imgpath: this.orderDetail.imgProduct[0].imgpath
          },
          orderNo: this.orderDetail.orderNo
        },
        type: 'order',
        readed: false
      })
      // ADD NOTI BUYER => REFUND
      this.firestore.collection('user-buyer').doc(this.orderDetail.buyerUID).collection('notifications').add({
        createAt: firebase.firestore.Timestamp.now(),
        topic: `คำสั่งซื้อ #${this.orderDetail.orderNo} ยกเลิกโดยร้านค้า`,
        description: `คำสั่งซื้อ #${this.orderDetail.orderNo} ยกเลิกโดยร้านค้า ระบบกำลังดำเนินการคืนเงิน`,
        product: {
          productKey: this.orderDetail.productKey,
          productName: this.orderDetail.productName,
          imgProduct1: {
            imgUrl: this.orderDetail.imgProduct[0].imgUrl,
            imgpath: this.orderDetail.imgProduct[0].imgpath
          },
          orderNo: this.orderDetail.orderNo
        },
        type: 'order',
        readed: false
      })
      this.router.navigate([`/shipped-list`]);
    })
  }

  checkTrackingNumber(trackingNumber){
    console.log(trackingNumber)
    if(trackingNumber != ''){
      this.trackingNumberStatus = true
      this.trackingNumberInput = trackingNumber
      this.textModal = 'ส่งสินค้าเรียบร้อยและยืนยันการส่งสินค้า ?'
    }
    else {
      this.textModal = 'กรุณาเพิ่มรหัสติดตามสินค้า'
    }
  }

  updateTracking(){
    if(this.trackingNumberStatus){
      this.firestore.collection('order').doc(this.id).update({
        'delivery.trackingNumber': this.trackingNumberInput,
        status: 'shipping',
        startShippingAt: firebase.firestore.Timestamp.now()
      })
      .then(() => {
        this.router.navigate([`/shipped-list`]);
      })
    }
  }

  gotoChatRoom(){
    this.firestore.collection('user-buyer').doc(this.orderDetail.buyerUID).get().toPromise()
    .then((userBuyer) => {
      if(userBuyer.data() != undefined){
        // CAN GET USER BUYER DATA
        var _userBuyer:any = userBuyer.data();
        // CHECK CHAT 
        this.firestore.collection('chat', ref => ref
        .where(`members.${this.auth.currentUserId}.uid`, '==', this.auth.currentUserId)
        .where(`members.${this.orderDetail.buyerUID}.uid`, '==', this.orderDetail.buyerUID)
        ).get().toPromise()
        .then((val) => {
          // console.log(val)
          if(val.size != 0){
            // OLD CHAT
            // GO TO CHAT BUYER
            this.router.navigate([`/noti-chat-reply/${val.docs[0].id}&${this.orderDetail.buyerUID}&${_userBuyer.displayName}`]);
          }
          else{
            // NEW CHAT 
            // GO TO CHAT BUYER
            this.router.navigate([`/noti-chat-reply/null&${this.orderDetail.buyerUID}&${_userBuyer.displayName}`]);
          }
        })
      }
      else{
        // CANT GET USER BUYER DATA
        // CHECK CHAT 
        this.firestore.collection('chat', ref => ref
        .where(`members.${this.auth.currentUserId}.uid`, '==', this.auth.currentUserId)
        .where(`members.${this.orderDetail.buyerUID}.uid`, '==', this.orderDetail.buyerUID)
        ).get().toPromise()
        .then((val) => {
          // console.log(val)
          if(val.size != 0){
            // OLD CHAT
            // GO TO CHAT BUYER
            this.router.navigate([`/noti-chat-reply/${val.docs[0].id}&${this.orderDetail.buyerUID}&ห้องสนทนา (ไม่มีชื่อ)`]);
          }
          else{
            // NEW CHAT 
            // GO TO CHAT BUYER
            this.router.navigate([`/noti-chat-reply/null&${this.orderDetail.buyerUID}&ห้องสนทนา (ไม่มีชื่อ)`]);
          }
        })
      }
    })
  }

  createPdf() {
    if(this.orderDetail.delivery.priceDelivery.deliveryName == 'Kerry Express'){

    }
    else if(this.orderDetail.delivery.priceDelivery.deliveryName == 'Thailand Post'){
      // CREATE PDF FROM API
      window.open(`https://asia-southeast2-abidmore-seller.cloudfunctions.net/thaipost_label?pno=${this.orderDetail.delivery.trackingNumber}`, "_blank");
    }
    else if(this.orderDetail.delivery.priceDelivery.deliveryName == 'SCG Express'){

    }
    else if(this.orderDetail.delivery.priceDelivery.deliveryName == 'Flash Express'){
      // CREATE PDF FROM API
      window.open(`https://asia-southeast2-abidmore-seller.cloudfunctions.net/flash_label?pno=${this.orderDetail.delivery.trackingNumber}`, "_blank");
    }
    else {
      // ERROR ALERT
      this.CreatePdfFail = true;
    } 
  }
  
  createOrderDelivery(){
    // CREATE ORDER
    this.firestore.collection('order').doc(this.id).update({
      'delivery.status': "createTranOrder"
    })
    .then(() => {
      // SUBSCRIBE ORDER VALUE CHANGES
      this.firestore.collection('order').doc(this.id).valueChanges()
      .subscribe(val => {
        const _orderValChang:any = val;
        if(_orderValChang.delivery.status == "created"){
          // CREATE ORDER DELIVERY SUCCESS => GO TO CREATE PDF FILE
          this.createPdf()
        }
        else if(_orderValChang.delivery.status == "fail") {
          // CAN'T CREATE ORDER DELIVERY => ERROR ALERT
          this.CreateDelveryFail = true;
        }
      })
    })
   }

   flashExCallCourier() {
      const url = "https://asia-southeast2-abidmore-seller.cloudfunctions.net/flash_call_courier";
      const headers = new HttpHeaders({"Content-Type": "application/json"});
      this.http.post<any>( url, { "order_keys": [this.id], "uid_seller": this.orderDetail.sellerUID }, { headers } ).subscribe(data => {
        this.responseCallCourier = data.data;
        this.callCourierSucc = true;
        this.firestore.collection('order').doc(this.id).update({
          "delivery.flashExCallCourier": this.responseCallCourier
        })
      },
      error => {
        console.error(error);
      })
   }

   closeModalCreateDelveryFail() {
    this.CreateDelveryFail = false;
   }

   closeModalCreatePdfFail() {
    this.CreatePdfFail = false;
   }

   closeModalCallCourierSucc() {
     this.callCourierSucc = false;
   }

}
