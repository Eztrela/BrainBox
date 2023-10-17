import { Injectable } from '@angular/core';
import { Task } from '../models';
import { TASKS } from "../models/TASKS";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _tasks: Array<Task>;

  constructor() {
    this._tasks = TASKS
  }

  listar():Array<Task> {
    return this._tasks;
  }

  inserir(task: Task) {
    let idx = this.localizar(task.id);
    if (idx < 0) {
      this._tasks.push(task);
    } else {
      this._tasks[idx] = task;
    }
  }

  /*const handleUpdate = (fieldName: string, fieldValue: string | number) => {
    if (fieldName in myObject) {
        myObject = {...myObject, fieldName: fieldValue};
    }
}*/

  editar(id: number, fieldName: string, fieldValue: number | string | Date) {
    let idx: number = this.localizar(id);
    if (idx >= 0 && fieldName in Task) {
      let task = this._tasks[idx];
      (task as any).fieldName = fieldValue;
      return true
    } else {
      return false
    }
  }

  remover(id: number) {
    let idx = this.localizar(id);
    if (idx >= 0) {
      return this._tasks.splice(idx, 1)[0];
    } else {
      return false;
    }
  }

  get(id: number): Task | false {
    let idx: number = this.localizar(id);
    if (idx >= 0) {
      return this._tasks[idx];
    } else {
      return false;
    }
  }

  localizar(id: number): number {
    return this._tasks.findIndex((t:Task):boolean => (t.id === id));
  }

}
