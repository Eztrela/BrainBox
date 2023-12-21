import { Injectable } from '@angular/core';
import {Note} from '../models';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class NoteService {


  private _url = `http://localhost:8080`;
  private _resource: string = "notes";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {
  }

  create(data: any): Observable<Note> {
    const url_resource: string = `${this._url}/${this._resource}`;
    return this.httpClient.post<Note>(
      url_resource,
      JSON.stringify(data),
      this.httpOptions
    );
  }

  update(id: number, data: any): Observable<Note> {
    const url_resource: string = `${this._url}/${this._resource}/${id}`;
    return this.httpClient.put<Note>(
      url_resource,
      JSON.stringify(data),
      this.httpOptions
    );
  }

  delete(id: number): Observable<void> {
    const url_resource: string = `${this._url}/${this._resource}/${id}`;
    return this.httpClient.delete<void>(
      url_resource
    );
  }

  getById(id: number): Observable<Note> {
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
}
