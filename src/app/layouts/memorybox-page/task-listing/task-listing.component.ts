import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MemoryBox, Task} from 'src/app/shared/models';
import { MatTableDataSource} from '@angular/material/table'
import { forkJoin, map } from "rxjs";
import { ITask } from 'src/app/shared/interfaces/itask';
import { TagService } from 'src/app/shared/services/tag.service';
import { MemoryboxService } from 'src/app/shared/services/memorybox.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';
import { PtaskPipe } from 'src/app/shared/pipes/ptask.pipe';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-listing',
  templateUrl: './task-listing.component.html',
  styleUrls: ['./task-listing.component.css']
})
export class TaskListingComponent implements OnInit{
  @Input() memorybox: MemoryBox = new MemoryBox(0,"",0);
  public datasource: MatTableDataSource<ITask> = new MatTableDataSource<ITask>();
  public tasks: Array<ITask> = new Array<ITask>();
  @Output() newItemEvent = new EventEmitter<ITask>();
  public taskPipe = new PtaskPipe();
  constructor(private dialog:MatDialog, private tagService:TagService, private memoryBoxService: MemoryboxService){
  }
  
  ngOnInit(): void {
    // const tagObservables = this.memorybox.tasks.map(task => {
    //   for(let tag of task.tags){
    //     this.tagService.getById(tag).subscribe((tag:Tag)=>(
    //       task.tags.push(tag)
    //       ));
    //     }});
    //     forkJoin(tagObservables).subscribe((tag: Tag) => {
    //       // console.log(tags);
    //       this.task.tags.push(tag);
    //       this.tasks.push(task);
    // });
    this.datasource = new MatTableDataSource<ITask>(this.memorybox.tasks);
  }
  
  addNewItem(value: ITask) {
    this.newItemEvent.emit(value);
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      data: {},
      panelClass: 'dialog-container'
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log("Task:", data)
      if (data) {
          let idx = this.memorybox.tasks.length > 0 ? Math.max(...this.memorybox.tasks.map(task => task.id)) + 1 : 1;
          let task = this.taskPipe.transform(new Task(data.title, data.description, data.status, data.priority))
          task.id = idx;
          console.log(task);
          this.memorybox.tasks.push(task);
          console.log(this.memorybox);
          this.memoryBoxService.update(this.memorybox.id, this.memorybox).subscribe((obj: MemoryBox) => {
            console.log("After ", obj)
            this.memorybox = obj;
            this.datasource.data = [...this.memorybox.tasks]
          });
      }
    });
  }

  deleteTask(taskARemover: ITask){
    console.log(this.memorybox)
    const idx = this.memorybox.tasks.findIndex((task)=>{
      console.log(task.id === taskARemover.id)
      return task.id === taskARemover.id
    })
    console.log(idx)
    this.memorybox.tasks.splice(idx, 1)[0];
    console.log(this.memorybox)
    
    this.memoryBoxService.update(this.memorybox.id, this.memorybox).subscribe(memoryBoxAtualizado =>{
      this.memorybox = memoryBoxAtualizado;
      this.datasource.data = [...this.memorybox.tasks]
    })
    
  }
}
