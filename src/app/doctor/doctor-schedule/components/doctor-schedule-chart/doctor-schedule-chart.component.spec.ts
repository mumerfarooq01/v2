import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorScheduleChartComponent } from './doctor-schedule-chart.component';

describe('DoctorScheduleChartComponent', () => {
  let component: DoctorScheduleChartComponent;
  let fixture: ComponentFixture<DoctorScheduleChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorScheduleChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorScheduleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
