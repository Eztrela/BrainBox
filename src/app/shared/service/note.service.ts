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

  editar(id: number, fieldName: string, fieldValue: number | string | Date) {
    let idx: number = this.localizar(id);
    if (idx < 0) return false;

    let note = this._notes[idx];

    if (!(fieldName in note)) return false;

    (note as any)[fieldName] = fieldValue;
    return true;
  }

  remover(id: number) {
    let idx = this.localizar(id);
    if (idx >= 0) {
      return this._notes.splice(idx, 1)[0];
    } else {
      return false;
    }
  }

  get(id: number): Note | false {
    let idx: number = this.localizar(id);
    if (idx >= 0) {
      return this._notes[idx];
    } else {
      return false;
    }
  }

  localizar(id: number): number {
    return this._notes.findIndex((t:Note):boolean => (t.id === id));
  }

}
