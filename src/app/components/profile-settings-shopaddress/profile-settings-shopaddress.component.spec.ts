import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSettingsShopaddressComponent } from './profile-settings-shopaddress.component';

describe('ProfileSettingsShopaddressComponent', () => {
  let component: ProfileSettingsShopaddressComponent;
  let fixture: ComponentFixture<ProfileSettingsShopaddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSettingsShopaddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSettingsShopaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
