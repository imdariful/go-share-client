import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import axios from 'axios';
import { CargoAndVehicle, Location } from 'src/app/interfaces/location';



@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit{

  location: Location | undefined ;
  cargoAndVehicle: CargoAndVehicle | undefined ;

  constructor(private route: ActivatedRoute, private router: Router) {}

  id:number=1;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); 
      this.id = +id!;
      console.log(this.id);
    });
    
  }

  setLocation(newLocation: Location) {
    this.location = newLocation;
    console.log(newLocation);
    this.router.navigate(['/booking/2']);
  }

  setCargo(newCargo: CargoAndVehicle) {
    this.cargoAndVehicle = newCargo;
    console.log(newCargo);
    this.router.navigate(['/booking/3']);
  }
  


}

