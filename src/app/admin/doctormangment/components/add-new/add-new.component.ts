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
  UploadFileService
} from '../../../../shared/services/upload-file.service';
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
} from '../../../../../environments/environment';
import {
  EmailServiceService
} from '../../../../shared/services/email-service.service';

import {
  DoctorServiceService
} from '../../services/doctor-service.service';

import {
  AuthService
} from '../../../../shared/security/auth.service';
import {
  ToasterService
} from '../../../../toaster/toaster.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.sass']
})
export class AddNewComponent implements OnInit {

  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  profilepic = 'assets/images/user/avatar.png';
  Today = new Date();
  ActionType = '';
  EditId: string;
  href: string = "";
  userCreditId: string;
  fileInfos: Observable < any > ;
  mspPattren = "^((\\+91-?)|0)?[0-9]{5}$";
  Process = false;

  constructor(private fb: FormBuilder,
              private _uploadService: UploadFileService,
              private _EmailServiceService: EmailServiceService,
              private _doctorerservice: DoctorServiceService,
              private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private _AuthService: AuthService
  ) {

    this.Process = false;

    this.ActionType = 'Add';
    this.docForm = this.fb.group({
      first: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last: ['', [Validators.pattern('[a-zA-Z]+')]],
      mobile: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
        this.isEmailUnique.bind(this)
      ],
      msp: ['', [Validators.required, Validators.pattern(this.mspPattren)], this.isMspUnique.bind(this)],
      uploadImg: [''],
      appointment_setting: [true, [Validators.required]],
      notification_setting: [true, [Validators.required]],
      fax: ['']
    });
  }

  ngOnInit() {
    this.EditId = this.activatedRoute.snapshot.params.EditId;
    this.href = this.router.url;


    if (this.href.includes("edit")) {
      this.ActionType = 'Edit';

      this._doctorerservice.getDoctorDetails(this.EditId).subscribe(
        Data => {
          let option = 'false';
          if (Data.appointment_setting){
            option = 'true';
          }
          this.userCreditId = Data.userCreditId;
          this.docForm.patchValue({
            first: Data.firstname,
            last: Data.lastname,
            mobile: Data.mobile,
            email: Data.email,
            msp: Data.msp,
            education: Data.education,
            fax: Data.fax,
            appointment_setting: option,
            notification_setting: Data.notification_setting,
          });
          console.log(option);
          this.profilepic = Data.profilepic;

        }, Error => {}
      );
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

  get f() {
    return this.docForm.controls;
  }
  onSubmit() {


    if (this.docForm.valid) {

      let opton1 = 0;
      if (this.f.appointment_setting.value === 'true'){
        opton1 = 1;
      }

      this.Process = true;
      const FormData = {
        firstname: this.f.first.value,
        lastname: this.f.last.value,
        mobile: this.f.mobile.value,
        email: this.f.email.value,
        msp: this.f.msp.value,
        profilepic: this.profilepic,
        fax: this.f.fax.value,
        appointment_setting: opton1,
        notification_setting: this.f.notification_setting.value
      };

      if (this.ActionType === 'Add') {
        this._doctorerservice.AddNewDoctor(FormData).subscribe(
          Data => {
            this.Process = false;
            this.showNotification(
              'snackbar-success',
              ' Doctor Added Successfully',
              'top',
              'right'
            );
            this.router.navigate(['admin/doctor/list-all']);
          }, Error => {
            this.Process = false;
            console.error(Error);
            this.showNotification(
              'snackbar-danger',
              'Error Encountered. Please try again later',
              'top',
              'right'
            );
          }
        );
      } else {

        this._doctorerservice.UpdateDoctor(FormData, this.EditId).subscribe(
          Data => {
            this.Process = false;
            this.showNotification(
              'snackbar-success',
              'Doctor Updated Successfully',
              'top',
              'right'
            );
            this.router.navigate(['admin/doctor/list-all']);
          }, Error => {
            this.Process = false;
            console.error(Error);
            this.showNotification(
              'snackbar-danger',
              'Error Encountered. Please try again later',
              'top',
              'right'
            );
          }
        );
      }

    }
  }

  // File Upload
  selectFile(event): void {
    this.selectedFiles = event.target.files;
    this.upload();
  }

  upload(): void {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this._uploadService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          if (event.body.error === '') {
            this.profilepic = environment.ImageUrl + event.body.upload.file_name;

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


  isEmailUnique(control: FormControl) {
    const q = new Promise((resolve, reject) => {

      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(control.value)) {
        if (this.ActionType === 'Add') {
          this._EmailServiceService.checkEmailNotTaken(control.value).subscribe((res) => {
            if (res) {
              resolve({
                'isEmailUnique': true
              });
            } else {
              resolve(null);
            }
          }, () => {
            resolve({
              'isEmailUnique': true
            });
          });

        } else {

          this._EmailServiceService.checkEmailNotTakenEdit(control.value, this.userCreditId).subscribe((res) => {
            if (res) {
              resolve({
                'isEmailUnique': true
              });
            } else {
              resolve(null);
            }
          }, () => {
            resolve({
              'isEmailUnique': true
            });
          });
        }
      } else {
        resolve(null);
      }




    });
    return q;
  }

  isMspUnique(control: FormControl) {
    const q = new Promise((resolve, reject) => {

      if (control.value.length === 5) {
        if (this.ActionType === 'Add') {
          this._EmailServiceService.checkMspNotTaken(control.value).subscribe((res) => {
            if (res) {
              resolve({
                'isMspUnique': true
              });
            } else {
              resolve(null);
            }
          }, () => {
            resolve({
              'isMspUnique': true
            });
          });

        } else {

          this._EmailServiceService.checkMspNotTakenEdit(control.value, this.userCreditId).subscribe((res) => {
            if (res) {
              resolve({
                'isMspUnique': true
              });
            } else {
              resolve(null);
            }
          }, () => {
            resolve({
              'isMspUnique': true
            });
          });
        }
      } else {
        resolve(null);
      }




    });
    return q;
  }


}
