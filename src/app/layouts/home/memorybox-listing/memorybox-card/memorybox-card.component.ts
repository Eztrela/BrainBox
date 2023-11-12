import {Component, Input, OnInit} from '@angular/core';
import {MemoryBox, Tag} from "../../../../shared/models";
import {TagService} from "../../../../shared/services/tag.service";
import {forkJoin, map} from "rxjs";

@Component({
  selector: 'app-memorybox-card',
  templateUrl: './memorybox-card.component.html',
  styleUrls: ['./memorybox-card.component.css']
})
export class MemoryboxCardComponent implements OnInit {
  @Input() memorybox: MemoryBox = new MemoryBox(0, "", 0);

  public taskColor: string = "#D9D9D9";
  public fillerColor: string = "#30343F";
  public tags: Array<Tag> = new Array<Tag>();

  constructor(private tagService: TagService) {
  }
  ngOnInit() {
    const tagObservables = this.memorybox.tags.map(tagId => this.tagService.getById(tagId));
    forkJoin(tagObservables).pipe(
      // Filter out undefined values
      map(tags => tags.filter(tag => !!tag))
    ).subscribe((tags: Tag[]) => {
      console.log(tags);
      this.tags.push(...tags);
    });
  }


}
