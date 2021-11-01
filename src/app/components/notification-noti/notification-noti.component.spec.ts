import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationNotiComponent } from './notification-noti.component';

describe('NotificationNotiComponent', () => {
  let component: NotificationNotiComponent;
  let fixture: ComponentFixture<NotificationNotiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationNotiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationNotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
