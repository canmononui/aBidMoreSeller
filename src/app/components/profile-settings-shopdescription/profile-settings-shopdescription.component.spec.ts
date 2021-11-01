import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSettingsShopdescriptionComponent } from './profile-settings-shopdescription.component';

describe('ProfileSettingsShopdescriptionComponent', () => {
  let component: ProfileSettingsShopdescriptionComponent;
  let fixture: ComponentFixture<ProfileSettingsShopdescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSettingsShopdescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSettingsShopdescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
