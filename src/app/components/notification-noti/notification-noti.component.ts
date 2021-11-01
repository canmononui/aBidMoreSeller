import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notification-noti',
  templateUrl: './notification-noti.component.html',
  styleUrls: ['./notification-noti.component.css']
})
export class NotificationNotiComponent implements OnInit {

  public id;
  public notiList: any = [];

  constructor(
    public path: LinkPathService,
    public router: Router,
    private route: ActivatedRoute,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.path.setPath('notiNoti');
    this.id = this.auth.currentUserId;
    if (this.id) {
      // GET NOTI LIST
      this.firestore.collection('shop').doc(this.id).collection('notifications', ref => ref
        .orderBy('createAt', 'desc')
      ).snapshotChanges()
        .map(actions => {
          return actions.map(action => ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
        }).subscribe(noti => {
          // console.log('CHAT NON READ -> ', chat)
          this.notiList = noti;
        })
    }
    else {
      this.router.navigate(['/'])
    }
  }

  gotoNotiDes(notiKey, value) {
    this.firestore.collection('shop').doc(this.auth.currentUserId).collection('notifications').doc(notiKey).update({
      readed: true
    })
      .then((doc) => {
        // REPORT PORDUCT BY BUYER
        // REPORT REVIEW BY SELELR
        if (value.type == 'productNoti') {
          this.firestore.collection('product').doc(value.product.productKey).get().toPromise()
            .then((product) => {
              var _product: any = product.data();
              if (_product != undefined) {
                this.router.navigate([`/product-detail/${_product.productKey}`])
              }
              else {
                this.router.navigate([`/product-list`])
              }
            })
        }
        // REVIEW PRODUCT AFTER SEAL SUCCUSS
        else if (value.type == 'review') {
          this.firestore.collection('product').doc(value.product.productKey).get().toPromise()
            .then((product) => {
              var _product: any = product.data();
              if (_product != undefined) {
                this.router.navigate([`/review-detail/${_product.productKey}`])
              }
              else {
                this.router.navigate([`/review-list`])
              }
            })
        }
        // ALL ORDER
        else if (value.type == 'order') {
          // sale-success-detail/jTCTIHm3sy2pSraBr1Bp
          this.firestore.collection('order', ref => ref
            .where('orderNo', '==', value.product.orderNo))
            .get().toPromise()
            .then((doc) => {
              console.log(doc)
              if (doc.size != 0) {
                var _orderKey: any = doc.docs[0].id;
                var _orderData: any = doc.docs[0].data();
                if (_orderData.status == 'waiting-for-delivery') {
                  // GO TO DES
                  this.router.navigate([`/shipped-detail/${_orderKey}`])
                }
                else if (_orderData.status == 'sale-success') {
                  // GO TO DES
                  this.router.navigate([`/sale-success-detail/${_orderKey}`])
                }
                else if (_orderData.status == 'return') {
                  // GO TO DES
                  this.router.navigate([`/return-products-detail/${_orderKey}`])
                }
              }
            })
        }
      })
  }

}
