
import { Component, OnInit, ViewChild } from '@angular/core';

import { Doctor  } from '../../../shared/interfaces/doctor.interface';
import { DoctorDashboard, ApptCount, NextOnCall, DoctorStat  } from '../../../shared/interfaces/dashboard.interface';
import { AuthService } from '../../../shared/security/auth.service';
import { ServiceService } from '../../../doctor/dashboard/service.service';
import {
  MatTableDataSource
} from '@angular/material/table';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  displayedColumns: string[] = ['profilepic', 'Name', 'Ackn', 'Confrimed', 'TotalApt', 'Pending'];
  public dashboarddata = {} as DoctorDashboard;
  public doctorstat: DoctorStat[] = [];
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
    this.dashboardservice.AdminDashbaord()
    .subscribe( Data => {
      this.dashboarddata = Data;
      this.ApptCount = Data.ApptCount;
      this.Profile = Data.Profile;
      this.NextOnCall = Data.NextOnCall;
      this.NextShift = Data.NextShift;
      this.doctorstat = Data.DoctorDetail;
    }, Error => {});
  }

  ngOnInit() {
  }
}
