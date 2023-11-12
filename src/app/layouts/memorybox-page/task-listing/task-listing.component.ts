import { Component, Input, OnInit} from '@angular/core';
import { MemoryBox, Task, User } from 'src/app/shared/models';
import {MatTableDataSource, MatTableModule} from '@angular/material/table'
import {TaskService} from "../../../shared/services/task.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-task-listing',
  templateUrl: './task-listing.component.html',
  styleUrls: ['./task-listing.component.css']
})
export class TaskListingComponent implements OnInit{
  @Input() memorybox: MemoryBox = new MemoryBox(0,"",0);
  public datasource: MatTableDataSource<Task> = new MatTableDataSource<Task>();
  constructor(){
  }
  
  ngOnInit(): void {
    this.datasource = new MatTableDataSource<Task>(this.memorybox.tasks);
  }
}
