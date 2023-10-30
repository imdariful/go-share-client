import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie';
import { Auth, Profile } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:3001/auth/'
  config = { withCredentials: true }

  constructor(private cookieService: CookieService, private router: Router) { }

  signUp = async (userData: any): Promise<Auth> => {
    try {
      const res = await axios.post(`${this.url}signup`, userData, this.config);
      return res.data;
    } catch (error: any) {
      return error;
    }
  }

  signIn = async (userData: any): Promise<Auth> => {
    try {
      const res = await axios.post(`${this.url}signin`, userData, this.config);
      return res.data;
    } catch (error: any) {
      return error;
    }
  }

  signOut = (): void => {
    this.cookieService.remove("token");
    this.router.navigate(['/']);
  }

  profile = async (): Promise<Profile> => {
    try {
      const res = await axios.get(`${this.url}profile`, this.config);
      return res.data;
    } catch (error: any) {
      return error;
    }
  }


}
