import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyAnuncioComponent } from './body-anuncio.component';

describe('BodyAnuncioComponent', () => {
  let component: BodyAnuncioComponent;
  let fixture: ComponentFixture<BodyAnuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyAnuncioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
