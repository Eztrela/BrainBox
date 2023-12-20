import { Injectable } from '@angular/core';
import {User, Tag} from '../models';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError, map} from "rxjs";
import { catchError } from "rxjs/operators";
import {UserValidateReturnDTO} from "../dtos/uservalidatereturndto";
import {UserInsertDTO} from "../dtos/userinsertdto";

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

  update(username:string, email:string, password:string, id:number): Observable<User> {
    const url_resource: string = `${this._url}/${this._resource}/${id}`;
    const userUpdateDTO: UserInsertDTO =  new UserInsertDTO(username, email, password);
    return this.httpClient.put<User>(
      url_resource,
      JSON.stringify(userUpdateDTO),
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
    const user: UserValidateReturnDTO = new UserValidateReturnDTO(username, email);
    return this.httpClient.post<UserValidateReturnDTO>(
      url_resource,
      JSON.stringify(user),
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
