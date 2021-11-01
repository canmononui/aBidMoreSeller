import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
// DATEPICKER
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
// CHART
import { Chart } from 'chart.js';

@Component({
  selector: 'app-finance-summary',
  templateUrl: './finance-summary.component.html',
  styleUrls: ['./finance-summary.component.css']
})
export class FinanceSummaryComponent implements OnInit {
// Datepicker
hoveredDate: NgbDate | null = null;
fromDate: any;
toDate: any;
dateString: string;
public date: any = [];
public placeholderProductStatus = 'กรุณาเลือก';
public contentTable = true
public contentChart = false 
// Chart
summaryBarChart: any = [];
public toDateFile: any
public showContent = false 
public typeEN = ''
public showTextSelectData = true;
public showTextNoData = false;
public productDataFromFirebase: any = [];

  constructor(
    private calendar: NgbCalendar, 
    public formatter: NgbDateParserFormatter,
    public path: LinkPathService,
    public router: Router,
    private route: ActivatedRoute,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
  ) { 
    var d = firebase.firestore.Timestamp.now().toDate();
    this.toDateFile = d.getDate() + '-' + d.getMonth() + 1 + '-' + d.getFullYear()
    this.fromDate = {
      day: d.getDate(),
      month: d.getMonth() + 1,
      year: d.getFullYear()
    };
    this.toDate = {
      day: d.getDate(),
      month: d.getMonth() + 1,
      year: d.getFullYear()
    };
    this.dateString = '-';
  }

