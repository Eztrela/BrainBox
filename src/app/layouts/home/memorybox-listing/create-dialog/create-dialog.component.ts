import { Component } from '@angular/core';
import {MemoryBox} from "../../../../shared/models";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})
export class CreateDialogComponent {
  memorybox: MemoryBox = new MemoryBox( 0,"", 0);

  constructor(public dialogRef: MatDialogRef<CreateDialogComponent>) {
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
