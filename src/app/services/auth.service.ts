import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie';
import { Auth, Profile } from '../interfaces/auth';
import { Observable, Subject } from 'rxjs';
import { apiUrl } from './api.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = `${apiUrl}auth/`
  config = { withCredentials: true }
  private user: Subject<any> = new Subject<any>();

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
    window.location.reload();
  }

  profile = async (): Promise<Profile> => {
    try {
      const res = await axios.get(`${this.url}profile`, this.config);
      return res.data;
    } catch (error: any) {
      return error;
    }
  }

  getDriver = async (id: string): Promise<Profile> => {
    try {
      const res = await axios.get(`${this.url}driver/${id}`, this.config);
      // console.log(res)
      return res.data;
    } catch (error: any) {
      return error;
    }
  }

  getProfile(): Observable<any> {
    return this.user.asObservable();
  }



}
