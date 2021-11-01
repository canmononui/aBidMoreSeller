import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnProductsDetailComponent } from './return-products-detail.component';

describe('ReturnProductsDetailComponent', () => {
  let component: ReturnProductsDetailComponent;
  let fixture: ComponentFixture<ReturnProductsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnProductsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnProductsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
