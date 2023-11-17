import {Component, Input, OnInit} from '@angular/core';
import {MemoryBox, Note, Tag} from "../../../shared/models";
import {TagService} from "../../../shared/services/tag.service";
import {
  CreateNoteDialogComponent
} from "../../memorybox-page/note-listing/create-note-dialog/create-note-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {PtagPipe} from "../../../shared/pipes/ptag.pipe";
import {CreateTagDialogComponent} from "./create-tag-dialog/create-tag-dialog.component";
import {ITag} from "../../../shared/interfaces/itag";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() memoryBoxes:Array<MemoryBox> = new Array<MemoryBox>();
  tags!: Array<ITag>;
  isMemoryBoxesCollapsed: boolean = true;
  isTagsCollapsed: boolean = true;
  private tagPipe = new PtagPipe();
  constructor(private dialog:MatDialog, private tagService: TagService) {
  }
  ngOnInit() {
    this.tagService.getAll().subscribe((res) => {
      this.tags = res;
    })
  }

  toggleMemoryBoxes() {
    this.isMemoryBoxesCollapsed = !this.isMemoryBoxesCollapsed;
  }

  toggleTags() {
    this.isTagsCollapsed = !this.isTagsCollapsed;
  }

  deleteTag(tagARemover: number) {
    const idx = this.tags.findIndex((tag)=> {
      return tag.id === tagARemover;
    })
    this.tagService.delete(tagARemover).subscribe(
      (obj) => {
        console.log(obj);
        this.tags.splice(idx, 1);
      })
  }

  editTag() {
  }

  openAddTagDialog() {
    const dialogRef = this.dialog.open(CreateTagDialogComponent, {
      data: {},
      panelClass: 'tag-dialog-container'
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let idx = this.tags.length > 0 ? Math.max(...this.tags.map(tag => tag.id)) + 1 : 1;
        let tag = new Tag(idx, res.title, res.color);
        this.tagService.create(tag).subscribe((obj) => {
          this.tags.push(obj)
        });
      }});
  }
}
