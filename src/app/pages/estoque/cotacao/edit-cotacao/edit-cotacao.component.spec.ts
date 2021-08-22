import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCotacaoComponent } from './edit-cotacao.component';

describe('EditCotacaoComponent', () => {
  let component: EditCotacaoComponent;
  let fixture: ComponentFixture<EditCotacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCotacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCotacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
