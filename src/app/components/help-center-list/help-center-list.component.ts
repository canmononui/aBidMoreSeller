import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-help-center-list',
  templateUrl: './help-center-list.component.html',
  styleUrls: ['./help-center-list.component.css']
})
export class HelpCenterListComponent implements OnInit {

  constructor(
    public path: LinkPathService,
    public router: Router,
    private route: ActivatedRoute,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.path.setPath('helpCenter');
  }

  helpCenterDetail(){

  }

  searchBtn(keyNameSearchInput){
    
  }

}
