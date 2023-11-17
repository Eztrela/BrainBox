import { Pipe, PipeTransform } from '@angular/core';
import { User } from "../models";
import { IUser } from "../interfaces/iuser";

@Pipe({
  name: 'puser'
})
export class PuserPipe implements PipeTransform {

  transform(user: User): IUser {
    return new class implements IUser {
      tags: Array<number> = user.tags;
      memoryBoxes: Array<number> = user.memoryBoxes;
      notifications: boolean = user.notifications;
      password: string = user.password;
      username: string = user.username;
      email: string = user.email;
      id: number = user.id;
    };
  }
}
