import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSettingsBookbankComponent } from './profile-settings-bookbank.component';

describe('ProfileSettingsBookbankComponent', () => {
  let component: ProfileSettingsBookbankComponent;
  let fixture: ComponentFixture<ProfileSettingsBookbankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSettingsBookbankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSettingsBookbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
