import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {MemoryBox} from "../../../shared/models";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarComponent} from "../snackbar/snackbar.component";
import {MemoryboxFirestoreService} from "../../../shared/services/memorybox-firestore.service";
import {SnackbarService} from "../../../shared/services/snackbar.service";
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  public memoryBoxes!: Array<MemoryBox>;
  public filteredMemoryBoxes: Observable<MemoryBox[]> = new Observable<MemoryBox[]>();
  public pesquisaControl = new FormControl('');
  public firstoption: string = "Memory Boxes";
  public CSSClasses: string | string[] = 'search-autocomplete';

  constructor(private memoryBoxService: MemoryboxFirestoreService, private router: Router, private snackBarService: SnackbarService, private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.memoryBoxService.getAll().subscribe((arrayMemoryBoxes: MemoryBox[]) => {
      this.memoryBoxes = arrayMemoryBoxes;
      this.filteredMemoryBoxes = this.pesquisaControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    })
  }

  onOpened() {
    this.elementRef.nativeElement.querySelector('.search-input').classList.add('search-input-auto-open');
  }
  onClosed() {
    this.elementRef.nativeElement.querySelector('.search-input').classList.remove('search-input-auto-open');
  }

  onSubmit(title: string | null) {
    let res = this.memoryBoxes.find((memoryBox) => {
      return memoryBox.title === title
    })
    if (res) this.router.navigateByUrl(`/memorybox/${res.id}`);
    else this.snackBarService.alerta(`Memory box ${title} não encontrada!`);
  }



  private _filter(value: string): MemoryBox[] {
    const filterValue = value.toLowerCase();

    return this.memoryBoxes.filter(memoryBox => {
      return memoryBox.title ? memoryBox.title.toLowerCase().includes(filterValue) : false;
    });
  }

}
