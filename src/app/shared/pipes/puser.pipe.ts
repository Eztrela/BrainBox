import { Pipe, PipeTransform } from '@angular/core';
import {User,MemoryBox,Tag} from "../models";
import { IUser } from "../interfaces/iuser";

@Pipe({
  name: 'puser'
})
export class PuserPipe implements PipeTransform {

  transform(user: User): IUser {
    return new class implements IUser{
      
    }
  }

}
