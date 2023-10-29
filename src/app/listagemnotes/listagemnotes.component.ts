import { Component } from '@angular/core';
import {Note, Task} from "../shared/models";
import {TaskService} from "../shared/services/task.service";
import {NoteService} from "../shared/services/note.service";

@Component({
  selector: 'app-listagemnotes',
  templateUrl: './listagemnotes.component.html',
  styleUrls: ['./listagemnotes.component.css']
})
export class ListagemnotesComponent {

  notes: Note[] = [];

  constructor(public noteService: NoteService) { }

  ngOnInit() {

    let note1 = new Note(1, "Lorem ipsum");
    let note2 = new Note(2, "Ipsum dolor");
    let note3 = new Note(3, "Sit amet");

    this.noteService.create(note1).subscribe();
    this.noteService.create(note2).subscribe();
    this.noteService.create(note3).subscribe();

    this.noteService.getAll().subscribe((data: Note[]) => {
      this.notes = data;
      console.log(data);
    })
  }
}
