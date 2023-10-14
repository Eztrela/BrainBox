export class User {
    /* Model class for User */
  
    private readonly _id: number;
    private _title: string;
    private _desciption: string;
    private _status: string;
    private _datetimeCreated: Date;
    private _datetimeDue: Date;
    private _priority: number;
    private _tags: Array<Tag>;
  
    constructor(id: number, title:string, desciption: string, status: string, datetimeDue: Date, priority: number) {
      this._id = id;
      this._title = title;
      this._desciption = desciption;
      this._status = status;
      this._datetimeCreated = new Date();
      this._datetimeDue = new Date();
      this._priority = priority;
      this._tags = new Array<Tag>;
    }
  
    get id():number {
      return this._id;
    }
  
    get title(): string {
      return this._title;
    }
  
    get desciption(): string {
      return this._desciption;
    }
  
    get status(): string {
      return this._status;
    }
  
    get datetimeCreated(): Date {
      return this._datetimeCreated;
    }
  
    get datetimeDue(): Date {
      return this._datetimeDue;
    }
  
    get priority(): number {
      return this._priority;
    }

    get tags(): Array<Tag> {
        return this._tags;
    }
  
    set title(title: string) {
      this._title = title;
    }
  
    set desciption(desciption: string) {
      this._desciption = desciption;
    }
  
    set status(status: string) {
      this._status = status;
    }

    set priority(priority: number) {
        this._priority = priority;
    }

    set datetimeDue(datetimeDue: Date){
        this._datetimeDue = datetimeDue;
    }
  
    toString(): string {
      return `Task ${this._id}
      , title:${this._title}
      , desciption: ${this._desciption}
      , created at: ${this._datetimeCreated}
      , to deliver at: ${this._datetimeDue}
      , priority: ${this._priority}
      , status: ${this._status}
      , tags: ${this._tags}`;
    }
  }
  