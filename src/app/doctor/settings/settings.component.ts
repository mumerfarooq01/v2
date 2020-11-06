import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import {
  Observable
} from 'rxjs';
import {
  formatDate,
  Location
} from '@angular/common';
import {
  HttpEventType,
  HttpResponse
} from '@angular/common/http';
import {
  CustomValidators
} from 'ng2-validation';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  environment
} from '../../../environments/environment';

import {
  AuthService
} from '../../shared/security/auth.service';
import {
  ToasterService
} from '../../toaster/toaster.service';

import {
  DoctorServiceService
} from '../../admin/doctormangment/services/doctor-service.service';

import {
  Doctor
} from '../../shared/interfaces/doctor.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  Submitted = false;
  SubmittedNoti = false;
  doctor: Doctor;
  doctorApptSetting = false;
  doctorId: string;
  ApptSettingAdvanceForm: FormGroup;
  NotificationSettingForm: FormGroup;
  ApptSettingForm: FormGroup;

  constructor(private toaster: ToasterService,
              private doctorservices: DoctorServiceService,
              private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private autservice: AuthService,
              private formbuilder: FormBuilder) {

      this.doctorId = this.autservice.getUserId();
      this.NotificationSettingForm = this.formbuilder.group({
      notification_setting: ['', [Validators.required]],
    });

      this.ApptSettingForm = this.formbuilder.group({
        appointment_default_status: ['', [Validators.required]],
    });

      this.ApptSettingAdvanceForm = this.formbuilder.group({
      appointment_wcp_status: ['', [Validators.required]],
      appointment_msp_status: ['', [Validators.required]]
    });


      this.doctorservices.getDoctorDetails(this.autservice.getUserId())
      .subscribe( Data => {

      this.doctorApptSetting = Data.appointment_setting;

      if (Data.appointment_setting){
        this.doctorApptSetting = true;
      }else{
        this.doctorApptSetting = false;
      }
      console.log(this.doctorApptSetting);
      this.ApptSettingAdvanceForm.patchValue({
        appointment_wcp_status: Data.appointment_wcp_status,
        appointment_msp_status: Data.appointment_msp_status
      });
      this.ApptSettingForm.patchValue({
        appointment_default_status: Data.appointment_default_status
      });
      this.NotificationSettingForm.patchValue({
        notification_setting: Data.notification_setting
      });
    } , Error => {} );

  }

  ngOnInit(): void {}

  onSubmit(): void{
    if (this.NotificationSettingForm.valid){
      this.SubmittedNoti = true;
      const FormData = {
        notification_setting: this.NotificationSettingForm.controls.notification_setting.value,
      };

      this.doctorservices.UpdateDoctorAppointmentStatus(this.doctorId, FormData)
      .subscribe( Data => {
        if (Data){
          this.SubmittedNoti = false;
          this.showNotification(
            'snackbar-success',
            'Notification Setting Updated',
            'top',
            'right'
          );
        }
      } , Error => {

        this.SubmittedNoti = false;
      });
    }

  }

  onSubmitNormal(): void{
    if (this.ApptSettingForm.valid){
      this.Submitted = true;
      const FormData = {
        appointment_default_status: this.ApptSettingForm.controls.appointment_default_status.value,
      };

      this.doctorservices.UpdateDoctorAppointmentStatus(this.doctorId, FormData)
      .subscribe( Data => {
        if (Data){
          this.Submitted = false;
          this.showNotification(
            'snackbar-success',
            'Appointment Default Status Setting Updated',
            'top',
            'right'
          );
        }
      } , Error => {

        this.Submitted = false;
      });
    }
  }

  onSubmitDifferent(): void{
    if (this.ApptSettingAdvanceForm.valid){
      this.Submitted = true;
      const FormData = {
        appointment_wcp_status: this.ApptSettingAdvanceForm.controls.appointment_wcp_status.value,
        appointment_msp_status: this.ApptSettingAdvanceForm.controls.appointment_msp_status.value
      };

      this.doctorservices.UpdateDoctorAppointmentStatus(this.doctorId, FormData)
      .subscribe( Data => {
        if (Data){
          this.Submitted = false;
          this.showNotification(
            'snackbar-success',
            'Appointment Default Status Setting Updated',
            'top',
            'right'
          );
        }
      } , Error => {

        this.Submitted = false;
      });

    }
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

}
