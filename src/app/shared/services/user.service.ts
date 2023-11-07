import { Injectable } from '@angular/core';
import {User, Tag} from '../models';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
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

  getTag(idUser: number, idTag: number) {
    return this.getById(idTag).subscribe((user: User)=> {
      if (user === undefined) throw new Error(`user de id ${idUser} não encontrada!`);

      let idxTag: number = user.localizarTag(idTag);
      if (idxTag < 0) throw new Error(`tag de id ${idTag} não pertence a user de id ${idUser}`)

      return user.tags[idxTag];
    });
  }

  inserirTag(idUser:number, tag: Tag) {
    this.getById(idUser).subscribe((user: User)=> {
      if (user === undefined) throw new Error(`user de id ${idUser} não encontrada!`);
      
      if (user.localizarTag(tag.id) >= 0) throw new Error(`tag de id ${tag.id} já pertence a user!`)
      
      user.inserirTag(tag);
    });
    
  }
  
  removerTag(idUser: number, idTag: number) {
    return this.getById(idUser).subscribe((user:User) => {
      if (user === undefined) throw new Error(`user de id ${idUser} não encontrada!`);

      let idxTag: number = user.localizarTag(idTag);
      if (idxTag < 0) throw new Error(`tag de id ${idTag} não pertence a user de id ${idUser}`)
      
      return user.removerTag(idTag);
    });
  }

  // generateID(): number{
  //   return (this._users.length > 0) ? this._users[ this._users.length -1].id + 1 : 1;
  // }

}
