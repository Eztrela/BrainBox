import {Component, Input, OnInit} from '@angular/core';
import {MemoryBox} from "../../shared/models";

@Component({
  selector: 'app-memorybox-listing',
  templateUrl: './memorybox-listing.component.html',
  styleUrls: ['./memorybox-listing.component.css']
})
export class MemoryboxListingComponent implements OnInit {

  @Input() memoryboxes: Array<MemoryBox> = new Array<MemoryBox>();

  ngOnInit(): void {
    console.log(this.memoryboxes);
  }

}
