import { Injectable } from '@angular/core';

import { MemoryBox, Task } from "../models";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { map, max, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import {TaskEvent} from "../interfaces/task-event";


@Injectable({
  providedIn: 'root'
})
export class MemoryboxService {


  private _url = `http://localhost:3000`;
  private _resource: string = "memoryBoxes";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {}


  generateID(): Observable<number> {
    return this.getAll().pipe(
      map((res: MemoryBox[]) => {
        if (res && res.length > 0) {
          const maxId = Math.max(...res.map(box => {
            return box.id ? box.id : 0
          }));
          return maxId + 1;
        } else {
          return 1;
        }
      })
    );
  }

  create(memorybox:MemoryBox): Observable<MemoryBox> {
    const url_resource: string = `${this._url}/${this._resource}`;
    return this.httpClient.post<MemoryBox>(
      url_resource,
      JSON.stringify(memorybox),
      this.httpOptions
    );
  }

  getById(id:number): Observable<MemoryBox> {
    const url_resource: string = `${this._url}/${this._resource}/${id}`;
    return this.httpClient.get<MemoryBox>(
      url_resource
    );
  }

  getAll(): Observable<MemoryBox[]> {
    const url_resource: string = `${this._url}/${this._resource}`;
    return this.httpClient.get<MemoryBox[]>(
      url_resource
    );
  }

  getAllTasks() {
    return this.getAll().pipe(
      map((res: MemoryBox[]) => {
        let tasks: Task[] = [];
        for (let box of res) {
          tasks = tasks.concat(box.tasks);
        }
        return tasks;
      })
    );
  }

  getAllTasksWithColor(): Observable<TaskEvent[]> {
    return this.getAll().pipe(
      map((res: MemoryBox[]) => {
        let tasksWithColor: TaskEvent[] = [];

        for (let box of res) {
          for (let task of box.tasks) {
            const matchingTag = box.tags.find(tag => tag.id === task.tags[0]);
            const tagColor = matchingTag ? matchingTag.color : '#9593D9';
            tasksWithColor.push({
              task: task,
              idBox: box.id,
              color: tagColor
            });
          }
        }
        return tasksWithColor;
      })
    );
  }


  update(id:number, data:MemoryBox): Observable<MemoryBox> {
    const url_resource: string = `${this._url}/${this._resource}/${id}`;
    return this.httpClient.put<MemoryBox>(
      url_resource,
      JSON.stringify(data),
      this.httpOptions
    );
  }

  delete(id:number): Observable<MemoryBox> {
    const url_resource: string = `${this._url}/${this._resource}/${id}`;
    return this.httpClient.delete<MemoryBox>(
      url_resource
    );
  }
}
