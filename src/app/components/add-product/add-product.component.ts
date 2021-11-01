import { Component, OnInit, ViewChild } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';
import firebase from 'firebase';
import { Router } from '@angular/router';
// TEXT EDITOR
import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
// DATEPICKER
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
// CROP IMG
import { ImageCroppedEvent, ImageCropperComponent } from "ngx-image-cropper";
// BAND NAME JSON
import accessoriesJSON from '../../services/data/accessories.json';
import bagJSON from '../../services/data/bag.json';
import cameraJSON from '../../services/data/camera.json';
import beautyJSON from '../../services/data/beauty.json';
import computerJSON from '../../services/data/computer.json';
import electricalAppJSON from '../../services/data/electricalApp.json';
import femaleClothesJSON from '../../services/data/femaleClothes.json';
import femaleShoesJSON from '../../services/data/femaleShoes.json';
import foodJSON from '../../services/data/food.json';
import gameJSON from '../../services/data/game.json';
import homeAppliancesJSON from '../../services/data/homeAppliances.json';
import maleClothesJSON from '../../services/data/maleClothes.json';
import maleShoesJSON from '../../services/data/maleShoes.json';
import mobilePhoneJSON from '../../services/data/mobilePhone.json';
import motorVehicleJSON from '../../services/data/motorVehicle.json';
import sportJSON from '../../services/data/sport.json';
import voucherJSON from '../../services/data/voucher.json';
import moment from 'moment';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, TableService, QuickToolbarService],
})

export class AddProductComponent implements OnInit {
  // JSON
  public accessoriesJSON = accessoriesJSON;
  public bagJSON = bagJSON;
  public cameraJSON = cameraJSON;
  public beautyJSON = beautyJSON;
  public computerJSON = computerJSON;
  public electricalAppJSON = electricalAppJSON;
  public femaleClothesJSON = femaleClothesJSON;
  public femaleShoesJSON = femaleShoesJSON;
  public foodJSON = foodJSON;
  public gameJSON = gameJSON;
  public homeAppliancesJSON = homeAppliancesJSON;
  public maleClothesJSON = maleClothesJSON;
  public maleShoesJSON = maleShoesJSON;
  public mobilePhoneJSON = mobilePhoneJSON;
  public motorVehicleJSON = motorVehicleJSON;
  public sportJSON = sportJSON;
  public voucherJSON = voucherJSON;

  public subCat: any = []
  public dropdownSubCatStatus = false;
  public textTest = '';
  // Brand Name Product List
  // public groupBrandList = [
  //   'การ์นิเย่', 'คนอร์', 'คอมฟอร์ท', 'คอลเกต', 'เคลียร์', 'แคร์', 'โค้ก', 'ช้าง', 'ซันซิล', 'ซันไลต์', 'ซุปเปอร์', 'โซฟี', 'ดอกบัวคู่',
  //   'ดัชชี่', 'ดัชมิลล์', 'ดาร์ลี่', 'ดาวนี่', 'เด็กสมบูรณ์', 'โดฟ', 'ตะวัน', 'ทิพรส', 'ไทย-เดนมาร์ค', 'นีเวีย', 'เนสกาแฟ', 'บรีส', 'บีทาเก้น', 'เบบี้มายส์',
  //   'เบอร์ดี้', 'แบรนด์', 'ไบกอน', 'เป็ด', 'เป๊ปซี่', 'เปา', 'โปร', 'พอนด์ส', 'แพนทีน', 'แพร็อท', 'โพรเทค', 'ฟันโอ', 'แฟนต้า', 'โฟร์โมสต์',
  //   'ไฟน์ไลน์', 'ภูเขาทอง', 'มรกต', 'มาจิคคลีน', 'มาม่า', 'มามีโพโค', 'มิตรผล', 'มิสทีน', 'แม่ครัว', 'ยาคูลท์', 'ยำยำ', 'ยูโร่', 'รสดี', 'รีจอยส์',
  //   'เรนเจอร์ สเก้าท์', 'ลอริเอะ', 'ลักส์', 'ลีโอ', 'เลย์', 'แลตตาซอย', 'ไลปอน', 'ไวตามิลค์', 'ไวไว', 'สก็อตต์', 'สปอนเซอร์', 'สามแม่ครัว', 'องุ่น',
  //   'อายิโนะโมโต๊ะ', 'อิชิตัน', 'เอ็ม-50', 'เอสเซ้นส์', 'แอทแทค', 'โอโม่', 'โอวัลติน', 'โออิชิ', 'ไฮคลาส', 'ไฮเตอร์', 'ไฮยีน', 'อื่นๆ'];
  public groupBrandList: any = [];
  public placeholderProductTag = 'ตัวเลือกประเภทสินค้า';
  public placeholderBrandList = '';
  public productBrandList = '';
  public textError = '';
  // Product Img
  public imgURL1: any = './assets/img/productThumbnail.png';
  public imgURL2: any = './assets/img/productThumbnail.png';
  public imgURL3: any = './assets/img/productThumbnail.png';
  public imgURL4: any = './assets/img/productThumbnail.png';
  public imgURL5: any = './assets/img/productThumbnail.png';
  public imgDisabled1 = false;
  public imgDisabled2 = true;
  public imgDisabled3 = true;
  public imgDisabled4 = true;
  public imgDisabled5 = true;
  public imageChangedEvent: any = "";
  croppedImage: any = "";
  public imgProductArray: any = [];
  public imgProductArrayURL: any = [];
  public imgURL: any;
  // Datepicker
  public model2: any;
  public minDate: any;
  public maxDate: any;
  public dateNow: any;
  public dateString: string = '';
  public timeStartBid: any;
  public timeSelectBid: any;
  public timeString: string = '';
  public timeBidAutoCom: number = 30;
  public dateSelectBid: any;

  // public timeBidCount: any;
  // public timeCountSelectBid: any;
  public timeBidCountHr:any = [];
  public timeBidCountMin:any = [];
  public timeBidCountSec:any = [];
  public timeBidCH = '00';
  public timeBidCM = '00';
  public timeBidCS = '30';

  // Delivery Longer
  public deliveryLonger = false;
  public dayDelivery: number = 0;
  // public dayDeliveryStatus = false
  // DonateType
  public donateType = false;
  public sliderDonate: number = 10;
  public priceStartInput: number = 0;
  public priceBidInput: number = 0;
  public priceAutoWinInput: number = 0;
  public priceProductInput: number = 0;
  public remoteAreaStatusKerry = false;
  public remoteAreaStatusScg = false;
  public remoteAreaStatusFlash = false;
  public thaiPostStatus = false;
  public kerryStatus = false;
  public scgStatus = false;
  public flashStatus = false;
  public handPickUp = false;
  public handPickUpDescription = '';
  public thaiPostOver = false;
  public kerryOver = false;
  public scgOver = false;
  public flashOver = false;
  // Check Price For Delivery
  public checkPrice = false;
  // Delivery Size
  public weightNaN = false;
  public weightDelivery: number = 0;
  public wideDelivery: number = 0;
  public longDelivery: number = 0;
  public highDelivery: number = 0;
  public priceProductOverForCOD = false;
  // Final Price Delivery
  public priceThaiPostDelivery: any = [];
  public priceKerryDelivery: any = [];
  public priceScgDelivery: any = [];
  public priceFlashDelivery: any = [];
  public handPickUpArray: any = [];
  // Check Box Delivery
  public checkBoxThaiPost = false;
  public checkBoxKerry = false;
  public checkBoxScg = false;
  public checkBoxFlash = false;
  public checkBoxhandPickUp = false;
  // Hand Pick Up
  public dropDownCountry = ['ไทย'];
  public thaiProvince = ['กระบี่', 'กรุงเทพมหานคร', 'กาญจนบุรี', 'กาฬสินธุ์', 'กำแพงเพชร', 'ขอนแก่น', 'จันทบุรี', 'ฉะเชิงเทรา', 'ชลบุรี', 'ชัยนาท', 'ชัยภูมิ',
    'ชุมพร', 'เชียงราย', 'เชียงใหม่', 'ตรัง', 'ตราด', 'ตาก', 'นครนายก', 'นครปฐม', 'นครพนม', 'นครราชสีมา', 'นครศรีธรรมราช', 'นครสวรรค์', 'นนทบุรี', 'นราธิวาส',
    'น่าน', 'บึงกาฬ', 'บุรีรัมย์', 'ปทุมธานี', 'ประจวบคีรีขันธ์', 'ปราจีนบุรี', 'ปัตตานี', 'พระนครศรีอยุธยา', 'พะเยา', 'พังงา', 'พัทลุง', 'พิจิตร', 'พิษณุโลก', 'เพชรบุรี',
    'เพชรบูรณ์', 'แพร่', 'ภูเก็ต', 'มหาสารคาม', 'มุกดาหาร', 'แม่ฮ่องสอน', 'ยโสธร', 'ยะลา', 'ร้อยเอ็ด', 'ระนอง', 'ระยอง', 'ราชบุรี', 'ลพบุรี', 'ลำปาง', 'ลำพูน', 'เลย',
    'ศรีสะเกษ', 'สกลนคร', 'สงขลา', 'สตูล', 'สมุทรปราการ', 'สมุทรสงคราม', 'สมุทรสาคร', 'สระแก้ว', 'สระบุรี', 'สิงห์บุรี', 'สุโขทัย', 'สุพรรณบุรี', 'สุราษฎร์ธานี', 'สุรินทร์',
    'หนองคาย', 'หนองบัวลำภู', 'อ่างทอง', 'อำนาจเจริญ', 'อุดรธานี', 'อุตรดิตถ์', 'อุทัยธานี', 'อุบลราชธานี'];
  public placeholCountry = 'ตัวเลือกประเทศ';
  public placeholProvince = 'ตัวเลือกจังหวัด';
  // Get Form Firebase
  public userSellerFB: any;
  // Text Editor
  public value: string = `<p>กรุณาใส่รายละเอียดสินค้า</p>`;
  public tools: object = {
    items: ['Undo', 'Redo', '|',
      'Bold', 'Italic', '|',
      'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|',
      'FullScreen']
  };
  public quickTools: object = {
    image: [
      'Replace', 'Align', 'Caption', 'Remove', 'InsertLink', '-', 'Display', 'AltText', 'Dimension']
  };

  public nameInputLength = 0;
  public nameInputLengthClass = false;
  public name = '';
  public tagEN = '';
  public tagTH = '';
  public subTagEN = '';
  public subTagTH = '';
  public dropdownMenuShow = false;
  public type = 'new';
  public salesType = 'auction';
  public salesTypeSelectAuction = true;
  // public groupProduct = []
  public groupProduct = ['ยังไม่มีกลุ่มสินค้า'];
  public dataGroupProduct: any;
  public placeholderGroupProduct: any = 'ตัวเลือกกลุ่มสินค้าของร้าน';
  public placeholdonate = 'ตัวเลือกมูลนิธิ';
  public selectDonateData = {
    key: null,
    shopName: null
  };
  // public groupDonate = ['ยังไม่มีมูลนิธิ'];
  public groupDonate: any = []
  public groupDonatenull = true
  public keySearch: any = [];
  public keySearchValue = '';
  public optionArray: any = [];
  public subOptionArray: any = [];
  // public subOption: any = [];
  public subOptionNumberValue = '';
  public optionNumberValue = '';
  public subOptionValue = '';
  public subOptionCount = 0;
  public subOptionShow = false;
  public optionNameValue = '';
  public optionCount = 0;
  public countProductInSupOption:number = 0;
  // True
  public showContent = true;
  public showLoading = false;
  public dataProductOK = false;
  task: AngularFireUploadTask;
  // Test
  // public showContent = false;
  // public showLoading = true;
  public placeholderSecondHandPer: any = 'รายละเอียดสินค้ามือสอง';
  public editSubOptionShow = false;
  public dataEditSubOption:any = {
    j: null,
    subOp: null
  };
  // COVID-19 AMPHOE ADDRESS CAN'T COURIER FLASH
  public flashCourierCovid:any = ["เอกชัย", "ทุ่งสองห้อง", "ทวีวัฒนา", "คลองเตย", "บางนา", "คลองจั่น", "ดอนเมือง", "คอหงส์", "บ้านพรุ", "บางบ่อ", "แคราย", "บางพลีใหญ่", "บางยี่เรือ", "เกาะจันทร์", "ศรีราชา", "บึง", "มาบยางพร", "วังจันทร์", "พนานิคม", "หลักสาม", "พันท้ายนรสิงห์", "บ้านเก่า", "สาทร", "คลองมะเดื่อ", "บางน้ำจืด", "คอกกระบือ", "นาสัก", "วัดโบสถ", "บางโทรัด", "หนองปลาไหล", "บางบัวทอง", "บางลำภูล่าง", "คลองสี่วา", "บางกระสอ", "บึงคำพร้อย", "บางขุนเทียน", "ตะคร้ำเอน"];
  public flashCovidStatus:boolean = false;

  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;

