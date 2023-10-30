import { cargoItems } from './../../config/cargoItem';
import { Location } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CargoAndVehicle } from 'src/app/interfaces/location';
import { Truck } from 'src/app/interfaces/truck';
import { ProjectService } from 'src/app/services/project.service';
import { SessionService } from 'src/app/services/session.service';


@Component({
  selector: 'app-booking-cargo',
  templateUrl: './booking-cargo.component.html',
  styleUrls: ['./booking-cargo.component.scss']
})
export class BookingCargoComponent {
  @Output() goNext = new EventEmitter<boolean>();

  cars: Truck[] = []

  selectId = 1
  detailsId = 0;
  helper= false;
  distance = 0;
  totalWeight = 0;
 

  constructor(
    private location: Location,
    private session: SessionService,
    private project : ProjectService
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
    this.session.setItem({vehcle: {helper: this.helper, totalWeight: this.totalWeight,  ...vehcle}})
    this.goNext.emit(true)
  }

  ngOnInit(){
    const data = this.session.getItem();
    if (data && data.vehcle) {
      this.selectId = data.vehcle.id;
      this.helper = data.vehcle.helper;
    }
    if(data.distance && data.cargoItems){
      this.cars = this.project.getPrice(data.distance)
      this.totalWeight = this.project.getTotalWeight(data.cargoItems)
      console.log(this.totalWeight);
    }
  }


  getWeightDisplay(car: Truck): string {
   return (car.weight/1000) >= 1? (car.weight/1000).toFixed(1) + 'ton': Math.floor(car.weight) + 'kg'
  }

  showDetails(id: number) {
    this.detailsId = id
  }
  
}
