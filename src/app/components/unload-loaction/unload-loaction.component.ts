import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-unload-loaction',
  templateUrl: './unload-loaction.component.html',
  styleUrls: ['./unload-loaction.component.scss']
})
export class UnloadLoactionComponent {
  map: mapboxgl.Map | undefined;
  currentMarker: mapboxgl.Marker | null = null;


  constructor(private locationService: LocationService, private http: HttpClient) {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiYXNpZnVycmFobWFucGlhbCIsImEiOiJjbG5qd29ldTEwMjdsMnBsazFsaW1xcm5rIn0.L5kKxav_0VTewsxlvWUS2g';
  }


  ngAfterViewInit() {
    this.initializeMap();
  }


  initializeMap() {
    this.map = new mapboxgl.Map({
      container: "end",
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [90.42488, 23.76495],
      zoom: 10,
    });

    this.locationService.getEndLocation().subscribe((data: any) => {
          this.addMarker(data.coordinates);
          (this.map as any).setCenter(data.coordinates);
        })


    this.map.on('click', (e) => {
      const coordinates = e.lngLat;
      this.addMarker(coordinates);
      this.setLocation(coordinates);
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


  setLocation(cordinates: mapboxgl.LngLat) {
    const { lng, lat } = cordinates
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`;
    this.http.get(apiUrl).subscribe((data: any) => {
      const placeName = data.features[0].place_name;
        this.locationService.setEndLocation({
          coordinates: [lng, lat],
          placeName: placeName
        })
    });
  }
}
