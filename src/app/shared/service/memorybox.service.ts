import { Injectable } from '@angular/core';
import {Task, Tag, Note, MemoryBox} from "../models";
import {MEMORYBOXES} from "../models/MEMORYBOXES";

@Injectable({
  providedIn: 'root'
})
export class MemoryboxService {

  private _memoryboxes: Array<MemoryBox>;

  constructor() {
    this._memoryboxes = MEMORYBOXES;
  }


  generateID(): number{
    return (this._memoryboxes.length > 0) ? this._memoryboxes[ this._memoryboxes.length -1].id + 1 : 1;
  }

  listar():Array<MemoryBox> {
    return this._memoryboxes;
  }

  inserir(memorybox: MemoryBox) {
    let idx = this.localizar(memorybox.id);
    if (idx >= 0) throw new Error(`memorybox de id ${memorybox.id} já existe!`);
    this._memoryboxes.push(memorybox);
  }

  editar(id: number, fieldName: string, fieldValue: number | string | Date) {
    let idx: number = this.localizar(id);
    if (idx < 0) throw new Error(`memorybox de id ${id} não encontrada!`);

    let task = this._memoryboxes[idx];

    if (!(fieldName in task)) throw new Error(`atributo ${fieldName} inválido!`);
    if (typeof fieldValue !== typeof (task as any)[fieldName]) {
      throw new Error(`valor a ser atualizado é inválido! ${fieldValue}`);
    }

    (task as any)[fieldName] = fieldValue;
  }

  remover(id: number) {
    let idx = this.localizar(id);
    if (idx < 0) throw new Error(`memorybox de id ${id} não encontrada!`);
    return this._memoryboxes.splice(idx, 1)[0];
  }

  get(id: number): MemoryBox {
    let idx: number = this.localizar(id);
    if (idx < 0) throw new Error(`memorybox de id ${id} não encontrada!`)
    return this._memoryboxes[idx];
  }

  localizar(id: number): number {
    return this._memoryboxes.findIndex((m:MemoryBox):boolean => (m.id === id));
  }

  inserirTag(id:number, tag: Tag) {
    let idx: number = this.localizar(id);
    if (idx < 0) throw new Error(`memorybox de id ${id} não encontrada!`);

    let memorybox = this._memoryboxes[idx];

    if (memorybox.localizarTag(tag.id) >= 0) throw new Error(`tag de id ${tag.id} já pertence a memorybox!`)

    memorybox.inserirTag(tag);
  }

  getTag(idMemoryBox: number, idTag: number): Tag {
    let idxMemoryBox: number = this.localizar(idMemoryBox);
    if (idxMemoryBox < 0) throw new Error(`memorybox de id ${idMemoryBox} não encontrada!`)

    let idxTag: number = this._memoryboxes[idxMemoryBox].localizarTag(idTag);
    if (idxTag < 0) throw new Error(`tag de id ${idTag} não pertence a memorybox de id ${idMemoryBox}!`)

    return this._memoryboxes[idxMemoryBox].tags[idxTag];
  }

  removerTag(idMemoryBox: number, idTag: number): Tag {
    let idx = this.localizar(idMemoryBox);
    if (idx < 0) throw new Error(`memorybox de id ${idMemoryBox} não encontrada!`)

    let memorybox = this._memoryboxes[idx];

    if (memorybox.localizarTag(idTag) < 0) throw new Error(`tag de id ${idTag} não pertence à task!`)

    return memorybox.removerTag(idTag);
  }

  inserirTask(id:number, task: Task) {
    let idx: number = this.localizar(id);
    if (idx < 0) throw new Error(`memorybox de id ${id} não encontrada!`);

    let memorybox = this._memoryboxes[idx];

    if (memorybox.localizarTask(task.id) >= 0) throw new Error(`task de id ${task.id} já pertence a memorybox!`)

    memorybox.inserirTask(task);
  }

  getTask(idMemoryBox: number, idTask: number): Task {
    let idxMemoryBox: number = this.localizar(idMemoryBox);
    if (idxMemoryBox < 0) throw new Error(`memorybox de id ${idMemoryBox} não encontrada!`)

    let idxTask: number = this._memoryboxes[idxMemoryBox].localizarTask(idTask);
    if (idxTask < 0) throw new Error(`task de id ${idTask} não pertence a memorybox de id ${idMemoryBox}!`)

    return this._memoryboxes[idxMemoryBox].tasks[idxTask];
  }

  removerTask(idMemoryBox: number, idTask: number): Task {
    let idx = this.localizar(idMemoryBox);
    if (idx < 0) throw new Error(`memorybox de id ${idMemoryBox} não encontrada!`)

    let memorybox = this._memoryboxes[idx];

    if (memorybox.localizarTask(idTask) < 0) throw new Error(`task de id ${idTask} não pertence à memorybox!`)

    return memorybox.removerTask(idTask);
  }

  inserirNote(id:number, note: Note) {
    let idx: number = this.localizar(id);
    if (idx < 0) throw new Error(`memorybox de id ${id} não encontrada!`);

    let memorybox = this._memoryboxes[idx];

    if (memorybox.localizarNote(note.id) >= 0) throw new Error(`note de id ${note.id} já pertence a memorybox!`)

    memorybox.inserirNote(note);
  }

  getNote(idMemoryBox: number, idNote: number): Note {
    let idxMemoryBox: number = this.localizar(idMemoryBox);
    if (idxMemoryBox < 0) throw new Error(`memorybox de id ${idMemoryBox} não encontrada!`)

    let idxNote: number = this._memoryboxes[idxMemoryBox].localizarNote(idNote);
    if (idxNote < 0) throw new Error(`note de id ${idNote} não pertence a memorybox de id ${idMemoryBox}!`)

    return this._memoryboxes[idxMemoryBox].notes[idxNote];
  }

  removerNote(idMemoryBox: number, idNote: number): Note {
    let idx = this.localizar(idMemoryBox);
    if (idx < 0) throw new Error(`memorybox de id ${idMemoryBox} não encontrada!`)

    let memorybox = this._memoryboxes[idx];

    if (memorybox.localizarNote(idNote) < 0) throw new Error(`note de id ${idNote} não pertence à memorybox!`)

    return memorybox.removerNote(idNote);
  }


}
