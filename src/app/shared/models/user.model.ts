import {Tag} from "./tag.model";
import {MemoryBox} from "./memoryBox.model";

export class User {
  /* Model class for User */

  private readonly _id: number;
  private _email: string;
  private _username: string;
  private _password: string;
  private _notifications: boolean;
  private _memoryBoxes: Array<MemoryBox>;
  private _tags: Array<Tag>;

  constructor(id: number, email:string, username: string, password: string, notifications: boolean) {
    this._id = id;
    this._email = email;
    this._username = username;
    this._password = password;
    this._notifications = notifications;
    this._memoryBoxes = new Array<MemoryBox>;
    this._tags = new Array<Tag>;
  }

  inserirMemoryBox(memoryBox: MemoryBox) {
    let idx = this.localizarMemoryBox(memoryBox.id);
    if (idx < 0) {
      this._memoryBoxes.push(memoryBox);
    } else {
      this._memoryBoxes[idx] = memoryBox;
    }
  }

  localizarMemoryBox(id: number): number {
    return this._memoryBoxes.findIndex((m:MemoryBox):boolean => (m.id === id));
  }

  public removerMemoryBox(id: number) {
    let idx = this.localizarMemoryBox(id);
    if (idx >= 0) {
      return this._memoryBoxes.splice(idx, 1)[0];
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

  get email(): string {
    return this._email;
  }

  get username(): string {
    return this._username;
  }

  get password(): string {
    return this._password;
  }

  get notifications(): boolean {
    return this._notifications;
  }

  get memoryBoxes(): Array<MemoryBox> {
    return this._memoryBoxes;
  }

  get tags(): Array<Tag> {
    return this._tags;
  }

  set email(email: string) {
    this._email = email;
  }

  set username(username: string) {
    this._username = username;
  }

  set password(password: string) {
    this._password = password;
  }

  toString(): string {
    return `User ${this._id}
    , email:${this._email}
    , username: ${this._username}
    , has notifications: ${this._notifications}
    , memoryBoxes: ${this._memoryBoxes}
    , tags: ${this._tags}`;
  }
}
