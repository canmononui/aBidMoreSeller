import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportListBannerComponent } from './support-list-banner.component';

describe('SupportListBannerComponent', () => {
  let component: SupportListBannerComponent;
  let fixture: ComponentFixture<SupportListBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportListBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportListBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
