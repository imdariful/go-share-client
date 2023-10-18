import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


interface User {
  id: string,name: string, email: string
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  error: string | undefined;

  user: User | undefined;

  constructor( private auth: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.getUserData()
  }

  logout() {
    this.auth.singOut();
    this.router.navigate(['/']);
  }

  async getUserData() {
    try {
      const res = await this.auth.profile();
      if(res.id){
        this.user = res;
      }
    } catch (error: any) {
      this.error = error.message
    }
  }
 
}



