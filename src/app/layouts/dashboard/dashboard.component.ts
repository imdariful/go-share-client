import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

interface User{
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
  constructor(private auth: AuthService){}
  ngOnInit(){
   this.getUser()
  }

  async getUser(){
    this.user = await this.auth.profile()
    console.log(this.user);
  }

}
