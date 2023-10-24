import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiYXNpZnVycmFobWFucGlhbCIsImEiOiJjbG5qd29ldTEwMjdsMnBsazFsaW1xcm5rIn0.L5kKxav_0VTewsxlvWUS2g';
  }


  getDistance(startCoordinates: [number, number], endCoordinates: [number, number]): Observable<any> {
    const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoordinates[0]}%2C${startCoordinates[1]}%3B${endCoordinates[0]}%2C${endCoordinates[1]}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${mapboxgl.accessToken}`
    return this.http.get(apiUrl)
  }
}

