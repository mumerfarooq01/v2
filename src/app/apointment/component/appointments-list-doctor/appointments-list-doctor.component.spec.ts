import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsListDoctorComponent } from './appointments-list-doctor.component';

describe('AppointmentsListDoctorComponent', () => {
  let component: AppointmentsListDoctorComponent;
  let fixture: ComponentFixture<AppointmentsListDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentsListDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsListDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
