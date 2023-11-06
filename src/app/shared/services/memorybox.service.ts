import { Injectable } from '@angular/core';
import {MemoryBox, Tag, Note, Task} from "../models";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import { catchError } from "rxjs/operators";
import { PmemoryboxPipe } from "../pipes/pmemorybox.pipe";

@Injectable({
  providedIn: 'root'
})
export class MemoryboxService {

  private _url = `http://localhost:3000`;
  private _resource: string = "memoryboxes";
  private _memoryboxPipe = new PmemoryboxPipe();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  // private _memoryboxes: Array<MemoryBox>;

  constructor(private httpClient: HttpClient) {}


  // generateID(): number{
  //   return (this._memoryboxes.length > 0) ? this._memoryboxes[ this._memoryboxes.length -1].id + 1 : 1;
  // }

  create(memorybox:MemoryBox): Observable<MemoryBox> {
    const url_resource: string = `${this._url}/${this._resource}`;
    return this.httpClient.post<MemoryBox>(
      url_resource,
      JSON.stringify(this._memoryboxPipe.transform(memorybox)),
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

  update(id:number, data:MemoryBox): Observable<MemoryBox> {
    const url_resource: string = `${this._url}/${this._resource}/${id}`;
    return this.httpClient.put<MemoryBox>(
      url_resource,
      JSON.stringify(this._memoryboxPipe.transform(data)),
      this.httpOptions
    );
  }

  delete(id:number): Observable<MemoryBox> {
    const url_resource: string = `${this._url}/${this._resource}/${id}`;
    return this.httpClient.delete<MemoryBox>(
      url_resource
    );
  }

  getTag(idMemoryBox: number, idTag: number) {
    return this.getById(idTag).subscribe((memoryBox: MemoryBox)=> {
      if (memoryBox === undefined) throw new Error(`memoryBox de id ${idTag} não encontrada!`);

      let idxTag: number = memoryBox.localizarTag(idTag);
      if (idxTag < 0) throw new Error(`tag de id ${idTag} não pertence a memoryBox de id ${idMemoryBox}`)

      return memoryBox.tags[idxTag];
    });
  }

  inserirTag(idMemoryBox:number, tag: Tag) {
    this.getById(idMemoryBox).subscribe((memoryBox: MemoryBox)=> {
      if (memoryBox === undefined) throw new Error(`memoryBox de id ${idMemoryBox} não encontrada!`);
      
      if (memoryBox.localizarTag(tag.id) >= 0) throw new Error(`tag de id ${tag.id} já pertence a memoryBox!`)
      
      memoryBox.inserirTag(tag);
    });
    
  }
  
  removerTag(idMemoryBox: number, idTag: number) {
    return this.getById(idMemoryBox).subscribe((memoryBox:MemoryBox) => {
      if (memoryBox === undefined) throw new Error(`memoryBox de id ${idTag} não encontrada!`);

      let idxTag: number = memoryBox.localizarTag(idTag);
      if (idxTag < 0) throw new Error(`tag de id ${idTag} não pertence a memoryBox de id ${idMemoryBox}`)
      
      return memoryBox.removerTag(idTag);
    });
  }

  getNote(idMemoryBox: number, idNote: number) {
    return this.getById(idNote).subscribe((memoryBox: MemoryBox)=> {
      if (memoryBox === undefined) throw new Error(`memoryBox de id ${idMemoryBox} não encontrada!`);

      let idxNote: number = memoryBox.localizarNote(idNote);
      if (idxNote < 0) throw new Error(`note de id ${idNote} não pertence a memoryBox de id ${idMemoryBox}`)

      return memoryBox.tags[idxNote];
    });
  }

  inserirNote(idMemoryBox:number, note: Note) {
    this.getById(idMemoryBox).subscribe((memoryBox: MemoryBox)=> {
      if (memoryBox === undefined) throw new Error(`memoryBox de id ${idMemoryBox} não encontrada!`);
      
      if (memoryBox.localizarNote(note.id) >= 0) throw new Error(`note de id ${note.id} já pertence a memoryBox!`)
      
      memoryBox.inserirNote(note);
    });
    
  }

  removerNote(idMemoryBox: number, idNote: number) {
    return this.getById(idMemoryBox).subscribe((memoryBox: MemoryBox) => {
      if (memoryBox === undefined) throw new Error(`memorybox de id ${idMemoryBox} não encontrada!`);

      let idxNote: number = memoryBox.localizarNote(idNote);
      if (idxNote < 0) throw new Error(`note de id ${idNote} não pertence a memorybox de id ${idMemoryBox}`)

      return memoryBox.removerNote(idNote);
    });
  }

  getTask(idMemoryBox: number, idTask: number) {
    return this.getById(idTask).subscribe((memoryBox: MemoryBox)=> {
      if (memoryBox === undefined) throw new Error(`memoryBox de id ${idMemoryBox} não encontrada!`);

      let idxTask: number = memoryBox.localizarTask(idTask);
      if (idxTask < 0) throw new Error(`note de id ${idTask} não pertence a memoryBox de id ${idMemoryBox}`)

      return memoryBox.tags[idxTask];
    });
  }


  inserirTask(idMemoryBox:number, task: Task) {
    this.getById(idMemoryBox).subscribe((memoryBox: MemoryBox)=> {
      if (memoryBox === undefined) throw new Error(`memoryBox de id ${idMemoryBox} não encontrada!`);
      
      if (memoryBox.localizarNote(task.id) >= 0) throw new Error(`task de id ${task.id} já pertence a memoryBox!`)
      
      memoryBox.inserirTask(task);
    });
    
  }

  removerTask(idMemoryBox: number, idTask: number) {
    return this.getById(idMemoryBox).subscribe((memoryBox: MemoryBox) => {
      if (memoryBox === undefined) throw new Error(`memorybox de id ${idMemoryBox} não encontrada!`);

      let idxTask: number = memoryBox.localizarNote(idTask);
      if (idxTask < 0) throw new Error(`note de id ${idTask} não pertence a memorybox de id ${idMemoryBox}`)

      return memoryBox.removerTask(idTask);
    });
  }
  
}
