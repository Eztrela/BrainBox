export class User {
  /* Model class for User */

  private readonly _id: number;
  private _email: string;
  private _username: string;
  private _password: string;
  private _notifications: boolean;
  private _memoryBoxes: Array<string>;
  private _tags: Array<string>;

  constructor(id: number, email:string, username: string, password: string, notifications: boolean) {
    this._id = id;
    this._email = email;
    this._username = username;
    this._password = password;
    this._notifications = notifications;
    this._memoryBoxes = new Array<string>;
    this._tags = new Array<string>;
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

  get memoryBoxes(): Array<string> {
    return this._memoryBoxes;
  }

  get tags(): Array<string> {
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
