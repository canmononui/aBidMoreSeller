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
  selector: 'app-profile-settings-shopfile',
  templateUrl: './profile-settings-shopfile.component.html',
  styleUrls: ['./profile-settings-shopfile.component.css']
})
export class ProfileSettingsShopfileComponent implements OnInit {
  public textError = ''
  public status = false
  public showContent = false;
  public showLoading = false;
  // ForDropDown
  public showIndividual = true;
  public showCorporation = false;
  public text_type_place_company = 'บุคคลธรรมดา'
  public idCardIndividual: any;
  public printidCard = '';
  public houseRegis: any;
  public printhouseRegis = '';
  // public bookBank : any;
  // public printbookBank = '';
  public vatRegis: any;
  public printvatRegis = '';
  public idCardCorporation: any = [];
  public dbdFile: any;
  public printdbdFile = '';
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

  selectIndividual() {
    if (this.text_type_place_company != 'บุคคลธรรมดา') {
      this.showIndividual = true;
      this.showCorporation = false;
      this.text_type_place_company = 'บุคคลธรรมดา'
      // Clear Data Group idCard
      this.idCardCorporation = [];
    }
  }

  selectCorporation() {
    if (this.text_type_place_company != 'นิติบุคคล/บริษัท') {
      this.showIndividual = false;
      this.showCorporation = true;
      this.text_type_place_company = 'นิติบุคคล/บริษัท'
      // Clear Data 1 idCard
      this.idCardIndividual = null;
      this.printidCard = '';
    }
  }


  // idCard For Individual
  uploadidCardIndividual(event) {
    // The File object
    // console.log(event.target.files)
    event = event.target.files;
    const validImageTypes = ['image/jpeg', 'image/png'];
    const fileType = event.item(0)['type'];
    if (!validImageTypes.includes(fileType)) {
      return;
    }
    else {
      this.idCardIndividual = event.item(0)
      this.printidCard = this.idCardIndividual.name;
    }
  }

  // idCard For Corporation
  uploadidCardCorporation(event) {
    event = event.target.files;
    const validImageTypes = ['image/jpeg', 'image/png'];
    const fileType = event.item(0)['type'];
    if (!validImageTypes.includes(fileType)) {
      return;
    }
    else {
      this.idCardCorporation.push({
        itemFile: event.item(0),
        FileName: event.item(0).name
      });
      // console.log(this.idCardCorporation);
    }
  }

  removeidCardCorporation(data) {
    this.idCardCorporation.splice(this.idCardCorporation.indexOf(data), 1);
  }

  uploadhouseRegis(event) {
    event = event.target.files;
    const validImageTypes = ['image/jpeg', 'image/png'];
    const fileType = event.item(0)['type'];
    if (!validImageTypes.includes(fileType)) {
      return;
    }
    else {
      this.houseRegis = event.item(0)
      this.printhouseRegis = this.houseRegis.name;
    }
  }

  uploadDBDFile(event) {
    event = event.target.files;
    // console.log(event)
    const validImageTypes = ['application/pdf'];
    const fileType = event.item(0)['type'];
    if (!validImageTypes.includes(fileType)) {
      return;
    }
    else {
      this.dbdFile = event.item(0)
      this.printdbdFile = this.dbdFile.name;
    }
  }

  // uploadbookBank(event) {
  //   event = event.target.files;
  //     const validImageTypes = ['image/jpeg', 'image/png'];
  //     const  fileType = event.item(0)['type'];
  //     if (!validImageTypes.includes(fileType)) {
  //       return;
  //     }
  //     else{
  //       this.bookBank = event.item(0)
  //       this.printbookBank = this.bookBank.name;
  //     }
  // }

  uploadvatRegis(event) {
    event = event.target.files;
    const validImageTypes = ['image/jpeg', 'image/png'];
    const fileType = event.item(0)['type'];
    if (!validImageTypes.includes(fileType)) {
      return;
    }
    else {
      this.vatRegis = event.item(0)
      this.printvatRegis = this.vatRegis.name;
    }
  }

