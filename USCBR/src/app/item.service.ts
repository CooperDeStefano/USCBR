import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root'
})

export class ItemService {
    //define some data containers such as arrays to store items
    rooms:Observable<any[]>;
  
    constructor(public db: AngularFirestore) { 
      console.log("loading saved items and orders");
      this.rooms = db.collection('restrooms').valueChanges();
    }

    //provide functions to get items
  getRooms(){
    console.log('getting items...' + this.rooms);
    return this.rooms;
  }


}