import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MemoryBox, Task} from 'src/app/shared/models';
import { MatTableDataSource} from '@angular/material/table'
import { ITask } from 'src/app/shared/interfaces/itask';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';
import { MemoryboxService } from 'src/app/shared/services/memorybox.service';
import { DatePipe} from "@angular/common";
import {TaskService} from "../../../shared/services/task.service";
import {SnackbarService} from "../../../shared/services/snackbar.service";

@Component({
  selector: 'app-task-listing',
  templateUrl: './task-listing.component.html',
  styleUrls: ['./task-listing.component.css'],
  providers: [DatePipe]
})
export class TaskListingComponent implements OnInit{
  @Input() id!:number;
  @Input() memorybox!: MemoryBox;
  public datasource: MatTableDataSource<Task> = new MatTableDataSource<Task>();
  @Input() userId!: number;
  @Output() newItemEvent = new EventEmitter<Task>();
  constructor(private dialog:MatDialog,
              private memoryBoxService: MemoryboxService,
              private taskService: TaskService,
              private snackBarService: SnackbarService,
              private datePipe: DatePipe){
  }

  ngOnInit(): void {
    this.datasource = new MatTableDataSource<Task>(this.memorybox.tasks);
  }

  formatDatetime(datetimeDue: string): string {
      const dateObject = new Date(datetimeDue);
      return this.datePipe.transform(dateObject, 'dd/MM/yyyy') || '';
  }

  opencreateDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      data: {memorybox: this.memorybox},
      panelClass: 'task-dialog-container'
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (this.memorybox) {
          let task = {
            title: data.title,
            description : data.description,
            status: data.status,
            priority : data.priority,
            tag: data.tag[0],
            datetimeDue: data.datetimeDue
          }
          this.taskService.create(task).subscribe(createRes => {
            this.memorybox.tasks.push(createRes);
            this.memoryBoxService.update(this.id, this.memorybox).subscribe(updateRes => {
              this.memorybox = updateRes;
              this.datasource.data = [...this.memorybox.tasks];
              this.snackBarService.info(`Task ${createRes.title} criada com sucesso`)
            });
          })
        }
      }
    });
  }

  openeditDialog(taskAEditar: Task) {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: {memorybox: this.memorybox,task: taskAEditar},
      panelClass: 'task-dialog-container'
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (this.memorybox) {
          let idx = this.memorybox.tasks.findIndex((task)=>{
            return task.id === taskAEditar.id
          })
          let task = {
            title: data.title,
            description : data.description,
            status: data.status,
            priority : data.priority,
            tag: data.tag[0],
            datetimeDue: data.datetimeDue
          }
          this.taskService.update(taskAEditar.id, task).subscribe(updateTaskRes => {
            this.memorybox.tasks[idx] = updateTaskRes;
            this.memoryBoxService.update(this.id, this.memorybox).subscribe(updateBoxRes => {
              this.memorybox = updateBoxRes;
              this.datasource.data = [...this.memorybox.tasks];
              this.snackBarService.info(`Task ${updateTaskRes.title} alterada com sucesso`)
            });
          })
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
        this.memoryBoxService.update(this.id, this.memorybox).subscribe(updateRes => {
          this.taskService.delete(taskARemover.id).subscribe(deleteRes => {
            this.memorybox = updateRes;
            this.datasource.data = [...this.memorybox.tasks];
            this.snackBarService.sucesso(`Task ${taskARemover.title} removida com sucesso`)
          })
        })

      }

    }
  }
}
