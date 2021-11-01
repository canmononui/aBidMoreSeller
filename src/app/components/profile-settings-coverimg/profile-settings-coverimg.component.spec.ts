import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSettingsCoverimgComponent } from './profile-settings-coverimg.component';

describe('ProfileSettingsCoverimgComponent', () => {
  let component: ProfileSettingsCoverimgComponent;
  let fixture: ComponentFixture<ProfileSettingsCoverimgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSettingsCoverimgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSettingsCoverimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