  constructor(
    // Datepicker
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>,
    // End Datepicker
    public path: LinkPathService,
    public router: Router,
    public db: AngularFireDatabase,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    // console.log('Add-Product');
    this.path.setPath('addProduct');
    for(var i=0; i<100; i++){
      if(i < 10){
        var _hrString:any = '0' + i.toString()
        this.timeBidCountHr.push(_hrString);
        this.timeBidCountMin.push(_hrString);
        this.timeBidCountSec.push(_hrString);
      }
      else{
        var _hrString:any = i.toString()        
        this.timeBidCountHr.push(_hrString);
        if(i < 60){
          this.timeBidCountMin.push(_hrString);
          this.timeBidCountSec.push(_hrString);
        }
      }
    }
    this.priceThaiPostDelivery.priceDeliveryInput = 0;
    this.priceKerryDelivery.priceDeliveryInput = 0;
    this.priceScgDelivery.priceDeliveryInput = 0;
    this.priceFlashDelivery.priceDeliveryInput = 0;
    // console.log(this.auth.currentUserId);
    // Get Address
    this.firestore.collection('user-seller').doc(this.auth.currentUserId).get()
      .subscribe(val => {
        // console.log(val.data());
        this.userSellerFB = val.data()
        // ************************************************ COVID-19 AMPHOE ADDRESS CAN'T COURIER FLASH
        var shopDistrictCovid = this.flashCourierCovid.filter(element => element == this.userSellerFB.shopAddress.district);
        console.log(shopDistrictCovid)
        // IF HAVE DISTRICT SHOP ADDRESS IN SHOP DISTRICT COVID => DISABLED FLASH DELIVERY
        if(shopDistrictCovid.length != 0){
          // DISABLED FLASH DELIVERY
          this.flashStatus = false;
          // SHOP TEXT ALERT
          this.flashCovidStatus = true;
        }
        else {
          // ENABLE FLASH DELIVERY
          this.flashStatus = true;
          // HDIE SHOP TEXT ALERT
          this.flashCovidStatus = false;
        }
        // ************************************************ END COVID-19 AMPHOE ADDRESS CAN'T COURIER FLASH
        
        // if(!this.userSellerFB.checkStatus){
        //   this.router.navigate([`/profile-settings`]);
        // }
      });

    // Get Group Product
    this.firestore.collection('shop').doc(this.auth.currentUserId).get()
      .subscribe(val => {
        // console.log(val.data());
        this.dataGroupProduct = val.data();
        // console.log(this.dataGroupProduct.groupProduct);
        if (this.dataGroupProduct.groupProduct != null) {
          // console.log(this.dataGroupProduct.groupProduct);
          this.groupProduct = this.dataGroupProduct.groupProduct
          // console.log(this.groupProduct);
        }
      });

    // foundationType
    this.firestore.collection('shop', ref => ref.where('foundationType', '==', true)).snapshotChanges()
      .map(actions => {
        return actions.map(action => ({ key: action.payload.doc.id, value: action.payload.doc.data() }));
      }).subscribe(items => {
        // console.log('items : ', items);
        if (items.length != 0) {
          // console.log('========');
          this.groupDonate = items;
          this.groupDonatenull = false
        }
        else {
          // this.updateName(items[0].key,data);
          // console.log('+++++++++');
          this.groupDonatenull = true
          // this.selectDonateData = {
          //   key: null,
          //   shopName: null
          // };
        }
      });
    // console.log('selectDonateData :', this.selectDonateData);

    // Set Date Datepicker
    let d = firebase.firestore.Timestamp.now().toDate();
    // console.log(d);
    this.dateNow = {
      day: d.getDate(),
      month: d.getMonth() + 1,
      year: d.getFullYear()
    };
    // console.log(this.dateNow);
    this.model2 = this.dateNow;
    this.dateString = this.model2.day + '/' + this.model2.month + '/' + this.model2.year;
    this.dateSelectBid = this.dateNow;
    this.minDate = this.dateNow;
    this._getMaxDate(d)
    // SET TIME START BID FOR HTML TIMEPICKER
    this.timeStartBid = {
      hour: d.getHours(),
      minute: d.getMinutes(),
      second: 0
    };
    // SET TIME START BID FOR FIREBASE
    this.timeSelectBid = this.timeStartBid;

    // // console.log(new Date(String(this.dateSelectBid.day) + ' ' + String(this.monthName(this.dateSelectBid.month)) + ' ' + String(this.dateSelectBid.year) + ' ' + String(this.timeSelectBid.hour) + ":" + String(this.timeSelectBid.minute)))
    // var _originalFB:any = firebase.firestore.Timestamp.now();
    // var _time:any = _originalFB.toDate().getTime();
    // // var _timePlus30:any = _time + 3000
    // var _timePlus30:any = _time + 356400000 // 99HR
    // console.log('_originalFB =>', _originalFB.toDate())
    // console.log('_time =>', _time)
    // console.log('_timePlus30', _timePlus30)
    // console.log('newDate', new Date(_timePlus30))
    // console.log('-----------------')

    // var _dateStartBid:any = new Date(String(this.dateSelectBid.day) + ' ' + String(this.monthName(this.dateSelectBid.month)) + ' ' + String(this.dateSelectBid.year) + ' ' + String(this.timeSelectBid.hour) + ":" + String(this.timeSelectBid.minute));
    // var _dateEndBid:any = _dateStartBid.getTime() + 356400000 // SEC*1000
    // console.log(_dateStartBid)
    // console.log(new Date(_dateEndBid))
  }

  // Add(){
  //   // var _userSignUp: any = user.user;
  //   var _timeStmap: any = firebase.firestore.Timestamp.now();
  //   //  SET DATA SHOP DES
  //   this.firestore.collection('shop').doc('VFhOEsiUSfhb7h1ZpVAzQK2s7eG3').set({
  //     createAt: _timeStmap,
  //     shopStatus: 'waitingEmailVerify',
  //     uid: 'VFhOEsiUSfhb7h1ZpVAzQK2s7eG3',
  //     email: 'ct8877@gmail.com',
  //     shopName: null,
  //     shopDescription: null,
  //     foundationType: false,
  //     groupProduct: null,
  //     checkStatus: false,
  //     profileImg: {
  //       imgUrl: null,
  //       imgpath: null
  //     },
  //     coverImg: {
  //       imgUrl: null,
  //       imgpath: null
  //     },
  //     shopAddress: null
  //   }).then(() => {
  //     // SET USER SELLER DES
  //     var _yourRefCode:any = 'VF' + _timeStmap.seconds.toString();
  //     this.firestore.collection('user-seller').doc('VFhOEsiUSfhb7h1ZpVAzQK2s7eG3').set({
  //       createAt: _timeStmap,
  //       shopStatus: 'waitingEmailVerify',
  //       emailVerifyAt: null,
  //       uid: 'VFhOEsiUSfhb7h1ZpVAzQK2s7eG3',
  //       email: 'ct8877@gmail.com',
  //       displayName: 'displayName',
  //       checkStatus: false,
  //       foundationType: false,
  //       name: null,
  //       lastName: null,
  //       phoneNumber: null,
  //       phoneNumberVerifyAt: null,
  //       shopName: null,
  //       shopDescription: null,
  //       shopAddress: null,
  //       refCode: null,
  //       yourRefCode: _yourRefCode,
  //       shopType: null,
  //       bookbank: null,
  //       profileImg: {
  //         imgUrl: null,
  //         imgpath: null
  //       },
  //       coverImg: {
  //         imgUrl: null,
  //         imgpath: null
  //       },
  //       percenFinance: {
  //         debitCredit: 5,
  //         debitCreditInter: 5,
  //         eWallet: 5,
  //         qrPayment: 5
  //       },
  //       percenCancelOrder: 5
  //     })

  //   })
  // }

  productNameInput($event): void {
    this.name = $event.target.value;
    this.nameInputLength = $event.target.value.length;
    if (this.nameInputLength < 10) {
      this.nameInputLengthClass = true;
    }
    else {
      this.nameInputLengthClass = false;
    }
    // console.log(this.name, this.nameInputLength)
  }

  clickdropdownSubCat() {
    if (this.dropdownSubCatStatus == true) {
      this.dropdownSubCatStatus = false
    }
    else {
      this.dropdownSubCatStatus = true
    }
  }

  selectSubTag(subTagInput) {
    this.subTagTH = subTagInput;
    this.placeholderProductTag = this.tagTH + ' / ' + subTagInput;
    this.dropdownSubCatStatus = false
    // this.subCat = [];
    this.dropdownMenuShow = false
    // SET BRAND NAME DEFAULT
    this.placeholderBrandList = 'No Brand (ไม่มียี่ห้อ)';
    this.productBrandList = 'No Brand (ไม่มียี่ห้อ)';
  }

