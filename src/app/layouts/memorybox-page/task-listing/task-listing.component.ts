import { Component, Input, OnInit} from '@angular/core';
import { MemoryBox, Tag, Task, User } from 'src/app/shared/models';
import { MatTableDataSource, MatTableModule} from '@angular/material/table'
import { forkJoin, map } from "rxjs";
import { ITask } from 'src/app/shared/interfaces/itask';
import { TagService } from 'src/app/shared/services/tag.service';

@Component({
  selector: 'app-task-listing',
  templateUrl: './task-listing.component.html',
  styleUrls: ['./task-listing.component.css']
})
export class TaskListingComponent implements OnInit{
  @Input() memorybox: MemoryBox = new MemoryBox(0,"",0);
  public datasource: MatTableDataSource<ITask> = new MatTableDataSource<ITask>();
  public tags: Array<Tag> = new Array<Tag>();
  constructor(private tagService:TagService){
  }
  
  ngOnInit(): void {
    const tagObservables = this.memorybox.tags.map(tagId => this.tagService.getById(tagId));
    forkJoin(tagObservables).subscribe((tags: Tag[]) => {
      // console.log(tags);
      this.tags.push(...tags);
    });
    this.datasource = new MatTableDataSource<ITask>(this.memorybox.tasks);
  }
}
