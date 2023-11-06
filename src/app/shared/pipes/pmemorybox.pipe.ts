import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pmemorybox'
})
export class PmemoryboxPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
