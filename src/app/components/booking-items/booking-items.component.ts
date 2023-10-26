import { Location } from '@angular/common';
import { cargoItems } from './../../config/cargoItem';
import { Component } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';

interface CargoItem {
  id: string,
  item: string,
  pis: number,
  weight?: number,
  description?: string
}

@Component({
  selector: 'app-booking-items',
  templateUrl: './booking-items.component.html',
  styleUrls: ['./booking-items.component.scss']
})
export class BookingItemsComponent {

  cargoItems: CargoItem[] = [];
  cargoItemName!: string;
  cargoItemsSuggetions: any[] = [];


  constructor(private location: Location, private session: SessionService) {}


  setCargoItem(cargoItem: CargoItem) {
    this.cargoItemName = cargoItem.item;
    this.cargoItemsSuggetions = [];
  }

  searchCargoItem() {
    this.cargoItemsSuggetions = cargoItems.filter(item => item.item.toLowerCase().includes(this.cargoItemName.toLowerCase()))
  }
  removeCargoItem(id: string) {
    this.cargoItems = this.cargoItems.filter(item => item.id !== id);
  }

  quantityChange(i: number, q: number) {
      this.cargoItems[i].pis += q;
  }
  onSubmit() {
    this.cargoItems.push({
      id: (this.cargoItems.length + 1).toString(),
      item: this.cargoItemName,
      pis: 1,
      weight: 50,
      description: ""
    })
    this.cargoItemName = "";
  }

  goBack() {
    this.location.back();
  }

  setCargoValue() {
    console.log(this.cargoItems);
    this.session.setItem(this.cargoItems);
  }

}
