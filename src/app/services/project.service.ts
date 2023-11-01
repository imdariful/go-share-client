import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prices, Trucks } from '../config/track.alg';
import { CargoItem, Truck } from '../interfaces/truck';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  url = 'http://localhost:3001/projects/'
  config = { withCredentials: true }
  constructor(private http: HttpClient) { }

  booked = async (data: any): Promise<any> => {
    try {
      const res = await axios.post(`${this.url}`, data, this.config);
      return res.data;
    } catch (error: any) {
      return error;
    }
  }

  getUserProjects(id: string) {
    return this.http.get(this.url+id, this.config);
  }

  getPrice(distance: number): Truck[] {
    let trucks: Truck[] = [];

    for (const truck of Trucks) {
      const weightTon = truck.weight / 1000;
      const originalPrice = ((truck.height + truck.width + truck.length) * weightTon) / 2;

      for (const p of Prices) {

        if (p.from > 1000) {
          if (truck.id === 4 && truck.costPerKm) {
            const price = (truck.costPerKm / 100) * (100 - p.price);
            truck.cost = Math.round(price * (distance / 1000));
          } else {
            const price = (originalPrice / 100) * (100 - p.price);
            truck.cost = Math.round(price * (distance / 1000));
          }
          break;
        } else if (p.to && p.to >= (distance / 1000)) {
          if (truck.id === 4 && truck.costPerKm) {
            const price = (truck.costPerKm / 100) * (100 - p.price);
            truck.cost = Math.round(price * (distance / 1000));
          } else {
            const price = (originalPrice / 100) * (100 - p.price);
            truck.cost = Math.round(price * (distance / 1000));
          }
          break;
        }
      }
      trucks.push(truck);
    }

    return trucks;
  }

  getTotalWeight(items: CargoItem[]): number {
    let totalWeight = 0;
    for(let item of items){
      totalWeight += item.pis * item.weight
    }
    return totalWeight;
  }

}
