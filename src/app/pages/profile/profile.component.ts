import { Component, OnInit } from '@angular/core';
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

  constructor( private auth: AuthService) {}
  ngOnInit(): void {
    this.getUserData()
  }

  logout() {
    this.auth.signOut();
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



