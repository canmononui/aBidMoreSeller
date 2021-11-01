import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnProductsListComponent } from './return-products-list.component';

describe('ReturnProductsListComponent', () => {
  let component: ReturnProductsListComponent;
  let fixture: ComponentFixture<ReturnProductsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnProductsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
