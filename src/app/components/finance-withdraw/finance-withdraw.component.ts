import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-finance-withdraw',
  templateUrl: './finance-withdraw.component.html',
  styleUrls: ['./finance-withdraw.component.css']
})
export class FinanceWithdrawComponent implements OnInit {
  public userSeller: any;
  public showContent = false;
  public dateWithdraw: any;
  public balance:number = 0;

  constructor(
    public path: LinkPathService,
    public router: Router,
    private route: ActivatedRoute,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.path.setPath('financeSummary');
    // DATE FOR WITHDRAW
    this.firestore.collection('dateWithdraw-seller').doc('az9D369LMvUszwYLWfGO').get().toPromise()
    .then((val) => {
      this.dateWithdraw = val.data();
      // GET BOOKBANK
      this.firestore.collection('user-seller').doc(this.auth.currentUserId).get().toPromise()
      .then((val) => {
        this.userSeller = val.data();
        if(this.userSeller != null){
          var startTimeStamp = this.dateWithdraw.lastWithdraw;
          var endTimeStamp = firebase.firestore.Timestamp.now().toDate();
          // GET FINANCE TYPE STATUS == TRUE (NON WITHDRAW)
          this.firestore.collection('finance-seller', ref => ref
          .where('sellerUID', '==', this.auth.currentUserId)
          .where('status', '==', true)
          .where('createAt', '>=', startTimeStamp)
          .where('createAt', '<=', endTimeStamp)
          .orderBy('createAt')
          ).snapshotChanges()
          .map(actions => {
            return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
          }).subscribe(items => {
            // console.log(items)
            if(items.length != 0){
              var _items:any = items
              var revenue:number = 0;
              var expenditure:number = 0;
              for(var i=0; i<items.length; i++){
                if(_items[i].value.typeEN == 'revenue'){
                  revenue = revenue + _items[i].value.amount
                }
                else{
                  if(_items[i].value.description != 'เบิกเงิน'){
                    expenditure = expenditure + _items[i].value.amount
                  }
                }
              }
              this.balance = revenue - expenditure;
              this.showContent = true;
            }
            else{
              this.showContent = true;
            }
          })
        }
      })
      .catch(error => { console.log(error) });
    })
    .catch(error => { console.log(error) });
  }

  summary(){
    this.router.navigate([`/finance-summary`]);
  }

  // deposit(){
  //   this.router.navigate([`/finance-deposit`]);
  // }

  waitingWithdraw(){
    this.router.navigate([`/finance-waiting-withdraw`]);
  }

  donate(){
    this.router.navigate([`/finance-donate`]);
  }

}
