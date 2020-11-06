import { TestBed } from '@angular/core/testing';

import { DoctorscheduleserviceService } from './doctorscheduleservice.service';

describe('DoctorscheduleserviceService', () => {
  let service: DoctorscheduleserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorscheduleserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
