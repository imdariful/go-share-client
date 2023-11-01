import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  projects: Project[] = []

  constructor(private project: ProjectService,private auth: AuthService, private router: Router,private route: RouteService){}
  ngOnInit(){
    this.getProjects();
    const router = this.router.url;
    this.route.setTitle(router.split('/')[2]);
  }

  async getProjects(){
    const user = await this.auth.profile();
    if(user.id){
      this.project.getUserProjects(user.id).subscribe((res: any) => {
        this.projects = res
      })
    }
  }

  getDistanceKm(distance: number){
    return Math.round(distance / 1000);
  }

}
