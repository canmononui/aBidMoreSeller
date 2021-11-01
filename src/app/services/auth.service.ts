import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AddProductPathOnInitService } from '../services/add-product-path-on-init.service';

// Gen code
// @Injectable({
//   providedIn: 'root'
// })

@Injectable()

export class AuthService {

  authState: any = null;
  userRef: AngularFireObject<any>;
  public statusLoginFail = false;
  public resetPassFail = false;
  public addData = false;
  public confirmationResult: firebase.auth.ConfirmationResult;
  public statusPhoneConfirmFail = false;
  public statusVerifyOTPFail = false;
  public getCurrentLoggedInData;

  constructor(private afAuth: AngularFireAuth,
    public aPPO: AddProductPathOnInitService,
    private db: AngularFireDatabase,
    private router: Router,
    public firestore: AngularFirestore,
    private afs: AngularFirestore) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
      // console.log(this.authState)
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }
  // get addDataed(): boolean {
  //   // console.log('a add > ', this.addData)
  //   return this.addData;
  // }
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }
  get currentUserObservable(): any {
    return this.afAuth.authState
  }
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false
  }
  get currentUserDisplayName(): string {
    if (!this.authState) {
      return 'Guest'
    } else if (this.currentUserAnonymous) {
      return 'Anonymous'
    } else {
      return this.authState['displayName'] || 'User without a Name'
    }
  }

  get statusloginFail() {
    return this.statusLoginFail;
  }

  get resetpassFail() {
    return this.resetPassFail;
  }

  get getAuthState() {
    return this.authState;
  }

  // get _statusPhoneConfirmFail() {
  //   return this.statusPhoneConfirmFail;
  // }

  // get _statusVerifyOTPFail() {
  //   return this.statusVerifyOTPFail;
  // }

  // githubLogin() {
  //     const provider = new firebase.auth.GithubAuthProvider()
  //     return this.socialSignIn(provider);
  //   }
  googleLogin(idRefCode: any) {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider, idRefCode);
  }

  facebookLogin(idRefCode: any) {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.socialSignIn(provider, idRefCode);
  }

  // twitterLogin() {
  //     const provider = new firebase.auth.TwitterAuthProvider()
  //     return this.socialSignIn(provider);
  //   }

  private socialSignIn(provider, idRefCode) {
    return this.afAuth.signInWithPopup(provider)
      .then((credential) => {
        // console.log(credential.user);
        var _credential: any = credential;
        // SET REFCODE TO UPPER CASE
        var _refCodeUpper: any = null
        if (idRefCode != null) {
          _refCodeUpper = idRefCode.toUpperCase();
        }
        // CHECK REFCODE IN DB
        this.firestore.collection('user-seller', ref => ref
          .where('yourRefCode', '==', _refCodeUpper))
          .get().toPromise()
          .then((doc) => {
            if (doc.empty) {
              _refCodeUpper = null;
            }
            var _timeStmap: any = firebase.firestore.Timestamp.now();
            var _yourRefCode: any = _credential.user.uid[0].toUpperCase() + _credential.user.uid[1].toUpperCase() + _timeStmap.seconds.toString();
            // CHECK NEW USER ?
            if (_credential.additionalUserInfo.isNewUser) {
              // CREATE VARIABLE
              var _name: any = null;
              var _lastName: any = null;
              // CHECK PROVIDER = FACEBOOK ?
              if (_credential.credential.providerId == 'facebook.com') {
                var _profile: any = _credential.additionalUserInfo.profile;
                _name = _profile.first_name;
                _lastName = _profile.last_name;
              }
              // CHECK PROVIDER = GOOGLE ?
              else if (_credential.credential.providerId == 'google.com') {
                var _profile: any = _credential.additionalUserInfo.profile;
                _name = _profile.given_name;
                _lastName = _profile.family_name;
              }
              //  SET DATA SHOP DES
              this.afs.collection('shop').doc(_credential.user.uid).set({
                createAt: _timeStmap,
                shopStatus: 'waitingUpdateUserData',
                uid: _credential.user.uid,
                email: _credential.user.email,
                shopName: null,
                shopDescription: null,
                foundationType: false,
                groupProduct: null,
                checkStatus: false,
                profileImg: {
                  imgUrl: null,
                  imgpath: null
                },
                coverImg: {
                  imgUrl: null,
                  imgpath: null
                },
                shopAddress: null
              })
                .then(() => {
                  // SET USER SELLER DES
                  this.afs.collection('user-seller').doc(_credential.user.uid).set({
                    createAt: _timeStmap,
                    shopStatus: 'waitingUpdateUserData',
                    emailVerifyAt: _timeStmap,
                    uid: _credential.user.uid,
                    email: _credential.user.email,
                    displayName: this.authState.displayName,
                    checkStatus: false,
                    foundationType: false,
                    name: _name,
                    lastName: _lastName,
                    phoneNumber: null,
                    phoneNumberVerifyAt: null,
                    shopName: null,
                    shopDescription: null,
                    shopAddress: null,
                    refCode: _refCodeUpper,
                    yourRefCode: _yourRefCode,
                    shopType: null,
                    bookbank: null,
                    profileImg: {
                      imgUrl: null,
                      imgpath: null
                    },
                    coverImg: {
                      imgUrl: null,
                      imgpath: null
                    },
                    percenFinance: {
                      debitCredit: 5,
                      debitCreditInter: 5,
                      eWallet: 5,
                      qrPayment: 5
                    },
                    percenCancelOrder: 5
                  })
                    .then(() => {
                      // ADD SUB COLLECTION LINKFILE 
                      this.afs.collection('user-seller').doc(_credential.user.uid).collection('linkFile').add({
                        idCard: null,
                        houseRegis_dbdFive: null,
                        bookBank: null,
                        vatRegis: null
                      })
                        .then(() => {
                          this.router.navigate([`/update-user-seller`]);
                        })
                    })
                })
            }
            else {
              // OLD USER 
              // CHECK HAVE USER-BYER ?
              this.firestore.collection('user-seller').doc(_credential.user.uid).get().toPromise()
                .then((val) => {
                  // GET USER BUYER DES
                  if (val.data() != undefined) {
                    const _userBuyer: any = val.data()
                    if (_userBuyer.accountStatus) {
                      // ACCOUNT APPROVE
                      this.router.navigate(['/add-product']);
                    }
                    else {
                      // ACCOUNT NOT APPROVE => UPDATE 
                      this.router.navigate([`/update-user-seller`]);
                    }
                  }
                  else {
                    this.firestore.collection('user-buyer').doc(_credential.user.uid).get().toPromise()
                      .then((val) => {
                        if (val.data() != undefined) {
                          const _userBuyer: any = val.data()
                          var _timeStmap: any = firebase.firestore.Timestamp.now();
                          //  SET DATA SHOP DES
                          this.afs.collection('shop').doc(_credential.user.uid).set({
                            createAt: _timeStmap,
                            shopStatus: 'waitingUpdateUserData',
                            uid: _credential.user.uid,
                            email: _credential.user.email,
                            shopName: null,
                            shopDescription: null,
                            foundationType: false,
                            groupProduct: null,
                            checkStatus: false,
                            profileImg: {
                              imgUrl: null,
                              imgpath: null
                            },
                            coverImg: {
                              imgUrl: null,
                              imgpath: null
                            },
                            shopAddress: null
                          })
                            .then(() => {
                              // SET USER SELLER DES
                              this.afs.collection('user-seller').doc(_credential.user.uid).set({
                                createAt: _timeStmap,
                                shopStatus: 'waitingUpdateUserData',
                                emailVerifyAt: _timeStmap,
                                uid: _credential.user.uid,
                                email: _credential.user.email,
                                displayName: this.authState.displayName,
                                checkStatus: false,
                                foundationType: false,
                                name: _userBuyer.name,
                                lastName: _userBuyer.lastName,
                                phoneNumber: _userBuyer.phoneNumber,
                                phoneNumberVerifyAt: _userBuyer.phoneNumberVerifyAt,
                                shopName: null,
                                shopDescription: null,
                                shopAddress: null,
                                refCode: _refCodeUpper,
                                yourRefCode: _userBuyer.yourRefCode,
                                shopType: null,
                                bookbank: null,
                                profileImg: {
                                  imgUrl: null,
                                  imgpath: null
                                },
                                coverImg: {
                                  imgUrl: null,
                                  imgpath: null
                                },
                                percenFinance: {
                                  debitCredit: 5,
                                  debitCreditInter: 5,
                                  eWallet: 5,
                                  qrPayment: 5
                                },
                                percenCancelOrder: 5
                              })
                                .then(() => {
                                  // ADD SUB COLLECTION LINKFILE 
                                  // console.log(this.authState)
                                  this.afs.collection('user-seller').doc(_credential.user.uid).collection('linkFile').add({
                                    idCard: null,
                                    houseRegis_dbdFive: null,
                                    bookBank: null,
                                    vatRegis: null
                                  })
                                    .then(() => {
                                      this.router.navigate([`/update-user-seller`]);
                                    })
                                })
                            })
                        }
                      })
                  }
                })
            }
          })
      })
      .catch(error => console.log(error));
  }

  // anonymousLogin() {
  //     return this.afAuth.auth.signInAnonymously()
  //       .then((user) => {
  //         this.authState = user
  //         this.router.navigate(['/'])
  //       })
  //       .catch(error => console.log(error));
  //   }

  emailSignUpNewV(email: string, password: string, idRefCode: any) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        var _userSignUp: any = user.user;
        var _timeStmap: any = firebase.firestore.Timestamp.now();
        // SET REFCODE TO UPPER CASE
        var _refCodeUpper: any = null
        if (idRefCode != null) {
          _refCodeUpper = idRefCode.toUpperCase();
        }
        // CHECK REFCODE IN DB
        this.firestore.collection('user-seller', ref => ref
          .where('yourRefCode', '==', _refCodeUpper))
          .get().toPromise()
          .then((doc) => {
            if (doc.empty) {
              _refCodeUpper = null;
            }
            //  SET DATA SHOP DES
            this.afs.collection('shop').doc(_userSignUp.uid).set({
              createAt: _timeStmap,
              shopStatus: 'waitingEmailVerify',
              uid: _userSignUp.uid,
              email: _userSignUp.email,
              shopName: null,
              shopDescription: null,
              foundationType: false,
              groupProduct: null,
              checkStatus: false,
              profileImg: {
                imgUrl: null,
                imgpath: null
              },
              coverImg: {
                imgUrl: null,
                imgpath: null
              },
              shopAddress: null
            })
              .then(() => {
                // SET USER SELLER DES
                var _yourRefCode: any = _userSignUp.uid[0].toUpperCase() + _userSignUp.uid[1].toUpperCase() + _timeStmap.seconds.toString();
                this.afs.collection('user-seller').doc(_userSignUp.uid).set({
                  createAt: _timeStmap,
                  shopStatus: 'waitingEmailVerify',
                  emailVerifyAt: null,
                  uid: _userSignUp.uid,
                  email: email,
                  displayName: this.authState.displayName,
                  checkStatus: false,
                  foundationType: false,
                  name: null,
                  lastName: null,
                  phoneNumber: null,
                  phoneNumberVerifyAt: null,
                  shopName: null,
                  shopDescription: null,
                  shopAddress: null,
                  refCode: _refCodeUpper,
                  yourRefCode: _yourRefCode,
                  shopType: null,
                  bookbank: null,
                  profileImg: {
                    imgUrl: null,
                    imgpath: null
                  },
                  coverImg: {
                    imgUrl: null,
                    imgpath: null
                  },
                  percenFinance: {
                    debitCredit: 5,
                    debitCreditInter: 5,
                    eWallet: 5,
                    qrPayment: 5
                  },
                  percenCancelOrder: 5
                })
                  .then(() => {
                    // ADD SUB COLLECTION LINKFILE
                    this.afs.collection('user-seller').doc(_userSignUp.uid).collection('linkFile').add({
                      idCard: null,
                      houseRegis_dbdFive: null,
                      bookBank: null,
                      vatRegis: null
                    })
                      .then(() => {
                        // SIGN UP & SET DES SUCCESS
                        var actionCodeSettings = {
                          // url: 'http://localhost:4200/login',
                          url: 'https://merchant.abidmore.com/login',
                          handleCodeInApp: true,
                        };
                        this.authState.sendEmailVerification(actionCodeSettings)
                          .then(() => {
                            this.afAuth.signOut()
                              .then((msg) => {
                                this.router.navigate(['/check-email-verify'])
                              })
                              .catch(error => console.log(error));
                          })
                      })
                  })
              })
          })
      })
      .catch(error => console.log(error));
  }

  signInWithEmailLink(email: string, url: string): Promise<any> {
    return this.afAuth.signInWithEmailLink(email, url);
  }

  linkWithPhoneNumber(phoneNumber: string, applicationVerifier): Promise<any> {
    return this.authState.linkWithPhoneNumber(phoneNumber, applicationVerifier)
  }

  resendVerifyOTP(phoneNumber: string): Promise<any> {
    return this.authState.verifyPhoneNumber(phoneNumber, true);
  }

  verifyOTP(confirmationResult, OTPCode: string): Promise<any> {
    return confirmationResult.confirm(OTPCode)
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.statusLoginFail = false;
        // console.log(user)
        // console.log(this.authState)
        const _user: any = user.user;
        if (_user.emailVerified) {
          // ACCOUNT EMAIL VERIFIED
          this.firestore.collection('user-seller').doc(_user.uid).get().toPromise()
            .then((val) => {
              // GET USER SELLER DES
              // console.log(val.data())
              if (val.data() != undefined) {
                // HAVE ACCOUNT SELLER
                const _userSeller: any = val.data()
                if (_userSeller.emailVerifyAt == null) {
                  // FIRST TIME LOGIN AFTER EMAIL VERIFIED => UPDATE DATA USER SELLER
                  this.firestore.collection('user-seller').doc(_user.uid).update({
                    emailVerifyAt: firebase.firestore.Timestamp.now(),
                    shopStatus: 'waitingPhoneNumberVerify',
                  })
                    .then(() => {
                      // FIRST TIME LOGIN AFTER EMAIL VERIFIED => UPDATE DATA SHOP
                      this.firestore.collection('shop').doc(_user.uid).update({
                        emailVerifyAt: firebase.firestore.Timestamp.now(),
                        shopStatus: 'waitingPhoneNumberVerify',
                      })
                        .then(() => {
                          // console.log(_user.user.uid)
                          // FIRST TIME LOGIN AFTER EMAIL VERIFIED => UPDATE USER SELLER PAGE
                          this.router.navigate([`/update-user-seller`])
                        })
                    })
                }
                else {
                  // console.log(_userSeller)
                  // THEN UPDATE EMAIL VERIFYAT = TIMESTAMP
                  if (_userSeller.shopStatus == 'waitingPhoneNumberVerify') {
                    // NOT VERIFIED PHONE NUMBER & USER DATA => UPDATE USER SELLER PAGE
                    this.router.navigate([`/update-user-seller`]);
                  }
                  else if (_userSeller.shopStatus == 'waitingUpdateUserData') {
                    // NOT UPDATE USER SELLER & USER DATA => UPDATE USER SELLER PAGE
                    this.router.navigate([`/update-user-seller`]);
                  }
                  else if (_userSeller.shopStatus == 'waitingApproval' && _userSeller.checkStatus == false) {
                    // NOT UPDATE USER SELLER & USER DATA => UPDATE USER SELLER PAGE
                    this.router.navigate(['/profile-settings']);
                  }
                  else if (_userSeller.shopStatus == 'waitingApproval' && _userSeller.checkStatus == true) {
                    // NOT UPDATE USER SELLER & USER DATA => UPDATE USER SELLER PAGE
                    this.router.navigate(['/add-product']);
                  }
                }
              }
              else {
                // NO ACCOUNT SELLER
                this.firestore.collection('user-buyer').doc(_user.uid).get().toPromise()
                  .then((val) => {
                    // console.log(val.data())
                    if (val.data() != undefined) {
                      const _userBuyer: any = val.data()
                      var _timeStmap: any = firebase.firestore.Timestamp.now();
                      //  SET DATA SHOP DES
                      this.afs.collection('shop').doc(_user.uid).set({
                        createAt: _timeStmap,
                        shopStatus: 'waitingUpdateUserData',
                        uid: _user.uid,
                        email: _user.email,
                        shopName: null,
                        shopDescription: null,
                        foundationType: false,
                        groupProduct: null,
                        checkStatus: false,
                        profileImg: {
                          imgUrl: null,
                          imgpath: null
                        },
                        coverImg: {
                          imgUrl: null,
                          imgpath: null
                        },
                        shopAddress: null
                      })
                        .then(() => {
                          // SET USER SELLER DES
                          this.afs.collection('user-seller').doc(_user.uid).set({
                            createAt: _timeStmap,
                            shopStatus: 'waitingUpdateUserData',
                            emailVerifyAt: _timeStmap,
                            uid: _user.uid,
                            email: _user.email,
                            displayName: this.authState.displayName,
                            checkStatus: false,
                            foundationType: false,
                            name: _userBuyer.name,
                            lastName: _userBuyer.lastName,
                            phoneNumber: _userBuyer.phoneNumber,
                            phoneNumberVerifyAt: _userBuyer.phoneNumberVerifyAt,
                            shopName: null,
                            shopDescription: null,
                            shopAddress: null,
                            refCode: null,
                            yourRefCode: _userBuyer.yourRefCode,
                            shopType: null,
                            bookbank: null,
                            profileImg: {
                              imgUrl: null,
                              imgpath: null
                            },
                            coverImg: {
                              imgUrl: null,
                              imgpath: null
                            },
                            percenFinance: {
                              debitCredit: 5,
                              debitCreditInter: 5,
                              eWallet: 5,
                              qrPayment: 5
                            },
                            percenCancelOrder: 5
                          })
                            .then(() => {
                              // ADD SUB COLLECTION LINKFILE 
                              // console.log(this.authState)
                              this.afs.collection('user-seller').doc(_user.uid).collection('linkFile').add({
                                idCard: null,
                                houseRegis_dbdFive: null,
                                bookBank: null,
                                vatRegis: null
                              })
                                .then(() => {
                                  this.router.navigate([`/update-user-seller`]);
                                })
                            })
                        })
                    }
                  })
              }
            })
        }
        else {
          // ACCOUNT EMAIL NOT VERIFIED
          this.afAuth.signOut()
            .then((msg) => {
              this.router.navigate(['/check-email-verify'])
            })
            // ERROR SIGNOUT
            .catch(error => console.log(error));
        }
      })
      .catch(error => {
        // console.log(error)
        if (error) {
          this.statusLoginFail = true;
        }
      });

  }

  resetPassword(email: string) {
    const fbAuth = firebase.auth();
    return fbAuth.sendPasswordResetEmail(email)
  }

  getCurrentLoggedIn() {
    // console.log(this.router.url)
    this.afAuth.authState.subscribe(auth => {
      // console.log(auth)
      if (this.authState != null) {
        // LOGIN SUCCESS
        if (this.router.url == '/signup' || this.router.url == '/login' || this.router.url == '/check-email-verify') {
          // ROUTER URL = SIGNUP
          // ROUTER URL = LOGIN
          // console.log(this.authState)
          this.firestore.collection('user-seller').doc(this.authState.uid).get().toPromise()
            .then((val) => {
              // GET USER SELLER DES
              const _userSeller: any = val.data()
              // console.log(_userSeller)
              // THEN UPDATE EMAIL VERIFYAT = TIMESTAMP
              if (_userSeller.shopStatus == 'waitingPhoneNumberVerify') {
                // NOT VERIFIED PHONE NUMBER & USER DATA => UPDATE USER SELLER PAGE
                this.router.navigate([`/update-user-seller`]);
              }
              else if (_userSeller.shopStatus == 'waitingUpdateUserData') {
                // NOT UPDATE USER SELLER & USER DATA => UPDATE USER SELLER PAGE
                this.router.navigate([`/update-user-seller`]);
              }
              else if (_userSeller.shopStatus == 'waitingApproval' && _userSeller.checkStatus == false) {
                // NOT UPDATE USER SELLER & USER DATA => UPDATE USER SELLER PAGE
                this.router.navigate(['/profile-settings']);
              }
              else if (_userSeller.shopStatus == 'waitingApproval' && _userSeller.checkStatus == true) {
                // NOT UPDATE USER SELLER & USER DATA => UPDATE USER SELLER PAGE
                this.router.navigate(['/add-product']);
              }
            })
        }
      }
      else {
        // NOT LOGIN
        // THIS FOR CHECK EMAIL VERIFY PAGE [NO LOGIN]
        // THIS FOR EMAIL VERIFY PAGE [NO LOGIN && => GO TO LOGIN]
        // NO ACTION ROUTER URL
      }
    })
  }

  signOut(): void {
    this.afAuth.signOut()
      .then((msg) => {
        // console.log(msg)
        // this.authState = null;
        // this.addData = false;
        this.router.navigate(['/login'])
      })
      .catch(error => {
        console.log(error)
      });
  }

  // OLD VERSION
  emailSignUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        // Add Data Shop Description
        this.afs.collection('shop').doc(this.authState.user.uid).set({
          createAt: firebase.firestore.Timestamp.now(),
          shopStatus: 'waitingApproval',
          uid: this.authState.user.uid,
          email: this.authState.user.email,
          shopName: null,
          shopDescription: null,
          foundationType: false,
          groupProduct: null
        });
        // Add Data User
        this.afs.collection('user-seller').doc(this.authState.user.uid).set({
          createAt: firebase.firestore.Timestamp.now(),
          shopStatus: 'waitingApproval',
          uid: this.authState.user.uid,
          email: this.authState.user.email,
          displayName: this.authState.user.displayName,
          checkStatus: false,
          foundationType: false,
          name: null,
          lastName: null,
          phoneNumber: null,
          shopName: null,
          shopDescription: null,
          shopAddress: null,
          refCode: null,
          shopType: null,
          bookbank: null,
          profileImg: {
            imgUrl: null,
            imgpath: null
          },
          coverImg: {
            imgUrl: null,
            imgpath: null
          }
        });
        // Add Sub Col File
        this.afs.collection('user-seller').doc(this.authState.user.uid).collection('linkFile').add({
          idCard: null,
          houseRegis_dbdFive: null,
          bookBank: null,
          vatRegis: null
        });
      })
      .catch(error => console.log(error));
  }

  // verifyOTP(OTPCode){
  //   this.confirmationResult.confirm(OTPCode)
  //   .then(() => {
  //     // OTP VERIFIED
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //     if(error){
  //       this.statusVerifyOTPFail = true;
  //     }
  //   });
  // }

  // linkWithPhoneNumber(phoneNumber: string, applicationVerifier) {
  //   // var phoneNumber = "+66655551111";
  //   // var testVerificationCode = "654321";
  //    this.authState.linkWithPhoneNumber(phoneNumber, applicationVerifier)
  //   .then((confirmationResult) => {
  //     console.log(confirmationResult)
  //     this.confirmationResult = confirmationResult;
  //     // return this.confirmationResult
  //     // return confirmationResult.confirm('654321');
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //     if(error){
  //       this.statusPhoneConfirmFail = true;
  //     }
  //   });
  // }

  // sendSignInLinkToEmail(email: string) {
  //   var actionCodeSettings = {
  //     // URL you want to redirect back to. The domain (www.example.com) for this
  //     // URL must be in the authorized domains list in the Firebase Console.
  //     // url: 'https://www.example.com/finishSignUp?cartId=1234',
  //     url: 'http://localhost:4200/verify-email?email=' + email,
  //     // This must be true.
  //     handleCodeInApp: true,
  //     // iOS: {
  //     //   // bundleId: 'com.example.ios'
  //     //   bundleId: 'https://abidmore-seller.firebaseapp.com/login'
  //     // },
  //     // android: {
  //     //   // packageName: 'com.example.android',
  //     //   packageName: 'https://abidmore-seller.firebaseapp.com/login',
  //     //   installApp: true,
  //     //   minimumVersion: '12'
  //     // },
  //     // dynamicLinkDomain: 'example.page.link'
  //     // dynamicLinkDomain: 'https://abidmore-seller.firebaseapp.com/login'
  //   };

  //   this.afAuth.sendSignInLinkToEmail(email, actionCodeSettings)
  //     .then(() => {
  //       // The link was successfully sent. Inform the user.
  //       // Save the email locally so you don't need to ask the user for it again
  //       // if they open the link on the same device.
  //       window.localStorage.setItem('emailForSignIn', email);
  //       // ...
  //       this.afAuth.signOut()
  //         .then((msg) => {
  //           // this.authState = null;
  //           this.router.navigate(['/check-email-verify'])
  //         })
  //         .catch(error => console.log(error));
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //       // ...
  //     });
  // }

}
