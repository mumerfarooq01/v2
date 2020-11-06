import { TestBed } from '@angular/core/testing';

import { AssitantService } from './assitant.service';

describe('AssitantService', () => {
  let service: AssitantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssitantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
