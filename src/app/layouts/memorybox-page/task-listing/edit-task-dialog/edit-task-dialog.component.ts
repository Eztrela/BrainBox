import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITask } from 'src/app/shared/interfaces/itask';
import { MemoryBox, Tag, Task } from 'src/app/shared/models';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent {
  public task:Task;
  // public memorybox:MemoryBox;
  public titleForm = new FormControl();
  public descriptionForm = new FormControl();
  public statusForm = new FormControl();
  public priorityForm = new FormControl();
  public tagsForm = new FormControl();
  public dueDateForm = new FormControl();
  public taskForm!: FormGroup;
  public task_status: string = "";
  public tags: Array<Tag> = new Array<Tag>();
  public status = [
    {value: 'New', viewValue: 'New'},
    {value: 'In progress', viewValue: 'In Progress'},
    {value: 'On hold', viewValue: 'On Hold'},
    {value: 'Resolved', viewValue: 'Resolved'},
    {value: 'Rejected', viewValue: 'Rejected'},
  ];
  public priorities = [
    {value: '1', viewValue: 'Muito Baixa'},
    {value: '2', viewValue: 'Baixa'},
    {value: '3', viewValue: 'Média'},
    {value: '4', viewValue: 'Alta'},
  ]

  ngOnInit() {

    this.titleForm = new FormControl(this.task.title, [
      Validators.required,
      Validators.minLength(4)
    ])
    this.descriptionForm = new FormControl(this.task.description, [
      Validators.required,
      Validators.minLength(4)
    ])
    this.statusForm = new FormControl(this.task.status, [
      Validators.required
    ])
    this.priorityForm = new FormControl(this.task.priority, [
      Validators.required
    ])
    this.tagsForm = new FormControl(this.tags, [
      Validators.required
    ])
    this.statusForm = new FormControl(this.task.status, [
      Validators.required
    ]);
    this.dueDateForm = new FormControl(this.task.datetimeDue, [
      Validators.required
    ]);
    this.taskForm = new FormGroup({
      title: this.titleForm,
      description: this.descriptionForm,
      status: this.statusForm,
      priority: this.priorityForm,
      tag: this.tagsForm,
      datetimeDue: this.dueDateForm
    })
  }

  constructor(public dialogRef: MatDialogRef<EditTaskDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.tags = data.memorybox.tags
    this.task = data.task;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  getTitleErrorMessage() {
    if (this.titleForm.hasError('required')) {
      return 'Você precisa fornecer um título!';
    } else if (this.titleForm.hasError('minlength')) {
      return 'O título precisa ter no mínimo 4 carácteres!';
    } else { return ''}
  }

  getDescriptionErrorMessage() {
    if (this.descriptionForm.hasError('required')) {
      return 'Você precisa fornecer alguma descrição!';
    } else if (this.descriptionForm.hasError('minlength')) {
      return 'Descrição precisa ter no mínimo 4 carácteres!';
    } else { return ''}
  }
}
