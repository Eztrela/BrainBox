import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MemoryboxService} from "../../shared/services/memorybox.service";
import {MemoryBox, Note, Tag, Task, User} from "../../shared/models";
import {Observable} from 'rxjs'
import {FormControl, Validators} from "@angular/forms";
import {Imemorybox} from "../../shared/interfaces/imemorybox";
import {CreateTagDialogComponent} from "../components/sidenav/create-tag-dialog/create-tag-dialog.component";
import { MatDialog } from '@angular/material/dialog';
import { ITag } from 'src/app/shared/interfaces/itag';
import { EditTagDialogComponent } from '../components/sidenav/edit-tag-dialog/edit-tag-dialog.component';
import { MemoryboxFirestoreService } from 'src/app/shared/services/memorybox-firestore.service';


@Component({
  selector: 'app-memorybox-page',
  templateUrl: './memorybox-page.component.html',
  styleUrls: ['./memorybox-page.component.css']
})
export class MemoryboxPageComponent implements OnInit {
  public id!: string;
  public memorybox!: MemoryBox;
  public isEditing: boolean = false;
  public titleForm: FormControl = new FormControl();
  public isTagsCollapsed: boolean = false;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private memoryBoxService: MemoryboxFirestoreService,
              private dialog:MatDialog) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = String(params.get('id'));
      this.memoryBoxService.getById(this.id).subscribe((mymemorybox: any) => {
        this.memorybox = mymemorybox;
        this.titleForm = new FormControl(this.memorybox.title, [
          Validators.required,
          Validators.minLength(4)
        ]);
        console.log(this.memorybox);
      })
    })
  }

  toggleEditMemoryBox() {
    this.isEditing = !this.isEditing;
  }

  deleteMemoryBox() {
    if (this.memorybox) {
      this.memoryBoxService.delete(this.id).subscribe((res) => {
        this.router.navigate(['/home']);
      })
    }
  }

  editMemoryBox() {
    if (this.memorybox) {
      this.memorybox.title = this.titleForm.value;
      this.memoryBoxService.update(this.id, this.memorybox).subscribe((res)=> {
        this.toggleEditMemoryBox();
      })
    }
  }

  getErrorMessage() {
    if (this.titleForm.hasError('required')) {
      return 'Você precisa fornecer algum conteúdo!';
    } else if (this.titleForm.hasError('minlength')) {
      return 'Anotação precisa ter no mínimo 4 carácteres!';
    } else { return ''}
  }


  toggleTags() {
    this.isTagsCollapsed = !this.isTagsCollapsed;
  }

  deleteTag(tagARemover: ITag) {
    if (this.memorybox.tags) {

      const idx = this.memorybox.tags.findIndex((tag)=>{
        return tag.id === tagARemover.id
      })

      if (idx !== -1) {
        this.memorybox.tags.splice(idx, 1)[0];
        this.memoryBoxService.update(this.id, this.memorybox).subscribe()
      }

    }
  }

  openAddTagDialog() {
    const dialogRef = this.dialog.open(CreateTagDialogComponent, {
      data:{},
      panelClass: 'dialog-container'
   });

      dialogRef.afterClosed().subscribe((data) => {
        if (data) {
          if (this.memorybox) {
            let idx = this.memorybox.tags.length > 0 ? Math.max(...this.memorybox.tags.map(tag => {
              return tag.id ? tag.id : 0
            })) + 1 : 1;
            let tag = new Tag(0, {title: data.title, color : data.color})
            tag.id = idx;
            this.memorybox.tags.push(tag);
            this.memoryBoxService.update(this.id, this.memorybox).subscribe();
          }
        }
      });
  }
  openEditTagDialog(tagAEditar: ITag) {
    const dialogRef = this.dialog.open(EditTagDialogComponent, {
      data:{tag: tagAEditar},
      panelClass: 'dialog-container'
   });

      dialogRef.afterClosed().subscribe((data) => {
        if (data) {
          if (this.memorybox) {
            let idx = this.memorybox.tags.findIndex((tag)=>{
              return tag.id === tagAEditar.id
            })
            let tag = new Tag(0, {title: data.title, color : data.color})
            tag.id = idx + 1;
            this.memorybox.tags[idx] = tag;
            this.memoryBoxService.update(this.id, this.memorybox).subscribe();
          }
        }
      });
  }
}
