import { AsyncPipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { type Point } from '../services/api.service';
import { MapLoaderService } from '../services/map-loader.service';
import { IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  standalone: true,
  imports: [IonButton, GoogleMap, MapMarker, MapInfoWindow, AsyncPipe],
})
export class MapsComponent implements OnInit {
  @Input() pointList: Point[] = [];
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  mapsLib = inject(MapLoaderService)

  selectedPoint: Point | null = null;

  center = { lat: 0, lng: 0 };
  zoom = 3;

  constructor() { }

  ngOnInit() {
    this.mapsLib.load()
  }

  openInfoWindow(marker: MapMarker, content: Point) {
    this.selectedPoint = content;
    this.infoWindow.open(marker)
  }
}
