import {Component, OnInit} from '@angular/core';
import {MemoryBox} from "../../shared/models";
import {MemoryboxService} from "../../shared/services/memorybox.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  memoryboxes:Array<MemoryBox> = new Array<MemoryBox>();

  constructor(private memoryBoxService: MemoryboxService) {
  }
  ngOnInit() {
    this.memoryBoxService.getAll().subscribe((arrayMemoryboxes:Array<MemoryBox>) => {
      this.memoryboxes = arrayMemoryboxes;
    });
  }
}
