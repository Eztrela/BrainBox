import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MemoryboxService} from "../../shared/services/memorybox.service";
import {MemoryBox, Note, Task, User} from "../../shared/models";
import {Observable} from 'rxjs'
import {FormControl, Validators} from "@angular/forms";
@Component({
  selector: 'app-memorybox-page',
  templateUrl: './memorybox-page.component.html',
  styleUrls: ['./memorybox-page.component.css']
})
export class MemoryboxPageComponent implements OnInit {
  public id: number = 0;
  public memorybox: MemoryBox = new MemoryBox(0,"",0);
  public isEditing: boolean = false;
  public titleForm: FormControl = new FormControl();
  constructor(private router: Router,
              private route: ActivatedRoute,
              private memoryBoxService: MemoryboxService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get('id'));
    })
    this.memoryBoxService.getById(this.id).subscribe((mymemorybox: any) => {
      this.memorybox = mymemorybox;
      this.titleForm = new FormControl(this.memorybox.title, [
        Validators.required,
        Validators.minLength(4)
      ]);
    })
  }

  toggleEditMemoryBox() {
    this.isEditing = !this.isEditing;
  }

  deleteMemoryBox() {
    this.memoryBoxService.delete(this.memorybox.id).subscribe((res) => {
      this.router.navigate(['/home']);
    })
  }

  editMemoryBox() {
    this.memorybox.title = this.titleForm.value;
    this.memoryBoxService.update(this.memorybox.id, this.memorybox).subscribe((res)=> {
      this.toggleEditMemoryBox();
    })
  }

  getErrorMessage() {
    if (this.titleForm.hasError('required')) {
      return 'Você precisa fornecer algum conteúdo!';
    } else if (this.titleForm.hasError('minlength')) {
      return 'Anotação precisa ter no mínimo 4 carácteres!';
    } else { return ''}
  }
}
