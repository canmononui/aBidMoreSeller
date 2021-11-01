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
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
// CHART
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-sales-statistics-views',
  templateUrl: './sales-statistics-views.component.html',
  styleUrls: ['./sales-statistics-views.component.css']
})
export class SalesStatisticsViewsComponent implements OnInit {

  // Datepicker
  hoveredDate: NgbDate | null = null;
  fromDate: any;
  toDate: any;
  dateString: string;
  public date: any = [];
  public subTagTH = '';
  public subCat: any = []
  // Chart
  sexBarChart: any = [];
  ageBarChart: any = [];
  timeBarChart: any = [];
  public toDateFile: any
  public startTimeStamp: any;
  public endTimeStamp: any;
  public items: any = null;

  constructor(
    public path: LinkPathService,
    private route: ActivatedRoute,
    public router: Router,
    public db: AngularFireDatabase,
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
    this.path.setPath('salesStatisticsSummary');
  }

  // DATEPICKER
  onDateSelection(date: NgbDate) {
    // console.log(date);
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    }
    else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      // this.dateString = this.fromDate.year+'/'+this.fromDate.month+'/'+this.fromDate.day+' - '+this.toDate.year+'/'+this.toDate.month+'/'+this.toDate.day;
      this.dateString = this.fromDate.day + '/' + this.fromDate.month + '/' + this.fromDate.year + ' - ' + this.toDate.day + '/' + this.toDate.month + '/' + this.toDate.year;

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
      this.dateString = this.fromDate.day + '/' + this.fromDate.month + '/' + this.fromDate.year + ' - ' + this.fromDate.day + '/' + this.fromDate.month + '/' + this.fromDate.year;
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

