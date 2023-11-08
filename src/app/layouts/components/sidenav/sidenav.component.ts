import {Component, Input, OnInit} from '@angular/core';
import {MemoryBox} from "../../../shared/models";
import {MemoryboxService} from "../../../shared/services/memorybox.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  public memoryBoxes:Array<MemoryBox> = new Array<MemoryBox>();
  constructor(private memoryBoxService: MemoryboxService) {
  }
  ngOnInit() {
    this.memoryBoxService.getAll().subscribe((arrayMemoryBoxes:Array<MemoryBox>) => {
      this.memoryBoxes = arrayMemoryBoxes;
    });
  }
}
