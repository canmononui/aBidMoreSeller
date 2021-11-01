import {Component, OnInit } from '@angular/core';
// FIREBASE
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore  } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import addressTHJSON from '../../services/data/addressTH.json';

// Test jQuery
// function hello() {
//   alert('Hello!!!');
// }

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public showRegis = true;
  public showInfo = false;
  // public showRegis = false;
  // public showInfo = true;
  public showShopDetails = false;
  public showAddress = false;
  public showRefCode = false;
  public showDocument = false;
  public showCondition = false;
  // ForDropDown
  public showIndividual = true;
  public showCorporation = false;
  public text_type_place_company = 'บุคคลธรรมดา'
  // From Regis
  public email = '';
  public password = '';
  public confirmPassword = '';
  // From Info
  public name = '';
  public lastName = '';
  public phoneNumber = '';
  // From ShopDetails
  public shopNameInput_:Number; 
  public shopName = '';
  public shopDescription = '';
  // From Address
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
  // From RefCode
  public refCode : any;
  // Form Document
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
  // True
  public showContent = true;
  public showLoading = false;
  // false
  // public showContent = false;
  // public showLoading = true;
  // public getidCardCorporationUrl : any = [];
  task: AngularFireUploadTask;
  public errorText1 = '';
  public errorText2 = '';
  public errorText3 = '';
  public errorText4 = '';
  public errorText5 = '';
  public errorText6 = '';
  // public errorText7 = '';
  public addressTH = addressTHJSON;
  public addDisJSON:any = [];
  public addAmphoeJSON:any = [];
  public addProvinceJSON:any = [];
  public addZipcodeJSON:any = [];
  // public recaptchaVerifier:any;
  public recaptchaVerifier:any;
  public sendOtp = true;
  public applicationVerifier:any;
  public passErr = false;
  public idRefCode;
  
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public db: AngularFireDatabase, 
    public firestore: AngularFirestore, 
    public storage: AngularFireStorage,
    public auth: AuthService,
    // public loadingCon: LoadingComponent,
  ) { 
    auth.getCurrentLoggedIn();
  }

  ngOnInit(): void {
    this.idRefCode = this.route.snapshot.paramMap.get("id");
    // SetData
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

    // this.auth.emailSignUp('___test@email.com', '', 'name', 'lastName', 'this.phoneNumber', 'this.shopName', 'this.shopDescription', 'thhh', 'this.refCode', 'idCard', 'houseRegis_dbdFive', 'bookBank', 'vatRegis', 'Individual')
    // Test jQuery
    // hello()
    // this.test();
    // if(this.auth.authenticated){
    // }
    
  }

  passInput($event): void {
    this.errorText1 = '';
    let hasNumber = /\d/.test($event.target.value);
    let hasUpper = /[A-Z]/.test($event.target.value);
    let hasLower = /[a-z]/.test($event.target.value);
    if($event.target.value.length <= 8 || hasNumber == false || hasUpper == false || hasLower == false){
      // NOT OK
      this.passErr = true;
    }
    else{
      // OK
      this.passErr = false;
    }
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


  backWardToRegis() {
    this.showRegis = true;
    this.showInfo = false;
    // console.log(this.email, this.password, this.confirmPassword)
    this.errorText2 = '';
  }

  backWardToInfo() {
    this.showInfo = true;
    this.showShopDetails = false;
    this.errorText3 = '';
  }

  backWardToShopDetails() {
    this.showShopDetails = true;
    this.showAddress = false;
    this.errorText4 = '';
  }

  backWardToAddress() {
    this.showAddress = true;
    this.showRefCode = false;
    this.errorText5 = '';
  }
  
  backWardToRefcode() {
    this.showRefCode = true;
    this.showDocument = false;
    this.errorText6 = '';
  }
  
  backWardToDocument() {
    // this.showDocument = true;
    this.showRegis = true;
    this.showCondition = false;
  }

  // mail_pass
  goToInfo(email, password, confirmPassword) {
    // this.showContent = false;
    // this.showLoading = true;
    // Mock Data
    // email = 'register_1@email.com';
    // email = 'testOTP@gmail.com';
    // password = '1234qwer';
    // confirmPassword = '1234qwer';

    if(password != confirmPassword){
      this.errorText1 = 'ข้อผิดพลาดรหัสผ่านและยืนยันรหัสผ่านไม่ถูกต้อง';
    }
    else if(email != '' && password != '' && confirmPassword != '' && password == confirmPassword){
      // Check Email Type
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const emailCheck = re.test(email);
      // console.log(emailCheck)
      if(emailCheck) {
        // Check Pass Type
        if(password.split(" ").length > 1){
          this.errorText1 = 'ข้อผิดพลาดรหัสผ่านไม่ถูกต้อง';
        }
        else if (this.passErr == true){
          this.errorText1 = 'รหัสผ่านควรมีมากกว่า 8 ตัวอักษร ประกอบด้วยตัวพิมพ์ใหญ่และพิมพ์เล็กและตัวเลข)';
        }
        else {
          // Check dbEmail == InputEmail
          firebase.auth().fetchSignInMethodsForEmail(email)
          .then(signInMethods => {
            if(signInMethods.length != 0) {
              this.errorText1 = 'ข้อผิดพลาดอีเมล์นี้ถูกใช้งานบนระบบแล้ว'; 
            }
            else {
              this.auth.emailSignUpNewV(email, password, this.idRefCode)
              // this.auth.sendSignInLinkToEmail(email)
              // this.showRegis = false;
              this.showContent = false;
              this.showLoading = true;
              // this.showCondition = true;
              // this.showInfo = true;
              this.email = email;
              this.password = password;
              this.confirmPassword = confirmPassword;
              this.errorText1 = '';
            }
          }) 
        }
      }
      else{
        this.errorText1 = 'ข้อผิดพลาดอีเมล์ไม่ถูกต้อง';
      }
    }
    else {
      this.errorText1 = 'กรุณาเพิ่มข้อมูลให้ถูกต้องครบถ้วน';
    }
  }

  // owner
  goToShopDetails(name, lastName, phoneNumber) {
    // this.auth.linkWithPhoneNumber('+66 65 555 3434', this.recaptchaVerifier)
    // +66 65 555 3434
    // Mock Data
    // name = 'name';
    // lastName = 'lastName'; 
    // phoneNumber = '0641234455';

    if(phoneNumber.length < 10 || phoneNumber.split(" ").length > 1){
      this. errorText2 = 'หมายเลขโทรศัพท์ไม่ถูกต้อง (กรอกข้อมูลโดยไม่เว้นวรรค)';
    }
    else if (name != '' && lastName != '' && phoneNumber != ''){
      // Check dbPhoneNumber == InputPhoneNumber
      this.firestore.collection('user-seller', ref => ref.where('phoneNumber', '==', phoneNumber)).get()
      .subscribe(val => {
        // console.log(val.size);
        if(val.size >= 3){
          this. errorText2 = 'ข้อผิดพลาดหมายเลขโทรศัพท์ถูกใช้งานบนระบบเกินแล้ว';
        }
        else {
            // Set Data
            this.name = name;
            this.lastName = lastName;
            this.phoneNumber = phoneNumber;
            // Change Content
            this.showInfo = false;
            this.showShopDetails = true;
            // Clear Error 
            this. errorText2 = '';
        }
      });
    }
    else {
      this.errorText2 = 'กรุณาเพิ่มข้อมูลให้ถูกต้องครบถ้วน';
    }
  }

  checkOtp(){

  }

  shopNameInput(input) {
    // input.target.value
    // console.log(input.target.value)
    this.shopNameInput_ = Number(input.target.value.length)
    // console.log(this.shopNameInput_)
  }

  // Shop Des
  goToShopAddress(shopName, shopDescription) {
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
            this.shopName = shopName;
            this.shopDescription = shopDescription;
            // Change Content
            this.showShopDetails = false;
            this.showAddress = true;
            // Clear Error 
            this.errorText3 = '';
        }
      });
    }
    else {
      this.errorText3 = 'กรุณาเพิ่มข้อมูลให้ถูกต้องครบถ้วน';
    }
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
      this.showAddress = false;
      this.showRefCode = true;
      // Clear Error 
      this.errorText4 = '';
    }
  }

  // refCode
  goToDocument(refCode) {
    // refCode = '4C6Aauw5N8miAanBxAVW';
    if(refCode!=''){
      this.errorText5 = '';
      // Check UID In DB
      this.firestore.collection('user-seller').doc(refCode).get()
      .subscribe(val => {
        // console.log(val.data());
        if(val.data() != undefined){
          // IF HAVE UID
          this.refCode = refCode;
          // Change Content
          this.showRefCode = false;
          this.showDocument = true;
          // Clear Error 
          this.errorText5 = '';
        }
        else {
          // ELSE
          this.refCode = null;
          this.errorText5 = 'ข้อผิดพลาดรหัสแนะนำไม่ถูกต้อง';
        }
      });
    }
    else {
      // Change Content
      this.refCode = null;
      this.showRefCode = false;
      this.showDocument = true;
      this.errorText5 = '';
    }
  }

  // Document 
  goToCondition() {
    if(this.text_type_place_company == 'บุคคลธรรมดา'){
      // console.log('this.idCardIndividual > ',this.idCardIndividual);
      // console.log('this.houseRegis > ',this.houseRegis);
      // console.log('this.bookBank > ',this.bookBank);
      // console.log('this.vatRegis > ',this.vatRegis);
      // Mock Data
      // this.idCardIndividual = '';
      // this.houseRegis = '';
      // this.bookBank = '';
      // this.vatRegis = '';

      this.errorText6 = '';
      if(this.idCardIndividual != null && this.houseRegis != null && this.bookBank != null && this.vatRegis != null){
        this.showDocument = false;
        this.showCondition = true;
        this.errorText6 = '';
      }
      else {
        this.errorText6 = 'กรุณาเพิ่มข้อมูลให้ถูกต้องครบถ้วน';
      }
    }
    else{
      if(this.idCardCorporation != null && this.dbdFile != null && this.bookBank != null && this.vatRegis != null){
        this.showDocument = false;
        this.showCondition = true;
        this.errorText6 = '';
      }
      else {
        this.errorText6 = 'กรุณาเพิ่มข้อมูลให้ถูกต้องครบถ้วน';
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

  resolvedForOtp(captchaResponse: string){
    // console.log('CAP > ', captchaResponse);
    if(captchaResponse){
      this.applicationVerifier = captchaResponse
      this.sendOtp = false;
    }
  }

  goToRegis() {
    // Hide Content And Show Loading
    this.showContent = false;
    this.showLoading = true;
    // VERSION UPDATE
    // Sign Up
    this.auth.emailSignUp(this.email, this.password)
  }

}
