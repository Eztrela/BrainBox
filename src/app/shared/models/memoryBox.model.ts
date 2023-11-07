import {Tag, Note, Task, User} from "../models";

export class MemoryBox {
    /* Model class for Task */

    private readonly _id: number;
    private readonly _user: number;
    private _title: string;
    private _datetimeCreated: Date;
    private _tags: Array<number>;
    private _tasks: Array<number>;
    private _notes: Array<number>;

    constructor(id: number, title:string, user:number) {
      this._id = id;
      this._user = user;
      this._title = title;
      this._datetimeCreated = new Date();
      this._tasks = new Array<number>;
      this._notes = new Array<number>;
      this._tags = new Array<number>;
    }

    inserirTask(task: number) {
      this._tasks.push(task);
    }

    localizarTask(id: number): number {
      return this._tasks.findIndex((t:number):boolean => (t === id));
    }

    removerTask(id: number) {
      let idx = this.localizarTask(id);
      return this._tasks.splice(idx, 1)[0];
    }

    inserirNote(note: number) {
      this._notes.push(note);
    }

    localizarNote(id: number): number {
      return this._notes.findIndex((n:number):boolean => (n === id));
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

    get user(): number {
      return this._user;
    }

    get title(): string {
      return this._title;
    }

    get datetimeCreated(): Date {
      return this._datetimeCreated;
    }

    get tasks(): Array<number> {
      return this._tasks;
    }

    get notes(): Array<number> {
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
