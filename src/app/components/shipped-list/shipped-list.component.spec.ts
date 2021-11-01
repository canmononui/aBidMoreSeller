import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippedListComponent } from './shipped-list.component';

describe('ShippedListComponent', () => {
  let component: ShippedListComponent;
  let fixture: ComponentFixture<ShippedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
