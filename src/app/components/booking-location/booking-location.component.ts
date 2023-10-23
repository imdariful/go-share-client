import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { Location } from 'src/app/interfaces/location';
import { AuthService } from 'src/app/services/auth.service';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Component({
  selector: 'app-booking-location',
  templateUrl: './booking-location.component.html',
  styleUrls: ['./booking-location.component.scss']
})
export class BookingLocationComponent {
  @Output() setLocation = new EventEmitter<Location>();


  minDate: Date;
  minTime: Date | undefined;

  registrationForm: FormGroup;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private auth: AuthService,
  ) {
    this.minDate = new Date();
    this.minTime = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.minTime.setHours(0);
    this.minTime.setMinutes(0);
    this.registrationForm = this.fb.group({
      load_location: ['', [Validators.required]],
      unload_location: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
    })
  }


  async getLocation_Time() {
    if (this.registrationForm.valid) {

      const loaction_Time = this.registrationForm.value;
      console.log(loaction_Time);
      this.setLocation.emit(loaction_Time);
      // this.registrationForm.reset();
    }else{
      throw new Error('Invalid form');
    }
  }

  ngOnInit(): void {
    this.initializeGeocoder();
  }

  @ViewChild('load_location') locationInput: any;
  mapboxGeocoder: any; // Reference to the Mapbox Geocoder control

 

  searchLocation() {
    const searchTerm = this.locationInput.nativeElement.value;
    this.mapboxGeocoder.query(searchTerm);
  }

  initializeGeocoder() {
    this.mapboxGeocoder = new MapboxGeocoder({
      accessToken: 'pk.eyJ1IjoiYXNpZnVycmFobWFucGlhbCIsImEiOiJjbG5qd29ldTEwMjdsMnBsazFsaW1xcm5rIn0.L5kKxav_0VTewsxlvWUS2g',
      mapboxgl: mapboxgl
    });

    this.mapboxGeocoder.on('result', (e: any) => {
      // Handle the selected location data
      console.log('Selected location:', e.result);
    });
  }



}
