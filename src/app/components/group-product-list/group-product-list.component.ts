import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-product-list',
  templateUrl: './group-product-list.component.html',
  styleUrls: ['./group-product-list.component.css']
})
export class GroupProductListComponent implements OnInit {

  public groupProductList:any = [];

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
    // groupProductListPath
    // groupProduct
    this.firestore.collection('shop').doc(this.auth.currentUserId).get().toPromise()
    .then((shopDes) => {
      var _shopDes:any = shopDes.data();
      if(_shopDes.groupProduct != null){
        _shopDes.groupProduct.forEach((groupName: any) => {
          this.firestore.collection('product', ref => ref
          .where('groupProduct', '==', groupName)
          .where('sellerUID', '==', this.auth.currentUserId)
          ).get().toPromise()
          .then((productByGroupName) => {
            this.groupProductList.push({
              groupName: groupName,
              count: productByGroupName.size
            })
          })
        })
      }
      else {
        this.groupProductList = [];
      }
    })
  }

  editGroupProduct(groupProductNAME){
    // editGroupProductNAME
    this.router.navigate([`/group-product-edit/${groupProductNAME}`]);
  }

  createGroup(){
    this.router.navigate([`/group-product-create`]);
  }
}
