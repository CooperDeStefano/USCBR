import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private router: Router
  ) { }

  signOut(){
    this.router.navigate(['']);
  }
  toSignUp(){
    this.router.navigate(['/signup']);
  }
  toProfile(){
    this.router.navigate(['/tab2']);
  }
  toSettings(){
    this.router.navigate(['/settings']);
  }
}
