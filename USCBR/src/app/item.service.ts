import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
// import { AngularFireDatabase } from '@angular/fire/database';

import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'Firebase';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  //define some data containers such as arrays to store items
  items:Observable<any[]>;
  orders:Observable<any[]>;
  database: AngularFirestore;
  cartitems:Observable<any[]>;
  mycartitems=[];
  mycartitems_withkey=[];
  myusers =[];
  usertype="visitor"; //by default

  userdb = firebase.database().ref('items');


  constructor(public db: AngularFirestore,
    public afAuth: AngularFireAuth) { 
    this.database=db;
    console.log("loading saved items and orders");
    this.items = db.collection('items').valueChanges();
    // this.orders = db.collection('orders').valueChanges();
    let users = db.collection('users').valueChanges();
    console.log(users);
    users.subscribe(items => {
      this.myusers = items;
      // this.mycartitems = snapshotToArray(items);
      console.log(this.myusers.length);
    });
  }

  getOrderItems(id){
      var userid = firebase.auth().currentUser.uid;
      console.log(id +"   orderid");
      let myorder = this.db.collection('orders',ref => ref.where('id', '==', id)).valueChanges();
      
      // this.product = this.orders.doc(query.id).valueChanges();
      return myorder;

      
  }

  getusertype(userid){
    // console.log(this.myusers.length +" users found");
    // console.log(userid);
    for (var i = this.myusers.length - 1; i >= 0; i--) {
      if(this.myusers[i].uid == userid){
        console.log(this.myusers[i].email +" "+this.myusers[i].usertype);
        this.usertype = this.myusers[i].usertype;
        return this.myusers[i].usertype;

      }
      
    }
  }

  //provide functions to get items
  getItems(){
    console.log('getting items...' + this.items);
    return this.items;
  }

  loadOrders(){ //load my orders
    var userid = firebase.auth().currentUser.uid;
    this.orders = this.database.collection('orders',ref => ref.where('userid', '==', userid)).valueChanges();
    return this.orders;
  }

  loadCartItems(){
    var userid = firebase.auth().currentUser.uid;
    this.cartitems = this.db.collection('cartitems',ref => ref.where('userid', '==', userid)).valueChanges();
    console.log("cart loaded...")

    this.cartitems.subscribe(items => {
      this.mycartitems = items;

      console.log(this.mycartitems.length);
      if(this.mycartitems != undefined) {
      console.log('There are ' + this.mycartitems.length + ' items in cart.');
      }
      else{
        console.log("no items found");
      }

    });



    return this.cartitems;
  }

  //get them orders boi
  getOrders(){

    console.log('gettings orders...' + this.orders);
    return this.orders;
  }

  createItem(name, price, category, photo,description){
    let ownerid =firebase.auth().currentUser.uid;

    this.db.collection('/items').add({
      "ownerid":ownerid, 
      "name":name, 
      "price": price, 
      "category":category, 
      "photo":photo, 
      "description":description
    });
  }

  add2cart(quantity, item_price, item_name) {
    let userid =firebase.auth().currentUser.uid;
    console.log(userid);

    let doc = this.db.collection('/cartitems').add({
      "userid":userid, 
      "quantity":quantity, 
      "price": item_price, 
      "item_name":item_name, 
    });
    doc.then(function(docRef){
      console.log(docRef.id+"  id added");
      docRef.update("id",docRef.id);
    });

  }

  //check out all the cart items and create the order
  createOrder() {
    console.log("creating order....");
    let userid =firebase.auth().currentUser.uid;
    console.log(userid);
    let quantity=0;
    let total_price=0;
    let date = "";


    for (var i = this.mycartitems.length - 1; i >= 0; i--) {
      console.log(this.mycartitems[i]);
      quantity=quantity+parseInt(this.mycartitems[i].quantity);
      total_price= total_price+parseInt(this.mycartitems[i].quantity)*parseFloat(this.mycartitems[i].price);
    }


    // let items=[{name:"fish",price:12},{name:"beef",price:12}];

    this.db.collection('/orders').add({
      "userid":userid, 
      "quantity":quantity, 
      "total_price": total_price, 
      "items":this.mycartitems, 
      "date":date
    }).then(function(docRef){  //add unique ide to order object.
      console.log(docRef.id+"  id added");
      docRef.update("id",docRef.id);
    });

    for (var i = this.mycartitems.length - 1; i >= 0; i--) {
      console.log(this.mycartitems[i].id);
      this.db.collection('/cartitems').doc(this.mycartitems[i].id).delete().then(function() {
          console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
     }



  }

  createUser(user) {
    console.error("creating user data with this information...\npassword: " + user.password + "\nusername: " + user.username);

    this.afAuth.auth.createUserWithEmailAndPassword(user.username, user.password)
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("ERROR: " + errorMessage + "/nError Code: " + errorCode);
    });

    this.afAuth.auth.onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
          this.db.collection('/users').add({
            "uid": firebaseUser.uid, 
            "username": user.email, 
          });
      } else {
        console.log("user null");
      }
    });
  }



}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.id = childSnapshot.key;
      // console.log(item);
      returnArr.push(item);
  });

  return returnArr;
}