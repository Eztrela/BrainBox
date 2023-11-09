import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MemoryBox} from "../../../shared/models";
import {MatDialog} from "@angular/material/dialog";
import {CreateDialogComponent} from "./create-dialog/create-dialog.component";
import {MemoryboxService} from "../../../shared/services/memorybox.service";
import {forkJoin} from "rxjs";
import {PmemoryboxPipe} from "../../../shared/pipes/pmemorybox.pipe";

@Component({
  selector: 'app-memorybox-listing',
  templateUrl: './memorybox-listing.component.html',
  styleUrls: ['./memorybox-listing.component.css']
})
export class MemoryboxListingComponent implements OnInit {

  @Input() memoryboxes: Array<MemoryBox> = new Array<MemoryBox>();
  @Output() newItemEvent = new EventEmitter<MemoryBox>();

  constructor(private dialog: MatDialog, private memoryboxService:MemoryboxService) {}

  ngOnInit(): void {}

  addNewItem(value: MemoryBox) {
    this.newItemEvent.emit(value);
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((data:MemoryBox) => {
      let memorybox: MemoryBox;
      if (data) {
        this.memoryboxService.getAll().subscribe((res: MemoryBox[]) => {

          // Check if there are existing MemoryBoxes
          if (res && res.length > 0) {

            // Find the maximum id in the existing MemoryBoxes
            const maxId = Math.max(...res.map(box => box.id));
            memorybox = new MemoryBox(maxId + 1, data.title, 0);
          } else {

            // If there are no existing MemoryBoxes, start with id 1
            memorybox = new MemoryBox(1, data.title, 0);
          }

          this.memoryboxService.create(memorybox).subscribe((obj: MemoryBox) => {
            this.addNewItem(obj);
          });
        });
      }
    });
  }

}
