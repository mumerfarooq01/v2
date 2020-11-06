import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorScheduleDetailsComponent } from './doctor-schedule-details.component';

describe('DoctorScheduleDetailsComponent', () => {
  let component: DoctorScheduleDetailsComponent;
  let fixture: ComponentFixture<DoctorScheduleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorScheduleDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorScheduleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
