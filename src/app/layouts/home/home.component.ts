import {Component, OnInit} from '@angular/core';
import {MemoryBox} from "../../shared/models";
import { MemoryboxFirestoreService } from 'src/app/shared/services/memorybox-firestore.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  memoryboxes:Array<MemoryBox> = new Array<MemoryBox>();
  isMemoryBoxesCollapsed: boolean = true;
  constructor(private memoryBoxService: MemoryboxFirestoreService) {
  }

  addItem(newItem: MemoryBox) {
    this.memoryboxes.push(newItem);
  }

  toggleMemoryBoxes() {
    this.isMemoryBoxesCollapsed = !this.isMemoryBoxesCollapsed;
  }
  ngOnInit() {
    this.memoryBoxService.getAll().subscribe((arrayMemoryBoxes:Array<MemoryBox>) => {
      this.memoryboxes = arrayMemoryBoxes;
    });
  }
}
