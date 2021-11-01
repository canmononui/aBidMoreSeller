import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-return-products-list',
  templateUrl: './return-products-list.component.html',
  styleUrls: ['./return-products-list.component.css']
})
export class ReturnProductsListComponent implements OnInit {

  public placeholderReturnProductStatus = 'กรุณาเลือก';
  // MOCK DATA
  public showContent = false;
  public showTextNoData = false;
  public productDataFromFirebase: any = [];
  public showTextSelectData = true;

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

    // this.placeholderReturnProductStatus = 'ผู้ซื้อแจ้งคืนสินค้า'
    // this.firestore.collection('order', ref => ref
    // .where('sellerUID', '==', this.auth.currentUserId)
    // .where('status', '==', 'return-product')
    // .where('returnProduct.status', '==', 'buyerRequest')
    // .orderBy('createAt')
    // .limit(8)
    // ).snapshotChanges()
    // .map(actions => {
    //   return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
    // }).subscribe(items => {
    //   // console.log('items : ',items);
    //   // console.log('items', items.length)
    //   if(items.length != 0){
    //     // console.log('no',items)
    //     this.productDataFromFirebase = items;
    //     this.showContent = true;
    //     this.showTextSelectData = false;
    //     this.showTextNoData = false;
    //   }
    //   else {
    //     this.showContent = false;
    //     this.showTextSelectData = false;
    //     this.showTextNoData = true;
    //   }
    // });
  }

  typeReturnProduct(typeEN, typeTH){
    this.placeholderReturnProductStatus = typeTH;
    this.firestore.collection('order', ref => ref
    .where('sellerUID', '==', this.auth.currentUserId)
    .where('status', '==', 'return')
    .where('returnProduct.status', '==', typeEN)
    .orderBy('createAt')
    .limit(8)
    ).snapshotChanges()
    .map(actions => {
      return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
    }).subscribe(items => {
      // console.log('items : ',items);
      // console.log('items', items.length)
      if(items.length != 0){
        // console.log('no',items)
        this.productDataFromFirebase = items;
        this.showContent = true;
        this.showTextSelectData = false;
        this.showTextNoData = false;
      }
      else {
        if(typeEN == 'returnProductShipping'){
          this.firestore.collection('order', ref => ref
          .where('sellerUID', '==', this.auth.currentUserId)
          .where('status', '==', 'return')
          .where('returnProduct.status', '==', 'returnProductShippingAdmin')
          .orderBy('createAt')
          .limit(8)
          ).snapshotChanges()
          .map(actions => {
            return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
          }).subscribe(items => {
            // console.log('items : ',items);
            // console.log('items', items.length)
            if(items.length != 0){
              // console.log('no',items)
              this.productDataFromFirebase = items;
              this.showContent = true;
              this.showTextSelectData = false;
              this.showTextNoData = false;
            }
            else {
              this.showContent = false;
              this.showTextSelectData = false;
              this.showTextNoData = true;
            }
          });
        }
        else{
          this.showContent = false;
          this.showTextSelectData = false;
          this.showTextNoData = true;
        }
      }
    });
  }

  searchBtn(keyNameSearchInput){
    if(keyNameSearchInput != '') {
      // console.log(this.auth.currentUserId)
      this.firestore.collection('order', ref => ref
      .where('sellerUID', '==', this.auth.currentUserId)
      .where('productName', '==', keyNameSearchInput)
      .where('status', '==', 'return')
      .orderBy('createAt')
      .limit(8)
      ).snapshotChanges()
      .map(actions => {
        return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
      }).subscribe(items => {
        // console.log('items : ',items);
        // console.log('items', items.length)
        if(items.length != 0){
          // console.log('no',items)
          this.productDataFromFirebase = items;
          this.showContent = true;
          this.showTextSelectData = false;
          this.showTextNoData = false;
        }
        else {
          this.firestore.collection('order').doc(keyNameSearchInput).get()
          .subscribe(val => {
            // console.log(val.data());
            // this.userSellerFB = val.data()
            var dataSearch:any = val.data();
            if(dataSearch != undefined){
              if(dataSearch.sellerUID == this.auth.currentUserId && dataSearch.status == 'return'){
                this.productDataFromFirebase = [{
                  key: keyNameSearchInput,
                  value: val.data()
                }];
                // console.log(this.productDataFromFirebase);
                this.showContent = true;
                this.showTextSelectData = false;
                this.showTextNoData = false;
              }
              else{
                this.showContent = false;
                this.showTextSelectData = false;
                this.showTextNoData = true;
              }
            }
            else {
              this.showContent = false;
              this.showTextSelectData = false;
              this.showTextNoData = true;
            }
    
          });
        }
      });
    }
  }

  returnProductDetail(dataKey){
    this.router.navigate([`/return-products-detail/${dataKey}`]);
  }

}
