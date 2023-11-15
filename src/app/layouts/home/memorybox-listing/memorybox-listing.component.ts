import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MemoryBox} from "../../../shared/models";
import {MatDialog} from "@angular/material/dialog";
import {CreateDialogComponent} from "./create-dialog/create-dialog.component";
import {MemoryboxService} from "../../../shared/services/memorybox.service";
import {forkJoin} from "rxjs";
import {PmemoryboxPipe} from "../../../shared/pipes/pmemorybox.pipe";
import {SnackbarComponent} from "../../components/snackbar/snackbar.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-memorybox-listing',
  templateUrl: './memorybox-listing.component.html',
  styleUrls: ['./memorybox-listing.component.css']
})
export class MemoryboxListingComponent implements OnInit {

  @Input() memoryboxes: Array<MemoryBox> = new Array<MemoryBox>();
  @Output() newItemEvent = new EventEmitter<MemoryBox>();

  constructor(private dialog: MatDialog, private _snackbar: MatSnackBar, private memoryboxService:MemoryboxService) {}

  ngOnInit(): void {}

  addNewItem(value: MemoryBox) {
    this.newItemEvent.emit(value);
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      data: {},
      panelClass: 'dialog-container'
    });

    dialogRef.afterClosed().subscribe((title:string) => {
      if (title) {
        this.memoryboxService.generateID().subscribe((id: number) => {
          let memorybox = new MemoryBox(id, title, 0)
          this.memoryboxService.create(memorybox).subscribe((obj: MemoryBox) => {
            this.addNewItem(obj);
            this._snackbar.openFromComponent(SnackbarComponent, {
              data: {
                message: `Memory Box "${obj.title}" criada com êxito!`,
              },
              panelClass: ['mat-primary'],
              duration: 3000
            })
          });
        });

      }
    });
  }

}
