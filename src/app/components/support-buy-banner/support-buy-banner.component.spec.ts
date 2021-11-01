import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportBuyBannerComponent } from './support-buy-banner.component';

describe('SupportBuyBannerComponent', () => {
  let component: SupportBuyBannerComponent;
  let fixture: ComponentFixture<SupportBuyBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportBuyBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportBuyBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
