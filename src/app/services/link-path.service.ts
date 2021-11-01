import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LinkPathService {
  public path : string = '';
  public addProductPath = false;
  public productListPath = false;
  public shippedListPath = false;
  public shippingListPath = false;
  public shippedSuccessListPath = false;
  public returnProductsPath = false;
  public saleSuccessListPath = false;
  public reviewListPath = false;
  public groupProductListPath = false;
  public salesStatisticsPath = false;
  public financeSummaryPath = false;
  public supportPath = false;
  public profileSettingsPath = false;
  public helpCenterPath = false;
  public contactAdminPath = false;
  public notiChatPath = false;
  public notiNotiPath = false;

  constructor(
    public auth: AuthService,
  ) { }

  setPath(_path: string) {
    if(_path == 'addProduct' && this.auth.getAuthState != null){
      this.addProductPath = true;
      this.productListPath = false;
      this.shippedListPath = false;
      this.shippingListPath = false;
      this.shippedSuccessListPath = false;
      this.returnProductsPath = false;
      this.saleSuccessListPath = false;
      this.reviewListPath = false;
      this.groupProductListPath = false;
      this.salesStatisticsPath = false;
      this.financeSummaryPath = false;
      this.supportPath = false;
      this.profileSettingsPath = false;
      this.helpCenterPath = false;
      this.contactAdminPath = false;
      this.notiChatPath = false;
      this.notiNotiPath = false;
      this.path = 'addProduct';
    }
    else if(_path == 'productList' && this.auth.getAuthState != null){
      this.addProductPath = false;
      this.productListPath = true;
      this.shippedListPath = false;
      this.shippingListPath = false;
      this.shippedSuccessListPath = false;
      this.returnProductsPath = false;
      this.saleSuccessListPath = false;
      this.reviewListPath = false;
      this.groupProductListPath = false;
      this.salesStatisticsPath = false;
      this.financeSummaryPath = false;
      this.supportPath = false;
      this.profileSettingsPath = false;
      this.helpCenterPath = false;
      this.contactAdminPath = false;
      this.notiChatPath = false;
      this.notiNotiPath = false;
      this.path = 'productList';
    }
    else if(_path == 'shippedList' && this.auth.getAuthState != null){
      this.addProductPath = false;
      this.productListPath = false;
      this.shippedListPath = true;
      this.shippingListPath = false;
      this.shippedSuccessListPath = false;
      this.returnProductsPath = false;
      this.saleSuccessListPath = false;
      this.reviewListPath = false;
      this.groupProductListPath = false;
      this.salesStatisticsPath = false;
      this.financeSummaryPath = false;
      this.supportPath = false;
      this.profileSettingsPath = false;
      this.helpCenterPath = false;
      this.contactAdminPath = false;
      this.notiChatPath = false;
      this.notiNotiPath = false;
      this.path = 'shippedList';
    }
    else if(_path == 'shippingList' && this.auth.getAuthState != null){
      this.addProductPath = false;
      this.productListPath = false;
      this.shippedListPath = false;
      this.shippingListPath = true;
      this.shippedSuccessListPath = false;
      this.returnProductsPath = false;
      this.saleSuccessListPath = false;
      this.reviewListPath = false;
      this.groupProductListPath = false;
      this.salesStatisticsPath = false;
      this.financeSummaryPath = false;
      this.supportPath = false;
      this.profileSettingsPath = false;
      this.helpCenterPath = false;
      this.contactAdminPath = false;
      this.notiChatPath = false;
      this.notiNotiPath = false;
      this.path = 'shippingList';
    }
    else if(_path == 'shippedSuccessList' && this.auth.getAuthState != null){
      this.addProductPath = false;
      this.productListPath = false;
      this.shippedListPath = false;
      this.shippingListPath = false;
      this.shippedSuccessListPath = true;
      this.returnProductsPath = false;
      this.saleSuccessListPath = false;
      this.reviewListPath = false;
      this.groupProductListPath = false;
      this.salesStatisticsPath = false;
      this.financeSummaryPath = false;
      this.supportPath = false;
      this.profileSettingsPath = false;
      this.helpCenterPath = false;
      this.contactAdminPath = false;
      this.notiChatPath = false;
      this.notiNotiPath = false;
      this.path = 'shippedSuccessList';
    }
    else if(_path == 'returnProducts' && this.auth.getAuthState != null){
      this.addProductPath = false;
      this.productListPath = false;
      this.shippedListPath = false;
      this.shippingListPath = false;
      this.shippedSuccessListPath = false;
      this.returnProductsPath = true;
      this.saleSuccessListPath = false;
      this.reviewListPath = false;
      this.groupProductListPath = false;
      this.salesStatisticsPath = false;
      this.financeSummaryPath = false;
      this.supportPath = false;
      this.profileSettingsPath = false;
      this.helpCenterPath = false;
      this.contactAdminPath = false;
      this.notiChatPath = false;
      this.notiNotiPath = false;
      this.path = 'returnProducts';
    }
    else if(_path == 'saleSuccessList' && this.auth.getAuthState != null){
      this.addProductPath = false;
      this.productListPath = false;
      this.shippedListPath = false;
      this.shippingListPath = false;
      this.shippedSuccessListPath = false;
      this.returnProductsPath = false;
      this.saleSuccessListPath = true;
      this.reviewListPath = false;
      this.groupProductListPath = false;
      this.salesStatisticsPath = false;
      this.financeSummaryPath = false;
      this.supportPath = false;
      this.profileSettingsPath = false;
      this.notiChatPath = false;
      this.notiNotiPath = false;
      this.path = 'saleSuccessList';
    }
    else if(_path == 'reviewList' && this.auth.getAuthState != null){
      this.addProductPath = false;
      this.productListPath = false;
      this.shippedListPath = false;
      this.shippingListPath = false;
      this.shippedSuccessListPath = false;
      this.returnProductsPath = false;
      this.saleSuccessListPath = false;
      this.reviewListPath = true;
      this.groupProductListPath = false;
      this.salesStatisticsPath = false;
      this.financeSummaryPath = false;
      this.supportPath = false;
      this.profileSettingsPath = false;
      this.helpCenterPath = false;
      this.contactAdminPath = false;
      this.notiChatPath = false;
      this.notiNotiPath = false;
      this.path = 'reviewList';
    }
    else if(_path == 'groupProductList' && this.auth.getAuthState != null){
      this.addProductPath = false;
      this.productListPath = false;
      this.shippedListPath = false;
      this.shippingListPath = false;
      this.shippedSuccessListPath = false;
      this.returnProductsPath = false;
      this.saleSuccessListPath = false;
      this.reviewListPath = false;
      this.groupProductListPath = true;
      this.salesStatisticsPath = false;
      this.financeSummaryPath = false;
      this.supportPath = false;
      this.profileSettingsPath = false;
      this.helpCenterPath = false;
      this.contactAdminPath = false;
      this.notiChatPath = false;
      this.notiNotiPath = false;
      this.path = 'groupProductList';
    }
    else if(_path == 'salesStatisticsSummary' && this.auth.getAuthState != null){
      this.addProductPath = false;
      this.productListPath = false;
      this.shippedListPath = false;
      this.shippingListPath = false;
      this.shippedSuccessListPath = false;
      this.returnProductsPath = false;
      this.saleSuccessListPath = false;
      this.reviewListPath = false;
      this.groupProductListPath = false;
      this.salesStatisticsPath = true;
      this.financeSummaryPath = false;
      this.supportPath = false;
      this.profileSettingsPath = false;
      this.helpCenterPath = false;
      this.contactAdminPath = false;
      this.notiChatPath = false;
      this.notiNotiPath = false;
      this.path = 'salesStatisticsSummary';
    }
    else if(_path == 'financeSummary' && this.auth.getAuthState != null){
      this.addProductPath = false;
      this.productListPath = false;
      this.shippedListPath = false;
      this.shippingListPath = false;
      this.shippedSuccessListPath = false;
      this.returnProductsPath = false;
      this.saleSuccessListPath = false;
      this.reviewListPath = false;
      this.groupProductListPath = false;
      this.salesStatisticsPath = false;
      this.financeSummaryPath = true;
      this.supportPath = false;
      this.profileSettingsPath = false;
      this.helpCenterPath = false;
      this.contactAdminPath = false;
      this.notiChatPath = false;
      this.notiNotiPath = false;
      this.path = 'financeSummary';
    }
    else if(_path == 'support' && this.auth.getAuthState != null){
      this.addProductPath = false;
      this.productListPath = false;
      this.shippedListPath = false;
      this.shippingListPath = false;
      this.shippedSuccessListPath = false;
      this.returnProductsPath = false;
      this.saleSuccessListPath = false;
      this.reviewListPath = false;
      this.groupProductListPath = false;
      this.salesStatisticsPath = false;
      this.financeSummaryPath = false;
      this.supportPath = true;
      this.profileSettingsPath = false;
      this.helpCenterPath = false;
      this.contactAdminPath = false;
      this.notiChatPath = false;
      this.notiNotiPath = false;
      this.path = 'support';
    }
    else if(_path == 'profileSettings' && this.auth.getAuthState != null){
      this.addProductPath = false;
      this.productListPath = false;
      this.shippedListPath = false;
      this.shippingListPath = false;
      this.shippedSuccessListPath = false;
      this.returnProductsPath = false;
      this.saleSuccessListPath = false;
      this.reviewListPath = false;
      this.groupProductListPath = false;
      this.salesStatisticsPath = false;
      this.financeSummaryPath = false;
      this.supportPath = false;
      this.profileSettingsPath = true;
      this.helpCenterPath = false;
      this.contactAdminPath = false;
      this.notiChatPath = false;
      this.notiNotiPath = false;
      this.path = 'profileSettings';
    }
    else if(_path == 'helpCenter' && this.auth.getAuthState != null){
      this.addProductPath = false;
      this.productListPath = false;
      this.shippedListPath = false;
      this.shippingListPath = false;
      this.shippedSuccessListPath = false;
      this.returnProductsPath = false;
      this.saleSuccessListPath = false;
      this.reviewListPath = false;
      this.groupProductListPath = false;
      this.salesStatisticsPath = false;
      this.financeSummaryPath = false;
      this.supportPath = false;
      this.profileSettingsPath = false;
      this.helpCenterPath = true;
      this.contactAdminPath = false;
      this.notiChatPath = false;
      this.notiNotiPath = false;
      this.path = 'helpCenter';
    }
    else if(_path == 'contactAdmin' && this.auth.getAuthState != null){
      this.addProductPath = false;
      this.productListPath = false;
      this.shippedListPath = false;
      this.shippingListPath = false;
      this.shippedSuccessListPath = false;
      this.returnProductsPath = false;
      this.saleSuccessListPath = false;
      this.reviewListPath = false;
      this.groupProductListPath = false;
      this.salesStatisticsPath = false;
      this.financeSummaryPath = false;
      this.supportPath = false;
      this.profileSettingsPath = false;
      this.helpCenterPath = false;
      this.contactAdminPath = true;
      this.notiChatPath = false;
      this.notiNotiPath = false;
      this.path = 'contactAdmin';
    }
    else if(_path == 'notiChat' && this.auth.getAuthState != null){
      this.addProductPath = false;
      this.productListPath = false;
      this.shippedListPath = false;
      this.shippingListPath = false;
      this.shippedSuccessListPath = false;
      this.returnProductsPath = false;
      this.saleSuccessListPath = false;
      this.reviewListPath = false;
      this.groupProductListPath = false;
      this.salesStatisticsPath = false;
      this.financeSummaryPath = false;
      this.supportPath = false;
      this.profileSettingsPath = false;
      this.helpCenterPath = false;
      this.contactAdminPath = false;
      this.notiChatPath = true;
      this.notiNotiPath = false;
      this.path = 'notiChat';
    }
    else if(_path == 'notiNoti' && this.auth.getAuthState != null){
      this.addProductPath = false;
      this.productListPath = false;
      this.shippedListPath = false;
      this.shippingListPath = false;
      this.shippedSuccessListPath = false;
      this.returnProductsPath = false;
      this.saleSuccessListPath = false;
      this.reviewListPath = false;
      this.groupProductListPath = false;
      this.salesStatisticsPath = false;
      this.financeSummaryPath = false;
      this.supportPath = false;
      this.profileSettingsPath = false;
      this.helpCenterPath = false;
      this.contactAdminPath = false;
      this.notiChatPath = false;
      this.notiNotiPath = true;
      this.path = 'notiNoti';
    }
    else {
      this.addProductPath = false;
      this.productListPath = false;
      this.shippedListPath = false;
      this.shippingListPath = false;
      this.shippedSuccessListPath = false;
      this.returnProductsPath = false;
      this.saleSuccessListPath = false;
      this.reviewListPath = false;
      this.groupProductListPath = false;
      this.salesStatisticsPath = false;
      this.financeSummaryPath = false;
      this.supportPath = false;
      this.profileSettingsPath = false;
      this.helpCenterPath = false;
      this.contactAdminPath = false;
      this.notiChatPath = false;
      this.notiNotiPath = false;
      this.path = '';
    }
    // console.log(this.auth.getAuthState);
    // console.log(_path);
    // console.log('1 > ',this.addProductPath);
    // console.log('2 > ',this.productListPath);
  }
  get pathString(){
    return this.path;
  }
}


