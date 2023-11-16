import { Component, Input, SimpleChange } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { config } from 'src/app/utlt/config';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent {
  @Input() project: any;
  showProject: any;

  ngOnChanges(change: SimpleChange) {
    if (change) {
      this.showProject = this.project;
      console.log(this.showProject);
      this.initializeMap();
    }
  }

  constructor() {
    (mapboxgl as any).accessToken = config.mapbox.accessToken;
  }

  initializeMap() {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [90.42488, 23.76495],
      zoom: 10,
    });

    new mapboxgl.Marker({ color: 'red' })
      .setLngLat(this.showProject.startCoordinates)
      .addTo(map);

    new mapboxgl.Marker({ color: 'black' })
      .setLngLat(this.showProject.endCoordinates)
      .addTo(map);
  }
}
