import { Component, Input, OnInit } from '@angular/core';
import { MemoryBox, Note, User } from 'src/app/shared/models';

@Component({
  selector: 'app-note-listing',
  templateUrl: './note-listing.component.html',
  styleUrls: ['./note-listing.component.css'],
})
export class NoteListingComponent implements OnInit{

  @Input() memorybox: MemoryBox = new MemoryBox(0,"",0);

  ngOnInit(): void {
      
  }
}
