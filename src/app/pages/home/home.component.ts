import { Component, OnInit, ViewChild } from '@angular/core';

import { StorageService } from '../../services/storage.service';


declare const google: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public isLogin: boolean;
  public map: any;
  @ViewChild('mapElement', { static: true }) mapElement;

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    // map initiolization map
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: new google.maps.LatLng(19.965731, 73.826119),
    });
  }

  userLogout(): void {
    this.storageService.logOut();
  }
}
