import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
// IMAGE CROPPER
import { ImageCropperModule } from 'ngx-image-cropper';
// SLIDER BAR
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
// FIREBASE
import { firebaseConfig } from './../environments/firebase.config';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
// CAPTCHA
import { RecaptchaModule } from 'ng-recaptcha';
// TEXT EDITOR
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
// SERVICE
import { AuthService } from './services/auth.service';
// GUARD
import { AuthGuard } from './guards/auth.guard';
// HTTP
import { HttpClientModule } from '@angular/common/http';
// COMPONENT
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ModalSidebarComponent } from './components/modal-sidebar/modal-sidebar.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { ProfileSettingsRefCodeComponent } from './components/profile-settings-ref-code/profile-settings-ref-code.component';
import { ProfileSettingsInfoComponent } from './components/profile-settings-info/profile-settings-info.component';
import { ProfileSettingsShopnameComponent } from './components/profile-settings-shopname/profile-settings-shopname.component';
import { ProfileSettingsShopdescriptionComponent } from './components/profile-settings-shopdescription/profile-settings-shopdescription.component';
import { ProfileSettingsProfileimgComponent } from './components/profile-settings-profileimg/profile-settings-profileimg.component';
import { ProfileSettingsCoverimgComponent } from './components/profile-settings-coverimg/profile-settings-coverimg.component';
import { ProfileSettingsBookbankComponent } from './components/profile-settings-bookbank/profile-settings-bookbank.component';
import { ProfileSettingsShopaddressComponent } from './components/profile-settings-shopaddress/profile-settings-shopaddress.component';
import { ProfileSettingsShopfileComponent } from './components/profile-settings-shopfile/profile-settings-shopfile.component';
import { ShippedListComponent } from './components/shipped-list/shipped-list.component';
import { ShippedDetailComponent } from './components/shipped-detail/shipped-detail.component';
import { ShippingListComponent } from './components/shipping-list/shipping-list.component';
import { ShippingDetailComponent } from './components/shipping-detail/shipping-detail.component';
import { ShippedSuccessDetailComponent } from './components/shipped-success-detail/shipped-success-detail.component';
import { ShippedSuccessListComponent } from './components/shipped-success-list/shipped-success-list.component';
import { SaleSuccessListComponent } from './components/sale-success-list/sale-success-list.component';
import { SaleSuccessDetailComponent } from './components/sale-success-detail/sale-success-detail.component';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { ReviewDetailComponent } from './components/review-detail/review-detail.component';
import { GroupProductListComponent } from './components/group-product-list/group-product-list.component';
import { GroupProductEditComponent } from './components/group-product-edit/group-product-edit.component';
import { GroupProductCreateComponent } from './components/group-product-create/group-product-create.component';
import { SalesStatisticsSummaryComponent } from './components/sales-statistics-summary/sales-statistics-summary.component';
import { SalesStatisticsViewsComponent } from './components/sales-statistics-views/sales-statistics-views.component';
import { FinanceSummaryComponent } from './components/finance-summary/finance-summary.component';
import { FinanceWithdrawComponent } from './components/finance-withdraw/finance-withdraw.component';
import { FinanceDepositComponent } from './components/finance-deposit/finance-deposit.component';
import { FinanceWaitingWithdrawComponent } from './components/finance-waiting-withdraw/finance-waiting-withdraw.component';
import { FinanceDonateComponent } from './components/finance-donate/finance-donate.component';
import { SupportBuyBannerComponent } from './components/support-buy-banner/support-buy-banner.component';
import { SupportBuyProductComponent } from './components/support-buy-product/support-buy-product.component';
import { SupportListBannerComponent } from './components/support-list-banner/support-list-banner.component';
import { SupportListProductComponent } from './components/support-list-product/support-list-product.component';
import { HelpCenterListComponent } from './components/help-center-list/help-center-list.component';
import { HelpCenterDetailComponent } from './components/help-center-detail/help-center-detail.component';
import { ContactAdminComponent } from './components/contact-admin/contact-admin.component';
import { NotificationChatComponent } from './components/notification-chat/notification-chat.component';
import { NotificationNotiComponent } from './components/notification-noti/notification-noti.component';
import { NotificationChatReplyComponent } from './components/notification-chat-reply/notification-chat-reply.component';
import { ReturnProductsListComponent } from './components/return-products-list/return-products-list.component';
import { ReturnProductsDetailComponent } from './components/return-products-detail/return-products-detail.component';
import { ReturnProductsArgueRequestComponent } from './components/return-products-argue-request/return-products-argue-request.component';
import { ReturnProductsArgueReceiveComponent } from './components/return-products-argue-receive/return-products-argue-receive.component';
import { ReturnProductsAddressComponent } from './components/return-products-address/return-products-address.component';
import { CheckEmailVerifyComponent } from './components/check-email-verify/check-email-verify.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { UpdateUserSellerComponent } from './components/update-user-seller/update-user-seller.component';

