import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-cargo',
  templateUrl: './booking-cargo.component.html',
  styleUrls: ['./booking-cargo.component.scss']
})
export class BookingCargoComponent {
  constructor(private route: Router) {}

  ngOnInit(): void {
    console.log(this.route.url);
  }
}
