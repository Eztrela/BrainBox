import {Component, Input, OnInit} from '@angular/core';
import {MemoryBox} from "../../../shared/models";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-memorybox-listing',
  templateUrl: './memorybox-listing.component.html',
  styleUrls: ['./memorybox-listing.component.css']
})
export class MemoryboxListingComponent implements OnInit {

  @Input() memoryboxes: Array<MemoryBox> = new Array<MemoryBox>();

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.memoryboxes, event.previousIndex, event.currentIndex);
  }

}
