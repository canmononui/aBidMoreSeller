import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import firebase from 'firebase';
import { Router } from '@angular/router';
// Datepicker
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  // Top Menu
  public placeholderProductStatus = 'กรุณาเลือก';
  public placeholderProductTag = 'กรุณาเลือก';
  public productStatus = '';
  public tagEN = '';
  public tagTH = '';
  public dropdownMenuShow = false;
  
  // Datepicker
  hoveredDate: NgbDate | null = null;
  // fromDate: NgbDate | null;
  // toDate: NgbDate | null;
  fromDate: any;
  toDate: any;
  dateString: string;
  public date: any = [];
  public showContent = false;
  public showTextSelectData = true;
  public showTextNoData = false;
  // TEST
  // public showContent = false;
  // public showTextSelectData = true;
  public previousProductDataFromFirebase: any = [];
  public productDataFromFirebase: any = [];
  public subCat:any = []
  public subTagTH = '';
  public pageNumber:number = 1;
  public noContentShowPage = false;
  public fieldName = '';
  public tagSearch = '';
  public previousArrayStart: number = 0;
  public previousArrayEnd: number = 8;


  constructor(
    private calendar: NgbCalendar, 
    public formatter: NgbDateParserFormatter,
    public path: LinkPathService,
    public router: Router,
    public db: AngularFireDatabase,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
    ) { 
      var d = firebase.firestore.Timestamp.now().toDate();
      // console.log(d);
      // console.log(calendar.getToday());
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
      // this.dateString = this.fromDate.year+'/'+this.fromDate.month+'/'+this.fromDate.day+' - '+this.toDate.year+'/'+this.toDate.month+'/'+this.toDate.day;
      // console.log(this.toDate);
    }

  ngOnInit(): void {
    this.path.setPath('productList');

    // console.log(this.auth.currentUserId)
  }

  selectProductStatus(statusEN, statusTH) {
    this.productStatus = statusEN;
    this.placeholderProductStatus = statusTH;
    // console.log(this.productStatus)
    this.getDataFromFirebase()
  }

  selectTag(tagEN, tagTH) {
    // this.tagEN = tagEN;
    // this.tagTH = tagTH
    // this.placeholderProductTag = tagTH;
    // console.log(this.tagEN);
    this.dropdownMenuShow = true
    this.subTagTH = '';

    if(tagEN == 'maleClothes'){
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // maleClothes
      this.subCat = ['เสื้อเชิ้ต', 'เสื้อยืด', 'กางเกงขาสั้น', 'กางเกงขายาว', 'เสื้อโปโล', 'กางเกงยีนส์', 'เสื้อคลุมตัวนอก', 'ชุดชั้นในชาย', 'Uniforms', 'Virtual Goods', 'อื่นๆ'];
    }
    else if(tagEN == 'maleShoes'){
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // maleShoes
      this.subCat = ['รองเท้าแตะ', 'รองเท้ารัดส้น', 'รองเท้าผ้าใบแบบผูกเชือก', 'รองเท้าผ้าใบแบบสวม', 'รองเท้าหนังแบบผูกเชือก', 'รองเท้าหนังแบบสวม', 'รองเท้าบูท', 'รองเท้าเซฟตี้', 'รองเท้านักเรียน', 'รองเท้าทรงหัวโต', 'อุปกรณ์เสริมสำหรับรองเท้า', 'ถุงเท้า', 'Virtual Goods', 'อื่นๆ'];
    }
    else if(tagEN == 'femaleClothes'){
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // femaleClothes
      this.subCat = ['เสื้อ', 'เดรส', 'จั๊มสูท', 'กระโปรง', 'กางเกง', 'แจ็คเก็ตและเสื้อโค้ท', 'ชุดชั้นใน', 'ชุดว่ายน้ำ', 'ชุดนอน', 'เสื้อผ้าสาวอวบ', 'ชุดเข้าเซท', 'ผ้ายีนส์', 'เสื้อผ้ามุสลิมผู้หญิง', 'อื่นๆ'];
    }
    else if(tagEN == 'femaleShoes'){
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // femaleShoes
      this.subCat = ['รองเท้าส้นแบน', 'รองเท้าส้นสูง', 'รองเท้าแตะ', 'รองเท้าลำลอง', 'รองเท้าบูทและรองเท้าหุ้มข้อ', 'รองเท้าผ้าใบ', 'ถุงเท้าและถุงน่อง', 'อุปกรณ์เสริมสำหรับรองเท้า', 'อื่นๆ'];
    }
    else if(tagEN == 'beauty'){
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // beauty
      this.subCat = ['เครื่องสำอางสำหรับผิวหน้า', 'เครื่องสำอางสำหรับดวงตา', 'ลิป', 'ผลิตภัณฑ์ดูแลผิวหน้า', 'ผลิตภัณฑ์อาบน้ำและดูแลผิวกาย', 'ผลิตภัณฑ์ดูแลผม', 'ผลิตภัณฑ์สำหรับเล็บ', 'ผลิตภัณฑ์สำหรับผู้ชาย', 'อุปกรณ์เสริมความงาม', 'น้ำหอม', 'ของใช้ส่วนตัว', 'อื่นๆ'];
    }
    else if(tagEN == 'bag'){
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // bag
      this.subCat = ['กระเป๋าสตางค์', 'คลัทช์', 'กระเป๋าถือ', 'กระเป๋าสะพายข้าง', 'กระเป๋าเป้', 'กระเป๋าผ้า', 'กระเป๋าเดินทาง', 'กระเป๋าคาดอก', 'แบรนด์เนม', 'กระเป๋ากันน้ำ', 'อุปกรณ์เสริมกระเป๋า', 'อื่นๆ'];
    }
    else if(tagEN == 'accessories'){
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // accessories
      this.subCat = ['สร้อยคอ', 'ต่างหู', 'หมวก', 'แหวน', 'กำไล', 'เครื่องประดับผม', 'ผ้าพันคอและผ้าคลุมไหล่', 'เข็มขัด', 'คัฟลิงค์และเนคไท', 'ถุงมือ', 'พวงกุญแจ', 'ผ้าเช็ดหน้า', 'ร่ม', 'เครื่องประดับทอง', 'เพชร', 'ทองคำแท่ง', 'อื่นๆ'];
    }
    else if(tagEN == 'homeAppliances'){
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // homeAppliances
      this.subCat = ['ห้องครัวและห้องอาหาร', 'ห้องนอน', 'ห้องน้ำ', 'อุปกรณ์ตกแต่งบ้าน', 'อุปกรณ์สำหรับจัดเก็บ', 'เฟอร์นิเจอร์', 'โคมไฟและอุปกรณ์ให้แสงสว่าง', 'ผลิตภัณฑ์ซักรีด', 'อุปกรณ์ทำความสะอาด', 'เครื่องมือไฟฟ้า', 'เครื่องมือช่าง', 'อุปกรณ์ปรับปรุงบ้าน', 'สวน', 'อื่นๆ'];
    }
    else if(tagEN == 'mobilePhone'){
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // mobilePhone
      this.subCat = ['โทรศัพท์มือถือ', 'แท็บเล็ต', 'เคสและซองมือถือ', 'อุปกรณ์เสริมมือถือ', 'อุปกรณ์กันรอยหน้าจอ', 'แบตเตอรี่สำรอง', 'อุปกรณ์ไอทีสวมใส่', 'อุปกรณ์เน็ตเวิร์ค', 'อื่นๆ'];
    }    
    else if(tagEN == 'game'){
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // game
      this.subCat = ['เครื่องเกม', 'แผ่นและตลับเกม', 'ของสะสมจากเกม', 'อุปกรณ์เสริมเกม', 'Gaming Virtual Goods', 'เกมอื่นๆ'];
    }  
    else if(tagEN == 'camera'){
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // camera
      this.subCat = ['กล้องดิจิตอล', 'กล้องแอคชั่น', 'กล้องวงจรปิด', 'เลนส์', 'เมมโมรี่การ์ด', 'อุปกรณ์เสริมกล้อง', 'ฟิล์ม', 'อื่นๆ'];
    }
    else if(tagEN == 'sport'){
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // sport
      this.subCat = ['เสื้อผ้ากีฬาผู้หญิง', 'เสื้อผ้ากีฬาผู้ชาย', 'ฟุตบอลและกีฬาที่เล่นเป็นทีม', 'อุปกรณ์ฟิตเนสและออกกำลังกาย', 'กีฬาจักรยาน', 'กระเป๋ากีฬาและอุปกรณ์กีฬา', 'ตกปลา', 'การตั้งแค้มป์และเดินป่า', 'กีฬาแร็กเกต', 'ดำน้ำ', 'กีฬาทางน้ำ', 'กอล์ฟ', 'สเก็ตบอร์ดและสกูตเตอร์', 'มวยและศิลปะการต่อสู้', 'อื่นๆ'];
    }
    else if(tagEN == 'computer'){
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // computer
      this.subCat = ['แล็ปท็อปและคอมตั้งโต๊ะ', 'ชิ้นส่วนคอมพิวเตอร์', 'ปริ้นเตอร์และอุปกรณ์เสริม', 'อุปกรณ์จัดเก็บข้อมูล', 'อุปกรณ์เน็ตเวิร์ค', 'อุปกรณ์เสริมคอมพิวเตอร์', 'อุปกรณ์สำหรับเล่นเกม', 'ซอฟต์แวร์', 'อื่นๆ'];
    }
    else if(tagEN == 'food'){
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // food
      this.subCat = ['ขนม', 'อาหาร', 'เครื่องดื่ม', 'อื่นๆ'];
    }
    else if(tagEN == 'electricalApp'){
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // electricalApp
      this.subCat = ['เครื่องปรับอากาศ', 'พัดลมไอเย็น', 'พัดลม', 'เครื่องฟอกอากาศ', 'เครื่องใช้ไฟฟ้าในครัวขนาดเล็ก', 'ตู้เย็น', 'เครื่องซักผ้าและเครื่องอบผ้า', 'เตารีดและอุปกรณ์ดูแลผ้า', 'เครื่องดูดฝุ่นและอุปกรณ์ดูแลพื้น', 'เตาแก๊ส', 'ไมโครเวฟและเตาอบ', 'เครื่องทำน้ำอุ่น', 'อุปกรณ์และอะไหล่เครื่องใช้ไฟฟ้า', 'อื่นๆ'];
    }
    else if(tagEN == 'motorVehicle'){
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // motorVehicle
      this.subCat = ['อุปกรณ์ภายในรถยนต์', 'อุปกรณ์ภายนอกรถยนต์', 'ผลิตภัณฑ์ดูแลรถยนต์', 'ล้อและยาง', 'อะไหล่/ชุดแต่งมอเตอร์ไซค์', 'อะไหล่/ชุดแต่งรถยนต์', 'อุปกรณ์สวมใส่สำหรับขับขี่', 'น้ำมันและของเหลว', 'เครื่องเสียงรถยนต์', 'กล้องติดรถยนต์', 'แบตเตอรี่และอุปกรณ์เสริม', 'ฟิล์มรถยนต์', 'ยานพาหนะ', 'อื่นๆ'];
    }
    else if(tagEN == 'voucher'){
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // voucher
      this.subCat = ['Lifestyle', 'บันเทิงเเละกิจกรรม', 'อาหารและเครื่องดื่ม', 'สุขภาพและความงาม', 'ท่องเที่ยว', 'Real Estate', 'Insurance', 'Games & Streaming', 'Shopping and Home Living', 'Transportation & Delivery', 'Line stickers and themes', 'อื่นๆ'];
    }
    else if(tagEN == 'fetish'){
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // fetish
    }
    else if(tagEN == 'collectibles'){
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // collectibles
      this.subCat = ['ตุ๊กตา', 'ฟิกเกอร์โมเดล', 'ตัวต่อ', 'สติกเกอร์', 'RC', 'เพลงและภาพยนต์', 'ของโบราณ', 'อื่นๆ'];
    }
    else if(tagEN == 'other'){
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // other
      this.subCat = ['อื่นๆ'];
    }
    this.getDataFromFirebase()
  }

  selectSubTag(subTagInput){
    this.dropdownMenuShow = false
    this.subTagTH = subTagInput;
    this.placeholderProductTag = this.tagTH + ' / ' + subTagInput;
    // this.subCat = [];
    this.getDataFromFirebase()
  }

  closeDropdownMenu(){
    this.dropdownMenuShow = false
  }

  clearTag(){
    this.tagEN = '';
    this.tagTH = '';
    this.subTagTH = '';
    this.placeholderProductTag = 'กรุณาเลือก';
    this.getDataFromFirebase()
  }

  getDataFromFirebase(){
    this.pageNumber = 1;
    if(this.subTagTH != ''){
      this.fieldName = 'tag.subTagTH';
      this.tagSearch = this.subTagTH;
    }
    else {
      this.fieldName = 'tag.tagEN';
      this.tagSearch = this.tagEN;
    }

    if(this.productStatus != '' && this.tagEN == '' && this.dateString == '-') {
      if(this.productStatus == 'all'){
        // Select => productStatus
        this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product', ref => ref
        .orderBy('createAt')
        .limit(8)
        ).snapshotChanges()
        .map(actions => {
          return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
        }).subscribe(items => {
          // console.log('items : ',items);
          if(items.length != 0){
            // console.log('no',items)
            this.productDataFromFirebase = items;
            this.showContent = true;
            this.showTextSelectData = false;
            this.showTextNoData = false;
          }
          else {
            this.showContent = false;
            this.showTextSelectData = false;
            this.showTextNoData = true;
          }
        });
      }
      else {
        // Select => productStatus
        this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product', ref => ref
        .where('productStatus', '==', this.productStatus)
        .orderBy('createAt')
        .limit(8)
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
          else {
            this.showContent = false;
            this.showTextSelectData = false;
            this.showTextNoData = true;
          }
        });
      }
    }
    else if(this.productStatus == '' && this.tagEN != '' && this.dateString == '-') {
      // Select => tag
      this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product', ref => ref
      .where(this.fieldName, '==', this.tagSearch)
      .orderBy('createAt')
      .limit(8)
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
        else {
          this.showContent = false;
          this.showTextSelectData = false;
          this.showTextNoData = true;
        }
      });
    }
    else if(this.productStatus == '' && this.tagEN == '' && this.dateString != '-') {
      // Select => time
      // Set startTime - endTime      
      var startTimeStamp = new Date(String(this.date.fromDate.day) + ' ' + String(this.monthName(this.date.fromDate.month)) + ' ' + String(this.date.fromDate.year) + ' ' + String(0) + ':' + String(0) + ':' + String(0));
      var endTimeStamp = new Date(String(this.date.toDate.day) + ' ' + String(this.monthName(this.date.toDate.month)) + ' ' + String(this.date.toDate.year) + ' ' + String(23) + ':' + String(59) + ':' + String(59));
      // console.log(startTimeStamp);
      // console.log(endTimeStamp);
      this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product', ref => ref
      .where('createAt', '>=', startTimeStamp)
      .where('createAt', '<=', endTimeStamp)
      .orderBy('createAt')
      .limit(8)
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
        else {
          this.showContent = false;
          this.showTextSelectData = false;
          this.showTextNoData = true;
        }
      });
    }
    else if(this.productStatus != '' && this.tagEN != '' && this.dateString == '-') {
      if(this.productStatus == 'all'){
        // Select => productStatus && tag
        this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product', ref => ref
        .where(this.fieldName, '==', this.tagSearch)
        .orderBy('createAt')
        .limit(8)
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
          else {
            this.showContent = false;
            this.showTextSelectData = false;
            this.showTextNoData = true;
          }
        });
      }
      else {
        // Select => productStatus && tag
        this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product', ref => ref
        .where('productStatus', '==', this.productStatus)
        .where(this.fieldName, '==', this.tagSearch)
        .orderBy('createAt')
        .limit(8)
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
          else {
            this.showContent = false;
            this.showTextSelectData = false;
            this.showTextNoData = true;
          }
        });
        }
    }
    else if(this.productStatus != '' && this.tagEN == '' && this.dateString != '-') {
      if(this.productStatus == 'all'){
        // Select => productStatus && time
        // Set startTime - endTime
        var startTimeStamp = new Date(String(this.date.fromDate.day) + ' ' + String(this.monthName(this.date.fromDate.month)) + ' ' + String(this.date.fromDate.year) + ' ' + String(0) + ':' + String(0) + ':' + String(0));
        var endTimeStamp = new Date(String(this.date.toDate.day) + ' ' + String(this.monthName(this.date.toDate.month)) + ' ' + String(this.date.toDate.year) + ' ' + String(23) + ':' + String(59) + ':' + String(59));
        // console.log(startTimeStamp);
        // console.log(endTimeStamp);
        this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product', ref => ref
        .where('createAt', '>=', startTimeStamp)
        .where('createAt', '<=', endTimeStamp)
        .orderBy('createAt')
        .limit(8)
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
          else {
            this.showContent = false;
            this.showTextSelectData = false;
            this.showTextNoData = true;
          }
        });
      }
      else {
        // Select => productStatus && time
        // Set startTime - endTime
        var startTimeStamp = new Date(String(this.date.fromDate.day) + ' ' + String(this.monthName(this.date.fromDate.month)) + ' ' + String(this.date.fromDate.year) + ' ' + String(0) + ':' + String(0) + ':' + String(0));
        var endTimeStamp = new Date(String(this.date.toDate.day) + ' ' + String(this.monthName(this.date.toDate.month)) + ' ' + String(this.date.toDate.year) + ' ' + String(23) + ':' + String(59) + ':' + String(59));
        // console.log(startTimeStamp);
        // console.log(endTimeStamp);
        this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product', ref => ref
        .where('productStatus', '==', this.productStatus)
        .where('createAt', '>=', startTimeStamp)
        .where('createAt', '<=', endTimeStamp)
        .orderBy('createAt')
        .limit(8)
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
          else {
            this.showContent = false;
            this.showTextSelectData = false;
            this.showTextNoData = true;
          }
        });
      }
    }
    else if(this.productStatus == '' && this.tagEN != '' && this.dateString != '-') {
      // Select => tag && time
      // Set startTime - endTime
      var startTimeStamp = new Date(String(this.date.fromDate.day) + ' ' + String(this.monthName(this.date.fromDate.month)) + ' ' + String(this.date.fromDate.year) + ' ' + String(0) + ':' + String(0) + ':' + String(0));
      var endTimeStamp = new Date(String(this.date.toDate.day) + ' ' + String(this.monthName(this.date.toDate.month)) + ' ' + String(this.date.toDate.year) + ' ' + String(23) + ':' + String(59) + ':' + String(59));
      // console.log(startTimeStamp);
      // console.log(endTimeStamp);
      this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product', ref => ref
      .where(this.fieldName, '==', this.tagSearch)
      .where('createAt', '>=', startTimeStamp)
      .where('createAt', '<=', endTimeStamp)
      .orderBy('createAt')
      .limit(8)
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
        else {
          this.showContent = false;
          this.showTextSelectData = false;
          this.showTextNoData = true;
        }
      });
    }
    else if(this.productStatus != '' && this.tagEN != '' && this.dateString != '-') {
      if(this.productStatus == 'all'){
        // Select => productStatus && tag && time
        // Set startTime - endTime
        var startTimeStamp = new Date(String(this.date.fromDate.day) + ' ' + String(this.monthName(this.date.fromDate.month)) + ' ' + String(this.date.fromDate.year) + ' ' + String(0) + ':' + String(0) + ':' + String(0));
        var endTimeStamp = new Date(String(this.date.toDate.day) + ' ' + String(this.monthName(this.date.toDate.month)) + ' ' + String(this.date.toDate.year) + ' ' + String(23) + ':' + String(59) + ':' + String(59));
        // console.log(startTimeStamp);
        // console.log(endTimeStamp);
        this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product', ref => ref
        .where(this.fieldName, '==', this.tagSearch)
        .where('createAt', '>=', startTimeStamp)
        .where('createAt', '<=', endTimeStamp)
        .orderBy('createAt')
        .limit(8)
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
          else {
            this.showContent = false;
            this.showTextSelectData = false;
            this.showTextNoData = true;
          }
        });
      }
      else {
        // Select => productStatus && tag && time
        // Set startTime - endTime
        var startTimeStamp = new Date(String(this.date.fromDate.day) + ' ' + String(this.monthName(this.date.fromDate.month)) + ' ' + String(this.date.fromDate.year) + ' ' + String(0) + ':' + String(0) + ':' + String(0));
        var endTimeStamp = new Date(String(this.date.toDate.day) + ' ' + String(this.monthName(this.date.toDate.month)) + ' ' + String(this.date.toDate.year) + ' ' + String(23) + ':' + String(59) + ':' + String(59));
        // console.log(startTimeStamp);
        // console.log(endTimeStamp);
        this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product', ref => ref
        .where('productStatus', '==', this.productStatus)
        .where(this.fieldName, '==', this.tagSearch)
        .where('createAt', '>=', startTimeStamp)
        .where('createAt', '<=', endTimeStamp)
        .orderBy('createAt')
        .limit(8)
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
          else {
            this.showContent = false;
            this.showTextSelectData = false;
            this.showTextNoData = true;
          }
        });
      }
    }
  }

  searchBtn(keyNameSearchInput){
    // console.log(keyNameSearchInput)
    // console.log('สายชาร์จแบบแม่เหล็กเป็น USB-C ')
    // keyNameSearchInput = 'uOXrzsT9uhS3mdRC1S5O'
    if(keyNameSearchInput != '') {
      this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product', ref => ref
      .where('name', '==', keyNameSearchInput)
      .orderBy('createAt')
      .limit(8)
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
        else {
          this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product').doc(keyNameSearchInput).get()
          .subscribe(val => {
            // console.log(val.data());
            // this.userSellerFB = val.data()
            if(val.data() != undefined){
              this.productDataFromFirebase = [{
                key: keyNameSearchInput,
                value: val.data()
              }];
              // console.log(this.productDataFromFirebase);
              this.showContent = true;
              this.showTextSelectData = false;
              this.showTextNoData = false;
            }
            else {
              this.showContent = false;
              this.showTextSelectData = false;
              this.showTextNoData = true;
            }
    
          });
        }
      });
    }
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

  productDetail(dataKey){
    // console.log('dataKey : ',dataKey);
    this.router.navigate([`/product-detail/${dataKey}`]);
  }

  next(){
    // SET DATA FOR PREVIOUS
    this.previousProductDataFromFirebase = this.previousProductDataFromFirebase.concat(this.productDataFromFirebase);

    if(this.productStatus != '' && this.tagEN == '' && this.dateString == '-') {
      if(this.productStatus == 'all'){
        // Select => productStatus
        this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product', ref => ref
        .where('createAt', '>', this.productDataFromFirebase[this.productDataFromFirebase.length-1].value.createAt)
        .orderBy('createAt')
        .limit(8)
        ).snapshotChanges()
        .map(actions => {
          return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
        }).subscribe(items => {
          // console.log('items : ',items);
          if(items.length != 0){
            // console.log('no',items)
            this.pageNumber++
            this.noContentShowPage = false;
            this.productDataFromFirebase = items;
            this.showContent = true;
            this.showTextSelectData = false;
            this.showTextNoData = false;
          }
          else {
            this.pageNumber++
            this.noContentShowPage = true;
            this.productDataFromFirebase = [];
            this.showContent = false;
            this.showTextSelectData = false;
            this.showTextNoData = true;
          }
        });
      }
      else {
        // Select => productStatus
        this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product', ref => ref
        .where('productStatus', '==', this.productStatus)
        .where('createAt', '>', this.productDataFromFirebase[this.productDataFromFirebase.length-1].value.createAt)
        .orderBy('createAt')
        .limit(8)
        ).snapshotChanges()
        .map(actions => {
          return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
        }).subscribe(items => {
          // console.log('items : ',items);
          // console.log('items', items.length)
          if(items.length != 0){
            // console.log('no',items)
            this.pageNumber++
            this.noContentShowPage = false;
            this.productDataFromFirebase = items;
            this.showContent = true;
            this.showTextSelectData = false;
            this.showTextNoData = false;
          }
          else {
            this.pageNumber++
            this.noContentShowPage = true;
            this.productDataFromFirebase = [];
            this.showContent = false;
            this.showTextSelectData = false;
            this.showTextNoData = true;
          }
        });
      }
    }
    else if(this.productStatus == '' && this.tagEN != '' && this.dateString == '-') {
      // Select => tag
      this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product', ref => ref
      .where(this.fieldName, '==', this.tagSearch)
      .where('createAt', '>', this.productDataFromFirebase[this.productDataFromFirebase.length-1].value.createAt)
      .orderBy('createAt')
      .limit(8)
      ).snapshotChanges()
      .map(actions => {
        return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
      }).subscribe(items => {
        // console.log('items : ',items);
        // console.log('items', items.length)
        if(items.length != 0){
          // console.log('no',items)
          this.pageNumber++
          this.noContentShowPage = false;
          this.productDataFromFirebase = items;
          this.showContent = true;
          this.showTextSelectData = false;
          this.showTextNoData = false;
        }
        else {
          this.pageNumber++
          this.noContentShowPage = true;
          this.productDataFromFirebase = [];
          this.showContent = false;
          this.showTextSelectData = false;
          this.showTextNoData = true;
        }
      });
    }
    else if(this.productStatus == '' && this.tagEN == '' && this.dateString != '-') {
      // Select => time
      // Set startTime - endTime      
      var startTimeStamp = new Date(String(this.date.fromDate.day) + ' ' + String(this.monthName(this.date.fromDate.month)) + ' ' + String(this.date.fromDate.year) + ' ' + String(0) + ':' + String(0) + ':' + String(0));
      var endTimeStamp = new Date(String(this.date.toDate.day) + ' ' + String(this.monthName(this.date.toDate.month)) + ' ' + String(this.date.toDate.year) + ' ' + String(23) + ':' + String(59) + ':' + String(59));
      // console.log(startTimeStamp);
      // console.log(endTimeStamp);
      this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product', ref => ref
      .where('createAt', '>=', startTimeStamp)
      .where('createAt', '<=', endTimeStamp)
      .where('createAt', '>', this.productDataFromFirebase[this.productDataFromFirebase.length-1].value.createAt)
      .orderBy('createAt')
      .limit(8)
      ).snapshotChanges()
      .map(actions => {
        return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
      }).subscribe(items => {
        // console.log('items : ',items);
        // console.log('items', items.length)
        if(items.length != 0){
          // console.log('no',items)
          this.pageNumber++
          this.noContentShowPage = false;
          this.productDataFromFirebase = items;
          this.showContent = true;
          this.showTextSelectData = false;
          this.showTextNoData = false;
        }
        else {
          this.pageNumber++
          this.noContentShowPage = true;
          this.productDataFromFirebase = [];
          this.showContent = false;
          this.showTextSelectData = false;
          this.showTextNoData = true;
        }
      });
    }
    else if(this.productStatus != '' && this.tagEN != '' && this.dateString == '-') {
      if(this.productStatus == 'all'){
        // Select => productStatus && tag
        this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product', ref => ref
        .where(this.fieldName, '==', this.tagSearch)
        .where('createAt', '>', this.productDataFromFirebase[this.productDataFromFirebase.length-1].value.createAt)
        .orderBy('createAt')
        .limit(8)
        ).snapshotChanges()
        .map(actions => {
          return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
        }).subscribe(items => {
          // console.log('items : ',items);
          // console.log('items', items.length)
          if(items.length != 0){
            // console.log('no',items)
            this.pageNumber++
            this.noContentShowPage = false;
            this.productDataFromFirebase = items;
            this.showContent = true;
            this.showTextSelectData = false;
            this.showTextNoData = false;
          }
          else {
            this.pageNumber++
            this.noContentShowPage = true;
            this.productDataFromFirebase = [];
            this.showContent = false;
            this.showTextSelectData = false;
            this.showTextNoData = true;
          }
        });
      }
      else {
        // Select => productStatus && tag
        this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product', ref => ref
        .where('productStatus', '==', this.productStatus)
        .where(this.fieldName, '==', this.tagSearch)
        .where('createAt', '>', this.productDataFromFirebase[this.productDataFromFirebase.length-1].value.createAt)
        .orderBy('createAt')
        .limit(8)
        ).snapshotChanges()
        .map(actions => {
          return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
        }).subscribe(items => {
          // console.log('items : ',items);
          // console.log('items', items.length)
          if(items.length != 0){
            // console.log('no',items)
            this.pageNumber++
            this.noContentShowPage = false;
            this.productDataFromFirebase = items;
            this.showContent = true;
            this.showTextSelectData = false;
            this.showTextNoData = false;
          }
          else {
            this.pageNumber++
            this.noContentShowPage = true;
            this.productDataFromFirebase = [];
            this.showContent = false;
            this.showTextSelectData = false;
            this.showTextNoData = true;
          }
        });
        }
    }
    else if(this.productStatus != '' && this.tagEN == '' && this.dateString != '-') {
      if(this.productStatus == 'all'){
        // Select => productStatus && time
        // Set startTime - endTime
        var startTimeStamp = new Date(String(this.date.fromDate.day) + ' ' + String(this.monthName(this.date.fromDate.month)) + ' ' + String(this.date.fromDate.year) + ' ' + String(0) + ':' + String(0) + ':' + String(0));
        var endTimeStamp = new Date(String(this.date.toDate.day) + ' ' + String(this.monthName(this.date.toDate.month)) + ' ' + String(this.date.toDate.year) + ' ' + String(23) + ':' + String(59) + ':' + String(59));
        // console.log(startTimeStamp);
        // console.log(endTimeStamp);
        this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product', ref => ref
        .where('createAt', '>=', startTimeStamp)
        .where('createAt', '<=', endTimeStamp)
        .where('createAt', '>', this.productDataFromFirebase[this.productDataFromFirebase.length-1].value.createAt)
        .orderBy('createAt')
        .limit(8)
        ).snapshotChanges()
        .map(actions => {
          return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
        }).subscribe(items => {
          // console.log('items : ',items);
          // console.log('items', items.length)
          if(items.length != 0){
            // console.log('no',items)
            this.pageNumber++
            this.noContentShowPage = false;
            this.productDataFromFirebase = items;
            this.showContent = true;
            this.showTextSelectData = false;
            this.showTextNoData = false;
          }
          else {
            this.pageNumber++
            this.noContentShowPage = true;
            this.productDataFromFirebase = [];
            this.showContent = false;
            this.showTextSelectData = false;
            this.showTextNoData = true;
          }
        });
      }
      else {
        // Select => productStatus && time
        // Set startTime - endTime
        var startTimeStamp = new Date(String(this.date.fromDate.day) + ' ' + String(this.monthName(this.date.fromDate.month)) + ' ' + String(this.date.fromDate.year) + ' ' + String(0) + ':' + String(0) + ':' + String(0));
        var endTimeStamp = new Date(String(this.date.toDate.day) + ' ' + String(this.monthName(this.date.toDate.month)) + ' ' + String(this.date.toDate.year) + ' ' + String(23) + ':' + String(59) + ':' + String(59));
        // console.log(startTimeStamp);
        // console.log(endTimeStamp);
        this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product', ref => ref
        .where('productStatus', '==', this.productStatus)
        .where('createAt', '>=', startTimeStamp)
        .where('createAt', '<=', endTimeStamp)
        .where('createAt', '>', this.productDataFromFirebase[this.productDataFromFirebase.length-1].value.createAt)
        .orderBy('createAt')
        .limit(8)
        ).snapshotChanges()
        .map(actions => {
          return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
        }).subscribe(items => {
          // console.log('items : ',items);
          // console.log('items', items.length)
          if(items.length != 0){
            // console.log('no',items)
            this.pageNumber++
            this.noContentShowPage = false;
            this.productDataFromFirebase = items;
            this.showContent = true;
            this.showTextSelectData = false;
            this.showTextNoData = false;
          }
          else {
            this.pageNumber++
            this.noContentShowPage = true;
            this.productDataFromFirebase = [];
            this.showContent = false;
            this.showTextSelectData = false;
            this.showTextNoData = true;
          }
        });
      }
    }
    else if(this.productStatus == '' && this.tagEN != '' && this.dateString != '-') {
      // Select => tag && time
      // Set startTime - endTime
      var startTimeStamp = new Date(String(this.date.fromDate.day) + ' ' + String(this.monthName(this.date.fromDate.month)) + ' ' + String(this.date.fromDate.year) + ' ' + String(0) + ':' + String(0) + ':' + String(0));
      var endTimeStamp = new Date(String(this.date.toDate.day) + ' ' + String(this.monthName(this.date.toDate.month)) + ' ' + String(this.date.toDate.year) + ' ' + String(23) + ':' + String(59) + ':' + String(59));
      // console.log(startTimeStamp);
      // console.log(endTimeStamp);
      this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product', ref => ref
      .where(this.fieldName, '==', this.tagSearch)
      .where('createAt', '>=', startTimeStamp)
      .where('createAt', '<=', endTimeStamp)
      .where('createAt', '>', this.productDataFromFirebase[this.productDataFromFirebase.length-1].value.createAt)
      .orderBy('createAt')
      .limit(8)
      ).snapshotChanges()
      .map(actions => {
        return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
      }).subscribe(items => {
        // console.log('items : ',items);
        // console.log('items', items.length)
        if(items.length != 0){
          // console.log('no',items)
          this.pageNumber++
          this.noContentShowPage = false;
          this.productDataFromFirebase = items;
          this.showContent = true;
          this.showTextSelectData = false;
          this.showTextNoData = false;
        }
        else {
          this.pageNumber++
          this.noContentShowPage = true;
          this.productDataFromFirebase = [];
          this.showContent = false;
          this.showTextSelectData = false;
          this.showTextNoData = true;
        }
      });
    }
    else if(this.productStatus != '' && this.tagEN != '' && this.dateString != '-') {
      if(this.productStatus == 'all'){
        // Select => productStatus && tag && time
        // Set startTime - endTime
        var startTimeStamp = new Date(String(this.date.fromDate.day) + ' ' + String(this.monthName(this.date.fromDate.month)) + ' ' + String(this.date.fromDate.year) + ' ' + String(0) + ':' + String(0) + ':' + String(0));
        var endTimeStamp = new Date(String(this.date.toDate.day) + ' ' + String(this.monthName(this.date.toDate.month)) + ' ' + String(this.date.toDate.year) + ' ' + String(23) + ':' + String(59) + ':' + String(59));
        // console.log(startTimeStamp);
        // console.log(endTimeStamp);
        this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product', ref => ref
        .where(this.fieldName, '==', this.tagSearch)
        .where('createAt', '>=', startTimeStamp)
        .where('createAt', '<=', endTimeStamp)
        .where('createAt', '>', this.productDataFromFirebase[this.productDataFromFirebase.length-1].value.createAt)
        .orderBy('createAt')
        .limit(8)
        ).snapshotChanges()
        .map(actions => {
          return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
        }).subscribe(items => {
          // console.log('items : ',items);
          // console.log('items', items.length)
          if(items.length != 0){
            // console.log('no',items)
            this.pageNumber++
            this.noContentShowPage = false;
            this.productDataFromFirebase = items;
            this.showContent = true;
            this.showTextSelectData = false;
            this.showTextNoData = false;
          }
          else {
            this.pageNumber++
            this.noContentShowPage = true;
            this.productDataFromFirebase = [];
            this.showContent = false;
            this.showTextSelectData = false;
            this.showTextNoData = true;
          }
        });
      }
      else {
        // Select => productStatus && tag && time
        // Set startTime - endTime
        var startTimeStamp = new Date(String(this.date.fromDate.day) + ' ' + String(this.monthName(this.date.fromDate.month)) + ' ' + String(this.date.fromDate.year) + ' ' + String(0) + ':' + String(0) + ':' + String(0));
        var endTimeStamp = new Date(String(this.date.toDate.day) + ' ' + String(this.monthName(this.date.toDate.month)) + ' ' + String(this.date.toDate.year) + ' ' + String(23) + ':' + String(59) + ':' + String(59));
        // console.log(startTimeStamp);
        // console.log(endTimeStamp);
        this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product', ref => ref
        .where('productStatus', '==', this.productStatus)
        .where(this.fieldName, '==', this.tagSearch)
        .where('createAt', '>=', startTimeStamp)
        .where('createAt', '<=', endTimeStamp)
        .where('createAt', '>', this.productDataFromFirebase[this.productDataFromFirebase.length-1].value.createAt)
        .orderBy('createAt')
        .limit(8)
        ).snapshotChanges()
        .map(actions => {
          return actions.map(action =>  ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
        }).subscribe(items => {
          // console.log('items : ',items);
          // console.log('items', items.length)
          if(items.length != 0){
            // console.log('no',items)
            this.pageNumber++
            this.noContentShowPage = false;
            this.productDataFromFirebase = items;
            this.showContent = true;
            this.showTextSelectData = false;
            this.showTextNoData = false;
          }
          else {
            this.pageNumber++
            this.noContentShowPage = true;
            this.productDataFromFirebase = [];
            this.showContent = false;
            this.showTextSelectData = false;
            this.showTextNoData = true;
          }
        });
      }
    }
  }

  previous() {
    this.productDataFromFirebase = [];
    this.pageNumber--
    for (var i = (this.previousArrayEnd*this.pageNumber)-8; i <= (this.previousArrayEnd*this.pageNumber-1); i++) {
      this.productDataFromFirebase.push(this.previousProductDataFromFirebase[i])
    }
    this.noContentShowPage = false;
    this.showTextSelectData = false;
    this.showTextNoData = false;
    this.showContent = true;
  }
}
