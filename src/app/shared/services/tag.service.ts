import { Injectable } from '@angular/core';
import {Tag} from "../models";
import {TAGS} from "../models/TAGS";

@Injectable({
  providedIn: 'root'
})
export class TagService {
  /* Class for handling tag CRUD logic */

  private _tags: Array<Tag>;
  constructor() {
    this._tags = TAGS;
  }

  listar():Array<Tag> {
    return this._tags;
  }

  inserir(tag: Tag) {
    let idx = this.localizar(tag.id);
    if (idx < 0) {
      this._tags.push(tag);
    } else {
      this._tags[idx] = tag;
    }
  }

  editar(id: number, fieldName: string, fieldValue: number | string | Date) {
    let idx: number = this.localizar(id);
    if (idx < 0) return false;

    let task = this._tags[idx];

    if (!(fieldName in task)) return false;

    (task as any)[fieldName] = fieldValue;
    return true;
  }

  remover(id: number) {
    let idx = this.localizar(id);
    if (idx >= 0) {
      return this._tags.splice(idx, 1)[0];
    } else {
      return false;
    }
  }

  get(id: number): Tag | false {
    let idx: number = this.localizar(id);
    if (idx >= 0) {
      return this._tags[idx];
    } else {
      return false;
    }
  }

  localizar(id: number): number {
    return this._tags.findIndex((t:Tag):boolean => (t.id === id));
  }
}