// ROUTES
export const router: Routes = [
  { path: '', component: AddProductComponent, canActivate: [AuthGuard] },
  { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'login/:id', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'signup/:id', component: RegisterComponent },
  { path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'loading', component: LoadingComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
  { path: 'product-edit/:id', component: ProductEditComponent, canActivate: [AuthGuard] },
  { path: 'profile-settings', component: ProfileSettingsComponent, canActivate: [AuthGuard] },
  { path: 'profile-settings-refCode', component: ProfileSettingsRefCodeComponent, canActivate: [AuthGuard] },
  { path: 'profile-settings-info', component: ProfileSettingsInfoComponent, canActivate: [AuthGuard] },
  { path: 'profile-settings-shopname', component: ProfileSettingsShopnameComponent, canActivate: [AuthGuard] },
  { path: 'profile-settings-shopdescription', component: ProfileSettingsShopdescriptionComponent, canActivate: [AuthGuard] },
  { path: 'profile-settings-profileimg', component: ProfileSettingsProfileimgComponent, canActivate: [AuthGuard] },
  { path: 'profile-settings-coverimg', component: ProfileSettingsCoverimgComponent, canActivate: [AuthGuard] },
  { path: 'profile-settings-bookbank', component: ProfileSettingsBookbankComponent, canActivate: [AuthGuard] },
  { path: 'profile-settings-shopaddress/:id', component: ProfileSettingsShopaddressComponent, canActivate: [AuthGuard] },
  { path: 'profile-settings-shopfile/:id', component: ProfileSettingsShopfileComponent, canActivate: [AuthGuard] },
  // FOR FRONTEND
  { path: 'shipped-list', component: ShippedListComponent, canActivate: [AuthGuard] },
  { path: 'shipped-detail/:id', component: ShippedDetailComponent, canActivate: [AuthGuard] },
  { path: 'shipping-list', component: ShippingListComponent, canActivate: [AuthGuard] },
  { path: 'shipping-detail/:id', component: ShippingDetailComponent, canActivate: [AuthGuard] },
  { path: 'shipped-success-list', component: ShippedSuccessListComponent, canActivate: [AuthGuard] },
  { path: 'shipped-success-detail/:id', component: ShippedSuccessDetailComponent, canActivate: [AuthGuard] },
  { path: 'sale-success-list', component: SaleSuccessListComponent, canActivate: [AuthGuard] },
  { path: 'sale-success-detail/:id', component: SaleSuccessDetailComponent, canActivate: [AuthGuard] },
  { path: 'review-list', component: ReviewListComponent, canActivate: [AuthGuard] },
  { path: 'review-detail/:id', component: ReviewDetailComponent, canActivate: [AuthGuard] },
  { path: 'group-product-list', component: GroupProductListComponent, canActivate: [AuthGuard] },
  { path: 'group-product-edit/:id', component: GroupProductEditComponent, canActivate: [AuthGuard] },
  { path: 'group-product-create', component: GroupProductCreateComponent, canActivate: [AuthGuard] },
  { path: 'sales-statistics-summary', component: SalesStatisticsSummaryComponent, canActivate: [AuthGuard] },
  { path: 'sales-statistics-views', component: SalesStatisticsViewsComponent, canActivate: [AuthGuard] },
  { path: 'finance-summary', component: FinanceSummaryComponent, canActivate: [AuthGuard] },
  { path: 'finance-withdraw', component: FinanceWithdrawComponent, canActivate: [AuthGuard] },
  { path: 'finance-deposit', component: FinanceDepositComponent, canActivate: [AuthGuard] },
  { path: 'finance-waiting-withdraw', component: FinanceWaitingWithdrawComponent, canActivate: [AuthGuard] },
  { path: 'finance-donate', component: FinanceDonateComponent, canActivate: [AuthGuard] },
  { path: 'support-buy-banner', component: SupportBuyBannerComponent, canActivate: [AuthGuard] },
  { path: 'support-buy-product', component: SupportBuyProductComponent, canActivate: [AuthGuard] },
  { path: 'support-list-banner', component: SupportListBannerComponent, canActivate: [AuthGuard] },
  { path: 'support-list-product', component: SupportListProductComponent, canActivate: [AuthGuard] },
  { path: 'help-center-list', component: HelpCenterListComponent, canActivate: [AuthGuard] },
  { path: 'help-center-detail', component: HelpCenterDetailComponent, canActivate: [AuthGuard] },
  { path: 'contact-admin', component: ContactAdminComponent, canActivate: [AuthGuard] },
  { path: 'noti-chat', component: NotificationChatComponent, canActivate: [AuthGuard] },
  { path: 'noti-chat-reply/:id', component: NotificationChatReplyComponent, canActivate: [AuthGuard] },
  { path: 'noti-noti', component: NotificationNotiComponent, canActivate: [AuthGuard] },
  { path: 'return-products-list', component: ReturnProductsListComponent, canActivate: [AuthGuard] },
  { path: 'return-products-detail/:id', component: ReturnProductsDetailComponent, canActivate: [AuthGuard] },
  { path: 'return-products-argue-request/:id', component: ReturnProductsArgueRequestComponent, canActivate: [AuthGuard] },
  { path: 'return-products-argue-receive/:id', component: ReturnProductsArgueReceiveComponent, canActivate: [AuthGuard] },
  { path: 'return-products-address/:id', component: ReturnProductsAddressComponent, canActivate: [AuthGuard] },
  { path: 'check-email-verify', component: CheckEmailVerifyComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'update-user-seller', component: UpdateUserSellerComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    SidebarComponent,
    ModalSidebarComponent,
    AddProductComponent,
    ProductListComponent,
    LoadingComponent,
    HomeComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProfileSettingsComponent,
    ProfileSettingsRefCodeComponent,
    ProfileSettingsInfoComponent,
    ProfileSettingsShopnameComponent,
    ProfileSettingsShopdescriptionComponent,
    ProfileSettingsProfileimgComponent,
    ProfileSettingsCoverimgComponent,
    ProfileSettingsBookbankComponent,
    ProfileSettingsShopaddressComponent,
    ProfileSettingsShopfileComponent,
    ShippedListComponent,
    ShippedDetailComponent,
    ShippingListComponent,
    ShippingDetailComponent,
    ShippedSuccessDetailComponent,
    ShippedSuccessListComponent,
    SaleSuccessListComponent,
    SaleSuccessDetailComponent,
    ReviewListComponent,
    ReviewDetailComponent,
    GroupProductListComponent,
    GroupProductEditComponent,
    GroupProductCreateComponent,
    SalesStatisticsSummaryComponent,
    SalesStatisticsViewsComponent,
    FinanceSummaryComponent,
    FinanceWithdrawComponent,
    FinanceDepositComponent,
    FinanceWaitingWithdrawComponent,
    FinanceDonateComponent,
    SupportBuyBannerComponent,
    SupportBuyProductComponent,
    SupportListBannerComponent,
    SupportListProductComponent,
    HelpCenterListComponent,
    HelpCenterDetailComponent,
    ContactAdminComponent,
    NotificationChatComponent,
    NotificationNotiComponent,
    NotificationChatReplyComponent,
    ReturnProductsListComponent,
    ReturnProductsDetailComponent,
    ReturnProductsArgueRequestComponent,
    ReturnProductsAddressComponent,
    ReturnProductsArgueReceiveComponent,
    CheckEmailVerifyComponent,
    VerifyEmailComponent,
    UpdateUserSellerComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    NgxBootstrapSliderModule,
    ImageCropperModule,
    RouterModule.forRoot(router),
    AppRoutingModule,
    RichTextEditorAllModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    RecaptchaModule,
    NgbModule,
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
