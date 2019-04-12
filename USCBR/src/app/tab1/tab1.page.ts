
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Observable } from 'rxjs';
import {
  ToastController,
  Platform,
  LoadingController
} from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  roomsObservable:Observable<any[]>;
  rooms:Array<any>=[];
  map: GoogleMap;
  loading: any;

  constructor(
    public loadingCtrl: LoadingController,
    private router: Router,
    public toastCtrl: ToastController,
    public itemService: ItemService,
    private platform: Platform) { }

  loginAtStart(){
    this.router.navigate(['/login']);
  }

  async ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    this.roomsObservable = this.itemService.getRooms();
    console.log('imported items');
    this.roomsObservable.subscribe(rooms => {
      this.rooms = rooms;
    })
    console.log('item: ' + this.rooms.values);
    if(this.rooms != undefined) {
      console.log('There are ' + this.rooms.length + ' items in menu.');
    }
    await this.platform.ready();
    await this.loadMap();
  }

  roomDetailPage(room) {
    console.log('Item detail: ' + room);
  	this.router.navigate(["/details", room]);
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 43.0741704,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    });

  }

  async onButtonClick() {
    this.map.clear();

    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await this.loading.present();

    // Get the location of you
    this.map.getMyLocation().then((location: MyLocation) => {
      this.loading.dismiss();
      console.log(JSON.stringify(location, null ,2));

      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 17,
        tilt: 30
      });

      // add a marker
      let marker: Marker = this.map.addMarkerSync({
        title: '@ionic-native/google-maps plugin!',
        snippet: 'This plugin is awesome!',
        position: location.latLng,
        animation: GoogleMapsAnimation.BOUNCE
      });

      // show the infoWindow
      marker.showInfoWindow();

      // If clicked it, display the alert
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        this.showToast('clicked!');
      });
    })
    .catch(err => {
      this.loading.dismiss();
      this.showToast(err.error_message);
    });
  }

  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }




}

