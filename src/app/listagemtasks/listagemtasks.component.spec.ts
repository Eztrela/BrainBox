import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemtasksComponent } from './listagemtasks.component';

describe('ListagemtasksComponent', () => {
  let component: ListagemtasksComponent;
  let fixture: ComponentFixture<ListagemtasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListagemtasksComponent]
    });
    fixture = TestBed.createComponent(ListagemtasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
