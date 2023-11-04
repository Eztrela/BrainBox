import {Component, OnInit} from '@angular/core';
import {MemoryboxService} from "../../shared/services/memorybox.service";
import {MemoryBox, User} from "../../shared/models";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  memoryboxes:Array<MemoryBox> = new Array<MemoryBox>();

  constructor(private memoryBoxService: MemoryboxService) {
  }
  ngOnInit() {
    this.memoryboxes = this.memoryBoxService.listar();
  }
}
