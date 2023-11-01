import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import axios from 'axios';
import { CargoAndVehicle, Location } from 'src/app/interfaces/location';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit{
  id:number=1;
  user: any;
  location: Location | undefined ;
  cargoAndVehicle: CargoAndVehicle | undefined ;

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); 
      this.id = +id!;
    });
    this.getuser();
  }

  setLocation(next: boolean) {
    // this.router.navigate(['/booking/2']);
  }

  goNext(next: boolean){
    this.router.navigate([`/booking/${this.id+1}`]);
  }

  setCargo(newCargo: CargoAndVehicle) {
    this.cargoAndVehicle = newCargo;
    this.router.navigate(['/booking/3']);
  }
  

  async getuser(){
    this.user = await this.auth.profile();
  }

  signOut(){
    this.auth.signOut();
  }


}

