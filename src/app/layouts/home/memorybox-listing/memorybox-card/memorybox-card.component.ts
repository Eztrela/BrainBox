import {Component, Input, OnInit} from '@angular/core';
import {MemoryBox, Note, Tag, Task, User} from "../../../../shared/models";
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
  @Input() memorybox: MemoryBox = new MemoryBox(0, "", new User(1,"","","",false));

  public taskColor: string = "#D9D9D9";

  constructor() {
  }
  ngOnInit() {
  }


}
