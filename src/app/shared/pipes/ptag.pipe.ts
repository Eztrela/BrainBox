import { Pipe, PipeTransform } from '@angular/core';
import {Note, Tag} from "../models";
import {ITag} from "../interfaces/itag";

@Pipe({
  name: 'ptag'
})
export class PtagPipe implements PipeTransform {

  transform(tag: Tag): ITag {
    return new class implements ITag {
      id: number = 0;
      title: string = tag.title;
      color: string = tag.color;
    };
  }

}
