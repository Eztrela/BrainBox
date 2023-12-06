import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTagDialogComponent } from './edit-tag-dialog.component';

describe('EditTagDialogComponent', () => {
  let component: EditTagDialogComponent;
  let fixture: ComponentFixture<EditTagDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTagDialogComponent]
    });
    fixture = TestBed.createComponent(EditTagDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
