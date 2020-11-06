import { TestBed } from '@angular/core/testing';

import { RefferService } from './reffer.service';

describe('RefferService', () => {
  let service: RefferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
