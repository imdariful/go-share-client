import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private startLocationSubject: Subject<any> = new Subject<any>();
  private endLocationSubject: Subject<any> = new Subject<any>();
  // private onFocus: Subject<any> = new Subject<any>();
  // private onMapLoad: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiYXNpZnVycmFobWFucGlhbCIsImEiOiJjbG5qd29ldTEwMjdsMnBsazFsaW1xcm5rIn0.L5kKxav_0VTewsxlvWUS2g';
  }


  setStartLocation(location: any) {
    this.startLocationSubject.next(location);
  }

  setEndLocation(location: any) {
    this.endLocationSubject.next(location);
  }

  getStartLocation(): Observable<any> {
    return this.startLocationSubject.asObservable();
  }

  getEndLocation(): Observable<any> {
    return this.endLocationSubject.asObservable();
  }

  getSuggestions(place: any): Observable<any> {
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${mapboxgl.accessToken}`;
    return this.http.get(apiUrl)
  }

  getDistance(startCoordinates: [number, number], endCoordinates: [number, number]): Observable<any> {
    const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoordinates[0]}%2C${startCoordinates[1]}%3B${endCoordinates[0]}%2C${endCoordinates[1]}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${mapboxgl.accessToken}`
    return this.http.get(apiUrl)
  }
}
