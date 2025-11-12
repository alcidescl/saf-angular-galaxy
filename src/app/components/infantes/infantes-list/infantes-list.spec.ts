import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfantesList } from './infantes-list';

describe('InfantesList', () => {
  let component: InfantesList;
  let fixture: ComponentFixture<InfantesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfantesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfantesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
