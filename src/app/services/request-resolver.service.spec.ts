import { TestBed } from '@angular/core/testing';

import { RequestResolverService } from './request-resolver.service';

describe('RequestResolverService', () => {
  let service: RequestResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
