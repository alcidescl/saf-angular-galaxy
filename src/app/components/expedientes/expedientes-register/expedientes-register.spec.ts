import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedientesRegister } from './expedientes-register';

describe('ExpedientesRegister', () => {
  let component: ExpedientesRegister;
  let fixture: ComponentFixture<ExpedientesRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpedientesRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpedientesRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
