import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';
import { RouteService } from 'src/app/services/route.service';
import { getToastErrorMessage } from 'src/app/utlt/toaster';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  error: string | undefined;
  user: User | undefined;
  avatarUrl!: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: RouteService,
    private toast: HotToastService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.getUserData();
    const router = this.router.url;
    this.route.setTitle(router.split('/')[2]);
  }

  logout() {
    this.auth.signOut();
  }

  async getUserData() {
    try {
      const res = await this.auth.profile();
      if (res.id) {
        this.user = res;
        console.log(this.user.id, 'this.user.id');
        this.getAvatar(this.user.name);
      }
    } catch (error: any) {
      this.toast.error(
        `Ops! something went wrong. ${error.message}`,
        getToastErrorMessage()
      );
      this.error = error.message;
      throw new Error(error?.response?.data?.message);
    }
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
