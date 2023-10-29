import { Location } from '@angular/common';
import { cargoItems } from './../../config/cargoItem';
import { Component, EventEmitter, Output } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { CargoItem } from 'src/app/interfaces/truck';
import { genRandonString, getRandom } from 'src/app/utlt/utl';



@Component({
  selector: 'app-booking-items',
  templateUrl: './booking-items.component.html',
  styleUrls: ['./booking-items.component.scss']
})
export class BookingItemsComponent {

  @Output() goNext = new EventEmitter<boolean>();

  cargoItems: CargoItem[] = [];
  cargoItemName!: string;
  cargoItemsSuggetions: CargoItem[] = [];


  constructor(private location: Location, private session: SessionService) {}


  ngOnInit(){
    const data = this.session.getItem();
    if (data && data.cargoItems) {
      this.cargoItems = data.cargoItems
    }
  }

  setCargoItem(cargoItem: CargoItem) {
    this.cargoItemName = cargoItem.title;
    this.cargoItemsSuggetions = [];
  }

  searchCargoItem() {
    this.cargoItemsSuggetions = cargoItems.filter(item => item.title.toLowerCase().includes(this.cargoItemName.toLowerCase()))
  }
  removeCargoItem(title: string) {
    this.cargoItems = this.cargoItems.filter(item => item.title !== title);
  }

  quantityChange(i: number, q: number) {
      this.cargoItems[i].pis += q;
  }
  onSubmit() {
    const newItem = cargoItems.find(item => item.title.toLowerCase().includes(this.cargoItemName.toLowerCase()))
    if(newItem) {
      this.cargoItems.push(newItem);
    }else{
      const ran = getRandom(10);
      this.cargoItems.push({
        title: this.cargoItemName,
        des: genRandonString(getRandom(30)),
        weight: getRandom(40),
        height: getRandom(30),
         lenght: getRandom(100),
         width: getRandom(60),
        pis: 1,
        extra: ran == 3 || ran == 5 || ran == 7
      })
    }
    this.cargoItemName = "";
  }

  goBack() {
    this.location.back();
  }

  setCargoValue() {
    this.session.setItem({cargoItems: this.cargoItems});
    this.goNext.emit(true)
  }

}
      