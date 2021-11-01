import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesStatisticsSummaryComponent } from './sales-statistics-summary.component';

describe('SalesStatisticsSummaryComponent', () => {
  let component: SalesStatisticsSummaryComponent;
  let fixture: ComponentFixture<SalesStatisticsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesStatisticsSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesStatisticsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
