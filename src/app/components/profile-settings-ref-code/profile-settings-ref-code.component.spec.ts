import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSettingsRefCodeComponent } from './profile-settings-ref-code.component';

describe('ProfileSettingsRefCodeComponent', () => {
  let component: ProfileSettingsRefCodeComponent;
  let fixture: ComponentFixture<ProfileSettingsRefCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSettingsRefCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSettingsRefCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
