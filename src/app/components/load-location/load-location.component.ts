import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-load-location',
  templateUrl: './load-location.component.html',
  styleUrls: ['./load-location.component.scss']
})
export class LoadLocationComponent implements OnInit {

  map: mapboxgl.Map | undefined;
  currentMarker: mapboxgl.Marker | null = null;

  constructor(private mapService: MapService) {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiYXNpZnVycmFobWFucGlhbCIsImEiOiJjbG5qd29ldTEwMjdsMnBsazFsaW1xcm5rIn0.L5kKxav_0VTewsxlvWUS2g';
   }

  ngOnInit() {
    this.initializeMap()
  }

  initializeMap() {
    this.map = new mapboxgl.Map({
      container: 'map2',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [90.42488, 23.76495],
      zoom: 12,
    });


    this.map.on('click', (e) => {
      const coordinates = e.lngLat;
      console.log(coordinates);
      this.addMarker(coordinates);
      this.getAddress(coordinates);
    });
  }

  addMarker(coordinates: mapboxgl.LngLat) {
    if (this.map) {
      if (this.currentMarker) {
        this.currentMarker.remove();
      }
      this.currentMarker = new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(this.map);
    }
  }

  getAddress(lngLat: mapboxgl.LngLat) {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${mapboxgl.accessToken}`)
      .then((response) => response.json())
      .then((data) => {
        const placeName = data.features[0].place_name;
        console.log(`You clicked on: ${placeName}`);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }



}