import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import addressTHJSON from '../../services/data/addressTH.json';

@Component({
  selector: 'app-profile-settings-shopaddress',
  templateUrl: './profile-settings-shopaddress.component.html',
  styleUrls: ['./profile-settings-shopaddress.component.css']
})
export class ProfileSettingsShopaddressComponent implements OnInit {
  public textError = ''
  public status = false
  public showContent = false;
  // public userSeller:any
  public dataAddress!: {
    name: any, 
    lastName: any, 
    phone: any, 
    number: any, 
    moo: any,
    village: any, 
    lane: any, 
    road: any, 
    subDistrict: any, 
    district: any, 
    province: any, 
    postalCode: any
  }

  public addressTH = addressTHJSON;
  public addDisJSON:any = [];
  public addAmphoeJSON:any = [];
  public addProvinceJSON:any = [];
  public addZipcodeJSON:any = [];

  constructor(
    public path: LinkPathService,
    public router: Router,
    public db: AngularFireDatabase,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
  this.path.setPath('profileSettings');
  // SET DATA 
  this.dataAddress = {
    name : null, 
    lastName : null, 
    phone : null, 
    number : null, 
    moo : null, 
    village : null, 
    lane : null, 
    road : null, 
    subDistrict : null, 
    district : null, 
    province : null, 
    postalCode : null
  }
  // GET SHOP PROFILE
  this.firestore.collection('user-seller').doc(this.auth.currentUserId).get()
  .subscribe(val => {
    // var userSeller:any = val.data()
    if(val.data() != undefined){
      var a: any = val.data()
      if(a.shopAddress != null){
        this.dataAddress = a.shopAddress
      }
      // console.log(this.dataAddress)
      this.showContent = true
    }
  });
  // this.showContent = true

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

  checkAddress(addName, addLastName, addPhone, addNumber, addMoo, addVillage, addLane, addRoad, addSubDistrict, addDistrict, addProvince, addPostalCode) {
    // console.log(addName, addLastName, addPhone, addNumber, addMoo, addVillage, addLane, addRoad, addSubDistrict, addDistrict, addProvince, addPostalCode)
    if(addName == ''){
      this. textError = 'กรุณาเพิ่มชื่อ';
      this.status = false
    }
    else if(addLastName == ''){
      this. textError = 'กรุณาเพิ่มนามสกุล';
      this.status = false
    }
    else if(addPhone.length < 10 || addPhone.split(" ").length > 1){
      this. textError = 'หมายเลขโทรศัพท์ไม่ถูกต้อง (กรอกข้อมูลโดยไม่เว้นวรรค)';
      this.status = false
    }
    else if(addNumber == ''){
      this. textError = 'กรุณาเพิ่มบ้านเลขที่';
      this.status = false
    }
    else if(addSubDistrict == ''){
      this. textError = 'กรุณาเพิ่มตำบล / แขวง';
      this.status = false
    }
    else if(addDistrict == ''){
      this. textError = 'กรุณาเพิ่มอำเภอ / เขต';
      this.status = false
    }
    else if(addProvince == ''){
      this. textError = 'กรุณาเพิ่มจังหวัด';
      this.status = false
    }
    else if(addPostalCode == ''){
      this. textError = 'กรุณาเพิ่มรหัสไปรษณีย์';
      this.status = false
    }
    else {
      this.textError = 'ต้องการเพิ่มชื่อที่อยู่ร้านค้า ?'
      this.status = true
    }
  }

  addAddress(addName, addLastName, addPhone, addNumber, addMoo, addVillage, addLane, addRoad, addSubDistrict, addDistrict, addProvince, addPostalCode){
    if(this.status){
      // console.log(addName, addLastName, addPhone, addNumber, addMoo, addVillage, addLane, addRoad, addSubDistrict, addDistrict, addProvince, addPostalCode)
      // this.dataAddress = {
      //   name: addName, 
      //   lastName: addLastName, 
      //   phone: addPhone, 
      //   number: addNumber, 
      //   moo: addMoo, 
      //   village: addVillage, 
      //   lane: addLane, 
      //   road: addRoad, 
      //   subDistrict: addSubDistrict, 
      //   district: addDistrict, 
      //   province: addProvince, 
      //   postalCode: addPostalCode
      // }
      this.firestore.collection('user-seller').doc(this.auth.currentUserId).update({
        shopAddress: {
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
      })
      .then(docRef => {
        this.firestore.collection('shop').doc(this.auth.currentUserId).update({
          shopAddress: {
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
        })
        .then(docRef => {
          this.router.navigate([`/profile-settings`]);
        })
      })
    }
  }

}
