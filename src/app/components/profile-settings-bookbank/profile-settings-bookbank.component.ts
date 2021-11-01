import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-settings-bookbank',
  templateUrl: './profile-settings-bookbank.component.html',
  styleUrls: ['./profile-settings-bookbank.component.css']
})
export class ProfileSettingsBookbankComponent implements OnInit {
  public textError = ''
  public placeholderBank = 'กรุณาเลือกธนาคาร'
  public status = false
  public showContent = false;
  // public showLoading = false;
  // public userSeller: any;
  public bankCode
  public bankNameTH
  public bookBank : any;
  public printbookBank = '';
  task: AngularFireUploadTask;

  constructor(
    public path: LinkPathService,
    public router: Router,
    public db: AngularFireDatabase,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
    ) { }

  ngOnInit(): void {
    this.path.setPath('profileSettings');
    this.showContent = true
  }

  selectBank(bankCode, bankNameTH, placeholderBank){
    this.bankCode = bankCode;
    this.bankNameTH = bankNameTH
    this.placeholderBank = placeholderBank;
  }

  uploadbookBank(event) {
    event = event.target.files;
    if(event.length != 0){
      const validImageTypes = ['image/jpeg', 'image/png'];
      const  fileType = event.item(0)['type'];
      if (!validImageTypes.includes(fileType)) {
        return;
      }
      else{
        this.bookBank = event.item(0)
        this.printbookBank = this.bookBank.name;
      }
    }
  }

  checkBank(bankNumber, bankBranch, accountName){
    if(this.placeholderBank == 'กรุณาเลือกธนาคาร'){
      this.textError = 'กรุณาเลือกธนาคาร'
      this.status = false
    }
    else if(bankNumber == ''){
      this.textError = 'กรุณาเพิ่มเลขที่บัญชี'
      this.status = false
    }
    else if(bankBranch == ''){
      this.textError = 'กรุณาเพิ่มเลขที่สาขา'
      this.status = false
    }
    else if(accountName == ''){
      this.textError = 'กรุณาเพิ่มชื่อบัญชี'
      this.status = false
    }
    else if(this.bookBank == null){
      this.textError = 'กรุณาอัพรูปภาพหน้าสมุดบัญชี'
      this.status = false
    }
    else {
      this.textError = 'ต้องการเพิ่มบัญชีร้านค้า ?'
      this.status = true
    }
  }

  addBank(bankNumber, bankBranch, accountName){
    if(this.status){
      // UPLOAD BOOK BANK FILE
      const bookBankpath = `bookBank/${new Date().getTime()}_${this.auth.currentUserId}_${this.bookBank.name}`;

      this.task = this.storage.upload(bookBankpath, this.bookBank)
      const bookBankfileRef = this.storage.ref(bookBankpath);
      this.task.snapshotChanges().pipe(
        finalize(() => {
          bookBankfileRef.getDownloadURL().subscribe(url => {
          const getbookBankUrl = url;
          this.updateDtata(bankNumber, bankBranch, accountName, getbookBankUrl)
        });
      }))
      .subscribe();
    }
  }

  updateDtata(bankNumber, bankBranch, accountName, getbookBankUrl){
    this.firestore.collection('user-seller').doc(this.auth.currentUserId).update({
      bookbank: {
        bankCode: this.bankCode,
        bankNameTH: this.bankNameTH,
        bankFullNameTH: this.placeholderBank,
        bankNumber: bankNumber, 
        bankBranch: bankBranch, 
        accountName: accountName
      }
    })
    .then(docRef => {
      this.addDataSubCol(getbookBankUrl)
    })
  }

  addDataSubCol(getbookBankUrl){
    // CHECK DOC ID
    this.firestore.collection('user-seller').doc(this.auth.currentUserId).collection('linkFile', ref => ref
    .limit(1))
    .get().toPromise()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        // console.log(doc.id, " => ", doc.data());
        this.firestore.collection('user-seller').doc(this.auth.currentUserId).collection('linkFile').doc(doc.id).update({ 
          bookBank: getbookBankUrl,
        }).then(docRef => {
          this.router.navigate([`/profile-settings`]);
        })
      });
    });
  }
}
