import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceWithdrawComponent } from './finance-withdraw.component';

describe('FinanceWithdrawComponent', () => {
  let component: FinanceWithdrawComponent;
  let fixture: ComponentFixture<FinanceWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceWithdrawComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
