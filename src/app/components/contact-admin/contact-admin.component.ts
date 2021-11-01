import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.component.html',
  styleUrls: ['./contact-admin.component.css']
})
export class ContactAdminComponent implements OnInit {

  constructor(
    public path: LinkPathService,
    public router: Router,
    private route: ActivatedRoute,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.path.setPath('contactAdmin');
  }

  gotoChatAdmin(){
    // console.log(this.auth.currentUserId)
    this.firestore.collection('chat', ref => ref
    .where(`members.${this.auth.currentUserId}.uid`, '==', this.auth.currentUserId)
    .where(`members.${this.auth.currentUserId}.type`, '==', 'seller')
    .where(`members.Gj4gFzpQDDO5wcoKIN0am2I1AgC2.uid`, '==', 'Gj4gFzpQDDO5wcoKIN0am2I1AgC2')
    ).get().toPromise()
    .then((val) => {
      // console.log(val)
      if(val.size != 0){
        // OLD CHAT
        // GO TO CHAT ADMIN
        this.router.navigate([`/noti-chat-reply/${val.docs[0].id}&Gj4gFzpQDDO5wcoKIN0am2I1AgC2&A Bid More (Admin)`]);
      }
      else{
        // NEW CHAT 
        // GO TO CHAT ADMIN
        this.router.navigate([`/noti-chat-reply/null&Gj4gFzpQDDO5wcoKIN0am2I1AgC2&A Bid More (Admin)`]);
      }
    })
  }

}
