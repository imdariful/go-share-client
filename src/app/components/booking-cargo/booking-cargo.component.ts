import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CargoAndVehicle } from 'src/app/interfaces/location';
import { Select, initTE,Input } from "tw-elements";

@Component({
  selector: 'app-booking-cargo',
  templateUrl: './booking-cargo.component.html',
  styleUrls: ['./booking-cargo.component.scss']
})
export class BookingCargoComponent  {
  @Output() setCargo = new EventEmitter<CargoAndVehicle>();


  cargoAndVehicleForm: FormGroup;

  constructor(
    private route: Router,
    private fb: FormBuilder,
  ) {
    this.cargoAndVehicleForm = this.fb.group({
      cargo: ['', [Validators.required]],
      vehicle: ['', [Validators.required]],
      description: [''],
    })
  }


  async getCargo_Vehicle() {
    if (this.cargoAndVehicleForm.valid) {

      const cargoVehicle = this.cargoAndVehicleForm.value;
      console.log(cargoVehicle);
      this.setCargo.emit(cargoVehicle);
      // this.cargoAndVehicleForm.reset();
    }else{
      throw new Error('Invalid form');
    }
  }

  ngOnInit(): void {
    console.log(this.route.url);
      initTE({Select,Input});
  }
}
