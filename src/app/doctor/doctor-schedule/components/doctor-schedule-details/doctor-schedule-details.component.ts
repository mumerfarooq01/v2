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
} from '../../../../admin/doctormangment/services/calendar.service';
import {
  DoctorServiceService
} from '../../../../admin/doctormangment/services/doctor-service.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import {
  Calendar
} from '../../.././../shared/interfaces/calendar.model';
import {
  Doctor
} from '../../.././../shared/interfaces/doctor.interface';
import {
  formatDate
} from '@angular/common';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

import {
  IDropdownSettings
} from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-doctor-schedule-details',
  templateUrl: './doctor-schedule-details.component.html',
  styleUrls: ['./doctor-schedule-details.component.sass']
})
export class DoctorScheduleDetailsComponent {

  ShowEdit = false;
  dropdownSettings: IDropdownSettings = {
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
  calendarForm: FormGroup;
  LinkedOnAvail = 0;
  loadingData =  true;
  LinkedOnCall = 0;
  ShowDetails: Calendar;
  dialogTitle: string;
  calendar: Calendar;
  showDeleteBtn = true;
  ShowMsg = false;
  constructor(
    public dialogRef: MatDialogRef < DoctorScheduleDetailsComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public calendarService: CalendarService,
    private fb: FormBuilder,
    private doctorserviceservice: DoctorServiceService,
    private snackBar: MatSnackBar
  ) {

    this.calendarForm = this.fb.group({
      linked: new FormControl([], Validators.required)
    });

    this.ShowDetails = {} as Calendar;

    this.dialogTitle = 'Schedule Details';
    this.calendarService.GetSlotDetails(data.calendar.id)
      .subscribe(
        Data => {
          this.loadingData = false;
          this.ShowDetails = Data;

          this.LinkedOnAvail = Data.LinkedOnAvail.length;
          this.LinkedOnCall = Data.LinkedOnCall.length;

          if (Data.ScheduleType === 'Available') {
            this.dialogTitle = 'Available';
          } else {
            this.dialogTitle = 'On Call';
          }

          let GivenDate: any = Data.startDate;
          const CurrentDate = new Date();
          GivenDate = new Date(GivenDate);
          if (GivenDate > CurrentDate && Data.ScheduleType === 'Available') {
            this.showDeleteBtn = true;
          } else {
            this.showDeleteBtn = false;
          }

          this.calendarService.GetOnCallSlots(GivenDate, this.ShowDetails.DoctorId)
            .subscribe(res => {
                this.dropdownList = res;

              },
              Error => {});

        }, Error => {
          this.loadingData = false;
          console.error(Error);
        }
      );






  }


  PrintDate(DateParam: string) {
    const DateShow = new Date(DateParam);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return DateShow.getDate() + ' ' + months[DateShow.getMonth()] + ' ' + DateShow.getFullYear();


  }

  PrintScheduleType(type: string): string {
    if (type === 'Available') {
      return 'Available';
    } else {
      return 'On Call';

    }
  }

  PrintDateAvail(DateParam: string) {
    const DateShow = new Date(DateParam);

    let hours: any = DateShow.getHours();
    let minutes: any = DateShow.getMinutes();

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0' + hours : hours;
    // appending zero in the start if hours less than 10
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return DateShow.getDate() + ' ' + months[DateShow.getMonth()] + ' ' + DateShow.getFullYear() + ' ' + hours + ':' + minutes + ' ' + ampm;


  }

  editEvent() {
    this.dialogRef.close('edit');
  }



  deleteEvent() {
    this.calendarService.DeleteAvailability(this.ShowDetails.id)
      .subscribe(Data => {
        if (!Data) {
          this.ShowMsg = true;
        } else {
          this.ShowMsg = false;
          this.dialogRef.close('delete');
        }
      }, Error => {});
  }

  deleteEvent1() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-success'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      })
      .then(result => {

        if (result.value) {

          this.calendarService.DeleteAvailability(this.ShowDetails.id)
            .subscribe(Data => {

              if (Data) {
                this.ShowMsg = false;
                this.dialogRef.close('delete');
              } else {
                this.ShowMsg = true;
              }
            }, Error => {});
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          // swalWithBootstrapButtons.fire(
          //   'Cancelled',
          //   'Your imaginary file is safe :)',
          //   'error'
          // );
        }
      });

  }

  test() {
    // this.calendarService.deleteCalendar(this.calendarForm.getRawValue());
    // this.dialogRef.close('delete');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }



  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  RemoveLink(Id): void {
    this.calendarService.RemoveLink(this.ShowDetails.id, Id)
      .subscribe(Data => {
          if (Data) {
            this.calendarService.GetSlotDetails(this.ShowDetails.id)
              .subscribe(
                Data => {
                  this.ShowDetails = Data;

                  if (Data.ScheduleType === 'Available') {
                    this.dialogTitle = 'Available';
                  } else {
                    this.dialogTitle = 'On Call';
                  }

                  let GivenDate: any = Data.startDate;
                  const CurrentDate = new Date();
                  GivenDate = new Date(GivenDate);
                  if (GivenDate > CurrentDate && Data.ScheduleType !== 'Available') {
                    // this.showDeleteBtn = true;
                  } else {
                    // this.showDeleteBtn = false;
                  }



                  this.showNotification(
                    'snackbar-success',
                    ' Link Removed Successfully',
                    'top',
                    'right'
                  );
                  this.ShowEdit = false;
                }, Error => {}


              );
          } else {

          }
        },
        Error => {});
  }

  OnCallLinkEdit(): void {
    this.ShowEdit = !this.ShowEdit;
    if (this.ShowEdit) {
      let GivenDate: any = this.ShowDetails.startDate;
      GivenDate = new Date(GivenDate);
      this.calendarService.GetOnCallSlots(GivenDate, this.ShowDetails.DoctorId)
        .subscribe(res => {
            this.dropdownList = res;

          },
          Error => {});
    }
  }


  onSubmit(): void {


    const FormData = {
      linked: this.calendarForm.controls.linked.value
    };

    this.calendarService.UpdateLinkedCalledDays(FormData, this.ShowDetails.id)
      .subscribe(res => {
          this.ShowEdit = !this.ShowEdit;
          this.dialogRef.close();
          if (res) {

            this.showNotification(
              'snackbar-success',
              ' Link Updated Successfully',
              'top',
              'right'
            );
          }

        },
        Error => {
          this.dialogRef.close()
        });

  }

}
