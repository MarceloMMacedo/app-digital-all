import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItensCotacaoComponent } from './list-itens-cotacao.component';

describe('ListItensCotacaoComponent', () => {
  let component: ListItensCotacaoComponent;
  let fixture: ComponentFixture<ListItensCotacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItensCotacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItensCotacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
