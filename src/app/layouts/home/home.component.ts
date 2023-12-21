import {Component, OnInit} from '@angular/core';
import {MemoryBox} from "../../shared/models";
import { MemoryboxService } from 'src/app/shared/services/memorybox.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  memoryboxes:Array<MemoryBox> = new Array<MemoryBox>();
  isMemoryBoxesCollapsed: boolean = true;
  protected userId!: number;
  constructor(private memoryBoxService: MemoryboxService) {
  }

  addItem(newItem: MemoryBox) {
    this.memoryboxes.push(newItem);
  }

  toggleMemoryBoxes() {
    this.isMemoryBoxesCollapsed = !this.isMemoryBoxesCollapsed;
  }
  ngOnInit() {
    const currentUser = localStorage.getItem("currentUser")
    if(currentUser){
      this.userId = parseInt(currentUser)
      this.memoryBoxService.getAll(this.userId).subscribe((arrayMemoryBoxes:Array<MemoryBox>) => {
        this.memoryboxes = arrayMemoryBoxes;
      });
    }

  }
}
