import { Pipe, PipeTransform } from '@angular/core';
import { MemoryBox, Task, Note } from '../models';
import { Imemorybox } from "../interfaces/imemorybox";
import { ITask } from '../interfaces/itask';
import { INote } from '../interfaces/inote';

@Pipe({
  name: 'pmemorybox'
})
export class PmemoryboxPipe implements PipeTransform {

  transform(memoryBox: MemoryBox): Imemorybox {
    return new class implements Imemorybox {
      id: number = memoryBox.id;
      user: number = memoryBox.user;
      title: string = memoryBox.title;
      datetimeCreated: Date = memoryBox.datetimeCreated;
      tasks: Array<ITask> = memoryBox.tasks;
      notes: Array<INote> = memoryBox.notes;
      tags: Array<number> = memoryBox.tags;
      banner: string = memoryBox.banner;
    };
  }

}
