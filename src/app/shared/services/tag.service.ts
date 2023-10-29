import { Injectable } from '@angular/core';
import {Note, Tag} from "../models";
import {TAGS} from "../models/TAGS";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TagService {
  /* Class for handling tag CRUD logic */

  private _url = `http://localhost:3000`;
  private _resource: string = "tags";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {}

  create(data:Note): Observable<Note> {
    const url_resource: string = `${this._url}/${this._resource}`;
    return this.httpClient.post<Note>(
      url_resource,
      JSON.stringify(data),
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
