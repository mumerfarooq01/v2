import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import {
  Component,
  Inject
} from '@angular/core';
import {
  CalendarService
} from '../../../../services/calendar.service';
import {
  DoctorServiceService
} from '../../../../services/doctor-service.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import {
  Calendar
} from '../../.././../../../shared/interfaces/calendar.model';
import {
  Doctor
} from '../../.././../../../shared/interfaces/doctor.interface';
import {
  formatDate
} from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent {

  submitted = true;
  ActionType = 'Add';
  DoctorList: Doctor[] = [];
  action: string;
  dialogTitle: string;
  calendarForm: FormGroup;
  calendar: Calendar;
  showDeleteBtn = false;
  ShowMsg: boolean;
  constructor(
    public dialogRef: MatDialogRef < FormComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public calendarService: CalendarService,
    private fb: FormBuilder,
    private doctorserviceservice: DoctorServiceService
  ) {

    const date = new Date(this.getFormattedDate(data.calendar.startDate));
    // date.setDate(date.getDate() + 1);
    console.log(date);
    this.calendarService.CheckSlotAdmin(date).subscribe((res) => {
      console.log(res);
      if (res) {
      this.ShowMsg = true;
      console.log(this.ShowMsg);
      } else {
      this.ShowMsg = false;
      console.log(this.ShowMsg);
      }
    });

    console.log(data.calendar);
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.calendar.title;
      this.calendar = data.calendar;
      this.showDeleteBtn = true;
    } else if (this.action === 'add') {
      this.dialogTitle = 'Surgeon Schedule';
      this.calendar = data.calendar;
      this.showDeleteBtn = false;
    }

    this.calendarForm = this.fb.group({
      DoctorId: ['', Validators.required],
      startDate: [this.calendar.startDate,
        [Validators.required]],
      endDate: ['']
    });


    const DateGet = new Date(this.calendar.startDate);

    this.doctorserviceservice.getAllDoctorsListOnCall(DateGet.getFullYear()+'-'+ ( 1+DateGet.getMonth()) +'-'+DateGet.getDate())
      .subscribe(Data => {
        this.DoctorList = Data;
      }, Error => {});
  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required') ?
      'Required field' :
      this.formControl.hasError('email') ?
      'Not a valid email' :
      '';
  }

  getFormattedDate(d) {
    // var d = new Date();


    return d;
  }

  CheckValidation(){
    this.calendarForm.controls.startDate.updateValueAndValidity();
  }

  onSubmit() {
    // emppty stuff


    const date = new Date(this.calendarForm.controls.startDate.value);

    // Add a day
    // date.setDate(date.getDate());

    if (this.calendarForm.valid) {
      this.submitted= false;
      const FormData = {
        ScheduleType: 'Not Available',
        startDate: this.getFormattedDate(date),
        endDate: this.getFormattedDate(this.calendarForm.controls.endDate.value),
        DoctorId: this.calendarForm.controls.DoctorId.value
      };


      this.calendarService.AddCalendar(FormData)
        .subscribe(Data => {
          this.submitted= true;
          this.dialogRef.close('submit');
        }, Error => {    this.submitted= true;});
    }

  }
  deleteEvent() {
    this.calendarService.deleteCalendar(this.calendarForm.getRawValue());
    this.dialogRef.close('delete');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.calendarService.addUpdateCalendar(this.calendarForm.getRawValue());
    this.dialogRef.close('submit');
  }


  isSlotUniqueStart(control: FormControl) {
    const q = new Promise((resolve, reject) => {





      const date = new Date(this.calendarForm.controls.startDate.value);

      // Add a day
      // date.setDate(date.getDate() + 1);

      if (this.ActionType === 'Add') {
        this.calendarService.CheckSlotAdmin(date).subscribe((res) => {
          if (res) {
          resolve({
              AlreadySlot: true
            });
          } else {
            resolve(null);
          }
        }, () => {

          resolve({
            AlreadySlot: true
          });
        });

      }
    });
    return q;
  }

  isSlotUniqueEnd(control: FormControl) {
    const q = new Promise((resolve, reject) => {

      const date = this.getFormattedDate(control.value);
      if (this.calendarForm.controls.startDate.value > this.calendarForm.controls.endDate.value) {
        resolve({
          EndDateIssue : true
        });
      }

      if (this.ActionType === 'Add') {
        this.calendarService.CheckSlot(date, this.calendarForm.controls.DoctorId.value).subscribe((res) => {
          if (res) {
            resolve({
              AlreadySlot : true
            });
          } else {
            resolve(null);
          }
        }, () => {
          resolve({
            AlreadySlot : true
          });
        });

      }
    });
    return q;
  }

}
