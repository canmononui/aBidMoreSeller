import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { flatten } from '@angular/compiler';

@Component({
  selector: 'app-group-product-edit',
  templateUrl: './group-product-edit.component.html',
  styleUrls: ['./group-product-edit.component.css']
})
export class GroupProductEditComponent implements OnInit {

  public id;
  public productList:any = [];
  public productKeyAdd:any = '';
  public productKeyDelete:any = '';
  public searchCheck = false;

  constructor(
    public path: LinkPathService,
    public router: Router,
    private route: ActivatedRoute,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.path.setPath('groupProductList');
    this.id = this.route.snapshot.paramMap.get("id");
    if(this.id){
      console.log(this.id)
      this.firestore.collection('product', ref => ref
      .where('groupProduct', '==', this.id)
      .where('sellerUID', '==', this.auth.currentUserId)
      ).snapshotChanges()
      .map(actions => {
        return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
      }).subscribe(items => {
        if(items.length != 0){
          this.productList = items;
        }
        else{
          this.productList = [];
        }
      });
    }
    else {
      this.router.navigate([`/group-product-list`]);
    }
  }

  searchBtn(productKey){
    if(productKey != ''){
      this.firestore.collection('product').doc(productKey).get().toPromise()
      .then((product) => {
        console.log(product.data())
        if(product.data() != undefined){
          this.productKeyAdd = `ต้องการเพิ่มสินค้ารหัส ${productKey} จากกลุ่มสินค้านาทีทอง ?`
          this.searchCheck = true;
        }
        else {
          this.productKeyAdd = `ไม่พบสินค้ารหัส ${productKey} นี้`
          this.searchCheck = false;
        }
      })
    }
    else{
      this.productKeyAdd = 'กรุณาเพิ่มรหัสสินค้า'
      this.searchCheck = false;
    }
  }

  addProduct(productKey){
    if(this.searchCheck){
      this.firestore.collection('product').doc(productKey).update({
        groupProduct: this.id
      })
    }
  }

  deleteProduct(productKey){
    console.log(productKey)
    this.productKeyDelete = productKey;
  }

  updateDeleteProduct(){
    this.firestore.collection('product').doc(this.productKeyDelete).update({
      groupProduct: null
    })
  }

  deleteGroup(){
    // DELETE GROUP NAME IN ARR (SHOP)
    this.firestore.collection('shop').doc(this.auth.currentUserId).update({
      groupProduct: firebase.firestore.FieldValue.arrayRemove(this.id)
    })
    .then(() => {
      this.router.navigate([`/group-product-list`]);
    })
    // UPDATE groupProduct IN PRODUCT
    if(this.productList.length != 0){
      for(var i=0; i < this.productList.length; i++){
        console.log(this.productList[i].key)
        this.firestore.collection('product').doc(this.productList[i].key).update({
          groupProduct: null
        })
      }
    }
  }

  groupList() {
    this.router.navigate([`/group-product-list`]);
  }

  createGroup(){
    this.router.navigate([`/group-product-create`]);
  }

}
