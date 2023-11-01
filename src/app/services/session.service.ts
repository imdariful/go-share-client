import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  setItem(val: any) {
    const data = sessionStorage.getItem('bookingData');
    if (data) {
      const priviousData = JSON.parse(data);
      const newData = { ...priviousData, ...val }
      sessionStorage.setItem('bookingData', JSON.stringify(newData))
    }
    else {
      sessionStorage.setItem('bookingData', JSON.stringify(val))
    }
  }

  getItem() {
    const data = sessionStorage.getItem('bookingData');
    if (data) {
      return JSON.parse(data);
    }
    else {
      return null;
    }
  }

  removeItem() {
    sessionStorage.removeItem('bookingData');
  }
}
