export class Tag {
    /* Model class for User */
  
    private readonly _id: number;
    private _title: string;
    private _color: string;
    
    constructor(id: number, title:string, color: string) {
      this._id = id;
      this._title = title;
      this._color = color;
    }
  
    get id():number {
      return this._id;
    }
  
    get title(): string {
      return this._title;
    }
  
    get color(): string {
      return this._color;
    }
  
    set title(title: string) {
      this._title = title;
    }
  
    set color(color: string) {
      this._color = color;
    }
  
    toString(): string {
      return `Tag ${this._id}
      , title:${this._title}
      , color: ${this._color}`;
    }
  }
  