  checkFile() {
    // console.log('checkFile')
    if (this.text_type_place_company == 'บุคคลธรรมดา') {
      this.textError = '';
      if (this.idCardIndividual != null && this.houseRegis != null) {
        // this.showContent = false;
        // this.showLoading = true;
        this.status = true
        this.textError = 'ต้องการเพิ่มเอกสาร ?';
      }
      else {
        this.status = false
        this.textError = 'กรุณาเพิ่มข้อมูลให้ถูกต้องครบถ้วน';
      }
    }
    else {
      if (this.idCardCorporation != null && this.dbdFile != null) {
        // this.showContent = false;
        // this.showLoading = true;
        this.status = true
        this.textError = 'ต้องการเพิ่มเอกสาร ?';
      }
      else {
        this.status = false
        this.textError = 'กรุณาเพิ่มข้อมูลให้ถูกต้องครบถ้วน';
      }
    }
  }

  addFile() {
    // console.log('addFile')
    if (this.status) {
      this.showContent = false;
      this.showLoading = true;
      // --------------------------------------------------
      // Check Type
      if (this.text_type_place_company == 'บุคคลธรรมดา') {
        // Upload File To Firebase Storage "idCardIndividual"
        const idCardIndividualpath = `idCardIndividual/${new Date().getTime()}_${this.auth.currentUserId}_${this.idCardIndividual.name}`;
        this.task = this.storage.upload(idCardIndividualpath, this.idCardIndividual)
        const idCardIndividualfileRef = this.storage.ref(idCardIndividualpath);
        this.task.snapshotChanges().pipe(
          finalize(() => {
            idCardIndividualfileRef.getDownloadURL().subscribe(url => {
              // SET DATA
              const getidCardIndividualUrl = url;
              // Upload File To Firebase Storage "houseRegis"
              const houseRegispath = `houseRegis/${new Date().getTime()}_${this.auth.currentUserId}_${this.houseRegis.name}`;
              this.task = this.storage.upload(houseRegispath, this.houseRegis)
              const houseRegisfileRef = this.storage.ref(houseRegispath);
              this.task.snapshotChanges().pipe(
                finalize(() => {
                  houseRegisfileRef.getDownloadURL().subscribe(url => {
                    // SET DATA
                    const gethouseRegisUrl = url;
                    // Upload File To Firebase Storage "vatRegis"
                    if (this.vatRegis == null) {
                      // NO FILE "vatRegis"
                      this.updateData(getidCardIndividualUrl, gethouseRegisUrl, null);
                    }
                    else {
                      // HAVE FILE "vatRegis"
                      const vatRegispath = `vatRegis/${new Date().getTime()}_${this.auth.currentUserId}_${this.vatRegis.name}`;
                      this.task = this.storage.upload(vatRegispath, this.vatRegis)
                      const vatRegisfileRef = this.storage.ref(vatRegispath);
                      this.task.snapshotChanges().pipe(
                        finalize(() => {
                          vatRegisfileRef.getDownloadURL().subscribe(url => {
                            // SET DATA
                            const getvatRegisUrl = url;
                            // Call Function
                            this.updateData(getidCardIndividualUrl, gethouseRegisUrl, getvatRegisUrl);
                          });
                        }))
                        .subscribe();
                    }

                  });
                }))
                .subscribe();
            });
          }))
          .subscribe();
      }
      else {
        var getidCardCorporationUrl: any = [];
        for (var i = 0; i < this.idCardCorporation.length; i++) {
          // Upload File To Firebase Storage LOOP For "idCardCorporation"
          const idCardCorporationpath = `idCardCorporation/${new Date().getTime()}_${this.auth.currentUserId}_${this.idCardCorporation[i].itemFile.name}`;
          this.task = this.storage.upload(idCardCorporationpath, this.idCardCorporation[i].itemFile)
          const idCardCorporationfileRef = this.storage.ref(idCardCorporationpath);
          this.task.snapshotChanges().pipe(
            finalize(() => {
              idCardCorporationfileRef.getDownloadURL().subscribe(url => {
                // SET DATA
                const getFileUrl = url;
                getidCardCorporationUrl.push({
                  idCardCorporation_urlFile: getFileUrl
                });
                // Check LOOP Up Load All "idCardCorporation"
                if (i == getidCardCorporationUrl.length) {
                  // Upload File To Firebase Storage "dbdFile"
                  const dbdFilepath = `dbdFile/${new Date().getTime()}_${this.auth.currentUserId}_${this.dbdFile.name}`;
                  this.task = this.storage.upload(dbdFilepath, this.dbdFile)
                  const dbdFilefileRef = this.storage.ref(dbdFilepath);
                  this.task.snapshotChanges().pipe(
                    finalize(() => {
                      dbdFilefileRef.getDownloadURL().subscribe(url => {
                        // SET DATA
                        const getdbdFileUrl = url;
                        // Upload File To Firebase Storage "vatRegis"
                        if (this.vatRegis == null) {
                          // NO FILE "vatRegis"
                          this.updateData(getidCardCorporationUrl, getdbdFileUrl, null);
                        }
                        else {
                          // HAVE FILE "vatRegis"
                          const vatRegispath = `vatRegis/${new Date().getTime()}_${this.auth.currentUserId}_${this.vatRegis.name}`;
                          this.task = this.storage.upload(vatRegispath, this.vatRegis)
                          const vatRegisfileRef = this.storage.ref(vatRegispath);
                          this.task.snapshotChanges().pipe(
                            finalize(() => {
                              vatRegisfileRef.getDownloadURL().subscribe(url => {
                                // SET DATA
                                const getvatRegisUrl = url;
                                // Call Function
                                this.updateData(getidCardCorporationUrl, getdbdFileUrl, getvatRegisUrl);
                                // End Process
                              });
                            }))
                            .subscribe();
                        }
                        // End Process
                      });
                    }))
                    .subscribe();
                } //Enf if
              });
            }))
            .subscribe();
        }
      }
    }
  }

