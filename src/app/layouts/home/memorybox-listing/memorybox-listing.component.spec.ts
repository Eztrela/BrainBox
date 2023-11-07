import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryboxListingComponent } from './memorybox-listing.component';

describe('MemoryboxListingComponent', () => {
  let component: MemoryboxListingComponent;
  let fixture: ComponentFixture<MemoryboxListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemoryboxListingComponent]
    });
    fixture = TestBed.createComponent(MemoryboxListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
