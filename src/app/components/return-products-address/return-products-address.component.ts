import { Component, OnInit } from '@angular/core';
import { LinkPathService } from '../../services/link-path.service';
// FIREBASE
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import addressTHJSON from '../../services/data/addressTH.json';

@Component({
  selector: 'app-return-products-address',
  templateUrl: './return-products-address.component.html',
  styleUrls: ['./return-products-address.component.css']
})
export class ReturnProductsAddressComponent implements OnInit {

  public id;
  public addressReturn = 'oldAddress';
  public shopAddress = ''
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
  public textError = ''
  public status = false
  public showContent = false;
  public orderDetail:any

  constructor(
    public path: LinkPathService,
    public router: Router,
    private route: ActivatedRoute,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.path.setPath('returnProducts');
    this.id = this.route.snapshot.paramMap.get("id");
    if(this.id){
      // console.log(this.id)
      this.productDataKey();
    }
    
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
  }

  productDataKey() {
    // GET ADDRESS
    this.firestore.collection('order').doc(this.id).get()
    .subscribe(val => {
      // console.log(val.data());
      // this.sellerDes = val.data()
      this.orderDetail = val.data()
      // SET SHOP ADDRESS FOR PDF
      if(this.orderDetail.delivery.sellerAddress.number != ""){
        this.shopAddress = this.shopAddress + " " + this.orderDetail.delivery.sellerAddress.number
      }
      if(this.orderDetail.delivery.sellerAddress.moo != ""){
        this.shopAddress = this.shopAddress + " " + this.orderDetail.delivery.sellerAddress.moo
      }
      if(this.orderDetail.delivery.sellerAddress.village != ""){
        this.shopAddress = this.shopAddress + " " + this.orderDetail.delivery.sellerAddress.village
      }
      if(this.orderDetail.delivery.sellerAddress.lane != ""){
        this.shopAddress = this.shopAddress + " " + this.orderDetail.delivery.sellerAddress.lane
      }
      if(this.orderDetail.delivery.sellerAddress.road != ""){
        this.shopAddress = this.shopAddress + " " + this.orderDetail.delivery.sellerAddress.road
      }
      if(this.orderDetail.delivery.sellerAddress.subDistrict != ""){
        this.shopAddress = this.shopAddress + " " + this.orderDetail.delivery.sellerAddress.subDistrict
      }
      if(this.orderDetail.delivery.sellerAddress.district != ""){
        this.shopAddress = this.shopAddress + " " + this.orderDetail.delivery.sellerAddress.district
      }
      if(this.orderDetail.delivery.sellerAddress.province != ""){
        this.shopAddress = this.shopAddress + " " + this.orderDetail.delivery.sellerAddress.province
      }
      if(this.orderDetail.delivery.sellerAddress.postalCode != ""){
        this.shopAddress = this.shopAddress + " " + this.orderDetail.delivery.sellerAddress.postalCode
      }
      if(this.orderDetail.delivery.sellerAddress.phone != ""){
        this.shopAddress = this.shopAddress + " (" + this.orderDetail.delivery.sellerAddress.phone + ")"
      }
      // console.log(this.shopAddress);
      this.showContent = true;
    });
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
    if(addName == ''){
      this.textError = 'กรุณาเพิ่มชื่อ';
      this.status = false
    }
    else if(addLastName == ''){
      this.textError = 'กรุณาเพิ่มนามสกุล';
      this.status = false
    }
    else if(addPhone.length < 10 || addPhone.split(" ").length > 1){
      this.textError = 'หมายเลขโทรศัพท์ไม่ถูกต้อง (กรอกข้อมูลโดยไม่เว้นวรรค)';
      this.status = false
    }
    else if(addNumber == ''){
      this.textError = 'กรุณาเพิ่มบ้านเลขที่';
      this.status = false
    }
    else if(addSubDistrict == ''){
      this.textError = 'กรุณาเพิ่มตำบล / แขวง';
      this.status = false
    }
    else if(addDistrict == ''){
      this.textError = 'กรุณาเพิ่มอำเภอ / เขต';
      this.status = false
    }
    else if(addProvince == ''){
      this.textError = 'กรุณาเพิ่มจังหวัด';
      this.status = false
    }
    else if(addPostalCode == ''){
      this.textError = 'กรุณาเพิ่มรหัสไปรษณีย์';
      this.status = false
    }
    else {
      this.textError = 'ต้องการบันทึกที่อยู่การส่งคืนสินค้า ?'
      this.status = true
      this.dataAddress = {
        name : addName, 
        lastName : addLastName, 
        phone : addPhone, 
        number : addNumber, 
        moo : addMoo, 
        village : addVillage, 
        lane : addLane, 
        road : addRoad, 
        subDistrict : addSubDistrict, 
        district : addDistrict, 
        province : addProvince, 
        postalCode : addPostalCode
      }
    }
  }

  addressReturnProduct(typeAddress) {
    this.addressReturn = typeAddress;
    console.log(this.addressReturn);
  }

  submitAddress(){
    this.textError = 'ต้องการบันทึกที่อยู่การส่งคืนสินค้า ?'
    this.status = true
  }

  addAddress(){
    if(this.addressReturn == 'oldAddress'){
      // console.log(this.orderDetail.delivery.sellerAddress)
      this.firestore.collection('order').doc(this.id).update({
        'returnProduct.returnProductShippingAt': firebase.firestore.Timestamp.now(),
        'returnProduct.returnProductShippingAddress': this.orderDetail.delivery.sellerAddress,
        'returnProduct.status': 'returnProductShipping',
      })
      .then(docRef => {
        this.router.navigate([`/return-products-detail/${this.id}`]);
      })
      .catch(error => {
        console.error("Error adding document: ", error)
      })
    }
    else if(this.addressReturn == 'newAddress' && this.status){
      console.log(this.dataAddress)
      this.firestore.collection('order').doc(this.id).update({
        'returnProduct.returnProductShippingAt': firebase.firestore.Timestamp.now(),
        'returnProduct.returnProductShippingAddress': this.dataAddress,
        'returnProduct.status': 'returnProductShipping',
      })
      .then(docRef => {
        this.router.navigate([`/return-products-detail/${this.id}`]);
      })
      .catch(error => {
        console.error("Error adding document: ", error)
      })
    }
  }

}
