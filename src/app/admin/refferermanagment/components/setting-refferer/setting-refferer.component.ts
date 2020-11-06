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
  RefferService
} from '../../services/reffer.service';

import {
  AuthService
} from '../../../../shared/security/auth.service';
import {
  ToasterService
} from '../../../../toaster/toaster.service';

@Component({
  selector: 'app-setting-refferer',
  templateUrl: './setting-refferer.component.html',
  styleUrls: ['./setting-refferer.component.sass']
})
export class SettingReffererComponent implements OnInit {

  ReffererSettingForm: FormGroup;
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
  constructor(private fb: FormBuilder,
    private toaster: ToasterService,
    private _uploadService: UploadFileService,
    private _EmailServiceService: EmailServiceService,
    private _RefferService: RefferService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _AuthService: AuthService
  ) {

    this.ActionType = 'Add';
    this.ReffererSettingForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.EditId = this.activatedRoute.snapshot.params.EditId;
    this.href = this.router.url;




    this._RefferService.getRefferDefaultPassword().subscribe(
      Data => {
        this.ReffererSettingForm.patchValue({
          password: Data,
        });


      }, Error => {}
    );


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
    return this.ReffererSettingForm.controls;
  }
  onSubmit() {

    if (this.ReffererSettingForm.valid) {

      const FormData = {
        password: this.f.password.value,
      };


      this._RefferService.UpdatePassword(FormData).subscribe(
        Data => {
          this.showNotification(
            'snackbar-success',
            'Password Updated',
            'top',
            'right'
          );
          this.router.navigate(['admin/refferer/list-all']);
        }, Error => {
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
