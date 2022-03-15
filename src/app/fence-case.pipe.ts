import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fenceCase'
})
export class FenceCasePipe implements PipeTransform {

  transform(value: string): unknown {
    value = value.toLowerCase();
    let res = "";
    for (let i = 0; i < value.length; i++) {
      res += i % 2 == 0 ? value.charAt(i).toUpperCase() : value.charAt(i);
    }
    return res;
  }

}
