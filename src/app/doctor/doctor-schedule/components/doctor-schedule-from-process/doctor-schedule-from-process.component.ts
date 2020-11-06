import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import {
  Component,
  Inject
} from '@angular/core';

import {
  DoctorServiceService
} from '../../../../admin/doctormangment/services/doctor-service.service';
import {
  DoctorscheduleserviceService
} from '../../services/doctorscheduleservice.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import {
  Calendar
} from '../../../../shared/interfaces/calendar.model';
import {
  Doctor
} from '../../../../shared/interfaces/doctor.interface';
import { DateTimeAdapter,OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE, OwlDateTimeIntl } from 'ng-pick-datetime';

import Swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';




@Component({
  selector: 'app-doctor-schedule-from-process',
  templateUrl: './doctor-schedule-from-process.component.html',
  styleUrls: ['./doctor-schedule-from-process.component.sass'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.

]
})
export class DoctorScheduleFromProcessComponent {

  dropdownSettings:IDropdownSettings = {
    singleSelection: false,
    idField: 'schedule_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableCheckAll: false,
    itemsShowLimit: 7,
    noDataAvailablePlaceholderText: 'No On-call slot available to link',
    maxHeight: 200,
    limitSelection: 7,
    allowSearchFilter: true
  };
  dropdownList = [];
  DoctorId: number;
  ActionType = 'Add';
  DoctorList: Doctor[] = [];
  action: string;
  dialogTitle: string;
  calendarForm: FormGroup;
  calendar = {} as Calendar;
  showDeleteBtn = true;
  CheckForm = false;
  ShowMsg: boolean;
  constructor(
    public dialogRef: MatDialogRef < DoctorScheduleFromProcessComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public calendarService: DoctorscheduleserviceService,
    private fb: FormBuilder,
    private doctorserviceservice: DoctorServiceService
  ) {

    this.CheckForm = false;
    this.DoctorId = data.calendar.DoctorId;
    const date = new Date(data.givendate);
    const checkdate  = new Date(data.givendate);
    checkdate.setDate(checkdate.getDate()-1);
    this.calendarService.GetOnCallSlots(checkdate, this.DoctorId)
    .subscribe(res => {
      this.dropdownList = res;

    },
    Error => { });

    this.calendarForm = this.fb.group({
      DoctorId: ['', Validators.required],
      Date: ['', [Validators.required]],
      startDate: [new Date(2018, 3, 10, 10, 0, 0), [Validators.required], this.isSlotUniqueStart.bind(this)],
      endDate: [new Date(2018, 3, 10, 11, 0, 0), [Validators.required], this.isSlotUniqueEnd.bind(this)],
      location: ['', [Validators.required]],
      alternatelocation: ['', ],
      linked: new FormControl([]),
      no_of_patient: ['', [Validators.required]]
    });

    this.ChangeValidate();

    date.setDate(date.getDate() - 1);


    // const EndDate = date;
    // Set the defaults
    this.action = data.action;
    if (this.action === 'add') {
      this.dialogTitle = 'Clinic Availability';
      this.calendar = data.calendar;
      this.showDeleteBtn = false;
      this.calendarForm.patchValue({
        DoctorId: this.calendar.DoctorId,
        Date: date
      });
    }



    this.doctorserviceservice.getAllDoctorsList()
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

  ChangeValidate() {


    if (this.f.location.value === 'Other'){
      this.calendarForm.controls.alternatelocation.setValidators(Validators.required);
    }else {
      this.calendarForm.controls.alternatelocation.clearValidators();
    }
  }

  get f() {
    return this.calendarForm.controls;
  }

  getFormattedDate(d) {
    // var d = new Date();

    // tslint:disable-next-line: max-line-length
    d = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);

    return d;
  }
  onSubmit() {
    // emppty stuff
    if (this.calendarForm.valid) {

      const Date = this.calendarForm.get('Date').value;

      const myDate = this.calendarForm.get('startDate').value;

      const endDate = this.calendarForm.get('endDate').value;

      let month = Date.getMonth();

      let hours = myDate.getHours();
      let minutes = myDate.getMinutes();
      let ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      let strTime = hours + ':' + minutes + ' ' + ampm;


      let hoursEnd = endDate.getHours();
      let minutesEnd = endDate.getMinutes();
      let ampmEnd = hours >= 12 ? 'pm' : 'am';
      hoursEnd = hoursEnd % 12;
      hoursEnd = hoursEnd ? hoursEnd : 12;
      minutesEnd = minutesEnd < 10 ? '0' + minutesEnd : minutesEnd;
      let strTimeEnd = minutesEnd + ':' + minutesEnd + ' ' + ampmEnd;

      month++;
let day= Date.getDate();
// day++;
      this.CheckForm = true;
      const FormData = {
        ScheduleType: 'Available',
        startDate: Date.getFullYear() + "-" + month + "-" + day  + " " + myDate.getHours() + ":" + myDate.getMinutes(),
        endDate: Date.getFullYear() + "-" + month + "-" + day  + " " + endDate.getHours() + ":" + endDate.getMinutes(),
        DoctorId: this.f.DoctorId.value,
        Location: this.f.location.value,
        alternativelocation: this.f.location.value,
        no_of_patient: this.f.no_of_patient.value,
        linked: this.f.linked.value
      };


      this.calendarService.AddCalendar(FormData)
        .subscribe(Data => {
          this.dialogRef.close('submit');
          this.CheckForm = false;
        }, Error => {
          this.CheckForm = false;
        });
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

  checkoncall(control: FormControl) {

    const q = new Promise((resolve, reject) => {


      const Date = this.calendarForm.get('Date').value;

      const myDate = control.value;

      let month = Date.getMonth();

      month++;
      // date1.setDate(date1.getDate() + 1);
      if (this.ActionType === 'Add') {
        this.calendarService.CheckDoctorOnCall(Date.getFullYear() + "-" + month + "-" + Date.getDate() ,  this.DoctorId).subscribe((res) => {
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

      } else {

      }





    });
    return q;
  }

  isSlotUniqueStart(control: FormControl) {

    const q = new Promise((resolve, reject) => {


      const Date = this.calendarForm.get('Date').value;

      const myDate = control.value;

      let month = Date.getMonth();
      let hours = myDate.getHours();
      let minutes = myDate.getMinutes();
      let ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      let strTime = hours + ':' + minutes + ' ' + ampm;
      month++;
      // date1.setDate(date1.getDate() + 1);
      if (this.ActionType === 'Add') {
        this.calendarService.CheckSlotTime(Date.getFullYear() + "-" + month + "-" + Date.getDate()  + " " + strTime,  this.DoctorId).subscribe((res) => {
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

      } else {

      }





    });
    return q;
  }

  isSlotUniqueEnd(control: FormControl) {
    const q = new Promise((resolve, reject) => {

      const Date = this.calendarForm.get('Date').value;

      const myDate = control.value;
      // date.setDate(date.getDate() + 1);
      if (this.f.startDate.value > this.f.endDate.value) {
        resolve({
          EndDateIssue: true
        });
      }
      // date.setDate(date.getDate() + 1);

      let month = Date.getMonth();
      let hours = myDate.getHours();
      let minutes = myDate.getMinutes();
      let ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      let strTime = hours + ':' + minutes + ' ' + ampm;
      month++;
      if (this.ActionType === 'Add') {
        // tslint:disable-next-line: max-line-length
        this.calendarService.CheckSlotTime( Date.getFullYear() + "-" + month + "-" + Date.getDate()  + " " + strTime, this.DoctorId).subscribe((res) => {
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

      } else {

      }





    });
    return q;
  }


  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}
