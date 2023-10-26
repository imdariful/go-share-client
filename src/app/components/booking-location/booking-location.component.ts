import { Component, EventEmitter, Output } from '@angular/core';
import { Location } from 'src/app/interfaces/location';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-booking-location',
  templateUrl: './booking-location.component.html',
  styleUrls: ['./booking-location.component.scss']
})
export class BookingLocationComponent {
  @Output() setLocation = new EventEmitter<Location>();

  // time and date variables
  time!: string;
  date!: string;

  // location variables
  focus: string = 'start';
  error!: string;
  startLocation!: string;
  endLocation!: string;
  startCoordinates!: [number, number]
  endCoordinates!: [number, number]
  onStartHide: boolean = false;
  onEndHide: boolean = false;
  locationsuggestions: any[] = [];


  constructor(
    private locationService: LocationService
  ) {
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
    this.locationService.getSuggestions(place).subscribe((data: any) => {
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
    if (this.startLocation && this.endLocation && this.time && this.date) {
      if (this.startLocation.includes("Bangladesh") && this.endLocation.includes("Bangladesh")) {
        this.locationService.getDistance(this.startCoordinates, this.endCoordinates).subscribe((source: any) => {
          const { duration, distance } = source.routes[0];
          if (duration && distance >= 3000) {
            this.setLocation.emit({
              startCoordinates: this.startCoordinates,
              startLocation: this.startLocation,
              endCoordinates: this.endCoordinates,
              endLocation: this.endLocation,
              time: this.time,
              date: this.date,
              duration,
              distance,
            })
          } else {
            this.error = "Distance must be greater than 3km";
          }
        });
      } else {
        this.error = "Both locations must be in Bangladesh";
      }
    } else {
      this.error = "Please fill all the fields";
    }
  }



}
