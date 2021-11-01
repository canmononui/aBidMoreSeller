import { TestBed } from '@angular/core/testing';

import { LinkPathService } from './link-path.service';

describe('LinkPathService', () => {
  let service: LinkPathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkPathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
