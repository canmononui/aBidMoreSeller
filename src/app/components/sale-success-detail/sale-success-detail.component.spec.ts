import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleSuccessDetailComponent } from './sale-success-detail.component';

describe('SaleSuccessDetailComponent', () => {
  let component: SaleSuccessDetailComponent;
  let fixture: ComponentFixture<SaleSuccessDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleSuccessDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleSuccessDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
