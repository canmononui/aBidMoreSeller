import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  public showLoading = false;

  constructor(
    public router: Router,
  ) { }

  ngOnInit(): void {
    // console.log('Loading ngOnInit');
    // this.router.navigate(['/loading'])
  }

}
