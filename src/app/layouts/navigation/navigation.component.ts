import { Component } from '@angular/core';
import {MemoryBox} from "../../shared/models";
import {MemoryboxService} from "../../shared/services/memorybox.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  memoryboxes:Array<MemoryBox> = new Array<MemoryBox>();

  constructor(private memoryBoxService: MemoryboxService) {
  }
  ngOnInit() {
    this.memoryBoxService.getAll().subscribe((arrayMemoryboxes:Array<MemoryBox>) => {
      this.memoryboxes = arrayMemoryboxes;
      console.log(arrayMemoryboxes)
    });
  }
}
