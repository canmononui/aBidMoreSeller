import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationChatReplyComponent } from './notification-chat-reply.component';

describe('NotificationChatReplyComponent', () => {
  let component: NotificationChatReplyComponent;
  let fixture: ComponentFixture<NotificationChatReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationChatReplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationChatReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
