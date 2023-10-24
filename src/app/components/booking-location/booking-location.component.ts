import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { Location } from 'src/app/interfaces/location';
import { AuthService } from 'src/app/services/auth.service';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { HttpClient } from '@angular/common/http';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-booking-location',
  templateUrl: './booking-location.component.html',
  styleUrls: ['./booking-location.component.scss']
})
export class BookingLocationComponent {
  @Output() setLocation = new EventEmitter<Location>();

  // time and date variables
  time: string | undefined;
  date: string | undefined
  minDate: Date;
  minTime: Date | undefined;

  // location variables
  focus: string = 'start';
  startLocation: string | null = null;
  endLocation: string | null = null;
  startCoordinates!: [number, number]
  endCoordinates!: [number, number]
  onStartHide: boolean = false;
  onEndHide: boolean = false;
  locationsuggestions: any[] = [];


  constructor(
    private route: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private http: HttpClient,
    private locationService: LocationService
  ) {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiYXNpZnVycmFobWFucGlhbCIsImEiOiJjbG5qd29ldTEwMjdsMnBsazFsaW1xcm5rIn0.L5kKxav_0VTewsxlvWUS2g';

    // time & date configaration
    this.minDate = new Date();
    this.minTime = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.minTime.setHours(0);
    this.minTime.setMinutes(0);

    // set location from map to input field
    this.locationService.getStartLocation().subscribe((data: any) => {
      this.startCoordinates = data.coordinates
      this.startLocation = data.placeName;
      this.onStartHide = false;
    })
    this.locationService.getEndLocation().subscribe((data: any) => {
      this.endCoordinates = data.coordinates
      this.endLocation = data.placeName;
      this.onEndHide = false
    })
  }


  onFucusChange(map: string) {
    this.focus = map
  }


  setLocationsuggestions(place: any) {
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${mapboxgl.accessToken}`;
    this.http.get(apiUrl).subscribe((data: any) => {
      this.locationsuggestions = data.features.map((feature: any) => {
        return { placeName: feature.place_name, coordinates: feature.geometry.coordinates }
      });
    });
  }

  searchStartLocations() {
    this.setLocationsuggestions(this.startLocation)
    this.onStartHide = true
  }


  searchEndLocation() {
    this.setLocationsuggestions(this.endLocation)
    this.onEndHide = true
  }

  setStartLocation(e: any) {
    this.locationService.setStartLocation(e);
    this.startCoordinates = e.coordinates
    this.startLocation = e.placeName;
    this.onStartHide = false;
  }

  setEndLocation(e: any) {
    this.locationService.setEndLocation(e)
    this.endCoordinates = e.coordinates
    this.endLocation = e.placeName
    this.onEndHide = false
  }
  onSubmit() {
    console.log({
      startCoordinates: this.startCoordinates,
      startLocation: this.startLocation,
      endCoordinates: this.endCoordinates,
      endLocation: this.endLocation,
      time: this.time,
      date: this.date
    });
    console.log("object");
  }



}
