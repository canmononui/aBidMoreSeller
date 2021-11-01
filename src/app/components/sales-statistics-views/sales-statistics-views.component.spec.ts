import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesStatisticsViewsComponent } from './sales-statistics-views.component';

describe('SalesStatisticsViewsComponent', () => {
  let component: SalesStatisticsViewsComponent;
  let fixture: ComponentFixture<SalesStatisticsViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesStatisticsViewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesStatisticsViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
