import {INote} from "../interfaces/inote";

export class Note{
  /* Model class for MemoryBox notes */

  private _id: number | undefined = undefined;
  private _content:string;

  constructor(id:number, content:string) {
    this._id = id;
    this._content = content;
  }

  get id():number | undefined {
    return this._id;
  }

  get content():string {
    return this._content;
  }

  set id(id:number) {
    this._id = id;
  }

  set content(content) {
    this._content = content;
  }

  toString():string {
    return `Note ${this._id}, Content : "${this._content}"`
  }

}
