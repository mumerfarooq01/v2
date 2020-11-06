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
  AdminService
} from '../../services/admin.service';

import {
  AuthService
} from '../../../../shared/security/auth.service';
import {
  ToasterService
} from '../../../../toaster/toaster.service';


@Component({
  selector: 'app-add-new-admin',
  templateUrl: './add-new-admin.component.html',
  styleUrls: ['./add-new-admin.component.sass']
})
export class AddNewAdminComponent implements OnInit {

  adminForm: FormGroup;
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
  public Mobile = ['(', /[0-9]/, /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  constructor(private fb: FormBuilder,
    private toaster: ToasterService,
    private _uploadService: UploadFileService,
    private _EmailServiceService: EmailServiceService,
    private _adminservice: AdminService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _AuthService: AuthService
  ) {


    this.Process = false;

    this.ActionType = 'Add';
    this.adminForm = this.fb.group({
      first: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last: ['', [Validators.pattern('[a-zA-Z]+')]],
      mobile: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
        this.isEmailUnique.bind(this)
      ],
      msp: ['', [Validators.required, Validators.pattern(this.mspPattren)],this.isMspUnique.bind(this)],
      uploadImg: [''],
      fax: [''],
      default_admin:  [false, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.EditId = this.activatedRoute.snapshot.params.EditId;
    this.href = this.router.url;


    if (this.href.includes("edit")) {
      this.ActionType = 'Edit';

      this._adminservice.getAdminDetails(this.EditId).subscribe(
        Data => {
          this.userCreditId = Data.userCreditId;
          this.adminForm.patchValue({
            first: Data.firstname,
            last: Data.lastname,
            mobile: Data.mobile,
            email: Data.email,
            msp: Data.msp,
            fax:Data.fax,
            default_admin: Data.default_admin
          });
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
    return this.adminForm.controls;
  }
  onSubmit() {

    if (this.adminForm.valid) {
      this.Process = true;
      const FormData = {
        firstname: this.f.first.value,
        lastname: this.f.last.value,
        mobile: this.f.mobile.value,
        email: this.f.email.value,
        msp: this.f.msp.value,
        profilepic: this.profilepic,
        fax: this.f.fax.value,
        default_admin: this.f.default_admin.value
      };

      if (this.ActionType === 'Add') {
        this._adminservice.AddNewAdmin(FormData).subscribe(
          Data => {
            this.Process = false;
            this.showNotification(
              'snackbar-success',
              'Admin added Successfully',
              'top',
              'right'
            );
            this.router.navigate(['admin/adminuser/list-all']);
          }, Error => {
            this.Process = false;
            console.error(Error);
            this.showNotification(
              'snackbar-danger',
              'Error encountered. Please try again later',
              'top',
              'right'
            );
          }
        );
      } else {

        this._adminservice.UpdateAdmin(FormData, this.EditId).subscribe(
          Data => {
            this.Process = false;
            this.showNotification(
              'snackbar-success',
              'Admin Updated Successfully',
              'top',
              'right'
            );
            this.router.navigate(['admin/adminuser/list-all']);
          }, Error => {
            this.Process = false;
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
        console.error(err);
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
