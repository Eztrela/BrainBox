import { Pipe, PipeTransform } from '@angular/core';
import {User,MemoryBox,Tag} from "../models";
import { IUser } from "../interfaces/iuser";

@Pipe({
  name: 'puser'
})
export class PuserPipe implements PipeTransform {

  transform(user: User): IUser {
    return new class implements IUser {
      tags: Array<Tag> = user.tags;
      memoryBoxes: Array<MemoryBox> = user.memoryBoxes;
      notifications: boolean = user.notifications;
      password: string = user.password;
      username: string = user.username;
      email: string = user.email;
      id: number = user.id;
    };
  }
}
