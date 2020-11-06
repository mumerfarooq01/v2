import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentslistReffererComponent } from './appointmentslist-refferer.component';

describe('AppointmentslistReffererComponent', () => {
  let component: AppointmentslistReffererComponent;
  let fixture: ComponentFixture<AppointmentslistReffererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentslistReffererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentslistReffererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
