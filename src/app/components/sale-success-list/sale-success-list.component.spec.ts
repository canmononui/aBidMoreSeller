import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleSuccessListComponent } from './sale-success-list.component';

describe('SaleSuccessListComponent', () => {
  let component: SaleSuccessListComponent;
  let fixture: ComponentFixture<SaleSuccessListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleSuccessListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleSuccessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
