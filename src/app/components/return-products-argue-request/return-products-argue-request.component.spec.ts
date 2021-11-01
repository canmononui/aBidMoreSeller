import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnProductsArgueRequestComponent } from './return-products-argue-request.component';

describe('ReturnProductsArgueRequestComponent', () => {
  let component: ReturnProductsArgueRequestComponent;
  let fixture: ComponentFixture<ReturnProductsArgueRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnProductsArgueRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnProductsArgueRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
