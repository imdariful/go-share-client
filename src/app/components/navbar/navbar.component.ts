import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  user: any;

  constructor(private auth: AuthService){}

  async getuser(){
    this.user = await this.auth.profile();
  }
  ngOnInit(){
    this.getuser();
  }

  signOut(){
    this.auth.signOut();
  }

}
