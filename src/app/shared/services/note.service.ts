import { Injectable } from '@angular/core';
import { Note } from '../models';
import { NOTES } from "../models/NOTES";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private _url: string = 'http://localhost:3000/notes';

  constructor() {
  }

  async listar():Promise<Note[]> {
    const data = await fetch(this._url);
    return await data.json() ?? [];
  }

  inserir(note: Note) {
    let idx = this.localizar(note.id);
    if (idx >= 0) throw new Error(`Anotação de id ${note.id} já existe`);
    this._notes.push(note);

  }

  editar(id: number, fieldName: string, fieldValue: number | string ) {
    let idx: number = this.localizar(id);
    if (idx < 0)
      throw new Error(`A anotação de id ${id} não foi encontrada`)

    let note = this._notes[idx];

    if (!(fieldName in note))
     throw new Error(`A anotação não possui ${fieldName}`)

    if(typeof((note as any)[fieldName]) !== typeof(fieldValue))
      throw new Error(`Valor a ser atualizado é inválido! ${fieldValue}`);
    (note as any)[fieldName] = fieldValue;

    return true;
  }

  remover(id: number) {
    let idx = this.localizar(id);
    if (idx < 0)
      throw new Error(`A anotação de id ${id} não foi encontrada`)
    return this._notes.splice(idx, 1)[0];
  }

  async get(id: number): Promise<Note>{
    const data = await fetch(`${this.url}/${id}`)
    if (data === undefined)
      throw new Error(`A anotação de id ${id} não foi encontrada`)
    return await data.json();
  }

  localizar(id: number): number {
    return this._notes.findIndex((t:Note):boolean => (t.id === id));
  }

  generateID(): number{
    return (this._notes.length > 0) ? this._notes[ this._notes.length -1].id + 1 : 1;
  }

}
