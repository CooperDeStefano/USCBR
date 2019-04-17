import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  signIn() {
    console.log('Logged in successfully');

  }

  toProfile(){
    this.router.navigate(['/tab2']);
  }
  toSignUp(){
    this.router.navigate(['/signup']);
  }

}
