import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCotacaoComponent } from './list-cotacao.component';

describe('ListCotacaoComponent', () => {
  let component: ListCotacaoComponent;
  let fixture: ComponentFixture<ListCotacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCotacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCotacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
