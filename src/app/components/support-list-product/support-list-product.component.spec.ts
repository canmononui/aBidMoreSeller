import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportListProductComponent } from './support-list-product.component';

describe('SupportListProductComponent', () => {
  let component: SupportListProductComponent;
  let fixture: ComponentFixture<SupportListProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportListProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportListProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
