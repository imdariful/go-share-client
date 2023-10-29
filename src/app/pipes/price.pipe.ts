import { Pipe, PipeTransform } from '@angular/core';
import { Prices, Trucks } from '../config/track.alg';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: string): number {
    const props = value.split(',');
    const distance = props[0];
    const id = props[1];
    let cost = 0;

    const truck = Trucks.find(t => t.id === +id);
    if (truck && truck.weight && truck.height && truck.width && truck.length) {
      const { height, width, length, weight } = truck;
      const weightTon = weight / 1000;
      const originalPrice = ((height + width + length) * weightTon) / 2;
      Prices.forEach((p,i) => {
        console.log(i);
        if(p.from && p.to) {
          // console.log(p.to);
          if (p.from <= (+distance / 1000) && p.to >= (+distance / 1000)) {
            const price = (originalPrice / 100) * (100 - p.price);
            cost =  Math.round(price);
          }
        }else if(!p.to){
          // console.log(p.to);
          const price = (originalPrice / 100) * (100 - p.price);
          console.log(price);
          cost =  Math.round(price);
        }
      })
    }

    return cost;
  }

}
