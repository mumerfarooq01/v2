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
  AssitantService
} from '../../service/assitant.service';

import {
  DoctorServiceService
} from '../../../doctormangment/services/doctor-service.service';

import {
  AuthService
} from '../../../../shared/security/auth.service';
import {
  ToasterService
} from '../../../../toaster/toaster.service';

import {
  Doctor
} from '../../../../shared/interfaces/doctor.interface';

@Component({
  selector: 'app-list-add-new',
  templateUrl: './list-add-new.component.html',
  styleUrls: ['./list-add-new.component.sass']
})
export class ListAddNewComponent implements OnInit {

  assitantForm: FormGroup;
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
  DoctorList: Doctor[] = [];

  constructor(private fb: FormBuilder,
    private toaster: ToasterService,
    private _uploadService: UploadFileService,
    private _EmailServiceService: EmailServiceService,
    private _assitantservice: AssitantService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _AuthService: AuthService,
    private _DoctorServiceService: DoctorServiceService
  ) {

    this.ActionType = 'Add';
    this.assitantForm = this.fb.group({
      first: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last: [''],
      mobile: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
        this.isEmailUnique.bind(this)
      ],
      msp: ['', [Validators.required, Validators.pattern(this.mspPattren)], this.isMspUnique.bind(this)],
      uploadImg: [''],
      doctor_id: ['', Validators.required],
      fax: ['']
    });
  }

  ngOnInit(): void {


    this.href = this.router.url;

    if (this.href.includes("edit")) {

      this.EditId = this.activatedRoute.snapshot.params.EditId;

      this.ActionType = 'Edit';

      this._DoctorServiceService.getAllDoctorsListAssign(this.activatedRoute.snapshot.params.EditId)
        .subscribe(Data => {
          this.DoctorList = Data;
        }, Error => {});


      this._assitantservice.getAssitDetails(this.EditId).subscribe(
        Data => {
          this.userCreditId = Data.userCreditId;
          this.assitantForm.patchValue({
            first: Data.firstname,
            last: Data.lastname,
            mobile: Data.mobile,
            email: Data.email,
            msp: Data.msp,
            dcotor_id: Data.doctor_id,
            fax: Data.fax
          });
          this.profilepic = Data.profilepic;

        }, Error => {}
      );
    } else {
      this._DoctorServiceService.getAllDoctorsListAssign(0)
        .subscribe(Data => {
          this.DoctorList = Data;
        }, Error => {});
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
    return this.assitantForm.controls;
  }
  onSubmit() {

    if (this.assitantForm.valid) {

      const FormData = {
        firstname: this.f.first.value,
        lastname: this.f.last.value,
        mobile: this.f.mobile.value,
        email: this.f.email.value,
        msp: this.f.msp.value,
        profilepic: this.profilepic,
        doctor_id: this.f.doctor_id.value,
        fax: this.f.fax.value
      };

      if (this.ActionType === 'Add') {
        this._assitantservice.AddNewAssistant(FormData).subscribe(
          Data => {
            this.showNotification(
              'snackbar-success',
              'Assistant Added Successfully',
              'top',
              'right'
            );
            this.router.navigate(['admin/assitant/list-all']);
          }, Error => {
            console.error(Error)
            this.showNotification(
              'snackbar-danger',
              'Error encountered. Please try again later',
              'top',
              'right'
            );
          }
        );
      } else {

        this._assitantservice.UpdateAssistant(FormData, this.EditId).subscribe(
          Data => {
            this.showNotification(
              'snackbar-success',
              'Assistant updated Successfully',
              'top',
              'right'
            );
            this.router.navigate(['admin/assitant/list-all']);
          }, Error => {
            console.error(Error);
            this.showNotification(
              'snackbar-danger',
              'Error encountered. Please try again later',
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
