import { INote } from "../interfaces/inote";
import { ITask } from "../interfaces/itask";
import { Note, Task } from "../models";
import { PnotePipe } from "../pipes/pnote.pipe";
import { PtaskPipe } from "../pipes/ptask.pipe";

export class MemoryBox {
  /* Model class for Task */

  private readonly _id: number;
  private readonly _user: number;
  private _title: string;
  private _datetimeCreated: Date;
  private _tags: Array<number>;
  private _tasks: Array<ITask>;
  private _notes: Array<INote>;

  constructor(id: number, title:string, user:number) {
    this._id = id;
    this._user = user;
    this._title = title;
    this._datetimeCreated = new Date();
    this._tasks = new Array<ITask>;
    this._notes = new Array<INote>;
    this._tags = new Array<number>;
  }

  inserirTask(task: Task) {
    let ptask = new PtaskPipe();
    let nova = ptask.transform(task);
    nova.id = Math.max(...this._tasks.map(task => task.id));
    this._tasks.push(nova);
  }

  localizarTask(id: number): number {
    console.log('entrei aqui')
    return this._tasks.findIndex((t):boolean => (t.id === id));
  }

  public removerTask(id: number) {
    let idx = this.localizarTask(id);
    return this._tasks.splice(idx, 1)[0];
  }

  inserirNote(note: Note) {
    let pnote = new PnotePipe();
    let nova = pnote.transform(note);
    nova.id = Math.max(...this._notes.map(note => note.id));
    this._notes.push(nova);
  }

  localizarNote(id: number): number {
    return this._notes.findIndex((n):boolean => (n.id === id));
  }

  public removerNote(id: number) {
    let idx = this.localizarNote(id);
    return this._notes.splice(idx, 1)[0];
  }

  inserirTag(tag: number) {
    this._tags.push(tag);
  }

  localizarTag(id: number): number {
    return this._tags.findIndex((t:number):boolean => (t === id));
  }

  public removerTag(id: number) {
    let idx = this.localizarTag(id);
    return this._tags.splice(idx, 1)[0];
  }

  get id():number {
    return this._id;
  }

  get user():number {
    return this._user;
  }

  get title(): string {
    return this._title;
  }

  get datetimeCreated(): Date {
    return this._datetimeCreated;
  }

  get tasks(): Array<ITask> {
    return this._tasks;
  }

  get notes(): Array<INote> {
    return this._notes;
  }

  get tags(): Array<number> {
    return this._tags;
  }

  set title(title: string) {
    this._title = title;
  }

  toString(): string {
    return `MemoryBox ${this._id}
      , user: ${this._user}
      , title:${this._title}
      , created at: ${this._datetimeCreated}
      , taks: ${this._tasks}
      , notes: ${this._notes}
      , tags: ${this._tags}`;
  }
}
