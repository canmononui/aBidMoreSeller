import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceDonateComponent } from './finance-donate.component';

describe('FinanceDonateComponent', () => {
  let component: FinanceDonateComponent;
  let fixture: ComponentFixture<FinanceDonateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceDonateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceDonateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
