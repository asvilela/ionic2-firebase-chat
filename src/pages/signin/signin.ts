import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';

import { AuthService } from './../../providers/auth/auth.service';
import { HomePage } from './../home/home';
import { SignupPage } from './../signup/signup';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signinForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams,
  ) {
    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signinForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  onSubmit(): void {

    let loading: Loading =  this.showLoading();

    this.authService.signinWithEmail(this.signinForm.value)
      .then((isLogged: Boolean) => {

        if(isLogged) {
          this.navCtrl.setRoot(HomePage); 
          loading.dismiss();
        }
        else {

        }

      }).catch((error: any) => {
        console.log(error);
        loading.dismiss();
        this.showAlert(error);
      }); 
  }

  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });    

    loading.present();

    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['OK']
    }).present();
  }

  // onHomePage(): void {
  //   this.navCtrl.push(HomePage)
  //   .then((hasAccess) => {
  //     console.log('Autorizado!', hasAccess);
  //   }).catch((error) => {
  //     console.log('Não autorizado!', error);
      
  //   });
  // }

  // onLogout(): void {
  //   this.authService.logout();
  // }

}
