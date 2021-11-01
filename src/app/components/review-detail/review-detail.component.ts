import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css']
})
export class ReviewDetailComponent implements OnInit {

  public id;
  public productDes: any
  public rateStar: any = 5;
  public reviewList: any = [];
  public shopProductDes = false;
  public commentReport: any;
  public reportDesInput = '';
  // public review4List:any = [];
  // public review3List:any = [];
  // public review2List:any = [];
  // public review1List:any = [];

  constructor(
    public path: LinkPathService,
    public router: Router,
    private route: ActivatedRoute,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.path.setPath('reviewList');
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      // console.log(this.id)
      // GET PRODUCT DES
      this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product').doc(this.id).get().toPromise()
        .then((productDes) => {
          this.productDes = productDes.data();
          // GET REVIEW 5 STAR
          this.shopProductDes = true;
          this.getRateStar(5);
        })
    }
    else {
      this.router.navigate(['/review-lsit']);
    }
  }

  getRateStar(star) {
    this.reviewList = [];
    star = Number(star);
    this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product').doc(this.id).collection('product-review', ref => ref
      .where('ratingStars', '==', star))
      .get().toPromise()
      .then((review) => {
        if (review.size != 0) {
          review.forEach((doc: any) => {
            // console.log(doc.id, '=>', doc.data())
            this.reviewList.push({
              key: doc.id,
              value: doc.data()
            });
          })
        }
        else {
          this.reviewList = [];
        }
      })
  }

  selecStarMenu(rateStar) {
    this.rateStar = Number(rateStar);
    this.getRateStar(this.rateStar);
  }

  reportDes(reportDes) {
    // console.log(reportDes)
    this.commentReport = reportDes;
  }

  reportComment(reason) {
    // console.log(reason);
    if (reason != '') {
      this.reportDesInput = '';
      this.firestore.collection('shop').doc(this.auth.currentUserId).get().toPromise()
        .then((shop) => {
          var _shop: any = shop.data();
          this.firestore.collection('report-review').add({
            imgProduct1: {
              imgUrl: this.productDes.imgProduct[0].imgUrl,
              imgpath: this.productDes.imgProduct[0].imgpath
            },
            commentReview: this.commentReport,
            productKey: this.id,
            readed: false,
            reason: reason,
            shopName: _shop.shopName,
            sellerUID: _shop.uid,
            createAt: firebase.firestore.Timestamp.now()
          })
        })
    }
  }

}
