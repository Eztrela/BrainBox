import {Component, OnInit} from '@angular/core';
import {MemoryBox} from "../../shared/models";
import {MemoryboxService} from "../../shared/services/memorybox.service";
import {Imemorybox} from "../../shared/interfaces/imemorybox";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  memoryboxes:Array<Imemorybox> = new Array<Imemorybox>();
  constructor(private memoryBoxService: MemoryboxService) {
  }

  addItem(newItem: MemoryBox) {
    this.memoryboxes.push(newItem);
  }
  ngOnInit() {
    this.memoryBoxService.getAll().subscribe((arrayMemoryBoxes:Array<MemoryBox>) => {
      this.memoryboxes = arrayMemoryBoxes;
    });
  }
}
