import {Component, Input, OnInit} from '@angular/core';
import {MemoryBox} from "../../../shared/models";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() memoryBoxes:Array<MemoryBox> = new Array<MemoryBox>();
  constructor() {
  }
  ngOnInit() {
  }
}
