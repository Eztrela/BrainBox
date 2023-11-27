import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonDTO'
})
export class JsonDTOPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