  selectTag(tagEN, tagTH) {
    // this.tag = tagEN;
    // this.placeholderProductTag = tagTH;
    // console.log(this.tag)
    this.dropdownMenuShow = true
    this.subTagTH = '';
    // SET BRAND NAME DEFAULT
    this.placeholderBrandList = 'No Brand (ไม่มียี่ห้อ)';
    this.productBrandList = 'No Brand (ไม่มียี่ห้อ)';

    if (tagEN == 'maleClothes') {
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // maleClothes
      this.subCat = ['เสื้อเชิ้ต', 'เสื้อยืด', 'กางเกงขาสั้น', 'กางเกงขายาว', 'เสื้อโปโล', 'กางเกงยีนส์', 'เสื้อคลุมตัวนอก', 'ชุดชั้นในชาย', 'Uniforms', 'Virtual Goods', 'อื่นๆ'];
      this.groupBrandList = this.maleClothesJSON;
    }
    else if (tagEN == 'maleShoes') {
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // maleShoes
      this.subCat = ['รองเท้าแตะ', 'รองเท้ารัดส้น', 'รองเท้าผ้าใบแบบผูกเชือก', 'รองเท้าผ้าใบแบบสวม', 'รองเท้าหนังแบบผูกเชือก', 'รองเท้าหนังแบบสวม', 'รองเท้าบูท', 'รองเท้าเซฟตี้', 'รองเท้านักเรียน', 'รองเท้าทรงหัวโต', 'อุปกรณ์เสริมสำหรับรองเท้า', 'ถุงเท้า', 'Virtual Goods', 'อื่นๆ'];
      this.groupBrandList = this.maleShoesJSON;
    }
    else if (tagEN == 'femaleClothes') {
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // femaleClothes
      this.subCat = ['เสื้อ', 'เดรส', 'จั๊มสูท', 'กระโปรง', 'กางเกง', 'แจ็คเก็ตและเสื้อโค้ท', 'ชุดชั้นใน', 'ชุดว่ายน้ำ', 'ชุดนอน', 'เสื้อผ้าสาวอวบ', 'ชุดเข้าเซท', 'ผ้ายีนส์', 'เสื้อผ้ามุสลิมผู้หญิง', 'อื่นๆ'];
      this.groupBrandList = this.femaleClothesJSON;
    }
    else if (tagEN == 'femaleShoes') {
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // femaleShoes
      this.subCat = ['รองเท้าส้นแบน', 'รองเท้าส้นสูง', 'รองเท้าแตะ', 'รองเท้าลำลอง', 'รองเท้าบูทและรองเท้าหุ้มข้อ', 'รองเท้าผ้าใบ', 'ถุงเท้าและถุงน่อง', 'อุปกรณ์เสริมสำหรับรองเท้า', 'อื่นๆ'];
      this.groupBrandList = this.femaleShoesJSON;
    }
    else if (tagEN == 'beauty') {
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // beauty
      this.subCat = ['เครื่องสำอางสำหรับผิวหน้า', 'เครื่องสำอางสำหรับดวงตา', 'ลิป', 'ผลิตภัณฑ์ดูแลผิวหน้า', 'ผลิตภัณฑ์อาบน้ำและดูแลผิวกาย', 'ผลิตภัณฑ์ดูแลผม', 'ผลิตภัณฑ์สำหรับเล็บ', 'ผลิตภัณฑ์สำหรับผู้ชาย', 'อุปกรณ์เสริมความงาม', 'น้ำหอม', 'ของใช้ส่วนตัว', 'อื่นๆ'];
      this.groupBrandList = this.beautyJSON;
    }
    else if (tagEN == 'bag') {
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // bag
      this.subCat = ['กระเป๋าสตางค์', 'คลัทช์', 'กระเป๋าถือ', 'กระเป๋าสะพายข้าง', 'กระเป๋าเป้', 'กระเป๋าผ้า', 'กระเป๋าเดินทาง', 'กระเป๋าคาดอก', 'แบรนด์เนม', 'กระเป๋ากันน้ำ', 'อุปกรณ์เสริมกระเป๋า', 'อื่นๆ'];
      this.groupBrandList = this.bagJSON;
    }
    else if (tagEN == 'accessories') {
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // accessories
      this.subCat = ['สร้อยคอ', 'ต่างหู', 'หมวก', 'แหวน', 'กำไล', 'เครื่องประดับผม', 'ผ้าพันคอและผ้าคลุมไหล่', 'เข็มขัด', 'คัฟลิงค์และเนคไท', 'ถุงมือ', 'พวงกุญแจ', 'ผ้าเช็ดหน้า', 'ร่ม', 'เครื่องประดับทอง', 'เพชร', 'ทองคำแท่ง', 'อื่นๆ'];
      this.groupBrandList = this.accessoriesJSON;
    }
    else if (tagEN == 'homeAppliances') {
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // homeAppliances
      this.subCat = ['ห้องครัวและห้องอาหาร', 'ห้องนอน', 'ห้องน้ำ', 'อุปกรณ์ตกแต่งบ้าน', 'อุปกรณ์สำหรับจัดเก็บ', 'เฟอร์นิเจอร์', 'โคมไฟและอุปกรณ์ให้แสงสว่าง', 'ผลิตภัณฑ์ซักรีด', 'อุปกรณ์ทำความสะอาด', 'เครื่องมือไฟฟ้า', 'เครื่องมือช่าง', 'อุปกรณ์ปรับปรุงบ้าน', 'สวน', 'อื่นๆ'];
      this.groupBrandList = this.homeAppliancesJSON;
    }
    else if (tagEN == 'mobilePhone') {
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // mobilePhone
      this.subCat = ['โทรศัพท์มือถือ', 'แท็บเล็ต', 'เคสและซองมือถือ', 'อุปกรณ์เสริมมือถือ', 'อุปกรณ์กันรอยหน้าจอ', 'แบตเตอรี่สำรอง', 'อุปกรณ์ไอทีสวมใส่', 'อุปกรณ์เน็ตเวิร์ค', 'อื่นๆ'];
      this.groupBrandList = this.mobilePhoneJSON;
    }
    else if (tagEN == 'game') {
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // game
      this.subCat = ['เครื่องเกม', 'แผ่นและตลับเกม', 'ของสะสมจากเกม', 'อุปกรณ์เสริมเกม', 'Gaming Virtual Goods', 'เกมอื่นๆ'];
      this.groupBrandList = this.gameJSON;
    }
    else if (tagEN == 'camera') {
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // camera
      this.subCat = ['กล้องดิจิตอล', 'กล้องแอคชั่น', 'กล้องวงจรปิด', 'เลนส์', 'เมมโมรี่การ์ด', 'อุปกรณ์เสริมกล้อง', 'ฟิล์ม', 'อื่นๆ'];
      this.groupBrandList = this.cameraJSON;
    }
    else if (tagEN == 'sport') {
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // sport
      this.subCat = ['เสื้อผ้ากีฬาผู้หญิง', 'เสื้อผ้ากีฬาผู้ชาย', 'ฟุตบอลและกีฬาที่เล่นเป็นทีม', 'อุปกรณ์ฟิตเนสและออกกำลังกาย', 'กีฬาจักรยาน', 'กระเป๋ากีฬาและอุปกรณ์กีฬา', 'ตกปลา', 'การตั้งแค้มป์และเดินป่า', 'กีฬาแร็กเกต', 'ดำน้ำ', 'กีฬาทางน้ำ', 'กอล์ฟ', 'สเก็ตบอร์ดและสกูตเตอร์', 'มวยและศิลปะการต่อสู้', 'อื่นๆ'];
      this.groupBrandList = this.sportJSON;
    }
    else if (tagEN == 'computer') {
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // computer
      this.subCat = ['แล็ปท็อปและคอมตั้งโต๊ะ', 'ชิ้นส่วนคอมพิวเตอร์', 'ปริ้นเตอร์และอุปกรณ์เสริม', 'อุปกรณ์จัดเก็บข้อมูล', 'อุปกรณ์เน็ตเวิร์ค', 'อุปกรณ์เสริมคอมพิวเตอร์', 'อุปกรณ์สำหรับเล่นเกม', 'ซอฟต์แวร์', 'อื่นๆ'];
      this.groupBrandList = this.computerJSON;
    }
    else if (tagEN == 'food') {
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // food
      this.subCat = ['ขนม', 'อาหาร', 'เครื่องดื่ม', 'อื่นๆ'];
      this.groupBrandList = this.foodJSON;
    }
    else if (tagEN == 'electricalApp') {
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // electricalApp
      this.subCat = ['เครื่องปรับอากาศ', 'พัดลมไอเย็น', 'พัดลม', 'เครื่องฟอกอากาศ', 'เครื่องใช้ไฟฟ้าในครัวขนาดเล็ก', 'ตู้เย็น', 'เครื่องซักผ้าและเครื่องอบผ้า', 'เตารีดและอุปกรณ์ดูแลผ้า', 'เครื่องดูดฝุ่นและอุปกรณ์ดูแลพื้น', 'เตาแก๊ส', 'ไมโครเวฟและเตาอบ', 'เครื่องทำน้ำอุ่น', 'อุปกรณ์และอะไหล่เครื่องใช้ไฟฟ้า', 'อื่นๆ'];
      this.groupBrandList = this.electricalAppJSON;
    }
    else if (tagEN == 'motorVehicle') {
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // motorVehicle
      this.subCat = ['อุปกรณ์ภายในรถยนต์', 'อุปกรณ์ภายนอกรถยนต์', 'ผลิตภัณฑ์ดูแลรถยนต์', 'ล้อและยาง', 'อะไหล่/ชุดแต่งมอเตอร์ไซค์', 'อะไหล่/ชุดแต่งรถยนต์', 'อุปกรณ์สวมใส่สำหรับขับขี่', 'น้ำมันและของเหลว', 'เครื่องเสียงรถยนต์', 'กล้องติดรถยนต์', 'แบตเตอรี่และอุปกรณ์เสริม', 'ฟิล์มรถยนต์', 'ยานพาหนะ', 'ทะเบียน', 'อื่นๆ'];
      this.groupBrandList = this.motorVehicleJSON;
    }
    else if (tagEN == 'voucher') {
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // voucher
      this.subCat = ['Lifestyle', 'บันเทิงเเละกิจกรรม', 'อาหารและเครื่องดื่ม', 'สุขภาพและความงาม', 'ท่องเที่ยว', 'Real Estate', 'Insurance', 'Games & Streaming', 'Shopping and Home Living', 'Transportation & Delivery', 'Line stickers and themes', 'อื่นๆ'];
      this.groupBrandList = this.voucherJSON;
    }
    else if (tagEN == 'fetish') {
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // fetish
      this.subCat = ['ตะกรุด', 'สัตว์เสริมดวง', 'ผ้ายันต์', 'กุมาร', 'เบี้ยแก้', 'สีผึ้ง', 'น้ำเต้า', 'ลูกอม (ลูกแก้ว)', 'นางกวัก', 'พระเครื่อง', 'อื่นๆ'];
      this.groupBrandList = [];
    }
    else if (tagEN == 'collectibles') {
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // collectibles
      this.subCat = ['ตุ๊กตา', 'ฟิกเกอร์โมเดล', 'ตัวต่อ', 'สติกเกอร์', 'RC', 'เพลงและภาพยนต์', 'ของโบราณ', 'อื่นๆ'];
      this.groupBrandList = [];
    }
    else if (tagEN == 'other') {
      this.tagEN = tagEN;
      this.tagTH = tagTH;
      this.placeholderProductTag = this.tagTH;
      // other
      this.subCat = ['อื่นๆ'];
      this.groupBrandList = [];
    }
  }

  closeDropdownMenu() {
    this.dropdownMenuShow = false
  }

  productType(type) {
    this.type = type;
    // console.log(this.type);
    if(type == 'new'){
      this.placeholderSecondHandPer = 'รายละเอียดสินค้ามือสอง';
    }
  }

  secondHandPer(placeholder){
    this.placeholderSecondHandPer = placeholder;
  }

  _salesType(salesType) {
    this.salesType = salesType;
    if (salesType == 'auction') {
      this.salesTypeSelectAuction = true;
    }
    else {
      this.salesTypeSelectAuction = false;
    }
    // console.log(this.salesType);
  }

  selectGroupProduct(data) {
    this.placeholderGroupProduct = data;
    // console.log(this.placeholderGroupProduct);
  }

  inputKeySearch(keySearch) {
    this.keySearchValue = '';
    // console.log(this.keySearchValue)
    // console.log(keySearch)

    if (keySearch != '' && this.keySearch.length < 100) {
      // CHECK SPACE
      var keySearchSplit = keySearch.split(/(\s+)/).filter(e => e.trim().length > 0)
      var _keySearch = keySearchSplit[0];
      // console.log(_keySearch)
      for (var i = 1; i < keySearchSplit.length; i++) {
        _keySearch = _keySearch + ' ' + keySearchSplit[i];
      }

      // console.log(_keySearch)
      this.keySearch.push(_keySearch);
      this.keySearchValue = '';
    }
    // console.log(this.keySearch)
    // console.log(this.keySearchValue)
  }

  keySearchPop() {
    this.keySearch.pop();
  }

  selecAddSub(){
    if(this.subOptionShow){
      this.subOptionShow = false;
    }
    else{
      this.subOptionShow = true;
    }
  }

  addSupOption(subOptionInput, subOptionNumberInput) {
    // console.log(subOptionInput);
    // console.log(subOptionNumberInput);
    // subOptionInput = '1';
    // subOptionNumberInput = '1';
    if (subOptionInput != '' && subOptionNumberInput != '' && this.subOptionCount < 20) {
      this.subOptionArray.push({
        subOption: subOptionInput,
        subOptionNumber: Number(subOptionNumberInput)
      });
      this.countProductInSupOption = Number(this.countProductInSupOption) + Number(subOptionNumberInput);
      this.subOptionValue = '';
      this.subOptionNumberValue = '';
      this.subOptionShow = false;
      this.subOptionCount++
    }
    // console.log(this.subOptionArray);
  }

  addOption(optionNameInput, optionNumberInput) {
    // console.log(optionNameInput , '->' , optionNumberInput)
    // this.optionNameValue = '';
    // if (optionNameInput != '' && this.subOptionArray != '') {
    if (optionNameInput != '' && this.optionCount < 20) {
      if(this.subOptionArray.length != 0){
        this.optionArray.push({
          optionName: optionNameInput,
          optionNumber: Number(this.countProductInSupOption),
          subOption: this.subOptionArray
        });
      }
      else{
        if(optionNumberInput != ''){
          this.optionArray.push({
            optionName: optionNameInput,
            optionNumber: Number(optionNumberInput),
            subOption: this.subOptionArray
          });
        }
        else{
          return
        }
      }
      // console.log(this.optionArray);
      // optionNumberInput != ''
      this.optionNameValue = '';
      this.optionNumberValue = '';
      this.subOptionArray = [];
      this.subOptionCount = 0;
      this.countProductInSupOption = 0;
      this.optionCount++
      // console.log(this.optionArray)
    }
  }

  addOptionNewVersion(optionNameInput, optionNumberInput){
    if(optionNameInput != '' && optionNumberInput != ''){
      this.optionNameValue = '';
      this.optionNumberValue = '';
      this.optionCount++
      this.optionArray.push({
        optionName: optionNameInput,
        optionNumber: Number(optionNumberInput)
      });
    }
  }

  deleteSubOp(subOp) {
    this.subOptionArray.splice(this.subOptionArray.indexOf(subOp), 1);
    this.countProductInSupOption = Number(this.countProductInSupOption) - Number(subOp.subOptionNumber);
    this.subOptionCount--
  }

  editSubOp(subOpJ, subOp) {
    this.subOptionShow = false;
    // console.log(subOp)
    // SELECT DATA & SET EDIT SUB OPTION
    this.dataEditSubOption = {
      j: subOpJ,
      subOp: subOp
    }
    // SHOW EDIT SUB OPTION
    this.editSubOptionShow = true;
  }

  selecEditSub(){
    // CLEAR SELECT DATA EDIT SUB OPTION
    this.dataEditSubOption = {
      j: null,
      subOp: null
    }
    // CLOSE CONTENT EDIT SUB OPTION
    this.editSubOptionShow = false;
  }

  updateSupOption(subOptionEdit, subOptionNumberEdit){
    // console.log(this.dataEditSubOption.j, this.dataEditSubOption.subOp)
    // console.log(subOptionEdit, subOptionNumberEdit)
    // UPDATE DATA NEW INPUT IN SUB OPTION ARRAY
    this.subOptionArray[this.dataEditSubOption.j] = {
      subOption: subOptionEdit,
      subOptionNumber: Number(subOptionNumberEdit)
    };
    // UPDATE COUNT OF NUMBER IN SUB ARRAY
    this.countProductInSupOption = Number(this.countProductInSupOption) - Number(this.dataEditSubOption.subOp.subOptionNumber) + Number(subOptionNumberEdit);
    // CLEAR SELECT DATA EDIT SUB OPTION
    this.dataEditSubOption = {
      j: null,
      subOp: null
    }
    // HIDE EDIT SUB OPTION
    this.editSubOptionShow = false;
  }

  deleteOption(option) {
    this.optionArray.splice(this.optionArray.indexOf(option), 1);
    this.optionCount--
  }

  _getMaxDate(maxDate) {
    // console.log(maxDate)
    let d = new Date(maxDate.setDate(maxDate.getDate() + 90));
    // console.log(d)
    this.maxDate = {
      day: d.getDate(),
      month: d.getMonth() + 1,
      year: d.getFullYear()
    };
    // console.log(this.maxDate)
  }

  dateSelect(dataDateInput) {
    // console.log(dataDateInput);
    this.dateSelectBid = dataDateInput;
  }

  timeSelect(dataTimeInput) {
    // console.log(dataTimeInput);
    this.timeSelectBid = dataTimeInput;
  }

  selectHR(data){
    this.timeBidCH = data;
  }

  countHrInput($event){
    // console.log($event.target.value)
    this.timeBidCH = $event.target.value;
  }

