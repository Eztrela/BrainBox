import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MemoryBox, Task} from 'src/app/shared/models';
import { MatTableDataSource} from '@angular/material/table'
import { ITask } from 'src/app/shared/interfaces/itask';
import { TagService } from 'src/app/shared/services/tag.service';
import { MemoryboxService } from 'src/app/shared/services/memorybox.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';
import { FormGroup } from '@angular/forms';
import {JsonDTOPipe} from "../../../shared/pipes/jsondto.pipe";

@Component({
  selector: 'app-task-listing',
  templateUrl: './task-listing.component.html',
  styleUrls: ['./task-listing.component.css']
})
export class TaskListingComponent implements OnInit{
  @Input() memorybox: MemoryBox = new MemoryBox(0,"",0);
  public datasource: MatTableDataSource<Task> = new MatTableDataSource<Task>();
  @Output() newItemEvent = new EventEmitter<Task>();
  constructor(private dialog:MatDialog, private tagService:TagService, private memoryBoxService: MemoryboxService){
  }

  ngOnInit(): void {
    this.datasource = new MatTableDataSource<Task>(this.memorybox.tasks);
  }

  addNewItem(value: Task) {
    this.newItemEvent.emit(value);
  }

  opencreateDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      data: {memorybox: this.memorybox},
      panelClass: 'dialog-container'
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (this.memorybox.tasks && this.memorybox.id) {
          let idx = this.memorybox.tasks.length > 0 ? Math.max(...this.memorybox.tasks.map(task => {
            return task.id ? task.id : 0
          })) + 1 : 1;
          let task = new Task(0, {title: data.title, description : data.description, status: data.status, priority : data.priority, tags: data.tags})
          task.id = idx;
          this.memorybox.tasks.push(task);
          this.memoryBoxService.update(this.memorybox.id, this.memorybox).subscribe((obj: MemoryBox) => {
            this.memorybox = obj;
            this.datasource.data = this.memorybox.tasks ? [...this.memorybox.tasks]: [];
          });
        }
      }
    });
  }

  openeditDialog(task: Task) {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: {memorybox: this.memorybox,task: task},
      panelClass: 'dialog-container'
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (this.memorybox.tasks && this.memorybox.id) {
          let idx = this.memorybox.tasks.length > 0 ? Math.max(...this.memorybox.tasks.map(task => {
            return task.id ? task.id : 0
          })): 1;
          let task = new Task(0, {title: data.title, description : data.description, status: data.status, priority : data.priority, tags: data.tags})
          task.id = idx;
          this.memorybox.tasks[idx-1] = task;
          this.memoryBoxService.update(this.memorybox.id, this.memorybox).subscribe((obj: MemoryBox) => {
            this.memorybox = obj;
            this.datasource.data = this.memorybox.tasks ? [...this.memorybox.tasks]: [];
          });
        }
      }
    });
  }

  deleteTask(taskARemover: ITask){
    if (this.memorybox.tasks && this.memorybox.id) {

      const idx = this.memorybox.tasks.findIndex((task)=>{
        return task.id === taskARemover.id
      })

      if (idx !== -1) {

        this.memorybox.tasks.splice(idx, 1)[0];


        this.memoryBoxService.update(this.memorybox.id, this.memorybox).subscribe(memoryBoxAtualizado =>{
          this.memorybox = memoryBoxAtualizado;
          this.datasource.data = this.memorybox.tasks ? [...this.memorybox.tasks]: [];
        })
      }

    }
  }
}
