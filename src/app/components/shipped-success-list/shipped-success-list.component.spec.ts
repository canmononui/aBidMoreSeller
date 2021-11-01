import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippedSuccessListComponent } from './shipped-success-list.component';

describe('ShippedSuccessListComponent', () => {
  let component: ShippedSuccessListComponent;
  let fixture: ComponentFixture<ShippedSuccessListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippedSuccessListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippedSuccessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
