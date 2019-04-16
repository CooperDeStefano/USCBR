import { Component } from '@angular/core';
import { LoginPage } from './login/login.page';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Environment } from '@ionic-native/google-maps';


@Component({
  selector: 'app-root',
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public rootPage: any;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      Environment.setEnv({
        // api key for server
        'API_KEY_FOR_BROWSER_RELEASE': '(AIzaSyCS5zaV-WWGa5dYewzy0p7HSL28WU3Bv_M)',

        // api key for local development
        'API_KEY_FOR_BROWSER_DEBUG': '(AIzaSyCS5zaV-WWGa5dYewzy0p7HSL28WU3Bv_M)'
      });
      this.statusBar.hide();
      this.splashScreen.hide();
      this.rootPage = LoginPage;
    });
  }
}
