import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CargoAndVehicle  } from 'src/app/interfaces/location';
import { ProjectService } from 'src/app/services/project.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-booking-review',
  templateUrl: './booking-review.component.html',
  styleUrls: ['./booking-review.component.scss']
})
export class BookingReviewComponent {
  bookingsData: any;
  isAgreed = false;
  constructor(private session: SessionService, private location: Location,private project: ProjectService) { }
  ngOnInit(): void {
   this.bookingsData =  this.session.getItem();
  }

  goBack(){
    this.location.back();
  }

  booked(){
   if(this.isAgreed){
    this.project.booked(this.bookingsData)
   }
    
  }
 
}
