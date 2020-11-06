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
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.sass']
})
export class EditDetailsComponent  {
  public apointmentDetails = {} as Appointment;
  public secondFormGroup: FormGroup;
  private AptID = 0;
  constructor(
    public dialogRef: MatDialogRef < EditDetailsComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formbuilder: FormBuilder,
    public aptservice: ApointmentServiceService
  ) {

    this.AptID = data;

    this.secondFormGroup = this.formbuilder.group({
      patient_first_name: ['', Validators.pattern('[a-zA-Z]+')],
      patient_last_name: ['', Validators.pattern('[a-zA-Z]+')],
      patient_dob: [''],
      patient_phone: [''],
      phn: ['' ]
    });

    this.aptservice.AppointmentDetails(data)
    .subscribe(Data => {
      this.apointmentDetails = Data.Detail;

      this.secondFormGroup.patchValue(
        {
          patient_first_name: Data.Detail.patient_first_name,
          patient_last_name: Data.Detail.patient_last_name,
          patient_dob: Data.Detail.patient_dob,
          patient_phone: Data.Detail.patient_phone,
          phn: Data.Detail.phn
        }
      );
    }, Error => {});
  }

  SubmitForm(){
    if(this.secondFormGroup.valid){
      const FormData = {
        patient_first_name: this.secondFormGroup.controls.patient_first_name.value,
        patient_last_name: this.secondFormGroup.controls.patient_last_name.value,
        patient_dob: this.secondFormGroup.controls.patient_dob.value,
        patient_phone: this.secondFormGroup.controls.patient_phone.value,
        phn: this.secondFormGroup.controls.phn.value
      };

      this.aptservice.UpdateAppointment(this.AptID, FormData)
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
