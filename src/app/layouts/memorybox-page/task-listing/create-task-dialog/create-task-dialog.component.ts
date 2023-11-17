import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITask } from 'src/app/shared/interfaces/itask';
import { MemoryBox, Task } from 'src/app/shared/models';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent {
  public task:Task = new Task("","","",0)
  public titleForm = new FormControl();
  public descriptionForm = new FormControl();
  public statusForm = new FormControl();
  public priorityForm = new FormControl();
  public taskForm!: FormGroup;
  public status = [
    {value: 'new', viewValue: 'New'},
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
    this.statusForm = new FormControl(this.task.status)
    this.priorityForm = new FormControl(this.task.priority)
    this.taskForm = new FormGroup({
      title: this.titleForm,
      description: this.descriptionForm,
      status: this.statusForm,
      priority: this.priorityForm
    })
  }

  constructor(public dialogRef: MatDialogRef<CreateTaskDialogComponent>) {
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
