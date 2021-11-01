import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-support-buy-banner',
  templateUrl: './support-buy-banner.component.html',
  styleUrls: ['./support-buy-banner.component.css']
})
export class SupportBuyBannerComponent implements OnInit {

  constructor(
    public path: LinkPathService,
    public router: Router,
    private route: ActivatedRoute,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.path.setPath('support');
  }

  supBuyProduct(){
    this.router.navigate([`/support-buy-product`]);
  }

  supListBanner(){
    this.router.navigate([`/support-list-banner`]);
  }

  supListProduct(){
    this.router.navigate([`/support-list-product`]);
  }

}
