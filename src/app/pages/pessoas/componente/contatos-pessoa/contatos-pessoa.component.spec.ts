import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatosPessoaComponent } from './contatos-pessoa.component';

describe('ContatosPessoaComponent', () => {
  let component: ContatosPessoaComponent;
  let fixture: ComponentFixture<ContatosPessoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContatosPessoaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContatosPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
