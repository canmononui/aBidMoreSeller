import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippedSuccessDetailComponent } from './shipped-success-detail.component';

describe('ShippedSuccessDetailComponent', () => {
  let component: ShippedSuccessDetailComponent;
  let fixture: ComponentFixture<ShippedSuccessDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippedSuccessDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippedSuccessDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
