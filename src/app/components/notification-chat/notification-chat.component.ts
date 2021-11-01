import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notification-chat',
  templateUrl: './notification-chat.component.html',
  styleUrls: ['./notification-chat.component.css']
})
export class NotificationChatComponent implements OnInit {

  public id;
  public chatListNonRead: any = []
  public chatListReaded: any = []
  // public showContent = false;
  public showChatList = true;
  public chatSearchNonRead:any = [];
  public chatSearchReaded:any = [];
  public showNoChatList = false;

  constructor(
    public path: LinkPathService,
    public router: Router,
    private route: ActivatedRoute,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.path.setPath('notiChat');
    // this.id = this.route.snapshot.paramMap.get("id");
    this.id = this.auth.currentUserId;
    if (this.id) {
      // console.log(this.id)
      // GET CHAT NON READ
      this.firestore.collection('chat', ref => ref
      .where(`members.${this.id}.type`, '==', 'seller') 
      .where(`readed.${this.id}`, '==', false)
      ).snapshotChanges()
        .map(actions => {
          return actions.map(action => ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
        }).subscribe(chat => {
          // console.log('CHAT NON READ -> ', chat)
          this.chatListNonRead = chat;
          // SET STATUS
          for (var i = 0; i < this.chatListNonRead.length; i++) {
            var _members:any = Object.keys(this.chatListNonRead[i].value.members);
            if (_members[0] != this.id) {
              if (this.chatListNonRead[i].value.members[_members[0]].displayName == null) {
                this.chatListNonRead[i].value.members[_members[0]].displayName = 'ห้องสนทนา'
              }
              if (this.chatListNonRead[i].value.members[_members[0]].profileImg.imgUrl == null) {
                this.chatListNonRead[i].value.members[_members[0]].profileImg.imgUrl = './assets/img/profile-icon-BG.svg'
              }
              this.chatListNonRead[i].value.chatTo = {
                displayName: this.chatListNonRead[i].value.members[_members[0]].displayName,
                imgUrl: this.chatListNonRead[i].value.members[_members[0]].profileImg.imgUrl
              }
              this.chatListNonRead[i].uid = this.chatListNonRead[i].value.members[_members[0]].uid,
              this.chatListNonRead[i].displayName = this.chatListNonRead[i].value.members[_members[0]].displayName;
            }
            else {
              if (this.chatListNonRead[i].value.members[_members[1]].displayName == null) {
                this.chatListNonRead[i].value.members[_members[1]].displayName = 'ห้องสนทนา'
              }
              if (this.chatListNonRead[i].value.members[_members[1]].profileImg.imgUrl == null) {
                this.chatListNonRead[i].value.members[_members[1]].profileImg.imgUrl = './assets/img/profile-icon-BG.svg'
              }
              this.chatListNonRead[i].value.chatTo = {
                displayName: this.chatListNonRead[i].value.members[_members[1]].displayName,
                imgUrl: this.chatListNonRead[i].value.members[_members[1]].profileImg.imgUrl
              }
              this.chatListNonRead[i].uid = this.chatListNonRead[i].value.members[_members[1]].uid,
              this.chatListNonRead[i].displayName = this.chatListNonRead[i].value.members[_members[1]].displayName;
            }
          }
          // console.log('CHAT NON READ -> ', this.chatListNonRead)

          // GET CHAT READDED
          this.firestore.collection('chat', ref => ref
          .where(`members.${this.id}.type`, '==', 'seller') 
          .where(`readed.${this.id}`, '==', true)
          ).snapshotChanges()
            .map(actions => {
              return actions.map(action => ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
            }).subscribe(chat => {
              // console.log('CHAT READED -> ', chat)
              this.chatListReaded = chat;
              // SET STATUS
              for (var i = 0; i < this.chatListReaded.length; i++) {
                var _members:any = Object.keys(this.chatListReaded[i].value.members);
                if (_members[0] != this.id) {
                  if (this.chatListReaded[i].value.members[_members[0]].displayName == null) {
                    this.chatListReaded[i].value.members[_members[0]].displayName = 'ห้องสนทนา'
                  }
                  if (this.chatListReaded[i].value.members[_members[0]].profileImg.imgUrl == null) {
                    this.chatListReaded[i].value.members[_members[0]].profileImg.imgUrl = './assets/img/profile-icon-BG.svg'
                  }
                  this.chatListReaded[i].value.chatTo = {
                    displayName: this.chatListReaded[i].value.members[_members[0]].displayName,
                    imgUrl: this.chatListReaded[i].value.members[_members[0]].profileImg.imgUrl
                  }
                  this.chatListReaded[i].uid = this.chatListReaded[i].value.members[_members[0]].uid,
                  this.chatListReaded[i].displayName = this.chatListReaded[i].value.members[_members[0]].displayName;
                }
                else {
                  if (this.chatListReaded[i].value.members[_members[1]].displayName == null) {
                    this.chatListReaded[i].value.members[_members[1]].displayName = 'ห้องสนทนา'
                  }
                  if (this.chatListReaded[i].value.members[_members[1]].profileImg.imgUrl == null) {
                    this.chatListReaded[i].value.members[_members[1]].profileImg.imgUrl = './assets/img/profile-icon-BG.svg'
                  }
                  this.chatListReaded[i].value.chatTo = {
                    displayName: this.chatListReaded[i].value.members[_members[1]].displayName,
                    imgUrl: this.chatListReaded[i].value.members[_members[1]].profileImg.imgUrl
                  }
                  this.chatListReaded[i].uid = this.chatListReaded[i].value.members[_members[1]].uid,
                  this.chatListReaded[i].displayName = this.chatListReaded[i].value.members[_members[1]].displayName;
                }
              }
            })
            // console.log('CHAT READED -> ', this.chatListReaded)
        })
    }
    else {
      this.router.navigate(['/'])
    }
  }

  sortFunc (a, b) {
    return b.value.updateAt.seconds - a.value.updateAt.seconds
  }

  searchChat($event){
    var shopNameInput = $event.target.value
    // console.log('shopNameInput -> ', shopNameInput)
    // INPUT SEARCH SHOP NAME
    if(shopNameInput != ''){
      // FILTER SHOP NAME IN NON READ LIST
      var nonRead = this.filterNonRead(shopNameInput);
      if(nonRead.length != 0){
        this.chatSearchNonRead = nonRead;
        this.showChatList = false;
        this.showNoChatList = false;
      }
      else{
        this.chatSearchNonRead = [];
      }
      // FILTER SHOP NAME IN READES LIST
      var readed = this.filterReaded(shopNameInput);
      if(readed.length != 0){
        this.chatSearchReaded = readed;
        this.showChatList = false;
        this.showNoChatList = false;
      }
      else{
        this.chatSearchReaded = [];
      }
      // CHAT SEARCH LIST == NULL (2 TYPE)
      if(this.chatSearchNonRead.length == 0 && this.chatSearchReaded.length == 0){
        this.showChatList = false;
        this.showNoChatList = true;
      }
    }
    else{
      // SHOW CHAT LIST
      this.showChatList = true;
      this.showNoChatList = false;
      this.chatSearchNonRead = [];
      this.chatSearchReaded = [];
    }
  }

  filterNonRead(shopNameInput) {
    // console.log(shopNameInput)
    // console.log(this.chatListNonRead)
    return this.chatListNonRead.filter(object => {
      return object['displayName'].includes(shopNameInput)
    });
  }

  filterReaded(shopNameInput) {
    // console.log(shopNameInput)
    // console.log(this.chatListNonRead)
    return this.chatListReaded.filter(object => {
      return object['displayName'].includes(shopNameInput)
    });
  }

  gotoChatRoom(chatKey, chatToUID, displayName){
    this.router.navigate([`/noti-chat-reply/${chatKey}&${chatToUID}&${displayName}`]);
  }

}
