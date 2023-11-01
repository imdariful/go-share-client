import { ChangeDetectorRef, Component } from '@angular/core';
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
export class DashboardComponent {
  user!: User;
  route!: string;
  routerEventsSubscription: any;
  constructor(private auth: AuthService, private activeRoute: RouteService, private cdRef: ChangeDetectorRef ) { }
  ngOnInit() {
    this.getUser()
    this.activeRoute.getTitle().subscribe((res: any) => {
      this.route = res;
      this.cdRef.detectChanges();
    })
  }

  // ngOnDestroy() {
  //   this.routerEventsSubscription.unsubscribe();
  // }


  async getUser() {
    this.user = await this.auth.profile()
  }

}
