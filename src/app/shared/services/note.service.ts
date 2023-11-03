import { Injectable } from '@angular/core';
import {Note} from '../models';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import { catchError } from "rxjs/operators";
import {INote} from "../interfaces/inote";
import { PnotePipe } from "../pipes/pnote.pipe";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private _url = `http://localhost:3000`;
  private _resource: string = "notes";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {}

  create(note:Note): Observable<Note> {
    const url_resource: string = `${this._url}/${this._resource}`;
    const note_pipe = new PnotePipe();
    return this.httpClient.post<Note>(
      url_resource,
      JSON.stringify(note_pipe.transform(note)),
      this.httpOptions
    );
  }

  getById(id:number): Observable<Note> {
    const url_resource: string = `${this._url}/${this._resource}/${id}`;
    return this.httpClient.get<Note>(
      url_resource
    );
  }

  getAll(): Observable<Note[]> {
    const url_resource: string = `${this._url}/${this._resource}`;
    return this.httpClient.get<Note[]>(
      url_resource
    );
  }

  update(id:number, data:Note): Observable<Note> {
    const url_resource: string = `${this._url}/${this._resource}/${id}`;
    return this.httpClient.post<Note>(
      url_resource,
      JSON.stringify(data),
      this.httpOptions
    );
  }

  delete(id:number): Observable<Note> {
    const url_resource: string = `${this._url}/${this._resource}/${id}`;
    return this.httpClient.delete<Note>(
      url_resource
    );
  }

}
