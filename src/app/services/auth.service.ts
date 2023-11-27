import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie';
import { Auth, Profile, Wallet } from '../interfaces/auth';
import { Observable, Subject } from 'rxjs';
import { apiUrl } from './api.constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = `${apiUrl}auth/`;
  config = { withCredentials: true };
  private user: Subject<any> = new Subject<any>();

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private http: HttpClient
  ) {}

  signUp = async (userData: any): Promise<Auth> => {
    try {
      const res = await axios.post(`${this.url}signup`, userData, this.config);
      return res.data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.response?.data?.message);
    }
  };

  signIn = async (userData: any): Promise<Auth> => {
    try {
      const res = await axios.post(`${this.url}signin`, userData, this.config);
      return res.data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.response?.data?.message);
    }
  };

  signOut = (): void => {
    this.cookieService.remove('token');
    window.location.reload();
  };

  profile = async (): Promise<Profile> => {
    try {
      const res = await axios.get(`${this.url}profile`, this.config);
      return res.data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.response?.data?.message);
    }
  };

  getDriver = async (id: string): Promise<Profile> => {
    try {
      const res = await axios.get(`${this.url}driver/${id}`, this.config);
      // console.log(res)
      return res.data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.response?.data?.message);
    }
  };

  getProfile(): Observable<any> {
    return this.user.asObservable();
  }

  getAvatar = (username: string): Observable<any> => {
    return this.http.get(
      `https://api.multiavatar.com/${username}.png?apikey=xb1XMOaZcgNPsW`,
      { responseType: 'blob' }
    );
  };

  getWallet = async (id: string): Promise<Wallet> => {
    try {
      const res = await axios.get(`${apiUrl}wallet/${id}`, this.config);
      return res.data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.response?.data?.message);
    }
  };
}
