import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSettingsShopnameComponent } from './profile-settings-shopname.component';

describe('ProfileSettingsShopnameComponent', () => {
  let component: ProfileSettingsShopnameComponent;
  let fixture: ComponentFixture<ProfileSettingsShopnameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSettingsShopnameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSettingsShopnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
