import { Pipe, PipeTransform } from '@angular/core';
import { MemoryBox } from '../models';
import { Imemorybox } from "../interfaces/imemorybox";

@Pipe({
  name: 'pmemorybox'
})
export class PmemoryboxPipe implements PipeTransform {

  transform(memoryBox: MemoryBox): Imemorybox {
    return new class implements Imemorybox {
      tags: Array<number> = memoryBox.tags;
      notes: Array<number> = memoryBox.notes;
      tasks: Array<number> = memoryBox.tasks;
      datetimeCreated: Date = memoryBox.datetimeCreated;
      title: string = memoryBox.title;
      user: number = memoryBox.user;
      id: number = memoryBox.id;
    };
  }

}
