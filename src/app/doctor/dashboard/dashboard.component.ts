import { Component, OnInit, ViewChild } from '@angular/core';

import { Doctor  } from '../../shared/interfaces/doctor.interface';
import { DoctorDashboard, ApptCount, NextOnCall } from '../../shared/interfaces/dashboard.interface';
import { AuthService } from '../../shared/security/auth.service';
import { ServiceService } from './service.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {


 public dashboarddata = {} as DoctorDashboard;
  public ApptCount: ApptCount = {
    all: 0,
    free: 0,
    confirm: 0,
    pending: 0,
    canceled: 0,
    new: 0
  };
  public Profile = {} as Doctor;
  public NextOnCall = {} as NextOnCall;
  public NextShift: NextOnCall[] = [];

  constructor(
    private dashboardservice: ServiceService,
    private authservice: AuthService
  ) {
    this.dashboardservice.DoctorDashbaord(this.authservice.getUserId())
    .subscribe( Data => {
      this.dashboarddata = Data;
      this.ApptCount = Data.ApptCount;
      this.Profile = Data.Profile;
      this.NextOnCall = Data.NextOnCall;
      this.NextShift = Data.NextShift;
      
    }, Error => {});
  }

  ngOnInit() {
  }
}
