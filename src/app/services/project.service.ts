import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prices, Trucks } from '../config/track.alg';
import { CargoItem, Truck } from '../interfaces/truck';
import axios from 'axios';
import { CloudSvgComponent } from '../cloud-svg/cloud-svg.component';
import { apiUrl } from './api.constant';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  url = `${apiUrl}projects/`;
  config = { withCredentials: true };
  constructor(private http: HttpClient) {}

  booked = async (data: any): Promise<any> => {
    try {
      const res = await axios.post(`${this.url}`, data, this.config);
      return res.data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.response?.data?.message);
    }
  };

  getUserProjects(id: string) {
    return this.http.get(this.url + id, this.config);
  }

  getDriverProjects(id: string) {
    return this.http.get(`${this.url}driver/${id}`, this.config);
  }

  addBid(price: number, name: string, driverId: string, id: string) {
    return this.http.put(this.url + id, { price, driverId, name }, this.config);
  }

  getProjects() {
    return this.http.get(this.url, this.config);
  }

  getPrice(distance: number): Truck[] {
    let trucks: Truck[] = [];

    for (const truck of Trucks) {
      const originalPrice = this.calculateOriginalPrice(truck);
      console.log(originalPrice, 'originalPrice');
      console.log(truck, 'truck');
      const finalPrice = this.calculateFinalPrice(
        truck,
        distance,
        originalPrice
      );
      truck.cost = finalPrice;
      trucks.push(truck);
    }

    return trucks;
  }

  calculateOriginalPrice(truck: Truck): number {
    if (
      truck.height < 0 ||
      truck.width < 0 ||
      truck.length < 0 ||
      truck.weight < 0
    ) {
      throw new Error('Truck dimensions and weight must be non-negative');
    }

    const weightTon = truck.weight / 1000;
    return ((truck.height + truck.width + truck.length) * weightTon) / 2;
  }

  calculateFinalPrice(
    truck: Truck,
    distance: number,
    originalPrice: number
  ): number {
    if (distance < 0) {
      throw new Error('Distance must be non-negative');
    }
    for (const p of Prices) {
      if (p.from > 1000 || (p.to && p.to >= distance / 1000)) {
        const discountMultiplier = (100 - p.price) / 100;
        if (truck.id === 4 && truck.costPerKm) {
          return Math.round(
            truck.costPerKm * discountMultiplier * (distance / 1000)
          );
        } else {
          return Math.round(
            originalPrice * discountMultiplier * (distance / 1000)
          );
        }
      }
    }
    return 0;
  }

  getTotalWeight(items: CargoItem[]): number {
    let totalWeight = 0;
    for (let item of items) {
      totalWeight += item.pis * item.weight;
    }
    return totalWeight;
  }
}
