import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
//import { NavController } from 'ionic-angular';
import { ItemService } from '../item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Geolocation,GeolocationOptions,Geoposition } from '@ionic-native/geolocation/ngx';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';
import {
  ToastController,
  Platform,
  LoadingController
} from '@ionic/angular';
import { firestore } from 'firebase';

declare var google;

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  current_room:any;
  current_room_pos:any;
  roomsObservable:Observable<any[]>;
  rooms:Array<any>=[];
  map: GoogleMap;
  loading: any;
  location: {
    latitude: number,
    longitude: number
  };
  options : GeolocationOptions;
  currentPos : Geoposition;
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;
 

  constructor(public itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router,
    public geolocation: Geolocation,
    //public navCtrl: NavController,
    public loadingCtrl: LoadingController) { 
  
  }

 async ngOnInit() {
   await this.route.params.subscribe(
      param => {
        console.log(param);
        this.current_room = JSON.parse(param.data);
        // this.current_room_pos = param.latlong;
        // console.log("$$$$" + this.current_room_pos._lat);
        console.log("lat is" + this.current_room.address);
        console.log("lat is" + this.current_room);
        console.log("lat is" + this.current_room.latlong._lat);
        
    
      }
    );
   this.findUserLocation();
  }


 async findUserLocation(){
    this.options = {
      enableHighAccuracy : true,
      timeout: 25000
  };

   await this.geolocation.getCurrentPosition(this.options).then((position) => {
      console.log("setting your lat and long");
      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      console.log("My location:" + this.location);
      this.loadMap();
      //this.directionsDisplay.setMap(Map);


     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }






  loadMap() {


    var start = new google.maps.LatLng(this.location.latitude,this.location.longitude);
    var end = new google.maps.LatLng(this.current_room.latlong._lat,this.current_room.latlong._long);
    var mapOptions = {
      zoom: 15,
      center: start
    }

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // this.map = GoogleMaps.create('map_canvas', {
    //   camera: {
    //     target: {
    //       lat: 33.996041,
    //       lng: -81.027363
    //     },
    //     zoom: 15,
    //     tilt: 30
    //   }
    // });


    let directionsService = new google.maps.DirectionsService;
    let  directionsDisplay = new google.maps.DirectionsRenderer;
  


    directionsService.route({
      origin: new google.maps.LatLng(this.location.latitude,this.location.longitude),
      destination:new google.maps.LatLng(this.current_room.latlong._lat,this.current_room.latlong._long),
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directionsPanel'));
    
        // console.log("adding marker for room");
        // console.log(this.current_room.latLng);
        // let marker: Marker = this.map.addMarkerSync({
        //   title: this.current_room.address,
        //   position: {lat:this.current_room.latLng.lat, lng:this.current_room.latLng.lng}
        //   //animation: GoogleMapsAnimation.BOUNCE
        // });

    
    
  

  
    // this.route.params.subscribe(
    //   param => {
    //     this.current_room = param;
    //     console.log("adding marker for room");
    //     let marker: Marker = this.map.addMarkerSync({
    //       title: this.current_room.address,
    //       position: {lat:this.current_room.latlong._lat, lng:this.current_room.latlong._long}
    //       //animation: GoogleMapsAnimation.BOUNCE
    //     });
    //     console.log("added marker for room");


    // });

    // this.map.getMyLocation().then((location: MyLocation) => {
    //   //this.loading.dismiss();
    //   //console.log(JSON.stringify(location, null ,2));
    //   this.map.animateCamera({
    //     target: location.latLng,
    //     zoom: 17,
    //     tilt: 30
    //   });
    //   // add a marker
    //   let marker: Marker = this.map.addMarkerSync({
    //     title: 'You',
    //     snippet: 'current location',
    //     position: location.latLng,
    //     animation: GoogleMapsAnimation.BOUNCE
    //   });
    
  // })

}

}


