import {Component, Input, OnInit} from '@angular/core';
import {MemoryBox, Note, Tag, Task} from "../../../../shared/models";
import {TagService} from "../../../../shared/services/tag.service";
import {TaskService} from "../../../../shared/services/task.service";
import {NoteService} from "../../../../shared/services/note.service";
import {forkJoin} from "rxjs";

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
    const taskRequests = this.memorybox.tasks.map(id => this.taskService.getById(Number(id)));
    const tagRequests = this.memorybox.tags.map(id => this.tagService.getById(Number(id)));
    const noteRequests = this.memorybox.notes.map(id => this.noteService.getById(Number(id)));

    forkJoin([...taskRequests]).subscribe((taskResults: Task[]) => {
      this.tasks = taskResults;
    });

    forkJoin([...tagRequests]).subscribe((tagResults: Tag[]) => {
      this.tags = tagResults;
    });

    forkJoin([...noteRequests]).subscribe((noteResults: Note[]) => {
      this.notes = noteResults;
    });
  }


}
