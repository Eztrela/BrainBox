import {Component, Input, OnInit} from '@angular/core';
import {MemoryBox, Note, Tag} from "../../../shared/models";
import {TagService} from "../../../shared/services/tag.service";
import {
  CreateNoteDialogComponent
} from "../../memorybox-page/note-listing/create-note-dialog/create-note-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CreateTagDialogComponent} from "./create-tag-dialog/create-tag-dialog.component";
import {ITag} from "../../../shared/interfaces/itag";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() memoryBoxes:Array<MemoryBox> = new Array<MemoryBox>();
  constructor() {}
  ngOnInit() {}
}
