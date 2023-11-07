import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {MemoryboxService} from "../../shared/services/memorybox.service";
import {TaskService} from "../../shared/services/task.service";
import {MemoryBox, Note, Task} from "../../shared/models";
import { NoteService } from '../../shared/services/note.service';

@Component({
  selector: 'app-memorybox-page',
  templateUrl: './memorybox-page.component.html',
  styleUrls: ['./memorybox-page.component.css']
})
export class MemoryboxPageComponent implements OnInit {
  public id: number = 0;
  public memorybox: any = {};
  public tasks:Array<Task> = new Array<Task>();
  public notes:Array<Note> = new Array<Note>();
  constructor(private route: ActivatedRoute, private memoryBoxService: MemoryboxService, private taskService: TaskService, private noteService:NoteService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get('id'));
    })
    this.memoryBoxService.getById(this.id).subscribe((memorybox: MemoryBox) => {
      this.memorybox = memorybox;
    })
    for (let task_id of this.memorybox.tasks){
      this.taskService.getById(task_id).subscribe((task: Task) =>{
        this.tasks.push(task);
      })
    }
    console.log(this.tasks)
    for (let note_id of this.memorybox.tags){
      this.noteService.getById(note_id).subscribe((note: Note) =>{
        this.notes.push(note);
      })
    }
  }
}
