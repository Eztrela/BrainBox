import {Tag} from "./tag.model";
import {Note} from "./note.model";
import {Task} from "./task.model";

export class MemoryBox {
    /* Model class for Task */

    private readonly _id: number;
    private _title: string;
    private _datetimeCreated: Date;
    private _tags: Array<Tag>;
    private _tasks: Array<Task>;
    private _notes: Array<Note>;

    constructor(id: number, title:string) {
      this._id = id;
      this._title = title;
      this._datetimeCreated = new Date();
      this._tasks = new Array<Task>;
      this._notes = new Array<Note>;
      this._tags = new Array<Tag>;
    }

    get id():number {
      return this._id;
    }

    get title(): string {
      return this._title;
    }

    get datetimeCreated(): Date {
      return this._datetimeCreated;
    }

    get tasks(): Array<Task> {
      return this._tasks;
    }

    get notes(): Array<Note> {
      return this._notes;
    }

    get tags(): Array<Tag> {
        return this._tags;
    }

    set title(title: string) {
      this._title = title;
    }

    toString(): string {
      return `MemoryBox ${this._id}
      , title:${this._title}
      , created at: ${this._datetimeCreated}
      , taks: ${this._tasks}
      , notes: ${this._notes}
      , tags: ${this._tags}`;
    }
  }
