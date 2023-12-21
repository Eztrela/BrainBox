import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MemoryBox, Tag} from "../../shared/models";
import {FormControl, Validators} from "@angular/forms";
import {CreateTagDialogComponent} from "../components/sidenav/create-tag-dialog/create-tag-dialog.component";
import { MatDialog } from '@angular/material/dialog';
import { ITag } from 'src/app/shared/interfaces/itag';
import { EditTagDialogComponent } from '../components/sidenav/edit-tag-dialog/edit-tag-dialog.component';
import { MemoryboxService } from 'src/app/shared/services/memorybox.service';
import {TagService} from "../../shared/services/tag.service";
import {SnackbarService} from "../../shared/services/snackbar.service";
import {TaskService} from "../../shared/services/task.service";


@Component({
  selector: 'app-memorybox-page',
  templateUrl: './memorybox-page.component.html',
  styleUrls: ['./memorybox-page.component.css']
})
export class MemoryboxPageComponent implements OnInit {
  public id!: number;
  public memorybox!: MemoryBox;
  public isEditing: boolean = false;
  public titleForm: FormControl = new FormControl();
  public isTagsCollapsed: boolean = false;
  protected userId!: number;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private memoryBoxService: MemoryboxService,
              private tagService: TagService,
              private taskService: TaskService,
              private snackBarService: SnackbarService,
              private dialog:MatDialog) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const currentUser = localStorage.getItem("currentUser")
      if(currentUser) {
        this.userId = parseInt(currentUser)
        this.id = parseInt(<string>params.get('id'));
        this.memoryBoxService.getById(this.id).subscribe((mymemorybox) => {
          this.memorybox = mymemorybox;
          this.titleForm = new FormControl(this.memorybox.title, [
            Validators.required,
            Validators.minLength(4)
          ]);
        })
      }
    })
  }

  toggleEditMemoryBox() {
    this.isEditing = !this.isEditing;
  }

  deleteMemoryBox() {
    if (this.memorybox) {
      this.memoryBoxService.delete(this.id).subscribe((deleteRes) => {
        this.router.navigate(['/home']).then(
          navigateRes => {
            this.snackBarService.info(`Memorybox ${this.memorybox.title} excluída com sucesso`);
          }
        );
      })
    }
  }

  editMemoryBox() {
    if (this.memorybox) {
      this.memorybox.title = this.titleForm.value;
      this.memoryBoxService.update(this.id, this.memorybox).subscribe((res)=> {
        this.toggleEditMemoryBox();
        this.snackBarService.info(`Memorybox ${this.memorybox.title} alterada com sucesso`);
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

    this.taskService.getAllByTagId(tagARemover.id).subscribe(getAllRes => {
      if (getAllRes.length > 0) {
      getAllRes.forEach((taskARemover) => {
        const taskIdx = this.memorybox.tasks.findIndex((task) => {
          return task.id === taskARemover.id;
        })
        this.memorybox.tasks.splice(taskIdx,1);
        this.memoryBoxService.update(this.id, this.memorybox).subscribe(updateRes => {
          this.taskService.delete(taskARemover.id).subscribe()

          const tagIdx = this.memorybox.tags.findIndex((tag)=>{
            return tag.id === tagARemover.id;
          })
          this.memorybox.tags.splice(tagIdx, 1);
          this.memoryBoxService.update(this.id, this.memorybox).subscribe(updateRes => {
              this.memorybox = updateRes;
              this.tagService.delete(tagARemover.id).subscribe(delRes => {
                window.location.reload();
                this.snackBarService.info(`Tag ${tagARemover.title} removida com sucesso`);
              });
            }
          )
        })
      })
      } else {
        const tagIdx = this.memorybox.tags.findIndex((tag)=>{
          return tag.id === tagARemover.id;
        })
        this.memorybox.tags.splice(tagIdx, 1);
        this.memoryBoxService.update(this.id, this.memorybox).subscribe(updateRes => {
            this.tagService.delete(tagARemover.id).subscribe(delRes => {
              window.location.reload();
              this.snackBarService.info(`Tag ${tagARemover.title} removida com sucesso`);
            });
          }
        )
      }
      })
  }

  openAddTagDialog() {
    const dialogRef = this.dialog.open(CreateTagDialogComponent, {
      data:{},
      panelClass: 'tag-dialog-container'
   });

      dialogRef.afterClosed().subscribe((data) => {
        if (data) {
          if (this.memorybox) {
            let tag = {title: data.title, color : data.color};
            this.tagService.create(data).subscribe(createRes => {
              this.memorybox.tags.push(createRes);
              this.memoryBoxService.update(this.id, this.memorybox).subscribe(updateRes => {
                this.memorybox = updateRes;
                this.snackBarService.sucesso(`Tag ${createRes.title} criada com sucesso`);
              });
            })
          }
        }
      });
  }
  openEditTagDialog(tagAEditar: ITag) {
    const dialogRef = this.dialog.open(EditTagDialogComponent, {
      data:{tag: tagAEditar},
      panelClass: 'tag-dialog-container'
   });

      dialogRef.afterClosed().subscribe((data) => {
        if (data) {
          const idx = this.memorybox.tags.findIndex((tag)=>{
            return tag.id === tagAEditar.id;
          })
          if (this.memorybox) {
            this.tagService.update(tagAEditar.id, data).subscribe(updateRes => {
              this.memorybox.tags[idx] = updateRes;
              this.memoryBoxService.update(this.id, this.memorybox).subscribe(updateBoxRes => {
                this.memorybox = updateBoxRes;
                this.snackBarService.info(`Tag ${updateRes.title} alterada com sucesso`);
              });
            })
          }
        }
      });
  }
}
