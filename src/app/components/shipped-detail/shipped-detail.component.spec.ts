import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippedDetailComponent } from './shipped-detail.component';

describe('ShippedDetailComponent', () => {
  let component: ShippedDetailComponent;
  let fixture: ComponentFixture<ShippedDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippedDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
