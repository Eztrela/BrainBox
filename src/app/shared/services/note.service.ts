import { Injectable } from '@angular/core';
import { Note } from '../models';
import { NOTES } from "../models/NOTES";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private _notes: Array<Note>;

  constructor() {
    this._notes = NOTES
  }

  listar():Array<Note> {
    return this._notes;
  }

  inserir(note: Note) {
    let idx = this.localizar(note.id);
    if (idx < 0) {
      this._notes.push(note);
    } else {
      this._notes[idx] = note;
    }
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

  get(id: number): Note{
    let idx: number = this.localizar(id);
    if (idx < 0) 
      throw new Error(`A anotação de id ${id} não foi encontrada`)
    return this._notes[idx];
  }

  localizar(id: number): number {
    return this._notes.findIndex((t:Note):boolean => (t.id === id));
  }

  generateID(): number{
    return (this._notes.length > 0) ? this._notes[ this._notes.length -1].id + 1 : 1;
  }

}
