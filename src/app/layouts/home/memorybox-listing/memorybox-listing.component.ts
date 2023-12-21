import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MemoryBox} from "../../../shared/models";
import {MatDialog} from "@angular/material/dialog";
import {CreateDialogComponent} from "./create-dialog/create-dialog.component";
import {SnackbarComponent} from "../../components/snackbar/snackbar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import { MemoryboxService } from 'src/app/shared/services/memorybox.service';
import {SnackbarService} from "../../../shared/services/snackbar.service";

@Component({
  selector: 'app-memorybox-listing',
  templateUrl: './memorybox-listing.component.html',
  styleUrls: ['./memorybox-listing.component.css']
})
export class MemoryboxListingComponent implements OnInit {

  @Input() memoryboxes: Array<MemoryBox> = new Array<MemoryBox>();
  @Output() newItemEvent = new EventEmitter<MemoryBox>();
  @Input() userId!: number;

  constructor(private dialog: MatDialog, private snackBarService: SnackbarService, private memoryboxService:MemoryboxService) {}

  ngOnInit(): void {}

  addNewItem(value: MemoryBox) {
    this.newItemEvent.emit(value);
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      data: {},
      panelClass: 'memorybox-dialog-container'
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
          let memorybox = {title: res.title, user: this.userId, banner: res.banner}
          this.memoryboxService.create(memorybox).subscribe((obj: MemoryBox) => {
            this.addNewItem(obj);
            this.snackBarService.sucesso(`Memorybox ${obj.title} inserida com êxito!`)
          });
      }
    });
  }

}
