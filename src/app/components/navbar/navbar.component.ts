import { Component, OnInit, SimpleChanges } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: any;

  constructor(private auth: AuthService) {}

  async getuser() {
    this.user = await this.auth.profile();
  }
  ngOnInit() {
    initFlowbite();
    this.getuser();
  }

  ngOnChanges(change: SimpleChanges) {
    initFlowbite();
  }

  signOut() {
    this.auth.signOut();
  }
}
