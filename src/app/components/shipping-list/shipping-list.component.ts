import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping-list',
  templateUrl: './shipping-list.component.html',
  styleUrls: ['./shipping-list.component.css']
})
export class ShippingListComponent implements OnInit {
  public showContent = false;
  public showTextNoData = false;
  public productDataFromFirebase: any = [];

  constructor(
    public path: LinkPathService,
    public router: Router,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.path.setPath('shippingList');
        this.firestore.collection('order', ref => ref
        .where('status', '==', 'shipping')
        .where('sellerUID', '==', this.auth.currentUserId)
        .orderBy('createAt')
        .limit(8)
        ).snapshotChanges()
        .map(actions => {
          return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
        }).subscribe(items => {
          if(items.length != 0){
            this.productDataFromFirebase = items;
            this.showContent = true;
            this.showTextNoData = false;
          }
          else {
            this.showContent = false;
            this.showTextNoData = true;
          }
        });
  }

  productDetail(dataKey){
    // console.log('dataKey : ',dataKey);
    this.router.navigate([`/shipping-detail/${dataKey}`]);
  }

}
