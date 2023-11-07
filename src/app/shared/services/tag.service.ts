import { Injectable } from '@angular/core';
import { Tag } from "../models";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { PtagPipe } from "../pipes/ptag.pipe";


@Injectable({
  providedIn: 'root'
})
export class TagService {
  /* Class for handling tag CRUD logic */

  private _url = `http://localhost:3000`;
  private _resource: string = "tags";
  private _tagPipe = new PtagPipe();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {}

  create(data:Tag): Observable<Tag> {
    const url_resource: string = `${this._url}/${this._resource}`;
    return this.httpClient.post<Tag>(
      url_resource,
      JSON.stringify(this._tagPipe.transform(data)),
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

  update(id:number, data:Tag): Observable<Tag> {
    const url_resource: string = `${this._url}/${this._resource}/${id}`;
    return this.httpClient.put<Tag>(
      url_resource,
      JSON.stringify(this._tagPipe.transform(data)),
      this.httpOptions
    );
  }

  delete(id:number): Observable<Tag> {
    const url_resource: string = `${this._url}/${this._resource}/${id}`;
    return this.httpClient.delete<Tag>(
      url_resource
    );
  }
//   generateID(): number{
//     return (this._tags.length > 0) ? this._tags[ this._tags.length -1].id + 1 : 1;
//   }

}
