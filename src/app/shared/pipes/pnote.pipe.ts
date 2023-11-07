import {Pipe, PipeTransform} from '@angular/core';
import {Note} from "../models";
import {INote} from "../interfaces/inote";

@Pipe({
  name: 'pnote'
})
export class PnotePipe implements PipeTransform {

  transform(note: Note): INote {
    return new class implements INote {
      content: string = note.content;
      id: number = note.id;
    };
  }

}
