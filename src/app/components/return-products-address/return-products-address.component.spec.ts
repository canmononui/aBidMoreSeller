import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnProductsAddressComponent } from './return-products-address.component';

describe('ReturnProductsAddressComponent', () => {
  let component: ReturnProductsAddressComponent;
  let fixture: ComponentFixture<ReturnProductsAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnProductsAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnProductsAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
