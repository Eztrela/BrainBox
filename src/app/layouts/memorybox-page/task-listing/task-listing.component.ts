import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/models';

@Component({
  selector: 'app-task-listing',
  templateUrl: './task-listing.component.html',
  styleUrls: ['./task-listing.component.css']
})
export class TaskListingComponent{

  @Input() tasks: Array<Task> = new Array<Task>();

  
}
