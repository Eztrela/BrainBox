import {INote} from "../interfaces/inote";

export class Note{
  /* Model class for MemoryBox notes */

  public id: number;
  public content:string;

  constructor(id:number, note: any = {}) {
    this.id = id;
    this.content = note.content;
  }

  toString():string {
    return `Note ${this.id}, Content : "${this.content}"`
  }

}
