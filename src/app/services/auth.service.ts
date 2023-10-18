import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:3001/auth/'

  constructor() { }

  singUp = async (userData: any): Promise<any> => {
    try {
      const res = await axios.post(`${this.url}singup`, userData);
      console.log(res);
      // return res;
    } catch (error: any) {
       return error;
    }
  } 

  
}
