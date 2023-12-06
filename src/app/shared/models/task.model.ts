import {Tag} from "./tag.model";

export class Task {
    /* Model class for Task */

    public id: number;
    public title: string;
    public description: string;
    public status: string;
    public datetimeCreated: Date;
    public datetimeDue: Date;
    public priority: number;
    public tags: Array<Number>;



    constructor(id:number, task: any = {}) {
        this.id = id;
      this.title = task.title;
      this.description = task.description;
      this.status = task.status;
      this.datetimeCreated = new Date();
      this.datetimeDue = task.datetimeDue;
      this.priority = task.priority;
      this.tags = task.tags;

    }

    toString(): string {
      return `Task ${this.id}
      , title:${this.title}
      , description: ${this.description}
      , created at: ${this.datetimeCreated}
      , to deliver at: ${this.datetimeDue}
      , priority: ${this.priority}
      , status: ${this.status}
      , tags: ${this.tags}`;
    }
  }
