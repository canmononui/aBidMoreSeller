import { AfterViewInit, Component, OnInit } from '@angular/core';
// FIREBASE
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';
import firebase from 'firebase';
import { Router } from '@angular/router';
import addressTHJSON from '../../services/data/addressTH.json';
import { ActivatedRoute } from '@angular/router';
// CROP IMG
import { ImageCroppedEvent } from "ngx-image-cropper";

@Component({
  selector: 'app-update-user-seller',
  templateUrl: './update-user-seller.component.html',
  styleUrls: ['./update-user-seller.component.css']
})
export class UpdateUserSellerComponent implements OnInit, AfterViewInit {

  public showContent = false;
  public showLoading = false;
  // FOR CONTENT
  public showInfo = false;
  public showShopDetails = false;
  public showProfileImg = false;
  public showCoverImg = false;
  public showAddress = false;
  public showRefCode = false;
  public showDocument = false;
  public showCondition = false;
  // FORDROPDOWN
  public showIndividual = true;
  public showCorporation = false;
  public text_type_place_company = 'บุคคลธรรมดา'
  // FOR REGIS
  public email = '';
  public password = '';
  public confirmPassword = '';
  // FOR INFO
  public name = '';
  public lastName = '';
  public phoneNumber = '';
  // FOR SHOPDETAIL
  public shopNameInput_:Number = 0; 
  public shopName = '';
  public shopDescription = '';
  // FOR ADDRESS
  public dataAddress!: {
    name: string, 
    lastName: string, 
    phone: string, 
    number: string, 
    moo: string, 
    village: string, 
    lane: string, 
    road: string, 
    subDistrict: string, 
    district: string, 
    province: string, 
    postalCode: string
  }
  // FOR REFCODE
  public refCode: any;
  public refCodeCheck = false;
  // FOR DOCUMENT
  public idCardIndividual : any;
  public printidCard = '';
  public houseRegis : any;
  public printhouseRegis = '';
  public bookBank : any;
  public printbookBank = '';
  public vatRegis : any;
  public printvatRegis = '';
  public idCardCorporation : any = [];
  public dbdFile : any;
  public printdbdFile = '';
  public checkCondition = false;
  public captchaVerify = true;
  // UPLOAD FILE
  task: AngularFireUploadTask;
  // TEXT ERROR
  public errorText1 = '';
  public errorText2 = '';
  public _errorText2 = '';
  public errorText3 = '';
  public errorText4 = '';
  public errorText5 = '';
  public errorText6 = '';
  // FOR JSON ADDRESS FILE
  public addressTH = addressTHJSON;
  public addDisJSON:any = [];
  public addAmphoeJSON:any = [];
  public addProvinceJSON:any = [];
  public addZipcodeJSON:any = [];
  // GET DATA USERSELLER
  public userSeller: any;
  public id;
  // FOR OTP
  public recaptchaVerifier:any;
  public sendOtp = true;
  public applicationVerifier:any;
  public recaptchaResponse:any;
  public showOtp = false;
  public textLoad = false;
  public confirmationResult:any;
  public phoneNumberPlus = '';
  time: number = 60;
  display ;
  interval;
  // public chekForResend = true;
  // public recaptchaVerifierForResend:any;
  public submitOTPFail = false;
  public errorTextOtpFail = '';
  public reSendOTP = false;
  // FOR IMG UPLOAD
  public imageChangedEvent: any = "";
  public imageChangedEventCoverImg: any = "";
  croppedImage: any = "";
  croppedImageCoverImg: any = "";
  public imgURL: any = '';
  public imgURLCover: any = '';
  public oldProfileImg = '';
  public linkFile: any;
  public linkFileDocID: any;
  public bankCode
  public bankNameTH
  public placeholderBank = 'กรุณาเลือกธนาคาร'
  public bankNumber = '';
  public bankBranch = '';
  public accountName = '';
  public contract:any;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public db: AngularFireDatabase,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
  ) {

  }

  ngOnInit(): void {
    // SET DATE
    this.dataAddress = {
      name : '', 
      lastName : '', 
      phone : '', 
      number : '', 
      moo : '', 
      village : '', 
      lane : '', 
      road : '', 
      subDistrict : '', 
      district : '', 
      province : '', 
      postalCode : ''
    }
    this.refCode = '';
    // GET DATA
    // this.id = this.route.snapshot.paramMap.get("id");
    this.id = this.auth.currentUserId;
    if(this.id){
      // GET CONTRACT-MERCHANT
      this.firestore.collection('contract-merchant').doc('1lSOCP9kVibnvl0FUukK').get().toPromise()
      .then((val) => {
        this.contract = val.data();
      })
      // console.log(this.id)
      // GET SHOP PROFILE
      // console.log(this.id)
      this.firestore.collection('user-seller').doc(this.id).get().toPromise()
      .then((val) => {
        this.userSeller = val.data()
        // console.log(this.userSeller);
        // ----
        // CHECK DOC ID LINKFILE
        this.firestore.collection('user-seller').doc(this.id).collection('linkFile', ref => ref
        .limit(1))
        .get().toPromise()
        .then((querySnapshot: any) => {
          querySnapshot.forEach((doc: any) => {
            // console.log(doc.id, " => ", doc.data());
            this.linkFileDocID = doc.id; 
            this.linkFile = doc.data()
            if(this.userSeller.checkStatus){
              this.router.navigate(['/add-product'])
            }
            if(this.userSeller.emailVerifyAt == null){
              this.router.navigate(['/check-email-verify'])
            }
            if(this.userSeller.refCode != null){
              this.refCodeCheck = true;
              this.refCode = this.userSeller.refCode;
            }
            if(this.userSeller.name != null) {
              this.name = this.userSeller.name;
            }
            if(this.userSeller.lastName != null) {
              this.lastName = this.userSeller.lastName;
            }
            if(this.userSeller.phoneNumber != null){
              this.phoneNumber = this.userSeller.phoneNumber;
            }
            if(this.userSeller.shopName != null) {
              this.shopName = this.userSeller.shopName;
            }
            if(this.userSeller.shopDescription != null) {
              this.shopDescription = this.userSeller.shopDescription;
            }
            if(this.userSeller.profileImg.imgUrl == null) {
              this.userSeller.profileImg.imgUrl = '/assets/img/profile-settings/store-icon.png';
            }
            if(this.userSeller.coverImg.imgUrl == null){
              this.userSeller.coverImg.imgUrl = './assets/img/profile-settings/store-img-cover.png';
            }

            // if(this.userSeller.phoneNumberVerifyAt == null){
            //   if(this.userSeller.name != null) {
            //     this.name = this.userSeller.name;
            //   }
            //   if(this.userSeller.lastName != null) {
            //     this.lastName = this.userSeller.lastName;
            //   }
            //   if(this.userSeller.phoneNumber != null){
            //     this.phoneNumber = this.userSeller.phoneNumber;
            //   }
            //   // this.showContent = true;
            //   // this.showInfo = true;
            //   // this.showShopDetails = false;
            //   // this.showProfileImg = false;
            //   // this.showCoverImg = false;
            //   // this.showAddress = false;  
            //   // this.showRefCode = false; 
            //   // this.showDocument = false;
            // }
            // else if(this.userSeller.shopName == null || this.userSeller.shopDescription == null) {
            //   if(this.userSeller.shopName != null) {
            //     this.shopName = this.userSeller.shopName;
            //   }
            //   if(this.userSeller.shopDescription != null) {
            //     this.shopDescription = this.userSeller.shopDescription;
            //   }
            //   // this.showContent = true;
            //   // this.showInfo = false;
            //   // this.showShopDetails = true;
            //   // this.showProfileImg = false;
            //   // this.showCoverImg = false;
            //   // this.showAddress = false;   
            //   // this.showRefCode = false; 
            //   // this.showDocument = false;
            // }
            // else if(this.userSeller.profileImg.imgUrl == null) {
            //   this.userSeller.profileImg.imgUrl = '/assets/img/profile-settings/store-icon.png';
            //   // this.showContent = true;
            //   // this.showInfo = false;
            //   // this.showShopDetails = false;
            //   // this.showProfileImg = true;
            //   // this.showCoverImg = false;
            //   // this.showAddress = false;
            //   // this.showRefCode = false;
            //   // this.showDocument = false;
            // }
            // else if(this.userSeller.coverImg.imgUrl == null){
            //   this.userSeller.coverImg.imgUrl = './assets/img/profile-settings/store-img-cover.png';
            //   // this.showContent = true;
            //   // this.showInfo = false;
            //   // this.showShopDetails = false;
            //   // this.showProfileImg = false;
            //   // this.showCoverImg = true;
            //   // this.showAddress = false;
            //   // this.showRefCode = false;
            //   // this.showDocument = false;
            // }
            // else if(this.userSeller.shopAddress == null){
            //   // this.showContent = true;
            //   // this.showInfo = false;
            //   // this.showShopDetails = false;
            //   // this.showProfileImg = false;
            //   // this.showCoverImg = false;
            //   // this.showAddress = true;
            //   // this.showRefCode = false;
            //   // this.showDocument = false;
            // }
            // else if(this.userSeller.refCode == null){
            //   // this.showContent = true;
            //   // this.showInfo = false;
            //   // this.showShopDetails = false;
            //   // this.showProfileImg = false;
            //   // this.showCoverImg = false;
            //   // this.showAddress = false;
            //   // this.showRefCode = true;
            //   // this.refCodeCheck = false;
            //   // this.showDocument = false;
            // }
            // else if(this.linkFile.bookBank == null || this.linkFile.houseRegis_dbdFive == null || this.linkFile.idCard == null || this.linkFile.vatRegis == null){
            //   // this.showContent = true;
            //   // this.showInfo = false;
            //   // this.showShopDetails = false;
            //   // this.showProfileImg = false;
            //   // this.showCoverImg = false;
            //   // this.showAddress = false;
            //   // this.showRefCode = false;
            //   // this.showDocument = true;
            // }
            this.showContent = true;
            this.showInfo = true;
          });
        });
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    }
    else {
      this.router.navigate(['/login'])
    }
  }

  ngAfterViewInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'normal',
      'callback': (response) => {
        this.recaptchaResponse = response;
      },
      'expired-callback': () => {
        this.recaptchaResponse = undefined;
      }
    });
    this.recaptchaVerifier.render()
  }
  
  districtInput(districtInput) {
    districtInput = districtInput.target.value;
    // console.log(districtInput)
    // this.addDisJSON = [];
    this.addAmphoeJSON = [];
    this.addProvinceJSON = [];
    this.addZipcodeJSON = [];

    if(districtInput.length != ''){
      var add = this.filterDataDistrict(districtInput);
      // console.log(add)
      this.addDisJSON = add;
    }
    else {
      this.addDisJSON = []
    }
  }

  filterDataDistrict(districtName) {
    return this.addressTH.filter(object => {
      // return object['district'] == districtName;
      return object['district'].includes(districtName)
    });
  }

  amphoeInput(amphoeInput) {
    amphoeInput = amphoeInput.target.value;
    // console.log(amphoeInput)
    this.addDisJSON = [];
    // this.addAmphoeJSON = [];
    this.addProvinceJSON = [];
    this.addZipcodeJSON = [];

    if(amphoeInput.length != ''){
      var add = this.filterDataAmphoe(amphoeInput);
      // console.log(add)
      this.addAmphoeJSON = add;
    }
    else {
      this.addAmphoeJSON = []
    }
  }

  filterDataAmphoe(amphoeName) {
    return this.addressTH.filter(object => {
      return object['amphoe'].includes(amphoeName)
    });
  }

  provinceInput(provinceInput) {
    provinceInput = provinceInput.target.value;
    // console.log(provinceInput)
    this.addDisJSON = [];
    this.addAmphoeJSON = [];
    // this.addProvinceJSON = [];
    this.addZipcodeJSON = [];

    if(provinceInput.length != ''){
      var add = this.filterDataProvince(provinceInput);
      // console.log(add)
      this.addProvinceJSON = add;
    }
    else {
      this.addProvinceJSON = []
    }
  }

  filterDataProvince(provinceName) {
    return this.addressTH.filter(object => {
      return object['province'].includes(provinceName)
    });
  }

  zipcodeInput(zipcodeInput) {
    zipcodeInput = zipcodeInput.target.value;
    // console.log(zipcodeInput)
    this.addDisJSON = [];
    this.addAmphoeJSON = [];
    this.addProvinceJSON = [];
    // this.addZipcodeJSON = [];

    if(zipcodeInput.length != ''){
      var add = this.filterDataZipcode(zipcodeInput);
      // console.log(add)
      this.addZipcodeJSON = add;
    }
    else {
      this.addZipcodeJSON = []
    }
  }

  filterDataZipcode(zipcodeName) {
    return this.addressTH.filter(object => {
      return object['zipcode'] == Number(zipcodeName);
    });
  } 

  selectAddress(addressDataSelect){
    // console.log(addressDataSelect)
    this.addDisJSON = [];
    this.addAmphoeJSON = [];
    this.addProvinceJSON = [];
    this.addZipcodeJSON = [];
    this.dataAddress.subDistrict = addressDataSelect.district;
    this.dataAddress.district = addressDataSelect.amphoe;
    this.dataAddress.province = addressDataSelect.province;
    this.dataAddress.postalCode = addressDataSelect.zipcode;
  }

  // backWardToRegis() {
  //   this.showRegis = true;
  //   this.showInfo = false;
  //   // console.log(this.email, this.password, this.confirmPassword)
  //   this.errorText2 = '';
  // }

  backWardToInfo() {
    if(this.userSeller.name != null) {
      this.name = this.userSeller.name;
    }
    if(this.userSeller.lastName != null) {
      this.lastName = this.userSeller.lastName;
    }
    if(this.userSeller.phoneNumber != null) {
      this.phoneNumber = this.userSeller.phoneNumber;
    }
    this.showInfo = true;
    this.showShopDetails = false;
    this.errorText3 = '';
  }

  backWardToShopDetails() {
    if(this.userSeller.shopName != null) {
      this.shopName = this.userSeller.shopName;
    }
    if(this.userSeller.shopDescription != null) {
      this.shopDescription = this.userSeller.shopDescription;
    }
    this.showShopDetails = true;
    this.showProfileImg = false
    this.errorText4 = '';
  }

  backWardToProfileImg(){
    this.showProfileImg = true;
    this.showCoverImg = false
  }

  backWardToCoverImg(){
    this.showCoverImg = true;
    this.showAddress = false;
  }

  backWardToAddress() {
    this.showAddress = true;
    this.showRefCode = false;
    this.errorText5 = '';
  }
  
  backWardToRefcode() {
    if(this.userSeller.refCode != null){
      this.refCodeCheck = true;
      this.refCode = this.userSeller.refCode;
    }
    this.showRefCode = true;
    this.showDocument = false;
    this.errorText6 = '';
  }
  
  backWardToDocument() {
    this.showDocument = true;
    this.showCondition = false;
  }

  // owner
  goToShopDetails(name, lastName, phoneNumber) {
    // Mock Data
    // name = '';                      //<<<<<<<<<<<<<<<<
    // lastName = '';                  //<<<<<<<<<<<<<<<< 
    // phoneNumber = '';           //<<<<<<<<<<<<<<<<

    this.phoneNumberPlus = '+66' + phoneNumber.split(/0(.+)/)[1]
    this.errorText2 = ''; 
    if(this.recaptchaResponse == undefined){
      this.errorText2 = 'กรุณายืนยันฉันไม่ใช่โปรแกรมอัตโนมัติ';
    }
    else if(phoneNumber.length < 10 || phoneNumber.split(" ").length > 1){
      this.errorText2 = 'หมายเลขโทรศัพท์ไม่ถูกต้อง';
    }
    else if (name != '' && lastName != '' && phoneNumber != ''){
      this.showOtp = false;
      this.textLoad = true;
      this.auth.linkWithPhoneNumber(this.phoneNumberPlus, this.recaptchaVerifier)
      .then((result) => {
        // console.log(result)
        this.textLoad = false;
        this.showOtp = true;
        this.time = 60;
        this.startTimer();
        this.confirmationResult = result;
        this.name = name;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
      })
      .catch((error) => {
        console.log(error)
        if(error){
          this.textLoad = false
          this.showOtp = false
          this.recaptchaResponse == undefined;
          if(error.code == "auth/captcha-check-failed"){
            this.errorText2 = 'การยืนยันฉันไม่ใช่โปรแกรมอัตโนมัติเกิดข้อผิดพลาดโปรติดต่อศูนย์ช่วยเหลือ';
          }
          else if(error.code == "auth/user-disabled"){
            this.errorText2 = 'หมายเลขโทรศัพท์นี้ถูกระงับบนระบบของเรา';
          }
          else if(error.code == "auth/invalid-phone-number"){
            this.errorText2 = 'หมายเลขโทรศัพท์ไม่ถูกต้องโปรดลองอีกครั้ง';
          }
          else if(error.code == "auth/provider-already-linked"){
            this.errorText2 = 'บัญชีนี้ได้ยืนยันหมายเลขโทรศัพท์แล้ว';
          }
          else if(error.code == "auth/too-many-requests"){
            this.errorText2 = 'อุปกรณ์นี้ถูกระงับการขอรหัส OTP เนื่องจากมีกิจกรรมที่ผิดปกติโปรดลองอีกครั้งในภายหลัง';
          }
          else if(error.code == "auth/unverified-email"){
            this.errorText2 = 'อีเมลของบัญชียังไม่ได้รับการยืนยันทางอีเมล';
          }
          else if(error.code == "auth/missing-phone-number"){
            this.errorText2 = 'ไม่พบหมายเลขโทรศัพท์นี้โปรดลองด้วยหมายเลขโทรศัพท์อื่น';
          }
        }
      });
    }
    else {
      this.errorText2 = 'กรุณาเพิ่มข้อมูลให้ถูกต้องครบถ้วน';
    }
  }

  goToShopDetails_(name, lastName){
    if (name != '' && lastName != ''){
      this.name = name;
      this.lastName = lastName;
      this._errorText2 = '';
      this.showInfo = false;
      this.showShopDetails = true;
    }
    else{
      this._errorText2 = 'กรุณาเพิ่มข้อมูลให้ถูกต้องครบถ้วน';
    }
  }

  closeModalPopupPpdateInfoFail(){
    this._errorText2 = '';
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.time--;
      } else {
        this.time--;
      }
      var t = this.transform(this.time)
      if(t == '0'){
        this.pauseTimer();
        this.display = '';
      }
      else {
        this.display = 'ใน ' + this.transform(this.time) + ' วินาที';
      }
    }, 1000);
  }

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return String(value - minutes * 60)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  inputFocus(fromtxt, totxt){
    var length = fromtxt.length;
    var maxlength = fromtxt.getAttribute(maxlength);
    if(length == maxlength){
      totxt.focus();
    }
  }

  changePhoneNumber(){
    this.phoneNumberPlus = '';
    this.errorText2 = '';
    this.recaptchaResponse == undefined;
    // this.chekForResend = true;
  }

  reSendOTPClick(){
    this.textLoad = false;
    this.showOtp = false;
    this.submitOTPFail = false;
    this.errorText2 = '';
    this.errorTextOtpFail = '';
    this.reSendOTP = true;
    this.recaptchaResponse = undefined;
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container-resend', {
      'size': 'normal',
      'callback': (response) => {
        this.recaptchaResponse = response;
      },
      'expired-callback': () => {
        this.recaptchaResponse = undefined;
      }
    });
    this.recaptchaVerifier.render()
  }

  submitResendOTP(){
    if(this.recaptchaResponse != undefined){
      this.textLoad = false;
      this.showOtp = false;
      this.submitOTPFail = false;
      this.errorText2 = '';
      this.errorTextOtpFail = '';
      this.reSendOTP = false;
      this.requestOtpCodeAgain();
    } 
  }

  closeResendOTP(){
    this.textLoad = false;
    this.showOtp = true;
    this.submitOTPFail = false;
    this.errorText2 = '';
    this.errorTextOtpFail = '';
    this.reSendOTP = false;
  }

  requestOtpCodeAgain(){
    this.reSendOTP = false
    // console.log(this.recaptchaVerifier)
    this.textLoad = true
    this.auth.linkWithPhoneNumber(this.phoneNumberPlus, this.recaptchaVerifier)
    .then((result) => {
      // console.log(result)
      this.confirmationResult = result;
      this.textLoad = false
      this.showOtp = true
    })
    .catch((error) => {
      console.log(error)
      if(error){
        this.textLoad = false
        this.showOtp = false
        this.submitOTPFail = true;
        this.recaptchaResponse == undefined;
        if(error.code == "auth/captcha-check-failed"){
          this.errorText2 = 'การยืนยันฉันไม่ใช่โปรแกรมอัตโนมัติเกิดข้อผิดพลาดโปรติดต่อศูนย์ช่วยเหลือ';
        }
        else if(error.code == "auth/user-disabled"){
          this.errorText2 = 'หมายเลขโทรศัพท์นี้ถูกระงับบนระบบของเรา';
        }
        else if(error.code == "auth/invalid-phone-number"){
          this.errorText2 = 'หมายเลขโทรศัพท์ไม่ถูกต้องโปรดลองอีกครั้ง';
        }
        else if(error.code == "auth/provider-already-linked"){
          this.errorText2 = 'บัญชีนี้ได้ยืนยันหมายเลขโทรศัพท์แล้ว';
        }
        else if(error.code == "auth/too-many-requests"){
          this.errorText2 = 'อุปกรณ์นี้ถูกระงับการขอรหัส OTP เนื่องจากมีกิจกรรมที่ผิดปกติโปรดลองอีกครั้งในภายหลัง';
        }
        else if(error.code == "auth/unverified-email"){
          this.errorText2 = 'อีเมลของบัญชียังไม่ได้รับการยืนยันทางอีเมล';
        }
        else if(error.code == "auth/missing-phone-number"){
          this.errorText2 = 'ไม่พบหมายเลขโทรศัพท์นี้โปรดลองด้วยหมายเลขโทรศัพท์อื่น';
        }
      }
    });
  }

  checkOtp(digit1, digit2, digit3, digit4, digit5, digit6){
    var OTPCodeInput = String(digit1 + digit2 + digit3 + digit4 + digit5 + digit6);
    this.auth.verifyOTP(this.confirmationResult, OTPCodeInput)
    .then((result) => {
      // console.log(result)
      // OTP VERIFIED
      this.textLoad = false;
      this.showOtp = false;
      this.submitOTPFail = false;
      // Clear Error 
      this.errorText2 = 'ยืนยันหมายเลขโทรศัพท์สำเร็จ';
      this.errorTextOtpFail = '';
    })
    .catch((error) => {
      console.log(error)
      if(error){
        this.textLoad = false
        this.showOtp = false
        this.submitOTPFail = true;
        this.recaptchaResponse == undefined;
        if(error.code == "auth/invalid-verification-code"){
          this.errorTextOtpFail = 'รหัส OTP ของคุณไม่ถูกต้องโปรดเพิ่มรหัส OTP อีกครั้ง';
        }
        if(error.code == "auth/missing-verification-code"){
          this.errorTextOtpFail = 'ไม่พบรหัส OTP นี้โปรดลองอีกครั้ง';
        }
        
      }
    });
  }

  otpFail(){
    this.submitOTPFail = false;
    this.showOtp = true;
  }

  next(){
    if(this.errorText2 == 'ยืนยันหมายเลขโทรศัพท์สำเร็จ'){
    // UPDATE DOC PRODUCT IN COL 'user-seller'
    this.firestore.collection('user-seller').doc(this.id).update({
      name: this.name,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      phoneNumberVerifyAt: firebase.firestore.Timestamp.now(),
      shopStatus: 'waitingUpdateUserData'
    })
    .then(docRef => {
      this.firestore.collection('shop').doc(this.id).update({
        emailVerifyAt: firebase.firestore.Timestamp.now(),
        shopStatus: 'waitingUpdateUserData',
      })
      .then(() => {
        if(this.userSeller.shopName != null) {
          this.shopName = this.userSeller.shopName;
        }
        if(this.userSeller.shopDescription != null) {
          this.shopDescription = this.userSeller.shopDescription;
        }
        this.showInfo = false;
        this.showShopDetails = true;
      })
    })
    .catch(error => {
      console.error("Error adding document: ", error)
    })
    }
  }

  shopNameInput(input) {
    this.shopNameInput_ = Number(input.target.value.length)
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
  setProductImg() {
    // console.log(this.croppedImage);
    if (this.croppedImage != "") {
      this.imgURL = this.croppedImage;
      this.userSeller.profileImg.imgUrl = this.croppedImage;
    }
  }

  // Input Img File
  fileChangeEventCoverImg(event: any): void {
    // console.log(event);
    this.imageChangedEventCoverImg = event;
  }

  // Crop
  imageCroppedCoverImg(event: ImageCroppedEvent) {
    // console.log(event);
    this.croppedImageCoverImg = event.base64;
  }

  // Button OK
  setProductImgCoverImg() {
    // console.log(this.croppedImage);
    if (this.croppedImageCoverImg != "") {
      this.imgURLCover = this.croppedImageCoverImg;
      this.userSeller.coverImg.imgUrl = this.croppedImageCoverImg;
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

  goToProfileImg(shopName, shopDescription) {
    // Mock Data
    // shopName = 'Shop Name';
    // shopDescription = 'Shop Des';

    if(shopName!='' && shopDescription!=''){
      // Check dbShopName == InputShopName
      this.firestore.collection('shop', ref => ref.where('shopName', '==', shopName)).get()
      .subscribe(val => {
        // console.log(val.size);
        if(val.size != 0){
          this.errorText3 = 'ข้อผิดพลาดชื่อร้านค้านี้ถูกใช้งานบนระบบแล้ว';
        }
        else {
            // Set Data
            if(this.userSeller.profileImg.imgUrl == null) {
              this.userSeller.profileImg.imgUrl = '/assets/img/profile-settings/store-icon.png';
            }
            this.shopName = shopName;
            this.shopDescription = shopDescription;
            // Change Content
            this.showShopDetails = false;
            // this.showAddress = true;
            this.showProfileImg = true;
            // Clear Error 
            this.errorText3 = '';
        }
      });
    }
    else {
      this.errorText3 = 'กรุณาเพิ่มข้อมูลให้ถูกต้องครบถ้วน';
    }
  }

  goToCoverImg() {
    if(this.userSeller.coverImg.imgUrl == null){
      this.userSeller.coverImg.imgUrl = './assets/img/profile-settings/store-img-cover.png';
    }
    this.showProfileImg = false;
    this.showCoverImg = true;

  }

  // Shop Des
  goToShopAddress() {
    if(this.userSeller.shopAddress != null){
      this.dataAddress = this.userSeller.shopAddress
    }
    this.showCoverImg = false;
    this.showAddress = true;
  }

  // Address
  goToRefCode(addName, addLastName, addPhone, addNumber, addMoo, addVillage, addLane, addRoad, addSubDistrict, addDistrict, addProvince, addPostalCode) {
    // Mock Data
    // addName = 'addTest';
    // addLastName = 'addTest';
    // addPhone = '0649355415';
    // addNumber = 'addTest';
    // addMoo = 'addTest';
    // addVillage = 'addTest';
    // addLane = 'addTest';
    // addRoad = 'addTest';
    // addSubDistrict = 'addTest';
    // addDistrict = 'addTest';
    // addProvince = 'addTest';
    // addPostalCode = 'addTest';

    if(addName == ''){
      this. errorText4 = 'กรุณาเพิ่มชื่อ';
    }
    else if(addLastName == ''){
      this. errorText4 = 'กรุณาเพิ่มนามสกุล';
    }
    else if(addPhone.length < 10 || addPhone.split(" ").length > 1){
      this. errorText4 = 'หมายเลขโทรศัพท์ไม่ถูกต้อง (กรอกข้อมูลโดยไม่เว้นวรรค)';
    }
    else if(addNumber == ''){
      this. errorText4 = 'กรุณาเพิ่มบ้านเลขที่';
    }
    else if(addSubDistrict == ''){
      this. errorText4 = 'กรุณาเพิ่มตำบล / แขวง';
    }
    else if(addDistrict == ''){
      this. errorText4 = 'กรุณาเพิ่มอำเภอ / เขต';
    }
    else if(addProvince == ''){
      this. errorText4 = 'กรุณาเพิ่มจังหวัด';
    }
    else if(addPostalCode == ''){
      this. errorText4 = 'กรุณาเพิ่มรหัสไปรษณีย์';
    }
    else {
      // Set Data
      this.dataAddress = {
        name: addName, 
        lastName: addLastName, 
        phone: addPhone, 
        number: addNumber, 
        moo: addMoo, 
        village: addVillage, 
        lane: addLane, 
        road: addRoad, 
        subDistrict: addSubDistrict, 
        district: addDistrict, 
        province: addProvince, 
        postalCode: addPostalCode
      }
      // Change Content
      if(this.userSeller.refCode != null){
        this.refCodeCheck = true;
        this.refCode = this.userSeller.refCode;
      }
      this.showAddress = false;
      this.showRefCode = true;
      // Clear Error 
      this.errorText4 = '';
    }
  }

  // refCode
  goToDocument(refCode) {
    // refCode = '4C6Aauw5N8miAanBxAVW';
    if(this.refCodeCheck){
      this.refCode = this.userSeller.refCode;
      this.showRefCode = false;
      this.showDocument = true;
    }
    else if(refCode!=''){
      this.errorText5 = '';
      // SET REFCODE TO UPPER CASE
      var _refCodeUpper:any =  refCode.toUpperCase()
      // CHECK REFCODE IN DB
      this.firestore.collection('user-seller', ref => ref
      .where('yourRefCode', '==', _refCodeUpper))
      .get().toPromise()
      .then((doc) => {
        if(doc.empty){
          this.refCode = null;
          this.errorText5 = 'ข้อผิดพลาดรหัสแนะนำไม่ถูกต้อง';
        }
        else{
        // IF HAVE REF CODE
        this.refCode = _refCodeUpper;
        // CHANGE CONTENT
        this.showRefCode = false;
        this.showDocument = true;
        // CLEAR ERROR
        this.errorText5 = '';
        }
      })
    }
    else {
      // Change Content
      this.refCode = null;
      this.showRefCode = false;
      this.showDocument = true;
      this.errorText5 = '';
    }
  }

  selectBank(bankCode, bankNameTH, placeholderBank){
    this.bankCode = bankCode;
    this.bankNameTH = bankNameTH
    this.placeholderBank = placeholderBank;
  }

  // Document 
  goToCondition(bankNumber, bankBranch, accountName) {
    if(this.placeholderBank == 'กรุณาเลือกธนาคาร'){
      this.errorText6 = 'กรุณาเลือกธนาคาร'
    }
    else if(bankNumber == ''){
      this.errorText6 = 'กรุณาเพิ่มเลขที่บัญชี'
    }
    else if(bankBranch == ''){
      this.errorText6 = 'กรุณาเพิ่มเลขที่สาขา'
    }
    else if(accountName == ''){
      this.errorText6 = 'กรุณาเพิ่มชื่อบัญชี'
    }
    else {
      if(this.text_type_place_company == 'บุคคลธรรมดา'){
        this.errorText6 = '';
        if(this.idCardIndividual != null && this.houseRegis != null && this.bookBank != null){
          this.bankNumber = bankNumber;
          this.bankBranch = bankBranch;
          this.accountName = accountName;
          this.showDocument = false;
          this.showCondition = true;
          this.errorText6 = '';
        }
        else {
          this.errorText6 = 'กรุณาเพิ่มข้อมูลให้ถูกต้องครบถ้วน';
        }
      }
      else{
        if(this.idCardCorporation != null && this.dbdFile != null && this.bookBank != null){
          this.showDocument = false;
          this.showCondition = true;
          this.errorText6 = '';
        }
        else {
          this.errorText6 = 'กรุณาเพิ่มข้อมูลให้ถูกต้องครบถ้วน';
        }
      }
    }
  }

  // Document
  // dropdown select
  selectIndividual() {
    if(this.text_type_place_company != 'บุคคลธรรมดา'){
      this.showIndividual = true;
      this.showCorporation = false;
      this.text_type_place_company = 'บุคคลธรรมดา'
      // Clear Data Group idCard
      this.idCardCorporation = [];
    }
    this.errorText6 = '';
  }

  // Document
  // dropdown select
  selectCorporation() {
    if(this.text_type_place_company != 'นิติบุคคล/บริษัท'){
      this.showIndividual = false;
      this.showCorporation = true;
      this.text_type_place_company = 'นิติบุคคล/บริษัท'
      // Clear Data 1 idCard
      this.idCardIndividual = null;
      this.printidCard = '';
    }
    this.errorText6 = '';
  }

  // idCard For Individual
  uploadidCardIndividual(event) {
    // The File object
    // console.log(event.target.files)
    event = event.target.files;
      const validImageTypes = ['image/jpeg', 'image/png'];
      const  fileType = event.item(0)['type'];
      if (!validImageTypes.includes(fileType)) {
        return;
      }
      else{
        this.idCardIndividual = event.item(0)
        this.printidCard = this.idCardIndividual.name;
      }
  }

  // idCard For Corporation
  uploadidCardCorporation(event) {
    event = event.target.files;
    const validImageTypes = ['image/jpeg', 'image/png'];
    const  fileType = event.item(0)['type'];
    if (!validImageTypes.includes(fileType)) {
      return;
    }
    else{
      this.idCardCorporation.push({
        itemFile : event.item(0),
        FileName : event.item(0).name
      });
      // console.log(this.idCardCorporation);
    }
  }
  
  removeidCardCorporation(data) {
    this.idCardCorporation.splice( this.idCardCorporation.indexOf(data), 1 );
  }
  
  uploadhouseRegis(event) {
    event = event.target.files;
      const validImageTypes = ['image/jpeg', 'image/png'];
      const  fileType = event.item(0)['type'];
      if (!validImageTypes.includes(fileType)) {
        return;
      }
      else{
        this.houseRegis = event.item(0)
        this.printhouseRegis = this.houseRegis.name;
      }
  }
  
  uploadDBDFile(event){
    event = event.target.files;
    // console.log(event)
    const validImageTypes = ['application/pdf'];
    const  fileType = event.item(0)['type'];
    if (!validImageTypes.includes(fileType)) {
      return;
    }
    else{
      this.dbdFile = event.item(0)
      this.printdbdFile = this.dbdFile.name;
    }
  }

  uploadbookBank(event) {
    event = event.target.files;
      const validImageTypes = ['image/jpeg', 'image/png'];
      const  fileType = event.item(0)['type'];
      if (!validImageTypes.includes(fileType)) {
        return;
      }
      else{
        this.bookBank = event.item(0)
        this.printbookBank = this.bookBank.name;
      }
  }

  uploadvatRegis(event) {
    event = event.target.files;
      const validImageTypes = ['image/jpeg', 'image/png'];
      const  fileType = event.item(0)['type'];
      if (!validImageTypes.includes(fileType)) {
        return;
      }
      else{
        this.vatRegis = event.item(0)
        this.printvatRegis = this.vatRegis.name;
      }
  }

  checkCon() {
    this.checkCondition = true;
  }

  // Captcha
  resolved(captchaResponse: string) {
    if(captchaResponse){
      this.captchaVerify = false;
    }
    // console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  goToRegis() {
    this.showContent = false;
    this.showLoading = true;
    // Check Type
    if(this.text_type_place_company == 'บุคคลธรรมดา'){
      // 1 Upload File To Firebase Storage "idCardIndividual"
      const idCardIndividualpath = `idCardIndividual/${new Date().getTime()}_${this.id}_${this.idCardIndividual.name}`;
      // console.log(idCardIndividualpath);
      // The main task
      this.task = this.storage.upload(idCardIndividualpath, this.idCardIndividual)
      // Progress monitoring
      const idCardIndividualfileRef = this.storage.ref(idCardIndividualpath);
      this.task.snapshotChanges().pipe(
        finalize(() => {
          idCardIndividualfileRef.getDownloadURL().subscribe(url => {
          // SET DATA
          const getidCardIndividualUrl = url;
          // console.log(getidCardIndividualUrl)
          // 2 Upload File To Firebase Storage "houseRegis"
          const houseRegispath = `houseRegis/${new Date().getTime()}_${this.id}_${this.houseRegis.name}`;
          // console.log(houseRegispath);
          // The main task
          this.task = this.storage.upload(houseRegispath, this.houseRegis)
          // Progress monitoring
          const houseRegisfileRef = this.storage.ref(houseRegispath);
          this.task.snapshotChanges().pipe(
            finalize(() => {
              houseRegisfileRef.getDownloadURL().subscribe(url => { 
              // SET DATA
              const gethouseRegisUrl = url;
              // console.log(gethouseRegisUrl)
              // ACTION
              // 3 Upload File To Firebase Storage "bookBank"
              const bookBankpath = `bookBank/${new Date().getTime()}_${this.id}_${this.bookBank.name}`;
              // console.log(bookBankpath);
              // The main task
              this.task = this.storage.upload(bookBankpath, this.bookBank)
              // Progress monitoring
              const bookBankfileRef = this.storage.ref(bookBankpath);
              this.task.snapshotChanges().pipe(
                finalize(() => {
                  bookBankfileRef.getDownloadURL().subscribe(url => { 
                  // SET DATA
                  const getbookBankUrl = url;
                  // console.log(getbookBankUrl)
                  // ACTION
                  // 4 Upload File To Firebase Storage "vatRegis"
                  if(this.vatRegis != null) {
                    const vatRegispath = `vatRegis/${new Date().getTime()}_${this.id}_${this.vatRegis.name}`;
                    // console.log(vatRegispath);
                    // The main task
                    this.task = this.storage.upload(vatRegispath, this.vatRegis)
                    // Progress monitoring
                    const vatRegisfileRef = this.storage.ref(vatRegispath);
                    this.task.snapshotChanges().pipe(
                      finalize(() => {
                        vatRegisfileRef.getDownloadURL().subscribe(url => { 
                        // SET DATA
                        const getvatRegisUrl = url;
                        // console.log(getvatRegisUrl)
                        // ACTION
                        // console.log('_Up Load All Finish >> Individual');
                        // Call Function Firebase Email SignUp
                        this.upLoadProfileImg(getidCardIndividualUrl, gethouseRegisUrl, getbookBankUrl, getvatRegisUrl);
                      // End Process
                      });
                    }))
                    .subscribe();
                  // End Process
                  }
                  else {
                    this.upLoadProfileImg(getidCardIndividualUrl, gethouseRegisUrl, getbookBankUrl, null);
                  }
                });
              }))
              .subscribe();
            // End Process
            });
          }))
          .subscribe();
        // End Process
        });
        // End Process
      }))
      .subscribe();
    } //End if
    else{
      var getidCardCorporationUrl : any = [];
      var Test : any;
      // console.log('length > ', this.idCardCorporation.length);
      // console.log('length-1 > ', this.idCardCorporation.length-1);
      for(var i=0; i<this.idCardCorporation.length; i++){
        // 1 Upload File To Firebase Storage LOOP For "idCardCorporation"
        const idCardCorporationpath = `idCardCorporation/${new Date().getTime()}_${this.id}_${this.idCardCorporation[i].itemFile.name}`;
        // console.log(idCardCorporationpath);
        // The main task
        this.task = this.storage.upload(idCardCorporationpath, this.idCardCorporation[i].itemFile)
        // Progress monitoring
        const idCardCorporationfileRef = this.storage.ref(idCardCorporationpath);
        this.task.snapshotChanges().pipe(
          finalize(() => {
            idCardCorporationfileRef.getDownloadURL().subscribe(url => { 
            // SET DATA
            const getFileUrl = url;
            // console.log(getFileUrl)
            // ACTION
            getidCardCorporationUrl.push({
              idCardCorporation_urlFile : getFileUrl
            });
            // Check LOOP Up Load All "idCardCorporation"
            if(i == getidCardCorporationUrl.length){
              // console.log(getidCardCorporationUrl)
              // console.log('_Up Load All idCard Finish');
              // Next Step
              // 2 Upload File To Firebase Storage "dbdFile"
              const dbdFilepath = `dbdFile/${new Date().getTime()}_${this.id}_${this.dbdFile.name}`;
              // console.log(dbdFilepath);
              // The main task
              this.task = this.storage.upload(dbdFilepath, this.dbdFile)
              // Progress monitoring
              const dbdFilefileRef = this.storage.ref(dbdFilepath);
              this.task.snapshotChanges().pipe(
                finalize(() => {
                  dbdFilefileRef.getDownloadURL().subscribe(url => { 
                  // SET DATA
                  const getdbdFileUrl = url;
                  // console.log(getdbdFileUrl)
                  // ACTION
                  // 3 Upload File To Firebase Storage "bookBank"
                  const bookBankpath = `bookBank/${new Date().getTime()}_${this.id}_${this.bookBank.name}`;
                  // console.log(bookBankpath);
                  // The main task
                  this.task = this.storage.upload(bookBankpath, this.bookBank)
                  // Progress monitoring
                  const bookBankfileRef = this.storage.ref(bookBankpath);
                  this.task.snapshotChanges().pipe(
                    finalize(() => {
                      bookBankfileRef.getDownloadURL().subscribe(url => { 
                      // SET DATA
                      const getbookBankUrl = url;
                      // console.log(getbookBankUrl)
                      // ACTION
                      // 4 Upload File To Firebase Storage "vatRegis"
                      if(this.vatRegis != null) {
                        const vatRegispath = `vatRegis/${new Date().getTime()}_${this.id}_${this.vatRegis.name}`;
                        // console.log(vatRegispath);
                        // The main task
                        this.task = this.storage.upload(vatRegispath, this.vatRegis)
                        // Progress monitoring
                        const vatRegisfileRef = this.storage.ref(vatRegispath);
                        this.task.snapshotChanges().pipe(
                          finalize(() => {
                            vatRegisfileRef.getDownloadURL().subscribe(url => { 
                            // SET DATA
                            const getvatRegisUrl = url;
                            // console.log(getvatRegisUrl)
                            // ACTION
                            // console.log('_Up Load All Finish >> Individual');
                            // Call Function Firebase Email SignUp
                            this.upLoadProfileImg(getidCardCorporationUrl, getdbdFileUrl, getbookBankUrl, getvatRegisUrl);
                          // End Process
                          });
                        }))
                        .subscribe();
                      // End Process
                      }
                      else {
                        this.upLoadProfileImg(getidCardCorporationUrl, getdbdFileUrl, getbookBankUrl, null);
                      }
                    });
                  }))
                  .subscribe();
                // End Process
                });
              }))
              .subscribe();
            } //Enf if
          });
        }))
        .subscribe();
      }
    }
  }

  upLoadProfileImg(idCard, houseRegis_dbdFive, bookBank, vatRegis){
    if(this.imgURL != ''){
      var blob = this.dataURItoBlob(this.imgURL);
      // console.log(blob);
      var file = new File([blob], "profileImg.png", {
        type: "image/png"
      });
      // UPLOAD FILE
      const imgpath = `profileImg/${new Date().getTime()}_${this.id}_profileImg.png`;
      this.task = this.storage.upload(imgpath, file)
      const imgRef = this.storage.ref(imgpath);
      this.task.snapshotChanges().pipe(
        finalize(() => {
          imgRef.getDownloadURL().subscribe(url => {
            const getFileUrl = url;
            this.upLoadCoverImg(idCard, houseRegis_dbdFive, bookBank, vatRegis, getFileUrl, imgpath)
          });
        }))
      .subscribe();
    }
    else {
      this.upLoadCoverImg(idCard, houseRegis_dbdFive, bookBank, vatRegis, null, null)
    }
  } 

  upLoadCoverImg(idCard, houseRegis_dbdFive, bookBank, vatRegis, profileImgUrl, profileImgPath){
    if(this.imgURLCover != ''){
      var blob = this.dataURItoBlob(this.imgURLCover);
    // console.log(blob);
    var file = new File([blob], "coverImg.png", {
      type: "image/png"
    });
    // UPLOAD FILE
    const imgpath = `coverImg/${new Date().getTime()}_${this.id}_coverImg.png`;
    this.task = this.storage.upload(imgpath, file)
    const imgRef = this.storage.ref(imgpath);
    this.task.snapshotChanges().pipe(
      finalize(() => {
        imgRef.getDownloadURL().subscribe(url => {
          const getFileUrl = url;
          this.userUpdate(idCard, houseRegis_dbdFive, bookBank, vatRegis, profileImgUrl, profileImgPath, getFileUrl, imgpath)
        });
      }))
    .subscribe();
    }
    else {
      this.userUpdate(idCard, houseRegis_dbdFive, bookBank, vatRegis, profileImgUrl, profileImgPath, null, null)
    }
  } 

  userUpdate(idCard, houseRegis_dbdFive, bookBank, vatRegis, profileImgUrl, profileImgPath, coverImgUrl, coverImgPath){
    var shopType = ''
    if(this.text_type_place_company == 'บุคคลธรรมดา'){
      shopType = 'Individual';
    }
    else{
      shopType = 'Corporation';
    }
    this.firestore.collection('user-seller').doc(this.id).update({
      shopStatus: 'waitingApproval',
      checkStatus: true,
      name: this.name, 
      lastName: this.lastName,
      shopName: this.shopName,
      shopDescription: this.shopDescription, 
      shopAddress: this.dataAddress, 
      refCode: this.refCode, 
      shopType: shopType,
      profileImg: {
        imgUrl: profileImgUrl,
        imgpath: profileImgPath
      },
      coverImg: {
        imgUrl: coverImgUrl,
        imgpath: coverImgPath
      },
      bookbank: {
        bankCode: this.bankCode,
        bankNameTH: this.bankNameTH,
        bankFullNameTH: this.placeholderBank,
        bankNumber: this.bankNumber, 
        bankBranch: this.bankBranch, 
        accountName: this.accountName
      }
    })
    .then(docRef => {
      this.firestore.collection('shop').doc(this.id).update({
        shopStatus: 'waitingApproval', 
        shopName: this.shopName,
        shopDescription: this.shopDescription,
        checkStatus: true,
        profileImg: {
          imgUrl: profileImgUrl,
          imgpath: profileImgPath
        },
        coverImg: {
          imgUrl: coverImgUrl,
          imgpath: coverImgPath
        },
        shopAddress: this.dataAddress
      })
      .then(docRef => {
        // this.router.navigate([`/profile-settings`]);
        this.firestore.collection('user-seller').doc(this.id).collection('linkFile').doc(this.linkFileDocID).update({ 
          idCard: idCard,
          houseRegis_dbdFive: houseRegis_dbdFive, 
          bookBank: bookBank, 
          vatRegis: vatRegis
        }).then(docRef => {
          this.router.navigate([`/profile-settings`]);
        })
      })
    })
  }








}
