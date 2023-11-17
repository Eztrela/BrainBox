import { Injectable } from '@angular/core';
import {User, Tag} from '../models';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError, map} from "rxjs";
import { catchError } from "rxjs/operators";
import { PuserPipe } from "../pipes/puser.pipe";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _url = `http://localhost:3000`;
  private _resource: string = "users";
  private _userPipe = new PuserPipe();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) {}

  generateID(): Observable<number> {
    return this.getAll().pipe(
      map((res: User[]) => {
        if (res && res.length > 0) {
          const maxId = Math.max(...res.map(user => user.id));
          return maxId + 1;
        } else {
          return 1;
        }
      })
    );
  }

  create(user:User): Observable<User> {
    const url_resource: string = `${this._url}/${this._resource}`;
    return this.httpClient.post<User>(
      url_resource,
      JSON.stringify(this._userPipe.transform(user)),
      this.httpOptions
    );
  }

  getById(id:number): Observable<User> {
    const url_resource: string = `${this._url}/${this._resource}/${id}`;
    return this.httpClient.get<User>(
      url_resource
    );
  }

  getAll(): Observable<User[]> {
    const url_resource: string = `${this._url}/${this._resource}`;
    return this.httpClient.get<User[]>(
      url_resource
    );
  }

  update(id:number, data:User): Observable<User> {
    const url_resource: string = `${this._url}/${this._resource}/${id}`;
    return this.httpClient.put<User>(
      url_resource,
      JSON.stringify(this._userPipe.transform(data)),
      this.httpOptions
    );
  }

  delete(id:number): Observable<User> {
    const url_resource: string = `${this._url}/${this._resource}/${id}`;
    return this.httpClient.delete<User>(
      url_resource
    );
  }

}
