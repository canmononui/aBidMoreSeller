import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSettingsInfoComponent } from './profile-settings-info.component';

describe('ProfileSettingsInfoComponent', () => {
  let component: ProfileSettingsInfoComponent;
  let fixture: ComponentFixture<ProfileSettingsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSettingsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSettingsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
