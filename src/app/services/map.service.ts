import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map: mapboxgl.Map | undefined;

  constructor() { 
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiYXNpZnVycmFobWFucGlhbCIsImEiOiJjbG5qd29ldTEwMjdsMnBsazFsaW1xcm5rIn0.L5kKxav_0VTewsxlvWUS2g';
  }

  initializeMap(containerId: string) {
    this.map = new mapboxgl.Map({
      container: containerId,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [90.42488,23.76495],
      zoom: 12, 
    });
  }

  getMap() {
    return this.map;
  }

  // setMarker(location: [number, number]) {
  //   new mapboxgl.Marker()
  //     .setLngLat(location)
  //     .addTo(this.map);
  // }

  // calculateDistance(origin: [number, number], destination: [number, number]) {
  //   return mapboxgl.MercatorCoordinate.fromLngLat(origin).distanceTo(
  //     mapboxgl.MercatorCoordinate.fromLngLat(destination)
  //   );
  // }

}

