import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LinkPathService } from '../../services/link-path.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-modal-sidebar',
  templateUrl: './modal-sidebar.component.html',
  styleUrls: ['./modal-sidebar.component.css']
})
export class ModalSidebarComponent implements OnInit {

  public addProductStatus = false;
  public productListStatus = false;
  authState: any = null;
  public checkStatus = false
  public disabledLink = false;
  public countWaitingForDelivery = '0';
  public countReturnProduct = '0';
  public countShippedSuccess = '0';
  
  constructor(
    private afAuth: AngularFireAuth,
    public router: Router,
    public auth:AuthService,
    public path: LinkPathService,
    public firestore: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
      if(this.authState != null){
        // LOGIN SUCCESS
        this.firestore.collection('user-seller').doc(this.authState.uid).valueChanges()
        .subscribe(val => {
          // var a:any = val;
          // this.checkStatus = a.checkStatus;
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
  }

 

  

}
