import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MemoryBox} from 'src/app/shared/models';
import { MatTableDataSource} from '@angular/material/table'
import { forkJoin, map } from "rxjs";
import { ITask } from 'src/app/shared/interfaces/itask';
import { TagService } from 'src/app/shared/services/tag.service';
import { MemoryboxService } from 'src/app/shared/services/memorybox.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';

@Component({
  selector: 'app-task-listing',
  templateUrl: './task-listing.component.html',
  styleUrls: ['./task-listing.component.css']
})
export class TaskListingComponent implements OnInit{
  @Input() memorybox: MemoryBox = new MemoryBox(0,"",0);
  public datasource: MatTableDataSource<ITask> = new MatTableDataSource<ITask>();
  public tasks: Array<ITask> = new Array<ITask>();
  @Output() newItemEvent = new EventEmitter<MemoryBox>;
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
  
  addNewItem(value: MemoryBox) {
    this.newItemEvent.emit(value);
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      data: {},
      panelClass: 'dialog-container'
    });

    dialogRef.afterClosed().subscribe((title:string) => {
      if (title) {
        this.memoryBoxService.generateID().subscribe((id: number) => {
          let memorybox = new MemoryBox(id, title, 0)
          this.memoryBoxService.create(memorybox).subscribe((obj: MemoryBox) => {
            this.addNewItem(obj);
            // this._snackbar.openFromComponent(SnackbarComponent, {
            //   data: {
            //     message: `Memory Box "${obj.title}" criada com êxito!`,
            //   },
            //   panelClass: ['mat-primary'],
            //   duration: 3000
            // })
          });
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
