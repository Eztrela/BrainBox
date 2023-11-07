import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ptag'
})
export class PtagPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
