import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnProductsArgueReceiveComponent } from './return-products-argue-receive.component';

describe('ReturnProductsArgueReceiveComponent', () => {
  let component: ReturnProductsArgueReceiveComponent;
  let fixture: ComponentFixture<ReturnProductsArgueReceiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnProductsArgueReceiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnProductsArgueReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
