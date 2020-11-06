import {
  Component,
  OnDestroy,
  OnInit, ViewChild
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import {
  AuthService
} from '../../../shared/security/auth.service';
import {
  RefferService
} from '../../../admin/refferermanagment/services/reffer.service';
import {
  Refferer
} from '../../../shared/interfaces/refferer.interface';
import {
  Doctor
} from '../../../shared/interfaces/doctor.interface';
import {
  DoctorServiceService
} from '../../../admin/doctormangment/services/doctor-service.service';
import {
  ApointmentServiceService
} from '../../services/apointment-service.service';
import {
  Appointment
} from '../../../shared/interfaces/appointment.interface';
import {
  UploadFileService
} from '../../../shared/services/upload-file.service';
import {
  WebcamImage
} from 'ngx-webcam';
import {
  Observable
} from 'rxjs';
import {
  environment
} from '../../../../environments/environment';
import {
  HttpEventType,
  HttpResponse
} from '@angular/common/http';
import {
  NavigationMode, WizardComponent
} from 'angular-archwizard';
import {
  MatSnackBar
} from '@angular/material/snack-bar';

import {
  ActivatedRoute,
  Router,
  NavigationEnd
} from '@angular/router';

import { CustomValidators } from 'ng2-validation';

import {
  NgxSpinnerService
} from "ngx-spinner";
@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.sass']
})
export class AddnewComponent implements OnInit, OnDestroy {
  
