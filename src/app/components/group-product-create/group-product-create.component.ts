import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-product-create',
  templateUrl: './group-product-create.component.html',
  styleUrls: ['./group-product-create.component.css']
})
export class GroupProductCreateComponent implements OnInit {
  public groupNameLength = 0;
  public status = true;
  public groupNameInput = '';

  constructor(
    public path: LinkPathService,
    public router: Router,
    private route: ActivatedRoute,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.path.setPath('groupProductList');
  }

  groupList() {
    this.router.navigate([`/group-product-list`]);
  }

  keyGroupName($event) {
    this.groupNameLength = Number($event.target.value.length)
  }

  groupCreateStatus(groupName) {
  console.log(groupName)
  this.groupNameInput = groupName;
  }

  groupCreate(groupName) {
    console.log(groupName)
    this.firestore.collection('shop').doc(this.auth.currentUserId).update({
      groupProduct: firebase.firestore.FieldValue.arrayUnion(groupName)
    })
    .then(() => {
      this.router.navigate([`/group-product-list`]);
    })
    // studyList: firebase.firestore.FieldValue.arrayUnion(data)
  }
}
