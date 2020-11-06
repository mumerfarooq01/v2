import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import {
  Component,
  Inject
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { ApointmentServiceService } from '../../services/apointment-service.service';
import {
  Appointment,
  AppointmentList,
  AppointmentResponse
  } from '../../../shared/interfaces/appointment.interface';

@Component({
  selector: 'app-cancel-details',
  templateUrl: './cancel-details.component.html',
  styleUrls: ['./cancel-details.component.sass']
})
export class CancelDetailsComponent  {

  public secondFormGroup: FormGroup;
  private AptID = 0;

 constructor(
    public dialogRef: MatDialogRef < CancelDetailsComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formbuilder: FormBuilder,
    public aptservice: ApointmentServiceService
  ) {

    this.AptID = data;

    this.secondFormGroup = this.formbuilder.group({
      cancel_reason: ['', Validators.required],
    });

  }

  SubmitForm(){
    if(this.secondFormGroup.valid){
  

      this.aptservice.CancelAppointment(this.AptID, this.secondFormGroup.controls.cancel_reason.value, 'Cancelled')
      .subscribe(
        Data => {
          this.dialogRef.close(1);
        },
        Error => {
          this.dialogRef.close(0);
        }
      );

    }
  }

}
