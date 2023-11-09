import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {MemoryboxService} from "../../shared/services/memorybox.service";
import {TaskService} from "../../shared/services/task.service";
import {MemoryBox, Note, Task, User} from "../../shared/models";
import { NoteService } from '../../shared/services/note.service';
import {Observable} from 'rxjs'
@Component({
  selector: 'app-memorybox-page',
  templateUrl: './memorybox-page.component.html',
  styleUrls: ['./memorybox-page.component.css']
})
export class MemoryboxPageComponent implements OnInit {
  public id: number = 0;
  public memorybox: MemoryBox = new MemoryBox(0,"",new User(0,"","","",false));
  public tasks:Array<Task> = new Array<Task>();
  public notes:Array<Note> = new Array<Note>();
  constructor(private route: ActivatedRoute, private memoryBoxService: MemoryboxService, private taskService: TaskService, private noteService:NoteService) {
  }
  
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get('id'));
    })
    this.memoryBoxService.getById(this.id).subscribe((mymemorybox: any) => {
      this.memorybox = mymemorybox;
    })
  }
}
