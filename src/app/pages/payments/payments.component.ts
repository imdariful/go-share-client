import { Component, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RouteService } from 'src/app/services/route.service';
import { getToastErrorMessage } from 'src/app/utlt/toaster';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent {
  error: string | undefined;
  user: User | undefined;
  payments: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: RouteService,
    private payment: PaymentService,
    private toast: HotToastService
  ) {}
  ngOnInit(): void {
    this.getUserData();
    const router = this.router.url;
    this.route.setTitle(router.split('/')[2]);
  }

  async getUserData() {
    try {
      const user = await this.auth.profile();
      if (user.id) {
        this.user = user;
        this.payment.getPayments(user.id).subscribe((res: any) => {
          this.payments = res;
        });
      }
    } catch (error: any) {
      this.error = error.message;
      this.toast.error(
        `Ops! something went wrong. ${error.message}`,
        getToastErrorMessage()
      );
      throw new Error(error?.response?.data?.message);
    }
  }
}
