import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationChatComponent } from './notification-chat.component';

describe('NotificationChatComponent', () => {
  let component: NotificationChatComponent;
  let fixture: ComponentFixture<NotificationChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
