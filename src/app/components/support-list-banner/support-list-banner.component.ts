import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-support-list-banner',
  templateUrl: './support-list-banner.component.html',
  styleUrls: ['./support-list-banner.component.css']
})
export class SupportListBannerComponent implements OnInit {

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

  supBuyBanner(){
    this.router.navigate([`/support-buy-banner`]);
  }

  supBuyProduct(){
    this.router.navigate([`/support-buy-product`]);
  }

  supListProduct(){
    this.router.navigate([`/support-list-product`]);
  }

}
