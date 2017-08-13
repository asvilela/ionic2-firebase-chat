import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AuthService } from './../providers/auth/auth.service';
import { CapitalizePipe } from './../pipes/capitalize.pipe';
import { ChatService } from './../providers/chat/chat.service';
import { ChatPage } from './../pages/chat/chat';
import { CustomLoggedHeaderComponent } from './../components/custom-logged-header/custom-logged-header.component';
import { HomePage } from '../pages/home/home';
import { MessageBoxComponent } from './../components/message-box/message-box.component';
import { MessageService } from './../providers/message/message.service';
import { MyApp } from './app.component';
import { ProgressBarComponent } from './../components/progress-bar/progress-bar.component';
import { SigninPage } from './../pages/signin/signin';
import { SignupPage } from './../pages/signup/signup';
import { UserInfoComponent } from './../components/user-info/user-info.component';
import { UserMenuComponent } from './../components/user-menu/user-menu.component';
import { UserProfilePage } from './../pages/user-profile/user-profile';
import { UserService } from './../providers/user/user.service';

import { AngularFireModule, AuthMethods, AuthProviders, FirebaseAppConfig } from 'angularfire2';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyACvVBfG7oJ6ucDfb3mng90wM1fG1_dghk",
  authDomain: "ionic2-firebase-chat-88c28.firebaseapp.com",
  databaseURL: "https://ionic2-firebase-chat-88c28.firebaseio.com",
  storageBucket: "ionic2-firebase-chat-88c28.appspot.com",
  messagingSenderId: "36329347444"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Custom,
  method: AuthMethods.Password
};



@NgModule({
  declarations: [
    CapitalizePipe,
    ChatPage,
    CustomLoggedHeaderComponent,
    HomePage,
    MessageBoxComponent,
    MyApp,
    ProgressBarComponent,
    SigninPage,
    SignupPage,
    UserInfoComponent,
    UserMenuComponent,
    UserProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig, firebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ChatPage,
    HomePage,
    MyApp,
    SigninPage,
    SignupPage,
    UserProfilePage
  ],
  providers: [
    AuthService,
    ChatService,
    MessageService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService
  ]
})
export class AppModule {}
