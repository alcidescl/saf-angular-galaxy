import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfantesRegister } from './infantes-register';

describe('InfantesRegister', () => {
  let component: InfantesRegister;
  let fixture: ComponentFixture<InfantesRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfantesRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfantesRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
