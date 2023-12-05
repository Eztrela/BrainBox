import {Tag} from "./tag.model";
import {MemoryBox} from "./memoryBox.model";

export class User {
  /* Model class for User */

  public id: number;
  public email: string;
  public username: string;
  public password: string;
  public notifications: boolean;
  public memoryBoxes: Array<number>;

  constructor(id: number, user: any = {}) {
    this.id = id;
    this.email = user.email;
    this.username = user.username;
    this.password = user.password;
    this.notifications = user.notifications;
    this.memoryBoxes = new Array<number>;
  }

  toString(): string {
    return `User ${this.id}
    , email:${this.email}
    , username: ${this.username}
    , has notifications: ${this.notifications}
    , memoryBoxes: ${this.memoryBoxes}`;
  }
}
