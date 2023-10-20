import { Component, Input } from '@angular/core';
import { CargoAndVehicle ,Location } from 'src/app/interfaces/location';

@Component({
  selector: 'app-booking-review',
  templateUrl: './booking-review.component.html',
  styleUrls: ['./booking-review.component.scss']
})
export class BookingReviewComponent {
 @Input()  location: Location | undefined;
 @Input()  cargoAndVehicle: CargoAndVehicle | undefined;
}
