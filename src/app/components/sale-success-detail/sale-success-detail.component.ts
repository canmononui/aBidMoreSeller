import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sale-success-detail',
  templateUrl: './sale-success-detail.component.html',
  styleUrls: ['./sale-success-detail.component.css']
})
export class SaleSuccessDetailComponent implements OnInit {

  public id;
  public imgUrl = '';
  public showContent = false;
  public shopAddress = ''
  public buyerName = ''
  public buyerAddress = ''
  public orderDetail:any
  public transport:any = null;
  
  constructor(
    public path: LinkPathService,
    public router: Router,
    private route: ActivatedRoute,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.path.setPath('saleSuccessList');
    this.id = this.route.snapshot.paramMap.get("id");
    if(this.id){
      // console.log(this.id)
      this.productDataKey();
    }
  }

  productDataKey() {
    // GET ADDRESS
    this.firestore.collection('order').doc(this.id).get()
    .subscribe(val => {
      // console.log(val.data());
      // this.sellerDes = val.data()
      this.orderDetail = val.data()
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
      // if(this.orderDetail.delivery.codStatus){
      //   this.checkCOD = 'เก็บเงินปลายทาง'
      //   this.CODPrice = this.orderDetail.delivery.priceDelivery.priceDeliveryInput.toString()
      // }
      // console.log(this.orderDetail.delivery.priceDelivery.deliveryName.toUpperCase());
      // console.log(this.buyerAddress);
      
      // if(this.orderDetail.returnProduct.status == 'success'){
      //   if(this.orderDetail.returnProduct.returnProductShippingAt != undefined){
      //     this.showReturnProductShipping = true
      //   }
      //   else{
      //     this.showReturnProductShipping = false
      //   }
      //   if(this.orderDetail.returnProduct.sellerArgueAt != undefined){
      //     this.showSellerArgue = true
      //   }
      //   else{
      //     this.showSellerArgue = false
      //   }
      //   if(this.orderDetail.returnProduct.adminRequestAt != undefined){
      //     this.showAdminRequest = true
      //   }
      //   else{
      //     this.showAdminRequest = false
      //   }
      //   if(this.orderDetail.returnProduct.returnProductShippingAdminAt != undefined){
      //     this.showReturnProductShippingAdmin = true
      //   }
      //   else{
      //     this.showReturnProductShippingAdmin = false
      //   }
      //   if(this.orderDetail.returnProduct.sellerArgueReceiveAt != undefined){
      //     this.showSellerArgueReceive = true
      //   }
      //   else{
      //     this.showSellerArgueReceive = false
      //   }
      //   if(this.orderDetail.returnProduct.adminReceiveAt != undefined){
      //     this.showAdminReceive = true
      //   }
      //   else{
      //     this.showAdminReceive = false
      //   }
      // }

      this.firestore.collection('order').doc(this.id).collection('transport', ref => ref
        .orderBy('updateAt', 'desc')
        .limit(1))
        .get().toPromise()
        .then((transport) => {
          if(!transport.empty){
            // TRANSPORT NOT EMPTY
            this.transport = transport.docs[0].data();
            this.transport.routes.forEach((doc) => {
              if(doc.state == "1"){
                doc.stateTextEN = doc.stateText;
                doc.stateTextTH = "เข้ารับพัสดุแล้ว";
              }
              else if(doc.state == "2"){
                doc.stateTextEN = doc.stateText;
                doc.stateTextTH = "ศูนย์คัดแยกสินค้า";
              }
              else if(doc.state == "3"){
                doc.stateTextEN = doc.stateText;
                doc.stateTextTH = "พัสดุอยู่ระหว่างทาง";
              }
              else if(doc.state == "4"){
                doc.stateTextEN = doc.stateText;
                doc.stateTextTH = "พัสดุกำลังนำจ่าย";
              }
              else if(doc.state == "5"){
                doc.stateTextEN = doc.stateText;
                doc.stateTextTH = "นำส่งสำเร็จ (ลงชื่อ)";
              }
              else if(doc.state == "6"){
                doc.stateTextEN = doc.stateText;
                doc.stateTextTH = "มีปัญหาในการดำเนินการจัดส่ง";
              }
              else if(doc.state == "7"){
                doc.stateTextEN = doc.stateText;
                doc.stateTextTH = "การส่งคืนสินค้า";
              }
              else if(doc.state == "8"){
                doc.stateTextEN = doc.stateText;
                doc.stateTextTH = "ปิดโดยข้อยกเว้น";
              }
              else if(doc.state == "9"){
                doc.stateTextEN = doc.stateText;
                doc.stateTextTH = "ยกเลิกแล้ว";
              }
              else{
                doc.stateTextEN = "No Data Found";
                doc.stateTextTH = "ไม่พบข้อมูล";
              }
              doc.stateDate = Number(doc.stateDate*1000);
            })
          }
          else{
            // TRANSPORT EMPTY
            this.transport = null
          }
        })

      this.showContent = true;
    });
  }

  copyOrderKey(){
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

  copyTrackNumber(){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.orderDetail.delivery.trackingNumber;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  popUpImg(imgUrl){
    this.imgUrl = imgUrl;
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

}
