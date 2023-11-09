import { Component, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { Project } from 'src/app/interfaces/projects';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projects: any[] = []
  sendProject: any;
  user: any;
  actRoute: any;
  modal: boolean = false;
  offerPrice?: number;
  error = false;
  selectedIndex = 0;


  constructor(private project: ProjectService, private auth: AuthService, private router: Router, private route: RouteService) { }
  ngOnInit() {
    initFlowbite();
    this.getProjects();
    const router = this.router.url;
    this.actRoute = router.split('/')[2]
    this.route.setTitle(this.actRoute);
  }


  checkOffer(num: number) {
    if (this.offerPrice && this.offerPrice >= num) {
      this.error = true;
    } else {
      this.error = false;
    }
  }

  setSendProject(index: number){
    this.selectedIndex = index;
    this.sendProject = this.projects[index]
  }

  getDriver(id: string) {
    this.auth.getDriver(id)
    return "hello "
  }

  async getProjects() {
    const user = await this.auth.profile();
    if (user.id) {
      this.user = user;
      if (user.type == 2) {
        if (this.actRoute == 'myprojects') {
          this.project.getDriverProjects(user.id).subscribe((res: any) => {
            this.sendProject = res[0]
            this.projects = res
          })
        } else {
          this.project.getProjects().subscribe((res: any) => {
            this.projects = res
          })
        }
      }
      else {
        this.project.getUserProjects(user.id).subscribe((res: any) => {
          this.projects = res
        })
      }
    }
  }

  bid(id: string, i: any) {
    const price = this.projects[i].bids[this.projects[i].bids.length - 1].price
    if (this.offerPrice && this.offerPrice > 100 && this.offerPrice < price) {
      this.projects[i].bids.push({ price: this.offerPrice, driverId: this.user.id, driverName: this.user.name })
      this.project.addBid(this.offerPrice, this.user.name, this.user.id, id).subscribe((res: any) => {
        this.projects[i] = res
      })
      this.offerPrice = undefined;
      this.modal = false;
    }
  }

  getDistanceKm(distance: number) {
    return Math.round(distance / 1000);
  }

  bidModal(f: number) {
    if (f) {
      this.modal = true;
    }
    else {
      this.modal = false;
    }
  }

}
