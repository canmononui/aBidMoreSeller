import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipped-success-list',
  templateUrl: './shipped-success-list.component.html',
  styleUrls: ['./shipped-success-list.component.css']
})
export class ShippedSuccessListComponent implements OnInit {

  public showContent = false;
  public showTextNoData = false;
  public productDataFromFirebase: any = [];
  public fbTimestamp: any
  public items: any;

  constructor(
    public path: LinkPathService,
    public router: Router,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    // this.firestore.collection('order').doc('3RtliDn51gd5hGQoVL7G').collection('transport').doc('60bf5817722f6b0007d6d6ba').get().toPromise()
    // .then((orderDe) => {
    //   var _orderDe :any = orderDe.data()
    //   console.log(_orderDe)
    //   this.firestore.collection('order').doc('56VAowvQPePGaCp8wyD5').collection('transport').add(_orderDe)
    // })
    this.path.setPath('shippedSuccessList');
    // console.log(firebase.firestore.Timestamp.now());
    this.fbTimestamp = new Date(firebase.firestore.Timestamp.now().seconds * 1000)
    this.firestore.collection('order', ref => ref
      .where('status', '==', 'shipped')
      .where('sellerUID', '==', this.auth.currentUserId)
      .orderBy('createAt')
      .limit(8)
    ).snapshotChanges()
      .map(actions => {
        return actions.map(action => ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
      }).subscribe(items => {
        // console.log('items : ', items);
        this.items = items;
        // console.log('items', items.length)
        if (this.items.length != 0) {
          this.items.forEach(order => {
            // console.log(order)
            // console.log(order.value)
            this.firestore.collection('order').doc(order.key).collection('transport', ref => ref
              .orderBy('updateAt', 'desc')
              .limit(1))
              .get().toPromise()
              .then((transport) => {
                if(!transport.empty){
                  // TRANSPORT NOT EMPTY
                  var _transport = transport.docs[0].data();
                  if(_transport.routes[4] != undefined){
                    // TRANSPORT STATE SIGNED => SET DATA
                    order.value.transportSignedAt = Number(_transport.routes[4].stateDate*1000);;
                    order.value.countDate = 14 - this.datediff(new Date(Number(_transport.routes[4].stateDate*1000)), this.fbTimestamp);
                    // console.log(order.value.transportSignedAt)
                    // console.log(order.value.countDate)
                  }
                  else{
                    // TRANSPORT STATE SIGNED EMPTY
                    order.value.transportSignedAt = null;
                    order.value.countDate = null;
                  }
                }
                else{
                  // TRANSPORT EMPTY
                  order.value.transportSignedAt = null;
                  order.value.countDate = null;
                }
            });
          });
          this.showContent = true;
          this.showTextNoData = false;
        }
        else {
          this.showContent = false;
          this.showTextNoData = true;
        }
      });
  }

  parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0] - 1, mdy[1]);
  }

  datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

  productDetail(dataKey){
    // console.log('dataKey : ',dataKey);
    this.router.navigate([`/shipped-success-detail/${dataKey}`]);
  }

}
