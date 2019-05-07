import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import * as firebase from 'Firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  new_item_form: FormGroup;

  userdb = firebase.database().ref('items');

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    public itemService: ItemService
  ) { }

  ngOnInit() {
    this.new_item_form = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  login(item){
    var self=this;
    var email=item.email;
    var password=item.password;
    console.log(email+"   "+password);

    var valid = true;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        

        if (errorCode === 'auth/wrong-password') {
              alert('Wrong password.');
              valid = false;
        }
        else if (errorCode === 'auth/user-not-found'){
          alert("User does not exist");
          valid = false;
        }
        console.log(error);
      }
    ).then(function(result){
          console.log("check 1" + valid);
          let userid = firebase.auth().currentUser.uid;
          console.log(userid + "logged in")

          let usertype = self.itemService.getusertype(userid);
          console.log(usertype);
          if(valid = true) {
            console.log("check 2" + valid);
            //self.router.navigate(["/profile"]);
          }
    });
    } 

  toProfile(){
    this.router.navigate(['/tab2']);
  }
  toSignUp(){
    this.router.navigate(['/signup']);
  }

}
