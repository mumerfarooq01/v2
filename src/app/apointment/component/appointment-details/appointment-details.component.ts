import {
  Component,
  ChangeDetectorRef,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild
} from '@angular/core';

import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  MatSort
} from '@angular/material/sort';
import {
Appointment,
AppointmentList,
AppointmentResponse
} from '../../../shared/interfaces/appointment.interface';
import {
  DataSource,
  CollectionViewer
} from '@angular/cdk/collections';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  BehaviorSubject,
  fromEvent,
  merge,
  Observable,
  of as observableOf,

} from 'rxjs';

import {
  environment
} from '../../../../environments/environment';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { ApointmentServiceService } from '../../services/apointment-service.service';

import { AuthService} from '../../../shared/security/auth.service';

import Swal from 'sweetalert2';

import { EditDetailsComponent } from '../edit-details/edit-details.component';

import { CancelDetailsComponent } from '../cancel-details/cancel-details.component';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.sass']
})
export class AppointmentDetailsComponent implements OnInit {

  public apointmentDetails = {} as Appointment;
  constructor(
    private appointmentservice: ApointmentServiceService,
    private currentroute: ActivatedRoute,
    private route: Router,
    private snackBar: MatSnackBar,
    private authservice: AuthService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {

    this.appointmentservice.AppointmentDetails(this.currentroute.snapshot.params.AptId)
    .subscribe(Data => {
      Data.Detail.slot_date = Data.Detail.slot_date.replace(/\s/g, "T") + 'Z';
      Data.Detail.timestamp = Data.Detail.timestamp.replace(/\s/g, "T") + 'Z';
      this.apointmentDetails = Data.Detail;
    }, Error => {});
  }

  CheckUserType(){
    if (this.authservice.getRole() === 'Doctor'){
      return true;
    }else{
      return false;
    }
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 8000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  EditPatientDetails(){
    const dialogRef = this.dialog.open(EditDetailsComponent, {
      data: this.currentroute.snapshot.params.AptId,
      width:'800px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result == 1){
      this.showNotification(
        'snackbar-success',
        'Patient Details Updated Successfully',
        'top',
        'right'
      );

      this.ngOnInit();
      }
    });
  }

  Acknowledge(){

    this.appointmentservice.ChangeStatus('Acknowledged', this.currentroute.snapshot.params.AptId)
    .subscribe(Data => {
      if (Data){
        this.ngOnInit();
      this.showNotification(
        'snackbar-success',
        'Appointment acknowledged',
        'top',
        'right'
      );
      }
    }, Error => {});
  }

  CancelAppt(){


    const dialogRef = this.dialog.open(CancelDetailsComponent, {
      data: this.currentroute.snapshot.params.AptId,
      width: '800px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result === 1){
        console.error(result);
        this.showNotification(
          'snackbar-danger',
          'Appointment Canceled',
          'top',
          'right'
      );

      this.ngOnInit();
      }
    });

    // const swalWithBootstrapButtons = Swal.mixin({
    //   customClass: {
    //     confirmButton: 'btn btn-danger',
    //     cancelButton: 'btn btn-success'
    //   },
    //   buttonsStyling: false
    // });
    // swalWithBootstrapButtons
    //   .fire({
    //     title: 'Are you sure?',
    //     text: "You won't be able to revert this!",
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonText: 'Yes, Cancel it!',
    //     cancelButtonText: 'No ',
    //     reverseButtons: true
    //   })
    //   .then(result => {
    //     if (result.value) {
    //       this.appointmentservice.ChangeStatus('Canceled', this.currentroute.snapshot.params.AptId)
    //       .subscribe(Data => {
    //         if (Data){
    //           this.ngOnInit();
    //         this.showNotification(
    //           'snackbar-warning',
    //           'Appiontment Canceled Successfully...!!!',
    //           'top',
    //           'right'
    //         );
    //         }
    //       }, Error => {});
    //     } else if (
    //       /* Read more about handling dismissals below */
    //       result.dismiss === Swal.DismissReason.cancel
    //     ) {
    //       // swalWithBootstrapButtons.fire(
    //       //   'Cancelled',
    //       //   'Your imaginary file is safe :)',
    //       //   'error'
    //       // );
    //     }
    //   });

  }

}
