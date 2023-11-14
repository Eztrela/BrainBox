import { Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { MemoryBox, Tag, Task, User } from 'src/app/shared/models';
import { MatTableDataSource, MatTableModule} from '@angular/material/table'
import { forkJoin, map } from "rxjs";
import { ITask } from 'src/app/shared/interfaces/itask';
import { TagService } from 'src/app/shared/services/tag.service';
import { MemoryboxService } from 'src/app/shared/services/memorybox.service';

@Component({
  selector: 'app-task-listing',
  templateUrl: './task-listing.component.html',
  styleUrls: ['./task-listing.component.css']
})
export class TaskListingComponent implements OnInit, OnChanges{
  @Input() memorybox: MemoryBox = new MemoryBox(0,"",0);
  public datasource: MatTableDataSource<ITask> = new MatTableDataSource<ITask>();
  public tasks: Array<ITask> = new Array<ITask>();
  constructor(private tagService:TagService, private memoryBoxService: MemoryboxService){
  }
  
  ngOnInit(): void {
    const tagObservables = this.memorybox.tasks.map(task => {
      for(let tag of task.tags){
        this.tagService.getById(tag).subscribe((tag:Tag)=>(
          task.tags.push(tag)
          ));
        }});
        forkJoin(tagObservables).subscribe((tag: Tag) => {
          // console.log(tags);
          this.task.tags.push(tag);
          this.tasks.push(task);
    });
    this.datasource = new MatTableDataSource<ITask>(this.memorybox.tasks);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes)
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
