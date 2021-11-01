import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LinkPathService } from '../../services/link-path.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  public text_navBar = '';
  public file_name = '';
  public userSeller: any;
  authState: any = null;
  public profileImg = '/assets/img/navbar/store-icon.png'
  public showNavBar = false;
  public chatCount = '0';
  public notiCount = '0';
  public navBarMenuDisables = true;

  constructor( 
    public router:Router,
    public auth:AuthService,
    public path: LinkPathService,
    public firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    ) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
      // console.log(this.authState)
      if(this.authState != null){
        this.firestore.collection('user-seller').doc(this.authState.uid).valueChanges()
        .subscribe(val => {
          this.userSeller = val;
          // if(this.userSeller.emailVerifyAt != null){
          //   this.showNavBar = true;
          // }
          // CHECK SHOP PROFILE IMG = NULL ?
          if(this.userSeller.profileImg.imgUrl == null){
            this.profileImg = '/assets/img/navbar/store-icon.png';
          }
          else {
            this.profileImg = this.userSeller.profileImg.imgUrl
          }
          // CHECK SHOP STATUS
          if(this.userSeller.shopStatus == 'waitingApproval') {
            // USER SELLER STATUS IS WAITING APPROVAL
            // THIS CAN USE SYSTEM
            // GET CHAT COUNT
            this.firestore.collection('chat', ref => ref
            .where(`readed.${this.auth.currentUserId}`, '==', false )
            .where(`members.${this.auth.currentUserId}.type`, '==', 'seller' )
            ).snapshotChanges()
              .map(actions => {
                return actions.map(action => ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
              }).subscribe(chat => {
                // console.log(chat.length)
                if(chat.length > 99){
                  this.chatCount = '99+';
                }
                else{
                  this.chatCount = String(chat.length);
                }
              })
            // GET NOTI COUNT
            this.firestore.collection('shop').doc(this.auth.currentUserId).collection('notifications', ref => ref
            .where('readed', '==', false )
            ).snapshotChanges()
              .map(actions => {
                return actions.map(action => ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
              }).subscribe(noti => {
                // console.log(noti.length)
                if(noti.length > 99){
                  this.notiCount = '99+';
                }
                else{
                  this.notiCount = String(noti.length);
                }
              })
            this.navBarMenuDisables = false;
            this.showNavBar = true;
          }
          else {
            // USER SELLER STATUS IS WAITING VERIFIED PHONE
            // USER SELLER STATUS IS WAITING UPDATE USER SELLER
            // THIS CAN'T USE SYSTEM
            this.chatCount = '0';
            this.notiCount = '0';
            this.navBarMenuDisables = true;
            this.showNavBar = true;
          }
          // if(this.authState == null){
          //   this.showNavBar = false;
          // }
        });
      }
      else {
        // NEW VERSION
        this.chatCount = '0';
        this.notiCount = '0';
        this.navBarMenuDisables = true;
        this.showNavBar = true;
        // OLD VERSION
        // this.showNavBar = false;
      }
    });
  }

  selectProfile(){
    this.router.navigate(['/profile-settings']);
  }

  signOut(){
    this.path.setPath('signOut');
    this.auth.signOut()
  }

}
