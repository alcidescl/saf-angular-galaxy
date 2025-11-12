import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedientesList } from './expedientes-list';

describe('ExpedientesList', () => {
  let component: ExpedientesList;
  let fixture: ComponentFixture<ExpedientesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpedientesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpedientesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