  selectM(data){
    this.timeBidCM = data;
  }

  countMinInput($event){
    // console.log($event.target.value)
    var _num:any = Number($event.target.value);
    // console.log(_num)
    if(_num > 59){
      this.timeBidCM = '59';
    }
    else{
      this.timeBidCM = $event.target.value;
    }
    // console.log('timeBidCM =>', this.timeBidCM)
  }

  selectS(data){
    this.timeBidCS = data;
  }

  countSecInput($event){
    var _num:any = Number($event.target.value);
    if(_num > 59){
      this.timeBidCS = '59';
    }
    else{
        this.timeBidCS = $event.target.value;
    }
    // console.log('timeBidCS =>', this.timeBidCS)
  }


  timeBidInput(input) {
    // console.log(input)
    // console.log(input.target.value);
    // console.log(Number(input.target.value));

    // if (Number(input.target.value) == 0)
    // {
    //   console.log('1');
    //   this.timeBidAutoCom = '1';
    // }
    // console.log(input);
    if (Number(input.target.value) > 6000) {
      // console.log(6000);
      this.timeBidAutoCom = 6000;
    }
    else {
      // console.log(Number(input.target.value));
      this.timeBidAutoCom = Number(input.target.value);
    }

  }

  // Input Img File
  fileChangeEvent(event: any): void {
    // console.log(event);
    this.imageChangedEvent = event;
  }

  // Crop
  imageCropped(event: ImageCroppedEvent) {
    // console.log(event);
    this.croppedImage = event.base64;
  }

