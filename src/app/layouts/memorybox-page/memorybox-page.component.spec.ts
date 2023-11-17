import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryboxPageComponent } from './memorybox-page.component';

describe('MemoryboxPageComponent', () => {
  let component: MemoryboxPageComponent;
  let fixture: ComponentFixture<MemoryboxPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemoryboxPageComponent]
    });
    fixture = TestBed.createComponent(MemoryboxPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
