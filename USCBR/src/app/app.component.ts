import { Component } from '@angular/core';
import { LoginPage } from './login/login.page';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  rootPage:any = 'login';
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.hide();
      this.splashScreen.hide();
      this.rootPage = LoginPage;
    });
  }
}
