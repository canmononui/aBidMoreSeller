import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-finance-waiting-withdraw',
  templateUrl: './finance-waiting-withdraw.component.html',
  styleUrls: ['./finance-waiting-withdraw.component.css']
})
export class FinanceWaitingWithdrawComponent implements OnInit {

  public showContent = false;
  public showTable = false;
  public dateWithdraw: any;
  public withdrawData: any;
  public dataWithdrawWaiting: any;

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
    this.firestore.collection('dateWithdraw-seller').doc('az9D369LMvUszwYLWfGO').get().toPromise()
    .then((val) => {
      this.dateWithdraw = val.data();
      this.showContent = true;
      this.firestore.collection('finance-seller', ref => ref
        .where('sellerUID', '==', this.auth.currentUserId)
        .where('typeEN', '==', 'expenditure')
        .where('description', '==', 'เบิกเงิน')
        .where('status', '==', true)
        .orderBy('createAt', 'desc')
        .limit(1)
        ).snapshotChanges()
        .map(actions => {
          return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
        }).subscribe(items => {
          console.log('items : ',items);
          // console.log('items', items.length)
          if(items.length != 0){
            // console.log('no',items)
            this.dataWithdrawWaiting = items;
            this.showTable = true;
          }
          else{
            this.dataWithdrawWaiting = [];
            this.showTable = false;
          }
        });
    })
    .catch(error => { console.log(error) });
  }

  summary(){
    this.router.navigate([`/finance-summary`]);
  }

  withdraw(){
    this.router.navigate([`/finance-withdraw`]);
  }

  waitingWithdraw(){
    this.router.navigate([`/finance-waiting-withdraw`]);
  }

  donate(){
    this.router.navigate([`/finance-donate`]);
  }

}
