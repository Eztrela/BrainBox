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
      tags: Array<number> = memoryBox.tags;
      notes: Array<INote> = memoryBox.notes;
      tasks: Array<ITask> = memoryBox.tasks;
      datetimeCreated: Date = memoryBox.datetimeCreated;
      title: string = memoryBox.title;
      user: number = memoryBox.user;
      id: number = memoryBox.id;
    };
  }

}