  ngOnInit(): void {
    this.path.setPath('financeSummary');

    // CHART
    // summaryBarChart
    this.summaryBarChart = new Chart('summaryBarChart', {
      type: 'bar', 
      data: {
          labels: ["10/05/2020","11/04/2020"],
          datasets: [
            {
                label: "รายรับ",
                borderWidth: 1,
                backgroundColor: '#8fd19e',
                data: [103,115]
            },
            {
                label: "รายจ่าย",
                borderWidth: 1,
                backgroundColor: '#ed969e',
                data: [40,35]
            },
            // plugin:[ChartDataLabels]
        ],
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            barPercentage: 0.5,
            categoryPercentage: 1
          }]
        },
        legend: {
          display: true,
          position: 'top',
        },
        title: {
          text: "สรุปการเงิน",
          display: true
        },
      }
    })
    // END CHART

  }


  // Datepicker
  onDateSelection(date: NgbDate) {
    // console.log(date);
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } 
    else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      // this.dateString = this.fromDate.year+'/'+this.fromDate.month+'/'+this.fromDate.day+' - '+this.toDate.year+'/'+this.toDate.month+'/'+this.toDate.day;
      this.dateString = this.fromDate.day+'/'+this.fromDate.month+'/'+this.fromDate.year+' - '+this.toDate.day+'/'+this.toDate.month+'/'+this.toDate.year;

      // this.getDataFromFirebase()
      this.date = ({
        fromDate: {
          year: this.fromDate.year,
          month: this.fromDate.month,
          day: this.fromDate.day
        },
        toDate: {
          year: this.toDate.year,
          month: this.toDate.month,
          day: this.toDate.day
        },
      });
      this.getDataFromFirebase();
    } 
    else {
      this.toDate = null
      this.fromDate = date;
      this.dateString = this.fromDate.day+'/'+this.fromDate.month+'/'+this.fromDate.year+' - '+this.fromDate.day+'/'+this.fromDate.month+'/'+this.fromDate.year;
      this.date = ({
        fromDate: {
          year: this.fromDate.year,
          month: this.fromDate.month,
          day: this.fromDate.day
        },
        toDate: {
          year: this.fromDate.year,
          month: this.fromDate.month,
          day: this.fromDate.day
        },
      });
      this.getDataFromFirebase();
    }
  }

  getDataFromFirebase() {
    if(this.typeEN != '' && this.dateString == '-'){
      if(this.typeEN == 'all'){
        this.firestore.collection('finance-seller', ref => ref
        .where('sellerUID', '==', this.auth.currentUserId)
        .orderBy('createAt')
        // .limit(8)
        ).snapshotChanges()
        .map(actions => {
          return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
        }).subscribe(items => {
          // console.log('items : ',items);
          // console.log('items', items.length)
          if(items.length != 0){
            // console.log('no',items)
            this.productDataFromFirebase = items;
            this.showContent = true;
            this.showTextSelectData = false;
            this.showTextNoData = false;
          }
          else{
            this.productDataFromFirebase = [];
            this.showContent = false;
            this.showTextSelectData = false;
            this.showTextNoData = true;
          }
        });
      }
      else{
        this.firestore.collection('finance-seller', ref => ref
        .where('sellerUID', '==', this.auth.currentUserId)
        .where('typeEN', '==', this.typeEN)
        .orderBy('createAt')
        // .limit(8)
        ).snapshotChanges()
        .map(actions => {
          return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
        }).subscribe(items => {
          console.log('items : ',items);
          // console.log('items', items.length)
          if(items.length != 0){
            // console.log('no',items)
            this.productDataFromFirebase = items;
            this.showContent = true;
            this.showTextSelectData = false;
            this.showTextNoData = false;
          }
          else{
            this.productDataFromFirebase = [];
            this.showContent = false;
            this.showTextSelectData = false;
            this.showTextNoData = true;
          }
        });
      }
    }
    else if(this.typeEN == '' && this.dateString != '-'){
      var startTimeStamp = new Date(String(this.date.fromDate.day) + ' ' + String(this.monthName(this.date.fromDate.month)) + ' ' + String(this.date.fromDate.year) + ' ' + String(0) + ':' + String(0) + ':' + String(0));
      var endTimeStamp = new Date(String(this.date.toDate.day) + ' ' + String(this.monthName(this.date.toDate.month)) + ' ' + String(this.date.toDate.year) + ' ' + String(23) + ':' + String(59) + ':' + String(59));
      this.firestore.collection('finance-seller', ref => ref
      .where('sellerUID', '==', this.auth.currentUserId)
      .where('createAt', '>=', startTimeStamp)
      .where('createAt', '<=', endTimeStamp)
      .orderBy('createAt')
      // .limit(8)
      ).snapshotChanges()
      .map(actions => {
        return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
      }).subscribe(items => {
        if(items.length != 0){
          this.productDataFromFirebase = items;
          this.showContent = true;
          this.showTextSelectData = false;
          this.showTextNoData = false;
        }
        else {
          this.productDataFromFirebase = [];
          this.showContent = false;
          this.showTextSelectData = false;
          this.showTextNoData = true;
        }
      });
    }
    else if(this.typeEN != '' && this.dateString != '-'){
      if(this.typeEN == 'all'){
        var startTimeStamp = new Date(String(this.date.fromDate.day) + ' ' + String(this.monthName(this.date.fromDate.month)) + ' ' + String(this.date.fromDate.year) + ' ' + String(0) + ':' + String(0) + ':' + String(0));
        var endTimeStamp = new Date(String(this.date.toDate.day) + ' ' + String(this.monthName(this.date.toDate.month)) + ' ' + String(this.date.toDate.year) + ' ' + String(23) + ':' + String(59) + ':' + String(59));
        this.firestore.collection('finance-seller', ref => ref
        .where('sellerUID', '==', this.auth.currentUserId)
        .where('createAt', '>=', startTimeStamp)
        .where('createAt', '<=', endTimeStamp)
        .orderBy('createAt')
        // .limit(8)
        ).snapshotChanges()
        .map(actions => {
          return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
        }).subscribe(items => {
          if(items.length != 0){
            this.productDataFromFirebase = items;
            this.showContent = true;
            this.showTextSelectData = false;
            this.showTextNoData = false;
          }
          else {
            this.productDataFromFirebase = [];
            this.showContent = false;
            this.showTextSelectData = false;
            this.showTextNoData = true;
          }
        });
      }
      else{
        var startTimeStamp = new Date(String(this.date.fromDate.day) + ' ' + String(this.monthName(this.date.fromDate.month)) + ' ' + String(this.date.fromDate.year) + ' ' + String(0) + ':' + String(0) + ':' + String(0));
        var endTimeStamp = new Date(String(this.date.toDate.day) + ' ' + String(this.monthName(this.date.toDate.month)) + ' ' + String(this.date.toDate.year) + ' ' + String(23) + ':' + String(59) + ':' + String(59));
        this.firestore.collection('finance-seller', ref => ref
        .where('sellerUID', '==', this.auth.currentUserId)
        .where('typeEN', '==', this.typeEN)
        .where('createAt', '>=', startTimeStamp)
        .where('createAt', '<=', endTimeStamp)
        .orderBy('createAt')
        // .limit(8)
        ).snapshotChanges()
        .map(actions => {
          return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
        }).subscribe(items => {
          if(items.length != 0){
            this.productDataFromFirebase = items;
            this.showContent = true;
            this.showTextSelectData = false;
            this.showTextNoData = false;
          }
          else {
            this.productDataFromFirebase = [];
            this.showContent = false;
            this.showTextSelectData = false;
            this.showTextNoData = true;
          }
        });
      }
    }
    else{
      this.productDataFromFirebase = [];
      this.showContent = false;
      this.showTextSelectData = false;
      this.showTextNoData = true;
    }
  }


  monthName(monthNumber) {
    //1 = January
    var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
     'July', 'August', 'September', 'October', 'November', 'December' ];
    return monthNames[monthNumber - 1];
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  typefinance(typeEN, typeTH){
    // console.log(typeEN)
    // console.log(typeTH)
    this.typeEN = typeEN;
    this.placeholderProductStatus = typeTH
    this.getDataFromFirebase()
  }

  withdraw(){
    this.router.navigate([`/finance-withdraw`]);
  }

  // deposit(){
  //   this.router.navigate([`/finance-deposit`]);
  // }

  waitingWithdraw(){
    this.router.navigate([`/finance-waiting-withdraw`]);
  }

  donate(){
    this.router.navigate([`/finance-donate`]);
  }

  showContentTable(){
    this.contentTable = true
    this.contentChart = false
  }

  showContentChart(){
    this.contentTable = false
    this.contentChart = true
  }

  saveSummaryBarChart(){
    var downloadLink = document.createElement('a');
    var fileName = this.toDateFile + 'finaneSummaryBarChart.png'
    downloadLink.setAttribute('download', fileName);
    var canvas = document.getElementById('summaryBarChart') as HTMLCanvasElement;
    canvas.toBlob(function(blob) {
      var url = URL.createObjectURL(blob);
      downloadLink.setAttribute('href', url);
      downloadLink.click();
    });
  }
}
