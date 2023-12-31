import { Injectable } from '@angular/core';
import { Tag } from "../models";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import {TagInsertDTO} from "../dtos/taginsertdto";


@Injectable({
  providedIn: 'root'
})
export class TagService {
  /* Class for handling tag CRUD logic */

  private _url = `http://localhost:4000`;
  private _resource: string = "tags";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {}

  create(data: any): Observable<Tag> {
    const url_resource: string = `${this._url}/${this._resource}`;
    return this.httpClient.post<Tag>(
      url_resource,
      JSON.stringify(data),
      this.httpOptions
    );
  }

  getById(id:number): Observable<Tag> {
    const url_resource: string = `${this._url}/${this._resource}/${id}`;
    return this.httpClient.get<Tag>(
      url_resource
    );
  }

  getAll(): Observable<Tag[]> {
    const url_resource: string = `${this._url}/${this._resource}`;
    return this.httpClient.get<Tag[]>(
      url_resource
    );
  }

  update(id:number, data:TagInsertDTO): Observable<Tag> {
    const url_resource: string = `${this._url}/${this._resource}/${id}`;
    return this.httpClient.put<Tag>(
      url_resource,
      JSON.stringify(data),
      this.httpOptions
    );
  }

  delete(id:number): Observable<void> {
    const url_resource: string = `${this._url}/${this._resource}/${id}`;
    return this.httpClient.delete<void>(
      url_resource
    );
  }
}
