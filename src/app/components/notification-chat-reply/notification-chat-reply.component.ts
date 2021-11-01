import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit, OnDestroy } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase';

@Component({
  selector: 'app-notification-chat-reply',
  templateUrl: './notification-chat-reply.component.html',
  styleUrls: ['./notification-chat-reply.component.css']
})
export class NotificationChatReplyComponent implements OnInit {

  public id;
  public messagesList: any = [];
  public showNoMes = false;
  public chatDocKey: string;
  public displayName: string;
  public messageInputValue = '';
  public chatToUID: any;
  public profileChat: string = './assets/img/WebsiteLogo-hourglass-B-Edit2_MoreBubble_shadow.png';
  public subscriptionMess:any = null;
  @ViewChild('mesDes') private mesDes: ElementRef;

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
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      var splitID = this.id.split("&", 3);
      this.chatDocKey = splitID[0];
      this.chatToUID = splitID[1]
      this.displayName = splitID[2];
      // console.log('chatDocKey ->', this.chatDocKey)
      // console.log('chatToUID ->', this.chatToUID)
      // console.log('displayName ->', this.displayName)
      if (this.chatDocKey != 'null') {
        // GET MESSAGES
        this.subscriptionMess = this.firestore.collection('chat').doc(this.chatDocKey).collection('messages', ref => ref
        .orderBy('createAt')
        ).snapshotChanges()
          .map(actions => {
            return actions.map(action => ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
          }).subscribe(chat => {
            // console.log('CHAT NON READ -> ', chat)
            if (chat.length != 0) {
              this.firestore.collection('chat').doc(this.chatDocKey).get().toPromise()
                .then((doc) => {
                  var _doc: any = doc.data()
                  // CHECK CHAT TO UID PROFILE NOT NULL 
                  if(_doc.members[`${this.chatToUID}`].profileImg.imgUrl != null){
                    this.profileChat = _doc.members[`${this.chatToUID}`].profileImg.imgUrl;
                  }
                  // SET READED STATUS [BOOLEAN]
                  if (_doc.readed[`${this.auth.currentUserId}`] == false) {
                    _doc.readed[`${this.auth.currentUserId}`] = true
                    this.firestore.collection('chat').doc(this.chatDocKey).update({
                      readed: _doc.readed
                    })
                      .then((doc) => {
                        this.messagesList = chat;
                        // console.log(this.messagesList)
                        this.showNoMes = false;
                      })
                  }
                  else {
                    this.messagesList = chat;
                    // console.log(this.messagesList)
                    this.showNoMes = false;
                  }
                })
            }
            else {
              this.messagesList = [];
              this.showNoMes = true;
            }
          })
      }
      else {
        // FIRST CHAT NO MESSAGES
        this.messagesList = [];
        this.showNoMes = true;
      }
    }
    else {
      this.router.navigate(['/noti-chat'])
    }
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 

  scrollToBottom(): void {
    // var objDiv = document.getElementById("mesDes");
    try {
      this.mesDes.nativeElement.scrollTop = this.mesDes.nativeElement.scrollHeight;
    } catch(err) { }                 
  }   

  ngOnDestroy() {
    if(this.subscriptionMess != null){
      this.subscriptionMess.unsubscribe();
    }
  }

  sendMessage(messageInput) {
    // console.log(messageInput)
    if (this.chatDocKey != 'null') {
      // OLD CHAT
      if (messageInput != '') {
        this.messageInputValue = '';
        // GET CHAT DOC DATA
        this.firestore.collection('chat').doc(this.chatDocKey).get().toPromise()
          .then((doc) => {
            var _doc: any = doc.data()
            // SET READED STATUS [BOOLEAN]
            _doc.readed[`${this.chatToUID}`] = false
            _doc.readed[`${this.auth.currentUserId}`] = true
            // console.log(_doc.readed)
            // ADD MESSAGE TO SUBCOLLECTION "MESSAGES"
            this.firestore.collection('chat').doc(this.chatDocKey).collection('messages').add({
              createAt: firebase.firestore.Timestamp.now(),
              text: messageInput,
              uid: this.auth.currentUserId
            })
            .then((doc) => {
              this.firestore.collection('chat').doc(this.chatDocKey).update({
                readed: _doc.readed
              })
            })
          })
      }
    }
    else{
      // NEW CHAT
      if (messageInput != '') {
        this.messageInputValue = '';  
        var timeStamp:any = firebase.firestore.Timestamp.now();
        var readed:any = {}
        readed[`${this.chatToUID}`] = false;
        readed[`${this.auth.currentUserId}`] = true;
        var members:any = {}
        // console.log(readed)
        this.firestore.collection('shop').doc(this.auth.currentUserId).get().toPromise()
        .then((userShop) => {
          var _userShop:any = userShop.data();
          // SET MEMBER SELLER
          members[`${this.auth.currentUserId}`] = {
            displayName: _userShop.shopName,
            profileImg: _userShop.profileImg,
            uid: this.auth.currentUserId,
            type: 'seller'
          };
          // CHECK CHAT TO TYPE
          // var membersChatTo:any = this.getMembersChatTo(this.chatToUID)
          if(this.chatToUID == 'Gj4gFzpQDDO5wcoKIN0am2I1AgC2'){
            // SET MEMBER ADMIN
            members[`${this.chatToUID}`] = {
              displayName: 'A Bid More (Admin)',
              profileImg: {
                imgUrl: null,
                imgpath: null
              },
              uid: this.chatToUID,
              type: 'admin'
            };
            // ADD CHAT TO COLLECTION "CHAT"
            this.addChatMessFirst(timeStamp, _userShop, readed, members, messageInput)
          }
          else{
            // SET MEMBER BUYER
            this.firestore.collection('user-buyer').doc(this.chatToUID).get().toPromise()
            .then((userBuyer) => {
              var _userBuyer:any = userBuyer.data();
              // SET MEMBER BUYER
              members[`${this.chatToUID}`] = {
                displayName: _userBuyer.displayName,
                profileImg: _userBuyer.profileImg,
                uid: this.chatToUID,
                type: 'buyer'
              }
              // ADD CHAT TO COLLECTION "CHAT"
              this.addChatMessFirst(timeStamp, _userBuyer, readed, members, messageInput)
            })
          }
        })
      }
    }
  }

  addChatMessFirst(timeStamp, _userBuyer, readed, members, messageInput){
    // ADD CHAT TO COLLECTION "CHAT"
    this.firestore.collection('chat').add({
      createAt: timeStamp,
      members: members,
      readed: readed,
      updateAt: timeStamp
    })
    .then((doc) => {
      var newChatKey:any = doc.id
      // ADD MESSAGE
      this.firestore.collection('chat').doc(newChatKey).collection('messages').add({
        createAt: firebase.firestore.Timestamp.now(),
        text: messageInput,
        uid: this.auth.currentUserId
      })
      .then((doc) => {
        // GOTO CHAT => CHAT KEY NOT NULL
        this.router.navigate([`/noti-chat-reply/${newChatKey}&${this.chatToUID}&${this.displayName}`]);
        this.firestore.collection('chat').doc(newChatKey).collection('messages', ref => ref
        .orderBy('createAt')).get().toPromise()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.messagesList.push({
              key: doc.id,
              value: doc.data()
            })
          })
          this.showNoMes = false;
        })
      })
    })
  }

  gotoChatList(){
    this.router.navigate([`/noti-chat`])
  }

}
