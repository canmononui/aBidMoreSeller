import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSettingsShopfileComponent } from './profile-settings-shopfile.component';

describe('ProfileSettingsShopfileComponent', () => {
  let component: ProfileSettingsShopfileComponent;
  let fixture: ComponentFixture<ProfileSettingsShopfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSettingsShopfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSettingsShopfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
