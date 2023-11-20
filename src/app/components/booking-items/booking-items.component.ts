import { Location } from '@angular/common';
import { cargoItems } from './../../config/cargoItem';
import { Component, EventEmitter, Output } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { CargoItem } from 'src/app/interfaces/truck';
import { genRandomString, getRandom } from 'src/app/utlt/utl';

@Component({
  selector: 'app-booking-items',
  templateUrl: './booking-items.component.html',
  styleUrls: ['./booking-items.component.scss'],
})
export class BookingItemsComponent {
  @Output() goNext = new EventEmitter<boolean>();

  cargoItems: CargoItem[] = [];
  cargoItemName!: string;
  cargoItemsSuggestions: CargoItem[] = [];

  constructor(private location: Location, private session: SessionService) {}

  ngOnInit() {
    const data = this.session.getItem();
    if (data && data.cargoItems) {
      this.cargoItems = data.cargoItems;
    }
  }

  setCargoItem(cargoItem: CargoItem) {
    this.cargoItemName = cargoItem.title;
    this.cargoItemsSuggestions = [];
  }

  searchCargoItem() {
    this.cargoItemsSuggestions = cargoItems.filter((item) =>
      item.title.toLowerCase().includes(this.cargoItemName.toLowerCase())
    );
  }

  removeCargoItem(title: string) {
    this.cargoItems = this.cargoItems.filter((item) => item.title !== title);
  }

  quantityChange(i: number, q: number) {
    this.cargoItems[i].pis += q;
  }

  onSubmit() {
    const existingItem = cargoItems.find((item) =>
      item.title.toLowerCase().includes(this.cargoItemName.toLowerCase())
    );

    if (existingItem) {
      this.cargoItems.push(existingItem);
    } else {
      const newItem = this.createNewCargoItem(this.cargoItemName);
      this.cargoItems.push(newItem);
    }
    this.cargoItemName = '';
  }

  createNewCargoItem(title: string): CargoItem {
    const ran = getRandom(10);
    return {
      title: title,
      des: genRandomString(getRandom(30)),
      weight: 0,
      height: getRandom(30),
      length: getRandom(100),
      width: getRandom(60),
      pis: 1,
      extra: ran == 3 || ran == 5 || ran == 7,
    };
  }

  goBack() {
    this.location.back();
  }

  setCargoValue() {
    this.session.setItem({ cargoItems: this.cargoItems });
    this.goNext.emit(true);
  }
}
