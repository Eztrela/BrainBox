import { Component, Input, OnInit} from '@angular/core';
import { MemoryBox, Task, User } from 'src/app/shared/models';
import {MatTableModule} from '@angular/material/table'
import {TaskService} from "../../../shared/services/task.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-task-listing',
  templateUrl: './task-listing.component.html',
  styleUrls: ['./task-listing.component.css']
})
export class TaskListingComponent implements OnInit{
  @Input() memorybox: MemoryBox = new MemoryBox(0,"",new User(0,"","","",false));

  constructor(){
  }
  
  ngOnInit(): void {
  
  }
}
