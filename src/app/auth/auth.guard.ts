import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    try {
      const res = await this.authService.profile();
      if (res.id) {
        return true; 
      } else {
        this.router.navigate(['/login']);
        return false; 
      }
    } catch (err) {
      this.router.navigate(['/login']);
      return false; 
    }
  }

}
