import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupProductEditComponent } from './group-product-edit.component';

describe('GroupProductEditComponent', () => {
  let component: GroupProductEditComponent;
  let fixture: ComponentFixture<GroupProductEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupProductEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
