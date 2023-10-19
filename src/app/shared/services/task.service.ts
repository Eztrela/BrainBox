import { Injectable } from '@angular/core';
import {Tag, Task} from '../models';
import { TASKS } from "../models/TASKS";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _tasks: Array<Task>;

  constructor() {
    this._tasks = TASKS
  }

  generateID(): number{
    return (this._tasks.length > 0) ? this._tasks[ this._tasks.length -1].id + 1 : 1;
  }

  listar():Array<Task> {
    return this._tasks;
  }

  inserir(task: Task) {
    let idx = this.localizar(task.id);
    if (idx >= 0) throw new Error(`task de id ${task.id} já existe!`);
    this._tasks.push(task);
  }

  editar(id: number, fieldName: string, fieldValue: number | string | Date) {
    let idx: number = this.localizar(id);
    if (idx < 0) throw new Error(`task de id ${id} não encontrada!`);

    let task = this._tasks[idx];

    if (!(fieldName in task)) throw new Error(`atributo ${fieldName} inválido!`);
    if (typeof fieldValue !== typeof (task as any)[fieldName]) {
      throw new Error(`valor a ser atualizado é inválido! ${fieldValue}`);
    }

    (task as any)[fieldName] = fieldValue;
  }

  remover(id: number) {
    let idx = this.localizar(id);
    if (idx < 0) throw new Error(`task de id ${id} não encontrada!`);
    return this._tasks.splice(idx, 1)[0];
  }

  get(id: number): Task | false {
    let idx: number = this.localizar(id);
    if (idx < 0) throw new Error(`task de id ${id} não encontrada!`)
    return this._tasks[idx];
  }

  localizar(id: number): number {
    return this._tasks.findIndex((t:Task):boolean => (t.id === id));
  }

  inserirTag(id:number, tag: Tag) {
    let idx: number = this.localizar(id);
    if (idx < 0) throw new Error(`task de id ${id} não encontrada!`);

    let task = this._tasks[idx];

    if (task.localizarTag(tag.id) >= 0) throw new Error(`tag de id ${tag.id} já pertence a task!`)

    task.inserirTag(tag);
  }

  getTag(idTask: number, idTag: number): Tag {
    let idxTask: number = this.localizar(idTask);
    if (idxTask < 0) throw new Error(`task de id ${idTask} não encontrada!`)

    let idxTag: number = this._tasks[idxTask].localizarTag(idTag);
    if (idxTag < 0 ) throw new Error(`tag de id ${idTag} não pertence a task de id ${idTask}`)

    return this._tasks[idxTask].tags[idxTag];
  }

  removerTag(idTask: number, idTag: number): Tag {
    let idx = this.localizar(idTask);
    if (idx < 0) throw new Error(`task de id ${idTask} não encontrada!`)

    let task = this._tasks[idx];

    if (task.localizarTag(idTag) < 0) throw new Error(`tag de id ${idTag} não pertence à task!`)

    return task.removerTag(idTag);
  }

}
