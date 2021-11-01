import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
// DATEPICKER
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
// CHART
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-sales-statistics-summary',
  templateUrl: './sales-statistics-summary.component.html',
  styleUrls: ['./sales-statistics-summary.component.css']
})
export class SalesStatisticsSummaryComponent implements OnInit {

// Datepicker
hoveredDate: NgbDate | null = null;
fromDate: any;
toDate: any;
dateString: string;
public date: any = [];
public subTagTH = '';
public subCat:any = []
summaryBarChart: any = [];
public toDateFile: any
public startTimeStamp: any;
public endTimeStamp: any;
public items: any = null;

  constructor(
    private calendar: NgbCalendar, 
    public formatter: NgbDateParserFormatter,
    public path: LinkPathService,
    private route: ActivatedRoute,
    public router: Router,
    public db: AngularFireDatabase,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
  ) { 
    var d = firebase.firestore.Timestamp.now().toDate();
    // this.toDateFile = d.getDate() + '-' + d.getMonth() + 1 + '-' + d.getFullYear()
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
    this.path.setPath('salesStatisticsSummary');
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
       // SET START TIME - END TIME
       this.startTimeStamp = new Date(String(this.date.fromDate.day) + ' ' + String(this.monthName(this.date.fromDate.month)) + ' ' + String(this.date.fromDate.year) + ' ' + String(0) + ':' + String(0) + ':' + String(0));
       this.endTimeStamp = new Date(String(this.date.toDate.day) + ' ' + String(this.monthName(this.date.toDate.month)) + ' ' + String(this.date.toDate.year) + ' ' + String(23) + ':' + String(59) + ':' + String(59));
       // console.log(startTimeStamp);
       // console.log(endTimeStamp);
       //  GET ORDER
       this.firestore.collection('order' , ref => ref
       .where('sellerUID', '==', this.auth.currentUserId)
       .where('status', '==', 'sale-success')
       .where('createAt', '>=', this.startTimeStamp)
       .where('createAt', '<=', this.endTimeStamp)
       ).snapshotChanges()
       .map(actions => {
         return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
       }).subscribe(items => {
        //  console.log('items : ',items);
        //  console.log('items', items.length)
         if(items.length != 0){
          this.items = items;
          // CREATE VALEBLE FOR COUNING ORDER BY PRODUCT TAG TH 
          var dataAndCount: any = [
            { 'tagTH': "เสื้อผ้าชาย", 'count': 0 },
            { 'tagTH': "รองเท้าชาย", 'count': 0 },
            { 'tagTH': "เสื้อผ้าหญิง", 'count': 0 },
            { 'tagTH': "รองเท้าหญิง", 'count': 0 },
            { 'tagTH': "ความงาม", 'count': 0 },
            { 'tagTH': "กระเป๋า", 'count': 0 },
            { 'tagTH': "เครื่องประดับ", 'count': 0 },
            { 'tagTH': "เครื่องใช้ในบ้าน", 'count': 0 },
            { 'tagTH': "มือถือ", 'count': 0 },
            { 'tagTH': "เกม", 'count': 0 },
            { 'tagTH': "กล้อง", 'count': 0 },
            { 'tagTH': "กีฬา", 'count': 0 },
            { 'tagTH': "คอมพิวเตอร์", 'count': 0 },
            { 'tagTH': "อาหาร", 'count': 0 },
            { 'tagTH': "เครื่องใช้ไฟฟ้า", 'count': 0 },
            { 'tagTH': "ยานยนต์", 'count': 0 },
            { 'tagTH': "voucher", 'count': 0 },
            { 'tagTH': "เครื่องราง", 'count': 0 },
            { 'tagTH': "ของสะสม", 'count': 0 },
            { 'tagTH': "อื่นๆ", 'count': 0 }
          ];

          // CREATE VALEBLE FOR CHART JS
          var _labels: any = [];
          var _data: any = [];
          var _backgroundColor: any = [];

          // COUNTING ORDER BY PRODUCT TAG TH 
          this.items.forEach(order => {
            // console.log(order.value)
            dataAndCount.forEach(dataCount => {
              if(dataCount.tagTH == order.value.tag.tagTH){
                dataCount.count++
              }
            })
          });

          var i: any = 0;
          // SET DATA FOR CHART JS
          dataAndCount.forEach(checkCount => {
            if(checkCount.count != 0){
              _labels.push(checkCount.tagTH)
              _data.push(checkCount.count)
              _backgroundColor.push(this.colorChart(i))
            }
            i++
            if(i > 10){
              i = 0;
            }
          })

          // console.log(_labels)
          // console.log(_data)
          // console.log(_backgroundColor)

          // SUMMARY BAR CHART
          this.summaryBarChart = new Chart('summaryBarChart', { // object name = id html
            type: 'bar', 
            data: {
                labels: _labels,
                datasets: [{
                  data: _data,
                  borderWidth: 1,
                  backgroundColor: _backgroundColor,
                  plugin:[ChartDataLabels]
                }]
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
                display: false,
                // position: 'top',
              },
              title: {
                text: "สรุปการขาย",
                display: true
              },
            }
          })

          // console.log(dataAndCount)
         }
         else{
          this.items = undefined;
         }

        });

        
  }

  colorChart(i){
    var hex:any = ['#1abc9c', '#3498db', '#9b59b6', '#bdc3c7', '#f39c12', '#F56666', '#F2CE17', '#555757', '#7B68EE', '#FF69B4'];
    return hex[i];
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

  views() {
    this.router.navigate([`/sales-statistics-views`]);
  }

  monthName(monthNumber) {
    //1 = January
    var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
     'July', 'August', 'September', 'October', 'November', 'December' ];
    return monthNames[monthNumber - 1];
  }

  saveSummaryBarChart(){
    var downloadLink = document.createElement('a');
    var fileName = 'สรุปการขายช่วงวันที่ ' + this.dateString + '.png'
    downloadLink.setAttribute('download', fileName);
    var canvas = document.getElementById('summaryBarChart') as HTMLCanvasElement;
    canvas.toBlob(function(blob) {
      var url = URL.createObjectURL(blob);
      downloadLink.setAttribute('href', url);
      downloadLink.click();
    });
  }

}
