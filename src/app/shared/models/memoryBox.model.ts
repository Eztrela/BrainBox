import {Note, Tag, Task} from "../models";

export class MemoryBox {
  /* Model class for Task */

  public id: string;
  public user: number;
  public title: string;
  public datetimeCreated: Date;
  public tags: Array<Tag>;
  public tasks: Array<Task>;
  public notes: Array<Note>;
  public banner: string = "";

  constructor(id: string,banner?: string, memorybox: any = {}) {
    this.id = id;
    this.user = memorybox.user;
    this.title = memorybox.title;
    this.datetimeCreated = new Date();
    this.tasks = new Array<Task>;
    this.notes = new Array<Note>;
    this.tags = new Array<Tag>;
    if (banner) {
      this.banner = banner;
    }
  }

  toString(): string {
    return `MemoryBox ${this.id}
      , user: ${this.user}
      , title:${this.title}
      , created at: ${this.datetimeCreated}
      , taks: ${this.tasks}
      , notes: ${this.notes}
      , tags: ${this.tags}
      , banner: ${this.banner}`;
  }
}
