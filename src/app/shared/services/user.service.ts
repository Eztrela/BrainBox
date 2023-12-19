import { Injectable } from '@angular/core';
import {User, Tag} from '../models';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError, map} from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _url = `http://localhost:8080`;
  private _resource: string = "users";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) {}

  create(username: string, email: string, password:string): Observable<User> {
    const url_resource: string = `${this._url}/${this._resource}`;
    return this.httpClient.post<User>(
      url_resource,
      JSON.stringify(
        {
          username: username,
          email: email,
          password: password
        }
      ),
      this.httpOptions
    );
  }

  getById(id:number): Observable<User> {
    const url_resource: string = `${this._url}/${this._resource}/${id}`;
    return this.httpClient.get<User>(
      url_resource
    );
  }

  getByEmail(email:string): Observable<User> {
    const url_resource: string = `${this._url}/${this._resource}/email/${email}`;
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
      JSON.stringify(data),
      this.httpOptions
    );
  }

  delete(id:number): Observable<User> {
    const url_resource: string = `${this._url}/${this._resource}/${id}`;
    return this.httpClient.delete<User>(
      url_resource
    );
  }

  validate(username: string, email: string) {
    const url_resource: string = `${this._url}/${this._resource}/validate`;
    return this.httpClient.post<boolean>(
      url_resource,
      JSON.stringify(
        {
          username: username,
          email: email
        }
      ),
      this.httpOptions
    );
  }

  validatePassword(username: string, password: string) {
    const url_resource: string = `${this._url}/${this._resource}/auth`;
    return this.httpClient.post<boolean>(
      url_resource,
      JSON.stringify(
        {
          username: username,
          password: password
        }
      ),
      this.httpOptions
    );
  }
}