    //  GET ORDER
    this.firestore.collection('shop').doc(this.auth.currentUserId).collection('viewers', ref => ref
      .where('createAt', '>=', this.startTimeStamp)
      .where('createAt', '<=', this.endTimeStamp)
    ).snapshotChanges()
      .map(actions => {
        return actions.map(action => ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
      }).subscribe(items => {
        // console.log('items : ',items);
        // console.log('items', items.length)
        if (items.length != 0) {
          this.items = items;
          var sex: any = {
            male: 0,
            female: 0
          }
          var ageRange: any = {
            ageUnder13: 0,
            age13to17: 0,
            age18to24: 0,
            age25to34: 0,
            age35to44: 0,
            age45to54: 0,
            age55to64: 0,
            ageOver65: 0,
          }
          var period: any = {
            time00_03: 0,
            time03_06: 0,
            time06_09: 0,
            time09_12: 0,
            time12_15: 0,
            time15_18: 0,
            time18_21: 0,
            time21_00: 0,
          }

          this.items.forEach(viewers => {
            // console.log(viewers.value)
            // CHECK SEX
            if (viewers.value.sex == 'male') {
              sex.male++
            }
            else {
              sex.female++
            }
            // CHECK AGE
            if (viewers.value.age < 13) {
              ageRange.ageUnder13++
            }
            else if (viewers.value.age >= 13 && viewers.value.age <= 17) {
              ageRange.age13to17++
            }
            else if (viewers.value.age >= 18 && viewers.value.age <= 24) {
              ageRange.age18to24++
            }
            else if (viewers.value.age > 25 && viewers.value.age <= 34) {
              ageRange.age25to34++
            }
            else if (viewers.value.age > 35 && viewers.value.age <= 44) {
              ageRange.age35to44++
            }
            else if (viewers.value.age > 45 && viewers.value.age <= 54) {
              ageRange.age45to54++
            }
            else if (viewers.value.age > 55 && viewers.value.age <= 64) {
              ageRange.age55to64++
            }
            else if (viewers.value.age > 65) {
              ageRange.ageOver65++
            }
            // CHECK PERIOD
            if (viewers.value.period == '00:01-03:00') {
              period.time00_03++
            }
            else if (viewers.value.period == '03:01-06:00') {
              period.time03_06++
            }
            else if (viewers.value.period == '06:01-09:00') {
              period.time06_09++
            }
            else if (viewers.value.period == '09:01-12:00') {
              period.time09_12++
            }
            else if (viewers.value.period == '12:01-15:00') {
              period.time12_15++
            }
            else if (viewers.value.period == '15:01-18:00') {
              period.time15_18++
            }
            else if (viewers.value.period == '18:01-21:00') {
              period.time18_21++
            }
            else if (viewers.value.period == '21:01-00:00') {
              period.time21_00++
            }

            // SEX BAR CHART
            this.sexBarChart = new Chart('sexBarChart', { // object name = id html
              type: 'horizontalBar',
              data: {
                labels: ["เพศชาย", "เพศหญิง"],
                datasets: [{
                  data: [sex.male, sex.female],
                  borderWidth: 1,
                  backgroundColor: ['#1abc9c', '#3498db'],
                  plugin: [ChartDataLabels]
                }],
              },
              options: {
                scales: {
                  xAxes: [{
                    ticks: {
                      beginAtZero: true
                    }
                  }],
                  yAxes: [{
                    barPercentage: 0.5,
                    categoryPercentage: 1,
                  }]
                },
                legend: {
                  display: false
                },
                title: {
                  text: "เพศของผู้รับชมร้านค้า",
                  display: true
                },
              }
            })

            // AGE BER CHART
            this.ageBarChart = new Chart('ageBarChart', { // object name = id html
              type: 'bar',
              data: {
                labels: ["ต่ำกว่า 13 ปี", "13-17 ปี", "18-24 ปี", "25-34 ปี", "35-44 ปี", "45-54 ปี", "55-64 ปี", "65+ ปี"],
                datasets: [{
                  data: [ageRange.ageUnder13, ageRange.age13to17, ageRange.age18to24, ageRange.age25to34, ageRange.age35to44, ageRange.age45to54, ageRange.age55to64, ageRange.ageOver65],
                  borderWidth: 1,
                  backgroundColor: ['#1abc9c', '#3498db', '#9b59b6', '#bdc3c7', '#f39c12', '#F56666', '#F2CE17', '#F08080'],
                  plugin: [ChartDataLabels]
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
                  display: false
                },
                title: {
                  text: "ช่วงอายุของผู้รับชมร้านค้า",
                  display: true
                },
              }
            })

            // TIME BAR CHART
            this.timeBarChart = new Chart('timeBarChart', { // object name = id html
              type: 'bar',
              data: {
                labels: ["00:01-03.00", "03:01-06:00", "06:01-09:00", "09:01-12:00", "12:01-15:00", "15:01-18:00", "18:01-21:00", "21:01-00:00"],
                datasets: [{
                  data: [period.time00_03, period.time03_06, period.time06_09, period.time09_12, period.time12_15, period.time15_18, period.time18_21, period.time21_00],
                  borderWidth: 1,
                  backgroundColor: ['#1abc9c', '#3498db', '#9b59b6', '#bdc3c7', '#f39c12', '#F56666', '#F2CE17', '#F08080'],
                  plugin: [ChartDataLabels]
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
                  display: false
                },
                title: {
                  text: "ช่วงเวลาการเข้าชมร้าน",
                  display: true
                }
              }
            })

          });
        }
        else {
          this.items = undefined;
        }

      });

  }

  // colorChart(i){
  //   var hex:any = ['#1abc9c', '#3498db', '#9b59b6', '#bdc3c7', '#f39c12', '#F56666', '#F2CE17', '#555757', '#7B68EE', '#FF69B4'];
  //   return hex[i];
  // }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  monthName(monthNumber) {
    //1 = January
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[monthNumber - 1];
  }

  summary() {
    this.router.navigate([`/sales-statistics-summary`]);
  }

  saveSexBarChart() {
    var downloadLink = document.createElement('a');
    var fileName = 'เพศของผู้รับชมร้านค้า ' + this.dateString + '.png'
    downloadLink.setAttribute('download', fileName);
    var canvas = document.getElementById('sexBarChart') as HTMLCanvasElement;
    canvas.toBlob(function (blob) {
      var url = URL.createObjectURL(blob);
      downloadLink.setAttribute('href', url);
      downloadLink.click();
    });
  }

  saveAgeBarChart() {
    var downloadLink = document.createElement('a');
    var fileName = 'ช่วงอายุของผู้รับชมร้านค้า ' + this.dateString + '.png'
    downloadLink.setAttribute('download', fileName);
    var canvas = document.getElementById('ageBarChart') as HTMLCanvasElement;
    canvas.toBlob(function (blob) {
      var url = URL.createObjectURL(blob);
      downloadLink.setAttribute('href', url);
      downloadLink.click();
    });
  }

  saveTimeBarChart() {
    var downloadLink = document.createElement('a');
    var fileName = 'ช่วงเวลาการเข้าชมร้าน ' + this.dateString + '.png'
    downloadLink.setAttribute('download', fileName);
    var canvas = document.getElementById('timeBarChart') as HTMLCanvasElement;
    canvas.toBlob(function (blob) {
      var url = URL.createObjectURL(blob);
      downloadLink.setAttribute('href', url);
      downloadLink.click();
    });
  }

}


