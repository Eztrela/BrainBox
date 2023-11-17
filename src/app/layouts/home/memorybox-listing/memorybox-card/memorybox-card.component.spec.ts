import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryboxCardComponent } from './memorybox-card.component';

describe('MemoryboxCardComponent', () => {
  let component: MemoryboxCardComponent;
  let fixture: ComponentFixture<MemoryboxCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemoryboxCardComponent]
    });
    fixture = TestBed.createComponent(MemoryboxCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
