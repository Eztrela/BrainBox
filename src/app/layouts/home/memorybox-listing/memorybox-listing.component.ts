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
      if (data) {
        this.memoryboxService.generateID().subscribe((id: number) => {
          let memorybox = new MemoryBox(id, data.title, 0)
          this.memoryboxService.create(memorybox).subscribe((obj: MemoryBox) => {
            this.addNewItem(obj);
          });
        });

      }
    });
  }

}
