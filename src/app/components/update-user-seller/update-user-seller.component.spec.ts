import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserSellerComponent } from './update-user-seller.component';

describe('UpdateUserSellerComponent', () => {
  let component: UpdateUserSellerComponent;
  let fixture: ComponentFixture<UpdateUserSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUserSellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