  updateData(idCardCorporationUrl, houseRegis_dbdFive, vatRegisUrl) {
    // console.log(idCardCorporationUrl, houseRegis_dbdFive, vatRegisUrl)

    if (this.text_type_place_company == 'บุคคลธรรมดา') {
      // shopType = 'Individual'
      this.firestore.collection('user-seller').doc(this.auth.currentUserId).update({
        shopType: 'Individual'
      })
        .then(docRef => {
          this.updateDataSubCol(idCardCorporationUrl, houseRegis_dbdFive, vatRegisUrl)
        })
    }
    else {
      // shopType = 'Corporation'
      this.firestore.collection('user-seller').doc(this.auth.currentUserId).update({
        shopType: 'Corporation'
      })
        .then(docRef => {
          this.updateDataSubCol(idCardCorporationUrl, houseRegis_dbdFive, vatRegisUrl)
        })
    }
  }

  updateDataSubCol(idCardCorporationUrl, houseRegis_dbdFive, vatRegisUrl) {
    // console.log(idCardCorporationUrl, houseRegis_dbdFive, vatRegisUrl)
    // CHECK DOC ID
    this.firestore.collection('user-seller').doc(this.auth.currentUserId).collection('linkFile', ref => ref
      .limit(1))
      .get().toPromise()
      .then((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          // console.log(doc.id, " => ", doc.data());
          this.firestore.collection('user-seller').doc(this.auth.currentUserId).collection('linkFile').doc(doc.id).update({
            idCard: idCardCorporationUrl,
            houseRegis_dbdFive: houseRegis_dbdFive,
            vatRegis: vatRegisUrl
          }).then(docRef => {
            this.router.navigate([`/profile-settings`]);
          })
        });
      });
  }

}
