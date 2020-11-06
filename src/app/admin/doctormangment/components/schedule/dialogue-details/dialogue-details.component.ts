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
} from '../../../services/calendar.service';
import {
  DoctorServiceService
} from '../../../services/doctor-service.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import {
  Calendar
} from '../../.././../../shared/interfaces/calendar.model';
import {
  Doctor
} from '../../.././../../shared/interfaces/doctor.interface';
import {
  formatDate
} from '@angular/common';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dialogue-details',
  templateUrl: './dialogue-details.component.html',
  styleUrls: ['./dialogue-details.component.sass']
})
export class DialogueDetailsComponent {

  LinkedOnCall = 0;
  LinkedOnAvail = 0;
  ShowMsg = false;
  CheckForm = false;
  EditNote = false;
  loading = true;
  NoteForm: FormGroup;
  ShowDetails: Calendar;
  dialogTitle: string;
  calendar: Calendar;
  showDeleteBtn = true;
  constructor(
    public dialogRef: MatDialogRef < DialogueDetailsComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public calendarService: CalendarService,
    private fb: FormBuilder,
    private doctorserviceservice: DoctorServiceService,
    private snackBar: MatSnackBar
  ) {

    this.ShowDetails = {} as Calendar;

    this.dialogTitle = 'Schedule Details';


    this.NoteForm = this.fb.group({
      note: ['', [Validators.required]],
    });



    this.calendarService.GetSlotDetails(data.calendar.id)
      .subscribe(
        Data => {
          this.ShowDetails = Data;
          this.loading = false;
          if (Data.ScheduleType === 'Available') {
            this.dialogTitle = 'Available';
          } else {
            this.dialogTitle = 'On Call';
          }


          this.LinkedOnCall = this.ShowDetails.LinkedOnCall.length;
          this.LinkedOnAvail = this.ShowDetails.LinkedOnAvail.length;

          let GivenDate: any = Data.startDate;
          const CurrentDate = new Date();
          GivenDate = new Date(GivenDate);
          if (GivenDate > CurrentDate && Data.ScheduleType !== 'Available') {
            this.showDeleteBtn = true;
          } else {
            this.showDeleteBtn = false;
          }


          this.NoteForm.patchValue({
            note: Data.note
          });

        }, Error => {
          this.loading=false;
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

  deleteEvent() {
    this.calendarService.DeleteAvailability(this.ShowDetails.id)
      .subscribe(Data => {
        this.dialogRef.close('delete');
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
  onNoClick(): void {
    this.dialogRef.close();
  }

  AddNote(): void {
    this.EditNote = !this.EditNote;
  }


  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  onSubmitFormNote(): void {

    if (this.NoteForm.valid) {
      this.CheckForm = true;

      const FormData = {
        note: this.NoteForm.controls.note.value,
        id: this.ShowDetails.id
      };

      this.calendarService.UpdateNote(FormData)
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
                    this.showDeleteBtn = true;
                  } else {
                    this.showDeleteBtn = false;
                  }


                  this.NoteForm.patchValue({
                    note: Data.note
                  });

                }, Error => {}
              );

            this.EditNote = !this.EditNote;
            this.CheckForm = false;
            this.showNotification(
              'snackbar-success',
              ' Note Updated Successfully',
              'top',
              'right'
            );

          }
        }, Error => {
          this.CheckForm = false;
          this.EditNote = !this.EditNote;
        });
    }
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
                  this.showDeleteBtn = true;
                } else {
                  this.showDeleteBtn = false;
                }


                this.NoteForm.patchValue({
                  note: Data.note
                });

                this.showNotification(
                  'snackbar-success',
                  ' Link Removed Successfully',
                  'top',
                  'right'
                );
              }, Error => {}
            );
          } else {

          }
        },
        Error => {});
  }


}
