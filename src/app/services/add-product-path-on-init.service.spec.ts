import { TestBed } from '@angular/core/testing';

import { AddProductPathOnInitService } from './add-product-path-on-init.service';

describe('AddProductPathOnInitService', () => {
  let service: AddProductPathOnInitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddProductPathOnInitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
