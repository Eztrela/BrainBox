import { Injectable } from '@angular/core';
import {Task, Tag} from '../models';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subscription } from "rxjs";
import { PtaskPipe } from "../pipes/ptask.pipe";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _url = `http://localhost:3000`;
  private _resource: string = "tasks";
  private _taskPipe = new PtaskPipe();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {}

  create(data:Task): Observable<Task> {
    const url_resource: string = `${this._url}/${this._resource}`;
    return this.httpClient.post<Task>(
      url_resource,
      JSON.stringify(this._taskPipe.transform(data)),
      this.httpOptions
    );
  }

  getById(id:number): Observable<Task> {
    const url_resource: string = `${this._url}/${this._resource}/${id}`;
    return this.httpClient.get<Task>(
      url_resource
    );
  }

  getAll(): Observable<Task[]> {
    const url_resource: string = `${this._url}/${this._resource}`;
    return this.httpClient.get<Task[]>(
      url_resource
    );
  }

  update(id:number, data:Task): Observable<Task> {
    const url_resource: string = `${this._url}/${this._resource}/${id}`;
    return this.httpClient.post<Task>(
      url_resource,
      JSON.stringify(this._taskPipe.transform(data)),
      this.httpOptions
    );
  }

  delete(id:number): Observable<Task> {
    const url_resource: string = `${this._url}/${this._resource}/${id}`;
    return this.httpClient.delete<Task>(
      url_resource
    );
  }

  getTag(idTask: number, idTag: number) {
    return this.getById(idTag).subscribe((task: Task)=> {
      if (task === undefined) throw new Error(`task de id ${idTag} não encontrada!`);

      let idxTag: number = task.localizarTag(idTag);
      if (idxTag < 0) throw new Error(`tag de id ${idTag} não pertence a task de id ${idTask}`)

      return task.tags[idxTag];
    });
  }

  inserirTag(id:number, tag: Tag) {
    this.getById(id).subscribe((task: Task)=> {
      if (task === undefined) throw new Error(`task de id ${id} não encontrada!`);

      if (task.localizarTag(tag.id) >= 0) throw new Error(`tag de id ${tag.id} já pertence a task!`)

      task.inserirTag(tag);
    });

  }

  removerTag(idTask: number, idTag: number) {
    return this.getById(idTask).subscribe((task: Task) => {
      if (task === undefined) throw new Error(`task de id ${idTag} não encontrada!`);

      let idxTag: number = task.localizarTag(idTag);
      if (idxTag < 0) throw new Error(`tag de id ${idTag} não pertence a task de id ${idTask}`)

      return task.removerTag(idTag);
    });
  }

}
