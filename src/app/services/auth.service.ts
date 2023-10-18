import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:3001/auth/'
  token: string | undefined;

  constructor() { }

  singUp = async (userData: any): Promise<any> => {
    try {
      const res = await axios.post(`${this.url}singup`, userData);
      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (error: any) {
      return error;
    }
  }

  singIn = async (userData: any): Promise<any> => {
    try {
      const res = await axios.post(`${this.url}singin`, userData);
      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (error: any) {
      return error;
    }
  }

  singOut = async (): Promise<any> => {
    try {
      localStorage.removeItem("token");
    } catch (error: any) {
      return error;
    }
  }

  profile = async (): Promise<any> => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.get(`${this.url}profile`, config);
        return res.data;
      }
    } catch (error: any) {
      return error;
    }
  }


}
