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

  editar(id: number, fieldName: string, fieldValue: number | string | Date) {
    let idx: number = this.localizar(id);
    if (idx < 0) return false;

    let task = this._tasks[idx];

    if (!(fieldName in task)) return false;

    (task as any)[fieldName] = fieldValue;
    return true;
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
