import {Component, Input, OnInit} from '@angular/core';
import {MemoryBox, Tag} from "../../../../shared/models";
import {TagService} from "../../../../shared/services/tag.service";
import {forkJoin, map} from "rxjs";
import {Imemorybox} from "../../../../shared/interfaces/imemorybox";
import {ITag} from "../../../../shared/interfaces/itag";
import {JsonDTOPipe} from "../../../../shared/pipes/jsondto.pipe";

@Component({
  selector: 'app-memorybox-card',
  templateUrl: './memorybox-card.component.html',
  styleUrls: ['./memorybox-card.component.css']
})
export class MemoryboxCardComponent implements OnInit {
  @Input() memorybox: MemoryBox = new MemoryBox(0, "", {});

  public taskColor: string = "#D9D9D9";
  public fillerColor: string = "#30343F";
  public tags: Array<Tag> = new Array<Tag>();
  public tagPipe: JsonDTOPipe = new JsonDTOPipe();

  constructor(private tagService: TagService) {
  }
  ngOnInit() {
    if (this.memorybox.tags) {
      this.memorybox.tags.map(tag => {
        this.tags.push(tag);
      });
    }
  }


}
