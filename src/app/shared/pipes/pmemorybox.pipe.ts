import { Pipe, PipeTransform } from '@angular/core';
import { MemoryBox, Task, User, Tag, Note } from '../models';
import { Imemorybox } from "../interfaces/imemorybox";

@Pipe({
  name: 'pmemorybox'
})
export class PmemoryboxPipe implements PipeTransform {

  transform(memoryBox: MemoryBox): Imemorybox {
    return new class implements Imemorybox {
      tags: Array<Tag> = memoryBox.tags;
      notes: Array<Note> = memoryBox.notes;
      tasks: Array<Task> = memoryBox.tasks;
      datetimeCreated: Date = memoryBox.datetimeCreated;
      title: string = memoryBox.title;
      user: User = memoryBox.user;
      id: number = memoryBox.id;
    };
  }

}