  UploadPatientCard = false;
  UploadPatientReport = false;
  navigationSubscription: any;
  TakePicture = false;
  isLinear = false;
  LoggedinId: any = 0;
  reffererDetails: Refferer = {} as Refferer;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public patientDemoSticker: WebcamImage = null;
  public reportImage: WebcamImage = null;
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  fileInfos: Observable < any > ;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  Doctor = {} as Doctor;
  ReportImage = '';
  maxDob = new Date();
  Report: string[] = [];
  apointmentDetails = {} as Appointment;
  PicturePatient: string;
  PicturePatientCheck = true;
  Success = false;
  Processed = false;
  ShowCurrent = false;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  constructor(
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private formbuilder: FormBuilder,
    private authservice: AuthService,
    private uploadservice: UploadFileService,
    private reffererservice: RefferService,
    private appointmentservice: ApointmentServiceService,
    private router: ActivatedRoute,
    private route: Router,
    private doctorservice: DoctorServiceService
  ) {

    this.navigationSubscription = this.route.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseView();
      }
    });
    this.PicturePatient = '';
    this.ShowCurrent = true;

    const url = this.route.url;

    this.LoggedinId = this.authservice.getUserId();

    this.doctorservice.GetDoctorDetailsOnCall()
      .subscribe(Data => {
        if (Data.Success) {
          this.ShowCurrent = true;
          this.Doctor = Data.Doctor;

        } else {
          this.ShowCurrent = false;
          this.showNotification(
            'snackbar-error',
            'No On-call Doctor found for today',
            'top',
            'right'
          );
        }
      }, Error => {});

    this.firstFormGroup = this.formbuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mobile: ['', Validators.required],
      msp: ['', Validators.required],
    });
    // tslint:disable-next-line: align
    this.secondFormGroup = this.formbuilder.group({
      patient_first_name: [''],
      patient_last_name: [''],
      patient_dob: [''],
      patient_phone: [''],
      reason: ['', Validators.required],
      wbc: ['', Validators.required],
      sitelocation: ['', Validators.required],
      alternatelocation: [''],
      phn: ['' ]
    });

    this.UploadPickEnable();
  }

  SelectValueChange(event: any){
    console.log(this.secondFormGroup.controls.sitelocation.value);
    if (this.secondFormGroup.controls.sitelocation.value !== 'Other'){
      this.secondFormGroup.controls.alternatelocation.clearValidators();
    }else{
      this.secondFormGroup.controls.alternatelocation.setValidators(Validators.required);
    }
    this.secondFormGroup.controls.alternatelocation.updateValueAndValidity();
  }

  initialiseView() {
   if (this.wizard){
     this.TakePicture = false;
     this.isLinear = false;
     this.secondFormGroup.reset();
     this.patientDemoSticker = null;
     this.selectedFiles = FileList.prototype;
     this.currentFile = File.prototype;
     this.progress = 0;
     this.message = '';
     this.Doctor = {} as Doctor;
     this.ReportImage = '';
     this.Report  = [];
     this.apointmentDetails = {} as Appointment;
     this.PicturePatientCheck = true;
     this.Success = false;
     this.Processed = false;
     this.ShowCurrent = false;
     this.PicturePatient = '';
     this.ShowCurrent = true;
     const url = this.route.url;
     this.LoggedinId = this.authservice.getUserId();
     this.wizard.reset();
     this.UploadPickEnable();
   }
  }

  UploadPickEnable() {
    this.PicturePatientCheck = !this.PicturePatientCheck;

    if (this.PicturePatientCheck){
      this.TakePicture = true;
      this.patientDemoSticker = null;
      this.secondFormGroup.controls.patient_first_name.clearValidators();
      this.secondFormGroup.controls.patient_last_name.clearValidators();
      this.secondFormGroup.controls.patient_dob.clearValidators();
      this.secondFormGroup.controls.patient_phone.clearValidators();
      this.secondFormGroup.controls.phn.clearValidators();
      this.secondFormGroup.controls.alternatelocation.clearValidators();
      console.log(1);
    }else{
      console.log(2);
      this.TakePicture = false;
      this.secondFormGroup.controls.patient_first_name.setValidators(Validators.required);
      this.secondFormGroup.controls.patient_last_name.setValidators(Validators.required);
      this.secondFormGroup.controls.sitelocation.setValidators(Validators.required);
      this.secondFormGroup.controls.patient_dob.setValidators(Validators.required);
      this.secondFormGroup.controls.phn.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
      this.secondFormGroup.controls.patient_phone.setValidators( [Validators.required, Validators.pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)]);
      if (this.secondFormGroup.controls.sitelocation.value !== 'Other'){
        this.secondFormGroup.controls.alternatelocation.clearValidators();
      }
    }

    this.secondFormGroup.get('patient_first_name').updateValueAndValidity();
    this.secondFormGroup.get('patient_last_name').updateValueAndValidity();
    this.secondFormGroup.get('patient_dob').updateValueAndValidity();
    this.secondFormGroup.get('patient_phone').updateValueAndValidity();
    this.secondFormGroup.get('phn').updateValueAndValidity();
    this.secondFormGroup.get('alternatelocation').updateValueAndValidity();

    console.log();
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  ngOnInit() {

    this.reffererservice.geReffererDetails(this.authservice.getUserId())
      .subscribe(Data => {
        this.firstFormGroup.patchValue({
          firstname: Data.firstname + ' ' + Data.lastname,
          lastname: Data.lastname,
          mobile: Data.mobile,
          msp: Data.msp
        });
      }, Error => {});
  }

  maxDobFilter = (d: Date | null): boolean => {
    return d < new Date();
  }

  handleImage(patientDemoSticker: WebcamImage) {
    this.patientDemoSticker = patientDemoSticker;
    this.TakePicture = false;
  }

  discardImage() {
    this.TakePicture = true;
    this.patientDemoSticker = null;
  }

  CheckLocation(control: FormControl) {
    const q = new Promise((resolve, reject) => {

      //   console.log(this.secondFormGroup.get('sitelocation').value);

      //   if (this.secondFormGroup.get('sitelocation').value === 'Other' && control.value === '' ) {
      //     resolve({
      //             Onefield: true
      //           });
      //   } else {
      //     resolve(null);
      //   }
      resolve(null);
    });

    return q;
  }

  CheckCustomPhone(control: FormControl) {
    const q = new Promise((resolve, reject) => {
      // if (this.secondFormGroup.get('patient_phone').value !== '' && this.secondFormGroup.get('patient_phone_alter').value !== '' ) {
      //   resolve({
      //           customerrro: true
      //         });
      // } else {
      //   resolve(null);
      // }
      resolve(null);
    });
    return q;
  }



  selectFile1(event): void {
    this.selectedFiles = event.target.files;
    this.upload1();
  }

  handleImageReport(reportImage: WebcamImage) {
    this.reportImage = reportImage;
    this.Report.push(this.reportImage.imageAsDataUrl);
  }
  upload1(): void {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this.uploadservice.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          if (event.body.error === '') {
            this.Report.push(environment.ImageUrl + event.body.upload.file_name);

          }
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });
    this.selectedFiles = undefined;
  }
  // File Upload
  selectFile(event): void {
    this.selectedFiles = event.target.files;
    this.upload();
  }

  upload(): void {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this.uploadservice.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          if (event.body.error === '') {
            this.PicturePatient = (environment.ImageUrl + event.body.upload.file_name);

          }
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });
    this.selectedFiles = undefined;
  }
  DeleteReport(Index) {


 this.Report.splice(Index, 1);



  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 8000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

//   validateAllFormFields(formGroup: FormGroup) {         //{1}
//   Object.keys(formGroup.controls).forEach(field => {  //{2}
//     const control = formGroup.get(field);             //{3}
//     if (control instanceof FormControl) {             //{4}
//       control.markAsTouched({ onlySelf: true });
//     } else if (control instanceof FormGroup) {        //{5}
//       this.validateAllFormFields(control);            //{6}
//     }
//   });
// }
  EnterFinalStep(Event) {

    if (this.secondFormGroup.valid){
    this.spinner.show();
    let image = '';
    if (this.PicturePatientCheck){
         image = this.patientDemoSticker.imageAsDataUrl;
    }
    const FormData = {
      appointment_refferer: this.LoggedinId,
      sitelocation: this.secondFormGroup.controls.sitelocation.value,
      alternatelocation: this.secondFormGroup.controls.alternatelocation.value,
      patient_first_name: this.secondFormGroup.controls.patient_first_name.value,
      patient_last_name: this.secondFormGroup.controls.patient_last_name.value,
      patient_dob: this.secondFormGroup.controls.patient_dob.value,
      patient_phone: this.secondFormGroup.controls.patient_phone.value,
      details: this.secondFormGroup.controls.reason.value,
      wbc: this.secondFormGroup.controls.wbc.value,
      CardImage: image,
      DoctorId: this.Doctor.doctor_id,
      ImageCheck: this.PicturePatientCheck,
      phn: this.secondFormGroup.controls.phn.value,
      ReffererPhn: this.firstFormGroup.controls.mobile.value
    };

    const FormReport = {
      Reports: this.Report,
    };


    this.appointmentservice.AddNewAppointment(FormData)
      .subscribe(Data => {
        this.spinner.hide();
        if (Data.success) {
          this.apointmentDetails = Data.Detail;

          this.showNotification(
            'snackbar-success',
            'Appointment saved successfully',
            'top',
            'right'
          );
          this.Success = true;
          this.Processed = true;

          if (FormReport.Reports.length > 0){
            this.appointmentservice.UploadReportCards(FormReport, Data.Detail.id)
            .subscribe( Res => {
              this.UploadPatientReport = true;
            }, Error => {
              this.UploadPatientReport = false;
            });
          }


        } else {
          this.Success = false;
          this.Processed = true;
          this.spinner.hide();
        }

      }, Error => {
        this.Success = false;
        this.Processed = true;
        this.spinner.hide();
      });
    }
  }
}
