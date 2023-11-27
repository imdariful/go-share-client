import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../utlt/config';

@Injectable({
  providedIn: 'root',
})
export class MapboxService {
  constructor(private http: HttpClient) {}

  getLocationData(lng: number, lat: number) {
    const url = `${config.mapbox.apiUrl}/${lng},${lat}.json?access_token=${config.mapbox.accessToken}`;
    return this.http.get(url);
  }
}
