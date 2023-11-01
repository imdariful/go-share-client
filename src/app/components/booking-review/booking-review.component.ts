import { cargoItems } from './../../config/cargoItem';
import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CargoAndVehicle } from 'src/app/interfaces/location';
import { CargoItem } from 'src/app/interfaces/truck';
import { AuthService } from 'src/app/services/auth.service';
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
  truckCost = 0;
  helperCost = 0;
  extraCost = 0;
  totalCost = 0;
  constructor(
    private session: SessionService,
    private location: Location,
    private project: ProjectService,
    private auth: AuthService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.bookingsData = this.session.getItem();
    this.truckCost = this.bookingsData.vehcle.cost * 1;
    this.helperCost = this.bookingsData.vehcle.helper ? this.bookingsData.vehcle.helper * 1 : 0;
    this.extraCost = this.getExtraCost(this.bookingsData.cargoItems, this.bookingsData.vehcle.cost);
    this.totalCost = this.truckCost + this.helperCost + this.extraCost
  }

  getExtraCost(items: CargoItem[], cost: number): number {
    let isExtra = false;
    let extra = 0;
    for (let item of items) {
      if (item.extra) {
        isExtra = true;
        extra += item.pis;
      }
    }
    let result = isExtra ? ((cost / 100) * 9) * extra : 0;
    return result;
  }

  goBack() {
    this.location.back();
  }

  async booked() {
    if (this.isAgreed) {
      const user = await this.auth.profile()
      if (user.id) {
        const { id, ...result } = user;
        const data = await this.project.booked({
          ...result,
          ...this.bookingsData,
          userId: id,
          totalCost: this.totalCost,
          helperCost: this.helperCost,
          extraCost: this.extraCost,
          truckCost: this.truckCost
        })
        console.log(data);
        if (data.projectId) {
          this.session.removeItem()
          this.router.navigate(['/dashboard/projects']);
        }
      } else {
        this.router.navigate(['/auth/signin']);
      }

    }

  }

}
