import { Injectable } from '@angular/core';
import {User} from '../models';
import {USERS} from '../models/USERS';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users: Array<User>;

  constructor() { 
    this._users = USERS;
  }

  listar(): Array<User>{
    return this._users;
  }

  inserir(user: User) {
    let idx = this.localizar(user.id);
    if (idx < 0) {
      this._users.push(user);
    } else {
      this._users[idx] = user;
    }
  }

  editar(id: number, fieldName: string, fieldValue: string ) {
    let idx: number = this.localizar(id);
    if (idx < 0) 
      throw new Error(`O usuário de id ${id} não foi encontrado`)

    let user = this._users[idx];

    if (!(fieldName in user))
      throw new Error(`O usuaário não possui ${fieldName}`)

    if(typeof((user as any)[fieldName]) !== typeof(fieldValue))
      throw new Error(`Valor a ser atualizado é inválido! ${fieldValue}`);
    (user as any)[fieldName] = fieldValue;
    
    return true;
  }
  
  remover(id: number) {
    let idx = this.localizar(id);
    if (idx < 0) 
      throw new Error(`O usuário de id ${id} não foi encontrado`)
    return this._users.splice(idx, 1)[0];
  }

  get(id: number): User{
    let idx: number = this.localizar(id);
    if (idx < 0) 
      throw new Error(`O usuário de id ${id} não foi encontrado`)
    return this._users[idx];
  }

  localizar(id: number): number {
    return this._users.findIndex((t:User):boolean => (t.id === id));
  }

  generateID(): number{
    return (this._users.length > 0) ? this._users[ this._users.length -1].id + 1 : 1;
  }

}
