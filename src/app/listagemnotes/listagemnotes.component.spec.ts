import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemnotesComponent } from './listagemnotes.component';

describe('ListagemnotesComponent', () => {
  let component: ListagemnotesComponent;
  let fixture: ComponentFixture<ListagemnotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListagemnotesComponent]
    });
    fixture = TestBed.createComponent(ListagemnotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
