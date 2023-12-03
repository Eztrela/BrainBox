import {Tag} from "./tag.model";
import {MemoryBox} from "./memoryBox.model";

export class User {
  /* Model class for User */

  public id: number;
  public email: string;
  public username: string;
  public password: string;
  public memoryBoxes: Array<number>;

  constructor(id: number, user: any = {}) {
    this.id = id;
    this.email = user.email;
    this.username = user.username;
    this.password = user.password;
    this.memoryBoxes = new Array<number>;
  }

  toString(): string {
    return `User ${this.id}
    , email:${this.email}
    , username: ${this.username}
    , memoryBoxes: ${this.memoryBoxes}`;
  }
}
