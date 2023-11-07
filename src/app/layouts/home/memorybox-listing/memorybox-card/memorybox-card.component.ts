import {Component, Input, OnInit} from '@angular/core';
import {MemoryBox, Note, Tag, Task} from "../../../../shared/models";
import {TagService} from "../../../../shared/services/tag.service";
import {TaskService} from "../../../../shared/services/task.service";
import {NoteService} from "../../../../shared/services/note.service";

@Component({
  selector: 'app-memorybox-card',
  templateUrl: './memorybox-card.component.html',
  styleUrls: ['./memorybox-card.component.css']
})
export class MemoryboxCardComponent implements OnInit {
  @Input() memorybox: MemoryBox = new MemoryBox(0, "", 0);

  public tasks: Array<Task> = new Array<Task>();
  public tags: Array<Tag> = new Array<Tag>();
  public notes: Array<Note> = new Array<Note>();

  constructor(private taskService:TaskService, private tagService: TagService, private noteService: NoteService) {
  }
  ngOnInit() {
    for (let id in this.memorybox.tasks) {
      this.taskService.getById(Number(id)).subscribe((task:Task) => {
        this.tasks.push(task);
      })
    }
    for (let id in this.memorybox.tags) {
      this.tagService.getById(Number(id)).subscribe((tag:Tag) => {
        this.tags.push(tag);
      })
    }
    for (let id in this.memorybox.notes) {
      this.noteService.getById(Number(id)).subscribe((note:Note) => {
        this.notes.push(note);
      })
    }
  }


}
