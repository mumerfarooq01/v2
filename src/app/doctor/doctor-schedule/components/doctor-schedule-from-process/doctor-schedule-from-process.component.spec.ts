import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorScheduleFromProcessComponent } from './doctor-schedule-from-process.component';

describe('DoctorScheduleFromProcessComponent', () => {
  let component: DoctorScheduleFromProcessComponent;
  let fixture: ComponentFixture<DoctorScheduleFromProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorScheduleFromProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorScheduleFromProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
