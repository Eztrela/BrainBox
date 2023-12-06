import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MemoryBox, Task} from 'src/app/shared/models';
import { MatTableDataSource} from '@angular/material/table'
import { ITask } from 'src/app/shared/interfaces/itask';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';
import { MemoryboxFirestoreService } from 'src/app/shared/services/memorybox-firestore.service';
import { DatePipe} from "@angular/common";

@Component({
  selector: 'app-task-listing',
  templateUrl: './task-listing.component.html',
  styleUrls: ['./task-listing.component.css'],
  providers: [DatePipe]
})
export class TaskListingComponent implements OnInit{
  @Input() id!:string;
  @Input() memorybox!: MemoryBox;
  public datasource: MatTableDataSource<Task> = new MatTableDataSource<Task>();
  @Output() newItemEvent = new EventEmitter<Task>();
  constructor(private dialog:MatDialog, private memoryBoxService: MemoryboxFirestoreService, private datePipe: DatePipe){
  }

  ngOnInit(): void {
    this.datasource = new MatTableDataSource<Task>(this.memorybox.tasks);
  }

  formatDatetime(datetimeDue: any): string {
    if (datetimeDue instanceof Date) {
      return this.datePipe.transform(datetimeDue, 'dd/MM/yyyy') || '';
    } else {
      const dateObject = new Date(datetimeDue.seconds * 1000);
      return this.datePipe.transform(dateObject, 'dd/MM/yyyy') || '';
    }
  }

  opencreateDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      data: {memorybox: this.memorybox},
      panelClass: 'dialog-container'
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (this.memorybox) {
          let idx = this.memorybox.tasks.length > 0 ? Math.max(...this.memorybox.tasks.map(task => {
            return task.id ? task.id : 0
          })) + 1 : 1;
          let task = new Task(0, {title: data.title, description : data.description, status: data.status, priority : data.priority, tags: data.tags, datetimeDue: data.datetimeDue})
          task.id = idx;
          this.memorybox.tasks.push(task);
          this.memoryBoxService.update(this.id, this.memorybox).subscribe(res => {
            this.datasource.data = this.memorybox.tasks ? [...this.memorybox.tasks]: [];
          });
        }
      }
    });
  }

  openeditDialog(taskAEditar: Task) {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: {memorybox: this.memorybox,task: taskAEditar},
      panelClass: 'dialog-container'
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (this.memorybox) {
          let idx = this.memorybox.tasks.findIndex((task)=>{
            return task.id === taskAEditar.id
          })
          let task = new Task(0, {title: data.title, description : data.description, status: data.status, priority : data.priority, tags: data.tags, datetimeDue: data.datetimeDue})
          task.id = idx+1;
          this.memorybox.tasks[idx] = task;
          this.memoryBoxService.update(this.id, this.memorybox).subscribe(res => {
            this.datasource.data = this.memorybox.tasks ? [...this.memorybox.tasks]: [];
          });
        }
      }
    });
  }

  deleteTask(taskARemover: ITask){
    if (this.memorybox) {

      const idx = this.memorybox.tasks.findIndex((task)=>{
        return task.id === taskARemover.id
      })

      if (idx !== -1) {

        this.memorybox.tasks.splice(idx, 1)[0];

        this.memoryBoxService.update(this.id, this.memorybox).subscribe(res =>{
          this.datasource.data = this.memorybox.tasks ? [...this.memorybox.tasks]: [];
        })
      }

    }
  }
}
