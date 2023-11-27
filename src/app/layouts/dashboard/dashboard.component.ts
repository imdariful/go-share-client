import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';
import { RouteService } from 'src/app/services/route.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user!: User;
  route!: string;
  routerEventsSubscription: any;
  actRoute: string = 'project';
  avatarUrl!: any;
  balance!: string;

  constructor(
    private auth: AuthService,
    private activeRoute: RouteService,
    private cdRef: ChangeDetectorRef,
    private location: Location,
    private sanitizer: DomSanitizer,
    private walletService: WalletService
  ) {
    this.walletService.currentBalance.subscribe(
      (balance) => (this.balance = balance)
    );
  }

  ngOnInit() {
    this.getUser();
    this.setActiveRoute();
    this.activeRoute.getTitle().subscribe((res: any) => {
      this.route = res;
      this.cdRef.detectChanges();
    });
  }

  changeActiveRoute(route: string) {
    this.actRoute = route;
  }

  setActiveRoute() {
    this.actRoute = this.location.path().split('/')[2];
  }

  signOut() {
    this.auth.signOut();
  }

  async getUser() {
    this.user = await this.auth.profile();
    this.getAvatar(this.user.name);
  }

  getAvatar(username: string) {
    this.auth.getAvatar(username).subscribe(
      (data) => {
        let objectURL = URL.createObjectURL(data);
        this.avatarUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
