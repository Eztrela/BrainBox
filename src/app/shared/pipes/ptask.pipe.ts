import { Pipe, PipeTransform } from '@angular/core';
import {Tag, Task} from "../models";
import { ITask } from "../interfaces/itask";

@Pipe({
  name: 'ptask'
})
export class PtaskPipe implements PipeTransform {

  transform(task: Task): ITask {
      return new class implements ITask {
        datetimeCreated: Date = task.datetimeCreated;
        datetimeDue: Date = task.datetimeDue;
        description: string = task.description;
        priority: number = task.priority;
        status: string = task.status;
        tags: Array<number> = task.tags;
        title: string = task.title;
        id: number = task.id;
      };
    }

}
