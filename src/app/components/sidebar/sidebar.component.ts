import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LinkPathService } from '../../services/link-path.service';
import { AuthService } from '../../services/auth.service';
// FIREBASE
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';

// Test jQuery
// function hello() {
  // alert('Hello!!!');
  // var getAddProduct = document.getElementById("addProduct");
  // console.log(getAddProduct)
  // if(getAddProduct.classList.contains("text-active")){
  //   console.log("class > text-active")
  // }
  // document.getElementById("addProduct").classList.add("active");
// }

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  // public getPath : string = '';
  // public addProductStatus = false;
  // public productListStatus = false;
  public userSeller: any;
  authState: any = null;
  public checkStatus = false;
  public showContent = true;
  public disabledLink = true;
  public countWaitingForDelivery = '0';
  public countReturnProduct = '0';
  public countShippedSuccess = '0';

  constructor(
    private afAuth: AngularFireAuth,
    public path: LinkPathService,
    public router: Router,
    public db: AngularFireDatabase,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    // console.log(this.auth.currentUserId)
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
      if(this.authState != null){
        // LOGIN SUCCESS
        this.firestore.collection('user-seller').doc(this.authState.uid).valueChanges()
        .subscribe(val => {
          var a:any = val;
          this.checkStatus = a.checkStatus;
          // if(a.emailVerifyAt == null){
          //   this.disabledLink = false
          // }
          if(a.shopStatus == 'waitingApproval') {
            // USER SELLER STATUS IS WAITING APPROVAL
            // THIS CAN USE SYSTEM
            this.disabledLink = false
          }
          else {
            // USER SELLER STATUS IS WAITING VERIFIED PHONE
            // USER SELLER STATUS IS WAITING UPDATE USER SELLER
            // THIS CAN'T USE SYSTEM
            this.disabledLink = true
          }
          // if(this.authState != null){
          //   this.disabledLink = false
          // }
        });
        // console.log(this.disabledLink)

        // COUNT PRODUCT WAITING FOR DELIVERY
        this.firestore.collection('order', ref => ref
        .where('sellerUID', '==', this.auth.currentUserId )
        .where('status', '==', 'waiting-for-delivery' )
        ).snapshotChanges()
        .map(actions => {
          return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
        }).subscribe(waitingForDelivery => {
          var _waitingForDelivery:any = waitingForDelivery;
          if(_waitingForDelivery.length != 0){
            if(_waitingForDelivery.length > 99){
              this.countWaitingForDelivery = '99+';
            }
            else{
              this.countWaitingForDelivery = String(_waitingForDelivery.length);
            }
          }
          else {
            this.countWaitingForDelivery = '0';
          }
        });

        // COUNT RETURN PRODUCT
        this.firestore.collection('order', ref => ref
        .where('sellerUID', '==', this.auth.currentUserId )
        .where('status', '==', 'return' )
        .where('returnProduct.status', '==', 'buyerRequest' )
        ).snapshotChanges()
        .map(actions => {
          return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
        }).subscribe(returnProduct => {
          var _return:any = returnProduct;
          if(_return.length != 0){
            if(_return.length > 99){
              this.countReturnProduct = '99+';
            }
            else{
              this.countReturnProduct = String(_return.length);
            }
          }
          else {
            this.countReturnProduct = '0';
          }
        });

        // COUNT SHIPPED SUCCESS
        this.firestore.collection('order', ref => ref
        .where('sellerUID', '==', this.auth.currentUserId )
        .where('status', '==', 'shipped' )
        ).snapshotChanges()
        .map(actions => {
          return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
        }).subscribe(shippedSuccess => {
          var _return:any = shippedSuccess;
          if(_return.length != 0){
            if(_return.length > 99){
              this.countShippedSuccess = '99+';
            }
            else{
              this.countShippedSuccess = String(_return.length);
            }
          }
          else {
            this.countShippedSuccess = '0';
          }
        });

      }
      else {
        // NOT LOGIN
        this.disabledLink = true
      }
    });
    
    // this.firestore.collection('user-seller').doc(this.auth.currentUserId).get()
    // .subscribe(val => {
    //   console.log(val.data());
    //   this.userSeller = val.data()
    //   // if(!this.userSellerFB.checkStatus){
    //   //   this.router.navigate([`/profile-settings`]);
    //   // }

    // });

    // this.getPath = this.path.getPath;
    // if(this.getPath == 'addProduct'){
    //   this.addProductStatus = true;
    //   this.productListStatus = false;
    // }
    // else if(this.getPath == 'productList'){
    //   this.addProductStatus = false;
    //   this.productListStatus = true;
    // }

    // console.log(this.path.getPath);
    // this.path.setPath('123')
  }

  // addProduct() {
  //   // this.addProductStatus = true;
  //   // this.productListStatus = false;
  //   this.path.setPath('addProduct');
  // }
  
  // productList() {
  //   // this.productListStatus = true;
  //   // this.addProductStatus = false;
  //   this.path.setPath('productList');
  // }

  // profileSettings(){
  //   this.path.setPath('profileSettings');
  // }
 

}
