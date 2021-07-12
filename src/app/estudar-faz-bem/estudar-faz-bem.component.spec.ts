import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudarFazBemComponent } from './estudar-faz-bem.component';

describe('EstudarFazBemComponent', () => {
  let component: EstudarFazBemComponent;
  let fixture: ComponentFixture<EstudarFazBemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudarFazBemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudarFazBemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
