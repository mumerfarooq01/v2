import { TestBed } from '@angular/core/testing';

import { ApointmentServiceService } from './apointment-service.service';

describe('ApointmentServiceService', () => {
  let service: ApointmentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApointmentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
