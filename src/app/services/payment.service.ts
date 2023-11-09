import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  url = 'http://localhost:3001/payments/'
  config = { withCredentials: true }
  constructor(private http: HttpClient) { }


  getPayments(id: string) {
    return this.http.get(this.url+id, this.config);
  }
}
