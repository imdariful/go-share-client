import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mathFloor'
})
export class MathFloorPipe implements PipeTransform {

  transform(num: number): number {
   return Math.ceil(num);
  }

}
