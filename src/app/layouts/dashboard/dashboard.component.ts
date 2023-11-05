import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RouteService } from 'src/app/services/route.service';

interface User {
  id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user!: User;
  route!: string;
  routerEventsSubscription: any;
  actRoute: string = 'project';

  constructor(
    private auth: AuthService,
    private activeRoute: RouteService,
    private cdRef: ChangeDetectorRef,
    private location: Location
  ) { }

  ngOnInit() {
    this.getUser();
    this.setActiveRoute();
    this.activeRoute.getTitle().subscribe((res: any) => {
      this.route = res;
      this.cdRef.detectChanges();
    });
  }

  changeActiveRoute(route: string){
    this.actRoute = route;
  }

  setActiveRoute() {
    this.actRoute = this.location.path().split('/')[2]
  }

  signOut() {
    this.auth.signOut();
  }

  async getUser() {
    this.user = await this.auth.profile();
  }
}
