import {Component, Input, OnInit} from '@angular/core';
import {MemoryBox, Note, Tag, Task} from "../../../../shared/models";
import {TagService} from "../../../../shared/services/tag.service";
import {TaskService} from "../../../../shared/services/task.service";
import {NoteService} from "../../../../shared/services/note.service";
import {forkJoin} from "rxjs";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";

@Component({
  selector: 'app-memorybox-card',
  templateUrl: './memorybox-card.component.html',
  styleUrls: ['./memorybox-card.component.css']
})
export class MemoryboxCardComponent implements OnInit {
  @Input() memorybox: MemoryBox = new MemoryBox(0, "", 0);

  public task: Task = new Task(0, "", "", "", new Date(), 0);
  public tags: Array<Tag> = new Array<Tag>();
  public note: Note = new Note(0, "");

  public taskColor: string = "#D9D9D9";

  constructor(private taskService:TaskService, private tagService: TagService, private noteService: NoteService) {
  }
  ngOnInit() {
    const taskRequests = this.taskService.getById(Number(this.memorybox.tasks[0]));
    const tagRequests = this.memorybox.tags.map(id => this.tagService.getById(Number(id)));
    const noteRequests = this.noteService.getById(Number(this.memorybox.notes[0]));

    taskRequests.subscribe((taskResults: Task) => {
      this.task = taskResults;
    });

    forkJoin([...tagRequests]).subscribe((tagResults: Tag[]) => {
      this.tags = tagResults;
    });

    noteRequests.subscribe((noteResults: Note) => {
      this.note = noteResults;
    });
  }


}
