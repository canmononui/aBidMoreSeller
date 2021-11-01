import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportBuyProductComponent } from './support-buy-product.component';

describe('SupportBuyProductComponent', () => {
  let component: SupportBuyProductComponent;
  let fixture: ComponentFixture<SupportBuyProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportBuyProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportBuyProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
