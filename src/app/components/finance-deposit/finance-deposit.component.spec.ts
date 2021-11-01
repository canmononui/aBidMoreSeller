import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceDepositComponent } from './finance-deposit.component';

describe('FinanceDepositComponent', () => {
  let component: FinanceDepositComponent;
  let fixture: ComponentFixture<FinanceDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceDepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
