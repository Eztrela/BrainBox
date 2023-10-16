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

    inserirTask(task: Task) {
      let idx = this.localizarTask(task.id);
      if (idx < 0) {
        this._tasks.push(task);
      } else {
        this._tasks[idx] = task;
      }
    }

    localizarTask(id: number): number {
      return this._tasks.findIndex((t:Task):boolean => (t.id === id));
    }

    removerTask(id: number) {
      let idx = this.localizarTask(id);
      if (idx >= 0) {
        return this._tasks.splice(idx, 1)[0];
      } else {
      return false;
      }
    }

    inserirNote(note: Note) {
      let idx = this.localizarNote(note.id);
      if (idx < 0) {
        this._notes.push(note);
      } else {
        this._notes[idx] = note;
      }
    }

    localizarNote(id: number): number {
      return this._notes.findIndex((n:Note):boolean => (n.id === id));
    }

    public removerNote(id: number) {
      let idx = this.localizarNote(id);
      if (idx >= 0) {
        return this._notes.splice(idx, 1)[0];
      } else {
        return false;
      }
    }

    inserirTag(tag: Tag) {
      let idx = this.localizarTag(tag.id);
      if (idx < 0) {
        this._tags.push(tag);
      } else {
        this._tags[idx] = tag;
      }
    }

    localizarTag(id: number): number {
      return this._tags.findIndex((t:Tag):boolean => (t.id === id));
    }

    public removerTag(id: number) {
      let idx = this.localizarTag(id);
      if (idx >= 0) {
        return this._tags.splice(idx, 1)[0];
      } else {
        return false;
      }
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
