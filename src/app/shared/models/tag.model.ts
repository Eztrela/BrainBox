export class Tag {
    /* Model class for User */

    public id: number;
    public title: string;
    public color: string;

    constructor(id: number, tag: any = {}) {
      this.id = id;
      this.title = tag.title;
      this.color = tag.color;
    }

    toString(): string {
      return `Tag ${this.id}
      , title:${this.title}
      , color: ${this.color}`;
    }
  }
