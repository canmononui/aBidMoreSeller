import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-support-buy-product',
  templateUrl: './support-buy-product.component.html',
  styleUrls: ['./support-buy-product.component.css']
})
export class SupportBuyProductComponent implements OnInit {
  public sliderPrice: number = 1;
  public sliderDay: number = 1;
  public selectCard = false;
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

  sliderPriceFunc(valueInput) {
    // console.log(valueInput.newValue);
    this.sliderPrice = valueInput.newValue
  }

  sliderDayFunc(valueInput) {
    // console.log(valueInput.newValue);
    this.sliderDay = valueInput.newValue
  }

  submitCard(){
    this.selectCard = true;
  }

  supBuyBanner(){
    this.router.navigate([`/support-buy-banner`]);
  }

  supListBanner(){
    this.router.navigate([`/support-list-banner`]);
  }

  supListProduct(){
    this.router.navigate([`/support-list-product`]);
  }

}
