import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from './api.constant';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  url = `${apiUrl}payments/`
  config = { withCredentials: true }
  constructor(private http: HttpClient) { }


  getPayments(id: string) {
    return this.http.get(this.url+id, this.config);
  }
}