  // Button OK
  setProductImg1() {
    // console.log(this.croppedImage);
    // Set Img
    if (this.croppedImage != "") {
      this.imgURL1 = this.croppedImage;
      this.imgDisabled2 = false;
    }
  }

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }


  // Button OK
  setProductImg2() {
    // Set Img
    if (this.croppedImage != "") {
      this.imgURL2 = this.croppedImage;
      this.imgDisabled3 = false;
    }
  }

  // Button OK
  setProductImg3() {
    // Set Img
    if (this.croppedImage != "") {
      this.imgURL3 = this.croppedImage;
      this.imgDisabled4 = false;
    }
  }

  // Button OK
  setProductImg4() {
    // Set Img
    if (this.croppedImage != "") {
      this.imgURL4 = this.croppedImage;
      this.imgDisabled5 = false;
    }
  }

  // Button OK
  setProductImg5() {
    // Set Img
    if (this.croppedImage != "") {
      this.imgURL5 = this.croppedImage;
    }
  }

  deleteProductImg1() {
    this.imgURL1 = './assets/img/productThumbnail.png';
  }

  deleteProductImg2() {
    this.imgURL2 = './assets/img/productThumbnail.png';
  }

  deleteProductImg3() {
    this.imgURL3 = './assets/img/productThumbnail.png';
  }

  deleteProductImg4() {
    this.imgURL4 = './assets/img/productThumbnail.png';
  }

  deleteProductImg5() {
    this.imgURL5 = './assets/img/productThumbnail.png';
  }

  priceStart(priceStartInput) {
    // console.log(Number(priceStartInput.target.value));
    this.priceStartInput = Number(priceStartInput.target.value);
  }

  priceBid(priceBidInput) {
    // console.log(Number(priceBidInput.target.value));
    this.priceBidInput = Number(priceBidInput.target.value);
  }

  priceAutoWin(priceAutoWinInput) {
    // console.log(Number(priceAutoWinInput.target.value));
    this.priceAutoWinInput = Number(priceAutoWinInput.target.value);
    // if(this.priceAutoWinInput != 0) {
    this.checkForDelivery();
    // }
  }

  priceProduct(priceProductInput) {
    // console.log(Number(priceProductInput.target.value));
    this.priceProductInput = Number(priceProductInput.target.value);
    // if(this.priceProductInput != 0) {
    this.checkForDelivery();
    // }
  }

  weightInput(weightInput) {
    if (isNaN(Number(weightInput.target.value))) {
      // console.log('Fail')
      this.weightNaN = true;
    }
    else {
      this.weightNaN = false;
      // console.log(Number(weightInput.target.value));
      this.weightDelivery = Number(weightInput.target.value);
      this.checkForDelivery();
    }

    // console.log(Number(weightInput.target.value));
    // this.weightDelivery = Number(weightInput.target.value);
    // this.checkForDelivery();

    // if(this.weightDelivery != 0 && this.wideDelivery != 0 && this.longDelivery != 0 && this.highDelivery != 0) {
    //   this.checkForDelivery();
    // }
  }

  wideInput(wideInput) {
    // console.log(Number(wideInput.target.value));
    this.wideDelivery = Number(wideInput.target.value);
    this.checkForDelivery();
    // if(this.weightDelivery != 0 && this.wideDelivery != 0 && this.longDelivery != 0 && this.highDelivery != 0) {
    //   this.checkForDelivery();
    // }
  }

  longInput(longInput) {
    // console.log(Number(longInput.target.value));
    this.longDelivery = Number(longInput.target.value);
    this.checkForDelivery();
    // if(this.weightDelivery != 0 && this.wideDelivery != 0 && this.longDelivery != 0 && this.highDelivery != 0) {
    //   this.checkForDelivery();
    // }
  }

  highInput(highInput) {
    // console.log(Number(highInput.target.value));
    this.highDelivery = Number(highInput.target.value);
    this.checkForDelivery();
    // if(this.weightDelivery != 0 && this.wideDelivery != 0 && this.longDelivery != 0 && this.highDelivery != 0) {
    //   this.checkForDelivery();
    // }
  }

  checkForDelivery() {
    // console.log('checkForDelivery');
    if (this.weightDelivery != 0 && this.wideDelivery != 0 && this.longDelivery != 0 && this.highDelivery != 0) {
      if (this.salesType == 'auction') {
        // console.log('priceStartInput, priceBidInput, priceAutoWinInput');

        // Go to ThaiPost, Kerry, Scg
        // console.log('Go to ThaiPost, Kerry, Scg');
        this.checkPrice = false;
        this.handPickUp = true;
        this.weightThaiPost(this.priceAutoWinInput, this.weightDelivery, this.wideDelivery, this.longDelivery, this.highDelivery);
        this.weightKerry(this.priceAutoWinInput, this.weightDelivery, this.wideDelivery, this.longDelivery, this.highDelivery);
        this.weightScg(this.priceAutoWinInput, this.weightDelivery, this.wideDelivery, this.longDelivery, this.highDelivery);
        this.weightFlash(this.priceAutoWinInput, this.weightDelivery, this.wideDelivery, this.longDelivery, this.highDelivery);
      }
      else {
        // console.log('priceProductInput');
        if (this.priceProductInput == 0) {
          // console.log('No Price Product');
          this.checkPrice = true;
          this.remoteAreaStatusKerry = false
          this.remoteAreaStatusScg = false;
          this.thaiPostStatus = false;
          this.kerryStatus = false;
          this.scgStatus = false;
          this.flashStatus = false;
          this.handPickUp = false;
          this.thaiPostOver = false;
          this.kerryOver = false;
          this.scgOver = false;
          this.flashOver = false;
        }
        else {
          // Go to ThaiPost, Kerry, Scg
          // console.log('Go to ThaiPost, Kerry, Scg');
          this.checkPrice = false;
          this.handPickUp = true;
          this.weightThaiPost(this.priceProductInput, this.weightDelivery, this.wideDelivery, this.longDelivery, this.highDelivery);
          this.weightKerry(this.priceProductInput, this.weightDelivery, this.wideDelivery, this.longDelivery, this.highDelivery);
          this.weightScg(this.priceProductInput, this.weightDelivery, this.wideDelivery, this.longDelivery, this.highDelivery);
          this.weightFlash(this.priceProductInput, this.weightDelivery, this.wideDelivery, this.longDelivery, this.highDelivery);
        }
      }
    }
    else {
      this.remoteAreaStatusKerry = false;
      this.remoteAreaStatusScg = false;
      this.thaiPostStatus = false;
      this.kerryStatus = false;
      this.scgStatus = false;
      this.flashStatus = false;
      this.handPickUp = false;
    }
  }

  transportTime(type) {
    if (type == 'yes') {
      this.deliveryLonger = true;
    }
    else {
      this.deliveryLonger = false;
    }
  }

  _dayDelivery(dayInput) {
    this.dayDelivery = Number(dayInput.target.value);
    // console.log(this.dayDelivery);
    // if(this.dayDelivery){
    //   this.dayDeliveryStatus
    // }
  }

  _donateType() {
    // console.log(this.donateType);
    if (this.donateType == false) {
      this.donateType = true;
    }
    else {
      this.donateType = false;
    }
    // console.log(this.donateType);
  }


  selectDonate(data) {
    // this.placeholderGroupProduct = data;
    // console.log(this.placeholderGroupProduct);
    // CHECKBOK CHECKED
    if (this.selectDonateData.key == null) {
      this.placeholdonate = data.value.shopName;
      this.selectDonateData = {
        key: data.key,
        shopName: data.value.shopName
      };
    }
    // CHECKBOK UNCHECKED
    else {
      this.placeholdonate = 'ตัวเลือกมูลนิธิ';
      this.selectDonateData = {
        key: null,
        shopName: null
      };
    }
    // IT OK
    // this.placeholdonate = data.value.shopName;
    // this.selectDonateData = {
    //   key: data.key,
    //   shopName: data.value.shopName
    // };

    // console.log(data);
    // console.log('this.selectDonateData >',this.selectDonateData);
    // console.log(this.placeholdonate);
  }

  slider(valueInput) {
    // console.log(valueInput.newValue);
    this.sliderDonate = valueInput.newValue
  }

  // -------------------------------------------------------------- THAI POST

  weightThaiPost(priceProduct, weightInput, wideInput, longInput, highInput) {
    const dimension = wideInput + longInput + highInput;
    if (weightInput <= 20 && dimension <= 120) {
      // console.log('return ', this.priceThaiPost(weightInput));
      this.thaiPostStatus = true;
      this.thaiPostOver = false;
      this.priceThaiPost(priceProduct, weightInput, dimension)
      // console.log('return ', this.priceCODThaiPost());
      // this.priceCODThaiPost(priceProduct)
    }
    else {
      // DISABLE THAI POST
      // console.log('DISABLE THAI POST');
      this.thaiPostStatus = false;
      this.thaiPostOver = true;
    }
  }

  priceThaiPost(priceProduct, weightInput, dimension) {
    // weightInput > (kg)
    // Table > (g)
    weightInput = weightInput * 1000;
    if (weightInput <= 500) {
      // console.log('<= 500 g > ', 55);
      this.priceCODThaiPost(priceProduct, weightInput, dimension, 55);
    }
    else if (weightInput <= 1000) {
      // console.log('<= 1000 g > ', 70);
      this.priceCODThaiPost(priceProduct, weightInput, dimension, 70);
    }
    else if (weightInput <= 2000) {
      // console.log('<= 2000 g > ', 80);
      this.priceCODThaiPost(priceProduct, weightInput, dimension, 80);
    }
    else if (weightInput <= 5000) {
      // console.log('<= 5000 g > ', 90);
      this.priceCODThaiPost(priceProduct, weightInput, dimension, 90);
    }
    else if (weightInput <= 10000) {
      // console.log('<= 10000 g > ', 110);
      this.priceCODThaiPost(priceProduct, weightInput, dimension, 110);
    }
    else if (weightInput <= 15000) {
      // console.log('<= 15000 g > ', 170);
      this.priceCODThaiPost(priceProduct, weightInput, dimension, 170);
    }
    else {
      // console.log('<= 20000 g > ', 220);
      this.priceCODThaiPost(priceProduct, weightInput, dimension, 220);
    }
  }

  priceCODThaiPost(priceProduct, weightInput, dimension, priceDelivery) {
    if (this.salesType == 'auction') {
      // Auction NO Cal COD
      this.vat7PerThaiPost(priceProduct, weightInput, dimension, priceDelivery, 0);
    }
    else {
      // Sale Cal COD
      if (priceProduct <= 5000) {
        this.priceProductOverForCOD = false
        this.vat7PerThaiPost(priceProduct, weightInput, dimension, priceDelivery, 45);
      }
      else if (priceProduct <= 10000) {
        this.priceProductOverForCOD = false
        this.vat7PerThaiPost(priceProduct, weightInput, dimension, priceDelivery, 55);
      }
      else {
        this.priceProductOverForCOD = true;
        this.vat7PerThaiPost(priceProduct, weightInput, dimension, priceDelivery, 0);
      }
    }
  }

  vat7PerThaiPost(priceProduct, weightInput, dimension, priceDelivery, COD) {
    // console.log('priceProduct > ', priceProduct);
    // console.log('weightInput > ', weightInput);
    // console.log('dimension > ', dimension);
    // console.log('priceDelivery > ', priceDelivery);
    // console.log('COD > ', COD);
    // console.log('FINAL > ', (priceDelivery + COD + ((priceDelivery + COD) * 7) / 100))

    // Vat 7%
    const st = String(priceDelivery + COD + ((priceDelivery + COD) * 7) / 100).split('.');
    if (st.length == 1) {
      // console.log('FINAL Thai Post > ', Number(st[0] + '.' + '00'));
      this.priceThaiPostDelivery = ({
        deliveryName: 'Thailand Post',
        priceReal: priceDelivery - 5,
        priceABM: priceDelivery,
        COD: COD,
        price7PerDelivery: Number(st[0] + '.' + '00'),
        priceDeliveryInput: Number(st[0] + '.' + '00')
      });
    }
    else {
      // console.log('FINAL Thai Post > ', Number(st[0]) + 1);
      this.priceThaiPostDelivery = ({
        deliveryName: 'Thailand Post',
        priceReal: priceDelivery - 5,
        priceABM: priceDelivery,
        COD: COD,
        price7PerDelivery: Number(st[0]) + 1,
        priceDeliveryInput: Number(st[0]) + 1
      });
    }
  }
  // -------------------------------------------------------------- END THAI POST

  // -------------------------------------------------------------- KERRY
  weightKerry(priceProduct, weightInput, wideInput, longInput, highInput) {
    const dimension = wideInput + longInput + highInput;
    if (weightInput <= 20 && dimension <= 180) {
      this.kerryStatus = true;
      this.kerryOver = false;
      this.priceKerry(priceProduct, weightInput, dimension)
    }
    else {
      // DISABLE KERRY
      // console.log('DISABLE KERRY');
      this.kerryStatus = false;
      this.kerryOver = true;
    }
  }

  priceKerry(priceProduct, weightInput, dimension) {
    // weightInput > (kg)
    // Table > (g)
    weightInput = weightInput * 1000;
    if (weightInput <= 1000) {
      // console.log('<= 1000 g > ', 95);
      this.priceCODKerry(priceProduct, weightInput, dimension, 95);
    }
    else if (weightInput <= 3000) {
      // console.log('<= 2000 g > ', 105);
      this.priceCODKerry(priceProduct, weightInput, dimension, 105);
    }
    else if (weightInput <= 5000) {
      // console.log('<= 5000 g > ', 145);
      this.priceCODKerry(100000, weightInput, dimension, 145);
    }
    else if (weightInput <= 10000) {
      // console.log('<= 10000 g > ', 175);
      this.priceCODKerry(priceProduct, weightInput, dimension, 175);
    }
    else if (weightInput <= 15000) {
      // console.log('<= 15000 g > ', 245);
      this.priceCODKerry(priceProduct, weightInput, dimension, 245);
    }
    else {
      // console.log('<= 20000 g > ', 285);
      this.priceCODKerry(priceProduct, weightInput, dimension, 285);
    }
  }

  priceCODKerry(priceProduct, weightInput, dimension, priceDelivery) {
    if (this.salesType == 'auction') {
      // Auction NO Cal COD
      this.remoteAreaKerry(priceProduct, weightInput, dimension, priceDelivery, 0);
    }
    else {
      // Sale Cal COD
      // Kerry COD 3% Of priceProduct
      if (priceProduct <= 10000) {
        var COD3PerOfPriceProduct = (priceProduct * 3) / 100
        // console.log(COD3PerOfPriceProduct);
        if (COD3PerOfPriceProduct < 65) {
          this.priceProductOverForCOD = false
          this.remoteAreaKerry(priceProduct, weightInput, dimension, priceDelivery, 65);
        }
        else {
          this.priceProductOverForCOD = false
          this.remoteAreaKerry(priceProduct, weightInput, dimension, priceDelivery, COD3PerOfPriceProduct);
        }
      }
      else {
        this.priceProductOverForCOD = true;
        this.remoteAreaKerry(priceProduct, weightInput, dimension, priceDelivery, 0);
      }
    }
  }

  remoteAreaKerry(priceProduct, weightInput, dimension, priceDelivery, COD) {
    // this.userSellerFB.shopAddress;
    // console.log(this.userSellerFB.shopAddress.postalCode);
    var pc = this.userSellerFB.shopAddress.postalCode
    // pc = '50260';
    if (pc == '23170' || pc == '50240' || pc == '50260' || pc == '50270' || pc == '50310' || pc == '58130' || pc == '51160' || pc == '52160' || pc == '56160' || pc == '57170' || pc == '57260' || pc == '57340' || pc == '58000' || pc == '58110' || pc == '58130' || pc == '81150' || pc == '95130' || pc == '96110' || pc == '20120' || pc == '50250' || pc == '50350' || pc == '52180' || pc == '55220' || pc == '57180' || pc == '57310' || pc == '58120' || pc == '58140' || pc == '58150' || pc == '63170' || pc == '67260' || pc == '71180' || pc == '71240' || pc == '81140' || pc == '82160' || pc == '84280' || pc == '84360' || pc == '94230' || pc == '94120' || pc == '95110' || pc == '95120' || pc == '95150' || pc == '95160' || pc == '95170' || pc == '96120' || pc == '96130' || pc == '96140' || pc == '96150' || pc == '96160' || pc == '96190' || pc == '96210' || pc == '96220') {
      priceDelivery = priceDelivery + 50;
      // console.log('remoteAreaKerry OK');
      this.remoteAreaStatusKerry = true;
      this.vat7PerKerry(priceProduct, weightInput, dimension, priceDelivery, COD);
    }
    else {
      this.remoteAreaStatusKerry = false;
      this.vat7PerKerry(priceProduct, weightInput, dimension, priceDelivery, COD);
    }
  }

  vat7PerKerry(priceProduct, weightInput, dimension, priceDelivery, COD) {
    // console.log('priceProduct > ', priceProduct);
    // console.log('weightInput > ', weightInput);
    // console.log('dimension > ', dimension);
    // console.log('priceDelivery > ', priceDelivery);
    // console.log('COD > ', COD);
    // console.log('FINAL > ', (priceDelivery + COD + ((priceDelivery + COD) * 7) / 100))
    // Vat 7%
    const st = String(priceDelivery + COD + ((priceDelivery + COD) * 7) / 100).split('.');
    if (st.length == 1) {
      // console.log('FINAL KERRY > ', Number(st[0] + '.' + '00'));
      this.priceKerryDelivery = ({
        deliveryName: 'Kerry Express',
        priceReal: priceDelivery - 5,
        priceABM: priceDelivery,
        COD: COD,
        price7PerDelivery: Number(st[0] + '.' + '00'),
        priceDeliveryInput: Number(st[0] + '.' + '00')
      });
    }
    else {
      // console.log('FINAL KERRY > ', Number(st[0]) + 1);
      this.priceKerryDelivery = ({
        deliveryName: 'Kerry Express',
        priceReal: priceDelivery - 5,
        priceABM: priceDelivery,
        COD: COD,
        price7PerDelivery: Number(st[0]) + 1,
        priceDeliveryInput: Number(st[0]) + 1
      });
    }
  }
  // -------------------------------------------------------------- END KERRY

  // -------------------------------------------------------------- SCG EXPRESS
  weightScg(priceProduct, weightInput, wideInput, longInput, highInput) {
    const dimension = wideInput + longInput + highInput;
    if (weightInput <= 25 && dimension <= 200) {
      this.scgStatus = true;
      this.scgOver = false;
      this.priceScg(priceProduct, weightInput, dimension)
    }
    else {
      // DISABLE SCG
      this.scgStatus = false;
      this.scgOver = true;
    }
  }

  priceScg(priceProduct, weightInput, dimension) {
    // dimension
    if (dimension <= 40) {
      // console.log('<= 40 cm > ', 55);
      this.priceCODScg(priceProduct, weightInput, dimension, 55);
    }
    else if (dimension <= 50) {
      // console.log('<= 50 cm > ', 50);
      this.priceCODScg(priceProduct, weightInput, dimension, 65);
    }
    else if (dimension <= 60) {
      // console.log('<= 60 cm > ', 85);
      this.priceCODScg(priceProduct, weightInput, dimension, 85);
    }
    else if (dimension <= 80) {
      // console.log('<= 80 cm > ', 105);
      this.priceCODScg(priceProduct, weightInput, dimension, 105);
    }
    else if (dimension <= 100) {
      // console.log('<= 100 cm > ', 140);
      this.priceCODScg(priceProduct, weightInput, dimension, 140);
    }
    else if (dimension <= 120) {
      // console.log('<= 120 cm > ', 205);
      this.priceCODScg(priceProduct, weightInput, dimension, 205);
    }
    else if (dimension <= 140) {
      // console.log('<= 140 cm > ', 265);
      this.priceCODScg(priceProduct, weightInput, dimension, 265);
    }
    else if (dimension <= 160) {
      // console.log('<= 160 cm > ', 320);
      this.priceCODScg(priceProduct, weightInput, dimension, 320);
    }
    else if (dimension <= 180) {
      // console.log('<= 180 cm > ', 365);
      this.priceCODScg(priceProduct, weightInput, dimension, 365);
    }
    else {
      // console.log('<= 200 cm > ', 405);
      this.priceCODScg(priceProduct, weightInput, dimension, 405);
    }
  }

  priceCODScg(priceProduct, weightInput, dimension, priceDelivery) {
    if (this.salesType == 'auction') {
      // Auction NO Cal COD
      this.remoteAreaScg(priceProduct, weightInput, dimension, priceDelivery, 0);
    }
    else {
      // Sale Cal COD
      // Scg COD 4% Of priceProduct
      if (priceProduct <= 10000) {
        var COD4PerOfPriceProduct = (priceProduct * 4) / 100
        // console.log(COD4PerOfPriceProduct);
        if (COD4PerOfPriceProduct < 70) {
          this.priceProductOverForCOD = false
          this.remoteAreaScg(priceProduct, weightInput, dimension, priceDelivery, 70);
        }
        else {
          this.priceProductOverForCOD = false
          this.remoteAreaScg(priceProduct, weightInput, dimension, priceDelivery, COD4PerOfPriceProduct);
        }
      }
      else {
        this.priceProductOverForCOD = true
        this.remoteAreaScg(priceProduct, weightInput, dimension, priceDelivery, 0);
      }
    }
  }

  remoteAreaScg(priceProduct, weightInput, dimension, priceDelivery, COD) {
    // this.userSellerFB.shopAddress;
    // console.log(this.userSellerFB.shopAddress.postalCode);
    // console.log(this.userSellerFB.shopAddress.province);
    var pv = this.userSellerFB.shopAddress.province;
    var pc = this.userSellerFB.shopAddress.postalCode;
    // pc = '50190';
    if (pc == '50190' || pc == '50900' || pc == '50240' || pc == '50250' || pc == '50260' || pc == '50270' || pc == '58130' || pc == '50310' || pc == '50350' || pc == '51160' || pc == '55220' || pc == '55130' || pc == '55170' || pc == '56160' || pc == '57160' || pc == '57170' || pc == '57180' || pc == '57260' || pc == '57130' || pc == '57340' || pc == '63170' || pc == '67260' || pc == '71180' || pc == '71240' || pc == '71250' || pc == '85120' || pc == '90130' || pc == '90140' || pc == '90150' || pc == '90260' || pc == '90160' || pc == '90210' || pv == 'แม่ฮ่องสอน' || pv == 'นราธิวาส' || pv == 'ปัตตานี' || pv == 'ยะลา'
    ) {
      priceDelivery = priceDelivery + 50;
      // console.log('remoteAreaKerry OK');
      this.remoteAreaStatusScg = true;
      this.vat7PerScg(priceProduct, weightInput, dimension, priceDelivery, COD);
    }
    else {
      this.remoteAreaStatusScg = false;
      this.vat7PerScg(priceProduct, weightInput, dimension, priceDelivery, COD);
    }
  }

  vat7PerScg(priceProduct, weightInput, dimension, priceDelivery, COD) {
    // console.log('priceProduct > ', priceProduct);
    // console.log('weightInput > ', weightInput);
    // console.log('dimension > ', dimension);
    // console.log('priceDelivery > ', priceDelivery);
    // console.log('COD > ', COD);
    // console.log('FINAL > ', (priceDelivery + COD + ((priceDelivery + COD) * 7) / 100))
    // Vat 7%
    const st = String(priceDelivery + COD + ((priceDelivery + COD) * 7) / 100).split('.');
    if (st.length == 1) {
      // console.log('FINAL SCG > ', Number(st[0] + '.' + '00'));
      this.priceScgDelivery = ({
        deliveryName: 'SCG Express',
        priceReal: priceDelivery - 5,
        priceABM: priceDelivery,
        COD: COD,
        price7PerDelivery: Number(st[0] + '.' + '00'),
        priceDeliveryInput: Number(st[0] + '.' + '00')
      });
    }
    else {
      // console.log('FINAL SCG > ', Number(st[0]) + 1);
      this.priceScgDelivery = ({
        deliveryName: 'SCG Express',
        priceReal: priceDelivery - 5,
        priceABM: priceDelivery,
        COD: COD,
        price7PerDelivery: Number(st[0]) + 1,
        priceDeliveryInput: Number(st[0]) + 1
      });
    }
  }

  // -------------------------------------------------------------- END SCG EXPRESS

  // -------------------------------------------------------------- FLASH EXPRESS
  weightFlash(priceProduct, weightInput, wideInput, longInput, highInput){
    const dimension = wideInput + longInput + highInput;
    if (weightInput <= 50 && dimension <= 280) {
      this.flashStatus = true;
      this.flashOver = false;
      this.priceFlash(priceProduct, weightInput, dimension)
    }
    else {
      // DISABLE FLASH
      this.flashStatus = false;
      this.flashOver = true;
    }
  }

  priceFlash(priceProduct, weightInput, dimension) {
    // dimension
    if (dimension <= 40 && weightInput <= 1) {
      this.priceCODFlash(priceProduct, weightInput, dimension, 40);
    }
    else if (dimension <= 50 && weightInput <= 2) {
      this.priceCODFlash(priceProduct, weightInput, dimension, 45);
    }
    else if (dimension <= 60 && weightInput <= 3) {
      this.priceCODFlash(priceProduct, weightInput, dimension, 50);
    }
    else if (dimension <= 70 && weightInput <= 4) {
      this.priceCODFlash(priceProduct, weightInput, dimension, 55);
    }
    else if (dimension <= 80 && weightInput <= 5) {
      this.priceCODFlash(priceProduct, weightInput, dimension, 60);
    }
    else if (dimension <= 85 && weightInput <= 6) {
      this.priceCODFlash(priceProduct, weightInput, dimension, 65);
    }
    else if (dimension <= 90 && weightInput <= 7) {
      this.priceCODFlash(priceProduct, weightInput, dimension, 80);
    }
    else if (dimension <= 95 && weightInput <= 8) {
      this.priceCODFlash(priceProduct, weightInput, dimension, 95);
    }
    else if (dimension <= 100 && weightInput <= 9) {
      this.priceCODFlash(priceProduct, weightInput, dimension, 110);
    }
    else if (dimension <= 105 && weightInput <= 10) {
      this.priceCODFlash(priceProduct, weightInput, dimension, 125);
    }
    else if (dimension <= 110 && weightInput <= 11) {
      this.priceCODFlash(priceProduct, weightInput, dimension, 140);
    }
    else if (dimension <= 115 && weightInput <= 12) {
      this.priceCODFlash(priceProduct, weightInput, dimension, 155);
    }
    else if (dimension <= 120 && weightInput <= 13) {
      this.priceCODFlash(priceProduct, weightInput, dimension, 170);
    }
    else if (dimension <= 125 && weightInput <= 14) {
      this.priceCODFlash(priceProduct, weightInput, dimension, 185);
    }
    else if (dimension <= 130 && weightInput <= 15) {
      this.priceCODFlash(priceProduct, weightInput, dimension, 200);
    }
    else if (dimension <= 135 && weightInput <= 16) {
      this.priceCODFlash(priceProduct, weightInput, dimension, 215);
    }
    else if (dimension <= 140 && weightInput <= 17) {
      this.priceCODFlash(priceProduct, weightInput, dimension, 230);
    }
    else if (dimension <= 145 && weightInput <= 18) {
      this.priceCODFlash(priceProduct, weightInput, dimension, 245);
    }
    else if (dimension <= 150 && weightInput <= 19) {
      this.priceCODFlash(priceProduct, weightInput, dimension, 260);
    }
    else if (dimension <= 155 && weightInput <= 20) {
      this.priceCODFlash(priceProduct, weightInput, dimension, 275);
    }
    else if (dimension <= 160 && weightInput <= 21) {
      this.priceCODFlash(priceProduct, weightInput, dimension, 290);
    }
    else if (dimension <= 165 && weightInput <= 22) {
      this.priceCODFlash(priceProduct, weightInput, dimension, 305);
    }
    else if (dimension <= 170 && weightInput <= 23) {
      this.priceCODFlash(priceProduct, weightInput, dimension, 320);
    }
    else if (dimension <= 175 && weightInput <= 24) {
      this.priceCODFlash(priceProduct, weightInput, dimension, 335);
    }
    else if (dimension <= 180 && weightInput <= 25) {
      this.priceCODFlash(priceProduct, weightInput, dimension, 350);
    }
    else {
      var dimensionOverBath:any = 350 + (Math.ceil((dimension - 180)/5))*20;
      // console.log(dimensionOverBath)
      var weightOverBath:any = 350 + (Math.ceil((weightInput - 25)))*20;
      // console.log(weightOverBath)
      if(dimensionOverBath > weightOverBath){
        // DIMENSION OVER
        this.priceCODFlash(priceProduct, weightInput, dimension, dimensionOverBath);
      }
      else{
        // WEIGHT OVER
        this.priceCODFlash(priceProduct, weightInput, dimension, weightOverBath);
      }
    }
  }

  priceCODFlash(priceProduct, weightInput, dimension, priceDelivery) {
    if (this.salesType == 'auction') {
      // Auction NO Cal COD
      this.remoteAreaFlash(priceProduct, weightInput, dimension, priceDelivery, 0);
    }
    else {
      // Sale Cal COD
      // Scg COD 4% Of priceProduct
      if (priceProduct <= 10000) {
        var COD4PerOfPriceProduct = (priceProduct * 4) / 100
        // console.log(COD4PerOfPriceProduct);
        if (COD4PerOfPriceProduct < 30) {
          this.priceProductOverForCOD = false
          this.remoteAreaFlash(priceProduct, weightInput, dimension, priceDelivery, 30);
        }
        else {
          this.priceProductOverForCOD = false
          this.remoteAreaFlash(priceProduct, weightInput, dimension, priceDelivery, COD4PerOfPriceProduct);
        }
      }
      else {
        this.priceProductOverForCOD = true
        this.remoteAreaFlash(priceProduct, weightInput, dimension, priceDelivery, 0);
      }
    }
  }

  remoteAreaFlash(priceProduct, weightInput, dimension, priceDelivery, COD) {
    var pc = this.userSellerFB.shopAddress.postalCode;
    if (pc == '20120' || pc == '23000' || pc == '23170' || pc == '50270' || pc == '50310' || pc == '50350' || pc == '55130' || pc == '55160' || pc == '55220' || pc == '58110' || pc == '58120' || pc == '58130' || pc == '58140' || pc == '58150' || pc == '63150' || pc == '63170' || pc == '67130' || pc == '67160' || pc == '67170' || pc == '67260' || pc == '71180' || pc == '71240' || pc == '81150' || pc == '82150' || pc == '82160' || pc == '84280' || pc == '84360' || pc == '94110' || pc == '94000'|| pc == '94120' || pc == '94130' || pc == '94140' || pc == '94150' || pc == '94160' || pc == '94170' || pc == '94180' || pc == '94190' || pc == '94220' || pc == '94230' || pc == '95000' || pc == '95110' || pc == '95120' || pc == '95130' || pc == '95140' || pc == '95150' || pc == '96000' || pc == '96110' || pc == '96120' || pc == '96130' || pc == '96140' || pc == '96150' || pc == '96160' || pc == '96170' || pc == '96180' || pc == '96190' || pc == '96210' || pc == '96220') {
      priceDelivery = priceDelivery + 50;
      // console.log('remoteAreaKerry OK');
      this.remoteAreaStatusFlash = true;
      this.vat7PerFlash(priceProduct, weightInput, dimension, priceDelivery, COD);
    }
    else {
      this.remoteAreaStatusFlash = false;
      this.vat7PerFlash(priceProduct, weightInput, dimension, priceDelivery, COD);
    }
  }

  vat7PerFlash(priceProduct, weightInput, dimension, priceDelivery, COD) {
    // Vat 7%
    const st = String(priceDelivery + COD + ((priceDelivery + COD) * 7) / 100).split('.');
    if (st.length == 1) {
      // console.log('FINAL SCG > ', Number(st[0] + '.' + '00'));
      this.priceFlashDelivery = ({
        deliveryName: 'Flash Express',
        priceReal: priceDelivery - 5,
        priceABM: priceDelivery,
        COD: COD,
        price7PerDelivery: Number(st[0] + '.' + '00'),
        priceDeliveryInput: Number(st[0] + '.' + '00')
      });
    }
    else {
      // console.log('FINAL SCG > ', Number(st[0]) + 1);
      this.priceFlashDelivery = ({
        deliveryName: 'Flash Express',
        priceReal: priceDelivery - 5,
        priceABM: priceDelivery,
        COD: COD,
        price7PerDelivery: Number(st[0]) + 1,
        priceDeliveryInput: Number(st[0]) + 1
      });
    }
  }
  
  // -------------------------------------------------------------- END FLASH EXPRESS
  
  checkBoxDelivery(checkType) {
    if (checkType == 'Kerry') {
      if (this.checkBoxKerry == true) {
        this.checkBoxKerry = false;
      }
      else {
        this.checkBoxKerry = true;
      }
    }
    else if (checkType == 'ThaiPost') {
      if (this.checkBoxThaiPost == true) {
        this.checkBoxThaiPost = false;
      }
      else {
        this.checkBoxThaiPost = true;
      }
    }
    else if (checkType == 'scg') {
      if (this.checkBoxScg == true) {
        this.checkBoxScg = false;
      }
      else {
        this.checkBoxScg = true;
      }
    }
    else if (checkType == 'flash') {
      if (this.checkBoxFlash == true) {
        this.checkBoxFlash = false;
      }
      else {
        this.checkBoxFlash = true;
      }
    }
    else {
      if (this.checkBoxhandPickUp == true) {
        this.checkBoxhandPickUp = false;
        this.placeholCountry = 'ตัวเลือกประเทศ';
        this.placeholProvince = 'ตัวเลือกจังหวัด';
        this.handPickUpDescription = ''
      }
      else {
        this.checkBoxhandPickUp = true;
      }
    }
    // console.log('Kerry ', this.checkBoxKerry);
    // console.log('ThaiPost ', this.checkBoxThaiPost);
    // console.log('scg ', this.checkBoxScg);
  }

  thaiPostInput(dataInput) {
    this.priceThaiPostDelivery.priceDeliveryInput = Number(dataInput.target.value);
    // console.log('priceThaiPostDelivery -> ', this.priceThaiPostDelivery);
  }

  kerryInput(dataInput) {
    // console.log('dataInput -> ', dataInput.target.value);
    this.priceKerryDelivery.priceDeliveryInput = Number(dataInput.target.value);
    // console.log('priceKerryDelivery -> ', this.priceKerryDelivery);
  }

  scgInput(dataInput) {
    this.priceScgDelivery.priceDeliveryInput = Number(dataInput.target.value);
    // console.log('priceScgDelivery -> ', this.priceScgDelivery);
  }

  flashInput(dataInput) {
    this.priceFlashDelivery.priceDeliveryInput = Number(dataInput.target.value);
    // console.log('priceScgDelivery -> ', this.priceScgDelivery);
  }

  selectCountry(countryInput) {
    // console.log('countryInput -> ', countryInput);
    this.placeholCountry = countryInput;
    // console.log('placeholCountry -> ', this.placeholCountry);

  }

  selectProvince(provinceInput) {
    // console.log('provinceInput -> ', provinceInput);
    this.placeholProvince = provinceInput;
    // console.log('placeholProvince -> ', this.placeholProvince);
  }

  handPickUpInputDes(desInput) {
    // console.log('desInput -> ', desInput.target.value);
    this.handPickUpDescription = desInput.target.value;
    // console.log('handPickUpDescription -> ', this.handPickUpDescription);
  }

  productBrandInput(dataInput) {
    this.placeholderBrandList = dataInput.target.value;
    this.productBrandList = dataInput.target.value;
    // console.log('-> ', dataInput.target.value);

    // this.groupBrandList = this.maleClothesJSON.filter(object => {
    //   // return object['district'] == districtName;
    //   return object['bandName'].includes(dataInput.target.value)
    // });

    // this.groupBrandList = this.groupBrandList.filter(object => {
    //   // return object['district'] == districtName;
    //   return object['bandName'].includes(dataInput.target.value)
    // });

    if (this.tagEN == 'maleClothes') {
      // maleClothes
      this.groupBrandList = this.maleClothesJSON.filter(object => {
        return object['bandName'].toLowerCase().includes(dataInput.target.value.toLowerCase())
      });
    }
    else if (this.tagEN == 'maleShoes') {
      // maleShoes
      this.groupBrandList = this.maleShoesJSON.filter(object => {
        return object['bandName'].toLowerCase().includes(dataInput.target.value.toLowerCase())
      });
    }
    else if (this.tagEN == 'femaleClothes') {
      // femaleClothes
      this.groupBrandList = this.femaleClothesJSON.filter(object => {
        return object['bandName'].toLowerCase().includes(dataInput.target.value.toLowerCase())
      });
    }
    else if (this.tagEN == 'femaleShoes') {
      // femaleShoes
      this.groupBrandList = this.femaleShoesJSON.filter(object => {
        return object['bandName'].toLowerCase().includes(dataInput.target.value.toLowerCase())
      });
    }
    else if (this.tagEN == 'beauty') {
      // beauty
      this.groupBrandList = this.beautyJSON.filter(object => {
        return object['bandName'].toLowerCase().includes(dataInput.target.value.toLowerCase())
      });
    }
    else if (this.tagEN == 'bag') {
      // bag
      this.groupBrandList = this.bagJSON.filter(object => {
        return object['bandName'].toLowerCase().includes(dataInput.target.value.toLowerCase())
      });
    }
    else if (this.tagEN == 'accessories') {
      // accessories
      this.groupBrandList = this.accessoriesJSON.filter(object => {
        return object['bandName'].toLowerCase().includes(dataInput.target.value.toLowerCase())
      });
    }
    else if (this.tagEN == 'homeAppliances') {
      // homeAppliances
      this.groupBrandList = this.homeAppliancesJSON.filter(object => {
        return object['bandName'].toLowerCase().includes(dataInput.target.value.toLowerCase())
      });
    }
    else if (this.tagEN == 'mobilePhone') {
      // mobilePhone
      this.groupBrandList = this.mobilePhoneJSON.filter(object => {
        return object['bandName'].toLowerCase().includes(dataInput.target.value.toLowerCase())
      });
    }
    else if (this.tagEN == 'game') {
      // game
      this.groupBrandList = this.gameJSON.filter(object => {
        return object['bandName'].toLowerCase().includes(dataInput.target.value.toLowerCase())
      });
    }
    else if (this.tagEN == 'camera') {
      // camera
      this.groupBrandList = this.cameraJSON.filter(object => {
        return object['bandName'].toLowerCase().includes(dataInput.target.value.toLowerCase())
      });
    }
    else if (this.tagEN == 'sport') {
      // sport
      this.groupBrandList = this.sportJSON.filter(object => {
        return object['bandName'].toLowerCase().includes(dataInput.target.value.toLowerCase())
      });
    }
    else if (this.tagEN == 'computer') {
      // computer
      this.groupBrandList = this.computerJSON.filter(object => {
        return object['bandName'].toLowerCase().includes(dataInput.target.value.toLowerCase())
      });
    }
    else if (this.tagEN == 'food') {
      // food
      this.groupBrandList = this.foodJSON.filter(object => {
        return object['bandName'].toLowerCase().includes(dataInput.target.value.toLowerCase())
      });
    }
    else if (this.tagEN == 'electricalApp') {
      // electricalApp
      this.groupBrandList = this.electricalAppJSON.filter(object => {
        return object['bandName'].toLowerCase().includes(dataInput.target.value.toLowerCase())
      });
    }
    else if (this.tagEN == 'motorVehicle') {
      // motorVehicle
      this.groupBrandList = this.motorVehicleJSON.filter(object => {
        return object['bandName'].toLowerCase().includes(dataInput.target.value.toLowerCase())
      });
    }
    else if (this.tagEN == 'voucher') {
      // voucher
      this.groupBrandList = this.voucherJSON.filter(object => {
        return object['bandName'].toLowerCase().includes(dataInput.target.value.toLowerCase())
      });
    }
    else if (this.tagEN == 'fetish') {
      // fetish
      this.groupBrandList = [];
    }
    else if (this.tagEN == 'collectibles') {
      // collectibles
      this.groupBrandList = [];
    }
    else if (this.tagEN == 'other') {
      // other
      this.groupBrandList = [];
    }
  }

  selectBrandList(data) {
    // console.log('data > ', data);
    this.placeholderBrandList = data;
    this.productBrandList = data;
    this.groupBrandList = [];
  }

  addProductAuction(fromRTE, keyword) {
    // console.log('--------------------------------');
    // console.log('addProductAuction');
    // console.log('this.name > ', this.name);
    // console.log('this.tagEN > ', this.tagEN);
    // console.log('this.subTagTH > ', this.subTagTH);
    // console.log('this.type > ', this.type);
    // console.log('this.salesType > ', this.salesType);
    // console.log('this.productBrandList > ', this.productBrandList);
    // console.log('this.placeholderGroupProduct > ', this.placeholderGroupProduct);
    // console.log('fromRTE > ', fromRTE);
    // console.log('this.keySearch > ', this.keySearch);
    // console.log('this.optionArray > ', this.optionArray);
    // Price
    // console.log('this.priceStartInput > ', this.priceStartInput);
    // console.log('this.priceBidInput > ', this.priceBidInput);
    // console.log('this.priceAutoWinInput > ', this.priceAutoWinInput);
    // Date Time
    // console.log('this.dateSelectBid > ', this.dateSelectBid);
    // console.log('this.timeSelectBid > ', this.timeSelectBid);
    // Time Count
    // console.log('this.timeBidAutoCom > ', this.timeBidAutoCom);
    // Delivery
    // console.log('this.weightDelivery > ', this.weightDelivery);
    // console.log('this.wideDelivery > ', this.wideDelivery);
    // console.log('this.longDelivery > ', this.longDelivery);
    // console.log('this.highDelivery > ', this.highDelivery);
    // console.log('dimension > ', this.wideDelivery + this.longDelivery + this.highDelivery);
    // Price Delivery
    // COD
    // Date Over For Delivery
    // console.log('this.deliveryLonger > ', this.deliveryLonger);
    // console.log('this.dayDelivery > ', this.dayDelivery); //undefined
    // Donate
    // console.log('this.donateType > ', this.donateType);
    // console.log('this.selectDonateData > ', this.selectDonateData);
    // console.log('this.sliderDonate > ', this.sliderDonate);
    // console.log('--------------------------------');

    // // CREATE DATE TIME
    // var _dateStartBid:any = new Date(String(this.dateSelectBid.day) + ' ' + String(this.monthName(this.dateSelectBid.month)) + ' ' + String(this.dateSelectBid.year) + ' ' + String(this.timeSelectBid.hour) + ":" + String(this.timeSelectBid.minute));
    // // CREATE DATE END BID
    // var _dateEndBid:any = _dateStartBid.getTime() + ((Number(this.timeBidCH)*3600) + (Number(this.timeBidCM)*60) + Number(this.timeBidCS))*1000; // SEC*1000
    // console.log(_dateStartBid)
    // console.log(new Date(_dateEndBid))
  

    // CHECK KEYWORD
    // var _keywordLength:any = 0;
    keyword.split(",").forEach(doc => {
      if(doc != ""){
        this.keySearch.push(doc)
        // _keywordLength++
      }
    });
    // CHECK TIME BID COUNT < 00:00:30
    if (Number(this.timeBidCH) == 0 &&  Number(this.timeBidCM) == 0){
      if(Number(this.timeBidCS) < 30){
        this.timeBidCS = '30';
      }
      // console.log(this.timeBidCS)
    }
    if (this.name == '') {
      // console.log('this.name');
      this.textError = 'กรุณาเพิ่มชื่อสินค้า'
      this.dataProductOK = false;
    }
    else if (this.nameInputLength < 10) {
      // console.log('this.name');
      this.textError = 'กรุณาเพิ่มชื่อสินค้าที่มีความยาวมากกว่า 10 ตัวอักษร'
      this.dataProductOK = false;
    }
    else if (this.tagEN == '') {
      // console.log('this.tagEN');
      this.textError = 'กรุณาเพิ่มประเภทสินค้า';
      this.dataProductOK = false;
    }
    else if (this.type == 'secondHand' && this.placeholderSecondHandPer == 'รายละเอียดสินค้ามือสอง') {
      this.textError = 'กรุณาเพิ่มรายละเอียดสินค้ามือสอง';
      this.dataProductOK = false;
    }
    else if (this.subTagTH == '') {
      // console.log('this.subTagTH');
      this.textError = 'กรุณาเพิ่มประเภทสินค้าย่อย';
      this.dataProductOK = false;
    }
    else if (this.productBrandList == '') {
      // console.log('this.productBrandList');
      this.textError = 'กรุณาเพิ่มแบรนด์สินค้า';
      this.dataProductOK = false;
    }
    else if (fromRTE == '<p>กรุณาใส่รายละเอียดสินค้า</p>' || fromRTE == null) {
      // console.log('fromRTE');
      this.textError = 'กรุณาเพิ่มรายละเอียดสินค้า';
      this.dataProductOK = false;
    }
    else if(this.keySearch.length < 5){
      this.textError = 'กรุณาเพิ่ม Keyword สำหรับการค้นหาสินค้าขั้นต่ำ 5 คำ'
      this.dataProductOK = false;
    }
    else if(this.keySearch.length > 100){
      this.textError = 'กรุณาเพิ่ม Keyword สำหรับการค้นหาสินค้าสูงสุด 100 คำ'
      this.dataProductOK = false;
    }
    // else if (this.keySearch.length < 5) {
    //   // console.log('this.keySearch');
    //   this.textError = 'กรุณาเพิ่ม Keyword สำหรับการค้นหาสินค้า';
    //   this.dataProductOK = false;
    // }
    else if (this.optionArray.length < 1) {
      // console.log('this.optionArray');
      this.textError = 'กรุณาเพิ่มตัวเลือกสินค้า';
      this.dataProductOK = false;
    }
    else if (this.subOptionShow) {
      // console.log('this.optionArray');
      this.textError = 'กรุณาบันทึกตัวเลือกย่อย';
      this.dataProductOK = false;
    }
    else if (this.imgURL1 == './assets/img/productThumbnail.png' && this.imgURL2 == './assets/img/productThumbnail.png' && this.imgURL3 == './assets/img/productThumbnail.png' && this.imgURL4 == './assets/img/productThumbnail.png' && this.imgURL5 == './assets/img/productThumbnail.png') {
      // console.log('No IMG one');
      this.textError = 'กรุณาเพิ่มภาพสินค้าอย่างน้อย 1 ภาพ';
      this.dataProductOK = false;
    }
    // else if (this.salesTypeSelectAuction == true && this.priceStartInput == 0) {
    //   // console.log('this.priceStartInput');
    //   this.textError = 'กรุณาเพิ่มราคาเริ่มประมูล';
    //   this.dataProductOK = false;
    // }
    else if (this.salesTypeSelectAuction == true && this.priceBidInput == 0) {
      // console.log('this.priceBidInput');
      this.textError = 'กรุณาเพิ่มราคาบิด';
      this.dataProductOK = false;
    }
    // else if (this.salesTypeSelectAuction == true && this.priceAutoWinInput == 0) {
    //   console.log('this.priceAutoWinInput');
    //   this.textError = 'กรุณาเพิ่มราคา AutoWin';
    // }
    else if (this.salesTypeSelectAuction == false && this.priceProductInput == 0) {
      // console.log('this.priceProductInput == 0');
      this.textError = 'กรุณาเพิ่มราคาขาย';
      this.dataProductOK = false;
    }
    else if (this.timeBidAutoCom == 0) {
      // console.log('this.timeBidAutoCom');
      this.textError = 'กรุณาเพิ่มระยะเวลาประมูล';
      this.dataProductOK = false;
    }
    else if (this.timeBidAutoCom < 1) {
      // console.log('this.timeBidAutoCom');
      this.textError = 'กรุณาเพิ่มระยะเวลาประมูลให้อยู่ในช่วง 1-6,000 นาที';
      this.dataProductOK = false;
    }
    else if (this.weightDelivery == 0) {
      // console.log('this.weightDelivery');
      this.textError = 'กรุณาเพิ่มน้ำหนักพัสดุ (หน่วย kg)';
      this.dataProductOK = false;
    }
    else if (this.wideDelivery == 0) {
      // console.log('this.wideDelivery');
      this.textError = 'กรุณาเพิ่มขนาดพัสดุ (กว้าง cm)';
      this.dataProductOK = false;
    }
    else if (this.longDelivery == 0) {
      // console.log('this.longDelivery');
      this.textError = 'กรุณาเพิ่มขนาดพัสดุ (ยาว cm)';
      this.dataProductOK = false;
    }
    else if (this.highDelivery == 0) {
      // console.log('this.highDelivery');
      this.textError = 'กรุณาเพิ่มขนาดพัสดุ (สูง cm)';
      this.dataProductOK = false;
    }
    else if (this.checkBoxThaiPost == false && this.checkBoxKerry == false && this.checkBoxScg == false && this.checkBoxFlash == false && this.checkBoxhandPickUp == false) {
      // console.log('this.checkBoxDelivery');
      this.textError = 'กรุณาเลือกบริการขนส่งอย่างน้อย 1 บริการ';
      this.dataProductOK = false;
    }
    else if (this.checkBoxhandPickUp == true && (this.placeholCountry == 'ตัวเลือกประเทศ' || this.placeholProvince == 'ตัวเลือกจังหวัด' || this.handPickUpDescription == '')) {
      // console.log('this.checkBoxhandPickUp');
      this.textError = 'กรุณาเพิ่มรายละเอียดนัดรับสินค้า';
      this.dataProductOK = false;
    }
    else if (this.deliveryLonger == true && this.dayDelivery == 0) {
      this.textError = 'กรุณาเพิ่มจำนวนวันสำหรับการเตรียมส่งนานกว่าปกติ';
      this.dataProductOK = false;
    }
    else if (this.deliveryLonger == true && (this.dayDelivery < 5 || this.dayDelivery > 30)) {
      this.textError = 'กรุณาเพิ่มจำนวนวันสำหรับการเตรียมส่งนานกว่าปกติ ให้อยู่ในช่วงที่กำหนด';
      this.dataProductOK = false;
    }
    else if (this.donateType == true && this.selectDonateData == undefined) {
      // console.log('selectDonateData_undefined');
      this.textError = 'กรุณาเลือกมุลนิธิที่ต้องการบริจาค';
      this.dataProductOK = false;
    }
    else if (this.salesTypeSelectAuction == true && this.dateNow.day == this.dateSelectBid.day && this.dateNow.month == this.dateSelectBid.month && this.dateNow.year == this.dateSelectBid.year) {
      var dFB = firebase.firestore.Timestamp.now().toDate();
      var _month:any = this.dateSelectBid.month;
      var _day:any = this.dateSelectBid.day;
      var _hour:any = this.timeSelectBid.hour;
      var _minute:any =this.timeSelectBid.minute;
      if(_month < 10){
        _month = "0" + _month;
      }
      if(_day < 10){
        _day = "0" + _day;
      }
      if(_hour < 10){
        _hour = "0" + _hour;
      }
      if(_minute < 10){
        _minute = "0" + _minute;
      }
      var dSelect:any = moment(this.dateSelectBid.year + '-' + _month + '-' + _day + " " + _hour + ":" + _minute + ":" + "00", 'YYYY-MM-DD HH:mm:ss');
      if ((dSelect._d.getTime() - dFB.getTime()) < 1800000) {
        // Date Time Select Lower Server Time 30 Min
        this.textError = 'กรุณาตั้งวันและเวลาเริ่มประมูลมากกว่าเวลาปัจจุบัน 30 นาที';
        this.dataProductOK = false;
      }
      else {
        if (this.type == 'new') {
          this.placeholderSecondHandPer = null;
        }
        // this.keySearch = keyword.split(",");
        this.textError = 'ยืนยันการลงสินค้า ?';
        this.dataProductOK = true;
      }
    }
    else {
      if (this.type == 'new') {
        this.placeholderSecondHandPer = null;
      }
      // this.keySearch = keyword.split(",");
      this.textError = 'ยืนยันการลงสินค้า ?';
      this.dataProductOK = true;
    }
    // console.log(keyword.split(","))
  }

  addProductToFirebase() {
    // console.log(this.dataProductOK)
    var checkTime = false;
    if(this.salesType == 'auction'){
    // THIS PRODUCT SELECT SALE TYPE AUCTION => CHECK TIME START > 30 MIN ?
    // GET TIMESTAMP FROM FIREBASE
    var dFB = firebase.firestore.Timestamp.now().toDate();
    // CREATE DATETIME FROM DATE SELECT
    var _month:any = this.dateSelectBid.month;
    var _day:any = this.dateSelectBid.day;
    var _hour:any = this.timeSelectBid.hour;
    var _minute:any =this.timeSelectBid.minute;
    if(_month < 10){
      _month = "0" + _month;
    }
    if(_day < 10){
      _day = "0" + _day;
    }
    if(_hour < 10){
      _hour = "0" + _hour;
    }
    if(_minute < 10){
      _minute = "0" + _minute;
    }
    var dSelect:any = moment(this.dateSelectBid.year + '-' + _month + '-' + _day + " " + _hour + ":" + _minute + ":" + "00", 'YYYY-MM-DD HH:mm:ss');
      if((dSelect._d.getTime() - dFB.getTime()) > 1800000){
        // SET TIME START > 30 MIN => TRUE
        checkTime = true;
      }
      else{
        // SET TIME START < 30 MIN => FLASE
        checkTime = false;
      }
    }
    else{
      // THIS PRODUCT SELECT SALE TYPE => SET SELLING PRICE
      checkTime = true;
    }
    // CHECK PRODUCT 
    if (this.dataProductOK && checkTime) {
      // CHECK PRODUCT => TRUE & CHECK TIME BY SALE TYPE => TRUE
      this.showContent = false;
      this.showLoading = true;
      if (this.placeholderGroupProduct == 'ตัวเลือกกลุ่มสินค้าของร้าน' || this.placeholderGroupProduct == 'ยังไม่มีกลุ่มสินค้า') {
        this.placeholderGroupProduct = null;
      }
      var status = '';
      if (this.salesTypeSelectAuction == true) {
        status = 'waitAuction';
      }
      else {
        status = 'forSale';
      }

      var deliveryArray: any = []
      if (this.checkBoxThaiPost == true) {
        deliveryArray.push(
          this.priceThaiPostDelivery
        );
      }
      if (this.checkBoxKerry == true) {
        deliveryArray.push(
          this.priceKerryDelivery
        );
      }
      if (this.checkBoxScg == true) {
        deliveryArray.push(
          this.priceScgDelivery
        );
      }
      if (this.checkBoxFlash == true) {
        deliveryArray.push(
          this.priceFlashDelivery
        );
      }
      if (this.checkBoxhandPickUp == true) {
        deliveryArray.push({
          deliveryName: 'handPickUp',
          country: this.placeholCountry,
          province: this.placeholProvince,
          description: this.handPickUpDescription,
        });
      }
      // console.log('deliveryArray', deliveryArray);

      var priceFinal: any;
      if (this.salesTypeSelectAuction == true) {
        priceFinal = {
          priceStart: this.priceStartInput,
          priceBid: this.priceBidInput,
          priceAutoWin: this.priceAutoWinInput
        }
      }
      else {
        priceFinal = {
          priceProduct: this.priceProductInput
        }
      }

      // Check Img Producl Null
      if (this.imgURL1 != './assets/img/productThumbnail.png') {
        var blob = this.dataURItoBlob(this.imgURL1);
        // console.log(blob);
        var file = new File([blob], "imgProduct.png", {
          type: "image/png"
        });
        // console.log(file);
        this.imgProductArray.push(file);
      }
      // console.log(this.imgProductArray);

      if (this.imgURL2 != './assets/img/productThumbnail.png') {
        var blob = this.dataURItoBlob(this.imgURL2);
        var file = new File([blob], "imgProduct.png", {
          type: "image/png"
        });
        this.imgProductArray.push(file);
      }
      if (this.imgURL3 != './assets/img/productThumbnail.png') {
        var blob = this.dataURItoBlob(this.imgURL3);
        var file = new File([blob], "imgProduct.png", {
          type: "image/png"
        });
        this.imgProductArray.push(file);
      }
      if (this.imgURL4 != './assets/img/productThumbnail.png') {
        var blob = this.dataURItoBlob(this.imgURL4);
        var file = new File([blob], "imgProduct.png", {
          type: "image/png"
        });
        this.imgProductArray.push(file);
      }
      if (this.imgURL5 != './assets/img/productThumbnail.png') {
        var blob = this.dataURItoBlob(this.imgURL5);
        var file = new File([blob], "imgProduct.png", {
          type: "image/png"
        });
        this.imgProductArray.push(file);
      }

      // UPLOAD IMG 1
      const imgpath = `product/${new Date().getTime()}_${this.auth.currentUserId}_imgProduct1.png`;
      this.task = this.storage.upload(imgpath, this.imgProductArray[0])
      const imgRef = this.storage.ref(imgpath);
      this.task.snapshotChanges().pipe(
        finalize(() => {
          imgRef.getDownloadURL().subscribe(url => {
            const getFileUrl = url;
            this.imgProductArrayURL.push({
              imgpath: imgpath,
              imgUrl: getFileUrl
            });
            // UPLOAD IMG 2
            if (this.imgProductArray[1]) {
              const imgpath = `product/${new Date().getTime()}_${this.auth.currentUserId}_imgProduct2.png`;
              this.task = this.storage.upload(imgpath, this.imgProductArray[1])
              const imgRef = this.storage.ref(imgpath);
              this.task.snapshotChanges().pipe(
                finalize(() => {
                  imgRef.getDownloadURL().subscribe(url => {
                    const getFileUrl = url;
                    this.imgProductArrayURL.push({
                      imgpath: imgpath,
                      imgUrl: getFileUrl
                    });
                    // UPLOAD IMG 3
                    if (this.imgProductArray[2]) {
                      const imgpath = `product/${new Date().getTime()}_${this.auth.currentUserId}_imgProduct3.png`;
                      this.task = this.storage.upload(imgpath, this.imgProductArray[2])
                      const imgRef = this.storage.ref(imgpath);
                      this.task.snapshotChanges().pipe(
                        finalize(() => {
                          imgRef.getDownloadURL().subscribe(url => {
                            const getFileUrl = url;
                            this.imgProductArrayURL.push({
                              imgpath: imgpath,
                              imgUrl: getFileUrl
                            });
                            // UPLOAD IMG 4
                            if (this.imgProductArray[3]) {
                              const imgpath = `product/${new Date().getTime()}_${this.auth.currentUserId}_imgProduct4.png`;
                              this.task = this.storage.upload(imgpath, this.imgProductArray[3])
                              const imgRef = this.storage.ref(imgpath);
                              this.task.snapshotChanges().pipe(
                                finalize(() => {
                                  imgRef.getDownloadURL().subscribe(url => {
                                    const getFileUrl = url;
                                    this.imgProductArrayURL.push({
                                      imgpath: imgpath,
                                      imgUrl: getFileUrl
                                    });
                                    // UPLOAD IMG 5
                                    if (this.imgProductArray[4]) {
                                      const imgpath = `product/${new Date().getTime()}_${this.auth.currentUserId}_imgProduct5.png`;
                                      this.task = this.storage.upload(imgpath, this.imgProductArray[4])
                                      const imgRef = this.storage.ref(imgpath);
                                      this.task.snapshotChanges().pipe(
                                        finalize(() => {
                                          imgRef.getDownloadURL().subscribe(url => {
                                            const getFileUrl = url;
                                            this.imgProductArrayURL.push({
                                              imgpath: imgpath,
                                              imgUrl: getFileUrl
                                            });
                                            // CHECK ADD CALL FUNCTION
                                            if (this.imgProductArrayURL.length == this.imgProductArray.length) {
                                              this.add(status, priceFinal, deliveryArray)
                                            }
                                          });
                                        }))
                                        .subscribe();
                                      // UPLOAD IMG 3
                                    }
                                    else { this.add(status, priceFinal, deliveryArray) }
                                  });
                                }))
                                .subscribe();
                              // UPLOAD IMG 3
                            }
                            else { this.add(status, priceFinal, deliveryArray) }
                          });
                        }))
                        .subscribe();
                      // UPLOAD IMG 3
                    }
                    else { this.add(status, priceFinal, deliveryArray) }
                  });
                }))
                .subscribe();
              // UPLOAD IMG 3
            }
            else { this.add(status, priceFinal, deliveryArray) }

          });
        }))
        .subscribe();
    }
  }

  add(status, priceFinal, deliveryArray) {
    // CREATE DATE TIME
    var _dateStartBid:any = new Date(String(this.dateSelectBid.day) + ' ' + String(this.monthName(this.dateSelectBid.month)) + ' ' + String(this.dateSelectBid.year) + ' ' + String(this.timeSelectBid.hour) + ":" + String(this.timeSelectBid.minute));
    // CREATE DATE END BID
    var _dateEndBid:any = _dateStartBid.getTime() + ((Number(this.timeBidCH)*3600) + (Number(this.timeBidCM)*60) + Number(this.timeBidCS))*1000; // SEC*1000
    // console.log(_dateStartBid)
    // console.log(new Date(_dateEndBid))
    this.firestore.collection('shop').doc(this.auth.currentUserId).collection('product').add({
      // this.firestore.collection('shop').doc(`${this.auth.currentUserId}/product`).set({
      createAt: firebase.firestore.Timestamp.now(),
      sellerUID: this.auth.currentUserId,
      productStatus: status,
      name: this.name,
      tag: {
        tagEN: this.tagEN,
        tagTH: this.tagTH,
        subTagTH: this.subTagTH
      },
      type: this.type,
      type2HandPer: this.placeholderSecondHandPer,
      salesType: this.salesType,
      brandName: this.productBrandList,
      groupProduct: this.placeholderGroupProduct,
      productDescription: this.value,
      keySearch: this.keySearch,
      productOption: this.optionArray,
      imgProduct: this.imgProductArrayURL,
      priceData: priceFinal,
      dateTime: {
        minDate: this.minDate,
        maxDate: this.maxDate,
        dateStartBid: this.dateSelectBid,
        timeStartBid: this.timeSelectBid,
        // timeBidAutoComMin: this.timeBidAutoCom,
        timeBidCount: {
          hour: Number(this.timeBidCH),
          minute: Number(this.timeBidCM),
          second: Number(this.timeBidCS)
        },
        dateEndBid: new Date(_dateEndBid),
        dateTime: _dateStartBid
      },
      package: {
        weight: this.weightDelivery,
        wide: this.wideDelivery,
        long: this.longDelivery,
        high: this.highDelivery,
        dimension: this.wideDelivery + this.longDelivery + this.highDelivery,
      },
      priceDelivery: deliveryArray,
      dateOverForPickUp: {
        status: this.deliveryLonger,
        dateForPickUp: this.dayDelivery
      },
      donate: {
        status: this.donateType,
        Key: this.selectDonateData.key,
        shopName: this.selectDonateData.shopName,
        donatePer: this.sliderDonate
      },
      ratingStars: 0
    })
      .then(docRef => {
        // console.log("Document written with ID: ", docRef.id);
        this.router.navigate([`/product-detail/${docRef.id}`]);
      })
      .catch(error => {
        console.error("Error adding document: ", error)
      })
  }

  monthName(monthNumber) {
    //1 = January
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[monthNumber - 1];
  }

  // copyUID() {
  //   let selBox = document.createElement('textarea');
  //   selBox.style.position = 'fixed';
  //   selBox.style.left = '0';
  //   selBox.style.top = '0';
  //   selBox.style.opacity = '0';
  //   selBox.value = this.auth.currentUserId;
  //   document.body.appendChild(selBox);
  //   selBox.focus();
  //   selBox.select();
  //   document.execCommand('copy');
  //   document.body.removeChild(selBox);
  // }

}
