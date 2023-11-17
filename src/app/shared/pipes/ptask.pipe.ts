import { Pipe, PipeTransform } from '@angular/core';
import {Tag, Task} from "../models";
import { ITask } from "../interfaces/itask";

@Pipe({
  name: 'ptask'
})
export class PtaskPipe implements PipeTransform {

  transform(task: Task): ITask {
      return new class implements ITask {
        id: number = 0;
        title: string = task.title;
        tags: Array<number> = task.tags;
        status: string = task.status;
        priority: number = task.priority;
        description: string = task.description;
        datetimeDue: Date = task.datetimeDue;
        datetimeCreated: Date = task.datetimeCreated;
      };
    }

}
