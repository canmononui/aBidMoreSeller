import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceWaitingWithdrawComponent } from './finance-waiting-withdraw.component';

describe('FinanceWaitingWithdrawComponent', () => {
  let component: FinanceWaitingWithdrawComponent;
  let fixture: ComponentFixture<FinanceWaitingWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceWaitingWithdrawComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceWaitingWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
