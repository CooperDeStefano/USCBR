import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  current_room:any;


  constructor(public itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router) { 
  
  }

  ngOnInit() {
    this.route.params.subscribe(
      param => {
        this.current_room = param;
        console.log('Selected item detail: ' + this.current_room.name);
      }
    )

  }

}
