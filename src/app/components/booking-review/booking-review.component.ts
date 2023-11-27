import { cargoItems } from './../../config/cargoItem';
import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { CargoAndVehicle } from 'src/app/interfaces/location';
import { CargoItem } from 'src/app/interfaces/truck';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { SessionService } from 'src/app/services/session.service';
import { WalletService } from 'src/app/services/wallet.service';
import {
  getToastErrorMessage,
  getToastSuccessMessage,
} from 'src/app/utlt/toaster';

@Component({
  selector: 'app-booking-review',
  templateUrl: './booking-review.component.html',
  styleUrls: ['./booking-review.component.scss'],
})
export class BookingReviewComponent {
  bookingsData: any;
  isAgreed = false;
  truckCost = 0;
  helperCost = 0;
  extraCost = 0;
  totalCost = 0;
  balance: any;
  walletId!: string;
  constructor(
    private session: SessionService,
    private location: Location,
    private project: ProjectService,
    private auth: AuthService,
    private router: Router,
    private toast: HotToastService,
    private walletService: WalletService
  ) {
    this.walletService.currentBalance.subscribe(
      (balance) => (this.balance = balance || 0)
    );
    this.walletService.currentWalletId.subscribe(
      (walletId) => (this.walletId = walletId)
    );
    console.log('WalletId:', this.walletId);
  }
  ngOnInit(): void {
    this.bookingsData = this.session.getItem();
    this.truckCost = this.bookingsData?.vehcle?.cost
      ? this.bookingsData.vehcle.cost * 1
      : 0;
    this.helperCost = this.bookingsData?.vehcle?.helper
      ? this.bookingsData.vehcle.helper * 1
      : 0;
    this.extraCost =
      this.getExtraCost(
        this.bookingsData?.cargoItems,
        this.bookingsData?.vehcle?.cost
      ) || 0;
    this.totalCost =
      this.truckCost + this.helperCost + this.extraCost - this.balance;
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
    let result = isExtra ? (cost / 100) * 9 * extra : 0;
    return result;
  }

  goBack() {
    this.location.back();
  }

  async booked() {
    console.log('booked method called');
    if (!this.isAgreed) {
      this.toast.error(
        `Please agree to the terms and conditions`,
        getToastErrorMessage()
      );
      return;
    }

    const user = await this.auth.profile();
    console.log('User:', user);
    if (user.id) {
      try {
        const data = await this.project.booked({
          ...this.bookingsData,
          totalCost: this.totalCost,
          helperCost: this.helperCost,
          extraCost: this.extraCost,
          truckCost: this.truckCost,
        });

        console.log('Booked data:', data);
        if (data.url) {
          window.location.href = data.url;
          this.session.removeItem();
        }

        await this.walletService.patchWallet(0);
        console.log('Wallet updated');

        this.toast.success('Booking successful', getToastSuccessMessage());
      } catch (error: any) {
        this.toast.error(
          `Booking failed - ${error?.message}`,
          getToastErrorMessage()
        );
        console.error(error);
      }
    } else {
      this.router.navigate(['/auth/signin']);
    }
  }
}
