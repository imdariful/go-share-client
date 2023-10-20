import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-location',
  templateUrl: './booking-location.component.html',
  styleUrls: ['./booking-location.component.scss']
})
export class BookingLocationComponent {
  constructor(private route: Router) {}

  ngOnInit(): void {
    console.log(this.route.url);
  }
}
