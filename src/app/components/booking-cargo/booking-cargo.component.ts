import { Location } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CargoAndVehicle } from 'src/app/interfaces/location';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-booking-cargo',
  templateUrl: './booking-cargo.component.html',
  styleUrls: ['./booking-cargo.component.scss']
})
export class BookingCargoComponent {
  @Output() goNext = new EventEmitter<boolean>();

  cars = [
    {id:1,img:"pickup_truck.png", title: "Pickup Truck", dis: 'Great for 1-2 pieces of furniture, mattress, small appliances, lumber'},
    {id:2,img:"cargo_van.png", title: "cargo van", dis: 'Ideal for sectional sofas, small home moves, pallets, large parcels'},
    {id:3,img:"box_truck.png", title: "box truck", dis: 'Great for Pallets, LTL freight, FTL freight, Home Moves'},
    {id:4,img:"new_car.png", title: "courier", dis: 'Small parcels or packages under 50 lbs. No manual labor or heavy lifting'},
  ]

  selectId = 1
  helper= false;
 

  constructor(
    private location: Location,
    private session: SessionService
  ) {}
  
  select(id:number){
    this.selectId = id;
  }

  addHelper(flag:boolean){
    this.helper = flag? true: false;
  }


  goBack() {
    this.location.back();
  }

  setVehicle() {
    const vehcle = this.cars.find(car=> car.id === this.selectId)
    this.session.setItem({vehcle: {helper: this.helper, ...vehcle}})
    this.goNext.emit(true)
  }

  ngOnInit(){
    const data = this.session.getItem();
    if (data && data.vehcle) {
      this.selectId = data.vehcle.id;
      this.helper = data.vehcle.helper;
    }
  }
  
}
